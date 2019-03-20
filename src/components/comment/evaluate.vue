<!--* 
* @description: 评论
* @author: chen 
* @update:  
*-->
<template>
	<section id="evaluate">
		<el-row>
			<el-col :span="24" v-for="(item,index) in modelListInfo">
				<span>{{item.name}}</span>
				<input type="hidden" name="id" value="item.id">
				<el-rate v-model="rateVal[index].value" allow-half show-text text-color="#ff9900" :texts="item.tag.split(',')" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="item.level">
				</el-rate>
			</el-col>
			<!-- <el-col :span="24" v-if="isShowAdd">
				<el-input type="textarea" autosize placeholder="请输入备注" v-model="message" style="margin-top:10px;"></el-input>
				<el-button type="primary" :loading="loading" @click="addEvaluateDetail" style="float:right;margin-top:10px;">提交</el-button>
			</el-col> -->
		</el-row>
	</section>
</template>
<script>
	import { evaluateitem, addEvaluateDetail, addBusiEvaluate } from "../../api/api";
	export default {
		props: ['corpid', 'declarationid'],
		data() {
			return {
				rateVal: [],
				isShowAdd:true,
				modelListInfo: [],
				message: '',
				records: [],
				loading: false,
				totalscore: 0
			}
		},
		methods: {
			//给指定订单员工打分
			addEvaluateDetail(params) {
				this.totalscore = 0;
				for(var i = 0; i < this.rateVal.length; i++) {
					this.totalscore += parseFloat(this.rateVal[i].value);
				}
				let par = {
					"declarationid": this.declarationid, //报单id
					"corpid": this.corpid, //公司id
					"status": 5, //报单状态
					"totalscore": this.totalscore * 2, //得分
					"commenttext": this.message //文本内容                   
				}
				this.loading = true;
				addBusiEvaluate(par).then((res) => {
					var evaluateid = res.data.data.id;
					this.records.length = 0;
					for(var i = 0; i < this.rateVal.length; i++) {
						this.records.push({
							evaluateitemid: this.modelListInfo[i].id,
							evaluatelevel: parseFloat(this.rateVal[i].value),
							evaluateid: evaluateid
						});
					}
					addEvaluateDetail(this.records).then((res) => {
						this.loading = false;
						if(res.data.result.code == 0) {
							this.$emit("childKzDialogTableVisible");
						}
					});
				});
			},
			//初始化评分列表
			initEvaluate(){
				evaluateitem().then((res) => {
					this.modelListInfo = res.data.data.records;
					for(var obj in res.data.data.records) {
						this.rateVal.push({
							value: 3
						});
					}
				});
			}
		},
		created() {
			this.initEvaluate();
		}
	}
</script>