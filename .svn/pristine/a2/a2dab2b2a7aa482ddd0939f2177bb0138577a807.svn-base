<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="empresident" style="width:100%;height:500px;" @dblclick="$router.push('/VehicleMonitoring')"></div>
</template>
<script>
	import { getProvinceEmployeeCount } from "../../../api/api";
	export default {
		props: ["echarts", "isresize"],
		data() {
			return {
				mapMove: null
			}
		},
		watch: {
			isresize(cval, oval) {
				this.mapMove.resize();
			}
		},
		created() {
			this.$nextTick(function() {
				this.mapMove = this.echarts.init(document.getElementById('empresident'));
				var myChart = this.mapMove;
				getProvinceEmployeeCount().then((result) => {
					var empaddresscount = {
						empcount: [],
						contractcount: [],
						parttimecount: [],
						technologycount: [],
						other: []
					};
					for(var obj in result.data.data) {
						for(var i in result.data.data[obj]) {
							if(result.data.data[obj][i].KEY == 0) {
								if(result.data.data[obj][i].PRO == "黑龙")
									empaddresscount["empcount"].push({
										name: '黑龙江',
										value: result.data.data[obj][i].HJ
									});
								else
									empaddresscount["empcount"].push({
										name: result.data.data[obj][i].PRO,
										value: result.data.data[obj][i].HJ
									});
							} else if(result.data.data[obj][i].KEY == 1) {
								if(result.data.data[obj][i].PRO == "黑龙")
									empaddresscount["contractcount"].push({
										name: '黑龙江',
										value: result.data.data[obj][i].HJ
									});
								else
									empaddresscount["contractcount"].push({
										name: result.data.data[obj][i].PRO,
										value: result.data.data[obj][i].HJ
									});
							} else if(result.data.data[obj][i].KEY == 2) {
								if(result.data.data[obj][i].PRO == "黑龙")
									empaddresscount["technologycount"].push({
										name: '黑龙江',
										value: result.data.data[obj][i].HJ
									});
								else
									empaddresscount["technologycount"].push({
										name: result.data.data[obj][i].PRO,
										value: result.data.data[obj][i].HJ
									});
							} else if(result.data.data[obj][i].KEY == 3) {
								if(result.data.data[obj][i].PRO == "黑龙")
									empaddresscount["parttimecount"].push({
										name: '黑龙江',
										value: result.data.data[obj][i].HJ
									});
								else
									empaddresscount["parttimecount"].push({
										name: result.data.data[obj][i].PRO,
										value: result.data.data[obj][i].HJ
									});
							} else if(result.data.data[obj][i].KEY == 4) {
								if(result.data.data[obj][i].PRO == "黑龙")
									empaddresscount["other"].push({
										name: '黑龙江',
										value: result.data.data[obj][i].HJ
									});
								else
									empaddresscount["other"].push({
										name: result.data.data[obj][i].PRO,
										value: result.data.data[obj][i].HJ
									});
							}
						}
					}
					let option = {
						title: {
							text: '员工驻地分布',
							left: 'center'
						},
						tooltip: {
							trigger: 'item',

							formatter: function(params) {
								var res = params.name + '<br/>';
								var myseries = option.series;
								for(var i = 0; i < myseries.length; i++) {
									for(var j = 0; j < myseries[i].data.length; j++) {
										if(myseries[i].data[j].name == params.name) {
											res += myseries[i].name + ' : ' + myseries[i].data[j].value + '</br>';
										}
									}
								}
								return res;
							}
						},
						legend: {
							orient: 'vertical',
							left: 'left',
							data: ['员工共计', '正式员工合计', '技术服务部正式员工合计', '技术服务部兼职员工合计', '其他']
						},
						visualMap: {
							min: 0,
							max: 200,
							left: 'left',
							top: 'bottom',
							text: ['高', '低'],
							calculable: true
						},
						toolbox: {
							show: true,
							orient: 'vertical',
							left: 'right',
							top: 'center',
							feature: {
								dataView: {
									readOnly: false
								},
								restore: {},
								saveAsImage: {}
							}
						},
						series: [{
								name: '员工共计',
								type: 'map',
								// symbol:'none'
								mapType: 'china',
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data: empaddresscount.empcount,

							},
							{
								name: '正式员工合计',
								type: 'map',
								mapType: 'china',
								roam: false,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data: empaddresscount.contractcount

							},
							{
								name: '技术服务部正式员工合计',
								type: 'map',
								mapType: 'china',
								roam: false,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data: empaddresscount.technologycount
							},
							{
								name: '技术服务部兼职员工合计',
								type: 'map',
								mapType: 'china',
								roam: false,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data: empaddresscount.parttimecount
							},
							{
								name: '其他',
								type: 'map',
								mapType: 'china',
								roam: false,
								label: {
									normal: {
										show: true
									},
									emphasis: {
										show: true
									}
								},
								data: empaddresscount.other
							},

						]
					};

					if(option && typeof option === "object") {
						myChart.setOption(option, true);
					}
				});
			});

		}
	}
</script>