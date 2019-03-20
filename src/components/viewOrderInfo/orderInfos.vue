<!--* 
* @description: 外部页面订单页面显示 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<el-row class="rpShowimgDialog">
		<el-col :span="24" class="showimgDialog1">
			<div v-if="notext" style="text-align: center;color: #555;">
				<span class="iconfont icon-notfind01" style="font-size:8rem;dispaly:block;color:#555"></span>
				<p>{{ notext }}</p>
			</div>
			<div class="formdetail" v-else v-for="(item,index) in ruleFormStatic" :style="{padding:'0 20px',borderTop:index>0?'1px solid #ccc':0}">
				<el-row class="mt5">
					<el-col :span="24">
						<span class="formTile">安装信息</span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>客户公司:</dt>
							<dd v-if="item.corporateInfo">{{ item.corporateInfo.corpname }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>处理人:</dt>
							<dd v-if="item.corporateInfo">{{ item.corporateInfo.employeename}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>订单类型:</dt>
							<dd>{{ item.declaretype}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>订单号:</dt>
							<dd>{{ item.orderno}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车主:</dt>
							<dd v-if="item.ownerInfo">{{ item.ownerInfo.name}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>电话:</dt>
							<dd v-if="item.ownerInfo">{{ item.ownerInfo.mobile}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车架号:</dt>
							<dd v-if="item.vehicleInfo">{{ item.vehicleInfo.vin}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车牌号:</dt>
							<dd v-if="item.vehicleInfo">{{ item.vehicleInfo.licenseplatenum}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>是否有保险:</dt>
							<dd v-if="item.vehicleInfo">{{ item.vehicleInfo.hastheftinsurance == 1?"有":"没有"}}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>安装小组:</dt>
							<dd v-if="item.installGroupInfo">{{ item.installGroupInfo.groupname }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>安装人员:</dt>
							<dd v-if="item.installEmployee">{{ item.installEmployee.employeename }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>安装时间:</dt>
							<dd>{{ item.installapplydate }}</dd>
						</dl>
					</el-col>
					<el-col :span="16">
						<dl class="dllist">
							<dt>安装地址:</dt>
							<dd>{{ item.installaddress}}</dd>
						</dl>
					</el-col>
				</el-row>
<!-- 				<el-row class="mt5">
					<el-col :span="24">
						<span class="formTile fl">设备地图实时位置</span>
						<el-button @click.stop="realTimeRefreshPro('vueAmap3',item,index)" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
					</el-col>
					<el-col :span="24">
						<el-row class="mt5">
							<el-col :span="24">
								<gdmap3 ref="vueAmap3"></gdmap3>
							</el-col>
						</el-row>
					</el-col>
				</el-row> -->
				<template v-for="(item,index) in item.installDetails">
					<el-row class="mt5">
						<el-col :span="24">
							<span class="formTile">{{item.packInfo.E_PRODTYPE+'设备'+item.packInfo.E_PRODMODEL}}</span>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>安装位置:</dt>
								<dd>{{ item.installpositionname }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>设备ID:</dt>
								<dd>{{ item.packInfo.E_PRODUNUM }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>设备类型:</dt>
								<dd>{{ item.packInfo.E_PRODTYPE }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>设备型号:</dt>
								<dd>{{ item.packInfo.E_PRODMODEL }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>SIM卡号:</dt>
								<dd>{{ item.packInfo.C_PRODUNUM }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>iccid:</dt>
								<dd>{{ item.packInfo.SIMCARDID }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>卡类型:</dt>
								<dd>{{ item.packInfo.C_PRODMODEL }}</dd>
							</dl>
						</el-col>
						<el-col :span="24">
							<dl class="dllist">
								<dt>设备备注:</dt>
								<dd>{{ item.remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="24">
							<dl class="dllist lh55_mb10">
								<dt>设备拍照信息:</dt>
								<dd>
									<img width="60" height="60" v-for="(item,index) in item.pictures" :title="item.picdesc" class="image" :src="$store.state.IMG_URL+item.piclink">
								</dd>
							</dl>
						</el-col>
					</el-row>
				</template>
			</div>
		</el-col>
	</el-row>
</template>
<style type="text/css">
	@import '/static/css/common.css';
	@import '../businessManage/css/customerDeclaration.css';
	@import '/static/css/style.css';
</style>
<script>
	// import async from 'async';
	// import gdmap3 from 'components/map/gdmap3';
	import '../../../static/js/viewer-jquery.min';
	import { getOrderOutInfos,cldeviceIsOnstate } from '../../api/api';
	export default {
		// components:{
		// 	gdmap3
		// },
		data() {
			return {
				ruleFormStatic: [],
				realTimeRefreshLoading:false,
				notext: '',
				indDe:0,
				tempIndex:0
			};
		},
		methods: {
			// //实时获取设备位置 和 在线情况
			// realTimeRefreshPro(gmapname,pro,index) {
			// 	if(index != this.tempIndex){
			// 		this.indDe = 0;
			// 	}
			// 	this.tempIndex = index;
			// 	let _this = this,
			// 		len = pro.installDetails.length;
			// 	if(_this.$refs[gmapname]) _this.$refs[gmapname].clearMap();
			// 	if(len > 0) {
			// 		let i = _this.indDe,
			// 			para = {
			// 				id: pro.installDetails[i].packInfo.E_PRODUNUM
			// 			};
			// 		_this.realTimeRefreshLoading = true;
			// 		async.waterfall([
			// 			function(callback) {
			// 				cldeviceIsOnstate(para).then((res) => {
			// 					let data = res.data.data.realdata;
			// 					callback(null, data);
			// 				});

			// 			},
			// 			function(data, callback) {
			// 				if(data) {
			// 					if(data.lng == 0 || data.lat == 0) {
			// 						_this.ruleFormStatic[index].installDetails[i].curaddress = "无定位";
			// 						callback(null, data);
			// 					} else {
			// 						_this.$refs[gmapname].getAddress([data.lng, data.lat], para.id, (res) => {
			// 							_this.ruleFormStatic[index].installDetails[i].curaddress = res;
			// 							callback(null, data);
			// 						});
			// 					}
			// 				} else {
			// 					_this.ruleFormStatic[index].installDetails[i].curaddress = "无定位";
			// 					callback(null, data);
			// 				}
			// 			},
			// 		], function(err, data) {
			// 			if(data) {
			// 				switch(data.istate) {
			// 					case 0:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "行驶";
			// 						break;
			// 					case 1:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "离线";
			// 						break;
			// 					case 2:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "停车";
			// 						break;
			// 					case 3:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "报警";
			// 						break;
			// 					case 4:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "无效定位";
			// 						break;
			// 					case 5:
			// 						_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "未定位";
			// 						break;
			// 				}
			// 				_this.ruleFormStatic[index].installDetails[i].recvtime = data.recvtime;
			// 			} else {
			// 				_this.ruleFormStatic[index].installDetails[i].curaddress = "无定位";
			// 				_this.ruleFormStatic[index].installDetails[i].curonlinestatus = "未在线";
			// 			}
			// 			_this.realTimeRefreshLoading = false;
			// 			_this.indDe++;
			// 			if(_this.indDe < len) _this.realTimeRefreshPro(gmapname,pro,index);
			// 			if(_this.indDe == len) _this.indDe = 0;
			// 		});
			// 	}
			// },
		},
		created() {
			let para = {
				externalid: this.$route.query.externalid
			}
			getOrderOutInfos(para).then((res) => {
				if(res.data.result.code == 0) {
					this.ruleFormStatic = res.data.data;
					if(res.data.data.length == 0) {
						this.notext = "没有找到项目编号下的订单信息！";
					}
				} else {
					this.$message({
						message: response.data.result.desc,
						type: 'error'
					});
				}
			});
		},
		mounted() {
			//初始化图片查看器
			$("div.rpShowimgDialog").on("click", ".image", function(e) {
				$("div.rpShowimgDialog").viewer({
					zIndex: 999999999
				});
			});
		}
	}
</script>