<!--* 
* @description: 拆除订单详情（派单） —— 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
* 拆除订单详情
*-->
<template>
	<el-row>
		<el-col :span="24">
			<el-collapse v-model="detailActiveNames" class="bdcoll rpShowimgDialog">
				<el-collapse-item title="报单信息" class="lefw10 wzpdt10" name="1">
					<el-row>
						<el-col :span="8">
							<dl class="dllist">
								<dt>拆除类型:</dt>
								<dd>新装拆除</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>拆除单号:</dt>
								<dd v-if="ruleFormStatic.orderno">{{ ruleFormStatic.orderno }}</dd>
							</dl>
						</el-col>

					</el-row>

					<el-row class="mt2 pt2">
						<el-col :span="8">
							<dl class="dllist">
								<dt>创建人单位:</dt>
								<dd v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</dd>
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
								<dt>任务候选人:</dt>
								<dd v-if="$store.state.formObj.candidateUsers">{{ $store.state.formObj.candidateUsers }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>报单备注:</dt>
								<dd >{{ ruleFormStatic.flowData.start_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>派单备注:</dt>
								<dd >{{ ruleFormStatic.flowData.send_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>施工备注:</dt>
								<dd >{{ ruleFormStatic.flowData.work_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>审核备注:</dt>
								<dd >{{ ruleFormStatic.flowData.service_verify_remark }}</dd>
							</dl>
						</el-col>
					</el-row>
				</el-collapse-item>

				<el-collapse-item title="车主信息" class="lefw10 wzpdt10" name="2">
					<el-row class="mt2 pt2">
						<el-col :span="8">
							<dl class="dllist">
								<dt>姓名:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.name }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>身份证号码:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.idcard }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>联系电话:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.mobile }}</dd>
							</dl>
						</el-col>
					</el-row>
				</el-collapse-item>

				<el-collapse-item title="车辆信息" class="lefw10 wzpdt10" name="3">
					<el-row class="mt2 pt2">
						<el-col :span="8">
							<dl class="dllist">
								<dt>车辆型号:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.model }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车牌号:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
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
								<dt>车辆类型:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.vehiclePlateColor ? ruleFormStatic.vehicleInfo.vehiclePlateColor.typedesc : '暂无' }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车架号:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.vin }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车辆颜色:</dt>
								<template v-if="ruleFormStatic.vehicleInfo">
									<template v-if="ruleFormStatic.vehicleInfo.color">
										<dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
										<dd v-else>
											<span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
										</dd>
									</template>
								</template>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车价:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.price }}元</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>受理银行:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo">
									<template v-if="ruleFormStatic.vehicleInfo.receivingbank">
										{{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}
									</template>
								</dd>
							</dl>
						</el-col>
						
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
				<el-collapse-item title="拆除设备信息" name="10086" class="enlargeArea" v-if="ruleFormStatic.afterSaleDetails && ruleFormStatic.afterSaleDetails.length>0">
					<template slot="title">
						<div class="fl sebei" style="margin-right:10px;">拆除设备信息</div>
						<el-button @click.stop="realTimeRefreshPro('vueAmap3')" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
					</template>
					<el-row class="mt5">
						<el-col :span="24">
							<gdmap3 ref="vueAmap3"></gdmap3>
						</el-col>
					</el-row>
				</el-collapse-item>
				<template v-for="(item,index) in ruleFormStatic.afterSaleDetails">
					<el-collapse-item title="拆除设备信息" :name="(++index)+''" class="wzpdt10">
						<template slot="title">
							<div class="fl sebei">
								<span class="tagNum">{{ index }}</span> {{ item.packinfo.E_PRODTYPE+'设备'+item.packinfo.E_PRODMODEL }}
							</div>
						</template>
						<el-row class="mt5">
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
									<dd v-if="item.packinfo">{{ item.packinfo.E_PRODUNUM }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>设备类型:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.E_PRODTYPE }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>设备型号:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.E_PRODMODEL }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>SIM卡号:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.C_PRODUNUM }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>iccid:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.SIMCARDID }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>卡类型:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.C_PRODMODEL }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>设备实时状态：</dt>
									<dd v-if="item.curonlinestatus">{{ item.curonlinestatus }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>最后一次通讯时间：</dt>
									<dd v-if="item.recvtime">{{ item.recvtime }}</dd>
								</dl>
							</el-col>
							<el-col :span="16">
								<dl class="dllist">
									<dt>实时位置信息：</dt>
									<dd v-if="item.curaddress">{{ item.curaddress }}</dd>
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
							<el-button ref="btn" :type="item.removeid == null ? 'danger' : 'info'" :disabled="item.removeid == null ? false : true" @click="removeProd(item,$event,index)" icon="el-icon-sold-out" style="float:right;">{{ item.removeid == null ? '拆 除' : '已拆除' }}</el-button>
						</el-row>
					</el-collapse-item>
				</template>
				<el-collapse-item title="预约信息" class="lefw10 wzpdt10" name="8">
					<el-row class="mt2 pt2">
						<el-col :span="8">
							<dl class="dllist">
								<dt>维修联系人:</dt>
								<dd v-if="ruleFormStatic.contactperson">{{ ruleFormStatic.contactperson }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>联系电话:</dt>
								<dd v-if="ruleFormStatic.contactmobile">{{ ruleFormStatic.contactmobile }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>预约时间:</dt>
								<dd v-if="ruleFormStatic.aftersaledate">{{ ruleFormStatic.aftersaledate }}</dd>
							</dl>
						</el-col>
						<el-col :span="16">
							<dl class="dllist">
								<dt>预约地址:</dt>
								<dd v-if="ruleFormStatic.aftersaleaddress">{{ ruleFormStatic.aftersaleaddress }}</dd>
							</dl>
						</el-col>
						<el-col :span="24">
							<dl class="dllist">
								<dt>备注:</dt>
								<dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.start_remark }}</dd>
							</dl>
						</el-col>
					</el-row>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!-- 报单 -->
		<el-col v-if="stepNum == 1" :span="24" class="cbstyle">
			<el-button @click="closeDialog" style="margin-left:5px;float:right;">取消</el-button>
			<el-button @click="comfirDelOrder" type="danger" style="margin-left:5px;float:right;">废除订单</el-button>
			<el-button type="primary" @click="$router.push('/dismantle')" :loading="addLoading" style="margin-left:5px;float:right;">重新报单</el-button>
		</el-col>

		<!-- 派单 -->
		<el-col v-if="stepNum == 2" :span="24" class="cbstyle">
			<el-collapse v-model="activeNames" class="bdcoll">
				<el-collapse-item title="派单操作" name="1" class="lefw10">
					<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
						<el-row :gutter="20">
							<el-col :span="24" style="padding:0;">
								<el-col :span="8">
									<el-form-item label="安装小组" prop="send_work_group">
										<el-select @change="changeInstallGrounp" value-key="groupname" @visible-change="visInitGroup" :loading="groupLoading" filterable v-model="ruleForm.send_work_group" placeholder="请选择">
											<el-option v-for="item in workGroup" :key="item.groupname" :label="item.groupname" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="指定安装人员" prop="send_work_user">
										<el-select v-model="ruleForm.send_work_user" value-key="employeename" filterable :loading="userLoading" placeholder="请选择">
											<el-option v-for="item in workUser" :label="item.employeename" :key="item.employeename" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="拆除联系人" prop="contactperson">
										<el-input type="text" placeholder="请输入拆除联系人姓名" v-model="ruleForm.contactperson"></el-input>
									</el-form-item>
								</el-col>
							</el-col>
							<el-col :span="8">
								<el-form-item label="拆除联系方式" prop="contactmobile">
									<el-input type="text" placeholder="请输入拆除联系方式" v-model="ruleForm.contactmobile"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="24">
								<el-form-item label="备注" prop="remark">
									<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
								</el-form-item>
							</el-col>


							<el-col :span="24">
								<personnelPositioning ref="mapPositon" :groupid="groupid"></personnelPositioning>
							</el-col>
						</el-row>
						<el-col class="footer_but_bd" :span="24">
							<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
							<el-button @click="closeDialog" style="margin-left:5px;float:right;">取消</el-button>
							<el-button @click="addRefuseHandling(0)" :loading="addLoading" class="fr" type="danger">退回</el-button>
						</el-col>
					</el-form>
				</el-collapse-item>
			</el-collapse>
		</el-col>
		<!-- 施工接单 -->
		<el-col :span="24" v-if="stepNum == 3" class="cbstyle">
			<el-collapse v-model="activeNames" class="bdcoll">
				<el-collapse-item title="施工接单审核" name="1" class="lefw10">
					<el-col :span="12" class="mt10">
						<el-radio-group v-model="tmpresult" @change="resultChange" size="small">
							<el-radio label="0" border>通过</el-radio>
							<el-radio label="1" border>未通过</el-radio>
						</el-radio-group>
					</el-col>

					<el-col :span="12" class="mt10">
						<el-button type="primary" @click="passConstructionOrder('ruleForm')" class="fr" :loading="addLoading">提交</el-button>
						<el-button @click="closeDialog" class="fr mr5">取消</el-button>
					</el-col>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!-- 施工 -->
		<el-col :span="24" v-if="stepNum == 4" class="cbstyle">
			<el-collapse v-model="activeNames" class="bdcoll">
				<el-collapse-item title="施工" name="1" class="lefw10">
					<el-col :span="24" class="mt10">
						<el-input type="textarea" autosize placeholder="请输入备注" v-model="rejectRemarks"></el-input>
					</el-col>
					<el-col :span="24" class="mt10">
						<el-button type="primary" @click="addRefuseHandling(2)" class="fr" :loading="addLoading">提交</el-button>
						<el-button @click="closeDialog" class="fr mr5" style="margin-left:5px;">取消</el-button>
						<el-button @click="addRefuseHandling(0)" :loading="addLoading" class="fr" type="danger">退回</el-button>
					</el-col>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!-- 审核 -->
		<el-col :span="24" v-if="stepNum == 5" class="cbstyle">
			<el-collapse v-model="activeNames" class="bdcoll">
				<el-collapse-item title="审核" name="1" class="lefw10">
					<el-col :span="24" class="mt10">
						<evaluate ref="refEvaluate"></evaluate>
					</el-col>
					<el-col :span="24" class="mt10">
						<el-input type="textarea" autosize placeholder="请输入备注" v-model="rejectRemarks"></el-input>
					</el-col>
					<el-col :span="24" class="mt10">
						<el-button type="primary" @click="addRefuseHandling(1)" class="fr" :loading="addLoading">提交</el-button>
						<el-button @click="closeDialog" class="fr mr5" style="margin-left:5px;">取消</el-button>
						<el-button @click="addRefuseHandling(0)" :loading="addLoading" type="danger" class="fr">退回</el-button>
					</el-col>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!-- 流转信息 -->
		<el-col :span="24" class="cbstyle mt10">
			<el-collapse v-model="activeName" class="bdcoll">
				<el-collapse-item title="流转信息" class="lefw10" name="1">
					<el-row class="mt2 pt2">
						<el-col :span="24">
							<el-table :data="cirInfoData" border style="width: 100%">
								<el-table-column prop="NAME_" align="center" label="流程节点" width="80">
								</el-table-column>
								<el-table-column prop="EMPLOYEENAME" align="center" label="操作人" width="80">
								</el-table-column>
								<el-table-column prop="START_TIME_" align="center" label="接收时间" :formatter="endDateFormat">
								</el-table-column>
								<el-table-column prop="END_TIME_" align="center" label="提交时间" :formatter="startDateFormat">
								</el-table-column>
								<el-table-column prop="DURATION_" align="center" label="操作耗时">
								</el-table-column>
								<el-table-column prop="" align="center" label="操作状态">
								</el-table-column>
								<el-table-column prop="" align="center" label="备注信息">
								</el-table-column>
							</el-table>
						</el-col>
					</el-row>
				</el-collapse-item>
			</el-collapse>
		</el-col>
	</el-row>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>
<script>
	import async from 'async';
	import util from '../../../common/js/util';
	import gdmap3 from 'components/map/gdmap3';
	import evaluate from 'components/comment/evaluate';
	import personnelPositioning from 'components/map/personnelPositioning';
	import { addApprovaperSendVindicateRmove, getPdInstallGroupList, getPdInstallUserList, getvariablesSeaviceTaskInfoList, cldeviceIsOnstate, deleteProcess,addApprovaperVindicate_removeCl } from '../../../api/api';
	export default {
		name: "example",   //这里可以给组件命名的
		components: {
			gdmap3,
			evaluate,
			personnelPositioning
		},
		data() {
			//自定义验证安装地址表单
			let checkInstall = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0) {
					return callback(new Error('必选项'));
				} else {
					callback();
				}
			};
			return {
				indDe: 0,
				groupid:'',
				tmpresult: '0',
				cirInfoData: [],
				workGroup: [],
				workUser: [],
				curTaskId: '',
				ruleForm: { //启动报单提交表单信息
					send_work_group: '',
					send_work_user: '',
					contactmobile:'',
					contactperson:'',
					result: true,
					remark: ''
				},
				rules: { //启动报单表单验证信息
					send_work_group: [{
						required: true,
						validator: checkInstall,
						trigger: 'blur'
					}], //安装小组验证
					send_work_user: [{
						required: true,
						validator: checkInstall,
						trigger: 'blur'
					}] //安装人员验证
				},
				//拆除弹窗详情显示
				ruleFormStatic: {
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
					declarEmployee: {},
					flowData: {},
					installGroupInfo: {}
				},
				detailActiveNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '10086'],
				activeNames: ['1'],
				activeName: ['1'],
				stepNum: 1,
				addLoading: false,
				isFlag: true,
				realTimeRefreshLoading: false,
				groupLoading: false,
				userLoading: false,
				rejectRemarks:'',
				prodIDList:[],//拆除设备的id组
			};
		},
		methods: {
			// 接受时间格式化
			endDateFormat(row, col) {
				if(row.START_TIME_)
				return util.formatDate.format(new Date(row.START_TIME_), 'yyyy-MM-dd hh:mm:ss');
			},
			// 提交时间格式化
			startDateFormat(row, col) {
				if(row.END_TIME_)
				return util.formatDate.format(new Date(row.END_TIME_), 'yyyy-MM-dd hh:mm:ss');
			},
			//提交拒绝理由
			addRefuseHandling(n) {
				let addformpara = {
					taskId: this.$store.state.formObj.id,
					properties: {}
				};
				addformpara.properties = {
					result: n == 0?false:true,
					remark: this.rejectRemarks,
					afterSaleDetails:this.prodIDList,
				}
				if (n == 2) {//点击提交的时候
					if (addformpara.properties.afterSaleDetails == undefined || addformpara.properties.afterSaleDetails.length == 0 ) {
						this.addLoading = false;
						this.$message({
							message: '请先拆除设备！',
							type: 'error'
						});
						return;
					}
				}
				this.addLoading = true;
				//提交审核结果
				addApprovaperSendVindicateRmove(addformpara).then((res) => {
					this.addLoading = false;
					if(res.data.result.code == 0) {
						if(addformpara.properties.result) {
							this.$message({
								message: '审核成功！',
								type: 'success'
							});
						} else {
							this.$message({
								message: '拒绝成功！',
								type: 'success'
							});
						}
						//初始化待办数量
						this.$store.dispatch('initFormNum');
						this.closeDialog();
					}
				}).catch((error) => {
					this.addLoading = false;
				});
				this.rejectRemarks = '';
			},
			//施工接单是否通过
			resultChange(item) {
				this.ruleForm.result = item == '0' ? true : false;
			},
			//施工接单通过审核
			passConstructionOrder() {
				let addformpara = {
					taskId:this.$store.state.formObj.id,
					properties: {
						result: this.ruleForm.result,
						afterSaleDetails:this.prodIDList,
					}
				};
				if (addformpara.properties.afterSaleDetails == undefined || addformpara.properties.afterSaleDetails.length == 0 ) {
					this.addLoading = false;
					this.$message({
						message: '请先拆除设备！',
						type: 'error'
					});
					return;
				}
				this.addLoading = true;
				addApprovaperVindicate_removeCl(addformpara).then((res) => {
					this.addLoading = false;
					if(res.data.result.code == 0) {
						//初始化待办数量
						this.$store.dispatch('initFormNum');
						this.closeDialog();
					}
				});
			},
			// 拆除设备
			removeProd(data,e,index){
				this.$confirm('确认拆除该设备?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
			        	}).then(() => {
			        		this.$refs['btn'][index-1].$el.className = "el-button el-button--danger el-button--medium is-disabled";
			        		this.prodIDList.push({ID:data.ID});//存储设备id
			        		e.stopPropagation();//阻止冒泡
			        	})
			},
			//根据任务id获取表单信息
			getFormData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					taskId: obj.id
				};
				this.curTaskId = obj.id;
				getvariablesSeaviceTaskInfoList(pa).then((res) => {
					let _this = this,
						data = res.data.data;
					if(!data.vehicleInfo) {
						data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
					}
					if(!data.vehicleInfo.receivingbank) {
						data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
					}
					if(!data.assigntoGroup) {
						data.assigntoGroup = _this.ruleFormStatic.assigntoGroup;
					}
					this.ruleFormStatic = data;
					this.getCustoHistoryInfo(data);
				}).catch((error) => {});
			},
			//实时获取设备位置 和 在线情况
			realTimeRefreshPro(gmapname) {
				let _this = this,
					pro = _this.ruleFormStatic,
					len = pro.afterSaleDetails.length;
				if(_this.$refs[gmapname]) _this.$refs[gmapname].clearMap();
				if(len > 0) {
					let i = _this.indDe,
						para = {
							id: pro.afterSaleDetails[i].packinfo.E_PRODUNUM
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
									_this.ruleFormStatic.afterSaleDetails[i].curaddress = "无定位";
									callback(null, data);
								} else {
									_this.$refs[gmapname].getAddress([data.lng, data.lat], para.id, (res) => {
										_this.ruleFormStatic.afterSaleDetails[i].curaddress = res;
										callback(null, data);
									});
								}
							} else {
								_this.ruleFormStatic.afterSaleDetails[i].curaddress = "无定位";
								callback(null, data);
							}
						},
					], function(err, data) {
						if(data) {
							switch(data.istate) {
								case 0:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "行驶";
									break;
								case 1:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "离线";
									break;
								case 2:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "停车";
									break;
								case 3:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "报警";
									break;
								case 4:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "无效定位";
									break;
								case 5:
									_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "未定位";
									break;
							}
							_this.ruleFormStatic.afterSaleDetails[i].recvtime = data.recvtime;
						} else {
							_this.ruleFormStatic.afterSaleDetails[i].curaddress = "无定位";
							_this.ruleFormStatic.afterSaleDetails[i].curonlinestatus = "未在线";
						}
						_this.realTimeRefreshLoading = false;
						_this.indDe++;
						if(_this.indDe < len) _this.realTimeRefreshPro(gmapname);
						if(_this.indDe == len) _this.indDe = 0;
					});
				}
			},
			//废除订单
			comfirDelOrder() {
				let para = {
					id: this.$store.state.formObj.processInstanceId,
					reson: ''
				}
				deleteProcess(para).then((res) => {
					if(res.data.result.code == 0) {
						this.$router.back(-1);
					}
				});
			},
			
			/* 提交表单数据 */
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
							taskId: this.curTaskId,
							properties: {}
						};
						addformpara.properties = {
							assigntogroup: this.ruleForm.send_work_group.id,
							assignto: this.ruleForm.send_work_user.ID,
							contactperson:this.ruleForm.contactperson,
							contactmobile:this.ruleForm.contactmobile,
							result: this.ruleForm.result,
							remark: this.ruleForm.remark,
							// afterSaleDetails:this.prodIDList,
						};
						this.addLoading = true;
						// if (addformpara.properties.afterSaleDetails == undefined || addformpara.properties.afterSaleDetails.length == 0) {
						// 	this.addLoading = false;
						// 	this.$message({
						// 		message: '请先拆除设备！',
						// 		type: 'error'
						// 	});
						// 	return;
						// }
						
						//提交审核结果
						addApprovaperSendVindicateRmove(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '拆除派单提交成功！',
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
								this.closeDialog();
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
			//点击下拉选取安装组信息
			visInitGroup(r) {
				this.isFlag = false;
				if(!r || this.workGroup.length > 0) return;
				let para = {
					grouptype: 'INSTALL',
					deptid: 58,
					showCount: 200
				};
				this.groupLoading = true;
				getPdInstallGroupList(para).then((res) => {
					this.workGroup = res.data.data.records;
					this.groupLoading = false;
				});
			},
			//默认选中组人员
			getPdInstallGroupList(r) {
				let para = {
					grouptype: 'INSTALL',
					deptid: 58,
					showCount: 200
				};
				this.groupLoading = true;
				getPdInstallGroupList(para).then((res) => {
					this.workGroup = res.data.data.records;
					this.groupLoading = false;
					if(this.isFlag) {
						this.workGroup.forEach((v) => {
							if(v.id == this.ruleFormStatic.installGroupInfo.id) {
								this.ruleForm.send_work_group = v;
								return false;
							}
						});
					}
				});
			},
			//安装组改变
			changeInstallGrounp(obj) {
				this.ruleForm.send_work_user = '';
				this.workUser = '';
				if(obj == '') return;
				this.getPdInstallUserList(obj.id);
			},
			//查询组员根据组id
			getPdInstallUserList(gid) {
				let para = {
					groupid: gid,
					showCount: 200
				};
				this.userLoading = true;
				this.searchInstallUserLoc(gid);
				getPdInstallUserList(para).then((res) => {
					this.workUser = res.data.data.records;
					this.userLoading = false;
					if(this.isFlag) {
						this.workUser.forEach((v) => {
							if(v.userid == this.ruleFormStatic.installEmployee.userid) {
								this.ruleForm.send_work_user = v;
								return false;
							}
						});
					}
				});
			},
			//查询选择组安装人员的地理位置
			searchInstallUserLoc(gid){
				this.groupid = gid;
				this.$refs.mapPositon.addMarker();
			},
			//父级如果是点击查询回调
			getCustoHistoryInfo(res) {
				this.resetForm();
				this.ruleFormStatic = res;
				//查询设备实时位置
				this.realTimeRefreshPro('vueAmap3');
				this.ruleForm.contactmobile = res.contactmobile;
				this.ruleForm.contactperson = res.contactperson;
				this.cirInfoData = res.hiTasksOfRuExecution;
				this.ruleForm.send_work_group = '';
				this.ruleForm.send_work_user = '';
				this.isFlag = true;
			},
			//关闭当前窗口
			closeDialog() {
				this.$router.back(-1);
			},
			//派单信息清空
			resetForm() {
				this.ruleForm = {
					send_work_group: '',
					send_work_user: '',
					contactmobile:'',
					contactperson:'',
					result: true,
					remark: ''
				}
			}
		},
		created() {
			if(this.$store.state.formObj) {
				this.stepNum = this.$store.state.formObj.step;
				this.getFormData(this.$store.state.formObj);
			}
		},
		mounted(){
			let tempStepNum = 0;
			tempStepNum = (this.stepNum-1);
			if(tempStepNum == 2 || tempStepNum == 3) tempStepNum = 2;
			this.$emit("changeStep", tempStepNum);
			//如果是审核为安装人员打分 就不显示  打分原件的默认提交和备注框
			if(this.stepNum == 5) this.$refs.refEvaluate.isShowAdd = false;
		}
	}
</script>