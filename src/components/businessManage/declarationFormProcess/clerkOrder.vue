<!--* 
* @description: 报单中心    新装单——文员审核/派单环节详情
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section v-loading="orderLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
		<el-row>
			<el-collapse v-model="activeName" :class="ruleFormStatic.flowData.work_result === false ? 'bdcoll mt20' : 'bdcoll'" v-if="ruleFormStatic.flowData.work_result === false">
				<el-collapse-item title="退回原因" name="0" class="lefw10">
					<el-form label-position="left" inline label-width="110px" class="demo-table-expand">
						<el-form-item label="描述">
							<span style="color:red;">{{ ruleFormStatic.flowData.work_remark }}</span>
						</el-form-item>
					</el-form>
				</el-collapse-item>
			</el-collapse>
			<el-col :span="24" class="cbstyle">
				<el-collapse v-model="activeNames" class="bdcoll">
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
									<dd v-if="$store.state.formObj.assignee">{{ $store.state.formObj.assignee  }}</dd>
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
									<dt>安装说明:</dt>
									<dd style="color:red;">默认安装的保险产品为有线车载终端(有源)，常规产品为无线车载终端(无源)。</dd>
								</dl>
							</el-col>

							<el-col :span="8" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>报单备注:</dt>
									<dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="8" v-if="ruleFormStatic.flowData">
								<dl class="dllist">
									<dt>派单备注:</dt>
									<dd>{{ ruleFormStatic.flowData.verify_remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="8" v-if="ruleFormStatic.flowData.work_receive_result == false">
								<dl class="dllist">
									<dt>退回备注:</dt>
									<dd>{{ ruleFormStatic.flowData.work_remark }}</dd>
								</dl>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="预约信息修改" name="4" class="lefw10">
						<el-form label-position="top" :model="ruleForm" class="cur-form-inn" inline>
							<el-row :gutter="20">
								<el-col :span="8" class="mt10">
									<el-form-item label="安装联系人" prop="contactperson">
										<el-input type="text" placeholder="请输入安装联系人姓名" v-model="ruleForm.contactperson"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt10">
									<el-form-item label="安装联系方式" prop="contactmobile">
										<el-input type="text" placeholder="请输入安装联系方式" v-model="ruleForm.contactmobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt10">
									<el-form-item label="业务员" prop="salername">
										<el-input type="text" placeholder="请输入业务员姓名" v-model="ruleForm.salername"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt10">
									<el-form-item label="业务员联系方式" prop="salermobile">
										<el-input type="text" placeholder="请输入业务员联系方式" v-model="ruleForm.salermobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="预约安装日期" class="mt10" prop="installapplydate">
										<el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择日期" v-model="ruleForm.installapplydate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="安装地址" class="mt10 installaddressStyle" prop="installaddresscode">
										<el-input placeholder="请输入详细地址" v-model="ruleForm.installaddress" @change="refmap">
											<el-cascader placeholder="请选择省/市/区" clearable slot="prepend" class="cascLable" v-model="ruleForm.installaddresscode" :options="prOptions" @change="addressChanges" filterable change-on-select></el-cascader>
										</el-input>
									</el-form-item>
									<gdmap v-if="ruleForm.installaddress" @draggerMapMarker="draggerMapMarker" :address="ruleForm.installaddress" ref="vueAmap"></gdmap>
								</el-col>
							</el-row>
						</el-form>
					</el-collapse-item>
					<el-collapse-item title="审核操作" name="4" class="lefw10">
						<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
							<el-row :gutter="20">
								<el-col :span="4" class="mt18">
									<el-form-item label="车辆情况选项" prop="carstatus">
										<el-radio-group v-model="ruleForm.carstatus">
											<el-radio-button label="1">已到</el-radio-button>
											<el-radio-button label="0">未到</el-radio-button>
										</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="4" class="mt18">
									<el-form-item label="是否有盗抢险" prop="hastheftinsurance">
										<el-radio-group v-model="ruleForm.hastheftinsurance" @change="radioChange">
											<el-radio-button label="1">有</el-radio-button>
											<el-radio-button label="0">没有</el-radio-button>
										</el-radio-group>
									</el-form-item>
								</el-col>

								<el-col :span="8" class="mt20 lh35">
									<el-form-item label="安装小组" prop="send_work_group">
										<el-select @change="changeInstallGrounp" value-key="groupname" @visible-change="visInitGroup" :loading="groupLoading" filterable v-model="ruleForm.send_work_group" placeholder="请选择">
											<el-option v-for="item in workGroup" :key="item.groupname" :label="item.groupname" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8" class="mt20 lh35">
									<el-form-item label="指定安装人员" prop="send_work_user">
										<el-select v-model="ruleForm.send_work_user" @change="changeInstallUser" value-key="employeename" filterable :loading="userLoading" placeholder="请选择">
											<el-option v-for="item in workUser" :label="item.employeename" :key="item.employeename" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="24" style="padding:0;">
									<el-col :span="8" class="mt10 lh35">
										<el-form-item label="受理银行" prop="receivingbankid">
											<el-select v-model="ruleForm.receivingbankid" @visible-change="receivinList" clearable :loading="receLoading" filterable placeholder="请选择">
												<el-option v-for="item in salerData" :label="item.corpname" :key="item.corpname" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8" class="mt10">
										<el-form-item label="服务年限" prop="yearsofservice">
											<el-input-number v-model="ruleForm.yearsofservice" :min="1" :max="10"></el-input-number>
										</el-form-item>
									</el-col>
									<!-- <el-col :span="8" class="mt10">
										<el-form-item label="安装联系人" prop="contactperson">
											<el-input type="text" placeholder="请输入安装联系人姓名" v-model="ruleForm.contactperson"></el-input>
										</el-form-item>
									</el-col> -->
								</el-col>
		<!-- 						<el-col :span="8" class="mt10">
									<el-form-item label="安装联系方式" prop="contactmobile">
										<el-input type="text" placeholder="请输入安装联系方式" v-model="ruleForm.contactmobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt10">
									<el-form-item label="业务员" prop="salername">
										<el-input type="text" placeholder="请输入业务员姓名" v-model="ruleForm.salername"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt10">
									<el-form-item label="业务员联系方式" prop="salermobile">
										<el-input type="text" placeholder="请输入业务员联系方式" v-model="ruleForm.salermobile"></el-input>
									</el-form-item>
								</el-col> -->
								<div class="CuseInstallDevice" v-for="(item,index) in ruleForm.prodclass">
									<el-col :span="8" class="mt10">
										<el-form-item label="安装设备类别" prop="installtype" class="wiredNum">
											<el-select v-model="ruleForm.prodclass[index].installtype" @change="changeDeviceType(ruleForm.prodclass[index])" :loading="modelClassLoading" filterable @visible-change="changeDeviceList" clearable :disabled="(index == 0 && ruleForm.hastheftinsurance == 1)" placeholder="请选择设备类别">
												<el-option v-for="item in deviceTypeList" :key="item" :label="item" :value="item">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :span="14" class="flexButtonZh mt10">
										<el-form-item label="安装设备型号" prop="installModel" class="wiredNum">
											<el-select v-model="ruleForm.prodclass[index].installModel" @visible-change="getDeviceModelList" @focus="modelFocus(index,ruleForm.prodclass[index].installtype)" :loading="modelClassLoading" filterable clearable placeholder="请选择设备型号">
												<el-option v-for="item in deviceModelList" :key="item.prodmodel" :label="item.prodmodel" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
										<el-button-group class="mb4">
											<template v-if="index == 0 && ruleForm.hastheftinsurance == 1">
												<el-button type="danger" @click="deleteRow(index)" disabled icon="el-icon-delete"></el-button>
											</template>
											<template v-else>
												<el-button type="danger" @click="deleteRow(index)" :disabled="ruleForm.prodclass.length == 1" icon="el-icon-delete"></el-button>
											</template>
											<el-button type="primary" v-if="index == 0" @click="addRow" icon="el-icon-plus"></el-button>
										</el-button-group>
									</el-col>
								</div>

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
								<el-button @click="$router.back(-1)" style="margin-left:5px;float:right;">返回</el-button>
							</el-col>
						</el-form>
					</el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
	</section>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import util from '../../../common/js/util';
	import gdmap from 'components/map/gdmap';
	import { getTodoInfoList, addApprovaperSend, getPdInstallGroupList, getPdInstallUserList, getProductModelClass, getClerkProductModel, searchCorpNameList } from '../../../api/api';
	import personnelPositioning from 'components/map/personnelPositioning';
	export default {
		props: ['ruleFormStatic', 'curTaskId'],
		components:{
			personnelPositioning,
			gdmap
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
				prOptions: util.initProvince(),
				groupid:'',
				orderLoading: false,
				workGroup: [],
				isZH: false,
				workUser: [],
				ruleForm: { //启动报单提交表单信息
					hastheftinsurance: 1,
					installapplyinsu: 1,
					yearsofservice: '',
					carstatus: 1,
					installapplydate:'',
					contactperson: '',
					lng: 0,
					lat: 0,
					contactmobile: '',
					installaddresscode: [],
					installaddress: '',
					receivingbankid: '',
					receivingbankname: '',
					salername: '',
					salermobile: '',
					send_work_group: '',
					send_work_user: '',
					result: true,
					remark: '',
					prodclass: []
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				flag: true,
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
				activeNames: ['1', '2', '3', '4','5'],
				activeName: ['0'],
				addLoading: false,
				isFlag: true,
				groupLoading: false,
				userLoading: false,
				deviceTypeList: [],
				modelClassLoading: false,
				modelFocusPara: {
					index: 0,
					classVal: ''
				},
				isEditeBack: false,
				deviceModelList: [],
				salerData: [],
				receLoading: false
			};
		},
		methods: {
			//拖拽地图小点返回的地址
			draggerMapMarker(address, lnglatXY, type) {
				if(!this.$store.state.formObj) this.ruleForm.installaddress = address;
			},
			//地址改变刷新地图坐标
			refmap() {
				this.$nextTick(function(){				
					this.$refs.vueAmap.geocoder(this.ruleForm.installaddress, (res) => {
						this.ruleForm.lng = res.location.lng;
						this.ruleForm.lat = res.location.lat;
					});
				});
			},
			//地址选择刷新地图坐标
			addressChanges(resw) {
				this.$refs.vueAmap.geocoder(resw.join(""), (res) => {
					this.ruleForm.lng = res.location.lng;
					this.ruleForm.lat = res.location.lat;
					this.ruleForm.installaddress = resw.join("");
				});
			},
			//受理银行列表
			receivinList(r) {
				if(!r || this.salerData.length > 0) return;
				let para = {
					corptype: 'BANK',
					showCount: 1000
				};
				this.receLoading = true;
				searchCorpNameList(para).then((res) => {
					this.receLoading = false;
					if(res.data.result.code == 0) {
						this.salerData = res.data.data.records;
					}
				});
			},
			//获取设备类型
			changeDeviceList(r) {
				if(!r || this.deviceTypeList.length > 0) return;
				this.modelClassLoading = true;
				getProductModelClass().then((res) => {
					this.modelClassLoading = false;
					if(res.data.result.code == 0) {
						this.deviceTypeList = res.data.data;
					}
				});
			},
			//选择安装人员清空设备型号
			changeInstallUser(obj){
				if(this.ruleForm.prodclass.length > 0){
					this.ruleForm.prodclass.forEach((item,index)=>{
						this.ruleForm.prodclass[index].installModel = '';
					});
				}
			},
			changeDeviceType(item) {
				item.installModel = "";
			},
			//获取到选择设备型号焦点
			modelFocus(index, classVal) {
				this.modelFocusPara = {
					index: index,
					classVal: classVal
				}
			},
			//设备类型改变
			getDeviceModelList(r) {
				if(r && !this.ruleForm.send_work_user) {
					this.$message({
						message: "请先选择安装人员",
						type: 'error'
					});
					return;
				}
				if(r && this.ruleForm.send_work_user) {
					let para = {
						empid: this.ruleForm.send_work_user.ID,
						class: {
							prodspec: this.modelFocusPara.classVal
						}
					}
					getClerkProductModel(para).then((res) => {
						if(res.data.result.code == 0) {
							this.deviceModelList = res.data.data;
						}
					});
				}
			},
			//删除一行设备类型数量 选择
			deleteRow(index) {
				this.ruleForm.prodclass.splice(index, 1);
			},
			//添加一行设备类型数量 选择
			addRow() {
				this.ruleForm.prodclass.push({
					installtype: '',
					installModel: ''
				});
			},
			radioChange(res) {
				this.ruleForm.installapplyinsu = res;
				if(res == 1) {
					this.ruleForm.prodclass.splice(0, 0, {
						installtype: '保险设备',
						installModel: ''
					});
				} else {
					this.ruleForm.prodclass.splice(0, 1);
					if(this.ruleForm.prodclass.length == 0) {
						this.ruleForm.prodclass.push({
							installtype: '',
							installModel: ''
						});
					}
				}
			},
			/* 提交表单数据 */
			submitForm(formName) {
				if(this.ruleForm.installapplyinsu == 0 && this.ruleForm.prodclass.length == 0) {
					this.$message({
						message: "保险或常规设备数量不能为0！",
						type: 'warning'
					});
					return;
				}
				if(this.ruleForm.hastheftinsurance == 1 && !this.ruleForm.receivingbankid && !this.isZH) {
					this.$message({
						message: "有盗抢险必须选择受理银行",
						type: 'warning'
					});
					return;
				}
				for(var i = 0; i < this.ruleForm.prodclass.length; i++) {
					if(!this.ruleForm.prodclass[i].installModel) {
						this.$message({
							message: "设备型号必须选",
							type: 'warning'
						});
						return false;
					}
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
							taskId: this.curTaskId,
							properties: {}
						};
						addformpara.properties = {
							installgroupid: this.ruleForm.send_work_group.id,
							installby: this.ruleForm.send_work_user.ID,
							carstatus: this.ruleForm.carstatus,
							installapplyinsu: this.ruleForm.installapplyinsu,
							vehicleInfo: {
								yearsofservice: this.ruleForm.yearsofservice,
								receivingbankid: !isNaN(Number(this.ruleForm.receivingbankid)) ? this.ruleForm.receivingbankid : this.ruleForm.receivingbankname
							},
							prodclass: [],
							contactperson: this.ruleForm.contactperson,
							contactmobile: this.ruleForm.contactmobile,
							salername: this.ruleForm.salername,
							salermobile: this.ruleForm.salermobile,
							installapplydate: util.formatDate.format(new Date(this.ruleForm.installapplydate), 'yyyy-MM-dd hh:mm:ss'),
							installaddresscode: this.ruleForm.installaddresscode.join(",").replace(/,/g, ' '),
							installaddress: this.ruleForm.installaddress,
							result: this.ruleForm.result,
							remark: this.ruleForm.remark
						}
						//判断派单是退回编辑 还是 新增派单
						if(this.ruleForm.prodclass && this.isEditeBack) {
							let temprodclass = [];
							this.ruleForm.prodclass.forEach((item, index) => {
								let para = {};
								if(!isNaN(Number(item.installModel))) {
									para.installModel = item.installModel;
								} else {
									para.installModel = item.installremark;
								}
								para.installtype = item.installtype;
								temprodclass.push(para);
							});
							addformpara.properties.prodclass = temprodclass;
						} else {
							addformpara.properties.prodclass = this.ruleForm.prodclass;
						}
						this.addLoading = true;
						//提交审核结果
						addApprovaperSend(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '派单提交成功！',
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
								this.$router.back(-1);
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
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
								this.getPdInstallUserList(v.id);
								return false;
							} else {
								this.orderLoading = false;
							}
						});
					}
				});
			},
			changeInstallGrounp(obj) {
				this.ruleForm.send_work_user = '';
				this.workUser = '';
				if(obj == '') return;
				this.getPdInstallUserList(obj.id);
			},
			getPdInstallUserList(gid) {
				let para = {
					groupid: gid,
					showCount: 200
				};
				this.searchInstallUserLoc(gid);
				this.userLoading = true;
				getPdInstallUserList(para).then((res) => {
					this.workUser = res.data.data.records;
					this.userLoading = false;
					this.orderLoading = false;
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
			getCustoHistoryInfo(res, row) {
				//判断是否是车贷系统过来的订单
				this.isZH = res.flowData.orderno.indexOf("ZH") > 0;
				this.ruleForm.hastheftinsurance = parseInt(res.installapplyinsu ? res.installapplyinsu : 0);
				this.ruleForm.send_work_group = '';
				this.ruleForm.send_work_user = '';
				this.ruleForm.contactmobile = res.contactmobile;
				this.ruleForm.contactperson = res.contactperson;
				this.ruleForm.salername = res.salername;
				this.ruleForm.salermobile = res.salermobile;
				this.ruleForm.installapplydate = new Date(res.installapplydate);
				this.ruleForm.installaddress = res.installaddress;
				this.ruleForm.installaddresscode = [];
				if(res.vehicleInfo.receivingbank) {
					this.ruleForm.receivingbankid = res.vehicleInfo.receivingbank.corpname;
					this.ruleForm.receivingbankname = res.vehicleInfo.receivingbank.id;
				}
				this.ruleForm.installapplyinsu = res.installapplyinsu;
				if(res.vehicleInfo.yearsofservice) this.ruleForm.yearsofservice = res.vehicleInfo.yearsofservice;
				if(res.carstatus) {
					this.ruleForm.carstatus = res.carstatus == 0 ? 0 : 1;
				} else {
					this.ruleForm.carstatus = 1;
				}
				this.isFlag = true;
				if(res.flowData.work_result === false || res.flowData.work_receive_result === false) {
					this.isEditeBack = true;
					this.getPdInstallGroupList();
					//默认选中设备型号
					if(res.prodclass) {
						let tempProdclass = [];
						res.prodclass.forEach((item, index) => {
							tempProdclass.push({
								installModel: item.installremark,
								installremark: item.installModel,
								installtype: item.installtype
							});
						});
						this.ruleForm.prodclass = tempProdclass;
					}
					this.ruleForm.remark = res.flowData.verify_remark;
				} else {
					if(res.installapplyinsu == 1) {
						this.ruleForm.prodclass.push({
							installtype: '保险设备',
							installModel: ''
						});
					}
					if(res.prodclass) {
						res.prodclass.forEach((item, index) => {
							if(item.applynum > 0) {
								for(var i = 0, len = item.applynum; i < len; i++) {
									this.ruleForm.prodclass.push({
										installtype: item.installtype,
										installModel: ''
									});
								}
							}
						});
					}
					this.orderLoading = false;
				}
				this.refmap();
			}
		},
		created() {
			this.$emit("changeStep", 1);
			this.$emit("getFormData", this.$store.state.formObj);
			this.orderLoading = true;
		}
	}
</script>