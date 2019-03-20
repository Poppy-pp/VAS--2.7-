<template>
	<section>
	</section>
</template>



<script>
	import 'static/layuiIM/im/message.js?v=1';
	import 'static/layuiIM/im/messagebody';
	import 'static/layuiIM/layui/layui';
	import util from '../../common/js/util';
	import imUtil from 'static/layuiIM/im/util';
	import {} from '../../api/api';

	export default {
		data() {
			return {
				sender: 1,
				socket: '',
				reconnectflag: false,
				websocketurl: "ws://139.219.98.197:2001/ws" //ws://{ip}:{端口}/{java后端websocket配置的上下文}
			}
		},
		methods: {
			//判断浏览器是否支持webscoket 支持创建对象
			createWebSocket(url, callbak) {
				if(!window.WebSocket) {
					window.WebSocket = window.MozWebSocket;
				}
				if(window.WebSocket) {
					this.socket = new WebSocket(url);
					this.socket.binaryType = "arraybuffer";
					callbak();
				} else {
					layer.msg("你的浏览器不支持websocket！");
				}
			},
			//重连
			reconnect(url, callbak) {
				if(this.reconnectflag) return;
				this.reconnectflag = true;
				//没连接上会一直重连，设置延迟避免请求过多
				setTimeout(function() {
					this.createWebSocket(url, callbak);
					this.reconnectflag = false;
				}, 2000);
			},
			initLayuiIM() {
				var _this = this;
				layui.config({
					dir: '/static/layuiIM/layui/'
				});
				layui.use(['layer', 'jquery'], function() {
					var layer = layui.layer,
						$ = layui.jquery;

					// 发送消息
					var sendMsg = function(data) {
						var message = new proto.Model();
						var content = new proto.MessageBody();
						message.setMsgtype(4);
						message.setCmd(5);
						message.setToken(data.mine.id);
						message.setSender(data.mine.id);
						message.setReceiver(data.to.id); // 好友ID
						content.setContent(data.mine.content);
						content.setType(0)
						message.setContent(content.serializeBinary())
						_this.socket.send(message.serializeBinary());
					}
					// 拉取离线消息
					var showOfflineMsg = function(layim) {
						$.ajax({
							type: "post",
							url: "../jim/message/offline?receiveuser=" + _this.sender,
							async: true,
							success: function(data) {
								if(data.length < 3) {
									return;
								}
								var dataObj = data;
								if(dataObj != null && dataObj.length > 0) {
									for(var i = 0; i < dataObj.length; i++) {
										layim.getMessage({
											username: dataObj[i].sendusername,
											id: dataObj[i].senduser,
											type: "friend",
											content: dataObj[i].content,
											timestamp: dataObj[i].createdate
										});
									}
								}
							}
						});
					}

					layui.use('layim', function(layim) {
						// 基础配置
						layim.config({

							// 初始化接口
							init: {
								url: '../../static/layuiIM/json/getList.json',
								data: {}
							},
							min: true,
							title: "我的IM",
							right: '10px'
								// 或采用以下方式初始化接口
								/*
								 * ,init: { mine: { "username": "LayIM体验者" //我的昵称 ,"id": "100000123"
								 * //我的ID ,"status": "online" //在线状态 online：在线、hide：隐身 ,"remark":
								 * "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名 ,"avatar": "a.jpg" //我的头像 } ,friend: []
								 * ,group: [] }
								 */

								// 查看群员接口
								,
							members: {
								url: '../../static/layuiIM/json/getMembers.json',
								data: {}
							}

							// 上传图片接口
							,
							uploadImage: {
								url: '/upload/image' // （返回的数据格式见下文）
									,
								type: '' // 默认post
							}

							// 上传文件接口
							,
							uploadFile: {
								url: '/upload/file' // （返回的数据格式见下文）
									,
								type: '' // 默认post
							}

							,
							isAudio: true // 开启聊天工具栏音频
								,
							isVideo: true // 开启聊天工具栏视频

								// 扩展工具栏
								,
							tool: [{
									alias: 'code',
									title: '代码',
									icon: '&#xe64e;'
								}]

								// ,brief: true //是否简约模式（若开启则不显示主面板）

								// ,title: 'WebIM' //自定义主面板最小化时的标题
								// ,right: '100px' //主面板相对浏览器右侧距离
								// ,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
								,
							initSkin: '5.jpg' // 1-5 设置初始背景
								// ,skin: ['aaa.jpg'] //新增皮肤
								// ,isfriend: false //是否开启好友
								// ,isgroup: false //是否开启群组
								// ,min: true //是否始终最小化主面板，默认false
								,
							notice: true // 是否开启桌面消息提醒，默认false
								// ,voice: false //声音提醒，默认开启，声音文件为：default.mp3

								,
							msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' // 消息盒子页面地址，若不开启，剔除该项即可
								,
							find: layui.cache.dir + 'css/modules/layim/html/find.html' // 发现页面地址，若不开启，剔除该项即可
								,
							chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' // 聊天记录页面地址，若不开启，剔除该项即可
						});

						layim.on('online', function(status) {
							// console.log(status); //获得online或者hide
							// web_this.socket发送在线或离线消息给好友
						});
						// 监听发送消息
						layim.on('sendMessage', function(data) {
							var To = data.to;
							sendMsg(data);
						});
						var initEventHandle = function() {
							// 收到消息后
							_this.socket.onmessage = function(event) {
								if(event.data instanceof ArrayBuffer) {
									var msg = proto.Model.deserializeBinary(event.data); // 如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
									var msgCon = proto.MessageBody.deserializeBinary(msg
										.getContent());
									var cache = layui.layim.cache();
									var local = layui.data('layim')[cache.mine.id];
									var username = "",
										avatar = "",
										friend = false;
									layui.each(cache.friend, function(index1, item1) {
										layui.each(item1.list, function(index, item) {
											if(item.id == msg.getSender()) {
												username = item.username;
												avatar = item.avatar;
												return friend = true;
											}
										});
										if(friend)
											return true;
									});

									// 心跳消息
									if(msg.getCmd() == 2) {
										// 发送心跳回应
										msg.setCmd(1);
										msg.setSender(cache.mine.id);
										_this.socket.send(msg.serializeBinary());
									} else if(msg.getCmd() == 3) {
										// 上线
										if(msg.getSender() != layim.cache().mine.id) {
											layer.msg(username + "上线了！");
											layim.setFriendStatus(msg.getSender(), 'online');
										}
									} else if(msg.getCmd() == 4) {
										// 下线
										if(msg.getSender() != layim.cache().mine.id) {
											layer.msg(username + "已下线！");
											layim.setFriendStatus(msg.getSender(), 'offline');
										}
									} else {
										// 显示非自身消息
										if(msg.getSender() != layim.cache().mine.id) {
											// 不显示用户组消息
											console.info(msg);
											if(msg.getGroupid() == null ||
												msg.getGroupid().length < 1) {
												layim.getMessage({
													username: username,
													avatar: avatar + "?" +
														new Date().getTime(),
													id: msg.getSender(),
													type: "friend",
													content: msgCon.getContent(),
													timestamp: msg.getTimestamp()
												});
											} else {
												layim.getMessage({
													username: username,
													avatar: avatar + "?" +
														new Date().getTime(),
													id: msg.getGroupid(),
													type: "group",
													content: msgCon.getContent(),
													timestamp: msg.getTimestamp()
												});
											}
										}
									}
								} else {
									var data = event.data; // 后端返回的是文本帧时触发
								}
							};
							// 连接后
							_this.socket.onopen = function(event) {
								_this.sender = layim.cache().mine.id;
								var message = new proto.Model();
								var browser = imUtil.BrowserUtil.info();
								message.setVersion("1.0");
								message.setDeviceid("");
								message.setCmd(1);
								message.setSender(layim.cache().mine.id);
								message.setMsgtype(1);
								message.setFlag(1);
								message.setPlatform(browser.name);
								message.setPlatformversion(browser.version);
								message.setToken(layim.cache().mine.id);
								var bytes = message.serializeBinary();
								_this.socket.send(bytes);
								showOfflineMsg(layim);
							};
							// 连接关闭
							_this.socket.onclose = function(event) {
								layim.setFriendStatus(layim.cache().mine.id, 'offline');
								layer.confirm('您已下线，重新上线?', function(index) {
									_this.reconnect(_this.websocketurl, initEventHandle);
									layer.close(index);
									showOfflineMsg(layim)
								});
							};
							_this.socket.onerror = function() {
								_this.reconnect(_this.websocketurl, initEventHandle);
								showOfflineMsg(layim)
							};
						}

						_this.createWebSocket(_this.websocketurl, initEventHandle);
					});

				});
			}
		},
		mounted() {
			/** 用户信息初始化start*/
			var user = JSON.parse(sessionStorage.getItem('user'));
			this.initLayuiIM();
		},
		created() {}
	}
</script>
<style lang="css" scoped>
	@import '/static/layuiIM/layui/css/layui.css';
</style>