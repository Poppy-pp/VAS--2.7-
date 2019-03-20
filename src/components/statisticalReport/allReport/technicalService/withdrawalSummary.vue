<!--* 
* @description: 技术服务部-退单明细表
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
				<el-form-item prop="vehiclestate" class="small">
					<el-select v-model="filters.vehiclestate" clearable filterable placeholder="车辆状态">
						<el-option v-for="item in stateOptions" :key="item.label" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="corpid" class="small">
					<el-select v-model="filters.corpid" clearable filterable placeholder="所属公司" @visible-change="corpChange" remote :remote-method="corpRemoteMethod" :loading="corploading">
						<el-option v-for="item in corpOptions" :key="item.corpname" :label="item.corpname" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="startDate" label="安装日期">
				            <el-date-picker
					            v-model="filters.startDate"
					            type="daterange"
					            range-separator="至"
					            start-placeholder="开始日期"
					            end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button type="success" icon="el-icon-refresh" @click="handleImplement">刷新</el-button>
					<el-button icon="el-icon-sort"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
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
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
				<template slot-scope="scope">
			                        <span v-if="scope.row.VIN.length == 17">{{ scope.row.VIN }}</span>
			                        <span v-else style="color: red">{{ scope.row.VIN }}</span>
			             </template>
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center"  >
			</el-table-column>
			<el-table-column prop="PRICE" label="车价(元)" align="center">
			</el-table-column>
			<el-table-column prop="VEHICLESTATE" label="车辆状态" align="center" width="100">
			</el-table-column>
			<el-table-column label="设备号" align="center">
				<el-table-column prop="PRODNUM_WIRE" label="有线" align="center" width="130"></el-table-column>
				<el-table-column prop="PRODMODEL_WIRE" label="型号" align="center"></el-table-column>
				<el-table-column prop="PRODNUM_WIRELESS" label="无线" align="center" width="100"></el-table-column>
				<el-table-column prop="PRODMODEL_WIRELESS" label="型号" align="center"></el-table-column>
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
				<el-table-column prop="" label="常规" align="center" ></el-table-column>
				<el-table-column prop="" label="盗抢险" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="金额合计" align="center" >
			</el-table-column>
			<el-table-column  label="最后定位时间" align="center">
				<el-table-column prop="LASTONLINEDATE" label="有线" align="center" width="140"></el-table-column>
				<el-table-column prop="LASTONLINEDATE_WIRELESS" label="无线" align="center" width="140"></el-table-column>
			</el-table-column>
			<el-table-column prop="DECLAREDATE" label="派单日期" align="center" :formatter="dateFormatter1" >
			</el-table-column>
			<el-table-column prop="" label="众汇走款超期时间" align="center" >
			</el-table-column>
			<el-table-column prop="CORPNAME" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="SALERNAME" label="业务员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLACTUALDATE" label="安装日期" align="center" :formatter="dateFormatter2" width="140">
			</el-table-column>
			<el-table-column prop="INSTALLER" label="安装技术员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="INSTALLADDRESS" label="安装地址" align="center" width="100">
			</el-table-column>
			<el-table-column prop="TOTALMILE" label="公里数" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否易盗车" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否商用车" align="center">
			</el-table-column>
			<el-table-column prop="" label="万网备注" align="center">
				<el-table-column prop="" label="车辆情况" align="center"></el-table-column>
				<el-table-column prop="" label="未安装原因" align="center"></el-table-column>
				<el-table-column prop="" label="未安装是否告知业务员" align="center"></el-table-column>
				<el-table-column prop="" label="其他备注" align="center"></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="通知退单时间" align="center">
			</el-table-column>
			<el-table-column prop="" label="VAS派单处理时间" align="center">
			</el-table-column>
			<el-table-column prop="" label="拆机技术员" align="center">
			</el-table-column>
			<el-table-column prop="" label="处理结果" align="center">
			</el-table-column>
			<el-table-column prop="" label="未拆回原因" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否告知对方对接文员" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否保险告知" align="center">
			</el-table-column>
			<el-table-column prop="" label="是否售后文员告知" align="center">
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
				filters: {
					searchKey:'',
					startDate: '',
					vehiclestate:'',
					corpid:'',
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				stateOptions: [{//状态列表
				          value: '停车',
				          label: '停车'
				        }, {
				          value: '离线',
				          label: '离线'
				        }
				],
				corpOptions:[],//所属公司
				corploading:false,
			}
		},
		methods: {
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biInstallDetail/export?_viewName=VW_BI_CHARGEBACK&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&vehiclestate=' + this.filters.vehiclestate + '&corpid=' + this.filters.corpid + '&cancelflag=' + 1 + '&showCount=' + 20000
					+ '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '');
			},
			// 重置
			resetForm(){
		                  this.filters = {
		                         searchKey:'',
				startDate: '',
				vehiclestate:'',
				corpid:'',
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
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '',
					cancelflag:1,
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
			/*刷新*/
			handleImplement() {
				if(!this.filters.startDate) {
					this.$message({
						message: "请选择日期在执行",
						type: 'warning'
					});
					return;
				}
				this.$confirm('此操作将刷新 ' + util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM') + '~' + util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM') + ' 信息，是否刷新？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let para = {
						p_name: 'P_CALCULATE_SERVICE_MAIN_DTL',
						params: util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMM'),
					};
					axios.get('/vasms-web/api/v1/bi/biInstallDetail/callp', {params: para}).then((res) => {
						this.getData();
						this.$message({
							message: "刷新成功！",
							type: 'success'
						});
					});
				}).catch(() => {});
			},

			// 格式转换
			dateFormatter(row, col) {
				if(row.LASTONLINEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.LASTONLINEDATE), 'yyyy/MM/dd');
			},
			dateFormatter1(row, col) {
				if(row.declaredate == undefined) return '--';
				return util.formatDate.format(new Date(row.declaredate), 'yyyy/MM/dd');
			},
			dateFormatter2(row, col) {
				if(row.installactualdate == undefined) return '--';
				return util.formatDate.format(new Date(row.installactualdate), 'yyyy/MM/dd');
			},
			dateFormatter3(row, col) {
				if(row.installactualdate == undefined) return '--';
				return util.formatDate.format(new Date(row.installactualdate), 'yyyy/MM/dd');
			},
			saveNum(row, col) {//保留两位小数
				return row.TOTALMILE.toFixed(2);
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
			}
			
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