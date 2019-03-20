<!--* 
* @description: 拆除中心（设备安装） 
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
					<el-collapse-item title="设备拆除信息" name="2" class="lefw10">
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
	import { addApprovaperSendVindicateRmove, getPdInstallUserList, getInstallPositionCode, getMyDeviceInfo, cldeviceIsOnstate } from '../../../api/api';
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
				//是否上线
				disabled: false,
				ruleForm: { //启动报单提交表单信息
					installpic1: null,
					installpic2: null,
					installpic3: null,
					installpic4: null,
					installpic5: null,
					carNumber: "",
					carFrame: "",
					carPlate: "",
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
				//添加设备信息
				this.ruleForm.afterSaleDetails[index].newinstalldetail = {
					packid: row.ID
				};
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
							carNumber: this.ruleFormStatic.vin,
							carFrame: this.ruleFormStatic.licenseplatenum,
							carPlate: '',
							installpic1: this.ruleForm.installpic1,
							installpic2: this.ruleForm.installpic2,
							installpic3: this.ruleForm.installpic3,
							afterSaleDetails: [],
							result: true,
							remark: this.ruleForm.remark
						}
						this.ruleForm.afterSaleDetails.forEach((item, index) => {
							addformpara.properties.afterSaleDetails.push({
								ID: item.ID,
								packid: item.packid
							});
						});
						this.addLoading = true;
						//提交审核结果
						addApprovaperSendVindicateRmove(addformpara).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '设备拆除提交成功！',
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
				console.log(res)
				this.ruleFormStatic.afterSaleDetails = res.afterSaleDetails;
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
		},
		/*初始化页面数据*/
		created() {}
	}
</script>