<template>
	<section class="chart-container">
		<el-row :gutter="20">
			<el-col :span="ec16" id="vas_leftBox">
				<el-row :gutter="20" class="cards">
					<el-col :span="ec6" class="mgb110">
						<div class="card card-orange hover" @mouseenter="cardMouseenter" @mouseleave="cardMouseleave">
							<div class="front">
								<div class="media">
									<span class="iconfont icon-cheliang1"></span>
									<div class="media-body">
										<small>本月安装车辆</small>
										<h2 id="carAannum">0</h2>
									</div>
								</div>
							</div>
							<div class="back">
								<a href="javascript:void(0);" @click.prevent="$router.push({ path: '/VehicleInfo' })">
									<span class="iconfont icon-cheliang1"></span>
									<span>点击查看</span>
								</a>
							</div>
						</div>
					</el-col>

					<el-col :span="ec6" class="mgb210">
						<div class="card card-blue hover" @mouseenter="cardMouseenter" @mouseleave="cardMouseleave">
							<div class="front">
								<div class="media">
									<span class="iconfont icon-shebeianzhuang"></span>
									<div class="media-body">
										<small>本月安装设备</small>
										<h2 id="proAnnum">0</h2>
									</div>
								</div>
							</div>
							<div class="back">
								<a href="javascript:void(0);" @click.prevent="$router.push({ path: '/ProductInfo' })">
									<span class="iconfont icon-shebeianzhuang"></span>
									<span>点击查看</span>
								</a>
							</div>
						</div>
					</el-col>

					<el-col :span="ec6" class="mgb310">
						<div class="card card-purple hover" @mouseenter="cardMouseenter" @mouseleave="cardMouseleave">
							<div class="front">
								<div class="media">
									<span class="iconfont icon-pingtai"></span>
									<div class="media-body">
										<small>平台设备接入</small>
										<h2 id="prijeNUm">0</h2>
									</div>
								</div>
							</div>
							<div class="back">
								<a href="javascript:void(0);" @click.prevent="$router.push({ path: '/DeviceAccess' })">
									<span class="iconfont icon-pingtai"></span>
									<span>点击查看</span>
								</a>
							</div>
						</div>
					</el-col>

					<el-col :span="ec6" class="mgb410">
						<div class="card card-cyan hover" @mouseenter="cardMouseenter" @mouseleave="cardMouseleave">
							<div class="front">
								<div class="media">
									<span class="iconfont icon-gongzuotai1"></span>
									<div class="media-body">
										<small>平台车辆接入</small>
										<h2 id="prijeNUm1">0</h2>
									</div>
								</div>
							</div>
							<div class="back">
								<a href="javascript:void(0);">
									<span class="iconfont icon-gongzuotai1"></span>
									<span>点击进入</span>
								</a>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-card class="box-card pt5 shjpp2">
					<div slot="header" class="clearfix">
						<span class="ctitle"><i class="iconfont icon-icon" aria-hidden="true"></i> 订单分析</span>
					</div>
					<div class="text item">
						<div id="chartColumn" style="width:100%;height:338px;"></div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="ec8" class="tqmodel">
				<div class="weather-card madrid">
					<!-- 显示动图 -->
					<div v-if="weather" class="tq">
						<div class="dayuBck" v-if="weather.weather.indexOf('小雨') > -1 || weather.weather.indexOf('阵雨') > -1">
							<div class="rainy"></div>
						</div>
						<div class="baoyuBck" v-if="weather.weather.indexOf('暴雨') > -1  || weather.weather.indexOf('大雨') > -1">
							<div class="stormy"></div>
						</div>
						<div class="qingBck" v-if="weather.weather.indexOf('晴') > -1">
							<div class="sunny"></div>
						</div>
						<div class="duoyunBck" v-if="weather.weather.indexOf('多云') > -1">
							<div class="rainbow"></div>
						</div>
						<div class="xiaoyuBck" v-if="weather.weather.indexOf('雪') > -1">
							<div class="snowy"></div>
						</div>
						<div class="yinBck" v-if="weather.weather.indexOf('阴') > -1">
							<div class="cloudy"></div>
						</div>
					</div>
					<!-- 显示描述信息 -->
					<section v-if="weather">
						<div>
							<span class="date">{{ weather.reporttime.split(' ')[0] }}</span>
						</div>
						<div>
							<span calss="weather">{{ weather.weather }}</span>
						</div>
						<div>
							<span class="temperature">{{ weather.temperature + 'C°' }}</span>
						</div>
						<div>
							<span class="wind">{{ '风向:' + weather.winddirection + ' / 风力:' + weather.windpower }}</span>
						</div>
						<div class="message">
							<span style="color: #444;margin-right: 19px;">今日限行</span>
							<span style="font-size:5rem;">{{ message }}</span>
						</div>
					</section>
				</div>
			</el-col>
			<el-col :span="ec8">
				<el-card class="box-card pt5">
					<div slot="header" class="clearfix">
						<span class="ctitle"><i class="iconfont icon-bingtu" aria-hidden="true"></i> 今日订单量</span>
					</div>
					<div class="text item">
						<div id="chartPie" style="width:100%; height:230px;"></div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20" class="home_news_list" style="margin-bottom:0;">
			<el-col :span="ec8" class="mediaForipad listHomeCor">
				<el-tabs v-model="activeName" type="border-card" class="nlchlid">
					<el-tab-pane name="first">
						<span slot="label"><i class="iconfont icon-xinwen"></i> 新闻中心</span>
						<el-row :gutter="20" v-for="item in newlist" @click.native="newdetail(item.id)" class="showline">
							<el-col :span="16" class="autow">
								{{ item.title }}
							</el-col>
							<el-col :span="8" class="fixedw">
								{{ item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd') }}
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane name="second">
						<span slot="label"><i class="iconfont icon-tongzhigonggao"></i> 通知公告</span>
						<el-row :gutter="20" v-for="item in noticeList" @click.native="newdetail(item.id)" class="showline">
							<el-col :span="16" class="autow">
								{{ item.title }}
							</el-col>
							<el-col :span="8" class="fixedw">
								{{ item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd') }}
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane name="fourth">
						<span slot="label"><i class="iconfont icon-wenjian"></i> 红头文件</span>
						<el-row :gutter="20" v-for="item in redFileList" @click.native="newdetail(item.id)" class="showline">
							<el-col :span="16" class="autow">
								{{ item.title }}
							</el-col>
							<el-col :span="8" class="fixedw">
								{{ item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd') }}
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-col>

			<el-col :span="ec8" class="mediaForipad listHomeCor">
				<el-tabs v-model="activeMessage" type="border-card" class="nlchlid">
					<el-tab-pane name="first">
						<span slot="label"><i class="iconfont icon-liuyanpinglun"></i> 留言板</span>
						<el-form label-width="40px">
							<el-input type="textarea" autosize placeholder="请输入留言内容" v-model="content"></el-input>
							<el-form-item style="float:right;margin:10px 0 0 0;">
								<el-button-group>
									<el-button type="info" size="small" icon="el-icon-plus" @click="add()">添加</el-button>
									<el-button type="info" size="small" icon="el-icon-refresh" @click="handleReset">重置</el-button>
								</el-button-group>
							</el-form-item>
						</el-form>
					</el-tab-pane>
					<el-tab-pane name="second">
						<span slot="label"><i class="iconfont icon-list-2-copy"></i> 留言列表</span>
						<!-- 显示已有留言 -->
						<div class="text item">
							<el-row :gutter="20" v-for="item in leaveMsgList" class="showline" @click.native="msgdetail(item.id)">
								<el-col :span="16" class="autow">
									{{ htmlTransfer(item.content) }}
								</el-col>
								<el-col :span="8" class="fixedw">
									{{ item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd') }}
								</el-col>
								<!-- <el-col :span="6" class="fixedw c4">
                                            43 <i class="iconfont icon-pinglun"></i>
                                        </el-col> -->
							</el-row>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>

			<el-col :span="ec8" class="mediaForipad">
				<el-card class="box-card pt5 nlchlid">
					<div slot="header" class="clearfix">
						<span class="ctitle"><i class="iconfont icon-xiazai"></i> 下载App</span>
						<div class="mright">
							<span :class="isactivex == 1?'eCar on':'eCar'" @click="radioHomeHandle(1)">E车宝</span>
							<span :class="isactivex == 2?'wCar on':'wCar'" @click="radioHomeHandle(2)">万网优车(企业版)</span>
							<!-- <span :class="isactivex == 3?'fCar on':'fCar'" @click="radioHomeHandle(3)">万网优车(个人版)</span> -->
							<span :class="isactivex == 3?'ECar on':'ECar'" @click="radioHomeHandle(3)">安逸途</span>
						</div>
					</div>

					<div class="text item downloadapppa">
						<el-row :gutter="20" class="downloadapp" v-show="isactivex == 1">
							<el-col :span="12" class="hewm">
								<div id="iosCode"></div>
								<p>ios版下载</p>
							</el-col>
							<el-col :span="12" class="hewm">
								<div id="androidCode"></div>
								<p>Android版下载</p>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="downloadapp" v-show="isactivex == 2">
							<el-col :span="12" class="hewm">
								<div id="yciosCode"></div>
								<p>ios版下载</p>
							</el-col>
							<el-col :span="12" class="hewm">
								<div id="ycandroidCode"></div>
								<p>Android版下载</p>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="downloadapp" v-show="isactivex == 3">
							<el-col :span="12" class="hewm">
								<img width="110" height="110" src="/static/images/ios.png">
								<p>ios版下载</p>
							</el-col>
							<el-col :span="12" class="hewm">
								<img width="110" height="110" src="/static/images/Android.png">
								<p>Android版下载</p>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!--详情界面-->
		<el-dialog :modal-append-to-body="false" :title="dtitle" top="10%" class="ql-editor" :visible.sync="addFormVisible" :close-on-click-modal="false"></el-dialog>
	</section>
</template>

<script>
	import echarts from 'echarts';
	import util from '../../common/js/util';
	import '../../../static/js/jqueryqr';
	import '../../../static/js/qrcode';
	import '../../../static/js/jquery.animateNumber.min';
	import { getDeclareStatistics, getIndexBoxInfo, getOrderInfo, getArtcileList, getSelectListArtcile, getArtcileListItem, getoaHomeBarStartList, getoaHomeBarEndList, getAndroidCode, addArtcile } from '../../api/api';
	export default {
		props: ['date', 'message', 'weather'],
		data() {
			return {
				//默认选众下载地址
				activeName: 'first',
				activeMessage: 'first',
				user: {}, //得到的当前用户信息
				newlist: [], //新闻
				noticeList: [], //通知
				redFileList: [], //红头
				leaveMsgList: [], //留言
				content: '', //存储留言内容
				fmtdata: util,
				informList: '',
				addFormVisible: false,
				ec16: 16,
				ec8: 8,
				ec6: 6,
				isactivex: 1,
				toolbox: true,
				chartColumn: null,
				chartPie: null,
				updatedNum: 0, //第一次组件更新完成
				dtitle: "详情",
				// 留言板
				content: '',
				mydata: [],
				dialogVisible: false,
				nowIndex: -100,
				csd: 0
			}
		},
		methods: {
			// 留言板html转换——去掉html标签
			htmlTransfer(ht) {
				if($(ht).length == 0) { //当没有html标签时
					return ht;
				} else { //有html标签时，返回纯文本内容
					return $(ht).text();
				}
			},
			// 留言板
			add() {
				if(this.content == '') {
					this.$message.error('请填写留言！');
				} else {
					let para = {
						content: this.content,
						categoryid: 22, //留言板类型
						author: this.user.employeeInfo.employeename, //当前作者
						releasedate: this.fmtdata.formatDate.format(new Date(), 'yyyy-MM-dd'), //当前日期
						isdelete: 0,
					}

					addArtcile(para).then((res) => {
						this.$message({
							message: '新增留言成功',
							type: 'success'
						});
						this.initNewList(); //加载文章
					});
					this.content = '';
				}
			},
			handleReset() { //重置留言
				this.content = '';
			},
			//初始化文章
			initNewList() {
				// 新闻中心
				var params = {
					doctype: 10,
					showCount: 5,
					categoryid: 1, //文章类型——新闻
				};
				getArtcileList(params).then((res) => { //获取新闻
					this.newlist = res.data.data.records;
				});
				// 通知公告
				var params = {
					doctype: 8,
					showCount: 5,
					categoryid: 2, //文章类型——通知
				};
				getArtcileList(params).then((res) => {
					this.noticeList = res.data.data.records;
				});
				// 红头文件
				var params = {
					doctype: 9,
					showCount: 5,
					categoryid: 3, //文章类型——红头
				};
				getArtcileList(params).then((res) => {
					this.redFileList = res.data.data.records;
				});
				// 留言板
				var params = {
					showCount: 5,
					categoryid: 22, //文章类型——留言板
				};
				getSelectListArtcile(params).then((res) => {
					this.leaveMsgList = res.data.data.records;
				});
			},
			//进入文章详情
			newdetail(id) {
				let params = {
					id: id
				}
				this.addFormVisible = true;
				getArtcileListItem(params).then((res) => {
					// this.dtitle = res.data.data.title;
					$("div.el-dialog__body").html(res.data.data.content);
				});
			},
			//进入留言详情
			msgdetail(id) {
				let params = {
					id: id
				}
				this.addFormVisible = true;
				getArtcileListItem(params).then((res) => {
					// this.dtitle = res.data.data.title;
					$("div.el-dialog__body").html(res.data.data.content);
				});
			},
			pdfopen(item) {
				window.open("/pdf/" + item.attaname, "_blank");
			},
			//切换下载链接
			radioHomeHandle(v) {
				this.isactivex = v;
			},
			cardMouseenter: function(e) {
				$(e.target).addClass("flip");
			},
			cardMouseleave: function(e) {
				$(e.target).removeClass("flip");
			},
			/*动态检测首页面的大小 改变页面结构样式*/
			windWatchBh() {
				let dw = $(document).width();
				this.ec16 = 16;
				this.ec8 = 8;
				this.ec6 = 6;
				if(dw > 1280) {
					this.$emit("changeCollapsed", false);
				}
				if(dw <= 1280) {
					this.$emit("changeCollapsed", true);
				}
				if(dw <= 1100) {
					this.ec16 = 24;
					this.ec8 = 24;
				}
				if(dw <= 1050) {
					this.ec16 = 24;
					this.ec8 = 24;
					this.toolbox = false;
				}
				if(dw <= 776) {
					this.ec6 = 12;
				}
				if(dw <= 432) {
					this.ec6 = 24;
				}
			},
			/*初始化首页图表*/
			chartColumnFuc() {
				let that = this;
				/*首页新报订单数量统计 start*/
				this.chartColumn = echarts.init(document.getElementById('chartColumn'));
				let para = {
					showCount: 11000,
					type: 'new_build_start',
					// startTime:'2017-06-27',
					// endTime:'2017-07-29'
				};
				//获取开始的订单
				getoaHomeBarStartList(para).then((res) => {
					let yearData = [],
						barData = [],
						lineData = [];
					res.data.data.records.forEach((item, index) => {
						yearData.push(item.key);
						lineData.push(item.value);
					});
					//获取完成的订单
					let para = {
						showCount: 11000
					};
					//完成订单
					getoaHomeBarEndList(para).then((res) => {
						res.data.data.records.forEach((item, index) => {
							barData.push(item.value);
						});
						this.chartColumn.setOption({
							tooltip: {
								trigger: 'axis'
							},
							grid: {
								x: 40,
								x2: 40,
							},
							legend: {
								data: ['新报订单', '完成订单'],
							},
							toolbox: {
								show: that.toolbox,
								right: '35px',
								feature: {
									mark: {
										show: true
									},
									dataView: {
										readOnly: true,
										// lang:['数据视图', '关闭',''],           
									},
									magicType: {
										show: true,
										type: ['line', 'bar', 'stack', 'tiled']
									},
									restore: {
										show: true
									},
									saveAsImage: {
										show: true
									}
								},
							},
							calculable: true,
							dataZoom: {
								show: true,
								realtime: false,
								startValue: util.formatDate.format(new Date(new Date().getTime() - 22 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
								endValue: util.formatDate.format(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
							},
							xAxis: [{
								type: 'category',
								boundaryGap: true,
								data: yearData
							}],
							yAxis: [{
								type: 'value'
							}],
							series: [{
									name: '新报订单',
									type: 'line',
									data: lineData
								},
								{
									name: '完成订单',
									type: 'bar',
									data: barData
								}
							]
						});
					});
				});
				/*首页新报订单数量统计 end*/

				/*首页订单饼图分析数量 start*/
				this.chartPie = echarts.init(document.getElementById('chartPie'));
				let para1 = {
					type: util.formatDate.format(new Date(), 'yyyy-MM-dd')
				};
				getDeclareStatistics(para1).then((res) => {
					let newNum = 0, //新装数量
						seriesNum = 0, //维修数量
						removeNum = 0; //拆除数量
					res.data.data.records.forEach((item, index) => {
						if(item.key == "new_build_start") {
							newNum += parseInt(item.value);
						}
						if(item.key == "vindicate_remove_start") {
							removeNum += parseInt(item.value);
						}
						if(item.key == "vindicate_start") {
							seriesNum += parseInt(item.value);
						}
					});
					this.chartPie.setOption({
						tooltip: {
							trigger: 'item',
							formatter: "{b}：{c}单"
						},
						legend: {
							orient: 'vertical',
							x: 'left',
							data: ['新装', '拆除', '维修']
						},
						calculable: true,
						series: [{
							name: '今日订单量：',
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: newNum,
									name: '新装'
								},
								{
									value: removeNum,
									name: '拆除'
								},
								{
									value: seriesNum,
									name: '维修'
								},
							]
						}]
					});
				});
				/*首页订单饼图分析数量 end*/
			},
			//下载二维码初始
			codeInit() {
				/*获取安卓二维码下载地址 start*/
				getAndroidCode().then((res) => {
					$("#androidCode").erweima({
						label: 'E车宝',
						fill: '#222',
						text: res.data.data.records[0].url,
						quiet: 0,
						mSize: 13,
						fontcolor: '#409EFF',
						size: 110
					});
				});
				/*获取安卓二维码下载地址 end*/

				/*获取ios二维码下载地址 start*/
				$("#iosCode").erweima({
					label: 'E车宝',
					fill: '#222',
					text: 'https://itunes.apple.com/us/app/e%E8%BD%A6%E5%AE%9Dpro/id1243923614',
					quiet: 0,
					mSize: 13,
					fontcolor: '#409EFF',
					size: 110
				});
				/*获取ios二维码下载地址 end*/
				/*获取ios二维码下载地址 start*/
				$("#yciosCode").erweima({
					label: '万网优车',
					fill: '#222',
					text: 'https://www.pgyer.com/app/qrcode/uche-enterprise',
					quiet: 0,
					mSize: 13,
					fontcolor: '#409EFF',
					size: 110
				});
				/*获取ios二维码下载地址 end*/
				/*获取ios二维码下载地址 start*/
				$("#ycandroidCode").erweima({
					label: '万网优车',
					fill: '#222',
					text: 'http://www.wwvas.com/img/UCHE-release_v1.0.4-c5_dev-ebb216d.apk',
					quiet: 0,
					mSize: 13,
					fontcolor: '#409EFF',
					size: 110
				});
				/*获取ios二维码下载地址 end*/
			},
			indexBoxDataInit() {
				getIndexBoxInfo().then((res) => {
					if(res.data.result.code == 0){
						let indexBoxData = res.data.data[0];
						//平台设备接入
						$('#prijeNUm').animateNumber({
							number: indexBoxData.ONLINECOUNT.split('_')[0] ? indexBoxData.ONLINECOUNT.split('_')[0] : 0,
							numberStep: function(now, tween) {
								$(tween.elem).text(parseInt(now));
							}
						}, 1000);
						//本月安装车辆
						$('#carAannum').animateNumber({
							number: indexBoxData.VECHILECOUNT ? indexBoxData.VECHILECOUNT : 0,
							numberStep: function(now, tween) {
								$(tween.elem).text(parseInt(now));
							}
						}, 1000);
						//本月安装设备
						$('#proAnnum').animateNumber({
							number: indexBoxData.INSTALLCOUNT ? indexBoxData.INSTALLCOUNT : 0,
							numberStep: function(now, tween) {
								$(tween.elem).text(parseInt(now));
							}
						}, 1000);
						//平台车辆接入
						$('#prijeNUm1').animateNumber({
							number: indexBoxData.ONLINECOUNT.split('_')[1] ? indexBoxData.ONLINECOUNT.split('_')[1] : 0,
							numberStep: function(now, tween) {
								$(tween.elem).text(parseInt(now));
							}
						}, 1000);
					}
				});
			}
		},
		created() {
			// 得到当前用户信息
			this.user = JSON.parse(sessionStorage.getItem('user'));
			//窗体变化改变首页布局
			this.windWatchBh();
			// //用户操作保存到本地
			// let mymenu = JSON.parse(localStorage.getItem('mymenu'));
			// if(mymenu) {
			// 	mymenu.forEach((item, index) => {
			// 		if(this.user.id == item.userid) {
			// 			item.mymenu.forEach((item, index) => {
			// 				if(item.path != '/' && item.path != 1 && item.path != 2 && item.path != 3 && item.path != 4) {
			// 					this.deskNum++;
			// 				}
			// 			});
			// 			return false;
			// 		}
			// 	});
			// }

		},
		mounted() {
			/*初始化新闻列表板块 start*/
			this.initNewList();
			/*初始化新闻列表板块 end*/
			/*二维码板块 start*/
			this.codeInit();
			/*二维码板块 start*/
			/*初始化首页三个板块数量 start*/
			this.indexBoxDataInit();
			/*初始化首页三个板块数量 end*/
			const that = this;
			//当页面窗口发生变化的时候 重绘echarts图表
			window.onresize = function() {
				that.windWatchBh();
				setTimeout(() => {
					that.chartColumn.resize();
					that.chartPie.resize();
				}, 50);
			}
		},
		updated() {
			this.updatedNum++;
			/*当dom节点加载完成 初始化图表*/
			if(this.updatedNum == 1) {
				this.chartColumnFuc();
			}
		}
	}
</script>