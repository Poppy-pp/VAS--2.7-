<!--* 
* @description: 财务部-成本汇总表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
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
			<el-table border stripe :max-height="windowOutHeight-220" :data="listData" highlight-current-row  style="width: 100%;" :summary-method="getSummaries" show-summary>
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="INSTALLAREA" align="center" label="地区">
				</el-table-column>
				<el-table-column prop="" align="center" label="常规">
					<el-table-column prop="NORMEQUIPCOUNT" align="center" label="常规台数">
					</el-table-column>
					<el-table-column prop="NORMEQUIPCOST" align="center" label="设备成本(元)" :formatter="saveNum1">
					</el-table-column>
					<el-table-column prop="NORMCARDCOUNT" align="center" label="SIM卡张数">
					</el-table-column>
					<el-table-column prop="NORMCARDCOST" align="center" label="卡成本(元)" :formatter="saveNum2">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="" align="center" label="保险">
					<el-table-column prop="INSUEQUIPCOUNT" align="center" label="保险台数">
					</el-table-column>
					<el-table-column prop="INSUEQUIPCOST" align="center" label="设备成本(元)" :formatter="saveNum3">
					</el-table-column>
					<el-table-column prop="INSUCARDCOUNT" align="center" label="SIM卡张数">
					</el-table-column>
					<el-table-column prop="INSUCARDCOST" align="center" label="卡成本(元)" :formatter="saveNum4">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="" align="center" label="汇总">
					<el-table-column prop="" align="center" label="30M一年卡">
						<el-table-column prop="NORMTOTAL30M" align="center" label="常规"></el-table-column>
						<el-table-column prop="INSUTOTAL30M" align="center" label="保险"></el-table-column>
					</el-table-column>
					<el-table-column prop="" align="center" label="计提30M一年卡(2018)">
						<el-table-column prop="NORMTOTAL30M2018" align="center" label="常规"></el-table-column>
						<el-table-column prop="INSUTOTAL30M2018" align="center" label="保险"></el-table-column>
					</el-table-column>
					<el-table-column prop="TOTALEQUIPCOST" align="center" label="设备成本(元)" :formatter="saveNum5">
					</el-table-column>
					<el-table-column prop="TOTALCARDCOST" align="center" label="卡成本(元)" :formatter="saveNum6">
					</el-table-column>
					<el-table-column prop="TOTALINSUCOST" align="center" label="保单成本(元)" :formatter="saveNum7">
					</el-table-column>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
	</section>
</template>
<script>
	import util from '../../../../common/js/util.js';
	import axios from 'axios';
	import {implement, searchUnify } from '../../../../api/api';

	export default {
		props: ['tabMessage'],
		data() {
			return {
				windowOutHeight: 700,
				recMonthValue: '',
				filters: {
					recMonth: '',
				},
				sumData:[],//合计数据
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
				this.$confirm('此操作将刷新 ' + this.filters.recMonth + '月【成本汇总表】信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_FINANCE_COST',
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
					_viewName: 'RPT_FIN_COST',
					BUSINESS_DATE: this.filters.recMonth,
					currentPage: this.currentPage,
					showCount: this.pageSize
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/unify/unify/getCost', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				});

				let paraTwo = {
					BUSINESS_DATE: this.filters.recMonth,
				}
				axios.get('/vasms-web/api/v1/unify/unify/getCostTotal', {params: para}).then((res) => {
					this.sumData = res.data.data[0];
			        	});
			},
			/*根据当前月份 到处对账单*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_COST&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth;
			},
			// 保留两位小数
			saveNum1(row, col) {//保留两位小数
				if (row.NORMEQUIPCOST == undefined)return '--';
				return row.NORMEQUIPCOST.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.NORMCARDCOST == undefined)return '--';
				return row.NORMCARDCOST.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.INSUEQUIPCOST == undefined)return '--';
				return row.INSUEQUIPCOST.toFixed(2);
			},
			saveNum4(row, col) {//保留两位小数
				if (row.INSUCARDCOST == undefined)return '--';
				return row.INSUCARDCOST.toFixed(2);
			},
			saveNum5(row, col) {//保留两位小数
				if (row.TOTALEQUIPCOST == undefined)return '--';
				return row.TOTALEQUIPCOST.toFixed(2);
			},
			saveNum6(row, col) {//保留两位小数
				if (row.TOTALCARDCOST == undefined)return '--';
				return row.TOTALCARDCOST.toFixed(2);
			},
			saveNum7(row, col) {//保留两位小数
				if (row.TOTALINSUCOST == undefined)return '--';
				return row.TOTALINSUCOST.toFixed(2);
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
			          if (index === 2) {
			            sums[index] = this.sumData.NORMEQUIPCOUNT;
			            sums[index] += ' 台'
			            return;
			          }
			          if (index === 3) {
			            sums[index] = this.sumData.NORMEQUIPCOST;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 4) {
			            sums[index] = this.sumData.NORMCARDCOUNT;
			            sums[index] += ' 张'
			            return;
			          }
			          if (index === 5) {
			            sums[index] = this.sumData.NORMCARDCOST;
			            sums[index] += ' 元'
			            return;
			          }
			           if (index === 6) {
			            sums[index] = this.sumData.INSUEQUIPCOUNT;
			            sums[index] += ' 台'
			            return;
			          }
			          if (index === 7) {
			            sums[index] = this.sumData.INSUEQUIPCOST;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 8) {
			            sums[index] = this.sumData.INSUCARDCOUNT;
			            sums[index] += ' 张'
			            return;
			          }
			          if (index === 9) {
			            sums[index] = this.sumData.INSUCARDCOST;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 10) {
			            sums[index] = this.sumData.NORMTOTAL30M;
			            sums[index] += ' 张'
			            return;
			          }
			          if (index === 11) {
			            sums[index] = this.sumData.INSUTOTAL30M;
			            sums[index] += ' 张'
			            return;
			          }
			          if (index === 12) {
			            sums[index] = this.sumData.NORMTOTAL30M2018;
			            sums[index] += ' 张'
			            return;
			          }
			          if (index === 13) {
			            sums[index] = this.sumData.INSUTOTAL30M2018;
			            sums[index] += ' 张'
			            return;
			          }
			           if (index === 14) {
			            sums[index] = this.sumData.TOTALEQUIPCOST;
			            sums[index] += ' 元'
			            return;
			          }
			           if (index === 15) {
			            sums[index] = this.sumData.TOTALCARDCOST;
			            sums[index] += ' 元'
			            return;
			          }
			           if (index === 16) {
			            sums[index] = this.sumData.TOTALINSUCOST;
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