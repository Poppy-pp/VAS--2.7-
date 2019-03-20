<!-- 新建拆除单 -->
<template>
	<section>
		<el-row>
			<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rule" class="cur-form-inn" label-width="110px" inline>
				<el-col :span="24" class="cbstyle">
					<el-collapse v-model="activeName" class="bdcoll">
						<el-collapse-item title="订单信息" name="0" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="24" class="dec_carinfo ml0 bc_none">
									<dl class="dllist">
										<dt>创建人：</dt>
										<dd>{{ formInfo.user.createuser }}</dd>
									</dl>
									<dl class="dllist">
										<dt>所属公司：</dt>
										<dd>{{ formInfo.user.zruser }}</dd>
									</dl>
								</el-col>
								<el-col :span="24" class="mt10">
									<el-radio-group @change="aftersaleChange" v-model="ruleForm.aftersaletype">
										<el-radio-button label="1">新装拆除</el-radio-button>
										<el-radio-button label="2">售后拆除</el-radio-button>
									</el-radio-group>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="车辆信息" name="1" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item label="车辆信息" prop="vinnum" class="wiredNum mt10">
										<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="ruleForm.vinnum" :fetch-suggestions="querySearchVins" custom-item="my-item-zh" placeholder="请输入车牌号/车架号" @select="handleSelectVin">
											<template slot-scope="props">
												<div class="name">{{ props.item.model }}</div>
												<div class="addr">{{ props.item.licenseplatenum }}</div>
												<span class="addr">{{ props.item.vin }}</span>
											</template>
										</el-autocomplete>
									</el-form-item>
								</el-col>
								<el-col :span="18">
									<el-form-item label=" " class="wiredNum mt25">
										<el-button @click="$router.push('/vehicleRegistration')" type="success" style="margin-top:-2px;float:left;" icon="el-icon-circle-check" plain>车辆登记</el-button>
									</el-form-item>
								</el-col>
								<el-col :span="24" class="dec_carinfo" v-show="isShow">
									<dl class="dllist">
										<dt>车型：</dt>
										<dd>{{ formInfo.car.model }}</dd>
									</dl>
									<dl class="dllist" v-if="formInfo.car.vin">
										<dt>车架号：</dt>
										<dd>{{ formInfo.car.vin }}</dd>
									</dl>
									<dl class="dllist" v-if="formInfo.car.num">
										<dt>车牌：</dt>
										<dd>{{ formInfo.car.num }}</dd>
									</dl>
								</el-col>

								<el-col :span="6" v-show="orderDataList.length > 0">
									<el-form-item label="选择拆除订单" prop="vinnum" class="wiredNum mt10">
										<el-select @change="orderChangeHandle" value-key="orderno" :loading="orderLoading" clearable v-model="orderInfo" filterable placeholder="请选择">
											<el-option v-for="item in orderDataList" :key="item.orderno" :label="item.orderno" :value="item">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="24" class="dec_carinfo" v-show="orderInfo">
									<dl class="dllist">
										<dt>业务员姓名:</dt>
										<dd>{{ orderInfo.salername }}</dd>
									</dl>
									<dl class="dllist">
										<dt>业务员电话：</dt>
										<dd>{{ orderInfo.salermobile }}</dd>
									</dl>
									<dl class="dllist">
										<dt>报单时间：</dt>
										<dd>{{ orderInfo.declaredate }}</dd>
									</dl>
								</el-col>

							</el-row>
						</el-collapse-item>
						<el-collapse-item title="请选择拆除设备信息" name="2" class="pb18 lefw10" v-show="isShow">
							<el-row :gutter="20">
								<template v-if="!isNewRemove">
									<el-col :span="24" v-for="(items,index) in deviceData">
										<el-checkbox-group @change="checkChange" v-model="checkedCities1" class="mt10">
											<el-checkbox :label="items" :disabled="items.status == 'REMOVING'">{{ items.prodnum }}({{ items.prodspec }}-{{ items.prodmodel }})</el-checkbox>
										</el-checkbox-group>
										<el-col :span="24" class="dec_carinfo ml0 pb10" v-show="checkedCities2.join(',').indexOf(items.packid) >= 0">
											<dl class="dllist">
												<dt>设备类型：</dt>
												<dd>{{ items.prodspec }}</dd>
											</dl>
											<dl class="dllist">
												<dt>设备型号：</dt>
												<dd>{{ items.prodmodel }}</dd>
											</dl>
											<dl class="dllist">
												<dt>SIM卡号：</dt>
												<dd>{{ items.simnum }}</dd>
											</dl>
											<dl class="dllist">
												<dt>SIM卡状态：</dt>
												<dd>
													<el-select v-model="ruleForm['status'+index]" value-key="dictdatavalue" :loading="simStatusLoading" @visible-change="getSIMStatusInfo" filterable placeholder="请选择SIM卡状态" style="width:30%;">
														<el-option @click.native="changeStatus(items,item)" v-for="item in simStatusData" :label="item.dictdatavalue" :key="item.dictdatavalue" :value="item">
														</el-option>
													</el-select>
												</dd>
											</dl>
											<el-col :span="24" class="pl0">
												<el-col :span="6" class="pl0">
													<el-form-item label="拆除原因" class="mt5">
														<el-select v-model="ruleForm['temp'+index]" value-key="dictdatavalue" :loading="faultLoading" @visible-change="getRemoveInfo" filterable placeholder="请选择拆除原因">
															<el-option @click.native="changeFault(items,item)" v-for="item in demolitionReasonData" :label="item.dictdatavalue" :key="item.dictdatavalue" :value="item">
															</el-option>
														</el-select>
													</el-form-item>
												</el-col>
											</el-col>
										</el-col>
									</el-col>
								</template>
								<template v-else>
									<el-col :span="24" v-for="(items,index) in deviceData">
										<el-checkbox-group @change="checkChange" v-model="checkedCities1" class="mt10">
											<el-checkbox :disabled="items.status == 'REMOVING'" :label="items">{{ items.e_prodnum }}({{ items.c_prodnum }}-{{ items.installpositionname }})</el-checkbox>
										</el-checkbox-group>
										<el-col :span="24" class="dec_carinfo ml0 pb10" v-show="checkedCities2.join(',').indexOf(items.packid) >= 0">
											<dl class="dllist">
												<dt>设备号：</dt>
												<dd>{{ items.e_prodnum }}</dd>
											</dl>
											<dl class="dllist">
												<dt>安装位置：</dt>
												<dd>{{ items.installpositionname }}</dd>
											</dl>
											<dl class="dllist">
												<dt>SIM卡号：</dt>
												<dd>{{ items.c_prodnum }}</dd>
											</dl>
											<dl class="dllist">
												<dt>SIM卡状态：</dt>
												<dd>
													<el-select v-model="ruleForm['status'+index]" value-key="dictdatavalue" :loading="simStatusLoading" @visible-change="getSIMStatusInfo" filterable placeholder="请选择SIM卡状态" style="width:30%;">
														<el-option @click.native="changeStatus(items,item)" v-for="item in simStatusData" :label="item.dictdatavalue" :key="item.dictdatavalue" :value="item">
														</el-option>
													</el-select>
												</dd>
											</dl>
											<el-col :span="24" class="pl0">
												<el-col :span="6" class="pl0">
													<el-form-item label="拆除原因" class="mt5">
														<el-select v-model="ruleForm['temp'+index]" value-key="dictdatavalue" :loading="faultLoading" @visible-change="getRemoveInfo" filterable placeholder="请选择拆除原因">
															<el-option @click.native="changeFault(items,item)" v-for="item in demolitionReasonData" :label="item.dictdatavalue" :key="item.dictdatavalue" :value="item">
															</el-option>
														</el-select>
													</el-form-item>
												</el-col>
											</el-col>
										</el-col>
									</el-col>
								</template>
								<el-col :span="24">
									<el-col :span="6" class="pl0">
										<el-form-item label="拆除费用" prop="price" class="mt5">
											<el-input type="text" placeholder="请输入拆除费用" v-model="ruleForm.price">
												<template slot="append">元</template>
											</el-input>
										</el-form-item>
									</el-col>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="预约信息" name="3" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item label="拆除联系人" prop="contactperson" class="wiredNum mt10">
										<el-input type="text" placeholder="请输入拆除联系人" v-model="ruleForm.contactperson"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="联系人电话" prop="contactmobile" class="wiredNum mt10">
										<el-input type="text" placeholder="请输入联系人电话" v-model="ruleForm.contactmobile"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预约时间" class="mt10" prop="aftersaledate">
										<el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择日期" v-model="ruleForm.aftersaledate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>

								<el-col :span="18">
									<el-form-item label="预约地址" class="mt10 installaddressStyle" prop="aftersaleaddress">
										<el-input placeholder="请输入详细地址" v-model="ruleForm.aftersaleaddress" @change="refmap">
											<el-cascader placeholder="请选择省/市/区" slot="prepend" class="cascLable" v-model="ruleForm.aftersaleaddressCity" :options="prOptions" @change="addressChanges" filterable change-on-select></el-cascader>
										</el-input>
									</el-form-item>
									<gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="拆除设备原因备注" name="4" class="pb18 lefw10">
							<el-row :gutter="20">
								<el-col :span="24">
									<el-form-item label="" prop="remark" class="mt10">
										<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-collapse-item>
					</el-collapse>
				</el-col>
				<el-col class="footer_but_bd" :span="24">
					<el-button @click="" style="margin-left:5px;float:right;">返回</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
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
	import nanobar from '../../../common/js/nanobar';
	import gdmap from 'components/map/gdmap';
	import { startVindicate_remove, getSearchVinNum, getCidSearchDevice, getRemoveTypeInfo, getRemoveDeclaration, getRemovInstallDetail,getRemoveInfo,getSIMStatusInfo } from '../../../api/api';
	//自定义搜索组件模板样式
	Vue.component('my-item-zh', {
		functional: true,
		render(h, ctx) {
			var item = ctx.props.item;
			return h('li', ctx.data, [
				h('div', {
					attrs: {
						class: 'model'
					}
				}, [item.model]),
				h('span', {
					attrs: {
						class: 'vin'
					}
				}, ["车架号：", item.vin]),
				h('span', {
					attrs: {
						class: 'vin'
					}
				}, ["车牌号：", item.licenseplatenum])
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
		props: ['curTaskId'],
		components: {
			gdmap
		},
		data() {
			// 维修费用
			var checkNum = (rule, value, callback) => {
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
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
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
			return {
				user: '',
				//拆除订单列表
				orderDataList: [],
				orderLoading: false,
				prOptions: util.initProvince(),
				//控制设备返回对象数组
				checkedCities1: [],
				//控制设备信息是否展开
				checkedCities2: [],
				//存储选中设备拆除信息需要提交到后台的信息
				checkedCities: [],
				deviceData: [],
				isNewRemove: true,
				//是否显示 设备信息
				isShow: false,
				//拆除原因数组
				demolitionReasonData: [],
				faultLoading:false,
				simStatusLoading:false,
				simStatusData:[],//SIM卡状态列表
				//启动报单提交表单信息
				ruleForm: {
					vinnum: '',
					vehicleid: '',
					declarationid: '',
					temp0: '',
					temp1: '',
					temp2: '',
					temp3: '',
					temp4: '',
					temp5: '',
					temp6: '',
					temp7: '',
					temp8: '',
					temp9: '',
					temp10: '',
					temp11: '',
					temp12: '',
					temp13: '',
					temp14: '',
					temp15: '',
					aftersaledate: '',
					aftersaleaddress: '',
					aftersaletype: 1,
					aftersaleaddressCity: [],
					contactperson: '',
					contactmobile: '',
					remark: '',
					afterSaleDetails: [],
					price:'',
				},
				rule: {
					contactperson: [{
						validator: checkName,
						trigger: 'blur'
					}],
					contactmobile: [{
						validator: checkSlarMobile,
						trigger: 'blur'
					}],
					aftersaledate: [{
						type: 'date',
						required: true,
						message: " ",
						trigger: 'blur'
					}],
					price: [{
						validator: checkNum,
						trigger: 'blur'
					}],
				},
				formInfo: {
					user: {
						createuser: '',
						zruser: ''
					},
					car: {
						vin: '',
						num: '',
						model: '',
						corpid:'',
					},
					device: {}
				},
				orderInfo: '',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				rules: { //启动报单表单验证信息
				},
				installapplyinsuMaxNum: 0,
				installapplymornMaxNum: 0,
				activeName: ['0', '1', '2', '3', '4', '5'],
				addLoading: false
			};
		},
		methods: {
			//查询维修故障代码
			getRemoveInfo(r) {
				if(!r || this.demolitionReasonData.length > 0) return;
				this.faultLoading = true;
				getRemoveInfo().then((res) => {
					this.faultLoading = false;
					this.demolitionReasonData = res.data.data.records;
				});
			},
			//点击option
			changeFault(item, v) {
				this.ruleForm['fault' + item.packid] = v.id;
			},
			// 查询SIM卡状态列表
			getSIMStatusInfo(r){
				if(!r || this.simStatusData.length > 0) return;
				this.simStatusLoading = true;
				getSIMStatusInfo().then((res) => {
					this.simStatusLoading = false;
					this.simStatusData = res.data.data.records;
				});
			},
			changeStatus(item, v) {//点击option
				this.ruleForm['status' + item.packid] = v.dictdataname;
			},
			draggerMapMarker(address, lnglatXY, type) {
				this.ruleForm.aftersaleaddress = address;
			},
			//地址选择刷新地图坐标
			addressChanges(resw) {
				this.$refs.vueAmap.geocoder(resw.join(""), (res) => {
					this.ruleForm.aftersaleaddress = resw.join("");
				});
			},
			//地址改变刷新地图坐标
			refmap() {
				this.$refs.vueAmap.geocoder(this.ruleForm.aftersaleaddress, (res) => {});
			},
			//选择拆除订单
			orderChangeHandle(item) {
				if(!item) return;
				let para = {
					carid: this.ruleForm.vehicleid,
					declarationid: item.id
				};
				this.ruleForm.declarationid = item.id;
				nanobar.go(70);
				//设备信息
				getRemovInstallDetail(para).then((res) => {
					let data = res.data.data.records;
					this.deviceData = data;
					nanobar.go(100);
				});
			},
			//展开设备相关信息
			checkChange(item) {
				this.checkedCities = [];
				this.checkedCities2 = [];
				item.forEach((res, index) => {
					this.checkedCities2.push(res.packid);
					this.checkedCities.push({
						installid: res.installid,
						packid: res.packid
					});
				});
			},
			//根据车架号/车牌号查询+
			handleSelectVin(item) {
				//车信息
				this.formInfo.car.vin = item.vin;
				this.formInfo.car.num = item.licenseplatenum;
				this.formInfo.car.model = item.model;
				this.formInfo.car.corpid = item.corpid;
				if(item.vin) {
					this.ruleForm.vinnum = item.vin;
				} else {
					this.ruleForm.vinnum = item.licenseplatenum;
				}
				this.isShow = true;
				if(this.ruleForm.aftersaletype == 2) {
					let para = {
						carid: item.id
					};
					this.ruleForm.vehicleid = item.id;
					nanobar.go(70);
					//设备信息
					getCidSearchDevice(para).then((res) => {
						nanobar.go(100);
						this.deviceData = [];
						this.checkedCities = [];
						this.checkedCities1 = [];
						this.checkedCities2 = [];
						if(res.data.result.code == 0) {
							let data = res.data.data.records;
							if(data.length == 0) {
								this.$message({
									message: "当前车辆没有安装任何设备！",
									duration: 10000,
									type: 'warning'
								});
								return;
							}
							this.deviceData = data;
						}
					});
				} else {
					let para = {
						vehicleid: item.id
					};
					this.ruleForm.vehicleid = item.id;
					//订单信息
					getRemoveDeclaration(para).then((res) => {
						let data = res.data.data.records;
						this.orderDataList = data;
						if(data.length != 0) {
							this.orderInfo = data[0];
							this.orderChangeHandle(data[0]);
						} else {
							this.orderInfo = '';
						}
					});
				}
			},
			//根据车架号/车牌号查询
			querySearchVins(queryString, cb) {
				let para = {
					key: $.trim(queryString.toUpperCase()) ? $.trim(queryString.toUpperCase()) : "2"
				};
				getSearchVinNum(para).then((res) => {
					cb(res.data.data.records)
				});
			},
			/* 提交表单数据 */
			submitForm(formName) {
				if(this.checkedCities.length == 0) {
					this.$message({
						message: "至少选择一个拆除设备！",
						type: 'warning'
					});
					return;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = {
							createby: this.user.id,
							// corpid: this.user.corporateInfo.id,//当前用户所属公司
							corpid: this.formInfo.car.corpid,//车辆所属客户
							vehicleid: this.ruleForm.vehicleid,
							declarationid: this.ruleForm.declarationid,
							aftersaletype: this.ruleForm.aftersaletype,
							price:this.ruleForm.price,
							aftersaledate: util.formatDate.format(this.ruleForm.aftersaledate, 'yyyy-MM-dd hh:mm:ss'),
							aftersaleaddress: this.ruleForm.aftersaleaddress,
							contactperson: this.ruleForm.contactperson,
							contactmobile: this.ruleForm.contactmobile,
							remark: this.ruleForm.remark,
							afterSaleDetails: []
						};
						//拼接设备信息
						this.checkedCities.forEach((res, index) => {
							let pa = {
								packid: res.packid,
								installid: res.installid,
								faultcode: this.ruleForm['fault' + res.packid],
								cardstatus:this.ruleForm['status' + res.packid]
							};
							para.afterSaleDetails.push(pa);
						});
						this.addLoading = true;
						startVindicate_remove(para).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.resetForm();
								this.$message({
									message: "拆除订单提交成功！",
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					} else {
						return false;
					}
				});
			},
			aftersaleChange(value) {
				if(value == 1) {
					this.isNewRemove = true;
				} else {
					this.isNewRemove = false;
				}
				this.deviceData = [];
				this.orderDataList = [];
				this.checkedCities = [];
				this.checkedCities2 = [];
				this.isShow = false;
				this.ruleForm.vinnum = "";
				this.orderInfo = '';
			},
			/* 重置表单数据 */
			resetForm(formName) {
				this.ruleForm = { //启动报单提交表单信息
					vinnum: '',
					vehicleid: '',
					temp0: '',
					temp1: '',
					temp2: '',
					temp3: '',
					temp4: '',
					temp5: '',
					temp6: '',
					temp7: '',
					temp8: '',
					temp9: '',
					temp10: '',
					temp11: '',
					temp12: '',
					temp13: '',
					temp14: '',
					temp15: '',
					aftersaledate: '',
					aftersaleaddress: '',
					aftersaletype: 1,
					aftersaleaddressCity: [],
					contactperson: '',
					contactmobile: '',
					remark: '',
					afterSaleDetails: [],
					price:'',
				};
				this.deviceData = [];
				this.orderDataList = [];
				this.orderInfo = '';
				this.checkedCities = [];
				this.checkedCities1 = [];
				this.checkedCities2 = [];
				this.isShow = false;
			},
			getCustoHistoryInfo(res) {}
		},
		/*初始化页面数据*/
		created() {
			this.$emit("changeStep", 0);
			this.user = JSON.parse(sessionStorage.getItem('user'));
			if(!this.user) return;
			this.formInfo.user.createuser = this.user.employeeInfo.employeename;
			this.formInfo.user.zruser = this.user.corporateInfo.corpname;
		}
	}
</script>