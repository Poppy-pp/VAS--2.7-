<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:   
*-->
<template>
	<div id="systemabout" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getSystemAboutCount } from "../../../api/api";
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
			findsystemaboutcount(date) {
				this.$nextTick(function() {

					this.mapMove = this.echarts.init(document.getElementById('systemabout'));

					let para = {
						declaredate: date.date,
						status: 4
					}

					getSystemAboutCount(para).then((result) => {
						var zhinstall = 0,
							wwinstall = 0;
						for(var obj in result.data.data) {
							wwinstall = result.data.data[1].wwsystem;
							zhinstall = result.data.data[0].zhsystem;

						}

						var myChart = this.mapMove;

						var option = {
							backgroundColor: '#2c343c',

							title: {
								text: '月安装量',
								left: 'center',
								top: 20,
								textStyle: {
									color: '#ccc'
								}
							},

							tooltip: {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},

							visualMap: {
								show: false,
								min: 80,
								max: 600,
								inRange: {
									colorLightness: [0, 1]
								}
							},
							series: [{
								name: '月安装量',
								type: 'pie',
								radius: '55%',
								center: ['50%', '50%'],
								data: [{
										value: zhinstall,
										name: '众汇体系'
									},
									{
										value: wwinstall,
										name: '万网业务'
									}
								].sort(function(a, b) {
									return a.value - b.value;
								}),
								roseType: 'radius',
								label: {
									normal: {
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}
								},
								labelLine: {
									normal: {
										lineStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										},
										smooth: 0.2,
										length: 10,
										length2: 20
									}
								},
								itemStyle: {
									normal: {
										color: '#c23531',
										shadowBlur: 200,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
								},

								animationType: 'scale',
								animationEasing: 'elasticOut',
								animationDelay(idx) {
									return Math.random() * 200;
								}
							}]
						};

						if(option && typeof option === "object") {
							myChart.setOption(option, true);
						}

					});
				});
			}

		},

		created() {

			var myDate = new Date();
			var year = myDate.getFullYear();
			var montch = myDate.getMonth();

			if(montch >= 1 && montch <= 9)
				montch = "0" + montch;

			var date = {
				date: year + "-" + montch
			};

			this.findsystemaboutcount(date);
		}
	}
</script>