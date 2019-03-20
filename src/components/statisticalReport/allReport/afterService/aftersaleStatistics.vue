<!--* 
* @description: 售后监控部-售后设备统计表
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
					<el-select v-model="filters.corpname" clearable filterable placeholder="公司名称" @visible-change="corpChange"  remote :remote-method="corpRemoteMethod" :loading="corploading" multiple>
						<el-option v-for="item in corpOptions" :key="item.corpname" :label="item.corpname" :value="item.corpname">
						</el-option>
					</el-select>
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
		<el-table stripe border :data="listData" highlight-current-row  style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="CORPNAME" label="车辆所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="车主" align="center">
			</el-table-column>
			<el-table-column prop="MODEL" label="车型" align="center" width="180">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="AFTERSALETYPE" label="派单类型" align="center">
			</el-table-column>
			<el-table-column prop="PRODMODEL" label="原终端类型" align="center">
			</el-table-column>
			<el-table-column prop="PRE_PRODNUM" label="原ID" align="center" width="130">
			</el-table-column>
			<el-table-column prop="PRE_CARDNUM" label="原SIM卡" align="center" width="110">
			</el-table-column>
			<el-table-column prop="PRE_PLANDATE" label="安装时间/上次维护时间" align="center" :formatter="dateFormatter3">
			</el-table-column>
			<el-table-column prop="PRE_INSTALLNAME" label="安装工程师/上次维护工程师" align="center">
			</el-table-column>
			<el-table-column prop="PRE_INSTALLPOSITION" label="旧设备安装位置" align="center">
			</el-table-column>
			<el-table-column prop="FAULTDESC" label="远程故障现象" align="center">
			</el-table-column>
			<el-table-column prop="CARDSTATUS" label="远程卡状态" align="center">
			</el-table-column>
			<el-table-column prop="CONTACTPERSON" label="预约联系人" align="center">
			</el-table-column>
			<el-table-column prop="CONTACTMOBILE" label="预约联系电话" align="center" width="100">
			</el-table-column>
			<el-table-column prop="PLANDATE" label="预约时间" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column prop="PLANADDRESS" label="预约地点" align="center" width="200">
			</el-table-column>
			<el-table-column prop="ACTIONRESULT" label="维护详情" align="center">
			</el-table-column>
			<el-table-column prop="NEW_PRODMODEL" label="新设备类型" align="center">
			</el-table-column>
			<el-table-column prop="NEW_PRODNUM" label="新ID" align="center">
			</el-table-column>
			<el-table-column prop="NEW_CARDNUM" label="新SIM卡" align="center">
			</el-table-column>
			<el-table-column prop="AFTERSALEPLANDATEDATE" label="本次维护时间" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column prop="NEW_INSTALLPOSITION" label="新安装位置" align="center">
			</el-table-column>
			<el-table-column prop="PLANADDRESS" label="本次维护地址" align="center"  width="200">
			</el-table-column>
			<el-table-column prop="NEW_INSTALLBY" label="本次维护技术" align="center">
			</el-table-column>
			<el-table-column prop="GROUPLEADER" label="维护组长" align="center">
			</el-table-column>
			<el-table-column prop="AFTERSALESTATUS_V" label="维护状态" align="center">
			</el-table-column>
			<el-table-column prop="ASSIGNBY" label="派单人" align="center">
			</el-table-column>
			<el-table-column prop="ASSIGNDATE" label="派单时间" align="center" :formatter="dateFormatter1" >
			</el-table-column>
			<el-table-column prop="HASTHEFTINSURANCE" label="是否保险" align="center" :formatter="hasInsu">
			</el-table-column>
			<el-table-column prop="" label="差旅费" align="center"  :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="FAULTREMARK" label="备注" align="center">
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
				month:'',
				filters: {
					searchKey:'',
					recMonth: util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
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
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/exportProd?_viewName=VW_BI_AFTERSALE_ALL&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&corpname=' + this.filters.corpname + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
				this.month = '',//页面显示格式
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
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getProdTotal', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.ASSIGNDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.ASSIGNDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.PLANDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.PLANDATE), 'yyyy-MM-dd');
			},
			dateFormatter3(row, col) {
				if(row.PRE_PLANDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.PRE_PLANDATE), 'yyyy-MM-dd');
			},
			hasInsu(row, col) {//是否保险
				return row.HASTHEFTINSURANCE == 1 ? '有' : '无';
			},
			saveNum(row, col) {//保留两位小数
				// return row.totalmile.toFixed(2);
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