<!--* 
* @description: 我的交接流程
* @author: wp 
* @update: wp (2017-05-27 10:55) 
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
						<el-form-item prop="ownername" class="sf100">
							<el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="vin" class="sf100">
							<el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="licenseplatenum" class="sf100">
							<el-input v-model="filters.licenseplatenum" @keyup.native.enter="getTodo" placeholder="请输入车牌号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="colflex1">
					<el-form-item style="float:right;margin-right:0;">
						<el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
						<el-button @click="resetForm">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>

		<el-table :max-height="windowOutHeight-160" stripe :data="todo" border ref="todeTable" highlight-current-row @row-dblclick="dblShowDetail" v-loading="listLoading" style="width: 100%;">
			<el-table-columntype="index" align="center" label="交接单号" width="30">
			</el-table-column>
			<el-table-column prop="flowData.orderno" align="center" label="新装单号">
			</el-table-column>
		            <el-table-column prop="name" align="center" label="当前节点">
		            </el-table-column>
		            <el-table-column prop="candidateUsers" align="center" label="任务候选人">
		            </el-table-column>
			<el-table-column prop="flowData.corpname" align="center" label="所属客户公司">
			</el-table-column>
			<el-table-column prop="flowData.licenseplatenum" align="center" label="车牌号">
			</el-table-column>
			<el-table-column prop="flowData.ownername" align="center" label="车主">
			</el-table-column>
			<el-table-column prop="flowData.vin" align="center" label="车架号">
			</el-table-column>
			<el-table-column label="操作" width="100" align="center" fixed="right">
				<template slot-scope="scope">
                     <el-dropdown trigger="click">
                        <el-button size="mini" type="primary">
                            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="passHandle(scope.$index, scope.row,1)">{{scope.row.taskDefinitionKey == 'B1_examine' ? '移交' : '同意接收'}}</el-dropdown-item>
                            <el-dropdown-item  v-if="scope.row.taskDefinitionKey != 'B1_examine'" @click.native="passHandle(scope.$index, scope.row,2)">退回</el-dropdown-item>
                            <el-dropdown-item @click.native="showDetail(scope.$index, scope.row)">查看订单</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.taskDefinitionKey == 'B3_examine'" @click.native="passHandle(scope.$index, scope.row,3)">无保险</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<!-- 报单分页标码 start-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" background :page-size="pageSize" layout="total,sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
		</el-pagination>
		<!-- 报单分页标码 end-->


		<!-- 退回流程弹出框 -->
		<el-dialog title="退回" :visible.sync="aftersaleVisible" width="25%">
			<el-form :model="goback" label-width="80px" ref="goback" :inline="true" class="flexSearchForm">
				<el-row>
					<el-col :span="24">
						<el-form-item prop="aftersalereason" class="sf100" label="退回原因">
						   <el-select v-model="goback.aftersalereason" clearable value-key="dictdataname" @visible-change="changeReason" @change="handelSelect" filterable :loading="reasonLoading" placeholder="请选择退回原因">
				                                <el-option
					                                v-for="item in reasonList"
					                                :key="item.dictdatavalue"
					                                :label="item.dictdatavalue"
					                                :value="item">
					                   </el-option>
				                            </el-select>
				                         </el-form-item>
				            </el-col>
					<el-col :span="24" v-show="aftersalereason == 3">
			                        		<el-form-item prop="remark" class="sf100" label="其他原因">
			                        			<el-input v-model="goback.remark" placeholder="请输入其他原因"></el-input>
			                        		</el-form-item>
			                        	</el-col>
			            </el-row>
		             </el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="aftersaleVisible = false">取 消</el-button>
			    <el-button type="primary" @click="gobackConfirm()">确定退回</el-button>
			</span>
		</el-dialog>

		<!--同意接收弹出框 -->
		<el-dialog title="同意接收" :visible.sync="agreeVisible" width="25%">
			<el-form :model="agreeForm" label-width="80px" ref="goback" :inline="true" class="flexSearchForm">
				<el-row>
					<el-col :span="24">
			                        		<el-form-item prop="remark" class="sf100" label="备注">
			                        			<el-input v-model="agreeForm.remark" placeholder="请输入同意接收备注"></el-input>
			                        		</el-form-item>
			                        	</el-col>
			            </el-row>
		             </el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="agreeVisible = false">取 消</el-button>
			    <el-button type="primary" @click="agreeConfirm()">确定接收</el-button>
			</span>
		</el-dialog>
	</section>
