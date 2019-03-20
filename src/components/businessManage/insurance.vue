<!--* 
* @description: 报单中心（内部分为6步子组件） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="售后审核" class="newForm_s" name="bd">
				<div class="newForm_s_col_1">
					<el-steps :space="120" class="mt15" direction="vertical" process-status="finish" :active="active" finish-status="success" align-center>
						<el-step title="售后审核"></el-step>
						<el-step title="审核确认"></el-step>
						<el-step title="完成"></el-step>
					</el-steps>
				</div>
				<el-card class="newForm_s_col_2">
					<div class="text item">
						<section class="myorderFF">
							<router-view @changeStep="changeStep" @getFormData="getFormData" :ruleFormStatic="ruleFormStatic" :curTaskId="curTaskId" ref="proCusum">
							</router-view>
						</section>
					</div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import Nanobar from 'nanobar';
	import { getvariablesTaskInfoList } from '../../api/api';
	export default {
		data() {
			return {
				activeName: 'bd',
				ruleFormStatic: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {}
					},
					ownerInfo: {
						name: '',
						idcard: '',
						mobile: ''
					},
					flowData: {
						verify_result: '',
						apply_remark: ''
					},
					installEmployee: {
						employeename: ''
					},
					installGroupInfo: {
						groupname: ''
					}
				},

				curTaskId: '',
				active: 0
			}
		},
		methods: {
			//初始步骤
			changeStep(v) {
				this.active = v;
			},
			//根据任务id获取表单信息
			getFormData(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
						taskId: obj.id
					},
					options = {
						classname: 'nanobar2',
						target: document.getElementById('myDivId'),
						id: 'mynano'
					},
					nanobar = new Nanobar(options);
				this.curTaskId = obj.id;
				nanobar.go(60);
				getvariablesTaskInfoList(pa).then((res) => {
					let _this = this,
						data = res.data.data;
					nanobar.go(100);
					if(!data.vehicleInfo) {
						data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
					}
					if(!data.ownerInfo) {
						data.ownerInfo = _this.ruleFormStatic.ownerInfo;
					}
					if(!data.installEmployee) {
						data.installEmployee = _this.ruleFormStatic.installEmployee;
					}
					if(!data.installGroupInfo) {
						data.installGroupInfo = _this.ruleFormStatic.installGroupInfo;
					}
					if(!data.flowData) {
						data.flowData = _this.ruleFormStatic.flowData;
					}
					if(!data.vehicleInfo.receivingbank) {
						data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
					}
					_this.ruleFormStatic = data;
					_this.$refs.proCusum.getCustoHistoryInfo(data);
				}).catch((error) => {
					nanobar.go(100);
				});
			},
		},
		//初始化数据
		created() {
			let user = this.$store.getters.userInfo;
		}
	}
</script>