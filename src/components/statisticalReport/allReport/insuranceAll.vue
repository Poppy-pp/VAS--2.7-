<!--* 
* @description: 保险部报表
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="对账单" name="1">
				<insuranceBill :windowOutHeight="windowOutHeight" v-if="activeName == 1"></insuranceBill>
			</el-tab-pane>
			<el-tab-pane label="保险数量统计" name="2">
				<insuranceQuantity :windowOutHeight="windowOutHeight" v-if="activeName == 2"></insuranceQuantity>
			</el-tab-pane>
			<el-tab-pane label="投保清单" name="3">
				<insuranceList :windowOutHeight="windowOutHeight" v-if="activeName == 3"></insuranceList>
			</el-tab-pane>
			<el-tab-pane label="未出投保清单" name="4">
				<insuranceListNo :windowOutHeight="windowOutHeight" v-if="activeName == 4"></insuranceListNo>
			</el-tab-pane>
			<el-tab-pane label="异动汇总表" name="5">
				<insuranceChangeCollect :windowOutHeight="windowOutHeight" v-if="activeName == 5"></insuranceChangeCollect>
			</el-tab-pane>
			<el-tab-pane label="异动明细表" name="6">
				<insuranceChangeDetail :windowOutHeight="windowOutHeight" v-if="activeName == 6"></insuranceChangeDetail>
			</el-tab-pane>
			<el-tab-pane label="保险月报及周报" name="7">
				<insuranceMonthWeek :windowOutHeight="windowOutHeight" v-if="activeName == 7"></insuranceMonthWeek>
			</el-tab-pane>
			<el-tab-pane label="保险提成" name="8">
				<insuranceBonus :windowOutHeight="windowOutHeight" v-if="activeName == 8"></insuranceBonus>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import insuranceBill from 'components/statisticalReport/allReport/insuranceDivision/insuranceBill';
	import insuranceList from 'components/statisticalReport/allReport/insuranceDivision/insuranceList';
	import insuranceQuantity from 'components/statisticalReport/allReport/insuranceDivision/insuranceQuantity';
	import insuranceListNo from 'components/statisticalReport/allReport/insuranceDivision/insuranceListNo';
	import insuranceChangeCollect from 'components/statisticalReport/allReport/insuranceDivision/insuranceChangeCollect';
	import insuranceChangeDetail from 'components/statisticalReport/allReport/insuranceDivision/insuranceChangeDetail';
	import insuranceMonthWeek from 'components/statisticalReport/allReport/insuranceDivision/insuranceMonthWeek';
	import insuranceBonus from 'components/statisticalReport/allReport/insuranceDivision/insuranceBonus';
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			insuranceQuantity,
			insuranceBill,
			insuranceList,
			insuranceListNo,
			insuranceChangeCollect,
			insuranceChangeDetail,
			insuranceMonthWeek,
			insuranceBonus
		},
		data() {
			return {
				activeName: '1'
			}
		},
		methods: {
			// 页面管理切换
			handleClick(tab, event) {
				
			}
		},
		created(){
			// let tabbarType = this.$store.getters.tabbarType;
			// if(tabbarType.name=='a2'){
			// 	this.activeName = tabbarType.type;
			// }
		}
	}
</script>
