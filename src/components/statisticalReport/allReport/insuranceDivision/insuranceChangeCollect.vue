<!--* 
* @description: 保险部-异动汇总表
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
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listDataTwo" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="INSURANCE_COMPANY" label="保险公司" align="center">
			</el-table-column>
			<el-table-column prop="ISSUE_MONTH" label="出单月份" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column prop="ISSUE_NUM" label="出单数量" align="center" >
			</el-table-column>
			<el-table-column prop="ISSUE_PREMIUM" label="出单保费" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="UNISSUE_NUM" label="未出数量" align="center"  >
			</el-table-column>
			<el-table-column prop="UNISSUE_PREMIUM" label="未出保费" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="DIFF_PREMIUM" label="异动保费" align="center" :formatter="saveNum">
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
				activeName:'1',
				windowOutHeight: 700,
				filters: {
					searchKey:'',
					month:util.formatDate.format(new Date(), 'yyyy-MM'),
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				listDataTwo:[],//表格数据
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
			}
		},
		methods: {
			// 点击tab切换事件
			handleClick(tab, event) {
			        console.log(tab, event);
			},
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=保险异动汇总表&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
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
					corpid:this.filters.corpid,
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
			// 保留两位小数
			saveNum(row, col) {//保留两位小数
				if (row.NORMPRICE == undefined || row.INSUPRICE == undefined || row.TOTALPRICE == undefined)return;
				return row.NORMPRICE.toFixed(2) || row.INSUPRICE.toFixed(2) || row.TOTALPRICE.toFixed(2);
			},
			// 所属公司-远程搜索
			corpRemoteMethod(query) {
			        	let para = {
					showCount: 30,
					corpname: query,
				}
				this.corploading = true;
				axios.get('/vasms-web/api/v1/org/corporateInfo/getAllCorpName', {params: para}).then((res) => {
					this.corpOptions = res.data.data.records;
					this.corploading = false;
				});
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