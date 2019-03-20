<template>
	<section class="login_simple_bac" style="background:url('/static/images/login_bac2.jpg') no-repeat;">
		<div class="ltitle">车联网资产安全管理信息系统2.0</div>
		<div class="wrapper">
			<div class="container">
				<h1>Welcome</h1>
				<el-form class="form" :model="account" :rules="rules" ref="account">
					<el-form-item prop="username">
						<input type="text" class="linupt" v-model="account.username" @keyup.enter="handleSubmit" placeholder="请输入手机号" autocomplete="off">
					</el-form-item>
					<el-form-item prop="password">
						<input type="password" class="linupt" v-model="account.password" @keyup.enter="handleSubmit" placeholder="请输入登录密码" autocomplete="off">
					</el-form-item>
					<div class="rememberpsw">
						<el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
						<a class="flowPsw" href="javascript:void(0);" @click="forgetPwsSubmit">忘记密码</a>
					</div>
					<el-button type="success" class="login_button_zq" :loading="logining" @click.native.prevent="handleSubmit">登录</el-button>
					<div class="sflogin">
						<a class="qq" href="javascript:void(0);" @click.prevent="qqLogin">
							<!-- <img src="../../assets/images/simple_qq.png"> -->
							<span class="iconfont icon-qq img" style="font-size:50px;"></span>
						</a>
						<a class="wx" href="javascript:void(0);"  @click.prevent="wxLogin">
							<!-- <img src="../../assets/images/simple_wx.png"> -->
							<span class="iconfont icon-qunfengweixin img" style="font-size:50px;"></span>
						</a>
					</div>
				</el-form>
			</div>
		</div>
		<p class="rhesis">决心攀登高峰的人，总能找到通往山顶的路</p>
		
		<!-- 忘记用户密码 start-->
		<el-dialog title="找回密码" :modal-append-to-body="false" :visible.sync="editPswDialogVisible" class="setThemeDialog mw500 mobileBdpdt20" :close-on-click-modal="false" :close-on-press-escape="false" @close="forgetClose">
			<el-steps :space="bfSpace" :active="forgetActive" center="center" align-center>
				<el-step title="填写账户名"></el-step>
				<el-step title="验证身份"></el-step>
				<el-step title="设置新密码"></el-step>
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
				<el-button type="primary" v-if="forgetActive == 2" @click="checkCode" :loading="editPswLoading">下一步</el-button>
				<el-button type="primary" v-if="forgetActive == 3" @click="editPswSubmit" :loading="editPswLoading">提交</el-button>
			</div>
		</el-dialog>
		<!-- 忘记用户密码 end-->
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
				editPswDialogVisible: false,
				editPswLoading: false,
				account: {
					username: '',
					password: '',
					//登陆成功后返回token
					remember_me: true
				},
				noMenu: 3,
				rules: {
					username: [{
						required: true,
						message: " ",
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: " ",
						trigger: 'blur'
					}, ]
				},
				pswForm: {
					mobile: '',
					new_pwd: '',
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
			//忘记密码窗口关闭
			forgetClose() {
				this.$emit("forgetClose");
			},
			//检查验证码是否正确
			checkCode() {
				this.$emit("checkCode");
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
			qqLogin() {
				this.$emit("qqLogin");
			},
			wxLogin() {
				this.$emit("wxLogin");
			},
			handleSubmit() {
				this.$emit("handleSubmit");
			},
			forgetPwsSubmit() {
				this.$emit("forgetPwsSubmit");
			},
			editPswSubmit() {
				this.$emit("editPswSubmit");
			}
		},
		mounted() {
			//判断用户是否记住密码
			this.$emit("rememberMeHandel");
		}
	}
</script>