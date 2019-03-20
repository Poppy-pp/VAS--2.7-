<!--* 
* @description: 财务部-收入汇总表
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
			<el-table border :max-height="windowOutHeight-220" :data="listData" highlight-current-row  style="width: 100%;"  :summary-method="getSummaries" show-summary>
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="INSTALLAREA" align="center" label="地区">
				</el-table-column>
				<el-table-column prop="ORDERTYPE" align="center" label="来源">
				</el-table-column>
				<el-table-column prop="CORPNAME" align="center" label="单位">
				</el-table-column>
				<el-table-column prop="VEHICLECOUNT" align="center" label="车辆数">
				</el-table-column>
				<el-table-column prop="NORMEQUIPCOUNT" align="center" label="设备数量">
				</el-table-column>
				<el-table-column prop="NORMEQUIPREVENUE" align="center" label="设备结算(元)" :formatter="saveNum1">
				</el-table-column>
				<el-table-column prop="INSUEQUIPCOUNT" align="center" label="保险数量">
				</el-table-column>
				<el-table-column prop="INSUEQUIPREVENUE" align="center" label="保险应收(元)" :formatter="saveNum2">
				</el-table-column>
				<el-table-column prop="INSURANCECOST" align="center" label="保单成本(元)" :formatter="saveNum3">
				</el-table-column>
				<el-table-column prop="TOTALCOUNT" align="center" label="数量小计">
				</el-table-column>
				<el-table-column prop="TOTALREVENUE" align="center" label="结算小计(元)" :formatter="saveNum4">
				</el-table-column>
				<el-table-column prop="TOTALCOST" align="center" label="成本小计(元)" :formatter="saveNum5">
				</el-table-column>
				<el-table-column prop="INSURANCECOST_RENSHOU" align="center" label="人寿" :formatter="saveNum6">
				</el-table-column>
				<el-table-column prop="INSURANCECOST_RENBAO" align="center" label="人保" :formatter="saveNum7">
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
	import util from '../../../../common/js/util';
	import axios from 'axios';
	import { implement, searchUnify } from '../../../../api/api';

	export default {
		props: ['tabMessage'],
		data() {
			return {
				windowOutHeight: 700,
				recMonthValue: '',
				filters: {
					recMonth: '',
				},
				sumData:[],
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
					return;
				};
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
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
			/*根据当前月份 执行最新记录信息*/
			handleImplement() {
				if(!this.filters.recMonth) {
					this.$message({
						message: "请选择月份在执行",
						type: 'warning'
					});
					return;
				}
				this.$confirm('此操作将刷新 ' + this.filters.recMonth + '月【收入汇总表】信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_FINANCE_REVENUE',
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

				let paraTwo = {
					BUSINESS_DATE: this.filters.recMonth,
				}
				axios.get('/vasms-web/api/v1/unify/unify/getRevenueTotal', {params: para}).then((res) => {
					this.sumData = res.data.data[0];
			        	});
			},
			/*根据当前月份 到处对账单*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_REVENUE&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth;
			},
			// 保留两位小数
			saveNum1(row, col) {//保留两位小数
				if (row.NORMEQUIPREVENUE == undefined)return '--';
				return row.NORMEQUIPREVENUE.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.INSUEQUIPREVENUE == undefined)return '--';
				return row.INSUEQUIPREVENUE.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.INSURANCECOST == undefined)return '--';
				return row.INSURANCECOST.toFixed(2);
			},
			saveNum4(row, col) {//保留两位小数
				if (row.TOTALREVENUE == undefined)return '--';
				return row.TOTALREVENUE.toFixed(2);
			},
			saveNum5(row, col) {//保留两位小数
				if (row.TOTALCOST == undefined)return '--';
				return row.TOTALCOST.toFixed(2);
			},
			saveNum6(row, col) {//保留两位小数
				if (row.INSURANCECOST_RENSHOU == undefined)return '--';
				return row.INSURANCECOST_RENSHOU.toFixed(2);
			},
			saveNum7(row, col) {//保留两位小数
				if (row.INSURANCECOST_RENBAO == undefined)return '--';
				return row.INSURANCECOST_RENBAO.toFixed(2);
			},
			// 合计
			getSummaries(param) {
			        const { columns, data } = param;
			        const sums = [];//页面显示
			        
			        columns.forEach((column, index) => {
			          if (index === 0) {
			            sums[index] = '合计';
			            return;
			          }
			          if (index === 4) {
			            sums[index] = this.sumData.VEHICLECOUNT;
			            sums[index] += ' 辆'
			            return;
			          }
			          if (index === 5) {
			            sums[index] = this.sumData.NORMEQUIPCOUNT;
			            sums[index] += ' 台'
			            return;
			          }
			           if (index === 6) {
			            sums[index] = this.sumData.NORMEQUIPREVENUE;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 7) {
			            sums[index] = this.sumData.INSUEQUIPCOUNT;
			            return;
			          }
			          if (index === 8) {
			            sums[index] = this.sumData.INSUEQUIPREVENUE;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 9) {
			            sums[index] = this.sumData.INSURANCECOST;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 10) {
			            sums[index] = this.sumData.TOTALCOUNT;
			            sums[index] += ' 个'
			            return;
			          }
			          if (index === 11) {
			            sums[index] = this.sumData.TOTALREVENUE;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 12) {
			            sums[index] = this.sumData.TOTALCOST;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 13) {
			            sums[index] = this.sumData.INSURANCECOST_RENSHOU;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 14) {
			            sums[index] = this.sumData.INSURANCECOST_RENBAO;
			            sums[index] += ' 元'
			            return;
			          }
			        });
			        return sums;
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