<!--* 
* @description: 售后监控部-设备交接表
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
				<el-form-item prop="corpname">
					<el-select v-model="filters.corpname" clearable filterable placeholder="公司名称" @visible-change="corpChange"  remote :remote-method="corpRemoteMethod" :loading="corploading"  multiple>
						<el-option v-for="item in corpOptions" :key="item.corpname" :label="item.corpname" :value="item.corpname">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="month">
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择安装月份">
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="CORPNAME" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="车主" align="center">
			</el-table-column>
			<el-table-column prop="MOBILE" label="手机号码" align="center" width="100">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="150">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="MODEL" label="车辆型号" align="center" width="180">
			</el-table-column>
			<el-table-column label="设备ID" align="center">
				<el-table-column prop="PRODNUM_WIRE" label="有线" align="center" width="130"></el-table-column>
				<el-table-column prop="PRODNUM_WIRELESS" label="无线" align="center" width="100"></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="设备类型" align="center">
				<el-table-column prop="PRODMODEL_WIRE" label="有线" align="center"></el-table-column>
				<el-table-column prop="PRODMODEL_WIRELESS" label="无线" align="center"></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="卡号" align="center">
				<el-table-column prop="CARDNUM_WIRE" label="有线" align="center" width="110"></el-table-column>
				<el-table-column prop="CARDNUM_WIRELESS" label="无线" align="center" width="110"></el-table-column>
			</el-table-column>
			<el-table-column prop="HASTHEFTINSURANCE" label="是否保险" align="center" :formatter="isiHaveinsu">
			</el-table-column>
			<el-table-column prop="DECLAREDATE" label="报单日期" align="center" :formatter="dateFormatter1" width="100">
			</el-table-column>
			<el-table-column prop="REJECTREASON" label="退回原因" align="center">
			</el-table-column>
			<el-table-column prop="INSTALLACTUALDATE" label="实际安装时间" align="center" :formatter="dateFormatter2" width="140">
			</el-table-column>
			<el-table-column prop="INSTALLER" label="安装技术员" align="center">
			</el-table-column>
			<el-table-column prop="" label="安装位置" align="center">
				<el-table-column prop="POSITION_WIRE" label="有线" align="center" width="150"></el-table-column>
				<el-table-column prop="POSITION_WIRELESS" label="无线" align="center" width="150"></el-table-column>
			</el-table-column>
			<el-table-column label="设备接入时间" align="center">
				<el-table-column label="有线" align="center" width="80">
					<template scope="scope">
					    <p>{{ 
					    (scope.row.APPOINTDATE_WIRE1 && scope.row.APPOINTDATE_WIRE2) ? (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRE1), 'yyyy/MM/dd') + ',' + fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRE2), 'yyyy/MM/dd')) : 
					    scope.row.APPOINTDATE_WIRE1 ? (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRE1), 'yyyy/MM/dd')) :
					    scope.row.APPOINTDATE_WIRE2 ? (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRE2), 'yyyy/MM/dd')) :  "暂无"}}</p>
					</template>
				</el-table-column>
				<el-table-column label="无线" align="center" width="80">
					<template scope="scope">
					    <p>{{ 
					    (scope.row.APPOINTDATE_WIRELESS1 && scope.row.APPOINTDATE_WIRELESS2) ? (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRELESS1), 'yyyy/MM/dd') + ',' + fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRELESS2), 'yyyy/MM/dd')) : 
					    scope.row.APPOINTDATE_WIRELESS1 ?  (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRELESS1), 'yyyy/MM/dd')) :
					    scope.row.APPOINTDATE_WIRELESS2 ? (fmtdata.formatDate.format(new Date(scope.row.APPOINTDATE_WIRELESS2), 'yyyy/MM/dd')) :  "暂无"}}</p>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop="HANDOVERSTATUS" label="交接结果" align="center">
			</el-table-column>
			<el-table-column prop="REVIEWER" label="审核文员" align="center">
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
.el-form-item.small {width: 10%;}
</style>

<script>
	import util from '../../../../common/js/util.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				fmtdata: util,
				month:util.formatDate.format(new Date(), 'yyyy-MM'),//页面显示格式
				filters: {
					searchKey:'',
					recMonth:util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
					corpname:[],
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
				window.location.href = '/vasms-web/api/v1/bi/biHandoverDetail/export?_viewName=VW_BI_HANDOVER_DETAIL&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&corpname=' + this.filters.corpname + '&month=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
				this.month = util.formatDate.format(new Date(), 'yyyy-MM'),//页面显示格式
			             this.filters = {
			                         searchKey:'',
					recMonth:util.formatDate.format(new Date(), 'yyyyMM'),
					corpname:[],
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
					corpname:this.filters.corpname.join(','),
					month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biHandoverDetail/getList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载;
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.DECLAREDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.DECLAREDATE), 'yyyy/MM/dd');
			},
			dateFormatter2(row, col) {
				if(row.INSTALLACTUALDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSTALLACTUALDATE), 'yyyy/MM/dd hh:mm:ss') ;
			},
			isiHaveinsu(row, col) {
				return row.HASTHEFTINSURANCE == '1' ? '是' : row.HASTHEFTINSURANCE == '0' ? '否' : '--';
			},
			/*所属公司——下拉*/
		            corpChange(r) {
		                if(!r || this.corpOptions.length > 0) return;
		                let para = {
		                    showCount: 30
		                }
		                this.corploading = true;
		                axios.get('/vasms-web/api/v1/org/corporateInfo/getAllCorpName', {params: para}).then((res) => {
		                    this.corpOptions = res.data.data.records;
		                    this.corploading = false;
		                });
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
				this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>