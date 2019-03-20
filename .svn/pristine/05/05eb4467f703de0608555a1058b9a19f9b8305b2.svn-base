<!--* 
* @description: 库房-超龄库存明细
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
				<!-- <el-form-item prop="month">
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择月份">
					</el-date-picker>
				</el-form-item> -->
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="REC_AREA" label="地区" align="center" sortable>
			</el-table-column>
			<el-table-column prop="STORAGENAME" label="库房名称" align="center" sortable>
			</el-table-column>
			<el-table-column prop="STORAGELEVEL" label="库房等级" align="center">
			</el-table-column>
			<el-table-column prop="STOINDATE" label="入库时间" align="center" :formatter="dateFormatter" >
			</el-table-column>
			<el-table-column prop="PRODMODEL" label="设备型号" align="center">
			</el-table-column>
			<el-table-column prop="PRODNUM" label="设备号" align="center">
			</el-table-column>
			<el-table-column prop="CARDMODEL" label="卡型号" align="center">
			</el-table-column>
			<el-table-column prop="CARDNUM" label="卡号" align="center">
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
				month:util.formatDate.format(new Date(), 'yyyy-MM'),
				filters: {
					searchKey:'',
					recMonth:util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
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
				this.filters.recMonth =  util.formatDate.format(new Date(date), 'yyyyMM');
			},
			
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/export?_viewName=VW_BI_OLDPROD_BALANCE_DETAIL&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.month = util.formatDate.format(new Date(), 'yyyy-MM'),//页面显示格式
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
					// month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biViewNameAll?_viewName=VW_BI_OLDPROD_BALANCE_DETAIL', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter(row, col) {
				if(row.STOINDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.STOINDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.installactualdate == undefined) return '--';
				return util.formatDate.format(new Date(row.installactualdate), 'yyyy-MM-dd');
			},
			
		},
		created(){
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