<!--* 
* @description: 业务部-管理报表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item prop="searchKey">
					<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
				</el-form-item>
				<el-form-item prop="month">
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="filters.month" type="month" placeholder="请选择月份">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="week">
					<el-date-picker @change="changeTimeWeek" :picker-options="pickerOptions" v-model="filters.week" type="week" format="yyyy 第 WW 周" placeholder="选择周"></el-date-picker>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="SYSTEM_FROM" label="体系" align="center">
			</el-table-column>
			<el-table-column prop="REC_AREA" label="区域" align="center">
			</el-table-column>
			<el-table-column prop="SALESMAN" label="业务员" align="center">
			</el-table-column>
			<el-table-column prop="CUST_CORP" label="客户公司" align="center">
			</el-table-column>
			<el-table-column prop="WEEK_SALES" :label="week + ' 周销量'" align="center" width="220">
			</el-table-column>
			<el-table-column prop="MONTH_SALES" :label="filters.month + ' 月销量'" align="center">
			</el-table-column>
			<el-table-column prop="MONTH_GETHER" :label="filters.month + ' 月应收账款'" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="COOPERATION" label="合作/报价价格" align="center" :formatter="saveNum">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<style>
</style>

<script>
	import util from '../../../../common/js/util.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				filters: {
					searchKey:'',
					month: util.formatDate.format(new Date(), 'yyyy-MM'),
					week: new Date(),
				},
				week:util.getWeekScope(new Date()),
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},

			}
		},
		methods: {
			//选择月份
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					this.filters.week = new Date(date);//相应周变化
					this.week = util.getWeekScope(new Date(date));//显示周范围变化
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
				this.filters.week = new Date(date);//相应周变化
				this.week = util.getWeekScope(new Date(date));//显示周范围变化
			},
			//选择周
			changeTimeWeek(date) {
				if(!date) {
					this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd');
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');//相应月变化
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=管理报表&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
		                         month:util.formatDate.format(new Date(), 'yyyy-MM'),
				week:new Date(),
		                }
		            },
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getData();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getData();
			},
			//获取用户列表
			getData() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					vehiclestate:this.filters.vehiclestate,
					year:this.filters.year,
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biInstallDetail/getList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.declaredate == undefined) return '--';
				return util.formatDate.format(new Date(row.declaredate), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.installactualdate == undefined) return '--';
				return util.formatDate.format(new Date(row.installactualdate), 'yyyy-MM-dd');
			},
			saveNum(row, col) {//保留两位小数
				return row.totalmile.toFixed(2);
			},
			
		},
		created(){
			this.$nextTick(function(){
				// this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>