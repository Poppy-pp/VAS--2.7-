<!--* 
* @description: 报单中心列表 新装单子 拆除单子 售后单子 控制中心（父节点） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新装单管理" name="1">
				<mytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 1"></mytodolist>
			</el-tab-pane>
			<el-tab-pane label="拆除单管理" name="2">
				<dismantleMytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 2"></dismantleMytodolist>
			</el-tab-pane>
			<el-tab-pane label="维修单管理" name="3">
				<serviceMytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 3"></serviceMytodolist>
			</el-tab-pane>
			<el-tab-pane label="交接流程" name="4">
				<afterSaleAudit :windowOutHeight="windowOutHeight" v-if="activeName == 4"></afterSaleAudit>
			</el-tab-pane>
			<el-tab-pane label="保险待办" name="5">
				<insuranceManger :windowOutHeight="windowOutHeight" v-if="activeName == 5"></insuranceManger>
			</el-tab-pane> 
			
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import mytodolist from 'components/businessManage/myOrderAllInfo/mytodolist';
	import dismantleMytodolist from 'components/businessManage/myOrderAllInfo/dismantleMytodolist';
	import serviceMytodolist from 'components/businessManage/myOrderAllInfo/serviceMytodolist';
	import afterSaleAudit from 'components/businessManage/myOrderAllInfo/afterSaleAudit';
	import insuranceManger from 'components/businessManage/myOrderAllInfo/insuranceManger';
	export default {
		props: ['windowOutHeight'],
		components: {
			mytodolist,
			dismantleMytodolist,
			serviceMytodolist,
			afterSaleAudit,
			insuranceManger
		},
		data() {
			return {
				activeName: '1'
			}
		},
		methods: {
			//页面管理切换
			handleClick(tab, event) {
				let tabbarType = {
					name:'a2',
					type:tab.name
				}
				this.$store.dispatch("tabbarType",tabbarType);
			}
		},
		created(){
			let tabbarType = this.$store.getters.tabbarType;
			if(tabbarType.name=='a2'){
				this.activeName = tabbarType.type;
			}
		}
	}
</script>
