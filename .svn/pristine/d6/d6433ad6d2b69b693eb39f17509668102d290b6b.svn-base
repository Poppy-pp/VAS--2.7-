<!--* 
* @description: 保险部-异动明细表
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" show-summary>
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="ORDERNO" label="订单号" align="center" width="60">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="姓名" align="center" width="60">
			</el-table-column>
			<el-table-column prop="MOBILE" label="车主电话" align="center"  width="100">
			</el-table-column>
			<el-table-column prop="MODEL" label="车型" align="center" width="200">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
				<template slot-scope="scope">
			                        <span v-if="scope.row.VIN.length == 17">{{ scope.row.VIN }}</span>
			                        <span v-else style="color: red">{{ scope.row.VIN }}</span>
			             </template>
			</el-table-column>
			<el-table-column prop="PRICE" label="车价(元)" align="center">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center"  >
			</el-table-column>
			<el-table-column label="设备号" align="center">
				<el-table-column prop="PRODNUM_WIRE" label="有线" align="center" width="130"></el-table-column>
				<el-table-column prop="PRODNUM_WIRELESS" label="无线" align="center" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label="数量" align="center">
				<el-table-column prop="INSTALLAPPLYMORN" label="常规GPS" align="center"></el-table-column>
				<el-table-column prop="INSTALLAPPLYINSU" label="盗抢险GPS" align="center">
					<template slot-scope="scope">
				                        <span v-if="scope.row.installapplyinsu == 0 || scope.row.installapplyinsu == 1">{{ scope.row.installapplyinsu }}</span>
				                        <span v-else style="color: red">{{ scope.row.installapplyinsu }}</span>
				             </template>
				</el-table-column>
			</el-table-column>
			<el-table-column  label="结算价" align="center">
				<el-table-column prop="SETTLEMENT_PRICE_MORN" label="常规" align="center" :formatter="saveNum"></el-table-column>
				<el-table-column prop="SETTLEMENT_PRICE_INSU" label="盗抢险" align="center" :formatter="saveNum"></el-table-column>
			</el-table-column>
			<el-table-column prop="AMOUNT_TOTAL" label="金额合计" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="ASSIGNDATE" label="派单日期" align="center"  >
			</el-table-column>
			<el-table-column prop="CORPNAME" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="SALERNAME" label="业务员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLACTUALDATE" label="安装日期" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column prop="INSTALLBY" label="安装技术员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLADDRESS" label="安装地点" align="center" width="80">
			</el-table-column>
			<el-table-column prop="MILE" label="公里数" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="WW_REMARK" label="万网备注" align="center">
			</el-table-column>
			<el-table-column prop="PCS_REMARK" label="风控情况备注" align="center">
			</el-table-column>
			<el-table-column prop="ITI_REMARK" label="资管情况备注" align="center">
			</el-table-column>
			<el-table-column prop="PCS_GATHERING" label="风控确认是否结款" align="center">
			</el-table-column>
			<el-table-column prop="WW_REMARKAgain" label="万网再次备注" align="center">
			</el-table-column>
			<el-table-column label="次月初核对数据" align="center">
				<el-table-column prop="LOI_NUMBER" label="保函编号" align="center"></el-table-column>
				<el-table-column prop="INSURANCE_COMPANY" label="保险公司" align="center"></el-table-column>
				<el-table-column prop="PREMIUM" label="保费" align="center" :formatter="saveNum"></el-table-column>
				<el-table-column prop="INSU_PRICE" label="车价(元)" align="center"></el-table-column>
				<el-table-column prop="REMARK" label="备注" align="center"></el-table-column>
			</el-table-column>
			<el-table-column label="异动信息" align="center">
				<el-table-column prop="DIFFISSUE_MONTH" label="出单月份" align="center"></el-table-column>
				<el-table-column prop="DIFFINSU_COMPANY" label="保险公司" align="center"></el-table-column>
				<el-table-column prop="DIFF_PREMIUM" label="保费" align="center" :formatter="saveNum"></el-table-column>
				<el-table-column prop="DIFF_PRICE" label="出单车价(元)" align="center"></el-table-column>
				<el-table-column prop="DIFF_RESONE" label="异动原因" align="center"></el-table-column>
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
				filtersTwo: {
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
			changeTimeTwo(date) {
				if(!date) {
					this.filtersTwo.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filtersTwo.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=保险异动明细表&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
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