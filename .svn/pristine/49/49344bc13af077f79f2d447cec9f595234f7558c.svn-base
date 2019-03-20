<!--* 
* @description: 报单中心（售后审核） 交接流程详情 / 新装单-审核环节详情
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
* 
*-->
<template>
	<section>
		<el-row>
			<el-col :span="24" class="cbstyle">
				<el-collapse v-model="activeNames" class="bdcoll rpShowimgDialog">
					<el-collapse-item title="报单信息" class="lefw10 wzpdt10" name="2">
						<el-row>
							<el-col :span="8">
								<dl class="dllist">
									<dt>报单类型:</dt>
									<dd>{{ ruleFormStatic.declaretype }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>客户名称:</dt>
									<dd v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</dd>
								</dl>
							</el-col>
						</el-row>

						<el-row class="mt2 pt2 bt1">
							<el-col :span="8">
								<dl class="dllist">
									<dt>车主姓名:</dt>
									<dd>{{ ruleFormStatic.ownerInfo.name }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车主电话:</dt>
									<dd>{{ ruleFormStatic.ownerInfo.mobile }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车主证件号码:</dt>
									<dd>{{ ruleFormStatic.ownerInfo.idcard }}</dd>
								</dl>
							</el-col>
						</el-row>
						<el-row class="mt2 pt2 bt1">
							<el-col :span="8">
								<dl class="dllist">
									<dt>车辆型号:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车辆颜色:</dt>
									<template v-if="ruleFormStatic.vehicleInfo.color">
										<dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
										<dd v-else>
											<span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
										</dd>
									</template>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车牌号:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车辆类型:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.vehiclePlateColor ? ruleFormStatic.vehicleInfo.vehiclePlateColor.typedesc : '暂无' }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车牌颜色:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.licenseplatecolor ? ruleFormStatic.vehicleInfo.licenseplatecolor : '暂无' }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车架号:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车辆分类:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.vehiclecategoryname }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>受理银行:</dt>
									<dd>{{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车价:</dt>
									<dd v-if="ruleFormStatic.vehicleInfo.price">{{ ruleFormStatic.vehicleInfo.price }}元</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>是否有盗抢险:</dt>
									<dd v-if="ruleFormStatic.vehicleInfo.hastheftinsurance">{{ ruleFormStatic.vehicleInfo.hastheftinsurance == 1 ? '有':'无' }}</dd>
								</dl>
							</el-col>
						</el-row>
						<el-row class="mt2 pt2 bt1">
							<el-col :span="8">
								<dl class="dllist">
									<dt>业务员:</dt>
									<dd>{{ ruleFormStatic.salername }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>业务员联系电话:</dt>
									<dd>{{ ruleFormStatic.salermobile }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>当前处理人:</dt>
									<dd v-if="$store.state.formObj.assignee">{{ $store.state.formObj.assignee }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装联系人:</dt>
									<dd>{{ ruleFormStatic.contactperson }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装联系电话:</dt>
									<dd>{{ ruleFormStatic.contactmobile }}</dd>
								</dl>
							</el-col>
						</el-row>
						<el-row class="mt2 pt2 bt1">
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装保险产品数量:</dt>
									<dd>{{ ruleFormStatic.installapplyinsu ? ruleFormStatic.installapplyinsu : 0 }}台</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装常规产品数量:</dt>
									<dd>{{ ruleFormStatic.installapplymorn ? ruleFormStatic.installapplymorn : 0 }}台</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装地址:</dt>
									<dd v-if="ruleFormStatic.installaddress">{{ ruleFormStatic.installaddress }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>预约安装日期:</dt>
									<dd>{{ ruleFormStatic.installapplydate }}</dd>
								</dl>
							</el-col>
							<el-col :span="16">
								<dl class="dllist">
									<dt>安装生效日期:</dt>
									<dd>{{ ruleFormStatic.installactualdate }}</dd>
								</dl>
							</el-col>
							<el-col :span="24">
								<dl class="dllist">
									<dt>安装说明:</dt>
									<dd style="color:red;">默认安装的保险产品为有线车载终端(有源)，常规产品为无线车载终端(无源)。</dd>
								</dl>
							</el-col>

							<el-col :span="12" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>报单备注:</dt>
									<dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="12" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>派单备注:</dt>
									<dd>{{ ruleFormStatic.flowData.verify_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="12" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>施工备注:</dt>
									<dd>{{ ruleFormStatic.flowData.work_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="12" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>审核备注:</dt>
									<dd>{{ ruleFormStatic.flowData.service_verify_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist">
									<dt>车辆实时状态:</dt>
									<dd>{{ vehStatus }}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist">
									<dt>最后通讯时间:</dt>
									<dd>{{ vehLastTime }}</dd>
								</dl>
							</el-col>
							<el-col :span="24">
								<dl class="dllist">
									<dt>车辆实时位置:</dt>
									<dd>{{ vehAddress }}</dd>
								</dl>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item title="派单信息" name="13" class="lefw10 wzpdt10">
						<el-row class="mt5">
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装小组:</dt>
									<dd>{{ ruleFormStatic.installGroupInfo.groupname }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装人员:</dt>
									<dd>{{ ruleFormStatic.installEmployee.employeename }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>车辆情况选项:</dt>
									<dd v-if="ruleFormStatic.carstatus">{{ ruleFormStatic.carstatus?"已到":"未到" }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>服务年限:</dt>
									<dd v-if="ruleFormStatic.vehicleInfo.yearsofservice">{{ ruleFormStatic.vehicleInfo.yearsofservice }}年</dd>
								</dl>
							</el-col>
							<el-col :span="16">
								<dl class="dllist">
									<dt>备注:</dt>
									<dd>{{ ruleFormStatic.flowData.verify_remark }}</dd>
								</dl>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="车辆照片" name="14" class="enlargeArea lefw10 wzpdt10">
						<el-row class="mt5">
							<el-col :span="24">
								<dl class="dllist lh55_mb10">
									<dd>
										<div class="imgMd mr4 mt5" v-for="(item,index) in ruleFormStatic.pictures">
											<img :title="item.picdesc" class="image" :src="$store.state.IMG_URL+item.piclink">
											<span>{{ item.picdesc }}</span>
										</div>
									</dd>
								</dl>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="设备地图实时位置" name="10086" class="enlargeArea" v-if="ruleFormStatic.installDetails && ruleFormStatic.installDetails.length>0">
						<template slot="title">
							<div class="fl sebei" style="margin-right:10px;">设备地图实时位置</div>
							<el-button @click.stop="realTimeRefreshPro('vueAmap3')" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
						</template>
						<el-row class="mt5">
							<el-col :span="24">
								<gdmap3 ref="vueAmap3"></gdmap3>
							</el-col>
						</el-row>
					</el-collapse-item>
					<template v-for="(item,index) in ruleFormStatic.installDetails">
						<el-collapse-item :title="item.packInfo.E_PRODTYPE+'设备'+item.packInfo.E_PRODMODEL" :name="(++index)+''" class="enlargeArea lefw10 wzpdt10">
							<el-row class="mt5">
								<el-col :span="24" v-if="item.isActive == 0">
									<dl class="dllist">
										<dd style="color:red;">无线设备</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装位置:</dt>
										<dd>{{ item.installpositionname }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装时状态：</dt>
										<dd v-if="item.onlinestatus">{{ item.onlinestatus == 0 ? "未上线" : "在线" }}</dd>
										<dd v-else>未上线</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>设备ID:</dt>
										<dd>{{ item.packInfo.E_PRODUNUM }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>设备类型:</dt>
										<dd>{{ item.packInfo.E_PRODTYPE }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>设备型号:</dt>
										<dd>{{ item.packInfo.E_PRODMODEL }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>SIM卡号:</dt>
										<dd>{{ item.packInfo.C_PRODUNUM }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>iccid:</dt>
										<dd>{{ item.packInfo.SIMCARDID }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>卡类型:</dt>
										<dd>{{ item.packInfo.C_PRODMODEL }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>设备实时状态：</dt>
										<dd v-if="item.curonlinestatus">{{ item.curonlinestatus }}</dd>
									</dl>
								</el-col>
								<el-col :span="16">
									<dl class="dllist">
										<dt>实时位置信息：</dt>
										<dd v-if="item.curaddress">{{ item.curaddress }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>最后一次通讯时间：</dt>
										<dd v-if="item.recvtime">{{ item.recvtime }}</dd>
									</dl>
								</el-col>

								<el-col :span="24" v-if="item.remark">
									<dl class="dllist">
										<dt>设备备注:</dt>
										<dd>{{ item.remark }}</dd>
									</dl>
								</el-col>
								<el-col :span="24">
									<dl class="dllist lh55_mb10">
										<dd>
											<div class="imgMd mr4 mt5" v-for="(item,index) in item.pictures">
												<img :title="item.picdesc" class="image" :src="$store.state.IMG_URL+item.piclink">
												<span>{{ item.picdesc }}</span>
											</div>
										</dd>
									</dl>
								</el-col>
							</el-row>
						</el-collapse-item>
					</template>
					<el-collapse-item title="车辆信息" name="15" class="lefw10" v-if="$store.state.formObj.type != 4">
						<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
							<el-row  :gutter="10" style="margin-bottom:2%;">
								<el-col :span="16">
									<el-form-item label="车辆类型" prop="vehicletype">
										<el-select v-model="ruleForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" @change="changeColor" filterable placeholder="请选择车辆类型" clearable value-key="typedesc">
											<el-option v-for="item in vehlist" :key="item.typedesc" :label="item.typedesc" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="车牌颜色" prop="licenseplatecolor">
										<el-input readonly type="text" placeholder="选择车类型匹配车牌颜色" v-model="ruleForm.licenseplatecolor"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</el-collapse-item>
					<el-collapse-item title="流转信息" name="16" class="lefw10" v-if="$store.state.formObj.type != 4">
						<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
							<el-row :gutter="20">
								<el-col :span="24" class="mt10">
									<evaluate ref="refEvaluate"></evaluate>
								</el-col>
								<el-col :span="24">
									<el-form-item label="审核意见" class="mt10" prop="remark">
										<el-radio-group v-model="tmpresult" @change="resultChange" size="small">
											<el-radio label="0" border>通过</el-radio>
											<el-radio label="1" border>未通过</el-radio>
										</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="8" v-if="!ruleForm.result">
									<el-form-item label="拒绝理由" class="mt10" prop="remark">
										<el-select v-model="ruleForm.backRemark" placeholder="请选择">
											<el-option v-for="item in backRemark" :key="item" :label="item" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="备注" class="mt10" prop="remark">
										<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-col class="footer_but_bd" :span="24">
								<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
								<el-button @click="$router.back(-1)" style="margin-left:5px;float:right;">返回</el-button>
							</el-col>
						</el-form>
					</el-collapse-item>
					<el-collapse-item title="审核操作" name="15" class="lefw10" v-else>
						<template v-for="(item,index) in ruleFormStatic.hiTasksOfRuExecution">
							<el-row class="mt5">
								<el-col :span="5">
									<dl class="dllist">
										<dt>♦</dt>
										<dt>审核状态:</dt>
										<dd>{{ item.result == false ? '退回' : item.NAME_ == '售后文员审核评分' ? '同意接收' : '通过'  }}</dd>
									</dl>
								</el-col>
								<el-col :span="7">
									<dl class="dllist">
										<dt>{{ item.result == false ? '审核时间:' : '移交时间:' }}</dt>
										<dd>{{ item.END_TIME_ == null ? "暂无" : fmtdata.formatDate.format(new Date(item.END_TIME_), 'yyyy-MM-dd hh:mm')}}</dd>
									</dl>
								</el-col>
								<el-col :span="5">
									<dl class="dllist">
										<dt>操作人:</dt>
										<dd>{{ item.EMPLOYEENAME}}</dd>
									</dl>
								</el-col>
								<el-col :span="7">
									<dl class="dllist">
										<dt>操作节点:</dt>
										<dd>{{ item.NAME_}}</dd>
									</dl>
								</el-col>
								<el-col :span="8" v-if="item.result == false">
									<dl class="dllist">
										<dt>退回原因:</dt>
										<dd>{{ item.remark }}</dd>
									</dl>
								</el-col>
								<el-col :span="8" v-if="item.result == true && item.remark">
									<dl class="dllist">
										<dt>同意接收备注:</dt>
										<dd>{{ item.remark }}</dd>
									</dl>
								</el-col>
							</el-row>
						</template>
						<el-col class="footer_but_bd" :span="24">
							<el-button type="primary" @click.native="passHandle(0, $store.state.formObj,1)">{{$store.state.formObj.taskDefinitionKey == 'B1_examine' ? '移交' : '同意接收'}}</el-button>
                            <el-button type="danger" v-if="$store.state.formObj.taskDefinitionKey != 'B1_examine'"  @click.native="passHandle(0, $store.state.formObj,2)">退回</el-button>
                            <el-button type="primary" v-if="$store.state.formObj.taskDefinitionKey == 'B3_examine'" @click.native="passHandle(0, $store.state.formObj,3)">无保险</el-button>
                            <el-button @click="$router.back(-1)" style="margin-left:5px;">返回</el-button>
						</el-col>
					</el-collapse-item>
					
				</el-collapse>
			</el-col>

		</el-row>


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
<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import async from 'async';
	import util from '../../../common/js/util';
	import gdmap3 from 'components/map/gdmap3';
	import evaluate from 'components/comment/evaluate';
	import { getTodoInfoList, addApprovaperServiceVerify, cldeviceIsOnstate,addExamine,getReasonInfo,getVehList,getVehGis } from '../../../api/api';

	export default {
		props: ['curTaskId'],
		components: {
			gdmap3,
			evaluate
		},
		data() {
			return {
				fmtdata: util,
				indDe: 0,
				backRemark: ["资料错误", "未上线", "其它"],
				realTimeRefreshLoading: false,
				ruleFormStatic: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {
							corpname: ''
						}
					},
					corporateInfo: {},
					insuranceInfo: {
						insurancecorpid: ''
					},
					ownerInfo: {
						name: '',
						idcard: '',
						mobile: ''
					},
					flowData: {
						verify_result: '',
						apply_remark: ''
					},
					declarEmployee: {},
					installEmployee: {
						employeename: ''
					},
					installGroupInfo: {
						groupname: ''
					}
				},
				tmpresult: '0',
				ruleForm: { //启动报单提交表单信息
					result: true,
					backRemark: '',
					remark: '',
					platecolorid:'',//车辆类型
					vehicletype: '',
					licenseplatecolor:'',
				},
				rules: { //启动报单表单验证信息
				},
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '10086'],
				addLoading: false,
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
				vehlist: [], //车类型列表
				vehLoading: false, //车类型
				vehStatus:'',//车辆实时状态
				vehAddress:'',//车辆实时位置
				vehLastTime:'',//车辆最后一次通讯时间
			};
		},
		methods: {
			// 获取车辆定位信息
			getGisAddress(vehid){
				let para = {
					id:vehid
				}
				getVehGis(para).then((res) => {
					let data = res.data.data.realdata;
					if(data){//当有数据时
					   	this.vehLastTime = data.recvtime;
					   	 this.$refs.vueAmap3.getAddress(util.transformWGStoGCJ(data.lng,data.lat),para.id,(res)=>{
			                                       	 this.vehAddress = res;
			                                     });
				                         switch(data.istate){//车辆实时状态转换
				                                case 0:
				                                    this.vehStatus = "行驶";
				                                break;
				                                case 1:
				                                    this.vehStatus = "离线";
				                                break;
				                                case 2:
				                                    this.vehStatus = "停车";
				                                break;
				                                case 3:
				                                    this.vehStatus = "报警";
				                                break;
				                                case 4:
				                                    this.vehStatus = "无效定位";
				                                break;
				                                case 5:
				                                    this.vehStatus = "未定位";
				                                break;
				                                case 1000:
				                                    this.vehStatus = "在线";
				                                break;
				                         }
			                        }else{//没有数据时
			                            this.vehAddress = "无定位";
					   this.vehLastTime = "无记录";
			                            this.vehStatus = "未在线";
			                        }
				});
			},
			/*车类型——下拉*/
			vehChange(r) {
				if(!r || this.vehlist.length > 0) return;
				this.vehLoading = true;
				getVehList().then((res) => {
					this.vehlist = res.data.data;
					this.vehLoading = false;
				});
			},
			// 选择车辆类型改变车牌颜色
			changeColor(val){
				this.ruleForm.licenseplatecolor = val.platecolordesc;
			},
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
		                // if (row.taskDefinitionKey != 'B1_examine') {//同意接收
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
		                        this.$router.back(-1);
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
			                        this.$router.go(-1);
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
			                    	this.$router.go(-1);
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
			resultChange(item) {
				this.ruleForm.result = item == '0' ? true : false;
			},
			/* 提交表单数据 */
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
							taskId: this.curTaskId,
							properties: {
								result: this.ruleForm.result,
								remark: this.ruleForm.backRemark + this.ruleForm.remark,
								vehicleInfo: {
									ID:this.ruleFormStatic.vehicleInfo.id,
									platecolorid:this.ruleForm.vehicletype.id,
									licenseplatecolor: this.ruleForm.vehicletype.platecolordesc,
								}
							},
						};
						this.addLoading = true;
						//提交审核结果
						addApprovaperServiceVerify(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
								if(!this.$store.state.formObj) {
									this.getHdTodo();
								} else {
									this.$router.back(-1);
									return;
								}
							}
						});
					}
				});
			},
			//实时获取设备位置 和 在线情况
			realTimeRefreshPro(gmapname) {
				let _this = this,
					pro = _this.ruleFormStatic,
					len = pro.installDetails.length;
				if(_this.$refs[gmapname]) _this.$refs[gmapname].clearMap();
				if(len > 0) {
					let i = _this.indDe,
						para = {
							id: pro.installDetails[i].packInfo.E_PRODUNUM
						};
					_this.realTimeRefreshLoading = true;
					async.waterfall([
						function(callback) {
							cldeviceIsOnstate(para).then((res) => {
								let data = res.data.data.realdata;
								callback(null, data);
							});

						},
						function(data, callback) {
							if(data) {
								if(data.lng == 0 || data.lat == 0) {
									_this.ruleFormStatic.installDetails[i].curaddress = "无定位";
									callback(null, data);
								} else {
									_this.$refs[gmapname].getAddress(util.transformWGStoGCJ(data.lng,data.lat), para.id, (res) => {
										_this.ruleFormStatic.installDetails[i].curaddress = res;
										callback(null, data);
									});
								}
							} else {
								_this.ruleFormStatic.installDetails[i].curaddress = "无定位";
								callback(null, data);
							}
						},
					], function(err, data) {
						if(data){
				                            switch(data.istate){
				                                case 0:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "行驶";
				                                break;
				                                case 1:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "离线";
				                                break;
				                                case 2:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "停车";
				                                break;
				                                case 3:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "报警";
				                                break;
				                                case 4:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "无效定位";
				                                break;
				                                case 5:
				                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "未定位";
				                                break;
				                            }
				                            _this.ruleFormStatic.installDetails[i].recvtime = data.recvtime;
				                        }else{
				                            _this.ruleFormStatic.installDetails[i].curaddress = "无定位";
				                            _this.ruleFormStatic.installDetails[i].curonlinestatus ="未在线";
				                        }
						_this.realTimeRefreshLoading = false;
						_this.indDe++;
						if(_this.indDe < len) _this.realTimeRefreshPro(gmapname);
						if(_this.indDe == len) _this.indDe = 0;
					});
				}
			},
			getCustoHistoryInfo(res, row) {
				//初始化图片查看器
				$("div.rpShowimgDialog").on("click",".image",function(e){
			                    $("div.rpShowimgDialog").viewer("destroy");
			                    $("div.rpShowimgDialog").viewer({zIndex:999999999});
			             });
				this.ruleFormStatic = res;
				this.realTimeRefreshPro('vueAmap3');
				this.ruleForm.vehicletype = res.vehicleInfo.vehiclePlateColor.typedesc;//车辆类型信息
				this.ruleForm.licenseplatecolor = res.vehicleInfo.vehiclePlateColor.platecolordesc;//车牌颜色信息
				// 获取车辆定位信息
				this.getGisAddress(this.ruleFormStatic.vehicleid);
			},
			/* 重置表单数据 */
			resetForm(formName) {
				this.ruleForm = { //启动报单提交表单信息

				};
			}
		},
		/*初始化页面数据*/
		created() {
			this.$emit("changeStep", 3);
			//判断是否单条处理
			this.$emit("getFormData", this.$store.state.formObj);
		}
	}
</script>