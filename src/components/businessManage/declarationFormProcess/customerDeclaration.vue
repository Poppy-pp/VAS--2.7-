<!--* 
* @description: 报单中心（报单） 新建安装单
* @author: 王鹏 corpid :wxb51aaeb1e86d07df
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section class="newForm_i">
		<el-row>
			<el-collapse v-model="activeName" class="bdcoll" v-if="ruleFormStatic.flowData.verify_result === false">
				<el-collapse-item title="退回原因" name="1">
					<el-form label-position="left" inline label-width="110px" class="demo-table-expand">
						<el-form-item label="描述">
							<span style="color:red;">{{ ruleFormStatic.flowData.verify_remark }}</span>
						</el-form-item>
					</el-form>
				</el-collapse-item>
			</el-collapse>
			<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline style="width:100%;font-size: 0;">
				<el-col :span="24" class="cbstyle">
					<el-collapse v-model="activeNames" class="bdcoll">
						<el-collapse-item title="车主信息" name="3" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="车主姓名" prop="name">
										<el-input type="text" placeholder="请输入车主姓名" v-model="ruleForm.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="车主电话" prop="mobile">
										<el-input type="text" placeholder="请输入车主电话" v-model="ruleForm.mobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="车主身份证号码" prop="idcard">
										<el-input type="text" placeholder="请输入车主身份证号码" v-model="ruleForm.idcard"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="车信息" name="2" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="7">
									<el-form-item label="车架号" prop="vin">
										<el-input type="text" :readonly="isVinFlag" placeholder="请输入车架号" @blur="querySearchVin" @keyup.native="vinCheckJ" v-model="ruleForm.vin"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="车型信息" prop="model">
										<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="ruleForm.model" :fetch-suggestions="handleItemChange" custom-item="my-item-zh-model" placeholder="请选择车型信息" @select="handleSelectModel"></el-autocomplete>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="车辆颜色" prop="color">
										<div style="display:flex;">
											<el-select v-model="ruleForm.color" clearable style="flex:1;" placeholder="请选择车辆颜色">
												<el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item.color_rgb">
													<p>
														<div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',marginTop:'7px'}"></div>&nbsp;{{ item.color }}</p>
												</el-option>
											</el-select>
											<el-color-picker style="width:36px;flex:0 0 36px;" v-model="ruleForm.color"></el-color-picker>
										</div>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="车辆分类" prop="vehiclecategory">
										<el-select v-model="ruleForm.vehiclecategory" @visible-change="vehCatChange" :loading="vehCatLoading" filterable placeholder="请选择车辆分类" clearable value-key="dictdatavalue">
											<el-option v-for="item in vehCatlist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item label="车辆类型" class="mt18" prop="vehicletype">
										<el-select v-model="ruleForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" filterable placeholder="请选择车类型" clearable value-key="typedesc">
											<el-option v-for="item in vehlist" :key="item.typedesc" :label="item.typedesc" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="车牌号" class="mt18" prop="licenseplatenum">
										<el-input type="text" placeholder="请输入车牌号" v-model="ruleForm.licenseplatenum"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="车辆购置价" class="mt18" prop="price">
										<el-input type="text" placeholder="请输入车价" v-model="ruleForm.price">
											<template slot="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="受理银行" class="mt18" prop="receivingbankid">
										<el-select v-model="ruleForm.receivingbankid" @visible-change="receivinList"  clearable :loading="receLoading" filterable placeholder="请选择">
											<el-option v-for="item in salerData" :label="item.corpname" :key="item.corpname" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-collapse-item>

						<el-collapse-item title="申请安装信息" name="4" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="是否有盗抢险" prop="installapplyinsu" class="wiredNum mt10">
										<el-radio-group v-model="ruleForm.hastheftinsurance" @change="radioChange">
											<el-radio-button label="1">有</el-radio-button>
											<el-radio-button label="0">没有</el-radio-button>
										</el-radio-group>
									</el-form-item>
								</el-col>

								<el-col :span="10">
									<el-form-item label="预约安装日期" class="mt10" prop="installapplydate">
										<el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择日期" v-model="ruleForm.installapplydate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>

								<div class="CuseInstallDevice" v-for="(item,index) in ruleForm.prodclass">
									<el-col :span="8">
										<el-form-item label="安装设备类别" prop="installtype" class="wiredNum mt10">
											<el-select v-model="ruleForm.prodclass[index].installtype" :loading="modelClassLoading" filterable @visible-change="changeDeviceList" :disabled="(index == 0 && ruleForm.hastheftinsurance == 1)" placeholder="请选择设备类别">
												<el-option v-for="item in deviceTypeList" :key="item" :label="item" :value="item">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :span="10" class="flexButtonZh">
										<el-form-item :label="(index == 0 && ruleForm.hastheftinsurance == 1)?'安装保险设备数量':'安装常规设备数量'" prop="applynum" class="wiredNum mt10">
											<el-input-number style="height:36px;" :disabled="(index == 0 && ruleForm.hastheftinsurance == 1)" v-model="ruleForm.prodclass[index].applynum" :min="1" :max="10">
											</el-input-number>
										</el-form-item>
										<el-button-group class="mb4">
											<template v-if="index == 0 && ruleForm.hastheftinsurance == 1">
												<el-button type="danger" @click="deleteRow(index)" disabled icon="el-icon-delete"></el-button>
											</template>
											<template v-else>
												<el-button type="danger" @click="deleteRow(index)" :disabled="ruleForm.prodclass.length==1" icon="el-icon-delete"></el-button>
											</template>
											<el-button type="primary" v-if="index == 0" @click="addRow" icon="el-icon-plus"></el-button>
										</el-button-group>
									</el-col>
								</div>

								<el-col :span="24">
									<el-form-item label="安装地址" class="mt10 installaddressStyle" prop="installaddresscode">
										<el-input placeholder="请输入详细地址" v-model="ruleForm.installaddress" @change="refmap">
											<el-cascader placeholder="请选择省/市/区" clearable slot="prepend" class="cascLable" v-model="ruleForm.installaddresscode" :options="prOptions" @change="addressChanges" filterable change-on-select></el-cascader>
										</el-input>
									</el-form-item>
									<gdmap @draggerMapMarker="draggerMapMarker" :address="ruleForm.installaddress" ref="vueAmap"></gdmap>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="报单方信息" name="5" class="lefw10">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="安装联系人" prop="contactperson">
										<el-input type="text" placeholder="请输入安装联系人姓名" v-model="ruleForm.contactperson"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="安装联系方式" prop="contactmobile">
										<el-input type="text" placeholder="请输入安装联系方式" v-model="ruleForm.contactmobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="业务员" prop="salername">
										<el-input type="text" placeholder="请输入业务员姓名" v-model="ruleForm.salername"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="业务员联系方式" prop="salermobile">
										<el-input type="text" placeholder="请输入业务员联系方式" v-model="ruleForm.salermobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="备注" prop="remark">
										<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-collapse-item>
					</el-collapse>
					<el-col class="footer_but_bd" :span="24">
						<template v-if="$store.state.formObj">
							<el-button @click="newForm" style="margin-left:5px;float:right;">重新报单</el-button>
						</template>
						<template v-else-if="isDraft">
							<el-button @click="newForm" style="margin-left:5px;float:right;">清空</el-button>
						</template>
						<template v-else>
							<el-button @click="saveFormInfo('ruleForm')" style="margin-left:5px;float:right;">保存草稿</el-button>
						</template>
						<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
					</el-col>
				</el-col>
			</el-form>
		</el-row>
	</section>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>
