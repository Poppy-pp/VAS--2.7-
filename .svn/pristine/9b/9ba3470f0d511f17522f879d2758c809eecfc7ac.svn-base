<!-- 收入汇总表-->
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
						<el-button type="primary" icon="el-icon-refresh" @click="handleImplement">刷新</el-button>
					</el-button-group>
					<el-button type="primary" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border stripe :max-height="windowOutHeight-220" :data="historyData" highlight-current-row  style="width: 100%;">
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="REPORTCODE" align="center" label="报表代码">
				</el-table-column>
				<el-table-column prop="REPORTNAME" align="center" label="报表名称">
				</el-table-column>
				<el-table-column prop="YEARMONTH" align="center" label="统计周期">
				</el-table-column>
				<el-table-column prop="EXECDATE" align="center" label="执行时间" :formatter="exeDateFormatter">
				</el-table-column>
				<el-table-column prop="EXECBY" align="center" label="执行人">
				</el-table-column>
				<el-table-column prop="EXECSEQ" align="center" label="执行序号">
				</el-table-column>
				<el-table-column prop="CURRENTFLAG" align="center" label="当前标志">
					<template scope="scope">
						{{ scope.row.CURRENTFLAG == 'Y'?'有效':'无效' }}
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="hhandleSizeChange" background @current-change="hhandleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="hpageSize" layout="total, sizes, prev, pager, next" :total="htotal" style="float:right;">
				</el-pagination>
			</el-col>
		</div>

		<el-dialog stripe :title="titleMonth+'月收入汇总表'" :visible.sync="dialogTableVisible" width="80%">
			<el-table border :max-height="windowOutHeight-250" :data="listData" highlight-current-row  style="width: 100%;">
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="INSTALLAREA" align="center" label="地区">
				</el-table-column>
				<el-table-column prop="" align="center" label="来源">
				</el-table-column>
				<el-table-column prop="INSTALLAREA" align="center" label="单位">
				</el-table-column>
				<el-table-column prop="" align="center" label="车辆数">
				</el-table-column>
				<el-table-column prop="NORMEQUIPCOUNT" align="center" label="设备数量">
				</el-table-column>
				<el-table-column prop="NORMEQUIPREVENUE" align="center" label="设备结算(元)">
				</el-table-column>
				<el-table-column prop="INSUEQUIPCOUNT" align="center" label="保险数量">
				</el-table-column>
				<el-table-column prop="INSUEQUIPREVENUE" align="center" label="保险应收(元)">
				</el-table-column>
				<el-table-column prop="INSURANCECOST" align="center" label="保单成本(元)">
				</el-table-column>
				<el-table-column prop="TOTALCOUNT" align="center" label="数量小计">
				</el-table-column>
				<el-table-column prop="TOTALREVENUE" align="center" label="结算小计(元)">
				</el-table-column>
				<el-table-column prop="TOTALCOST" align="center" label="成本小计(元)">
				</el-table-column>
				<el-table-column prop="" align="center" label="收款情况">
				</el-table-column>
				<el-table-column prop="" align="center" label="人寿">
				</el-table-column>
				<el-table-column prop="" align="center" label="人保">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</el-dialog>
	</section>
</template>
<script>
	import util from '../../common/js/util'
	import { getHistoryTable, implement, searchUnify } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				recMonthValue: '',
				filters: {
					recMonth: ''
				},
				titleMonth: '',
				historyData: [],
				dialogTableVisible: false,
				isShowZxHistory: false,
				listData: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				htotal: 0,
				hcurrentPage: 0,
				hpageSize: 15,
				pickerOptions: {
					disabledDate(time) {
						let nowdays = new Date(),
						year = nowdays.getFullYear(),
						month = nowdays.getMonth(),
						lastdate = new Date(year,month,0);
						return time.getTime() > lastdate.getTime();
						// let myDate = new Date(),
						// 	year = myDate.getFullYear(),
						// 	dy25 = util.formatDate.getDateStringTime(util.formatDate.format(new Date(), 'yyyy-MM') + '-25'),
						// 	curMs = util.formatDate.format(new Date(time.getTime()), 'MM'),
						// 	curMz = util.formatDate.format(new Date(), 'MM');
						// // if(new Date().getTime() < dy25 && curMs == curMz) return true;
						// return time.getTime() > Date.now() - 8.64e7 ||
						// 	time.getTime() < new Date(year + "-0" + 1).getTime();
					}
				}
			}
		},
		methods: {
			//格式化后台传来的时间戳
			exeDateFormatter(row, col) {
				return util.formatDate.format(new Date(row.EXECDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.recMonth = '';
					this.titleMonth = '';
					return;
				};
				this.titleMonth = util.formatDate.format(new Date(date), 'MM');
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			//格式化后台传来的时间戳
			dateFormatter(row, col) {
				return util.formatDate.format(new Date(row.INSTALLDATE), 'yyyy-MM-dd');
			},
			//切换每页显示数量 历史记录
			hhandleSizeChange(val) {
				this.hpageSize = val;
				this.handleQueryHistory();
			},
			//切换每页显示数量 历史记录
			hhandleCurrentChange(val) {
				this.hcurrentPage = val;
				this.handleQueryHistory();
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
			//获取保单列表
			handleQueryHistory() {
				let para = {
					currentPage: this.hcurrentPage,
					showCount: this.hpageSize,
					REPORTCODE: 'FIN003'
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				getHistoryTable(para).then((res) => {
					this.htotal = res.data.data.totalResult;
					this.historyData = res.data.data.records;
					loading.close();//关闭加载
				});
			},
			/*根据当前月份 执行最新记录信息*/
			handleImplement() {
				if(!this.filters.recMonth) {
					this.$message({
						message: "请选择月份在执行",
						type: 'warning'
					});
					return;
				}
				this.$confirm('此操作将刷新 ' + this.titleMonth + '月【收入汇总表】信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_FINANCE_REVENUE',
						params: this.filters.recMonth,
					};
					implement(para).then((res) => {
						this.handleQueryHistory()
					});
				}).catch(() => {});
			},
			/*根据当前月份 查询对账单信息*/
			handleSearch() {
				this.dialogTableVisible = true;
				let para = {
					_viewName: 'RPT_FIN_REVENUE',
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
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_REVENUE&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth;
			},
		},
		created() {
			this.$nextTick(function(){
				this.handleQueryHistory();
			});
		}
	}
</script>