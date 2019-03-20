<!--* 
* @description: 报单中心——  施工-完成安装 弹窗、审核-修改安装设备 弹窗
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<el-row v-loading="dialogLoading" element-loading-text="施工信息加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
		<el-collapse v-model="activeName" class="bdcoll" v-if="serviceVerifyBack.service_verify_result">
			<el-collapse-item title="退回原因" name="1" class="lefw10">
				<el-form label-position="left" inline label-width="110px" class="demo-table-expand">
					<el-form-item label="备注" style="margin-bottom:0;">
						<span style="color:red;">{{ serviceVerifyBack.service_verify_remark }}</span>
					</el-form-item>
				</el-form>
			</el-collapse-item>
		</el-collapse>
		<el-col :span="24" class="cbstyle">
			<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
				<el-collapse v-model="activeNames" class="bdcoll">
					<el-collapse-item title="车信息" name="1" class="lefw10" v-if="!isEditPro || isEditProFlag">
						<el-row :gutter="10">
							<el-col :span="12" class="mt10">
								<dl class="dllist">
									<dt>车型：</dt>
									<dd>{{ ruleFormStatic.model }}</dd>
								</dl>
							</el-col>
							<el-col :span="12" class="mt10">
								<dl class="dllist">
									<dt>颜色：</dt>
									<template v-if="ruleFormStatic.color">
										<dd v-if="ruleFormStatic.color.indexOf('#') < 0">{{ ruleFormStatic.color }}</dd>
										<dd v-else>
											<span class="color_rgba" :style="{background:ruleFormStatic.color}"></span>
										</dd>
									</template>
								</dl>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车架号" class="mt15" prop="vin">
									<el-input type="text" autosize placeholder="请输入车架号" v-model="ruleForm.vin"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车牌号" class="mt15" prop="licenseplatenum">
									<el-input type="text" autosize placeholder="请输入车牌号" v-model="ruleForm.licenseplatenum"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="24" class="mb10">
								<el-form-item label="车辆照片" class="mt10">
									<el-row :gutter="20">
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="vinHandleAvatarSuccess">
													<img v-if="ruleForm.pictures[0].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[0].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													车架号照片
												</div>
											</el-card>
										</el-col>
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="carNumHandleAvatarSuccess">
													<img v-if="ruleForm.pictures[1].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[1].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													车牌号照片
												</div>
											</el-card>
										</el-col>
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="carMpHandleAvatarSuccess">
													<img v-if="ruleForm.pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[2].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													铭牌号照片
												</div>
											</el-card>
										</el-col>

										<el-col class="photosh sgphtosh" v-for="(item,index) in ruleForm.pictures" v-if="index > 2">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" @click.native="carHandleMouseover(index)" :on-success="carHandleSuccess">
													<img v-if="ruleForm.pictures[index].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[index].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													<el-select class="fl" :style="{width:(index == ruleForm.pictures.length-1)?'100%':''}" @visible-change="changeCarPicLac" filterable v-loading="carPicLoading" v-model="ruleForm.pictures[index].picdesc" clearable placeholder="请选择车辆照片位置">
														<el-option v-for="item in carPicList" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdatavalue">
														</el-option>
													</el-select>
													<div class="bottom clearfix text_al fr" v-if="index != ruleForm.pictures.length-1">
														<i class="iconfont icon-p-delet operate operate-p-delet" @click="removeBusiPicture(index)" title="删除照片"></i>
													</div>
												</div>
											</el-card>
										</el-col>
									</el-row>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item title="" name="2" class="lefw10 devlef">
						<template slot="title">
							<div class="fl">设备安装信息</div>
							<el-select filterable v-if="!isEditPro" class="devlefSel" @click.native.stop="" v-model="curRunDevice" clearable placeholder="请选择设备型号">
								<el-option v-for="(item,index) in runDeviceList" :key="item.installremark" :label="item.installremark" @click.native="itemClick(index)" :value="item.installModel" :disabled="item.disabled">
								</el-option>
							</el-select>
						</template>

						<el-row :gutter="10">
							<template v-for="(item,index) in deviceCurData">
								<el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;">
									<el-col :span="10">
										<dl class="dllist">
											<dt>设备类型:</dt>
											<dd>{{ item.PRODSPEC }}</dd>
										</dl>
										<dl class="dllist">
											<dt>卡类型:</dt>
											<dd>{{ item.C_PRODMODEL }}</dd>
										</dl>
									</el-col>
									<el-col :span="9">
										<dl class="dllist">
											<dt>设备型号:</dt>
											<dd>{{ item.E_PRODMODEL }}</dd>
										</dl>
										<dl class="dllist">
											<dt>SIM卡号:</dt>
											<dd>{{ item.C_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="5">
										<dl class="dllist">
											<dt>设备编号:</dt>
											<dd>{{ item.E_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="10" v-if="ruleForm.installDetails.length > 0">
										<el-form-item label="安装位置(必选)" class="mt10">
											<el-select filterable :loading="codeloading" @visible-change="changeInstallDecode" v-model="ruleForm.installDetails[index].installpositioncode" placeholder="请选择安装位置">
												<el-option v-for="item in InstallPositionArray" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :span="13">
										<el-form-item class="mbs5 mt8">
											<div slot="label">
												设备是否在线
												<el-button @click="cldeviceIsOnstate(item.E_PRODUNUM,index)" :loading="realTimeRefreshLoading" size="mini"><i class="pr5 iconfont icon-shuaxin"></i>刷新</el-button>
											</div>
											<el-radio-group v-model="ruleForm.installDetails[index].onlinestatus" size="medium">
												<el-radio-button :disabled="ruleForm.installDetails[index].onlinestatus == 0" label='1'>已上线</el-radio-button>
												<el-radio-button :disabled="ruleForm.installDetails[index].onlinestatus == 1" label='0'>不在线</el-radio-button>
											</el-radio-group>
										</el-form-item>
									</el-col>

									<el-col :span="24" class="mb10">
										<el-form-item label="当前设备照片" prop="installactualdate">
											<el-row :gutter="20">
												<el-col class="photosh sgphtosh">
													<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
														<el-upload name="mediaFile" :ref="'devUploada'+index" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" @click.native="deviceHandleMouseover(0,'devUploada'+index)" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveZxHandleAvatarSuccess">
															<img v-if="ruleForm.installDetails[index].pictures[0].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[0].piclink" class="avatar">
															<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
														<div class="btsty">
															设备走线照片
														</div>
													</el-card>
												</el-col>
												<el-col class="photosh sgphtosh">
													<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
														<el-upload name="mediaFile" :ref="'devUploadb'+(index+1)" :data="{ind:index}" class="avatar-uploader" @click.native="deviceHandleMouseover(1,'devUploadb'+(index+1))" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveSbhHandleAvatarSuccess">
															<img v-if="ruleForm.installDetails[index].pictures[1].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[1].piclink" class="avatar">
															<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
														<div class="btsty">
															设备号照片
														</div>
													</el-card>
												</el-col>
												<el-col class="photosh sgphtosh">
													<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
														<el-upload name="mediaFile" :ref="'devUploadc'+(index+2)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" @click.native="deviceHandleMouseover(2,'devUploadc'+(index+2))" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveSbHandleAvatarSuccess">
															<img v-if="ruleForm.installDetails[index].pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[2].piclink" class="avatar">
															<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
														<div class="btsty">
															设备照片
														</div>
													</el-card>
												</el-col>

												<el-col class="photosh sgphtosh" v-for="(item,ind) in ruleForm.installDetails[index].pictures" v-if="ind > 2">
													<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
														<el-upload name="mediaFile" :ref="'devUploadd'+(index*6+ind+3)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" @click.native="deviceHandleMouseover(ind,'devUploadd'+(index*6+ind+3))" :on-success="deviceHandleSuccess">
															<img v-if="ruleForm.installDetails[index].pictures[ind].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[ind].piclink" class="avatar">
															<i v-else class="el-icon-plus avatar-uploader-icon"></i>
														</el-upload>
														<div class="btsty">
															<el-select class="fl" :style="{width:(ind == ruleForm.installDetails[index].pictures.length-1)?'100%':''}" @visible-change="changeCarPicLac" filterable v-loading="carPicLoading" v-model="ruleForm.installDetails[index].pictures[ind].picdesc" clearable placeholder="请选择设备照片位置">
																<el-option v-for="item in carPicList" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdatavalue">
																</el-option>
															</el-select>
															<div class="bottom clearfix text_al fr" v-if="(ind != ruleForm.installDetails[index].pictures.length-1)">
																<i class="iconfont icon-p-delet operate operate-p-delet" @click="deviceRemoveBusiPicture(index,ind,ruleForm.installDetails[index].pictures[ind].piclink)" title="删除照片"></i>
															</div>
														</div>
													</el-card>
												</el-col>
											</el-row>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item label="当前设备描述" prop="remark">
											<el-input type="textarea" autosize placeholder="请输入当前设备描述" v-model="ruleForm.installDetails[index].remark"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="24" class="mb10">
										<el-button type="danger" class="ml5 fr" icon="el-icon-delete" v-if="!isEditPro && !isEditProFlag" @click="delDevice(item,index,curYxDeviceIndex)">删除当前设备</el-button>
										<el-button type="danger" class="ml5 fr" v-if="isEditPro" @click="replaceDevice(item,index)">
											<i class='iconfont icon-tihuan'></i> 替换当前设备
										</el-button>
									</el-col>
								</el-col>
							</template>
							<el-col :span="24" class="mt10" v-if="!isEditPro">
								<el-popover ref="popover4" placement="left" width="720" v-model="visible" @show="showDeviceXz" @hide="profilters.search_key = ''" trigger="click">
									<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
										<el-form :inline="true" :model="profilters">
											<el-form-item>
												<el-input v-model="profilters.search_key" @keyup.native.enter="searchDevceinfo" placeholder="例如:设备编号,卡编号,卡号"></el-input>
											</el-form-item>
											<el-form-item>
												<el-button type="primary" @click="searchDevceinfo" icon="el-icon-search">查询</el-button>
											</el-form-item>
										</el-form>
									</el-col>
									<el-table :data="deviceData" max-height="300" :row-class-name="tableRowClassName" v-loading="listLoading" @row-dblclick="deviceClickHandle">
										<el-table-column align="center" prop="PRODSPEC" label="设备种类"></el-table-column>
										<el-table-column align="center" prop="PACKSELFID" label="自编号"></el-table-column>
										<el-table-column align="center" prop="E_PRODMODEL" label="设备类型"></el-table-column>
										<el-table-column align="center" prop="E_PRODUNUM" label="设备ID"></el-table-column>
										<el-table-column align="center" prop="E_STATUS" label="设备状态"></el-table-column>
										<el-table-column align="center" prop="C_PRODMODEL" label="卡类型"></el-table-column>
										<el-table-column align="center" prop="C_PRODUNUM" label="SIM卡号"></el-table-column>
										<el-table-column align="center" prop="E_INSURANCEFLAG" label="保险设备">
											<template scope="props">
												{{ props.row.E_INSURANCEFLAG == "Y"?"是":"否" }}
											</template>
										</el-table-column>
										<el-table-column align="center" prop="E_NORMALFLAG" label="常规设备">
											<template scope="props">
												{{ props.row.E_NORMALFLAG == "Y"?"是":"否" }}
											</template>
										</el-table-column>
									</el-table>
									<!--工具条-->
									<el-col :span="24" class="toolbar">
										<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
										</el-pagination>
									</el-col>
								</el-popover>
								<el-button icon="el-icon-plus" type="primary" v-popover:popover4>添加安装设备</el-button>
							</el-col>
						</el-row>
					</el-collapse-item>
				</el-collapse>
				<el-row style="border-top:1px solid #e8e8e8;" class="mt15">
					<el-col :span="24">
						<el-form-item label="安装备注" class="mt10" prop="remark">
							<el-input type="textarea" autosize placeholder="请输入安装备注" v-model="ruleForm.remark"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="footer_but_bd" custom-class="imgShow" :span="24">
						<el-button v-if="!isEditPro || isEditProFlag" type="primary" :disabled="noSumbit" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
						<el-button v-if="isEditPro && !isEditProFlag" type="pr上线imary" @click="editProSubmitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">确定</el-button>
						<el-button @click="closeDialog(0)" style="margin-left:5px;float:right;">取消</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-col>
	</el-row>
</template>

<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import util from '../../../common/js/util';
	import { addApprovaperWork, getPdInstallUserList, getInstallPositionCode, getMyDeviceInfo, cldeviceIsOnstate, editAzPromodify, getCarPicLocation, getDevicePicLocation, gettest,getVehList } from '../../../api/api';
	export default {
		props: ['curTaskId'],
		data() {
			//验证车架号(只能输入数字和字母)
			var checkVin = (rule, value, callback) => {
				var reg = /^[a-zA-Z0-9]{17}$/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('车架号必须为17位的数字和字母组成'));
				} else {
					callback();
				}
			};
			//验证车牌号
			var checkVehicleNumber = (rule, value, callback) => {
				var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('车牌号格式不规范'));
				} else {
					callback();
				}
			};
			//自定义验证安装地址表单
			let checkInstall = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0) {
					return callback(new Error('请选择对应设备的安装位置'));
				} else {
					callback();
				}
			};
			return {
				profilters: {
					search_key: ''
				},
				util: util,
				curRunDevice: '',
				runDeviceList: [],
				devLoading: false,
				dialogLoading: false,
				noSumbit: false,
				isEditProFlag: false,
				deviceDialogVisible: false,
				carPicList: [], //车辆照片位置
				carPicValue: '',
				curIndex: 0,
				//自己所有设备
				deviceData: [],
				//被选中设备
				deviceCurData: [],
				visible: false,
				accept: '.jpg,.png',
				carFileList: [],
				listLoading: false,
				serviceVerifyBack: {
					result: false,
					remark: ''
				},
				InstallPositionArray: [],
				codeloading: false,
				ruleForm: { //启动报单提交表单信息
					pictures: [{
							picdesc: "车架号",
							piclink: ""
						},
						{
							picdesc: "车牌号",
							piclink: ""
						},
						{
							picdesc: "铭牌号",
							piclink: ""
						},
						{
							picdesc: "其它部分照片",
							piclink: ""
						}
					],
					licenseplatenum: '',
					vin: '',
					installDetails: [],
					remark: '',
				},
				ruleFormStatic: {},
				//设备数量
				deviceNumAll: 0,
				rules: {
					vin: [{
							required: true,
							message: "请输入车架号",
							trigger: 'blur'
						},
						{
							validator: checkVin,
							trigger: 'blur'
						}
					],
					licenseplatenum: [{
						validator: checkVehicleNumber,
						trigger: 'blur'
					}]
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				carPicLoading: false,
				tmpDevice: "",
				installUserId: "",
				//是否编辑设备
				isEditPro: false,
				activeName: ['1'],
				activeNames: ['1', '2'],
				//保险产品
				installapplyinsu: 0,
				//常规产品
				installapplymorn: 0,
				//有线设备数量
				wiredEquipmentNum: 0,
				yxEqNum: 0,
				//无线设备数量
				wirelessEquipmentNum: 0,
				wxEqNum: 0,
				realTimeRefreshLoading: false,
				dcurrentPage: 0,
				dpageSize: 0,
				dtotal: 0,
				addLoading: false,
				uplodVueComponent: '',
				curYxDeviceIndex: 0,
				carCurIndex: 0 //当前车操作的照片
			};
		},
		methods: {			//安装设备选择
			itemClick(index) {
				this.curYxDeviceIndex = index;
			},
			//获取车辆上传照片位置
			changeCarPicLac(r) {
				if(!r || this.carPicList.length > 0) return;
				this.carPicLoading = true;
				let para = {
					showCount: 1000
				}
				getCarPicLocation(para).then((res) => {
					this.carPicLoading = false;
					if(res.data.result.code == 0) {
						this.carPicList = res.data.data.records;
					}
				});
			},
			//选择设备窗体
			showDeviceXz() {
				if(!this.curRunDevice && !this.isEditPro) {
					this.$message({
						showClose: true,
						message: "请先选择设备型号",
						type: 'error'
					});
					this.visible = false;
					return;
				}
				if(this.ruleForm.pictures.length == 0 && !this.isEditPro) {
					this.$message({
						showClose: true,
						message: "请先上传车辆照片",
						type: 'error'
					});
					this.visible = false;
				} else {
					this.searchDevceinfo();
				}

			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.searchDevceinfo();
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.searchDevceinfo();
			},
			//替换当前设备
			rdeviceClickHandle(row, event, column, olditem, index) {
				this.deviceCurData.splice(index, 1, row);
				this.ruleForm.installDetails.splice(index, 1, {
					installpositioncode: null,
					packid: row.ID,
					E_PRODMODEL: row.E_PRODMODEL,
					E_PRODUNUM: row.E_PRODUNUM,
					id: olditem.installid,
					pictures: [{
							picdesc: "设备走线照片",
							piclink: ""
						},
						{
							picdesc: "设备照片",
							piclink: ""
						},
						{
							picdesc: "设备号照片",
							piclink: ""
						},
						{
							picdesc: "其它部分照片",
							piclink: ""
						}
					],
					onlinestatus: 0,
					remark: null
				});
			},
			//点击设备添加设备编辑
			deviceClickHandle(row, event, column) {
				if(this.deviceCurData.length > 0) {
					let vflag = this.findElem(this.deviceCurData, "ID", row.ID);
					if(!vflag) return;
				}
				this.deviceCurData.push(row);
				//添加设备信息
				this.ruleForm.installDetails.push({
					installpositioncode: null,
					packid: row.ID,
					E_PRODMODEL: row.E_PRODMODEL,
					E_PRODUNUM: row.E_PRODUNUM,
					curYxDeviceIndex: this.curYxDeviceIndex,
					id: this.tmpDevice.installid,
					pictures: [{
							picdesc: "设备走线照片",
							piclink: ""
						},
						{
							picdesc: "设备照片",
							piclink: ""
						},
						{
							picdesc: "设备号照片",
							piclink: ""
						},
						{
							picdesc: "其它部分照片",
							piclink: ""
						}
					],
					onlinestatus: 0,
					remark: null
				});
				this.cldeviceIsOnstate(row.E_PRODUNUM, this.deviceCurData.length - 1);
				//清空选择设备型号 选择过的不能再次选择
				this.runDeviceList[this.curYxDeviceIndex].disabled = true;
				this.curRunDevice = '';
				this.visible = false;
			},
			cldeviceIsOnstate(cnum, index) {
				let para = {
					id: cnum
				};
				this.realTimeRefreshLoading = true;
				//添加设备自动识别是否在线
				cldeviceIsOnstate(para).then((res) => {
					this.realTimeRefreshLoading = false;
					if(res.data.result.code == 0){
						if(res.data.data)
						this.ruleForm.installDetails[index].onlinestatus = res.data.data.realdata.istate != 1 ? 1 : 0;
					}
				});
			},
			//判断当前数组中是否存在某个属性
			findElem(arrayToSearch, attr, val) {
				for(var i = 0; i < arrayToSearch.length; i++) {
					if(arrayToSearch[i][attr] == val) {
						return false;
					}
				}
				return true;
			},
			// 是否已经选择该设备
			tableRowClassName(row, index) {
				let vflag = this.findElem(this.deviceCurData, "ID", row.row.ID);
				if(!vflag) {
					return 'warning-row';
				}
				return '';
			},
			//查询设备信息
			searchDevceinfo() {
				if(!this.installUserId) {
					this.$message({
						showClose: true,
						message: '未找到安装人员信息！',
						type: 'error'
					});
					return;
				}
				let para = {
					userid: this.installUserId,
					E_STATUS: "在库",
					search_key: this.profilters.search_key
				};
				if(!isNaN(Number(this.curRunDevice))) {
					para.prodmodelid = this.curRunDevice;
				} else {
					if(this.curRunDevice == "保险设备") {
						para.E_INSURANCEFLAG = 'Y';
					}
				}
				this.listLoading = true;
				getMyDeviceInfo(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.deviceData = res.data.data.records;
						this.dtotal = res.data.data.totalResult;
					} else {
						this.deviceData = [];
						this.dtotal = 0;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//替换设备查询
			replaceDevceinfo() {
				if(!this.installUserId) {
					this.$message({
						showClose: true,
						message: '未找到安装人员信息！',
						type: 'error'
					});
					return;
				}
				let para = {
					userid: this.installUserId,
					showCount: this.dpageSize,
					E_STATUS: "在库",
					search_key: this.profilters.search_key,
					E_INSURANCEFLAG: this.citem.E_INSURANCEFLAG == 'N' ? '' : this.citem.E_INSURANCEFLAG,
					E_NORMALFLAG: this.citem.E_NORMALFLAG == 'N' ? '' : this.citem.E_NORMALFLAG
				};
				this.cvlistLoading = true;
				getMyDeviceInfo(para).then((res) => {
					this.cvlistLoading = false;
					if(res.data.result.code == 0) {
						this.replaceDeviceData = res.data.data.records;
						this.cdtotal = res.data.data.totalResult;
					} else {
						this.replaceDeviceData = [];
						this.cdtotal = 0;
					}
				}).catch((error) => {
					this.cvlistLoading = false;
				});
			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.replaceDevceinfo();
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.replaceDevceinfo();
			},
			//替换设备窗口打开
			replaceDevice(item, index) {
				this.$emit("showDeviceXzReplace", this.installUserId, item, index);
			},
			//设备删除
			delDevice(item, index, curYxDeviceIndex) {
				this.deviceCurData.splice(index, 1);
				this.ruleForm.installDetails.splice(index, 1);
				this.runDeviceList[curYxDeviceIndex].disabled = false;
			},
			//上传照片判断是否选择了照片位置
			carbeforeAvatarUpload(file) {
				if(this.carPicValue == '') {
					this.$message({
						showClose: true,
						message: '请选择上传车辆照片位置',
						type: 'error'
					});
					return false;
				}
			},
			//车上传照片删除
			carHandleRemove(file, fileList) {
				this.installPic(-1, file, fileList, 1);
			},
			//车上传照点击已上传的文件链接时的钩子
			carHandlePreview(file) {
				this.$emit("changeDialogImg", file);
			},
			//车上传照片成功
			carHandleSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 1);
			},
			//车架号
			vinHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 4);
			},
			//车牌号
			carNumHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 5);
			},
			//铭牌
			carMpHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 6);
			},
			//删除添加的照片
			deviceHandleRemove(file, fileList) {
				this.installPic(-1, file, fileList, 3);
			},
			deviveZxHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 7);
			},
			deviveSbhHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 8);
			},
			deviveSbHandleAvatarSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 9);
			},
			//设备点击已上传的文件链接时的钩子
			deviceHandlePreview(file) {
				this.$emit("changeDialogImg", file);
			},
			//上传成功后的设备照片
			deviceHandleSuccess(response, file, fileList) {
				this.installPic(response, file, fileList, 2);
			},
			//记录上传控件
			deviceHandleMouseover(index, uploadname) {
				this.curIndex = index;
				this.uplodVueComponent = this.$refs[uploadname][0];
			},
			closeDialog(n) {
				this.$emit("closeDialog", 2, n);
			},
			//记录车上传控件
			carHandleMouseover(index) {
				this.carCurIndex = index;
			},
			//删除订单图片
			removeBusiPicture(index) {
				this.$confirm('确认删除当前车辆照片吗?', '提示', {
					type: 'error'
				}).then(() => {
					this.ruleForm.pictures.splice(index, 1);
				});
			},
			//设备删除设备照片
			deviceRemoveBusiPicture(pind, cind, piclink) {
				this.$confirm('确认删除当前设备照片吗?', '提示', {
					type: 'error'
				}).then(() => {
					this.ruleForm.installDetails[pind].pictures.splice(cind, 1);
				});
			},
			//复制当前添加的 1车子 2设备照片 3删除对应设备照片 4车架号照片 5车牌号照片 6铭牌照片 7设备走线照片 8设备号 9设备照片
			installPic(response, file, fileList, type) {
				//安装车照片
				if(type == 1 && file.status == "success") {
					let carPictures = this.ruleForm.pictures;
					if(carPictures[this.carCurIndex].piclink == '') {
						carPictures.push({
							picdesc: "其它部分照片",
							piclink: ""
						});
					}
					carPictures.splice(this.carCurIndex, 1, {
						picdesc: carPictures[this.carCurIndex].picdesc,
						piclink: response
					});
				}
				if(type == 4 && file.status == "success") {
					this.ruleForm.pictures.splice(0, 1, {
						picdesc: "车架号",
						piclink: response
					});
				}
				if(type == 5 && file.status == "success") {
					this.ruleForm.pictures.splice(1, 1, {
						picdesc: "车牌号",
						piclink: response
					});
				}
				if(type == 6 && file.status == "success") {
					this.ruleForm.pictures.splice(2, 1, {
						picdesc: "铭牌号",
						piclink: response
					});
				}

				//设备前三张
				if(type == 7 && file.status == "success") {
					var index = this.uplodVueComponent.data.ind,
						pic;
					pic = {
						picdesc: "设备走线照片",
						piclink: response
					}
					this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
				}
				if(type == 8 && file.status == "success") {
					var index = this.uplodVueComponent.data.ind,
						pic;
					pic = {
						picdesc: "设备号照片",
						piclink: response
					}
					this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
				}
				if(type == 9 && file.status == "success") {
					var index = this.uplodVueComponent.data.ind,
						pic;
					pic = {
						picdesc: "设备照片",
						piclink: response
					}
					this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
				}
				//新增设备照片
				if(type == 2) {
					var index = this.uplodVueComponent.data.ind,
						pic;
					pic = {
						picdesc: this.ruleForm.installDetails[index].pictures[this.curIndex].picdesc,
						piclink: response
					}
					if(this.ruleForm.installDetails[index].pictures[this.curIndex].piclink == '') {
						this.ruleForm.installDetails[index].pictures.push({
							picdesc: "其它部分照片",
							piclink: ""
						});
					}
					this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
				}
			},
			//编辑设备
			editProSubmitForm(formName) {
				if(this.deviceCurData.length == 0) {
					this.$message({
						showClose: true,
						message: '没有可以编辑的设备!',
						type: 'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
								installDetails: [],
								remark: '',
							},
							flag = true;
						this.ruleForm.installDetails.forEach((res, index) => {
							if(!res.installpositioncode) {
								this.$message({
									showClose: true,
									message: '设备(' + res.E_PRODMODEL + res.E_PRODUNUM + ')没有选择安装位置',
									type: 'warning'
								});
								flag = false;
								return false;
							} else {
								let pics = res.pictures,
									tmp = [];
								addformpara.installDetails.push({
									pictures: [],
									id: '',
									onlinestatus: '',
									packid: '',
									remark: '',
									installpositioncode: ''
								});
								pics.forEach((pic, index) => {
									if(pic.piclink != '') {
										tmp.push({
											picdesc: pic.picdesc,
											piclink: pic.piclink
										});
									}
								});
								if(tmp.length < 3) {
									this.$message({
										showClose: true,
										message: '设备(' + res.E_PRODMODEL + res.E_PRODUNUM + ')的照片必须上传三张',
										duration: 5000,
										type: 'warning'
									});
									flag = false;
									return false;
								}
								addformpara.installDetails[index].pictures = tmp;
								addformpara.installDetails[index].id = res.id;
								addformpara.installDetails[index].onlinestatus = res.onlinestatus;
								addformpara.installDetails[index].packid = res.packid;
								addformpara.installDetails[index].remark = res.remark;
								if(isNaN(parseInt(res.installpositioncode, 10))) {
									addformpara.installDetails[index].installpositioncode = res.installpositionname;
								} else {
									addformpara.installDetails[index].installpositioncode = res.installpositioncode;
								}
							}
						});
						if(!flag) return;
						addformpara.remark = this.ruleForm.remark
						this.addLoading = true;
						//提交审核结果
						editAzPromodify(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									showClose: true,
									message: '安装信息修改成功！',
									type: 'success'
								});
								this.closeDialog(1);
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
			/* 提交表单数据 */
			submitForm(formName) {
				let cpics = this.ruleForm.pictures,
				ctmp = [];
				cpics.forEach((pic, index) => {
					if(pic.piclink != '') {
						ctmp.push({
							picdesc: pic.picdesc,
							piclink: pic.piclink
						});
					}
				});
				if(ctmp.length < 3) {
					this.$message({
						showClose: true,
						message: '车辆照片必须上传三张',
						type: 'warning'
					});
					return;
				}
				if(this.deviceCurData.length == 0) {
					this.$message({
						showClose: true,
						message: '安装设备不满足！',
						type: 'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
								taskId: this.curTaskId,
								properties: {}
							},
							flag = true;
						addformpara.properties = {
							pictures: [],
							carFrame: this.ruleForm.vin,
							carNumber: this.ruleForm.licenseplatenum,
							vehicleInfo: {
								licenseplatenum: this.ruleForm.licenseplatenum,
								vin: this.ruleForm.vin,
							},
							installDetails: [],
							result: true,
							remark: this.ruleForm.remark
						}
						this.ruleForm.pictures.forEach((item, index) => {
							if(item.piclink != '') {
								addformpara.properties.pictures.push({
									picdesc: item.picdesc,
									piclink: item.piclink
								});
							}
						});
						this.ruleForm.installDetails.forEach((res, index) => {
							if(!res.installpositioncode) {
								this.$message({
									showClose: true,
									message: '设备(' + res.E_PRODMODEL + res.E_PRODUNUM + ')没有选择安装位置',
									duration: 5000,
									type: 'warning'
								});
								flag = false;
								return false;
							} else {
								let pics = res.pictures,
									tmp = [];
								addformpara.properties.installDetails.push({
									pictures: [],
									id: '',
									onlinestatus: '',
									packid: '',
									remark: '',
									installpositioncode: ''
								});
								pics.forEach((pic, index) => {
									if(pic.piclink != '') {
										tmp.push({
											picdesc: pic.picdesc,
											piclink: pic.piclink
										});
									}
								});
								if(tmp.length < 3) {
									this.$message({
										showClose: true,
										message: '设备(' + res.E_PRODMODEL + res.E_PRODUNUM + ')的照片必须上传三张',
										duration: 5000,
										type: 'warning'
									});
									flag = false;
									return false;
								}
								addformpara.properties.installDetails[index].pictures = tmp;
								addformpara.properties.installDetails[index].id = res.id;
								addformpara.properties.installDetails[index].onlinestatus = res.onlinestatus;
								addformpara.properties.installDetails[index].packid = res.packid;
								addformpara.properties.installDetails[index].remark = res.remark;
								if(isNaN(parseInt(res.installpositioncode, 10))) {
									addformpara.properties.installDetails[index].installpositioncode = res.installpositionname;
								} else {
									addformpara.properties.installDetails[index].installpositioncode = res.installpositioncode;
								}
							}
						});
						if(!flag) return;
						this.addLoading = true;
						//提交审核结果
						addApprovaperWork(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									showClose: true,
									message: '设备安装提交成功！',
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
								this.closeDialog(1);
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
			//安装位置初始化
			changeInstallDecode(r) {
				if(!r || this.InstallPositionArray.length > 0) return;
				this.codeloading = true;
				getInstallPositionCode().then((res) => {
					this.InstallPositionArray = res.data.data.records;
					this.codeloading = false;
				});
			},
			//获取当前状态节点所有信息
			getCustoHistoryInfo(res, row) {
				if(res.prodclass) {
					this.runDeviceList = res.prodclass;
				}
				this.dialogLoading = false;
				//记录当前安装人员的id   便于后面查询安装人员库房设备用到
				this.installUserId = res.installEmployee.userid;
				//是否是退回的施工单子
				if((row.taskDefinitionKey == 'proc_new_build_node_work' || row.taskDefinitionKey == 'node_work')) {
					this.serviceVerifyBack = {
						result: row.flowData.service_verify_result == 'false' ? true : false,
						remark: row.flowData.service_verify_remark
					}
				}
				//如果在审核阶段用户安装设备为0  说明单子出现安装异常
				if((row.taskDefinitionKey == 'proc_new_build_node_service_verify' || row.taskDefinitionKey == 'node_service_verify') && res.installDetails.length == 0) {
					this.noSumbit = true;
					this.$message({
						showClose: true,
						message: '施工异常单子，请退回施工重新安装！',
						duration: "8000",
						type: 'error'
					});
					return;
				}
				//默认安装设备
				if(row.flowData.service_verify_result == undefined && res.installDetails.length == 0) {
					this.installapplyinsu = res.installapplyinsu;
					this.installapplymorn = res.installapplymorn;
					this.ruleFormStatic = res.vehicleInfo;
					this.ruleForm.licenseplatenum = res.vehicleInfo.licenseplatenum;
					this.ruleForm.vin = res.vehicleInfo.vin;

				}
				//退回没有 安装设备单子
				if((row.taskDefinitionKey == 'proc_new_build_node_work' || row.taskDefinitionKey == 'node_work') && res.installDetails.length == 0) {
					this.installapplyinsu = res.installapplyinsu;
					this.installapplymorn = res.installapplymorn;
					this.ruleFormStatic = res.vehicleInfo;
					this.ruleForm.licenseplatenum = res.vehicleInfo.licenseplatenum;
					this.ruleForm.vin = res.vehicleInfo.vin;
					if(res.pictures.length == 0) {
						res.pictures = [{
								picdesc: "车架号",
								piclink: ""
							},
							{
								picdesc: "车牌号",
								piclink: ""
							},
							{
								picdesc: "铭牌号",
								piclink: ""
							},
							{
								picdesc: "其它部分照片",
								piclink: ""
							}
						];
					} else {
						res.pictures.push({
							picdesc: "其它部分照片",
							piclink: ""
						});
					}
					this.ruleForm.pictures = res.pictures;
					this.ruleForm.remark = res.remark;
				}

				//审核退回修改设备 车信息
				if((row.taskDefinitionKey == 'proc_new_build_node_work' || row.taskDefinitionKey == 'node_work') && res.installDetails.length > 0) {
					this.isEditPro = true;
					this.isEditProFlag = true;
					this.installapplyinsu = 0;
					this.installapplymorn = 0;
					this.ruleFormStatic = res.vehicleInfo;
					this.ruleForm.licenseplatenum = res.vehicleInfo.licenseplatenum;
					this.ruleForm.vin = res.vehicleInfo.vin;
					if(res.pictures.length == 0) {
						res.pictures = [{
								picdesc: "车架号",
								piclink: ""
							},
							{
								picdesc: "车牌号",
								piclink: ""
							},
							{
								picdesc: "铭牌号",
								piclink: ""
							},
							{
								picdesc: "其它部分照片",
								piclink: ""
							}
						];
					} else {
						res.pictures.push({
							picdesc: "其它部分照片",
							piclink: ""
						});
					}
					this.ruleForm.pictures = res.pictures;
					this.ruleForm.remark = res.remark;

					res.installDetails.forEach((res, index) => {
						let pictures = res.pictures;
						res.packInfo.installid = res.id;
						this.deviceCurData.push(res.packInfo);
						if(pictures.length == 0) {
							pictures = [{
									picdesc: "设备走线照片",
									piclink: ""
								},
								{
									picdesc: "设备照片",
									piclink: ""
								},
								{
									picdesc: "设备号照片",
									piclink: ""
								},
								{
									picdesc: "其它部分照片",
									piclink: ""
								}
							];
						} else {
							pictures.push({
								picdesc: "其它部分照片",
								piclink: ""
							});
						}
						//添加设备信息
						this.ruleForm.installDetails.push({
							installpositioncode: res.installpositionname,
							installpositionname: res.installpositioncode,
							packid: res.packid,
							E_PRODMODEL: res.packInfo.E_PRODMODEL,
							E_PRODUNUM: res.packInfo.E_PRODUNUM,
							id: res.id,
							pictures: pictures,
							onlinestatus: res.onlinestatus ? 1 : 0,
							proPictype: '',
							remark: res.remark
						});

					});
				}
				//审核修改设备
				if((row.taskDefinitionKey == 'proc_new_build_node_service_verify' || row.taskDefinitionKey == 'node_service_verify') && res.installDetails.length > 0) {
					this.isEditPro = true;
					this.ruleForm.remark = res.remark;
					this.ruleFormStatic = res.vehicleInfo;
					res.installDetails.forEach((res, index) => {
						let pictures = res.pictures;
						res.packInfo.installid = res.id;
						this.deviceCurData.push(res.packInfo);
						if(pictures.length == 0) {
							pictures = [{
									picdesc: "设备走线照片",
									piclink: ""
								},
								{
									picdesc: "设备照片",
									piclink: ""
								},
								{
									picdesc: "设备号照片",
									piclink: ""
								},
								{
									picdesc: "其它部分照片",
									piclink: ""
								}
							];
						} else {
							pictures.push({
								picdesc: "其它部分照片",
								piclink: ""
							});
						}
						//添加设备信息
						this.ruleForm.installDetails.push({
							installpositioncode: res.installpositionname,
							installpositionname: res.installpositioncode,
							packid: res.packid,
							E_PRODMODEL: res.packInfo.E_PRODMODEL,
							E_PRODUNUM: res.packInfo.E_PRODUNUM,
							id: res.id,
							pictures: pictures,
							onlinestatus: res.onlinestatus ? 1 : 0,
							proPictype: '',
							remark: res.remark
						});
					});
				}

			},
			//施工信息清空
			resetForm() {
				this.isEditPro = false;
				this.isEditProFlag = false;
				this.noSumbit = false;
				this.yxEqNum = 0;
				this.wxEqNum = 0;
				this.deviceNumAll = 0;
				this.wiredEquipmentNum = 0;
				this.ruleFormStatic = {};
				this.deviceCurData = [];
				this.carPictypeStep = 0;
				this.carPicValue = '';
				this.ruleForm = {
					pictures: [{
							picdesc: "车架号",
							piclink: ""
						},
						{
							picdesc: "车牌号",
							piclink: ""
						},
						{
							picdesc: "铭牌号",
							piclink: ""
						},
						{
							picdesc: "其它部分照片",
							piclink: ""
						}
					],
					licenseplatenum: '',
					vin: '',
					installDetails: [],
					remark: ''
				};
			}
		},
		activated() {
			this.dialogLoading = true;

		}
	}
</script>