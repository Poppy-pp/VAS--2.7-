<!-- 财务对账单-->
<template>
	<section class="tab_content-wrapper">
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="对账单" name="first">
				<reconciliationStatement v-if="activeName == 'first'" :windowOutHeight="windowOutHeight"></reconciliationStatement>
			</el-tab-pane>
			<el-tab-pane label="成本汇总表" name="second">
				<costSummary v-if="activeName == 'second'" :windowOutHeight="windowOutHeight"></costSummary>
			</el-tab-pane>
			<el-tab-pane label="收入汇总表" name="third">
				<incomeSummary v-if="activeName == 'third'" :windowOutHeight="windowOutHeight"></incomeSummary>
			</el-tab-pane>
			<el-tab-pane label="异动表" name="fourth">
				<transactionTable v-if="activeName == 'fourth'" :windowOutHeight="windowOutHeight"></transactionTable>
			</el-tab-pane>
		</el-tabs>

	</section>
</template>
<script>
	/* 财务管理 */
	import transactionTable from 'components/financialManag/transactionTable'
	import costSummary from 'components/financialManag/costSummary'
	import reconciliationStatement from 'components/financialManag/reconciliationStatement'
	import incomeSummary from 'components/financialManag/incomeSummary'

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
				activeName: "first"
			}
		},
		methods: {},
		created() {}
	}
</script>