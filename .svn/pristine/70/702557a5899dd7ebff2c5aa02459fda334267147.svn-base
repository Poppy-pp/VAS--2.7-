<!--* 
* @description: 技术服务部-库房差异核对
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
					<el-select v-model="filters.corpid" clearable filterable placeholder="所属公司"  remote :remote-method="corpRemoteMethod" :loading="corploading">
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
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="orderno" label="外系统订单号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="ownername" label="姓名" align="center" width="60">
			</el-table-column>
			<el-table-column prop="mobile" label="车主电话" align="center"  width="100">
			</el-table-column>
			<el-table-column prop="model" label="车型" align="center" width="200">
			</el-table-column>
			<el-table-column prop="vin" label="车架号" align="center" width="160">
				<template slot-scope="scope">
			                        <span v-if="scope.row.vin.length == 17">{{ scope.row.vin }}</span>
			                        <span v-else style="color: red">{{ scope.row.vin }}</span>
			             </template>
			</el-table-column>
			<el-table-column prop="licenseplatenum" label="车牌号" align="center"  >
			</el-table-column>
			<el-table-column prop="declaredate" label="报单日期" align="center" :formatter="dateFormatter1" >
			</el-table-column>
			<el-table-column prop="installactualdate" label="安装日期" align="center" :formatter="dateFormatter2">
			</el-table-column>
			<el-table-column label="设备号" align="center">
				<el-table-column prop="prodnum_wire" label="有线" align="center" width="130"></el-table-column>
				<el-table-column prop="prodnum_wireless" label="无线" align="center" width="100"></el-table-column>
			</el-table-column>
			<el-table-column label="数量" align="center">
				<el-table-column prop="installapplymorn" label="常规GPS" align="center"></el-table-column>
				<el-table-column prop="installapplyinsu" label="盗抢险GPS" align="center">
					<template slot-scope="scope">
				                        <span v-if="scope.row.installapplyinsu == 0 || scope.row.installapplyinsu == 1">{{ scope.row.installapplyinsu }}</span>
				                        <span v-else style="color: red">{{ scope.row.installapplyinsu }}</span>
				             </template>
				</el-table-column>
			</el-table-column>
			<el-table-column  label="最后定位时间" align="center">
				<el-table-column prop="appointdate_wire" label="有线" align="center"></el-table-column>
				<el-table-column prop="appointdate_wireless" label="无线" align="center"></el-table-column>
			</el-table-column>
			<el-table-column prop="vehiclestate" label="车辆状态" align="center" width="100">
			</el-table-column>
			<el-table-column prop="price" label="车价(元)" align="center">
			</el-table-column>
			<el-table-column prop="corpname" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column prop="salername" label="业务员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="installer" label="安装技术员" align="center" width="80">
			</el-table-column>
			<el-table-column prop="installaddress" label="安装地址" align="center">
			</el-table-column>
			<el-table-column prop="totalmile" label="公里数" align="center" :formatter="saveNum">
			</el-table-column>
			<el-table-column prop="idcard" label="万网备注" align="center">
			</el-table-column>
			<el-table-column prop="idcard" label="提交表后异动备注" align="center">
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
				listLoading: false,
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
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=库房差异核对&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
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
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd') : '') : '',
				};
				this.listLoading = true;
				axios.get('/vasms-web/api/v1/bi/biInstallDetail/getList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
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
			saveNum(row, col) {//保留两位小数
				return row.totalmile.toFixed(2);
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
			// this.getData();
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>