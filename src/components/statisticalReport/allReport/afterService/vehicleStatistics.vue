<!--* 
* @description: 售后监控部-车辆统计表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">{{'全部车辆:' + fromNum.num1}}</el-radio-button>
		                <el-radio-button label="2">{{'行驶车辆:' + fromNum.num2}}</el-radio-button>
		                <el-radio-button label="3">{{'静止车辆:' + fromNum.num3}}</el-radio-button>
		                <el-radio-button label="4">{{'离线车辆:' + fromNum.num4}}</el-radio-button>
		            </el-radio-group>
		</el-col>
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
			<el-table-column prop="CORPNAME" label="公司名称" align="center">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="180">
			</el-table-column>
			<el-table-column prop="PRODNUM" label="设备号" align="center">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="车主" align="center">
			</el-table-column>
			<el-table-column prop="OWNERTEL" label="车主电话" align="center">
			</el-table-column>
			<el-table-column prop="VEHICLESTATUS" label="通讯状态" align="center">
			</el-table-column>
			<el-table-column prop="STATUS" label="车辆状态" align="center" >
			</el-table-column>
			<el-table-column prop="" label="离线原因" align="center">
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
				filters: {
					searchKey:'',
					corpname:[],
					vehiclestatus:'',
				},
				stepState:1,
				fromNum:{
			                    num1:0,
			                    num2:0,
			                    num3:0,
			                    num4:0,
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
			//切换
			handleClick(val){
				console.log(val)
				if(val == 1){
			                         this.filters.vehiclestatus = '';
			            }else if (val == 2) {
			            		this.filters.vehiclestatus = '行驶';
			            }else if (val == 3) {
			            		this.filters.vehiclestatus = '静止';
			            }else if (val == 4) {
			            		this.filters.vehiclestatus = '离线';
			            }
			           this.getData();
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/exportVehicle?_viewName=VW_RPT_GIS_VEHICLESTATUS&token=' + this.$store.getters.userInfo.token  + '&showCount=' + 20000 + '&searchKey=' + this.filters.searchKey + '&corpname=' + this.filters.corpname + '&vehiclestatus=' + this.filters.vehiclestatus;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				corpname:[],
				vehiclestatus:'',
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
					vehiclestatus:this.filters.vehiclestatus,
				};
				para = Object.assign(para,this.vehStatus);
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getVehicleGis', {params: para}).then((res) => {
					if (para.vehiclestatus == '') {
						this.fromNum.num1 =  res.data.data.totalResult;
					}
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});

				let paraTwo = {
					searchKey: this.filters.searchKey,
					corpname:this.filters.corpname.join(','),
					vehiclestatus:this.filters.vehiclestatus,
				};
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getVehicleCount', {params: paraTwo}).then((res) => {
					loading.close();//关闭加载
					res.data.data.forEach((item,index) => {
						if (item.STAE == '静止') {
							this.fromNum.num3 = item.STATCOUNT;
						}else if (item.STAE == '行驶') {
							this.fromNum.num2 = item.STATCOUNT;
						}else if (item.STAE == '离线') {
							this.fromNum.num4 = item.STATCOUNT;
						}
					});
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
			saveNum1(row, col) {//保留两位小数
				return row.totalmile.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				return row.totalmile.toFixed(2);
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