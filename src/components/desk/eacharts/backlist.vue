<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:   
*-->
<template>
	<div id="back" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getBackList } from "../../../api/api";
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
		methods: {
			findDeclarationInstallNumber() {
				this.mapMove = this.echarts.init(document.getElementById('back'));
				let insurancetotal = [];

				getBackList().then((result) => {
					result.data.data.forEach((item, index) => {

						insurancetotal[parseInt(item.montch) - 2] = item.totel;
						//console.log(insurancetotal);
					});

					var myChart = this.mapMove;

					var option = {
						title: {
							text: '订单退回',
						},
						tooltip: {
							trigger: 'axis',
							formatter: (p, c, callback) => {
								if(p.length == 0) {
									return "";
								}
								if(p.length == 1) {
									if(!p[0].value) {
										return "";
									} else {
										return "订单退回:" + p[0].value;
									}

									/*if(!p[1].value) {
									    return "";
									}else{
									    return "保险数:"+p[1].value;
									}*/

								}
								/* if(p.length == 3){
								      if(p[0].value && !p[1].value && !p[2].value) {
								         return "";
								     }else{

								         if(p[0].value==null)
								          p[0].value="0";
								        if(p[1].value==null)
								           p[1].value="0";                                               

								         return "常规数:"+p[0].value+"<br/>"+"保险数:"+p[1].value ;
								     }
								 }*/
							}
						},
						legend: {
							data: ['订单退回'],
						},
						toolbox: {
							show: false,
							feature: {
								dataView: {
									show: true,
									readOnly: false
								},
								magicType: {
									show: true,
									type: ['line', 'bar']
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						grid: {
							left: 40,
							right: 20,
						},
						calculable: true,
						xAxis: [{
							type: 'category',
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
								name: '订单退回',
								type: 'bar',
								data: insurancetotal,
								markPoint: {
									data: [{
											type: 'max',
											name: '最大值'
										},
										{
											type: 'min',
											name: '最小值'
										}
									]
								},
								markLine: {
									data: [{
										type: 'average',
										name: '平均值'
									}]
								}

							},

						]
					};
					if(option && typeof option === "object") {
						myChart.setOption(option, true);
					}
				});
			}
		},
		created() {
			this.$nextTick(function() {
				this.findDeclarationInstallNumber();
			});
		}
	}
</script>