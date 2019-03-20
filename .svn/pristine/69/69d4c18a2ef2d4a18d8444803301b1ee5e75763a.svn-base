 <!--* 
* @description: 财务部
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="对账单" name="1">
				<reconciliationStatement  v-if="activeName == 1" :tabMessage="activeName"></reconciliationStatement>
			</el-tab-pane>
			<el-tab-pane label="成本汇总表" name="2">
				<costSummary v-if="activeName == '2'" :tabMessage="activeName"></costSummary>
			</el-tab-pane>
			<el-tab-pane label="收入汇总表" name="3">
				<incomeSummary v-if="activeName == '3'" :tabMessage="activeName"></incomeSummary>
			</el-tab-pane>
			<el-tab-pane label="异动表" name="4">
				<transactionTable v-if="activeName == '4'" :tabMessage="activeName"></transactionTable>
			</el-tab-pane>
			
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import transactionTable from 'components/statisticalReport/allReport/financialDepartment/transactionTable'
	import costSummary from 'components/statisticalReport/allReport/financialDepartment/costSummary'
	import reconciliationStatement from 'components/statisticalReport/allReport/financialDepartment/reconciliationStatement'
	import incomeSummary from 'components/statisticalReport/allReport/financialDepartment/incomeSummary'
	
	
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			transactionTable,
			costSummary,
			reconciliationStatement,
			incomeSummary
		},
		data() {
			return {
				activeName: '1',
			}
		},
		methods: {
			// 页面管理切换
			handleClick(tab, event) {
				this.activeName = tab.name;
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
