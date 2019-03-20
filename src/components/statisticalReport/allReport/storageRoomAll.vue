<!--* 
* @description: 库房
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="库存汇总表" name="1">
				<stockSummary :windowOutHeight="windowOutHeight" v-if="activeName == 1"></stockSummary>
			</el-tab-pane>
			<el-tab-pane label="超龄库存汇总" name="2">
				<overageStock :windowOutHeight="windowOutHeight" v-if="activeName == 2"></overageStock>
			</el-tab-pane>
			<el-tab-pane label="超龄库存明细" name="3">
				<overageStockDetail :windowOutHeight="windowOutHeight" v-if="activeName == 3"></overageStockDetail>
			</el-tab-pane>
			<el-tab-pane label="新装明细" name="4">
				<newDetail :windowOutHeight="windowOutHeight" v-if="activeName == 4"></newDetail>
			</el-tab-pane>
			<el-tab-pane label="入库明细" name="5">
				<inStockDetail :windowOutHeight="windowOutHeight" v-if="activeName == 5"></inStockDetail>
			</el-tab-pane>
			<el-tab-pane label="设备明细" name="6">
				<equipmentDetail :windowOutHeight="windowOutHeight" v-if="activeName == 6"></equipmentDetail>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import stockSummary from 'components/statisticalReport/allReport/storageHouse/stockSummary';
	import overageStock from 'components/statisticalReport/allReport/storageHouse/overageStock';
	import overageStockDetail from 'components/statisticalReport/allReport/storageHouse/overageStockDetail';
	import newDetail from 'components/statisticalReport/allReport/storageHouse/newDetail';
	import inStockDetail from 'components/statisticalReport/allReport/storageHouse/inStockDetail';
	import equipmentDetail from 'components/statisticalReport/allReport/storageHouse/equipmentDetail';
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			stockSummary,
			overageStock,
			overageStockDetail,
			newDetail,
			inStockDetail,
			equipmentDetail,
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
