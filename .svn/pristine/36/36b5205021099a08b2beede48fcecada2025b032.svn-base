<!-- gis.wwvas.com登陆页面 -->
<template>
	<section class="login-gis">
		<div id="botAgregar"></div>
		<div class="lc-block toggled" id="l-login">
			<h1 class="lean">车辆位置服务系统2.0</h1>
			<el-form class="form" :model="account" :rules="rules" ref="account">
				<el-form-item prop="username">
					<div class="input-group m-b-20">
						<span class="input-group-addon">
                            <i class="zmdi1 iconfont icon-ren"></i>
                        </span>
						<div :class="isfocus?'fg-line fg-toggled':'fg-line'">
							<input type="text" class="form-control" v-model="account.username" @keyup.enter="handleSubmit" @focus="isfocus = true" @blur="isfocus = false" placeholder="请输入账号">
						</div>
					</div>
				</el-form-item>
				<el-form-item prop="password">
					<div class="input-group m-b-20">
						<span class="input-group-addon">
                            <i class="zmdi1 iconfont icon-mima"></i>
                        </span>
						<div :class="!isfocusPsw?'fg-line fg-toggled':'fg-line'">
							<input type="password" class="form-control" v-model="account.password" @keyup.enter="handleSubmit" @focus="isfocusPsw = false" @blur="isfocusPsw = true" placeholder="请输入密码">
						</div>
					</div>
				</el-form-item>
				<a href="javascript:void(0);" class="btn btn-login btn-danger btn-float" @click="handleSubmit">
					<i class="zmdi2 iconfont icon-jiantou1you"></i>
				</a>
			</el-form>
		</div>
	</section>
</template>
<style type="text/css">
	@import '/static/css/common.css';
	@import '/static/css/login_gis.css';
</style>
<script>
	import 'static/js/yezi';
	export default {
		data() {
			return {
				isfocus: false,
				isfocusPsw: true,
				account: {
					username: '',
					password: '',
					//登陆成功后返回token
					remember_me: true
				},
				noMenu: 1,
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
			}
		},
		methods: {
			handleSubmit() {
				this.$emit("handleSubmit");
			}
		},
		mounted() {
			$.AutomLeafStart({
				leafsfolder: "../../../static/images/yezi/",
				howmanyimgsare: 8,
				initialleafs: 10,
				maxYposition: -10,
				multiplyclick: true,
				multiplynumber: 2,
				infinite: true,
				fallingsequence: 2000
			});
		}
	}
</script>