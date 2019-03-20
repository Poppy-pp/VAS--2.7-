<!--* 
* @description: 售后监控部-关注报表
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
				<el-form-item prop="month" label="关注时间">
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="CORPNAME" label="公司名称" align="center" width="100">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="客户姓名" align="center">
			</el-table-column>
			<el-table-column prop="FAVTYPE" label="关注类型" align="center"  width="100">
			</el-table-column>
			<el-table-column prop="MODEL" label="车型" align="center" width="120">
			</el-table-column>
			<el-table-column prop="VEHICLESTATE" label="车辆状态" align="center" width="100">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="LASTONLINEADDRESS" label="车辆位置" align="center" width="230">
			</el-table-column>
			<el-table-column prop="LASTONLINEDATE" label="GPS时间" align="center" :formatter="dateFormatter1" width="140">
			</el-table-column>
			<el-table-column prop="LASTONLINERECDATE" label="服务器时间" align="center" :formatter="dateFormatter2" width="140">
			</el-table-column>
			<el-table-column prop="PRODNUM" label="设备号" align="center" width="120">
			</el-table-column>
			<el-table-column prop="CARDNUM" label="SIM卡号" align="center" width="110">
			</el-table-column>
			<el-table-column prop="EFENCENAME" label="电子围栏" align="center">
			</el-table-column>
			<el-table-column prop="RADIUS" label="原地设防(米)" align="center" width="90">
			</el-table-column>
			<el-table-column prop="INS_REMARKS" label="备注" align="center">
			</el-table-column>
			<el-table-column prop="FAVBY" label="操作人" align="center" width="80">
			</el-table-column>
			<el-table-column prop="FAVDATE" label="关注时间" align="center" :formatter="dateFormatter3" >
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
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/export_fav?_viewName=VW_BI_AFTERSALE_FAV&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&corpname=' + this.filters.corpname + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
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
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getFav', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.LASTONLINEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.LASTONLINEDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter2(row, col) {
				if(row.LASTONLINERECDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.LASTONLINERECDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter3(row, col) {
				if(row.FAVDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.FAVDATE), 'yyyy-MM-dd');
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