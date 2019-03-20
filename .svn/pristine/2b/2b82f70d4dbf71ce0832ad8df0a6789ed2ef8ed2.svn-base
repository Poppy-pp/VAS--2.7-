<!--* 
* @description: 报单中心（完成） 详情
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
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
									<dd v-if="ruleFormStatic.declarEmployee">{{ ruleFormStatic.declarEmployee.employeename }}</dd>
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

							<el-col :span="24">
								<dl class="dllist">
									<dt>报单备注:</dt>
									<dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
								</dl>
							</el-col>
						</el-row>
					</el-collapse-item>

					<el-collapse-item title="派单信息" name="13" class="lefw10 wzpdt10">
						<el-row class="mt5">
							<el-col :span="8">
								<dl class="dllist">
									<dt>安装小组:</dt>
									<dd>{{ ruleFormStatic.installGroupInfo.groupname}}</dd>
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

					<el-collapse-item title="审核信息" name="15" class="lefw10">
						<el-form label-position="left" inline label-width="110px" class="demo-table-expand">
							<el-form-item label="备注" prop="service_verify_remark">
								<span>{{ ruleFormStatic.flowData.service_verify_remark }}</span>
							</el-form-item>
						</el-form>
					</el-collapse-item>

					<el-collapse-item title="保险操作" name="8" class="lefw10">
						<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
							<el-row :gutter="20">
								<el-col :span="8" class="mt20">
									<el-form-item label="保险公司" prop="insurancecorpid">
										<el-select v-model="ruleForm.insurancecorpid" :loading="receLoading" @visible-change="insuranceCompanyList" filterable placeholder="请选择">
											<el-option v-for="item in insuranceCompany" :key="item.corpname" :label="item.corpname" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8" class="mt20">
									<el-form-item label="保单号" prop="serialnum">
										<el-input type="text" v-model="ruleForm.serialnum"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8" class="mt20">
									<el-form-item label="出单日期" prop="issuedate">
										<el-date-picker type="date" placeholder="选择出单日期" v-model="ruleForm.issuedate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="保险生效日期" class="mt10" prop="effectivedate">
										<el-date-picker @change="effectivedateChange" type="date" placeholder="选择保险生效日期" v-model="ruleForm.effectivedate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="保险失效日期" class="mt10" prop="expiredate">
										<el-date-picker type="date" placeholder="选择保险失效日期" v-model="ruleForm.expiredate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="保单赔偿限额" class="mt10" prop="indemnitylimit">
										<el-input type="text" placeholder="请输入保单赔偿限额" v-model="ruleForm.indemnitylimit">
											<template slot="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" class="mt20">
									<el-form-item label="保险价格" prop="price">
										<el-input type="text" placeholder="请输入保险价格" v-model="ruleForm.price">
											<template slot="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8" class="mt20">
									<el-form-item label="报单状态" prop="insurancestatus">
										<el-radio-group v-model="ruleForm.insurancestatus">
											<el-radio-button label="出单">出单</el-radio-button>
											<!-- <el-radio-button label="预投保">预投保</el-radio-button> -->
											<el-radio-button label="拒绝">拒绝</el-radio-button>
										</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="24" class="mt20">
									<el-form-item label="备注" prop="remark">
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
				</el-collapse>
			</el-col>

		</el-row>
	</section>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import async from 'async';
	import util from '../../../common/js/util';
	import gdmap3 from 'components/map/gdmap3';
	import { addApprovaperInsurance, getCorpNameInsuList, cldeviceIsOnstate } from '../../../api/api';

	export default {
		props: ['curTaskId'],
		components: {
			gdmap3
		},
		data() {
			//自定义验证安装地址表单
			var checkInsu = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0 && this.ruleForm.insurancestatus != '拒绝') {
					return callback(new Error('请选择保险公司'));
				} else {
					callback();
				}
			};
			return {
				indDe: 0,
				insuranceCompany: [],
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
				//启动报单提交表单信息
				ruleForm: {
					insurancecorpid: '',
					serialnum: '',
					issuedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					effectivedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					expiredate: util.getDateThreeYers(new Date(), 3),
					indemnitylimit: '',
					price: '',
					insurancestatus: '出单',
					remark: ''
				},
				//启动报单表单验证信息
				rules: {
					insurancecorpid: [{
						required: true,
						validator: checkInsu,
						trigger: 'blur'
					}] //保险公司验证
				},
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '10086'],
				addLoading: false,
				realTimeRefreshLoading: false,
				receLoading: false
			};
		},
		methods: {
			//改变生效日期 同步 失效日期 有效期3年
			effectivedateChange(val) {
				var dayjian = util.addReduceDate(new Date(val), -1);
				this.ruleForm.expiredate = util.getDateThreeYers(dayjian, 3);
			},
			insuranceCompanyList(r) {
				if(!r || this.insuranceCompany.length > 0) return;
				this.receLoading = true;
				getCorpNameInsuList().then((res) => {
					this.insuranceCompany = res.data.data.records;
					this.receLoading = false;
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
									_this.$refs[gmapname].getAddress([data.lng, data.lat], para.id, (res) => {
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
						if(data) {
							switch(data.istate) {
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
						} else {
							_this.ruleFormStatic.installDetails[i].curaddress = "无定位";
							_this.ruleFormStatic.installDetails[i].curonlinestatus = "未在线";
						}
						_this.realTimeRefreshLoading = false;
						_this.indDe++;
						if(_this.indDe < len) _this.realTimeRefreshPro(gmapname);
						if(_this.indDe == len) _this.indDe = 0;
					});
				}
			},
			/* 提交表单数据 */
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
							taskId: this.curTaskId,
							properties: {
								insurancestatus: this.ruleForm.insurancestatus,
								insuranceInfo: {
									serialnum: this.ruleForm.serialnum,
									insurancecorpid: this.ruleForm.insurancecorpid,
									price: this.ruleForm.price,
									issuedate: util.formatDate.format(new Date(this.ruleForm.issuedate), 'yyyy-MM-dd'),
									effectivedate: util.formatDate.format(new Date(this.ruleForm.effectivedate), 'yyyy-MM-dd'),
									expiredate: util.formatDate.format(new Date(this.ruleForm.expiredate), 'yyyy-MM-dd'),
									indemnitylimit: this.ruleForm.indemnitylimit
								},
								result: true,
								remark: this.ruleForm.remark
							}
						};
						this.addLoading = true;
						//提交审核结果
						addApprovaperInsurance(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '提交成功！',
									type: 'success'
								});
								//初始化待办数量
								this.$store.dispatch('initFormNum');
								if(!this.$store.state.formObj) {
									this.getHdTodo();
								} else {
									this.$router.back(-1);
								}
							}
						});
					}
				});
			},
			getCustoHistoryInfo(res, row) {
				let dayjia = util.addReduceDate(new Date(res.installactualdate), 1);
				this.ruleFormStatic = res;
				this.ruleForm.effectivedate = util.formatDate.format(dayjia, 'yyyy-MM-dd');
				this.ruleForm.expiredate = util.getDateThreeYers(new Date(res.installactualdate), 3);
				this.realTimeRefreshPro('vueAmap3');
				//初始化图片查看器
				$("div.rpShowimgDialog").on("click", ".image", function(e) {
					$("div.rpShowimgDialog").viewer({
						zIndex: 999999999
					});
				});
			},
			/* 重置表单数据 */
			resetForm(formName) {
				this.ruleForm = { //启动报单提交表单信息
				};
			}
		},
		/*初始化页面数据*/
		created() {
			this.$emit("changeStep", 0);
			//判断是否单条处理
			this.$emit("getFormData", this.$store.state.formObj);
		}
	}
</script>