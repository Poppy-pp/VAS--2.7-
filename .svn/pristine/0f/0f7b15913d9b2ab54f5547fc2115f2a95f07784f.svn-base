<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="prodcountonline" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getProdcountOnline } from "../../../api/api";
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
					this.chartColumn = this.echarts.init(document.getElementById('prodcountonline'));

					let allvehicle = [],
						times = [],
						insurancevehicle = [];

					//所有车辆
					getProdcountOnline().then((result) => {
						result.data.data.forEach((item, index) => {
							times.push(item.data);
							allvehicle.push(item.wx);
							insurancevehicle.push(item.yx);
						});
						/* availableVehicleTotel(pram).then((result) => {                          
						  result.data.data.forEach((item,index)=>{                                     
						       insurancevehicle.push(item.linerate);                                            
						  });*/

						this.chartColumn.setOption({
							title: {
								text: '设备在线率',
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
								data: ['无线', '有线'],
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
									name: '无线',
									type: 'line',
									data: allvehicle
								},
								{
									name: '有线',
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