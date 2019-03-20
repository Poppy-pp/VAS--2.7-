<template>
	<transition name="el-fade-in-linear">
		<router-view :windowOutHeight="windowOutHeight"></router-view>
	</transition>
</template>
<style scoped>
	@import '/static/css/common.css';
	@import '/static/css/style.css';
</style>
<script>
	import axios from 'axios';
	import '../../../static/js/json2';
	import { regPushs } from '../../api/api';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				wsUri: "ws://test.wwvas.com:9104/vasms-web/webSocketServer", //实时监控消息
				ws: ''
			}
		},
		methods: {
			// WebSocket连接回调监控
			connect() {
				let _this = this;
				if("WebSocket" in window) {
					if(!_this.wsUri) return;
					_this.ws = new WebSocket(this.wsUri);
					_this.ws.onopen = function() {
						// console.log('连接成功！')
					};
					_this.ws.onmessage = function(res) {
						_this.vasMessage(res);
					};
					_this.ws.onerror = function(event) {
						// console.log("WebSocket Error: " , event);
					};
					_this.ws.onclose = function(event) {
						// console.log(event);
					};
				} else {
					alert("您的浏览器不支持 WebSocket!");
				}
				return this;
			},
			//收到webscoket的消息  页面显示
			vasMessage(res) {
				let resdata = eval("(" + res.data + ")");
				if(resdata.type == "reg") {
					regPushs({
						"channel_id": resdata.content
					}).then((res) => {
						if(res.data.result.code == 0) {

						}
					});
				} else {
					const h = this.$createElement;
					this.$store.state.wsMessage = resdata;
					this.$notify({
						title: resdata.title,
						message: h('a', {
							style: 'color: red'
						}, resdata.content),
						offset: 100,
						type: 'warning',
						duration: 3000,
					});
				}
			},
			/* 记录用户token  并且监控所有请求 如果报错一并处理*/
			axiosCommonHandle() {
				let user = this.$store.getters.userInfo;
				axios.defaults.headers.common['token'] = user == null ? '' : user.token;
				axios.defaults.headers.common['OS'] = 'VAS';
				axios.defaults.headers.common['APP_VERSION_NAME'] = '2.2.0.1';
				axios.defaults.headers.common['APP_VERSION_CODE'] = '100';
				axios.defaults.timeout = 30000;
				/*添加请求拦截器*/
				axios.interceptors.request.use((config) => {
					/*在发送请求之前做某事*/
					return config;
				}, (error) => {
					this.$message({
						message: '请求失败!' + error,
						type: 'error'
					});
					/*请求错误时做些事*/
					return Promise.reject(error);
				});
				/*添加响应拦截器 如果token丢失提示用户重新登陆*/
				axios.interceptors.response.use((response) => {
					if(response.data && response.data.result) {
						if(response.data.result.code == 9001 && !response.data.data) {
							this.$confirm(response.data.result.desc, '错误', {
								confirmButtonText: '重新登录',
								showCancelButton: false,
								closeOnClickModal: false,
								closeOnPressEscape: false,
								center: true,
								type: 'error'
							}).then(() => {
								sessionStorage.removeItem('user');
								location.href = "login.html";
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已取消重新登录'
								});
							});
							return;
						}
					}
					if(response.data && response.data.result && response.data.result.code != 0) {
						this.$message({
							message: response.data.result.desc,
							type: 'error'
						});
					}
					return response;
				}, (error) => {
					this.$message({
						message: '响应失败!' + error,
						type: 'error'
					});
					return Promise.reject(error);
				});
				return this;
			},
			//将用户信息存入vuex
			initMainUserInfo() {
				this.$store.dispatch('updateUserinfo');
				return this;
			},
			//将检测是登录的那个系统登录页 1 2 3 存入vuex
			loginViewClass() {
				this.$store.dispatch('initNomenu');
				return this;
			},
			//当页面窗口发生变化的时候
			vasWinResize(callback) {
				window.onresize = () => {
					callback();
				}
			}
		},
		created() {
			this.initMainUserInfo().
			axiosCommonHandle().
			loginViewClass();

			//初始化窗体高
			this.windowOutHeight = $(window).height();
			this.vasWinResize(() => {
				//获取窗口高度
				this.windowOutHeight = $(window).height();
			})
		}
	}
</script>