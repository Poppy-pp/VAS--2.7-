<!--* 
* @description: 保险部-投保清单
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
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择出单月份">
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
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
				<el-table-column prop="" label="常规" align="center"></el-table-column>
				<el-table-column prop="" label="盗抢险" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="金额合计" align="center">
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
			<el-table-column prop="TOTALMILE" label="公里数" align="center" :formatter="saveNum1">
			</el-table-column>
			<el-table-column prop="PRODMODEL_WIRE" label="安装设备型号" align="center">
			</el-table-column>
			<el-table-column prop="CARDNUM_WIRE" label="设备SIM卡号" align="center">
			</el-table-column>
			<el-table-column prop="INSU_APPLICANTIDCARD" label="投保身份证号" align="center">
			</el-table-column>
			<el-table-column prop="" label="联系地址" align="center">
			</el-table-column>
			<el-table-column prop="" label="厂牌型号" align="center" width="200">
			</el-table-column>
			<el-table-column prop="INSU_VEHICLEENGINENUM" label="发动机号" align="center">
			</el-table-column>
			<el-table-column prop="" label="初次登记年月" align="center">
			</el-table-column>
			<el-table-column prop="" label="保单信息" align="center">
				<el-table-column prop="INSU_ISSUEDATE" label="出单日期" align="center" :formatter="dateFormatter5"></el-table-column>
				<el-table-column prop="INSU_INDEMNITYLIMIT" label="赔偿限额(万元)" align="center" :formatter="saveNum2"></el-table-column>
				<el-table-column prop="" label="万网车辆盗抢保障费用(元)" align="center" :formatter="saveNum3"></el-table-column>
				<el-table-column prop="INSU_BENEFICIARY" label="第一受益人" align="center"></el-table-column>
				<el-table-column prop="INSU_EFFECTIVEDATE" label="生效日期" align="center" :formatter="dateFormatter3"></el-table-column>
				<el-table-column prop="INSU_EXPIREDATE" label="失效日期" align="center" :formatter="dateFormatter4"></el-table-column>
				<el-table-column prop="INSU_POLICYNO" label="保险函编号" align="center" width="120"></el-table-column>
				<el-table-column prop="INSURANCECORP" label="保险公司" align="center" width="200"></el-table-column>
				<el-table-column prop="INSU_REMARK" label="批单备注" align="center"></el-table-column>
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
				window.location.href = '/vasms-web/api/v1/bi/biInsurance/export?_viewName=VW_BI_INSURANCE_DETAIL&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
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
					_viewName: 'VW_BI_INSURANCE_DETAIL'
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biInsurance', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.DECLAREDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.DECLAREDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.INSTALLACTUALDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSTALLACTUALDATE), 'yyyy-MM-dd');
			},
			dateFormatter3(row, col) {
				if(row.INSU_EFFECTIVEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSU_EFFECTIVEDATE), 'yyyy-MM-dd');
			},
			dateFormatter4(row, col) {
				if(row.INSU_EXPIREDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSU_EXPIREDATE), 'yyyy-MM-dd');
			},
			dateFormatter5(row, col) {
				if(row.INSU_ISSUEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSU_ISSUEDATE), 'yyyy-MM-dd');
			},
			// 保留两位小数
			saveNum1(row, col) {//保留两位小数
				if (row.NORMPRICE == undefined)return;
				return row.NORMPRICE.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.INDEMNITYLIMIT == undefined)return;
				return row.INDEMNITYLIMIT.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.INSURANCEPRICE == undefined)return;
				return row.INSURANCEPRICE.toFixed(2);
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