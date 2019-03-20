<!--* 
* @description: 库房-未收款、外借设备明细
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">超3月未收款设备明细</el-radio-button>
		                <el-radio-button label="2">外借设备明细</el-radio-button>
		            </el-radio-group>
		</el-col>

		<div v-show="stepState == '1'">
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
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport1" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="PROD_NAME" label="名称" align="center">
				</el-table-column>
				<el-table-column prop="RECEIVER" label="领取人" align="center">
				</el-table-column>
				<el-table-column prop="MODEL" label="型号" align="center">
				</el-table-column>
				<el-table-column prop="PROD_NUM" label="数量" align="center">
				</el-table-column>
				<el-table-column prop="RECEIV_DATE" label="领取日期" align="center" :formatter="dateFormatter1" >
				</el-table-column>
				<el-table-column prop="REMARK" label="备注" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</div>
		      

		<div v-show="stepState == '2'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filtersTwo">
					<el-form-item prop="searchKey">
						<el-input v-model="filtersTwo.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="month">
						<el-date-picker @change="changeTimeTwo" :picker-options="pickerOptions" v-model="filtersTwo.month" type="month" placeholder="请选择月份"></el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport2" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listDataTwo" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="LEND_OUT_DATE" label="日期" align="center" :formatter="dateFormatter2" >
				</el-table-column>
				<el-table-column prop="SALESMAN" label="业务员" align="center">
				</el-table-column>
				<el-table-column prop="CUST_CORP" label="客户公司" align="center">
				</el-table-column>
				<el-table-column prop="PRODSNUM" label="自编号" align="center">
				</el-table-column>
				<el-table-column prop="PRODNUM" label="设备号" align="center">
				</el-table-column>
				<el-table-column prop="CARDNUM" label="卡号" align="center">
				</el-table-column>
				<el-table-column prop="PROD_MODEL" label="设备型号" align="center">
				</el-table-column>
				<el-table-column prop="CARD_MODEL" label="卡型号" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</div>
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
				stepState:'1',
				windowOutHeight: 700,
				filters: {
					searchKey:'',
					month:util.formatDate.format(new Date(), 'yyyy-MM'),
				},
				filtersTwo: {
					searchKey:'',
					month:util.formatDate.format(new Date(), 'yyyy-MM'),
				},
				week:'',
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
			// 点击tab切换事件
			handleClick(val) {
			        console.log(val);
			},
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			//选择时间
			changeTimeTwo(date) {
				if(!date) {
					this.filtersTwo.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filtersTwo.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			/*导出*/
			handleExport1() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=超3月未收款设备明细&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=外借设备明细&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				month: util.formatDate.format(new Date(), 'yyyy-MM'),
		                }
		                this.filtersTwo = {
		                         searchKey:'',
				month: util.formatDate.format(new Date(), 'yyyy-MM'),
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