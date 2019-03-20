<!--* 
* @description: 拆除订单（派单） 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<el-row>
		<el-col :span="24" class="cbstyle">
			<el-collapse v-model="activeNames" class="bdcoll">
				<el-collapse-item title="派单操作" name="1" class="lefw10">
					<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="安装小组" class="mt20" prop="send_work_group">
									<el-select @change="changeInstallGrounp" value-key="groupname" @visible-change="visInitGroup" :loading="groupLoading" filterable v-model="ruleForm.send_work_group" placeholder="请选择">
										<el-option v-for="item in workGroup" :key="item.groupname" :label="item.groupname" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="指定安装人员" class="mt20" prop="send_work_user">
									<el-select v-model="ruleForm.send_work_user" value-key="employeename" filterable :loading="userLoading" placeholder="请选择">
										<el-option v-for="item in workUser" :label="item.employeename" :key="item.employeename" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="拆除联系人" class="mt20" prop="contactperson">
									<el-input type="text" placeholder="请输入拆除联系人姓名" v-model="ruleForm.contactperson"></el-input>
								</el-form-item>
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
						</el-row>
						<el-col class="footer_but_bd" :span="24">
							<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
							<el-button @click="closeDialog(0)" style="margin-left:5px;float:right;">取消</el-button>
						</el-col>
					</el-form>
				</el-collapse-item>
			</el-collapse>
		</el-col>
	</el-row>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import util from '../../../common/js/util';
	import { addApprovaperSendVindicateRmove, getPdInstallGroupList, getPdInstallUserList } from '../../../api/api';
	export default {
		props: ['curTaskId'],
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
				workGroup: [],
				workUser: [],
				ruleForm: { //启动报单提交表单信息
					send_work_group: '',
					send_work_user: '',
					contactmobile:'',
					contactperson:'',
					result: true,
					remark: ''
				},
				ruleFormStatic: {
					flowData: {},
					installGroupInfo: {}
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
				activeNames: ['1'],
				activeName: ['1'],
				addLoading: false,
				isFlag: true,
				groupLoading: false,
				userLoading: false
			};
		},
		methods: {
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
							result: this.ruleForm.result,
							contactperson:this.ruleForm.contactperson,
							contactmobile:this.ruleForm.contactmobile,
							remark: this.ruleForm.remark
						};
						this.addLoading = true;
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
								this.closeDialog(1);
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
			//父级如果是点击查询回调
			getCustoHistoryInfo(res) {
				this.resetForm();
				this.ruleFormStatic = res;
				this.ruleForm.contactmobile = res.contactmobile;
				this.ruleForm.contactperson = res.contactperson;
				this.ruleForm.send_work_group = '';
				this.ruleForm.send_work_user = '';
				this.isFlag = true;
			},
			//关闭当前窗口
			closeDialog(n) {
				this.$emit("closeDialog", 1, n);
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
		}
	}
</script>