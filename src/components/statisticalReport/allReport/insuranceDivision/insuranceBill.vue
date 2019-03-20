<!--* 
* @description: 保险部-对账单
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="ORDERNO" label="外系统订单号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="姓名" align="center" width="60">
			</el-table-column>
			<el-table-column prop="MOBILE" label="车主电话" align="center"  width="100">
			</el-table-column>
			<el-table-column prop="MODEL" label="车型" align="center" width="200">
			</el-table-column>
			<el-table-column prop="VEHICLEVIN" label="车架号" align="center" width="160">
				<template slot-scope="scope">
			                        <span>{{ scope.row.VEHICLEVIN == '' || scope.row.VEHICLEVIN == undefined ? scope.row.VIN : scope.row.VEHICLEVIN  }}</span>
			            </template>
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center"  >
			</el-table-column>
			<el-table-column prop="PRICE" label="车价(元)" align="center">
			</el-table-column>
			<el-table-column label="设备号" align="center">
				<el-table-column prop="PRODNUM_WIRE" label="有线" align="center" width="130"></el-table-column>
				<el-table-column prop="PRODNUM_WIRELESS" label="无线" align="center" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label="数量" align="center">
				<el-table-column prop="INSTALLAPPLYMORN" label="常规GPS" align="center"></el-table-column>
				<el-table-column prop="INSTALLAPPLYINSU" label="盗抢险GPS" align="center">
					<template slot-scope="scope">
				                        <span v-if="scope.row.INSTALLAPPLYINSU == 0 || scope.row.INSTALLAPPLYINSU == 1">{{ scope.row.INSTALLAPPLYINSU }}</span>
				                        <span v-else style="color: red">{{ scope.row.INSTALLAPPLYINSU }}</span>
				             </template>
				</el-table-column>
			</el-table-column>
			<el-table-column  label="结算价" align="center">
				<el-table-column prop="" label="常规" align="center" :formatter="saveNum"></el-table-column>
				<el-table-column prop="" label="盗抢险" align="center" :formatter="saveNum"></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="金额合计" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="DECLAREDATE" label="派单日期" align="center" :formatter="dateFormatter1" >
			</el-table-column>
			<el-table-column prop="CORPNAME" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="SALERNAME" label="业务员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLACTUALDATE" label="安装日期" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column prop="INSTALLER" label="安装技术员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLADDRESS" label="安装地址" align="center" width="180">
			</el-table-column>
			<el-table-column prop="TOTALMILE" label="公里数" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="" label="是否易盗车" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否商用车" align="center">
			</el-table-column>
			<el-table-column prop="" label="万网备注" align="center">
			</el-table-column>
			<el-table-column prop="" label="风控情况备注" align="center">
			</el-table-column>
			<el-table-column prop="" label="资管情况备注" align="center">
			</el-table-column>
			<el-table-column prop="" label="风控确认是否结款" align="center">
			</el-table-column>
			<el-table-column prop="INSU_POLICYNO" label="保函编号" align="center" width="120">
			</el-table-column>
			<el-table-column prop="INSURANCECORP" label="保险公司" align="center" width="200">
			</el-table-column>
			<el-table-column prop="INSU_PRICE" label="保费" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="INSU_VEHICLEPRICE" label="保险车价" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="INSU_REMARK" label="备注" align="center">
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
				month:'',//页面显示格式
				filters: {
					searchKey:'',
					recMonth:util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
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
				window.location.href = '/vasms-web/api/v1/bi/biInsurance/export_statement?_viewName=BIINSURANCE_STATEMENT&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
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
				axios.get('/vasms-web/api/v1/bi/biInsurance/statement', {params: para}).then((res) => {
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
			// 默认筛选日期
			this.month = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filters.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');

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