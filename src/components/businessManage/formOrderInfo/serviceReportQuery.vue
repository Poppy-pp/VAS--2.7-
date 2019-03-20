<!--* 
* @description: 报单查询 维修报单
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
				<el-row :gutter="10" class="colflex">
					<el-col :span="4">
						<el-form-item prop="orderno" class="sf100">
							<el-input v-model="filters.orderno" @keyup.native.enter="getTodo" placeholder="请输入订单号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="licenseplatenum" class="sf100">
							<el-input v-model="filters.licenseplatenum" @keyup.native.enter="getTodo" placeholder="请输入车牌号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="vin" class="sf100">
							<el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="ownername" class="sf100">
							<el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="corpid" class="sf100">
							<el-select v-model="filters.corpid" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable remote :remote-method="corpChangeSelect">
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="createby" class="sf100">
							<el-select v-model="filters.createby" clearable @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入报单人">
								<el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="startDate" class="sf100">
							<el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="报单开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="curr_task_name_" class="sf100">
							<el-select v-model="filters.curr_task_name_" clearable filterable placeholder="请选择当前节点">
								<el-option v-for="item in statusDataList" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="current_assingee_" class="sf100">
							<el-select v-model="filters.current_assingee_" @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入当前处理人">
								<el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="assignto" class="sf100">
							<el-select v-model="filters.assignto" clearable remote filterable @visible-change="leaderChange" :remote-method="leaderChangeSelect" :loading="empLoading" placeholder="请输入技术组长">
								<el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="hastheftinsurance" class="sf100">
							<el-select v-model="filters.hastheftinsurance" clearable filterable placeholder="请选择保险">
								<el-option v-for="item in insuDataList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="faultcode" class="sf100">
							<el-select v-model="filters.faultcode" clearable filterable placeholder="请选择维修原因" @visible-change="reasonChange" :loading="reaLoding" remote :remote-method="reasonChangeSelect">
								<el-option v-for="item in serviceDataList" :key="item.dictdataname" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="colflex1">
					<el-form-item style="float:right;margin-right:0;">
						<el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
						<el-button @click="resetForm('filters')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>

		<!--列表 -->
		<el-table border stripe :max-height="windowOutHeight-230" :data="todo" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orderno" align="center" label="订单号" width="150">
			</el-table-column>
			<el-table-column prop="corpname" align="center" label="所属公司">
			</el-table-column>
			<el-table-column prop="aftersalerempname" align="center" label="报单人">
			</el-table-column>
			<el-table-column prop="createdate" align="center" label="报单时间" :formatter="dateFormatterTwo">
			</el-table-column>
			<el-table-column prop="ownername" align="center" label="车主">
			</el-table-column>
			<el-table-column prop="ownermobile" align="center" label="车主电话">
			</el-table-column>
			<el-table-column prop="curr_task_name_" align="center" label="当前节点" width="150">
				<template scope="scope">
					{{ scope.row.curr_task_name_?scope.row.curr_task_name_:'完成' }}
				</template>
			</el-table-column>
			<el-table-column prop="faultremark" align="center" label="维修原因">
			</el-table-column>
			<el-table-column prop="current_assingee_name_" align="center" label="当前处理人">
			</el-table-column>
			<el-table-column prop="licenseplatenum" align="center" label="车牌">
			</el-table-column>
			<el-table-column prop="vin" align="center" label="车架号">
			</el-table-column>
			<el-table-column prop="model" align="center" label="车型">
			</el-table-column>
			<el-table-column prop="contactperson" align="center" label="维修联系人">
			</el-table-column>
			<el-table-column prop="contactmobile" align="center" label="维修联系人电话">
			</el-table-column>
			<el-table-column prop="aftersaledate" align="center" label="预约时间" :formatter="dateFormatter">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button size="mini" @click="formDetailHandle(scope.$index, scope.row)">详情</el-button>
					<el-button size="mini" @click="showDraw(scope.$index, scope.row)">安装轨迹</el-button>
				</template>
			</el-table-column> 
		</el-table>
		<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15,50,80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
		</el-pagination>
	</section>
</template>

