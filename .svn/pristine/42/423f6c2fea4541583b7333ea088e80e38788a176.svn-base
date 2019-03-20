<!--* 
* @description: 售后监控部-设备运行统计表
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
				<el-form-item prop="startDate" label="接入时间">
				            <el-date-picker
					            v-model="filters.startDate"
					            type="daterange"
					            range-separator="至"
					            start-placeholder="开始日期"
					            end-placeholder="结束日期"
					            :picker-options="pickerOptions">
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
			<el-table-column prop="CORPNAME" label="所属公司" align="center" width="110">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="车主" align="center">
			</el-table-column>
			<el-table-column prop="GPSTIME" label="GPS时间" align="center" :formatter="dateFormatter2"  width="150" >
			</el-table-column>
			<el-table-column prop="SERVERTIME" label="服务器时间" align="center" :formatter="dateFormatter3"  width="150" >
			</el-table-column>
			<el-table-column prop="PRODNUM" label="设备ID" align="center" width="130">
			</el-table-column>
			<el-table-column prop="SIMCARD" label="SIM卡号" align="center" width="110">
			</el-table-column>
			<el-table-column prop="PRODSTATUS" label="设备状态" align="center">
			</el-table-column>
			<el-table-column prop="PRODSTATUSDETAIL" label="设备状态明细" align="center">
			</el-table-column>
			<el-table-column prop="INSTALLACTUALDATE" label="实际安装时间" align="center" :formatter="dateFormatter1" >
			</el-table-column>
			<el-table-column prop="VEHICLEMODEL" label="车辆型号" align="center" width="180">
			</el-table-column>
			<el-table-column prop="LASTONLINEADDRESS" label="车辆位置" align="center" width="180">
			</el-table-column>
			<el-table-column prop="HASTHEFTINSURANCE" label="是否保险" align="center">
			</el-table-column>
			<el-table-column prop="PRODSPEC" label="设备类型" align="center">
			</el-table-column>
			<el-table-column prop="DECLAREDATE" label="报单日期" align="center" :formatter="dateFormatter4" >
			</el-table-column>
			<el-table-column prop="APPOINTDATE" label="设备接入时间" align="center" :formatter="dateFormatter5"  width="150">
			</el-table-column>
			<el-table-column prop="OWNERTEL" label="手机号码" align="center" width="100">
			</el-table-column>
			<el-table-column prop="INSTALLPOSITION" label="安装位置" align="center" width="150">
			</el-table-column>
			<el-table-column prop="INSTALLBY" label="安装人员" align="center">
			</el-table-column>
			<el-table-column prop="INSTALLADDRESS" label="安装地址" align="center" width="150">
			</el-table-column>
			<el-table-column prop="INSTALLGROUP" label="安装分组" align="center">
			</el-table-column>
			<el-table-column prop="DECLARESTATUS" label="报单状态" align="center">
			</el-table-column>
			<el-table-column prop="ORDERNO" label="订单号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="ASSIGNBY" label="派单人" align="center">
			</el-table-column> -->
			<el-table-column prop="CONTACTPERSON" label="业务员" align="center">
			</el-table-column>
			<el-table-column prop="CONTACTMOBILE" label="业务员联系方式" align="center" width="100">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center" width="100">
			</el-table-column>
			<el-table-column prop="PRODMODEL" label="设备型号" align="center">
			</el-table-column>
			<el-table-column prop="VEHICLETYPE" label="车辆类型" align="center">
			</el-table-column>
			<el-table-column prop="VEHICLESTATUS" label="车辆状态" align="center">
			</el-table-column>
			<el-table-column prop="LASTONLINEVEO" label="速度" align="center">
			</el-table-column>
			<el-table-column prop="LASTONLINEDIRECTO" label="方向" align="center">
			</el-table-column>
			<el-table-column prop="GENDER" label="性别" align="center">
			</el-table-column>
			<el-table-column prop="OWNERADDRESS" label="车主地址" align="center" width="110">
			</el-table-column>
			<el-table-column prop="IDCARD" label="身份证" align="center" width="150">
			</el-table-column>
			<el-table-column prop="SERVICESTARTDATE" label="服务器开启时间" align="center" :formatter="dateFormatter6" width="150">
			</el-table-column>
			<el-table-column prop="SERVICEENDDATE" label="服务器结束时间" align="center" :formatter="dateFormatter7" width="150">
			</el-table-column>
			<el-table-column prop="LASTONLINELNG" label="经度" align="center">
			</el-table-column>
			<el-table-column prop="LASTONLINELAT" label="纬度" align="center">
			</el-table-column>
			<el-table-column prop="LASTONLINEALT" label="高度" align="center">
			</el-table-column>
			<el-table-column prop="SIMCARDNUM" label="SIM卡EMEI号" align="center" width="170">
			</el-table-column>
			<el-table-column prop="POLICYNO" label="保单号" align="center" width="110">
			</el-table-column>
			<el-table-column prop="INSURANCECORP" label="保险公司" align="center" width="150">
			</el-table-column>
			<el-table-column prop="ISSUEDATE" label="保险出单日期" align="center" :formatter="dateFormatter10">
			</el-table-column>
			<el-table-column prop="EFFECTIVEDATE" label="保险生效日期" align="center" :formatter="dateFormatter8">
			</el-table-column>
			<el-table-column prop="EXPIREDATE" label="保险失效日期" align="center" :formatter="dateFormatter9">
			</el-table-column>
			<el-table-column prop="INDEMNITYLIMIT" label="保单赔偿限额" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="BENEFICIARY" label="保险受益人" align="center"  width="150">
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
					startDate: '',
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
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/exportProdRun?_viewName=VW_RPT_GIS_PRODSTATUS&token=' + this.$store.getters.userInfo.token + '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '') 
					+ '&corpname=' + this.filters.corpname + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				startDate: '',
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
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getProdRunGis', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.INSTALLACTUALDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.INSTALLACTUALDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.GPSTIME == undefined) return '--';
				return util.formatDate.format(new Date(row.GPSTIME), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter3(row, col) {
				if(row.SERVERTIME == undefined) return '--';
				return util.formatDate.format(new Date(row.SERVERTIME), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter4(row, col) {
				if(row.DECLAREDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.DECLAREDATE), 'yyyy-MM-dd');
			},
			dateFormatter5(row, col) {
				if(row.APPOINTDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.APPOINTDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter6(row, col) {
				if(row.SERVICESTARTDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.SERVICESTARTDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter7(row, col) {
				if(row.SERVICEENDDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.SERVICEENDDATE), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter8(row, col) {
				if(row.EFFECTIVEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.EFFECTIVEDATE), 'yyyy-MM-dd');
			},
			dateFormatter9(row, col) {
				if(row.EXPIREDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.EXPIREDATE), 'yyyy-MM-dd');
			},
			dateFormatter10(row, col) {
				if(row.ISSUEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.ISSUEDATE), 'yyyy-MM-dd');
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