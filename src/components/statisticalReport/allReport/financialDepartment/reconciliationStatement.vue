<!--* 
* @description: 财务部-对账表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<div>
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :model="filters" ref="filters" :inline="true">
					<el-form-item label="月份">
						<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="recMonthValue" type="month" placeholder="请选择查询月份">
						</el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
						<el-button type="success" icon="el-icon-refresh" @click="handleImplement" :disabled="listLoading">重新计算</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border :max-height="windowOutHeight-220" :data="listData" highlight-current-row style="width: 100%;">
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="OWNERNAME" align="center" label="姓名">
				</el-table-column>
				<el-table-column prop="OWNERMOBILE" align="center" label="车主电话">
				</el-table-column>
				<el-table-column prop="MODEL" align="center" label="车型">
				</el-table-column>
				<el-table-column prop="VIN" align="center" label="车架号">
				</el-table-column>
				<el-table-column prop="LICENSEPLATENUM" align="center" label="车牌号">
				</el-table-column>
				<el-table-column prop="VEHICLEPRICE" align="center" label="车价(元)">
				</el-table-column>
				<el-table-column prop="INSTALLDATE" align="center" label="安装日期" :formatter="dateFormatter">
				</el-table-column>
				<el-table-column prop="" align="center" label="设备号">
					<el-table-column prop="WIREDNUM" align="center" label="有线">
					</el-table-column>
					<el-table-column prop="WIRELESSNUM" align="center" label="无线">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="" align="center" label="数量">
					<el-table-column prop="NORMCOUNT" align="center" label="常规GPS">
					</el-table-column>
					<el-table-column prop="INSUCOUNT" align="center" label="盗抢险GPS">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="" align="center" label="结算价(元)">
					<el-table-column prop="NORMPRICE" align="center" label="常规" :formatter="saveNum1">
					</el-table-column>
					<el-table-column prop="INSUPRICE" align="center" label="盗抢险" :formatter="saveNum2">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="TOTALPRICE" align="center" label="金额合计(元)" :formatter="saveNum3">
				</el-table-column>
				<el-table-column prop="INSURANCECORPNAME" align="center" label="保险公司">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</div>

		
	</section>
</template>
<script>
	import util from '../../../../common/js/util'
	import { getRecList, implement, searchUnify } from '../../../../api/api';

	export default {
		props: ['tabMessage'],
		data() {
			return {
				windowOutHeight: 700,
				recMonthValue: '',
				filters: {
					recMonth: '',
				},
				util: util,
				listData: [],
				listLoading:false,
				total: 0,
				currentPage: 0,
				pageSize: 15,
				pickerOptions: {
					disabledDate(time) {
						let nowdays = new Date(),
						year = nowdays.getFullYear(),
						month = nowdays.getMonth(),
						lastdate = new Date(year,month,0);
						return time.getTime() > lastdate.getTime();
					}
				}
			}
		},
		methods: {
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.recMonth = '';
					return;
				};
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			//格式化后台传来的时间戳
			exeDateFormatter(row, col) {
				return util.formatDate.format(new Date(row.EXECDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			//格式化后台传来的时间戳
			dateFormatter(row, col) {
				return util.formatDate.format(new Date(row.INSTALLDATE), 'yyyy-MM-dd');
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleSearch();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleSearch();
			},
			/*刷新 - 根据当前月份 执行最新记录信息*/
			handleImplement() {
				if(!this.filters.recMonth) {
					this.$message({
						message: "请选择月份在执行",
						type: 'warning'
					});
					return;
				}
				this.$confirm('此操作将刷新 ' + this.filters.recMonth + '月【对账单】信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_FINANCE_STATEMENT',
						params: this.filters.recMonth,
					};
					this.listLoading = true;//禁用刷新按钮
					implement(para).then((res) => {
						if (res.data.result.code == 0) {
							this.handleSearch();
							this.listLoading = false;
							this.$message({
								message: "刷新成功！",
								type: 'success'
							});
						}else{
							this.listLoading = true;//禁用刷新按钮
						}
					});
				}).catch(() => {});
			},
			/*根据当前月份 查询对账单信息*/
			handleSearch() {
				this.dialogTableVisible = true;
				let para = {
					_viewName: 'RPT_FIN_STATEMENT',
					BUSINESS_DATE: this.filters.recMonth,
					currentPage: this.currentPage,
					showCount: this.pageSize
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				searchUnify(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				});
			},
			/*根据当前月份 到处对账单*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_STATEMENT&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 保留两位小数
			saveNum1(row, col) {//保留两位小数
				if (row.NORMPRICE == undefined)return '--';
				return row.NORMPRICE.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.INSUPRICE == undefined)return '--';
				return row.INSUPRICE.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.TOTALPRICE == undefined)return '--';
				return row.TOTALPRICE.toFixed(2);
			},
		},
		created() {
			// 默认筛选日期
			this.recMonthValue = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filters.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');

			this.$nextTick(function(){
				this.handleSearch();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		}
	}
</script>