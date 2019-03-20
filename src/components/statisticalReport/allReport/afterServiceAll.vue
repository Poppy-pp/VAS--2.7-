<!--* 
* @description: 售后监控部报表
* @author: pl 
* @update: pl
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="设备运营报告" name="1">
				<equipmentReport :windowOutHeight="windowOutHeight" v-if="activeName == 1"></equipmentReport>
			</el-tab-pane>
			<el-tab-pane label="售后设备统计表" name="2">
				<aftersaleStatistics :windowOutHeight="windowOutHeight" v-if="activeName == 2"></aftersaleStatistics>
			</el-tab-pane>
			<el-tab-pane label="设备交接表" name="3">
				<equipmentHandover :windowOutHeight="windowOutHeight" v-if="activeName == 3"></equipmentHandover>
			</el-tab-pane>
			<el-tab-pane label="设备运行统计表" name="4">
				<equipmentRunning :windowOutHeight="windowOutHeight" v-if="activeName == 4"></equipmentRunning>
			</el-tab-pane>
			<el-tab-pane label="报警报表" name="5">
				<alarmReport :windowOutHeight="windowOutHeight" v-if="activeName == 5"></alarmReport>
			</el-tab-pane>
			<el-tab-pane label="关注报表" name="6">
				<concernReport :windowOutHeight="windowOutHeight" v-if="activeName == 6"></concernReport>
			</el-tab-pane>
			<el-tab-pane label="里程统计表" name="7">
				<mileageNewStatistics :windowOutHeight="windowOutHeight" v-if="activeName == 7"></mileageNewStatistics>
			</el-tab-pane>
			<el-tab-pane label="车辆统计表" name="8">
				<vehicleStatistics :windowOutHeight="windowOutHeight" v-if="activeName == 8"></vehicleStatistics>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	//组件引入
	import equipmentReport from 'components/statisticalReport/allReport/afterService/equipmentReport';
	import aftersaleStatistics from 'components/statisticalReport/allReport/afterService/aftersaleStatistics';
	import equipmentHandover from 'components/statisticalReport/allReport/afterService/equipmentHandover';
	import equipmentRunning from 'components/statisticalReport/allReport/afterService/equipmentRunning';
	import alarmReport from 'components/statisticalReport/allReport/afterService/alarmReport';
	import concernReport from 'components/statisticalReport/allReport/afterService/concernReport';
	import mileageNewStatistics from 'components/statisticalReport/allReport/afterService/mileageNewStatistics';
	import vehicleStatistics from 'components/statisticalReport/allReport/afterService/vehicleStatistics';
	
	
	export default {
		props: ['windowOutHeight'],
		components: {
			equipmentReport,
			aftersaleStatistics,
			equipmentHandover,
			equipmentRunning,
			alarmReport,
			concernReport,
			mileageNewStatistics,
			vehicleStatistics
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
