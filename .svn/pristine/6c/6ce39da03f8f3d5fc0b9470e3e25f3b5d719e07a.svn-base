<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="available" style="width:100%;height:500px;"></div>
</template>
<script>
	import { availableVehicleTotel } from "../../../api/api";
	export default {
		props: ["echarts", "isresize"],
		data() {
			return {
				chartColumn: null
			}
		},
		watch: {
			isresize(cval, oval) {
				this.chartColumn.resize();
			}
		},
		methods: {
			findassigndetails(date) {
				this.$nextTick(function() {
					this.chartColumn = this.echarts.init(document.getElementById('available'));

					let allvehicle = [],
						times = [],
						insurancevehicle = [];

					//所有车辆
					availableVehicleTotel().then((result) => {
						result.data.data.forEach((item, index) => {
							times.push(item.date);
							allvehicle.push(item.allvehicle);
							insurancevehicle.push(item.bx);
						});
						/* availableVehicleTotel(pram).then((result) => {                          
						  result.data.data.forEach((item,index)=>{                                     
						       insurancevehicle.push(item.linerate);                                            
						  });*/

						this.chartColumn.setOption({
							title: {
								text: '车辆在线率',
								left: 'left'
							},
							tooltip: {
								trigger: 'axis',

							},
							grid: {
								left: 40,
								right: 20,
							},
							legend: {
								data: ['所有车辆', '保险车辆'],
							},
							toolbox: {
								show: false,
							},
							calculable: true,
							dataZoom: {
								show: true,
								realtime: false,
								start: 0,
								end: 100
							},
							xAxis: [{
								type: 'category',
								boundaryGap: true,
								data: times
							}],
							yAxis: [{
								type: 'value'
							}],
							series: [{
									name: '所有车辆',
									type: 'line',
									data: allvehicle
								},
								{
									name: '保险车辆',
									type: 'line',
									data: insurancevehicle
								}
							]
							/*  });  */
						});
					});
				});
			}
		},
		created() {
			let that = this;
			var myDate = new Date();
			var year = myDate.getFullYear();
			var montch = myDate.getMonth();

			if(montch >= 1 && montch <= 9)
				montch = "0" + montch;

			var date = {
				date: year + "-" + montch
			};

			that.findassigndetails(date);

		}
	}
</script>