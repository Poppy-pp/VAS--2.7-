<!--* 
* @description: 业务部
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="合作客户信息表" name="1">
				<customerInformation :windowOutHeight="windowOutHeight" v-if="activeName == 1"></customerInformation>
			</el-tab-pane>
			<!-- <el-tab-pane label="意向客户更进表" name="2">
				<intentCustomers :windowOutHeight="windowOutHeight" v-if="activeName == 2"></intentCustomers>
			</el-tab-pane> -->
			<!-- <el-tab-pane label="回收再分配客户" name="3">
				<recoverCustomer :windowOutHeight="windowOutHeight" v-if="activeName == 3"></recoverCustomer>
			</el-tab-pane> -->
			<!-- <el-tab-pane label="提成计算表" name="4">
				<calculationTable :windowOutHeight="windowOutHeight" v-if="activeName == 4"></calculationTable>
			</el-tab-pane> -->
			<el-tab-pane label="管理报表" name="5">
				<managerialReport :windowOutHeight="windowOutHeight" v-if="activeName == 5"></managerialReport>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import intentCustomers from 'components/statisticalReport/allReport/businessDepartment/intentCustomers';
	import customerInformation from 'components/statisticalReport/allReport/businessDepartment/customerInformation';
	import recoverCustomer from 'components/statisticalReport/allReport/businessDepartment/recoverCustomer';
	import calculationTable from 'components/statisticalReport/allReport/businessDepartment/calculationTable';
	import managerialReport from 'components/statisticalReport/allReport/businessDepartment/managerialReport';
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			intentCustomers,
			customerInformation,
			recoverCustomer,
			calculationTable,
			managerialReport
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
