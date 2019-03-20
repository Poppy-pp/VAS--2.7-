<!--* 
* @description: 人力行政
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="考勤统计表" name="1">
				<attendanceStatistics :windowOutHeight="windowOutHeight" v-if="activeName == 1"></attendanceStatistics>
			</el-tab-pane>
			<el-tab-pane label="考勤明细" name="2">
				<attendanceDetail :windowOutHeight="windowOutHeight" v-if="activeName == 2"></attendanceDetail>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import attendanceStatistics from 'components/statisticalReport/allReport/humanAdministration/attendanceStatistics';
	import attendanceDetail from 'components/statisticalReport/allReport/humanAdministration/attendanceDetail';
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			attendanceStatistics,
			attendanceDetail,
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
