<!--* 
* @description: 业务部-意向客户更进表
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
				<el-form-item prop="day">
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="filters.day" type="date" placeholder="请选择日期">
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
		<el-table stripe border :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="" label="业务员" align="center">
			</el-table-column>
			<el-table-column prop="" label="客户公司" align="center">
			</el-table-column>
			<el-table-column prop="" label="地址" align="center">
			</el-table-column>
			<el-table-column prop="" label="客户等级" align="center">
			</el-table-column>
			<el-table-column prop="" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="" label="客户情况" align="center">
			</el-table-column>
			<el-table-column prop="" label="建档时间" align="center">
			</el-table-column>
			<el-table-column prop="" label="合作/报价价格" align="center">
			</el-table-column>
			<el-table-column :label="filters.day + ' 跟进情况'" align="center">
				<el-table-column prop="" label="当次更进情况" align="center"></el-table-column>
				<el-table-column prop="" label="最新级别" align="center"></el-table-column>
				<el-table-column prop="" label="下次更进计划" align="center"></el-table-column>
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
					day:util.formatDate.format(new Date(), 'yyyy-MM-dd'),
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				listData:[],//表格数据
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
					this.filters.day = util.formatDate.format(new Date(date), 'yyyy-MM-dd');
					return;
				};
				this.filters.day = util.formatDate.format(new Date(date), 'yyyy-MM-dd');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/unify/unify/export?_viewName=RPT_FIN_STATEMENT&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				day: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
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
				this.listLoading = true;
				axios.get('/vasms-web/api/v1/bi/biInstallDetail/getList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
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
			
		},
		created(){
			// this.getData();
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>