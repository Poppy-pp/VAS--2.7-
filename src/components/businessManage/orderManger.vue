<!--* 
* @description: 报单中心列表 新装单子 拆除单子 售后单子 控制中心（父节点） 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新装报单" name="1">
				<reportQuery :windowOutHeight="windowOutHeight" v-if="activeName == 1"></reportQuery>
			</el-tab-pane>
			<el-tab-pane label="拆除报单" name="2">
				<dismantleReportQuery :windowOutHeight="windowOutHeight" v-if="activeName == 2"></dismantleReportQuery>
			</el-tab-pane>
			<el-tab-pane label="维修报单" name="3">
				<serviceReportQuery :windowOutHeight="windowOutHeight" v-if="activeName == 3"></serviceReportQuery>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	//组件引入
	import reportQuery from 'components/businessManage/formOrderMangerInfo/reportQuery';
	import dismantleReportQuery from 'components/businessManage/formOrderMangerInfo/dismantleReportQuery';
	import serviceReportQuery from 'components/businessManage/formOrderMangerInfo/serviceReportQuery';
	export default {
		props: ['windowOutHeight'],
		components: {
			reportQuery,
			dismantleReportQuery,
			serviceReportQuery
		},
		data() {
			return {
				activeName: '1'
			}
		},
		methods: {
			//页面管理切换
			handleClick(tab, event) {
				// console.log(tab.name, event);
			}
		},
		created() {}
	}
</script>