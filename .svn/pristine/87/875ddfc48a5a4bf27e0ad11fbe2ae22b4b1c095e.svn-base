<!--* 
* @description: 售后监控部-设备运营报告
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">设备运营月报</el-radio-button>
		                <el-radio-button label="2">设备运营周报</el-radio-button>
		            </el-radio-group>
		</el-col>

		<div v-show="stepState == '1'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item prop="searchKey">
						<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="corpid">
						<el-select v-model="filters.corpid" clearable filterable placeholder="公司名称" @visible-change="corpChange"   remote :remote-method="corpRemoteMethod" :loading="corploading"  multiple>
							<el-option v-for="item in corpOptions" :key="item.corpname" :label="item.corpname" :value="item.id">
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
					<el-button type="warning" icon="el-icon-download" @click="handleExport1" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column :label="month + ' 月'" align="center">
					<el-table-column prop="CORPNAME" label="公司名称" align="center" width="120"></el-table-column>
					<el-table-column label="车辆总数" align="center">
						<el-table-column prop="TOTALVEHICLE" label="车辆总数" align="center"></el-table-column>
						<el-table-column prop="TOTALONLINE" label="车辆在线数" align="center"></el-table-column>
						<el-table-column prop="VEPROB" label="车辆在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="设备" align="center">
						<el-table-column prop="TOTALPROD" label="设备总数" align="center"></el-table-column>
						<el-table-column prop="TOTALPRODONLINE" label="设备在线数" align="center"></el-table-column>
						<el-table-column prop="PRODPROB" label="设备在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="保险车辆数" align="center">
						<el-table-column prop="TOTALINSU" label="保险车辆总数" align="center"></el-table-column>
						<el-table-column prop="TOTALINSUONLINE" label="保险在线数" align="center"></el-table-column>
						<el-table-column prop="INSUPROB" label="保险在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column  label="有线设备数(离线3天内为在线)" align="center">
						<el-table-column prop="TOTALWIRE" label="总数" align="center"></el-table-column>
						<el-table-column prop="TOTALWIREONLINE" label="有线在线数" align="center"></el-table-column>
						<el-table-column prop="WIREPROB" label="在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="无线设备数(离线7天内为在线)" align="center">
						<el-table-column prop="TOTALWIRELESS" label="总数" align="center"></el-table-column>
						<el-table-column prop="TOTALWIRELESSONLINE" label="无线在线数" align="center"></el-table-column>
						<el-table-column prop="WIRELESSPROB" label="在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="车辆数" align="center">
						<el-table-column prop="OFFLINE3DAYS" label="离线3天以上" align="center"></el-table-column>
						<el-table-column prop="OFFLINE7DAYS" label="离线7天以上" align="center"></el-table-column>
						<el-table-column prop="PARK3DAYS" label="停车超时3天以上" align="center"></el-table-column>
						<el-table-column prop="CROSSPROVINCE" label="客户出省数" align="center"></el-table-column>
						<el-table-column prop="EMPLOYEENAME" label="售后文员" align="center"></el-table-column>
						<el-table-column prop="" label="备注" align="center"></el-table-column>
					</el-table-column>
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
						<el-input v-model="filtersTwo.searchKey" @keyup.enter.native="getDataTwo" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="corpid">
						<el-select v-model="filtersTwo.corpid" clearable filterable placeholder="公司名称" @visible-change="corpChange"   remote :remote-method="corpRemoteMethod" :loading="corploading"  multiple>
							<el-option v-for="item in corpOptions" :key="item.corpname" :label="item.corpname" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="week">
						<el-date-picker @change="changeTimeTwo" v-model="filtersTwo.week" type="week" format="yyyy 第 WW 周" placeholder="选择周"></el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getDataTwo">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport2" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listDataTwo" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column :label="week + ' 周'" align="center">
					<el-table-column prop="CORPNAME" label="公司名称" align="center" width="120"></el-table-column>
					<el-table-column label="车辆总数" align="center">
						<el-table-column prop="TOTALVEHICLE" label="车辆总数" align="center"></el-table-column>
						<el-table-column prop="TOTALONLINE" label="车辆在线数" align="center"></el-table-column>
						<el-table-column prop="VEPROB" label="车辆在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="设备" align="center">
						<el-table-column prop="TOTALPROD" label="设备总数" align="center"></el-table-column>
						<el-table-column prop="TOTALPRODONLINE" label="设备在线数" align="center"></el-table-column>
						<el-table-column prop="PRODPROB" label="设备在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="保险车辆数" align="center">
						<el-table-column prop="TOTALINSU" label="保险车辆总数" align="center"></el-table-column>
						<el-table-column prop="TOTALINSUONLINE" label="保险在线数" align="center"></el-table-column>
						<el-table-column prop="INSUPROB" label="保险在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column  label="有线设备数(离线3天内为在线)" align="center">
						<el-table-column prop="TOTALWIRE" label="总数" align="center"></el-table-column>
						<el-table-column prop="TOTALWIREONLINE" label="有线在线数" align="center"></el-table-column>
						<el-table-column prop="WIREPROB" label="在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="无线设备数(离线7天内为在线)" align="center">
						<el-table-column prop="TOTALWIRELESS" label="总数" align="center"></el-table-column>
						<el-table-column prop="TOTALWIRELESSONLINE" label="无线在线数" align="center"></el-table-column>
						<el-table-column prop="WIRELESSPROB" label="在线率" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="车辆数" align="center">
						<el-table-column prop="OFFLINE3DAYS" label="离线3天以上" align="center"></el-table-column>
						<el-table-column prop="OFFLINE7DAYS" label="离线7天以上" align="center"></el-table-column>
						<el-table-column prop="PARK3DAYS" label="停车超时3天以上" align="center"></el-table-column>
						<el-table-column prop="CROSSPROVINCE" label="客户出省数" align="center"></el-table-column>
						<el-table-column prop="EMPLOYEENAME" label="售后文员" align="center"></el-table-column>
						<el-table-column prop="" label="备注" align="center"></el-table-column>
					</el-table-column>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="handleSizeChangeTwo" background @current-change="handleCurrentChangeTwo" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="totalTwo" style="float:right;">
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
				month:'',
				filters: {
					searchKey:'',
					recMonth: util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
					corpid:[],
				},
				filtersTwo: {
					searchKey:'',
					week:new Date(),
					corpid:[],
				},
				week:util.getWeekScope(new Date()),
				total: 0,
				currentPage: 1,
				totalTwo: 0,
				currentPageTwo: 1,
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
				if (val == 2) {
					this.getDataTwo();
				}else{
					this.getData();
				}
			},
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
			changeTimeTwo(date) {
				if(!date) {
					this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
					return;
				};
				this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
			},
			/*导出*/
			handleExport1() {
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/export_veOnline?_viewName=VW_BI_VEHICLE_ONLINE_MONTHLY&token=' + this.$store.getters.userInfo.token + '&corpid=' + this.filters.corpid + '&month=' + this.filters.recMonth + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/export_veOnline?_viewName=VW_BI_VEHICLE_ONLINE_WEEKLY&token=' + this.$store.getters.userInfo.token + '&corpid=' + this.filtersTwo.corpid + '&searchKey=' + this.filtersTwo.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.month = '',//页面显示格式
		                this.filters = {
		                         searchKey:'',
				recMonth: util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM'),
				corpid:[],
		                }
		                this.filtersTwo = {
		                         searchKey:'',
				week:new Date(),
				corpid:[],
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
			//切换当前页
			handleCurrentChangeTwo(val) {
				this.currentPageTwo = val;
				this.getDataTwo();
			},
			//切换每页显示数量
			handleSizeChangeTwo(val) {
				this.pageSize = val;
				this.getDataTwo();
			},
			//获取用户列表
			getData() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					corpid:this.filters.corpid.join(','),
					month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getVehicleOnline?_viewName=VW_BI_VEHICLE_ONLINE_MONTHLY', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			//获取用户列表
			getDataTwo() {
				let para = {
					currentPage: this.currentPageTwo,
					showCount: this.pageSize,
					searchKey: this.filtersTwo.searchKey,
					corpid:this.filtersTwo.corpid.join(','),
					week     : util.formatDate.format(new Date(this.filtersTwo.week), 'yyyy-MM-dd'),
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getVehicleOnline?_viewName=VW_BI_VEHICLE_ONLINE_WEEKLY', {params: para}).then((res) => {
					this.totalTwo = res.data.data.totalResult;
					this.listDataTwo = res.data.data.records;
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
			this.week = util.getWeekScope(new Date(new Date().setDate(new Date().getDate()-7)));//上周
			this.filtersTwo.week = new Date(new Date().setDate((new Date().getDate() - 7)));//上周

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