<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import util from '../../../common/js/util'
	import { queryApprovalperServiceInfo,getCorpNameList,getDeptManagerInfoList,getFaultReason } from '../../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				todo: [], //处理表格列表数据
				//搜索 筛选信息
				filters: {
					orderno:'',
					licenseplatenum:'',
					vin:'',
					ownername:'',
					corpid:'',
					createby:'',
					startDate:'',
					curr_task_name_:'',
					current_assingee_:'',
					assignto:'',
					hastheftinsurance:'',
					faultcode:'',
				},
				total: 0,
				currentPage: 0,
				listLoading: false,
				pageSize: 15,
				corplist: [], //所属公司
				corpLoading: false, //
				userDataList: [],//当前处理人
				empLoading: false, //
				copsUerLoading: false,
				statusDataList:['派单','施工接单','施工','审核','成功','失败','无效'],//当前节点
				insuDataList:[{value:'1',label:'是'},{value:'0',label:'否'}],//保险
				serviceDataList:[],//维修原因
				reaLoding:false,
			}
		},
		methods: {
			// 查看安装人员轨迹
		            showDraw(index,row){
		                window.open('http://mqtt.wwvas.com:9201/Map/UserHistoryRoute?id=' + row.installby);
		            },
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			/*所属公司——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				let para = {
					showCount: 30
				}
				this.corpLoading = true;
				getCorpNameList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			// 所属公司，模糊查询
			corpChangeSelect(query) {
				let para = {
					showCount: 30,
					corpname: query,
				}
				this.corpLoading = true;
				getCorpNameList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			/*报单人、当前处理人——下拉*/
			empChange(r) {
				if(!r || this.userDataList.length > 0) return;
				this.userDataList = [];
				let para = {
					showCount: 30
				}
				this.empLoading = true;
				getDeptManagerInfoList(para).then((res) => {
					this.userDataList = res.data.data.records;
					this.empLoading = false;
				});
			},
			// 报单人，当前处理人-模糊查询
			empChangeSelect(query) {
				this.userDataList = [];
				let para = {
					showCount: 30,
					employeename: query,
				}
				this.empLoading = true;
				getDeptManagerInfoList(para).then((res) => {
					this.userDataList = res.data.data.records;
					this.empLoading = false;
				});
			},
			//当前处理人
			remoteGsMethod(query) {
				this.userDataList = [];
				if(query !== '') {
					let para = {
						employeename: query
					};
					this.loading = true;
					getDeptManagerInfoList(para).then((res) => {
						this.userDataList = res.data.data.records;
						this.copsUerLoading = false;
					});
				} else {
					let para = {
						showCount: 15
					};
					getDeptManagerInfoList(para).then((res) => {
						this.userDataList = res.data.data.records;
						this.copsUerLoading = false;
					});
				}
			},
			/*技术组长——下拉*/
			leaderChange(r) {
				this.userDataList = [];
				if(!r || this.userDataList.length > 0) return;
				let para = {
					showCount: 30,
					isgroupleader:'Y'
				}
				this.empLoading = true;
				getDeptManagerInfoList(para).then((res) => {
					this.userDataList = res.data.data.records;
					this.empLoading = false;
				});
			},
			// 技术组长，模糊查询
			leaderChangeSelect(query) {
				this.userDataList = [];
				let para = {
					showCount: 30,
					employeename: query,
					isgroupleader:'Y'
				}
				this.empLoading = true;
				getDeptManagerInfoList(para).then((res) => {
					this.userDataList = res.data.data.records;
					this.empLoading = false;
				});
			},
			/*维修原因——下拉*/
			reasonChange(r) {
				if(!r || this.serviceDataList.length > 0) return;
				let para = {
					showCount: 30
				}
				this.reaLoading = true;
				getFaultReason(para).then((res) => {
					this.serviceDataList = res.data.data.records;
					this.reaLoading = false;
				});
			},
			// 维修原因，模糊查询
			reasonChangeSelect(query) {
				let para = {
					showCount: 30,
					corpname: query,
				}
				this.reaLoading = true;
				getFaultReason(para).then((res) => {
					this.serviceDataList = res.data.data.records;
					this.reaLoading = false;
				});
			},
			//时间转换
			dateFormatter: function(row, col) {
				return util.formatDate.format(new Date(row.aftersaledate), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatterTwo: function(row, col) {
				return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd hh:mm:ss');
			},
			//报单详情查看
			formDetailHandle(index, row) {
				this.$store.state.formObj = row;
				this.$router.push('/serviceDetail');
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getTodo();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTodo();
			},
			//获报单查询列表
			getTodo() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					aftersaletypes: "3",

					orderno:this.filters.orderno,
					licenseplatenum:this.filters.licenseplatenum,
					vin:this.filters.vin,
					ownername:this.filters.ownername,
					corpid:this.filters.corpid,
					createby:this.filters.createby,
					curr_task_name_:this.filters.curr_task_name_,
					current_assingee_:this.filters.current_assingee_,
					assignto:this.filters.assignto,
					hastheftinsurance:this.filters.hastheftinsurance,
					faultcode:this.filters.faultcode,
					startTime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
					endTime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
				};
				this.listLoading = true;
				queryApprovalperServiceInfo(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.total = res.data.data.totalResult;
						this.todo = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			}
		},
		//初始化数据
		created() {
			this.getTodo();
		}
	}
</script>