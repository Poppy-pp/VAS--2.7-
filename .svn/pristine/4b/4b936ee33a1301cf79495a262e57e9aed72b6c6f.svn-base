<!--* 
* @description: 人力行政-考勤统计
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
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择月份">
					</el-date-picker>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row  style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column :label="month + ' 月考勤统计'" align="center">
				<el-table-column prop="DEPTNAME" label="部门" align="center">
				</el-table-column>
				<el-table-column prop="EMPLOYEENAME" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="" label="绩效分数" align="center">
				</el-table-column>
				<el-table-column prop="" label="餐补" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="全勤" align="center" :formatter="saveNum" >
				</el-table-column>
				<el-table-column prop="" label="全勤奖" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="迟到扣款" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="未打卡扣款" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="事假扣款" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="病假扣款" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="" label="扣款合计" align="center" :formatter="saveNum">
				</el-table-column>
				<el-table-column prop="NORMAL" label="正常考勤" align="center">
				</el-table-column>
				<el-table-column prop="NOPAY_LEAVE" label="事假" align="center">
				</el-table-column>
				<el-table-column prop="SICK_LEAVE" label="病假" align="center">
				</el-table-column>
				<el-table-column prop="SWAP_LEAVE" label="调休" align="center">
				</el-table-column>
				<el-table-column prop="ANNUAL_LEAVE" label="年假" align="center">
				</el-table-column>
				<el-table-column prop="FUNERAL_LEAVE" label="丧假" align="center">
				</el-table-column>
				<el-table-column prop="MARRIAGE_LEAVE" label="婚假" align="center">
				</el-table-column>
				<el-table-column prop="MATERNITY_LEAVE" label="产假" align="center">
				</el-table-column>
				<el-table-column prop="MATERNITY_CHECK_LEAVE" label="产检" align="center">
				</el-table-column>
				<el-table-column prop="PATERNITY_LEAVE" label="陪护假" align="center">
				</el-table-column>
				<el-table-column prop="TRIP" label="出差" align="center">
				</el-table-column>
				<el-table-column prop="NO_REC" label="未打卡" align="center">
				</el-table-column>
				<el-table-column prop="GOOUT" label="外出登记" align="center">
				</el-table-column>
				<el-table-column prop="MISS_AM" label="上午缺卡(次)" align="center">
				</el-table-column>
				<el-table-column prop="MISS_PM" label="下午缺卡(次)" align="center">
				</el-table-column>
				<el-table-column prop="LEAVE_EARLY" label="早退(次)" align="center">
				</el-table-column>
				<el-table-column prop="LATE" label="迟到(次)" align="center">
				</el-table-column>
				<el-table-column prop="" label="工伤假" align="center">
				</el-table-column>
				<el-table-column prop="" label="旷工" align="center">
				</el-table-column>
				<el-table-column prop="REMARK" label="备注" align="center">
				</el-table-column>
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
				month:'',
				filters: {
					searchKey:'',
					recMonth: util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				listDataTwo:[],//表格数据
				corpOptions:[],//所属公司
				corploading:false,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},

			}
		},
		methods: {
			//选择时间
			changeTime(date) {
				if(!date) {
					this.month = '';
					this.filters.recMonth = '';
					return;
				};
				this.month = util.formatDate.format(new Date(date), 'yyyy-MM'),
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biAttd/export_attdTotail?_viewName=VW_BI_ATTD_SUMMARY&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
				this.month = '',//页面显示格式
		                this.filters = {
		                         searchKey:'',
				recMonth:util.formatDate.format(new Date(), 'yyyyMM'),
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
					month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAttd/getAttdTotail', {params: para}).then((res) => {
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
				// return row.totalmile.toFixed(2);
			},
			
		},
		created(){
			// 默认筛选日期
			this.month = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth() )), 'yyyy-MM');
			this.filters.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth() )), 'yyyyMM');

			this.$nextTick(function(){
				this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>