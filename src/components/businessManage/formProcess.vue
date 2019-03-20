<!--* 
* @description: 报单中心（内部分为6步子组件） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="新装报单" class="newForm_s" name="bd">
				<div class="newForm_s_col_1">
					<el-steps :space="120" class="mt15" direction="vertical" process-status="finish" :active="active" finish-status="success" align-center>
						<el-step title="报单"></el-step>
						<el-step title="文员审核/派单"></el-step>
						<el-step title="施工审核/施工"></el-step>
						<el-step title="审核"></el-step>
						<el-step title="保险出单"></el-step>
						<el-step title="完成"></el-step>
					</el-steps>
				</div>
				<el-card class="newForm_s_col_2">
					<div class="text item">
						<section class="myorderFF">
							<div class="myorderFFheader">
								<el-form label-position="left" :model="startForm" inline class="cur-form-inn" v-if="active == 0">
									<el-col :span="12" class="mb10">
										<el-form-item label="报单类型" prop="declaretype" class="rsty_1 leftheb">
											<el-radio-group @change="changeCumType" v-model="startForm.declaretype">
												<el-radio-button label="客户报单" :disabled="!sDisabled"></el-radio-button>
												<el-radio-button label="自主报单" :disabled="sDisabled"></el-radio-button>
											</el-radio-group>
										</el-form-item>
									</el-col>

									<el-col :span="12" class="mb15">
										<el-form-item label="客户名称" prop="corpname" class="rsty_2 leftheb">
											<el-select v-model="tmpCopItem" value-key="corpname" @change="changeVal" clearable filterable :loading="copLoading" placeholder="请选择">
												<el-option v-for="(item,index) in copName" :key="item.corpname" :label="item.corpname" :value="item">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-form>
							</div>
							<router-view @step="step" @changeStep="changeStep" @getFormData="getFormData" @defaultChangeCumType="defaultChangeCumType" :startForm="startForm" :ruleFormStatic="ruleFormStatic" @saveCorpInfo="saveCorpInfo" :curTaskId="curTaskId" ref="proCusum">
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
	import { getvariablesTaskInfoList, getCorpNameList, getCopNameBy } from '../../api/api';
	export default {
		data() {
			return {
				startForm: {
					declaretype: '',
					declareby: '', //报单员id
					corpid: '', //报单公司id
					corptype: '', //公司类型
					corpname: ''
				},
				activeName: 'bd',
				tmpCopItem: "",
				copName: [],
				copLoading: false,
				sDisabled: true,
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
			changeCumType(v) {
				let user = this.$store.getters.userInfo;
				if(v == "自主报单") {
					this.sDisabled = false;
					this.startForm.declaretype = "自主报单";
				} else {
					this.sDisabled = true;
					this.startForm.declaretype = "客户报单";
					this.startForm.corpid = user.corporateInfo.id;
					this.startForm.corpname = user.corporateInfo.corpname;
					this.tmpCopItem = user.corporateInfo.corpname;
				}
			},
			//默认当前报单类型 公司
			defaultChangeCumType(item) {
				this.startForm.declaretype = item.declaretype;
				if(item.declaretype == "自主报单") {
					this.sDisabled = false;
					this.startForm.corpid = item.corporateInfo.id;
					this.startForm.corpname = item.corporateInfo.corpname;
					this.tmpCopItem = item.corporateInfo.corpname;
				} else {
					this.startForm.corpid = item.corporateInfo.id;
					this.startForm.corpname = item.corporateInfo.corpname;
					this.tmpCopItem = item.corporateInfo.corpname;
					this.sDisabled = true;
				}
			},
			changeVal(item) {
				if(!item.id) return;
				this.startForm.corpid = item.id;
				this.startForm.corpname = item.corpname;
			},
			step(n) {
				if(n == 1) {
					this.active++;
				} else {
					this.active--;
				}
				this.store.state.formObj = '';
			},
			saveCorpInfo(firstFormInfo){
				firstFormInfo.corpid = this.startForm.corpid;
				firstFormInfo.corpname = this.startForm.corpname;
				localStorage.setItem("firstFormInfo", JSON.stringify(firstFormInfo));
			},
			changeStep(v) {
				this.active = v;
				if(this.active == 0)
					this.InitCorp();
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
			//初始化公司
			InitCorp() {
				let user = this.$store.getters.userInfo;
				let draft = JSON.parse(localStorage.getItem('firstFormInfo'));
				this.startForm.declareby = user.id;
				let para = {
					showCount: 1000
				}
				this.copLoading = true;
				getCopNameBy(para).then((res) => {
					this.copLoading = false;
					if(res.data.result.code == 0) {
						this.copName = res.data.data.records;
						this.startForm.corptype = user.corporateInfo.corptype;
						//获取当前报单人信息
						if(user.corporateInfo.corptype == "WW") {
							this.startForm.declaretype = "自主报单";
							if(this.copName[0].corptype == "WW") {
								this.copName.splice(0, 1);
							}
							this.sDisabled = false;
							/*判断vuex是否存在当前报单保存记录*/
							if(draft) {
								if(draft.uid == user.id) {
									this.startForm.corpid = draft.corpid;
									this.startForm.corpname = draft.corpname;
									this.tmpCopItem = draft.corpname;
								}
							}
						} else {
							this.startForm.declaretype = "客户报单";
							this.sDisabled = true;
							/*判断vuex是否存在当前报单保存记录*/
							if(draft) {
								if(draft.uid == user.id) {
									this.startForm.corpid = draft.corpid;
									this.startForm.corpname = draft.corpname;
									this.tmpCopItem = draft.corpname;
									return;
								}
							}
							this.startForm.corpid = user.corporateInfo.id;
							this.startForm.corpname = user.corporateInfo.corpname;
							this.tmpCopItem = user.corporateInfo.corpname;
						}
					}
				});
			},
		}
	}
</script>