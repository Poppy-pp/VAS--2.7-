<!--* 
* @description: 保险出单（完成） 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section>
		<el-row>
			<el-col :span="24" class="cbstyle">
				<el-collapse v-model="activeNames" class="bdcoll">
					<el-collapse-item title="保险出单操作" name="1" class="lefw10">
						<el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline>
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item label="保险公司" class="mt10" prop="insurancecorpid">
										<el-select v-model="ruleForm.insurancecorpid" :loading="receLoading" @visible-change="insuranceCompanyList" filterable placeholder="请选择">
											<el-option v-for="item in insuranceCompany" :key="item.corpname" :label="item.corpname" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="保单号" class="mt10" prop="serialnum">
										<el-input type="text" placeholder="请输入保单号" v-model="ruleForm.serialnum"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="出单日期" class="mt10" prop="issuedate">
										<el-date-picker type="date" placeholder="选择出单日期" v-model="ruleForm.issuedate" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="保险生效日期" class="mt10" prop="effectivedate">
										<el-date-picker type="date" @change="effectivedateChange" placeholder="选择保险生效日期" v-model="ruleForm.effectivedate" style="width: 100%;"></el-date-picker>
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
								<el-col :span="8">
									<el-form-item label="保险价格" class="mt10" prop="price">
										<el-input type="text" placeholder="请输入保险价格" v-model="ruleForm.price">
											<template slot="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>

								<el-col :span="8">
									<el-form-item label="报单状态" class="mt10" prop="insurancestatus">
										<el-radio-group size="small" v-model="ruleForm.insurancestatus">
											<el-radio-button label="出单">出单</el-radio-button>
											<!-- <el-radio-button label="预投保">预投保</el-radio-button> -->
											<el-radio-button label="拒绝">拒绝</el-radio-button>
										</el-radio-group>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="备注" class="mt10" prop="remark">
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
	</section>
</template>
<style scoped>
	@import '../css/customerDeclaration.css';
</style>

<script>
	import util from '../../../common/js/util';
	import { getTodoInfoList, addApprovaperInsurance, getCorpNameInsuList } from '../../../api/api';

	export default {
		props: ['curTaskId'],
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
				//保险公司出单
				insuranceCompany: [],
				//启动报单提交表单信息
				ruleForm: {
					insurancecorpid: '',
					serialnum: '',
					issuedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					effectivedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					expiredate: util.getDateThreeYers(util.addReduceDate(new Date(), -1), 3),
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
				activeNames: ['1'],
				addLoading: false,
				receLoading: false,
			};
		},
		methods: {
			//改变生效日期 同步 失效日期 有效期3年
			effectivedateChange(val) {
				var dayjian = util.addReduceDate(new Date(val), -1);
				this.ruleForm.expiredate = util.getDateThreeYers(dayjian, 3);
			},
			//初始化保险公司
			insuranceCompanyList(r) {
				if(!r || this.insuranceCompany.length > 0) return;
				this.receLoading = true;
				getCorpNameInsuList().then((res) => {
					this.insuranceCompany = res.data.data.records;
					this.receLoading = false;
				});
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
									message: '出单提交成功！',
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
			//获取当前状态节点所有信息
			getCustoHistoryInfo(res, row) {
				let dayjia = util.addReduceDate(new Date(res.installactualdate), 1);
				this.ruleForm.effectivedate = util.formatDate.format(dayjia, 'yyyy-MM-dd');
				this.ruleForm.expiredate = util.getDateThreeYers(new Date(res.installactualdate), 3);
			},
			//关闭父类弹窗
			closeDialog(n) {
				this.$emit("closeDialog", 3, n);
			},
			/* 重置表单数据 */
			resetForm() {
				//启动报单提交表单信息
				this.ruleForm = {
					insurancecorpid: '',
					serialnum: '',
					issuedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					effectivedate: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					expiredate: util.getDateThreeYers(new Date(), 3),
					indemnitylimit: '',
					price: '',
					insurancestatus: '出单',
					remark: ''
				}
			}
		}
	}
</script>