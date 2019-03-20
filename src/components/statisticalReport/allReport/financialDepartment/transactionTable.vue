<!--* 
* @description: 财务部-异动表
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
			<el-table border :max-height="windowOutHeight-220" :data="listData" highlight-current-row style="width: 100%;" :summary-method="getSummaries" show-summary>
				<el-table-column type="index" label="序号" width="35" align="center">
				</el-table-column>
				<el-table-column prop="BUSINESS_DATE" align="center" label="时间">
				</el-table-column>
				<el-table-column prop="CORPNAME" align="center" label="公司名称">
				</el-table-column>
				<el-table-column align="center" label="结算价(元)">
					<el-table-column prop="NORMPRICE_DIFF" align="center" label="常规" :formatter="saveNum1"></el-table-column>
					<el-table-column prop="INSUPRICE_DIFF" align="center" label="保险" :formatter="saveNum2"></el-table-column>
				</el-table-column>
				<el-table-column align="center" label="保单成本异动">
					<el-table-column prop="INSUCOST_DIFF_RENBAO" align="center" label="人保" :formatter="saveNum3"></el-table-column>
					<el-table-column prop="INSUCOST_DIFF_RENSHOU" align="center" label="人寿" :formatter="saveNum4"></el-table-column>
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
				recMonthValue:'',
				filters: {
					recMonth:'',
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
				this.$confirm('此操作将刷新 ' + this.filters.recMonth + '月【异动表】信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_FINANCE_DIFF',
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
					_viewName: 'RPT_FIN_DIFF',
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
				axios.get('/vasms-web/api/v1/unify/unify/getDiffTotal', {params: para}).then((res) => {
					this.sumData = res.data.data[0];
			        	});
			},
			/*根据当前月份 到处对账单*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_DIFF&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth;
			},
			// 保留两位小数
			saveNum1(row, col) {//保留两位小数
				if (row.NORMPRICE_DIFF == undefined)return '--';
				return row.NORMPRICE_DIFF.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.INSUPRICE_DIFF == undefined)return '--';
				return row.INSUPRICE_DIFF.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.INSUCOST_DIFF_RENBAO == undefined)return '--';
				return row.INSUCOST_DIFF_RENBAO.toFixed(2);
			},
			saveNum4(row, col) {//保留两位小数
				if (row.INSUCOST_DIFF_RENSHOU == undefined)return '--';
				return row.INSUCOST_DIFF_RENSHOU.toFixed(2);
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
			          if (index === 3) {
			            sums[index] = this.sumData.NORMPRICE_DIFF;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 4) {
			            sums[index] = this.sumData.INSUPRICE_DIFF;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 5) {
			            sums[index] = this.sumData.INSUCOST_DIFF_RENBAO;
			            sums[index] += ' 元'
			            return;
			          }
			          if (index === 6) {
		          		sums[index] = this.sumData.INSUCOST_DIFF_RENSHOU;
		            		sums[index] += ' 元';
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