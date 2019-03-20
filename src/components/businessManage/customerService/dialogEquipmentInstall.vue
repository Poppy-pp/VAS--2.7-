<!--* 
* @description: 维修中心（设备安装） 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<el-row>
		<el-col :span="24" class="cbstyle">
			<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
				<el-collapse v-model="activeNames" class="bdcoll mt20">
					<el-collapse-item title="车信息" name="1" class="lefw10">
						<el-row :gutter="20">
							<el-col :span="12">
								<dl class="dllist">
									<dt>车架号:</dt>
									<dd>{{ ruleFormStatic.vin }}</dd>
								</dl>
								<dl class="dllist">
									<dt>车牌号:</dt>
									<dd>{{ ruleFormStatic.licenseplatenum }}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist">
									<dt>车型:</dt>
									<dd>{{ ruleFormStatic.model }}</dd>
								</dl>
								<dl class="dllist">
									<dt>颜色:</dt>
									<dd>{{ ruleFormStatic.color }}</dd>
								</dl>
							</el-col>
							<el-col :span="24" class="mb10">
								<el-form-item label="上传车辆照片(可多选,最多5张))" class="mt10" prop="installactualdate">
									<el-upload action="/vasms-web/atta/upload" list-type="picture-card" multiple name="mediaFile" :accept="accept" :on-preview="carHandlePreview" :on-success="carHandleSuccess" :on-remove="carHandleRemove">
										<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="设备维修信息" name="2" class="lefw10">
						<el-row :gutter="20">
							<template v-for="(item,index) in ruleForm.afterSaleDetails" v-if="ruleForm.afterSaleDetails[index].installDetail">
								<el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;">
									<el-col :span="6" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<dl class="dllist">
											<dt>设备类型:</dt>
											<dd v-if="item.installDetail">{{ item.installDetail.packInfo.E_PRODMODEL }}</dd>
										</dl>
										<dl class="dllist">
											<dt>卡类型:</dt>
											<dd v-if="item.installDetail">{{ item.installDetail.packInfo.C_PRODMODEL }}</dd>
										</dl>
									</el-col>
									<el-col :span="10" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<dl class="dllist">
											<dt>设备ID:</dt>
											<dd v-if="item.installDetail">{{ item.installDetail.packInfo.E_PRODUNUM }}</dd>
										</dl>
										<dl class="dllist">
											<dt>SIM卡号:</dt>
											<dd v-if="item.installDetail">{{ item.installDetail.packInfo.C_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="8" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<dl class="dllist">
											<dt>厂家自编号:</dt>
											<dd v-if="item.installDetail">{{ item.installDetail.packInfo.PACKSELFID }}</dd>
										</dl>
									</el-col>

									<el-col :span="14" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<el-form-item label="安装位置(必选)" class="mt10">
											<el-select filterable :loading="codeloading" @visible-change="changeInstallDecode" v-model="ruleForm.afterSaleDetails[index].installDetail.installpositionname" placeholder="请选择安装位置">
												<el-option v-for="item in InstallPositionArray" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :span="10">
										<el-form-item label="售后描述" class="mt8">
											<el-radio-group @change="serviceRadioChange" v-model="ruleForm.afterSaleDetails[index].actiontype">
												<el-radio-button label='REPAIR'>维修</el-radio-button>
												<el-radio-button label='REPLACE'>更换</el-radio-button>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :span="24" class="mb10" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<el-form-item label="上传当前设备维修照片(可多选,最多3张)" class="mt10" prop="installactualdate">
											<el-upload action="/vasms-web/atta/upload" list-type="picture-card" multiple ref="upload" :data="{ind:index,packid:item.packid}" name="mediaFile" @mouseover.native="deviceHandleMouseover(index)" :accept="accept" :on-preview="deviceHandlePreview" :on-success="deviceHandleSuccess" :on-remove="deviceHandleRemove">
												<i class="el-icon-plus"></i>
											</el-upload>
										</el-form-item>
									</el-col>
									<el-col :span="24" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPAIR'">
										<el-form-item label="处理描述" class="mt10" prop="remark">
											<el-input type="textarea" autosize placeholder="请输入处理描述" v-model="ruleForm.afterSaleDetails[index].actionresult"></el-input>
										</el-form-item>
									</el-col>
									<!-- 设备更换 start -->
									<el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPLACE' && deviceCurData['device'+index]">
										<el-col :span="6">
											<dl class="dllist">
												<dt>设备类型:</dt>
												<dd>{{ deviceCurData['device'+index].E_PRODMODEL }}</dd>
											</dl>
											<dl class="dllist">
												<dt>卡类型:</dt>
												<dd>{{ deviceCurData['device'+index].C_PRODMODEL }}</dd>
											</dl>
										</el-col>
										<el-col :span="10">
											<dl class="dllist">
												<dt>设备ID:</dt>
												<dd>{{ deviceCurData['device'+index].E_PRODUNUM }}</dd>
											</dl>
											<dl class="dllist">
												<dt>SIM卡号:</dt>
												<dd>{{ deviceCurData['device'+index].C_PRODUNUM }}</dd>
											</dl>
										</el-col>
										<el-col :span="8">
											<dl class="dllist">
												<dt>厂家自编号:</dt>
												<dd>{{ deviceCurData['device'+index].PACKSELFID }}</dd>
											</dl>
										</el-col>

										<el-col :span="14">
											<el-form-item label="安装位置(必选)" class="mt10">
												<el-select filterable :loading="codeloading" @visible-change="changeInstallDecode" v-model="ruleForm.afterSaleDetails[index].newinstalldetail.installpositioncode" placeholder="请选择安装位置">
													<el-option v-for="item in InstallPositionArray" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>

										<el-col :span="10">
											<el-form-item label="自动识别设备是否在线" class="mt8">
												<el-radio-group v-model="ruleForm.afterSaleDetails[index].newinstalldetail.onlinestatus">
													<el-radio-button :disabled="disabled == 0" label='1'>已上线</el-radio-button>
													<el-radio-button :disabled="disabled == 1" label='0'>不在线</el-radio-button>
												</el-radio-group>
											</el-form-item>
										</el-col>
										<el-col :span="24" class="mb10">
											<el-form-item label="上传当前安装设备安装照片(可多选,最多3张)" class="mt10">
												<el-upload action="/vasms-web/atta/upload" list-type="picture-card" multiple ref="upload" :data="{ind:index,packid:deviceCurData['device'+index].ID}" name="mediaFile" @mouseover.native="deviceHandleMouseover(index)" :accept="accept" :on-preview="deviceHandlePreview3" :on-success="deviceHandleSuccess3" :on-remove="deviceHandleRemove3">
													<i class="el-icon-plus"></i>
												</el-upload>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="备注" class="mt10" prop="remark">
												<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.afterSaleDetails[index].newinstalldetail.remark"></el-input>
											</el-form-item>
										</el-col>
									</el-col>
									<el-col :span="24" class="mt10" v-show="ruleForm.afterSaleDetails[index].actiontype == 'REPLACE'">
										<el-popover placement="left" width="600" v-model="popover['visible'+index]" trigger="hover">
											<el-table :data="deviceData" max-height="300" :row-class-name="tableRowClassName" v-loading="listLoading" :index="index" @row-dblclick="deviceClickHandle">
												<el-table-column align="center" prop="PRODSPEC" label="设备种类"></el-table-column>
												<el-table-column align="center" prop="PACKSELFID" label="自编号"></el-table-column>
												<el-table-column align="center" prop="E_PRODMODEL" label="设备类型"></el-table-column>
												<el-table-column align="center" prop="E_PRODUNUM" label="设备ID"></el-table-column>
												<el-table-column align="center" prop="E_STATUS" label="设备状态"></el-table-column>
												<el-table-column align="center" prop="C_PRODMODEL" label="卡类型"></el-table-column>
												<el-table-column align="center" prop="C_PRODUNUM" label="SIM卡号"></el-table-column>
											</el-table>
											<el-button slot="reference" style="margin-bottom:10px;float:right;" icon="el-icon-plus" type="primary" @click="searchDevceinfo">更换当前设备</el-button>
										</el-popover>
									</el-col>
									<!-- 设备更换 end -->
								</el-col>
							</template>
						</el-row>
					</el-collapse-item>
				</el-collapse>
				<el-row style="border-top:1px solid #e8e8e8;" class="mt15">
					<el-col :span="24">
						<el-form-item label="备注" class="mt10" prop="remark">
							<el-input type="textarea" autosize placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="footer_but_bd" custom-class="imgShow" :span="24">
						<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
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
	import { addApprovaperSendVindicate, getPdInstallUserList, getInstallPositionCode, getMyDeviceInfo, cldeviceIsOnstate } from '../../../api/api';
	export default {
		props: ['curTaskId'],
		data() {
			//自定义验证安装地址表单
			let checkInstall = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0) {
					return callback(new Error('请选择对应设备的安装位置'));
				} else {
					callback();
				}
			};
			return {
				curIndex: 0,
				//自己所有设备
				deviceData: [],
				//被选中设备
				deviceCurData: {
					device0: '',
					device1: '',
					device2: '',
					device3: '',
					device4: '',
					device5: '',
					device6: '',
					device7: '',
				},
				popover: {
					visible0: false,
					visible1: false,
					visible2: false,
					visible3: false,
					visible4: false,
					visible5: false,
					visible6: false,
					visible7: false,
				},
				accept: '.jpg,.png',
				carFileList: [],
				listLoading: false,
				InstallPositionArray: [],
				codeloading: false,
				installUserId: '',
				//是否上线
				disabled: false,
				ruleForm: { //启动报单提交表单信息
					installpic1: null,
					installpic2: null,
					installpic3: null,
					installpic4: null,
					installpic5: null,
					afterSaleDetails: [],
					remark: ''
				},
				ruleFormStatic: {},
				rules: {},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				activeNames: ['1', '2'],
				addLoading: false
			};
		},
		methods: {
			//设备切换
			serviceRadioChange(v) {
				console.log(this.ruleForm.afterSaleDetails)
			},
			//点击设备添加设备编辑
			deviceClickHandle(row, event) {
				if(row.E_STATUS != "在库") {
					this.$message({
						message: "安装只能选择‘在库’设备！",
						duration: "6000",
						type: 'warning'
					});
					return;
				}
				//获取当前维修设备的index
				let index = $(event.target).parents("div.el-table").attr("index"),
					deid = this.deviceCurData['device' + index].ID;
				//清除上次上传的本地图片
				this.$refs.upload.forEach((res, index) => {
					if(res.data.packid == deid) {
						res.clearFiles();
						return false;
					}
				});
				//添加到对应维修设备数组
				this.deviceCurData['device' + index] = row;
				this.popover['visible' + index] = false;
				//添加设备信息
				this.ruleForm.afterSaleDetails[index].newinstalldetail = {
					installpositioncode: null,
					packid: row.ID,
					installpic1: null,
					installpic2: null,
					installpic3: null,
					installpic4: null,
					installpic5: null,
					onlinestatus: 0,
					remark: null
				};
				let para = {
					id: row.C_PRODUNUM
				};
				//添加设备自动识别是否在线
				cldeviceIsOnstate(para).then((res) => {
					this.ruleForm.afterSaleDetails[index].newinstalldetail.onlinestatus = this.disabled = res.data.online ? 1 : 0;
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
				let vflag = this.findElem(this.deviceCurData, "ID", row.ID);
				if(!vflag) {
					return 'warning-row';
				}
				return '';
			},
			//查询设备信息
			searchDevceinfo(index) {
				let para = {};
				if(this.deviceData.length > 0) return;
				para.userid = this.installUserId;
				para.E_STATUS = "在库";
				this.listLoading = true;
				//请求我的可安装设备
				getMyDeviceInfo(para).then((res) => {
					this.deviceData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//车上传照片删除
			carHandleRemove(file, fileList) {
				this.installPic(fileList, 1);
			},
			//车上传照点击已上传的文件链接时的钩子
			carHandlePreview(file) {
				this.$emit("changeDialogImg", file);
			},
			//车上传照片成功
			carHandleSuccess(response, file, fileList) {
				this.installPic(fileList, 1);
			},
			//删除添加的照片
			deviceHandleRemove(file, fileList) {
				this.installPic(fileList, 2);
			},
			//设备点击已上传的文件链接时的钩子
			deviceHandlePreview(file) {
				this.$emit("changeDialogImg", file);
			},
			//上传成功后的设备照片
			deviceHandleSuccess(response, file, fileList) {
				this.installPic(fileList, 2);
			},

			//删除添加的照片
			deviceHandleRemove3(file, fileList) {
				this.installPic(fileList, 3);
			},
			//设备点击已上传的文件链接时的钩子
			deviceHandlePreview3(file) {
				this.$emit("changeDialogImg", file);
			},
			//上传成功后的设备照片
			deviceHandleSuccess3(response, file, fileList) {
				this.installPic(fileList, 3);
			},
			//记录上传控件
			deviceHandleMouseover(index) {
				this.curIndex = index;
			},
			closeDialog(n) {
				this.$emit("closeDialog", 2, n);
			},
			//复制当前添加的 1车子 2设备照片
			installPic(fileList, type) {
				if(type == 1) {
					if(fileList.length == 1) {
						this.ruleForm.installpic1 = fileList[0].response;
						this.ruleForm.installpic2 = null;
						this.ruleForm.installpic3 = null;
						this.ruleForm.installpic4 = null;
						this.ruleForm.installpic5 = null;
					}
					if(fileList.length == 2) {
						this.ruleForm.installpic1 = fileList[0].response;
						this.ruleForm.installpic2 = fileList[1].response;
						this.ruleForm.installpic3 = null;
						this.ruleForm.installpic4 = null;
						this.ruleForm.installpic5 = null;
					}
					if(fileList.length == 3) {
						this.ruleForm.installpic1 = fileList[0].response;
						this.ruleForm.installpic2 = fileList[1].response;
						this.ruleForm.installpic3 = fileList[2].response;
						this.ruleForm.installpic4 = null;
						this.ruleForm.installpic5 = null;
					}
					if(fileList.length == 4) {
						this.ruleForm.installpic1 = fileList[0].response;
						this.ruleForm.installpic2 = fileList[1].response;
						this.ruleForm.installpic3 = fileList[2].response;
						this.ruleForm.installpic4 = fileList[3].response;
						this.ruleForm.installpic5 = null;
					}
					if(fileList.length == 5) {
						this.ruleForm.installpic1 = fileList[0].response;
						this.ruleForm.installpic2 = fileList[1].response;
						this.ruleForm.installpic3 = fileList[2].response;
						this.ruleForm.installpic4 = fileList[3].response;
						this.ruleForm.installpic5 = fileList[4].response;
					}
				}
				if(type == 2) {
					var index = this.$refs.upload[this.curIndex].data.ind;
					if(fileList.length == 1) {
						this.ruleForm.afterSaleDetails[index].installDetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic2 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic3 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic5 = null;
					}
					if(fileList.length == 2) {
						this.ruleForm.afterSaleDetails[index].installDetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic3 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic5 = null;
					}
					if(fileList.length == 3) {
						this.ruleForm.afterSaleDetails[index].installDetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic5 = null;
					}
					if(fileList.length == 4) {
						this.ruleForm.afterSaleDetails[index].installDetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic4 = fileList[3].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic5 = null;
					}
					if(fileList.length == 5) {
						this.ruleForm.afterSaleDetails[index].installDetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic4 = fileList[3].response;
						this.ruleForm.afterSaleDetails[index].installDetail.installpic5 = fileList[4].response;
					}
				}
				if(type == 3) {
					var index = this.$refs.upload[this.curIndex].data.ind;
					if(fileList.length == 1) {
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic2 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic3 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic5 = null;
					}
					if(fileList.length == 2) {
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic3 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic5 = null;
					}
					if(fileList.length == 3) {
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic4 = null;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic5 = null;
					}
					if(fileList.length == 4) {
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic4 = fileList[3].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic5 = null;
					}
					if(fileList.length == 5) {
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic1 = fileList[0].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic2 = fileList[1].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic3 = fileList[2].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic4 = fileList[3].response;
						this.ruleForm.afterSaleDetails[index].newinstalldetail.installpic5 = fileList[4].response;
					}
				}
			},
			/* 提交表单数据 */
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let addformpara = {
								taskId: this.curTaskId,
								properties: {}
							},
							flag = true;
						addformpara.properties = {
							installpic1: this.ruleForm.installpic1,
							installpic2: this.ruleForm.installpic2,
							installpic3: this.ruleForm.installpic3,
							installpic4: this.ruleForm.installpic4,
							installpic5: this.ruleForm.installpic5,
							afterSaleDetails: [],
							result: true,
							remark: this.ruleForm.remark
						}
						this.ruleForm.afterSaleDetails.forEach((item, index) => {
							let tmpobj = {
								newinstalldetail: {}
							};
							tmpobj.ID = item.ID;
							tmpobj.installid = item.installid;
							tmpobj.actionresult = item.actionresult;
							tmpobj.actiontype = item.actiontype;
							if(item.actiontype != "REPLACE") {
								if(!isNaN(Number(item.installDetail.installpositionname)) && this.ruleFormStatic.afterSaleDetails[index].installDetail.installpositioncode != item.installDetail.installpositionname) {
									tmpobj.newinstalldetail.installpositioncode = !isNaN(Number(item.installDetail.installpositionname)) ? item.installDetail.installpositionname : item.installDetail.installpositioncode;
									tmpobj.newinstalldetail.installpic1 = item.installDetail.installpic1;
									tmpobj.newinstalldetail.installpic2 = item.installDetail.installpic2;
									tmpobj.newinstalldetail.installpic3 = item.installDetail.installpic3;
									tmpobj.newinstalldetail.packid = item.installDetail.packid;
								} else {
									tmpobj.installpic1 = item.installDetail.installpic1;
									tmpobj.installpic2 = item.installDetail.installpic2;
									tmpobj.installpic3 = item.installDetail.installpic3;
								}
							} else {
								tmpobj.newinstalldetail = item.newinstalldetail;
							}
							addformpara.properties.afterSaleDetails.push(tmpobj)
						});
						this.addLoading = true;
						//提交审核结果
						addApprovaperSendVindicate(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '设备维修提交成功！',
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
			getCustoHistoryInfo(res) {
				this.resetForm();
				this.ruleFormStatic = res.vehicleInfo;
				this.ruleFormStatic.afterSaleDetails = res.afterSaleDetails;
				this.installUserId = res.installEmployee.userid;
				res.afterSaleDetails.forEach((item, index) => {
					this.ruleForm.afterSaleDetails.push({
						ID: item.ID,
						installid: item.installid,
						actiontype: 'REPAIR',
						actionresult: '',
						installDetail: item.installDetail,
						packid: item.packid,
						newinstalldetail: {
							packid: '',
							installpositionname: '',
							installpic1: '',
							installpic2: '',
							installpic3: ''
						}
					});
				});
			},
			//施工信息清空
			resetForm() {
				this.ruleForm = {
					installpic1: null,
					installpic2: null,
					installpic3: null,
					installpic4: null,
					installpic5: null,
					afterSaleDetails: [],
					remark: ''
				}
			}
		}
	}
</script>