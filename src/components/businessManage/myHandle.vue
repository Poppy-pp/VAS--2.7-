<!--* 
* @description: 我的请求
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<div v-show="formDialogTableVisibleCommon">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
					<el-row :gutter="10" class="colflex">
				                    <el-col :span="4">
				                        <el-form-item prop="search_key" class="sf100">
				                            <el-input v-model="filters.search_key" @keyup.native.enter="getTodo" placeholder="请输入订单号/车牌号/车架号/车主"></el-input>
				                        </el-form-item>
				                    </el-col>
				                    <el-col :span="4">
				                       <el-form-item prop="proc_def_id" class="sf100">
				                            <el-select v-model="filters.proc_def_id" clearable filterable placeholder="请选择订单类型">
				                                <el-option v-for="item in ordertypeList" :key="item.value" :label="item.label" :value="item.value">
				                                </el-option>
				                            </el-select>
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
				                        <el-form-item prop="apply_userid" class="sf100">
				                            <el-select v-model="filters.apply_userid" clearable @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入报单人">
				                                <el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
				                                </el-option>
				                            </el-select>
				                        </el-form-item>
				                    </el-col>
				                    <el-col :span="6">
				                        <el-form-item prop="startDate" class="sf100">
				                            <el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="处理时间" end-placeholder="结束日期">
				                            </el-date-picker>
				                        </el-form-item>
				                    </el-col>
				                    <el-col :span="4">
				                        <el-form-item prop="nodename" class="sf100">
				                            <el-select v-model="filters.nodename" clearable filterable placeholder="请选择当前节点">
				                                <el-option v-for="item in statusDataList" :key="item" :label="item" :value="item">
				                                </el-option>
				                            </el-select>
				                        </el-form-item>
				                    </el-col>
				                     <el-col :span="4">
				                        <el-form-item prop="assignee" class="sf100">
				                            <el-select v-model="filters.assignee" @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入当前处理人">
				                                <el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
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
			<el-table stripe :max-height="windowOutHeight-180" :data="todo" border highlight-current-row v-loading="listLoading" @row-dblclick="showDetial" style="width: 100%;" ref="mytodo">
				<el-table-column prop="orderno" align="center" width="170" label="订单号">
					<template slot-scope="props">
						{{ props.row.flowData.orderno }}
					</template>
				</el-table-column>
				<el-table-column prop="orderno" align="center" label="订单来源">
					<template slot-scope="scope">
						<template v-if="scope.row.flowData.orderno">
							{{ scope.row.flowData.orderno.indexOf("ZH") > 0 ? "车贷系统" : "VAS系统" }}
						</template>
						<template v-else>
							VAS系统
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="corpname" align="center" label="创建人单位">
					<template slot-scope="props">
						{{ props.row.flowData.corpname }}
					</template>
				</el-table-column>
				<el-table-column prop="cur_employeename" align="center" label="当前处理人">
				</el-table-column>
				<el-table-column prop="proc_def_id" align="center" :formatter="orderFormatter" label="订单类型">
				</el-table-column>
				<el-table-column prop="cur_name" align="center" label="当前状态">
					<template slot-scope="props">
						<el-tag type="primary" style="font-weight:bold;">{{ props.row.cur_name == '' || props.row.cur_name == undefined ? '已完成' : props.row.cur_name }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="apply_stolen_insurance" align="center" label="产品类型">
					<template slot-scope="scope">
						{{ scope.row.flowData.apply_stolen_insurance ? "已购买保险" : "未购买保险" }}
					</template>
				</el-table-column>
				<el-table-column prop="ownername" align="center" label="车主">
					<template slot-scope="props">
						{{ props.row.flowData.ownername }}
					</template>
				</el-table-column>
				<el-table-column prop="vin" align="center" width="170" label="车架号">
					<template slot-scope="props">
						{{ props.row.flowData.vin }}
					</template>
				</el-table-column>
				<el-table-column prop="end_time" align="center" width="170" label="处理时间">
				</el-table-column>
				<el-table-column prop="description" align="center" width="200" label="描述">
					<template slot-scope="scope">
						<template v-if="scope.row.description">
							<template v-if="scope.row.description.indexOf('#') != -1">
				               {{ scope.row.description.split('#')[0] }}<i class="iconfont icon-car carFont" :style="{color:scope.row.description.substr(scope.row.description.indexOf('#'),7)}"></i>
				            </template>
				            <template v-else>
				                {{ scope.row.description }}
				            </template>
			            </template>
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="showDetial(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column> -->
			</el-table>
			<!-- 报单中心列表 新装单子 拆除单子 售后单子  end-->

			<!-- 报单分页标码 start-->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]" :page-size="pageSize" layout="total,sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
			<!-- 报单分页标码 end-->
		</div>
		<requestRemoveDetails @closeDetails="closeDetails" v-if="removeFormDialogTableVisible" :removeDialogFormData="removeDialogFormData"></requestRemoveDetails>
		<requestWxDetails @closeDetails="closeDetails" v-if="wxFormDialogTableVisible" :wxDialogFormData="wxDialogFormData"></requestWxDetails>
		<requestDetails @closeDetails="closeDetails" v-if="formDialogTableVisible" :dialogFormData="dialogFormData"></requestDetails>
	</section>
