<!--* 
* @description: 技术服务部报表
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="安装明细表" name="1">
				<installationDetail :windowOutHeight="windowOutHeight" v-if="activeName == 1"></installationDetail>
			</el-tab-pane>
			<el-tab-pane label="退单明细表" name="2">
				<withdrawalSummary :windowOutHeight="windowOutHeight" v-if="activeName == 2"></withdrawalSummary>
			</el-tab-pane>
			<el-tab-pane label="异动明细表" name="3">
				<specialAction :windowOutHeight="windowOutHeight" v-if="activeName == 3"></specialAction>
			</el-tab-pane>
			<el-tab-pane label="安装量月报及本年汇总" name="4">
				<technicalServiceMonthTotal :windowOutHeight="windowOutHeight" v-if="activeName == 4"></technicalServiceMonthTotal>
			</el-tab-pane>
			<el-tab-pane label="提成汇总表" name="5">
				<commissionSummary :windowOutHeight="windowOutHeight" v-if="activeName == 5"></commissionSummary>
			</el-tab-pane>
			<el-tab-pane label="安装量周报及本月汇总" name="6">
				<technicalServiceWeekTotal :windowOutHeight="windowOutHeight" v-if="activeName == 6"></technicalServiceWeekTotal>
			</el-tab-pane>
			<!-- <el-tab-pane label="库房差异核对" name="6">
				<stoDifferenceCheck :windowOutHeight="windowOutHeight" v-if="activeName == 6"></stoDifferenceCheck>
			</el-tab-pane> -->
			<!-- <el-tab-pane label="库存上限统计" name="8">
				<inventoryLimit :windowOutHeight="windowOutHeight" v-if="activeName == 8"></inventoryLimit>
			</el-tab-pane> -->
			
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import technicalServiceMonthTotal from 'components/statisticalReport/allReport/technicalService/technicalServiceMonthTotal';
	import technicalServiceWeekTotal from 'components/statisticalReport/allReport/technicalService/technicalServiceWeekTotal';
	import installationDetail from 'components/statisticalReport/allReport/technicalService/installationDetail';
	import specialAction from 'components/statisticalReport/allReport/technicalService/specialAction';
	import withdrawalSummary from 'components/statisticalReport/allReport/technicalService/withdrawalSummary';
	import stoDifferenceCheck from 'components/statisticalReport/allReport/technicalService/stoDifferenceCheck';
	import inventoryLimit from 'components/statisticalReport/allReport/technicalService/inventoryLimit';
	import commissionSummary from 'components/statisticalReport/allReport/technicalService/commissionSummary';
	
	
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			technicalServiceMonthTotal,
			technicalServiceWeekTotal,
			installationDetail,
			specialAction,
			withdrawalSummary,
			stoDifferenceCheck,
			inventoryLimit,
			commissionSummary,
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
