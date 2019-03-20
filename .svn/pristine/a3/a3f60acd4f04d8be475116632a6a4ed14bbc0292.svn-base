<!--* 
* @description: 维修订单（派单） 报单查询
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*--> 
<template>
	<el-row>
		<el-col :span="24">
			<el-collapse v-model="detailActiveNames" class="bdcoll rpShowimgDialog">
				<el-collapse-item title="报单信息" class="bigdata" name="1">
					<template slot="title">
						<div class="fl">报单信息</div>
						<el-button @click.stop="closeDialog" size="mini" style="position: absolute;right: 3px;top: 3px;">返回</el-button>
					</template>
					<el-row class="mt2 pt2">
						<el-col :span="8">
							<dl class="dllist">
								<dt>维修单号:</dt>
								<dd v-if="ruleFormStatic.orderno">{{ ruleFormStatic.orderno }}</dd>
							</dl>
						</el-col>
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
						<el-col :span="8">
							<dl class="dllist">
								<dt>报单时间:</dt>
								<dd v-if="ruleFormStatic.createdate">{{ util.formatDate.format(new Date(ruleFormStatic.createdate), 'yyyy-MM-dd hh:mm:ss') }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>报单备注:</dt>
								<dd>{{ ruleFormStatic.flowData.start_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="12" v-if="ruleFormStatic.flowData">
							<dl class="dllist">
								<dt>派单备注:</dt>
								<dd>{{ ruleFormStatic.flowData.send_remark }}</dd>
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
							<el-form label-position="top" :model="ruleForm" class="cur-form-inn" inline>
								<el-form-item label="当前车辆照片">
									<el-row :gutter="20">
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload disabled name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :before-upload="util.beforeAvatarUpload" >
													<img v-if="ruleForm.pictures[0].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[0].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													车架号
												</div>
											</el-card>
										</el-col>
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload disabled name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :before-upload="util.beforeAvatarUpload" >
													<img v-if="ruleForm.pictures[1].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[1].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													车牌号
												</div>
											</el-card>
										</el-col>
										<el-col class="photosh sgphtosh">
											<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
												<el-upload disabled name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :before-upload="util.beforeAvatarUpload">
													<img v-if="ruleForm.pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[2].piclink" class="avatar">
													<i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
												<div class="btsty">
													铭牌号
												</div>
											</el-card>
										</el-col>
									</el-row>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="维修前设备信息" name="10086" class="enlargeArea" v-if="ruleFormStatic.afterSaleDetails && ruleFormStatic.afterSaleDetails.length > 0">
					<template slot="title">
						<div class="fl sebei" style="margin-right:10px;">维修前设备信息</div>
						<el-button @click.stop="realTimeRefreshPro('vueAmap3')" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
					</template>
					<el-row class="mt5">
						<el-col :span="24">
							<gdmap3 ref="vueAmap3"></gdmap3>
						</el-col>
					</el-row>
				</el-collapse-item>
				<template v-for="(item,index) in ruleFormStatic.afterSaleDetails">
					<el-collapse-item title="维修前设备信息" :name="(++index)+''" class="wzpdt10">
						<template slot="title">
							<div class="fl sebei">
								<span class="tagNum">{{ index }}</span> {{ item.packinfo.E_PRODTYPE+'设备'+item.packinfo.E_PRODMODEL }}
							</div>
						</template>
						<el-row class="mt5">
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
									<dt>设备编号:</dt>
									<dd v-if="item.packinfo">{{ item.packinfo.E_PRODUNUM }}</dd>
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
									<dt>安装位置:</dt>
									<dd v-if="item.installDetail.installpositionname">{{ item.installDetail.installpositionname }}</dd>
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
							<el-col :span="8">
								<dl class="dllist">
									<dt>实时位置信息：</dt>
									<dd v-if="item.curaddress">{{ item.curaddress }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>SIM卡状态：</dt>
									<dd v-if="item.cardstatus">{{ item.cardstatus }}</dd>
								</dl>
							</el-col>
							<el-col :span="8">
								<dl class="dllist">
									<dt>维修原因：</dt>
									<dd v-if="item.faultcode">{{ item.faultcode }}</dd>
								</dl>
							</el-col>
							<el-col :span="24" v-if="item.remark">
								<dl class="dllist">
									<dt>设备备注:</dt>
									<dd>{{ item.remark }}</dd>
								</dl>
							</el-col>
							<el-col :span="24" v-if="item.picdesc">
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

				<el-collapse-item title="更换设备或卡信息" class="lefw10 wzpdt10" name="9">
					<el-form label-position="top" :model="ruleForm" ref="ruleForm" class="cur-form-inn" label-width="110px" inline>
						<el-row :gutter="10">
							<template v-for="(item,index) in deviceCurData">
								<div class="fl sebei ml10">
									<span class="tagNum">{{ index + 1 }}</span>
									<span style="font-size:14px;vertical-align: middle;color:#009688;" class="ml5">
									<template v-if="item.isReplaceCard">
										更换卡
									</template>
									<template v-else>
										更换设备
									</template>
									</span>
								</div>
								<el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;">
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备类型:</dt>
											<dd>{{ item.packInfo.E_PRODTYPE }}</dd>
										</dl>
										<dl class="dllist">
											<dt>SIM卡号:</dt>
											<dd>{{ item.packInfo.C_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备型号:</dt>
											<dd>{{ item.packInfo.E_PRODMODEL }}</dd>
										</dl>
										<dl class="dllist">
											<dt>卡类型:</dt>
											<dd>{{ item.packInfo.C_PRODMODEL }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备编号:</dt>
											<dd>{{ item.packInfo.E_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>安装位置:</dt>
											<dd v-if="item.installpositionname">{{ item.installpositionname }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>是否在线:</dt>
											<dd>{{ item.onlinestatus == 0 ? "未上线" : item.onlinestatus == 1 ? "在线" : "暂无" }}</dd>
										</dl>
									</el-col>
									<template v-if="!item.isReplaceCard">
										<el-col :span="24" class="mb10" v-if="ruleForm.installDetails.length > 0">
											<el-form-item label="当前设备照片" prop="installactualdate"  v-if="ruleForm.installDetails[index].pictures != undefined && ruleForm.installDetails[index].pictures.length > 0 ">
												<el-row :gutter="20">
													<el-col class="photosh sgphtosh">
														<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
															<el-upload disabled name="mediaFile" :ref="'devUploada'+index" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload"  :show-file-list="false" :before-upload="util.beforeAvatarUpload">
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
															<el-upload disabled name="mediaFile" :ref="'devUploadb'+(index+1)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :before-upload="util.beforeAvatarUpload">
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
															<el-upload disabled name="mediaFile" :ref="'devUploadc'+(index+2)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false"  :before-upload="util.beforeAvatarUpload">
																<img v-if="ruleForm.installDetails[index].pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[2].piclink" class="avatar">
																<i v-else class="el-icon-plus avatar-uploader-icon"></i>
															</el-upload>
															<div class="btsty">
																设备照片
															</div>
														</el-card>
													</el-col>
												</el-row>
											</el-form-item>
										</el-col>

									</template>
								</el-col>
							</template>
						</el-row>
					</el-form>
				</el-collapse-item>






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
					</el-row>
				</el-collapse-item>

				<el-collapse-item title="历史记录" class="lefw10 wzpdt10" name="9">
					<el-table :data="opHistoryData" border v-loading="historyListLoading" style="width: 100%">
						<el-table-column prop="name" align="center" label="操作状态">
						</el-table-column>
						<el-table-column prop="assignee_name" align="center" label="操作人">
						</el-table-column>
						<el-table-column align="center" prop="create_time" label="接收时间">
						</el-table-column>
						<el-table-column align="center" prop="end_time" label="提交时间">
						</el-table-column>
						<el-table-column align="center" prop="DURATION_" label="操作耗时">
						</el-table-column>
						<el-table-column prop="task_vars" align="center" label="操作记录" :formatter="taskFormatter">
						</el-table-column>
					</el-table>
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
	import { getAfterSale_detail, cldeviceIsOnstate,getOperationRecord } from '../../../api/api';
	export default {
		components: {
			gdmap3
		},
		data() {
			return {
				util: util,
				indDe:0,
				deviceCurData: [],//更换设备信息
				//启动报单提交表单信息
				ruleForm: {
					aftersaledate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
					aftersaleaddress: '',
					contactperson: '',
					contactmobile: '',
					aftersaleaddressCity: [],
					send_work_group: '',
					send_work_user: '',
					installDetails: [],
					result: true,
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
					remark: ''
				},
				//维修弹窗详情显示
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
				realTimeRefreshLoading: false,
				opHistoryData: [],
				historyListLoading: false,
			};
		},

		methods: {
			//根据任务id获取表单信息
			getFormData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					id: obj.ID
				};
				this.curTaskId = obj.ID;
				getAfterSale_detail(pa).then((res) => {
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

				// 获取历史记录数据
				let para = {
					orderno: obj.orderno
				}
				this.historyListLoading = true;
				getOperationRecord(para).then((res) => {
					this.historyListLoading = false;
					if(res.data.result.code == 0) {
						this.opHistoryData = res.data.data;
					}
				});
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
			taskFormatter(row, col) {
				let task_vars = row.task_vars;
				if(task_vars) {
					return(task_vars.result ? "通过" : "拒绝") + (task_vars.remark ? '-备注说明：' + task_vars.remark : "");
				} else {
					return "";
				}
			},
			//获取设备位置
			cldeviceIsOnstate(cnum, index) {
				let para = {
					id: cnum
				};
				this.realTimeRefreshLoading = true;
				//添加设备自动识别是否在线
				cldeviceIsOnstate(para).then((res) => {
					this.realTimeRefreshLoading = false;
					if(res.data.result.code == 0) {
						if(res.data.data)
							if(res.data.data.realdata)
								this.ruleForm.installDetails[index].onlinestatus = res.data.data.realdata.istate == 1 ? 1 : 0;
					}
				});
			},
			//父级如果是点击查询回调
			getCustoHistoryInfo(row) {
				this.ruleFormStatic = row;
				if(row.afterSaleDetails.length > 0) {
					let carPictures = row.pictures;
					if(row.pictures.length == 0) {
						carPictures = [{
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
						carPictures.push({
							picdesc: "其它部分照片",
							piclink: ""
						});
					}
					this.ruleForm.pictures = carPictures;

					row.afterSaleDetails.forEach((res, index) => {
						let installd = res.installDetail;
						if(installd) {
							let isReplaceCard = !res.currinstallid ? true : false;
							installd.packInfo.isReplaceCard = isReplaceCard;
							this.deviceCurData.push(installd);
							// if(!isReplaceCard) {
								// let pictures = installd.pictures;
								// if(pictures.length == 0) {//没有照片时
								// 	pictures = [{
								// 			picdesc: "设备走线照片",
								// 			piclink: ""
								// 		},
								// 		{
								// 			picdesc: "设备照片",
								// 			piclink: ""
								// 		},
								// 		{
								// 			picdesc: "设备号照片",
								// 			piclink: ""
								// 		},
								// 		{
								// 			picdesc: "其它部分照片",
								// 			piclink: ""
								// 		}
								// 	];
								// } else {//有照片时
								// 	pictures.push({
								// 		picdesc: "其它部分照片",
								// 		piclink: ""
								// 	});
								// }
								
								//添加设备信息
								this.ruleForm.installDetails.push({
									installpositioncode: installd.installpositionname,
									installpositionname: installd.installpositioncode,
									packid: installd.packid,
									E_PRODMODEL: installd.packInfo.E_PRODMODEL,
									E_PRODUNUM: installd.packInfo.E_PRODUNUM,
									isReplaceCard: isReplaceCard,
									oldDeviceId: installd.packid,
									pictures: installd.pictures,
									onlinestatus: installd.onlinestatus ? 1 : 0,
									remark: installd.actionresult
								});
							// } else {
							// 	//添加卡信息
							// 	this.ruleForm.installDetails.push({
							// 		isReplaceCard: isReplaceCard,
							// 		simId: row.SIMCARDID,
							// 		onlinestatus: 1,
							// 		oldDeviceId: installd.packid,
							// 		remark: installd.actionresult,
							// 		remark: '',
							// 		pictures: [{
							// 				picdesc: "设备走线照片",
							// 				piclink: ""
							// 			},
							// 			{
							// 				picdesc: "设备照片",
							// 				piclink: ""
							// 			},
							// 			{
							// 				picdesc: "设备号照片",
							// 				piclink: ""
							// 			},
							// 			{
							// 				picdesc: "其它部分照片",
							// 				piclink: ""
							// 			}
							// 		]
							// 	});
							// }

						}
				});
				//查询设备实时位置
				this.realTimeRefreshPro('vueAmap3');
				}
			},
			//关闭当前窗口
			closeDialog() {
				this.$router.back(-1);
			}
		},
		created() {
			if(this.$store.state.formObj)
				this.getFormData(this.$store.state.formObj);
		}
	}
</script>