</template>
<style scoped>
	@import 'css/customerDeclaration.css';
</style>
<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import requestDetails from 'components/businessManage/myRequest/details';
	import requestWxDetails from 'components/businessManage/myRequest/wxdetails';
	import requestRemoveDetails from 'components/businessManage/myRequest/removedetails';
	import { queryMyhandle, getvariablesTaskInfoList, getvariablesSeaviceTaskInfoList,getDeptManagerInfoList,getCorpNameList } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		components: {
			requestDetails,
			requestWxDetails,
			requestRemoveDetails
		},
		data() {
			return {
				//搜索 筛选信息
				filters: {
					search_key: '',
					proc_def_id: '',
					corpid:'',
				            apply_userid: '',
					startDate:'',
					nodename:'',
					assignee:'',
				},
				userDataList: [],
				copsUerLoading: false,
				corplist: [], //所属公司
			            corpLoading: false, //
			            empLoading: false, //
			            statusDataList:['派单','施工接单','施工','审核','成功','失败','无效'],//当前节点
			            ordertypeList:[{value:'proc_new_build',label:'新装拆除'},{value:'proc_vindicate',label:'售后维修'},{value:'proc_vindicate_remove',label:'售后拆除'},{value:'proc_transfer_newbuild',label:'新装交接审核'}],//拆除类型
				stolen: [{
					value: "已购买保险",
					id: true
				}, {
					value: "未购买保险",
					id: false
				}],
				//新装弹窗详情显示
				dialogFormData: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {}
					},
					installDetails: '',
					corporateInfo: {},
					declarEmployee: {},
					ownerInfo: {
						name: '',
						idcard: '',
						mobile: ''
					},
					flowData: {
						verify_result: '',
						apply_remark: ''
					},
					installEmployee: {
						employeename: ''
					},
					installGroupInfo: {
						groupname: ''
					}
				},
				//维修弹窗详情显示
				wxDialogFormData: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {},
						ownerInfo: {
							name: '',
							idcard: '',
							mobile: ''
						}
					},
					assigntoGroup: {
						groupname: ''
					},
					assigntoEmployeeInfo: {
						employeename: ''
					},
					afterSaleDetails: [],
					corporateInfo: {},
					declarEmployee: {}
				},
				//拆除弹窗详情显示
				removeDialogFormData: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {},
						ownerInfo: {
							name: '',
							idcard: '',
							mobile: ''
						}
					},
					assigntoGroup: {
						groupname: ''
					},
					assigntoEmployeeInfo: {
						employeename: ''
					},
					afterSaleDetails: [],
					corporateInfo: {},
					declarEmployee: {}
				},
				todo: [],
				copName: [],
				wxFormDialogTableVisible: false,
				removeFormDialogTableVisible: false,
				formDialogTableVisible: false,
				formDialogTableVisibleCommon: true,
				//当前流程任务id
				total: 0,
				copLoading: false,
				currentPage: 0,
				listLoading: false,
				pageSize: 15
			}
		},
		methods: {
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
			closeDetails(type) {
				if(type == 1) {
					this.formDialogTableVisible = false;
				}
				if(type == 2) {
					this.wxFormDialogTableVisible = false;
				}
				if(type == 3) {
					this.removeFormDialogTableVisible = false;
				}
				this.formDialogTableVisibleCommon = true;
			},
			//输入关键字查询员工
			remoteGsMethod(query) {
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
			//业务员下拉查询
			changeUserCop(r) {
				if(!r || this.userDataList.length > 0) return;
				this.copsUerLoading = true;
				let para = {
					showCount: 10000
				};
				getDeptManagerInfoList(para).then((res) => {
					this.userDataList = res.data.data.records;
					this.copsUerLoading = false;
				});
			},
			//操作公司下拉查询
			changeCop(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000
				}
				getCorpNameList(para).then((res) => {
					this.copName = res.data.data.records;
					this.copLoading = false;
				});
			},
			//操作公司下拉 点击返回value值
			changeVal(item) {},
			//受理银行查询
			receivinList(r) {
				if(!r || this.salerData.length > 0) return;
				let para = {
					corptype: 'BANK'
				};
				this.receLoading = true;
				searchCorpNameList(para).then((res) => {
					this.salerData = res.data.data.records;
					this.receLoading = false;
				});
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
			//订单类型格式化
			orderFormatter(row, col) {
				if(row.proc_def_id.indexOf("proc_vindicate_remove") != -1) {
					return "拆除";
				}
				if(row.proc_def_id.indexOf("proc_vindicate") != -1) {
					return "售后维修";
				}
				if(row.proc_def_id.indexOf("proc_new_build") != -1) {
					return "新装";
				}
			},
			//获取我的待办列表列表
			getTodo() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					search_key: this.filters.search_key,
					proc_def_id:  this.filters.proc_def_id,
					corpid: this.filters.corpid,
				            apply_userid:  this.filters.apply_userid,
					startDate: this.filters.startDate,
					nodename: this.filters.nodename,
					assignee: this.filters.assignee,
					startTime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
					endTime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : ''
				};
				para = Object.assign(para, this.curStateData);
				this.listLoading = true;
				queryMyhandle(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult
						this.todo = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			handleEditRow(row,e,col){
		                this.handleEdit(0,row);
		            },
		            //显示审核该报单界面
		            handleEdit(index, row) {
		            	console.log(row);
		                this.$store.state.formObj = row;
		                if (row.cur_name == '' || row.cur_name == undefined) {//已完成
		                	this.$router.push({path:'/formProcess/4',params:{data:row}});
		                	return;
		                }
		                if(row.taskDefinitionKey == 'proc_new_build_node_apply' || row.taskDefinitionKey == 'node_apply'){//报单
		                    this.$store.state.isApply = true;
		                    this.$router.push('/formProcess');
		                    return;
		                }
		                this.$store.state.isApply = false;
		                if(row.taskDefinitionKey == 'proc_new_build_node_send' || row.taskDefinitionKey == 'node_send'){//派单
		                    this.$router.push('/formProcess/1');
		                }
		                if(row.taskDefinitionKey == 'proc_new_build_node_work' || row.taskDefinitionKey == 'node_work'){//施工
		                    this.equipmentDialogTableVisible = true;
		                    this.dialogLoading = true;
		                    this.clickState = 3;
		                    this.getFormData(row);
		                }
		                if(row.taskDefinitionKey == 'proc_new_build_node_service_verify' || row.taskDefinitionKey == 'node_service_verify'){//售后审核
		                    this.$router.push('/formProcess/3');
		                }
		                if(row.taskDefinitionKey == 'proc_new_build_node_insurance' || row.taskDefinitionKey == 'node_insurance'){//保险出单
		                    this.$router.push('/formProcess/4');
		                }
		            },
			showDetial(row, e) {
				this.formDialogTableVisibleCommon = false;
				if(row.proc_def_id.indexOf("proc_vindicate_remove") != -1) {//订单类型—拆除
					this.removeFormDialogTableVisible = true;
					this.getFormRemoveData(row);
					return;
				}else if(row.proc_def_id.indexOf("proc_vindicate") != -1 ) {//订单类型—维修
					this.wxFormDialogTableVisible = true;
					this.getFormSeaviceData(row);
					return;
				}else if(row.proc_def_id.indexOf("proc_new_build") != -1) {//订单类型—新装
					this.formDialogTableVisible = true;
					this.getFormData(row);
				}else{
					this.formDialogTableVisibleCommon = true;
					this.$message({
				                        message: '当前订单无订单类型，无法查看详情！',
				                        type: 'error'
				             });
					return;
				}
			},
			//拆除根据任务id获取表单信息
			getFormRemoveData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					taskId: obj.cur_task_id
				};
				nanobar.go(60);
				getvariablesSeaviceTaskInfoList(pa).then((res) => {
					let data = res.data.data;
					if(!data.vehicleInfo) {
						data.vehicleInfo = this.removeDialogFormData.vehicleInfo;
					}
					if(!data.vehicleInfo.ownerInfo) {
						data.vehicleInfo.ownerInfo = this.removeDialogFormData.vehicleInfo.ownerInfo;
					}

					this.removeDialogFormData = data;
					nanobar.go(100);
				}).catch((error) => {
					nanobar.go(100);
				});
			},
			//维修根据任务id获取表单信息
			getFormSeaviceData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					taskId: obj.cur_task_id
				};
				nanobar.go(60);
				getvariablesSeaviceTaskInfoList(pa).then((res) => {
					let data = res.data.data;
					if(!data.vehicleInfo) {
						data.vehicleInfo = this.wxDialogFormData.vehicleInfo;
					}
					if(!data.vehicleInfo.ownerInfo) {
						data.vehicleInfo.ownerInfo = this.wxDialogFormData.vehicleInfo.ownerInfo;
					}

					this.wxDialogFormData = data;
					nanobar.go(100);
				}).catch((error) => {
					nanobar.go(100);
				});
			},
			//根据任务id获取表单信息
			getFormData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					taskId: obj.cur_task_id
				};
				nanobar.go(60);
				getvariablesTaskInfoList(pa).then((res) => {
					let _this = this,
						data = res.data.data;
					if(!data.vehicleInfo) {
						data.vehicleInfo = _this.dialogFormData.vehicleInfo;
					}
					if(!data.ownerInfo) {
						data.ownerInfo = _this.dialogFormData.ownerInfo;
					}
					if(!data.installEmployee) {
						data.installEmployee = _this.dialogFormData.installEmployee;
					}
					if(!data.installGroupInfo) {
						data.installGroupInfo = _this.dialogFormData.installGroupInfo;
					}
					if(!data.flowData) {
						data.flowData = _this.dialogFormData.flowData;
					}
					this.dialogFormData = data;
					nanobar.go(100);
				}).catch((error) => {
					nanobar.go(100);
				});
			},
			//清空查询表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		created() {
			this.getTodo();
		}
	}
</script>