<script>
	import Vue from 'vue';
	import util from '../../../common/js/util';
	import gdmap from 'components/map/gdmap';
	import { runProc, getAssignmentId, complete, getBusinessKey, getCustoHistoryInfo, addApprovaperApply, getVehicleSearchInfoList, getEmployeeSearchInfoList, searchCorpNameList, getModelListInfo1, getModelListInfo, getProductModelClass,getVehList,getVehCatInfo } from '../../../api/api';
	//自定义搜索组件模板样式
	Vue.component('my-item-zh-model', {
		functional: true,
		render(h, ctx) {
			var item = ctx.props.item;
			return h('li', ctx.data, [
				h('div', {
					attrs: {
						class: 'model'
					}
				}, [item.value]),
				h('span', {
					attrs: {
						class: 'vin'
					}
				}, ["车品牌:", item.brand]),
				h('span', {
					attrs: {
						class: 'vin'
					}
				}, ["车系:", item.serious]),
			]);
		},
		props: {
			item: {
				type: Object,
				required: true
			}
		}
	});
	export default {
		props: ['startForm', 'ruleFormStatic', 'curTaskId'],
		components: {
			gdmap
		},
		data() {
			//自定义选择受理银行是否选择
			var checkAddress = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0) {
					return callback(new Error('请选择安装地址'));
				} else {
					callback();
				}
			};
			//验证车架号(只能输入数字和字母)
			var checkVin = (rule, value, callback) => {
				var reg = /^[a-zA-Z0-9]{6}$/g,
					reg1 = /^[a-zA-Z0-9]{8}$/g,
					reg2 = /^[a-zA-Z0-9]{17}$/g,
					flag = reg.test(value),
					flag1 = reg1.test(value),
					flag2 = reg2.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag && !flag1 && !flag2) {
					return callback(new Error('车架号必须为6,8,17位的数字和字母组成'));
				} else {
					callback();
				}
			};
			//验证车牌号
			var checkVehicleNumber = (rule, value, callback) => {
				if ($.trim(value).length == 8){//新能源汽车
					// var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
					var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{6}$/;
				}else{//普通汽车
					var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
				}

				var flag = reg.test(value);
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
			//验证车价(只能输入数字)
			var checkPrice = (rule, value, callback) => {
				var reg = /^\+?[1-9][0-9]*$/,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('车价必须为整数'));
				} else {
					callback();
				}
			};
			//验证车主手机电话(只能输入11位数字，以1开头)
			var checkMobile = (rule, value, callback) => {
				var reg = /^[0-9]*$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入数字'));
				} else {
					callback();
				}
			};
			//验证车主手机电话(只能输入11位数字，以1开头)
			var checkSlarMobile = (rule, value, callback) => {
				var reg = /^[0-9]*$/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('只能输入数字'));
				} else {
					callback();
				}
			};
			//验证车主身份整号(只能输入11位数字，以1开头)
			var checkIdcard = (rule, value, callback) => {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('身份证格式不合法'));
				} else {
					callback();
				}
			};
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
					regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				this.ruleForm.name = value.trim();//去掉首尾空格字符
				if(regEn.test(value.trim()) || regCn.test(value.trim())) {
				    return callback(new Error('车主姓名不能包含特殊字符'));
				} else {
					callback();
				}
			};
			//验证中文名字(只能输入中文不能大于四个子)
			var checkywyName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('只能输入中文或英文'));
				} else {
					callback();
				}
			};
			return {
				prOptions: util.initProvince(),
				salerData: [],
				isStealRescue: [{
					id: true,
					name: "有"
				}, {
					id: false,
					name: "无"
				}],
				radio: '1',
				isDraft: false,
				ruleForm: { //启动报单提交表单信息
					vehicletype: '小型汽车、轻便摩托车（蓝色）',
					defaultcode:3,
					licenseplatecolor:'蓝色',
					vehiclecategory:'',
					model: '',
					color: '',
					vin: '',
					licenseplatenum: '',
					name: '',
					mobile: '',
					idcard: '',
					price: '',
					lng: 0,
					lat: 0,
					receivingbankid: '',
					receivingbankname: '',
					salername: '',
					salermobile: '',
					contactmobile: '',
					contactperson: '',
					hastheftinsurance: 0,
					installapplydate: '',
					installaddresscode: [],
					installaddress: '',
					installapplyinsu: 0,
					remark: '',
					prodclass: [{
						installtype: '无线',
						applynum: 1
					}]
				},
				isVinFlag: false,
				tempModel: '',
				vehlist: [], //车辆类型列表
				vehLoading: false, //车辆类型
				vehCatlist: [], //车辆分类列表
				vehCatLoading:false,//车辆分类
				rules: { //启动报单表单验证信息
					name: [{
							required: true,
							message: "请输入车主姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
					vin: [{
							required: false,
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
					}],
					model: [{
						required: true,
						message: "请选择车辆型号",
						trigger: 'change'
					}],
					price: [{
						validator: checkPrice,
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: "请输入车主联系方式",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					installapplydate: [{
						type: 'date',
						required: true,
						message: " ",
						trigger: 'blur'
					}],
					idcard: [{
						validator: checkIdcard,
						trigger: 'blur'
					}],
					salername: [{
						validator: checkywyName,
						trigger: 'blur'
					}],
					salermobile: [{
						validator: checkSlarMobile,
						trigger: 'blur'
					}],
					contactperson: [{
						validator: checkywyName,
						trigger: 'blur'
					}],
					contactmobile: [{
						validator: checkSlarMobile,
						trigger: 'blur'
					}],
					installaddresscode: [{
						required: true,
						validator: checkAddress,
						trigger: 'blur'
					}], //安装地址验证
					vehicletype: [{required: true,message: "请选择车辆类型",trigger: 'blur'}],
					vehiclecategory: [{required: true,message: "请选择车辆分类",trigger: 'blur'}],
				},
				deviceVersionData: [],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				activeNames: ['2', '3', '4', '5'],
				activeName: ['1'],
				addLoading: false,
				receLoading: false,
				carModelList: [],
				modelListData: [],
				modelLoading: false,
				carColor: [],
				tempvin: '',
				modelClassLoading: false,
				props: {
					value: 'value',
					label: 'label',
					children: 'children'
				},
				deviceTypeList: []
			};
		},
		methods: {
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
			//删除一行设备类型数量 选择
			deleteRow(index) {
				this.ruleForm.prodclass.splice(index, 1);
			},
			//添加一行设备类型数量 选择
			addRow() {
				this.ruleForm.prodclass.push({
					installtype: '无线',
					applynum: 1
				});
			},
			//判断车架号是否已经输入17位 如果大于17位就默认不能输入了
			vinCheckJ() {
				if(this.ruleForm.vin.length > 17) {
					this.ruleForm.vin = this.tempvin;
					return;
				}
				this.tempvin = this.ruleForm.vin
			},
			//选择车型查询颜色
			handleSelectModel(v) {
				this.tempModel = v.value;
				this.ruleForm.model = v.value;
				this.ruleForm.color = '';
				let para = {
					_viewName: "VW_VAS_WEB_VAS_VEHICLE_COLOR",
					showCount: 100,
					brand: v.brand,
					serious: v.serious,
					model: v.value
				};
				getModelListInfo(para).then((res) => {
					let carModelList = [];
					res.data.data.records.forEach((res, index) => {
						if(res.color) {
							res.color.split(";").forEach((color, index) => {
								carModelList.push({
									color: color,
									color_rgb: res.color_rgb.split(";")[index]
								});
							});
						}
					});
					this.carColor = carModelList;
				});
			},
			//初始化车品牌
			initModelBrand() {
				let para = {
					_viewName: "VW_VAS_WEB_VAS_VEHICLE_BRAND",
					showCount: 1000
				};
				getModelListInfo(para).then((res) => {
					res.data.data.records.forEach((res, index) => {
						this.carModelList.push({
							label: res.brand,
							value: {
								type: 'brand',
								value: res.brand,
								paraentIndex: 0,
								index: index
							},
							children: []
						});
					});
				});
			},
			//车型选择
			handleItemChange(queryString, cb) {
				let para = {
						_viewName: "VW_VAS_WEB_VAS_VEHICLE_MODEL",
						showCount: 10000,
						model: queryString
					},
					ownerArray = [];
				getModelListInfo1(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						ownerArray.push({
							value: item.model,
							brand: item.brand,
							serious: item.serious
						});
					});
					cb(ownerArray);
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
			/*车辆分类——下拉*/
			vehCatChange(r) {
				if(!r || this.vehCatlist.length > 0) return;
				this.vehCatLoading = true;
				getVehCatInfo().then((res) => {
					this.vehCatlist = res.data.data.records;
					this.vehCatLoading = false;
				});
			},
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
			// 是否有盗抢险
			radioChange(res) {
				this.ruleForm.installapplyinsu = res;
				if(res == 1) {
					this.ruleForm.prodclass.splice(0, 0, {
						installtype: '保险设备',
						applynum: 1
					});
					this.rules.price.splice(0, 0, {
						required: true,
						message: "请输入车价",
						trigger: 'blur'
					});
				} else {
					this.rules.price.splice(0, 1);
					this.ruleForm.prodclass.splice(0, 1);
					if(this.ruleForm.prodclass.length == 0) {
						this.ruleForm.prodclass.push({
							installtype: '无线',
							applynum: 1
						});
					}
				}
			},
			//查询车架号 是否存在
			querySearchVin() {
				let para = {
					vin: $.trim(this.ruleForm.vin.toUpperCase())
				};
				if($.trim(this.ruleForm.vin) == '') return;
				getVehicleSearchInfoList(para).then((res) => {
					let car = res.data.data.records;
					if(car.length > 0) {
						this.$confirm('此车架号已存在, 是否为该车添加新设备?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							closeOnClickModal: false,
							type: 'warning'
						}).then(() => {
							this.ruleForm.vin = car[0].vin;
							this.ruleForm.model = car[0].model;
							this.ruleForm.price = car[0].price + '';
							this.ruleForm.color = car[0].color;
							this.ruleForm.name = car[0].ownerInfo.name;
							this.ruleForm.mobile = car[0].ownerInfo.mobile;
							this.ruleForm.idcard = car[0].ownerInfo.idcard;
							this.ruleForm.licenseplatenum = car[0].licenseplatenum;
							this.isVinFlag = true;
						}).catch(() => {
							this.ruleForm.vin = '';
							this.ruleForm.model = '';
							this.ruleForm.price = '';
							this.ruleForm.color = '';
							this.ruleForm.name = '';
							this.ruleForm.mobile = '';
							this.ruleForm.idcard = '';
							this.ruleForm.licenseplatenum = '';
							this.isVinFlag = false;
						});
					} else {
						this.isVinFlag = false;
					}
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
			/* 提交表单数据 */
			submitForm(formName) {
				if(!this.startForm.corpid) {
					this.$message({
						message: "请选择客户名称",
						type: 'warning'
					});
					return;
				}
				// if(this.tempModel != this.ruleForm.model) {
				// 	this.$message({
				// 		message: '车型名称必须选择',
				// 		type: 'error'
				// 	});
				// 	return;
				// }
				if(this.ruleForm.hastheftinsurance == 1 && !this.ruleForm.receivingbankid) {
					this.$message({
						message: "有盗抢险必须选择受理银行",
						type: 'warning'
					});
					return;
				}
				if(this.ruleForm.installapplyinsu == 0 && this.ruleForm.prodclass.length == 0) {
					this.$message({
						message: "请选择安装设备",
						type: 'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let _this = this,
							para,
							prodclass = [];
						if(_this.ruleForm.installapplyinsu == 1) {
							_this.ruleForm.prodclass.forEach((item, index) => {
								if(index != 0) prodclass.push(item);
							});
						} else {
							prodclass = _this.ruleForm.prodclass;
						}
						para = { //拼接启动流程所需数据
							ownerInfo: {
								idcard: _this.ruleForm.idcard,
								name: _this.ruleForm.name,
								mobile: _this.ruleForm.mobile,
							},
							vehicleInfo: {
								platecolorid:_this.ruleForm.vehicletype.id,
								licenseplatecolor: _this.ruleForm.vehicletype.platecolordesc,
								vehiclecategory:_this.ruleForm.vehiclecategory.dictdataname,
								vehiclecategoryname:_this.ruleForm.vehiclecategory.dictdatavalue,
								model: _this.ruleForm.model,
								licenseplatenum: _this.ruleForm.licenseplatenum,
								color: _this.ruleForm.color,
								receivingbankid: !isNaN(Number(_this.ruleForm.receivingbankid)) ? _this.ruleForm.receivingbankid : _this.ruleForm.receivingbankname,
								vin: _this.ruleForm.vin ? _this.ruleForm.vin.toUpperCase() : _this.ruleForm.vin,
								price: _this.ruleForm.price,
								hastheftinsurance: _this.ruleForm.hastheftinsurance
							},
							installaddresslng: _this.ruleForm.lng,
							installaddresslat:  _this.ruleForm.lat,
							declaretype: _this.startForm.declaretype,
							declareby: _this.startForm.declareby,
							corpid: _this.startForm.corpid,
							salername: _this.ruleForm.salername,
							salermobile: _this.ruleForm.salermobile,
							contactmobile: _this.ruleForm.contactmobile,
							contactperson: _this.ruleForm.contactperson,
							installapplydate: util.formatDate.format(new Date(_this.ruleForm.installapplydate), 'yyyy-MM-dd hh:mm:ss'),
							installapplyinsu: _this.ruleForm.installapplyinsu,
							installaddresscode: _this.ruleForm.installaddresscode.join(",").replace(/,/g, ' '),
							installaddress: _this.ruleForm.installaddress,
							remark: _this.ruleForm.remark,
							prodclass: prodclass
						};
						if (_this.ruleForm.vehicletype.id == undefined) {
							para.vehicleInfo.platecolorid = _this.ruleForm.defaultcode;
							para.vehicleInfo.licenseplatecolor = _this.ruleForm.licenseplatecolor;
						}
						this.addLoading = true;
						if(!this.$store.state.formObj) {
							runProc(para).then((res) => {
								this.addLoading = false;
								if(res.data.result.code == 0) {
									this.$message({
										message: "新装报单提交成功！",
										type: 'success'
									});
									this.userFormHandle();
									this.resetForm();
								}
							});
							return;
						} else {
							let addformpara = {
								taskId: this.curTaskId,
								properties: para
							};
							this.addLoading = true;
							//提交报单结果
							addApprovaperApply(addformpara).then((res) => {
								this.addLoading = false;
								if(res.data.result.code == 0) {
									this.$message({
										message: '修改报单提交成功！',
										type: 'success'
									});
									//初始化待办数量
									this.$store.dispatch('initFormNum');
									this.$router.back(-1);
								}
							});
						}
					} else {
						this.activeNames = ['2', '3', '4', '5'];
						return false;
					}
				});
			},
			//保存草稿
			saveFormInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let user = this.$store.getters.userInfo,
							firstFormInfo = {
								uid: user.id,
								data: this.ruleForm
							};
						this.$emit('saveCorpInfo',firstFormInfo);
						this.$message({
							message: "数据成功保存为草稿！",
							type: 'success'
						});
					}
				});
			},
			//重新报单
			newForm() {
				this.resetForm();
				this.$store.state.formObj = "";
				localStorage.removeItem('firstFormInfo');
				this.isDraft = false;
			},
			/* 重置表单数据 */
			resetForm() {
				this.ruleForm = { //启动报单提交表单信息
					model: '',
					color: '',
					vin: '',
					licenseplatenum: '',
					name: '',
					mobile: '',
					idcard: '',
					price: '',
					lng: 0,
					lat: 0,
					receivingbankid: '',
					receivingbankname: '',
					salername: '',
					salermobile: '',
					contactmobile: '',
					contactperson: '',
					hastheftinsurance: 0,
					installapplydate: '',
					installaddresscode: [],
					installaddress: '',
					installapplyinsu: 0,
					remark: '',
					prodclass: [{
						installtype: '无线',
						applynum: 1
					}]
				};
			},
			getCustoHistoryInfo(res) {
				//启动报单提交表单信息
				this.ruleForm = {
					model: res.vehicleInfo.model,
					color: res.vehicleInfo.color,
					vin: res.vehicleInfo.vin,
					licenseplatenum: res.vehicleInfo.licenseplatenum,
					name: res.ownerInfo.name,
					mobile: res.ownerInfo.mobile,
					idcard: res.ownerInfo.idcard,
					price: res.vehicleInfo.price + '',
					salername: res.salername,
					receivingbankid: res.vehicleInfo.receivingbank.corpname,
					receivingbankname: res.vehicleInfo.receivingbankid,
					salermobile: res.salermobile,
					contactmobile: res.contactmobile,
					contactperson: res.contactperson,
					hastheftinsurance: parseInt(res.vehicleInfo.hastheftinsurance),
					installapplydate: new Date(res.installapplydate),
					// installaddresscode: res.installaddresscode.split(" "),
					installaddresscode: [],
					installaddress: res.installaddress,
					installapplyinsu: res.installapplyinsu,
					remark: res.flowData.apply_remark,
					prodclass: []
				};
				this.tempModel = res.vehicleInfo.model;
				if(res.prodclass.length > 0){
					res.prodclass.forEach((item,index)=>{
						if(!item.applynum) res.prodclass[index].applynum = 1;
					});
				}
				//如果不是派单过后的单子退回
				if(res.installapplyinsu == 1 && !res.installby) {
					res.prodclass.splice(0, 0, {
						installtype: '保险设备',
						applynum: 1
					});
				}
				this.ruleForm.prodclass = res.prodclass;
				//初始化报单人
				this.$emit("defaultChangeCumType", res);
			},
			//判断当前用户是否处理了草稿，处理了清除记录
			userFormHandle() {
				let curFormUser = JSON.parse(localStorage.getItem('firstFormInfo')),
					user = this.$store.getters.userInfo;
				if(!curFormUser) return;
				if(curFormUser.uid == user.id) {
					localStorage.removeItem('firstFormInfo');
				}
			}
		},
		//初始化数据钩子
		created() {
			if(this.ruleForm.installaddresscode.length > 0) {
				this.$nextTick(function(){
					this.$refs.vueAmap.geocoder(this.ruleForm.installaddresscode.join("") + this.ruleForm.installaddress, (res) => {
						this.ruleForm.lng = res.location.lng;
						this.ruleForm.lat = res.location.lat;
					});
				});
			}

			/*获取当前用户信息*/
			let user = this.$store.getters.userInfo,
				draft = JSON.parse(localStorage.getItem('firstFormInfo'));
			/*初始化 当前步骤进度*/
			this.$emit("changeStep", 0);
			if(!this.$store.state.isApply) {
				this.$store.state.formObj = "";
			}
			//判断是否单条处理
			if(this.$store.state.formObj && this.$store.state.isApply) {
				this.$emit("getFormData", this.$store.state.formObj);
			} else {
				/*判断vuex是否存在当前报单保存记录*/
				if(draft) {
					if(draft.uid == user.id) {
						this.ruleForm = draft.data;
						this.ruleForm.vehicletype = draft.data.vehicletype.cartype;
						this.tempModel = draft.data.model;
						this.ruleForm.installapplydate = new Date(draft.data.installapplydate);
						this.isDraft = true;
						this.refmap();
					}
				}
			}
		}
	}
</script>