</template>
<script>
	import util from '../../../common/js/util';
	import { getTodoInfoList,addExamine,getReasonInfo } from '../../../api/api';
	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				//搜索 筛选信息
				filters: {
					orderno: '',
					ownername: '',
					vin: '',
                    				licenseplatenum: ''
				},
			                remarks:'',
			                listLoading:false,
				//处理表格列表数据
				todo: [],
				total: 0,
				pageSize: 15,
				aftersaleVisible:false,
				goback:{
					aftersalereason:'',
					remark:'',
				},
				agreeVisible:false,
				agreeForm:{
					remark:'',
				},
				aftersalereason:'',
				remark:'',
				reasonLoading:false,
				reasonList:[],//退回原因列表
				taskID:'',//当前编辑行id
			}
		},
		methods: {
            //处理流程节点进度
            passHandle(index,row,type){
            	this.taskID = row.id;
                let para = {
                    taskId:row.id,
                    other:{
                        handoverstatus:'A',
                        remarks:this.remarks,
                        result:true
                    }
                };
                //  if (row.taskDefinitionKey != 'B1_examine') {//同意接收
                // 	this.agreeVisible = true;
                // 	return;
                // }
                if(type == 2) {//退回
                	this.aftersaleVisible = true;
                	return;
                }
                if(type == 3) {//无保险
                	para.other.isInsurance = 0;
                }
                addExamine(para).then((res) => {
                    if(res.data.result.code == 0){
                        this.getTodo();
                    }
                }).catch((error) => {
                });
            },
            // 确认接收
            agreeConfirm(){
            		this.agreeVisible = false;
		let para = {
	                    taskId:this.taskID,
	                    other:{
	                        handoverstatus:'A',
	                        remark:this.agreeForm.remark,
	                        result:true
	                    }
	            };
		addExamine(para).then((res) => {
	                    if(res.data.result.code == 0){
	                        this.getTodo();
	                        this.$message({
			          message: '操作成功！',
			          type: 'success'
			});
	                    }
	            }).catch((error) => {
	            });
            },
            // 确认退回
            gobackConfirm(){
            	console.log(this.taskID)
		this.aftersaleVisible = false;
		let para = {
			taskId:this.taskID,
			other:{
		                        handoverstatus:'R',
		                        isInsurance:0,
		                        rejectreason:this.aftersalereason,
		                        remark:this.remark,
		                        result:false
		            }
		}
		if (para.other.rejectreason == 3) {//当选择的原因是 其他 时
			para.other.remark = this.goback.remark;
		}
		addExamine(para).then((res) => {
	                    if(res.data.result.code == 0){
	                        this.getTodo();
	                        this.$message({
			          message: '操作成功！',
			          type: 'success'
			});
	                    }
	            }).catch((error) => {
	            });
            },
            //退回原因-下拉
            changeReason(r){
                if(!r || this.reasonList.length > 0) return;
                this.reasonLoading = true;
                let para = {
                    showCount:1000
                }
                getReasonInfo(para).then((res) => {
                    this.reasonList = res.data.data.records;
                    this.reasonLoading = false;
                });
            },
             // 选择退回原因时
            handelSelect(val){
            		this.aftersalereason = val.dictdataname;//id
            		this.remark = val.dictdatavalue;//汉字
            },
            //查看交接流程详情
            showDetail(index,row){
                row.type = 4;
                this.$store.state.formObj = row;
                this.$router.push('/formProcess/3');
            },
            //双击查看交接流程详情
            dblShowDetail(row,e,col){
                row.type = 4;
                this.$store.state.formObj = row;
                this.$router.push('/formProcess/3');
            },
			//获取我的待办列表列表
			getTodo() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					orderno: this.filters.orderno,
					ownername: this.filters.ownername,
                    licenseplatenum:this.filters.licenseplatenum,
					vin: this.filters.vin,
                    type:4
				};
				this.listLoading = true;
				getTodoInfoList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult
						this.todo = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
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
			handleEditRow(row, e, col) {

			},
            resetForm(){
                this.filters = {
                    orderno: '',
                    ownername: '',
                    vin: '',
                    licenseplatenum: ''
                }
            }
		},
		//初始化数据
		created() {
			this.getTodo();
		}
	}
</script>