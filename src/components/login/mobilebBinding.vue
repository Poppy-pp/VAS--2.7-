<template>
	<section style="overflow:hidden;">
		<!-- qq手机绑定 start-->
		<el-dialog title="手机绑定" :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="editPswDialogVisible" class="setThemeDialog mw500 mobileBdpdt20" @close="forgetClose">
			<el-steps :space="bfSpace" :active="forgetActive" center="center" align-center>
				<el-step title="填写账户名"></el-step>
				<el-step title="验证身份"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<el-form label-position="left" label-width="80px" :model="pswForm" ref="pswForm" :rules="pswRules">
				<el-col :span="24" v-if="forgetActive == 1" style="margin-bottom:20px;">
					<el-form-item label="账户名" prop="mobile" class="wbf50 autocenter">
						<el-input v-model="pswForm.mobile" placeholder="请输入用户名或手机号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="forgetActive == 2">
					<el-form-item label="绑定手机" prop="" class="wbf50 autocenter">
						<el-input v-model="pswForm.mobile" readonly></el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="code" class="wbf50 autocenter mt10">
						<el-input placeholder="请输入验证码" v-model="pswForm.code">
							<el-button slot="append" @click="getCode">{{!isGetCode?'获取验证码':djTime+'秒'}}</el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="forgetActive == 3">
					<el-form-item label="新密码" prop="new_pwd" class="wbf50 autocenter">
						<el-input v-model="pswForm.new_pwd" placeholder="请输入新密码"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editPswDialogVisible = false">取消</el-button>
				<el-button type="primary" v-if="forgetActive == 1" @click="checkMoblie" :loading="editPswLoading">下一步</el-button>
				<el-button type="primary" v-if="forgetActive == 2" @click="editPswSubmit" :loading="editPswLoading">提交</el-button>
			</div>
		</el-dialog>
		<!-- qq手机绑定 end-->
	</section>
</template>
<style type="text/css">
	@import '/static/css/common.css';
	@import '/static/css/login_simple.css';
</style>
<script>
	export default {
		data() {
			return {
				bfSpace: '30%',
				djTime: 60,
				isGetCode: false,
				forgetActive: 1,
				logining: false,
				interval: '',
				noMenu: 3,
				editPswDialogVisible: true,
				editPswLoading: false,
				pswForm: {
					mobile: '',
					openid: '',
					code: ''
				},
				pswRules: {
					mobile: [{
						required: true,
						message: "请输入手机号",
						trigger: 'blur'
					}, ],
					new_pwd: [{
						required: true,
						message: "请输入新密码",
						trigger: 'blur'
					}, ],
					code: [{
						required: true,
						message: "请输入验证码",
						trigger: 'blur'
					}, ]
				},
				checked: false
			}
		},
		methods: {
			//手机绑定窗口关闭
			forgetClose() {
				window.location.href="/module/login.html"
			},
			//检查用户是否存在
			checkMoblie() {
				this.$emit("checkMoblie");
			},
			//获取验证码
			getCode() {
				if(this.isGetCode) return;
				this.interval = setInterval(() => {
					if(this.djTime == 0) {
						clearInterval(this.interval);
						this.djTime = 60;
						this.isGetCode = false;
					} else {
						this.djTime--;
					}
				}, 1000);
				this.isGetCode = true;
				this.$emit("getCode");
			},
			editPswSubmit() {
				this.$emit("editQQPswSubmit");
			}
		}
	}
</script>