<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<div id="mapMove" style="width:100%;height:500px;" @dblclick="$router.push('/VehicleMonitoring')"></div>
</template>
<script>
	import { getAddressListInfo, getCityCarAddress, findCarAddressCount } from "../../../api/api";
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
			let _this = this;
			this.$nextTick(function() {
				let data = [],
					geoCoordMap = {};
				this.mapMove = this.echarts.init(document.getElementById('mapMove'));
				getAddressListInfo().then((result) => {
					var myChart = this.mapMove;
					var convertData = function(data) {
						var res = [];
						for(var i = 0, len = data.length; i < len; i++) {
							var geoCoord = geoCoordMap[data[i].name];
							if(geoCoord) {
								res.push({
									name: data[i].name,
									value: geoCoord.concat(data[i].value)
								});
							}
						}
						return res;
					};

					var convertedData = [
						convertData(data),
						convertData(data.sort(function(a, b) {
							return b.value - a.value;
						}).slice(0, 6))
					];

					var option = {
						backgroundColor: '#404a59',
						animation: true,
						animationDuration: 1000,
						animationEasing: 'cubicInOut',
						animationDurationUpdate: 1000,
						animationEasingUpdate: 'cubicInOut',
						title: [{
								text: '车辆上线分布图',
								left: 'center',
								textStyle: {
									color: '#fff'
								}
							},
							{
								id: 'statistic',
								right: 120,
								top: 40,
								width: 100,
								textStyle: {
									color: '#fff',
									fontSize: 16
								}
							}
						],
						toolbox: {
							iconStyle: {
								normal: {
									borderColor: '#fff'
								},
								emphasis: {
									borderColor: '#b1e4ff'
								}
							}
						},
						brush: {
							outOfBrush: {
								color: '#abc'
							},
							brushStyle: {
								borderWidth: 2,
								color: 'rgba(0,0,0,0.2)',
								borderColor: 'rgba(0,0,0,0.5)',
							},
							seriesIndex: [0, 1],
							throttleType: 'debounce',
							throttleDelay: 300,
							geoIndex: 0
						},
						geo: {
							map: 'china',
							left: '10',
							right: '20%',
							center: [104.98561551896913, 30.605000490896193],
							zoom: 2,
							label: {
								emphasis: {
									show: false
								}

							},
							roam: true,
							itemStyle: {
								normal: {
									areaColor: '#323c48',
									borderColor: '#111'
								},
								emphasis: {
									areaColor: '#2a333d'
								}
							}
						},
						tooltip: {
							trigger: 'item'
						},
						grid: {
							right: 40,
							top: 100,
							bottom: 40,
							width: '30%'
						},
						xAxis: {
							type: 'value',
							scale: true,
							position: 'top',
							boundaryGap: false,
							splitLine: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								margin: 2,
								textStyle: {
									color: '#aaa'
								}
							},
						},
						yAxis: {
							type: 'category',
							name: '各省统计',
							nameGap: 16,
							axisLine: {
								show: false,
								lineStyle: {
									color: '#ddd'
								}
							},
							axisTick: {
								show: false,
								lineStyle: {
									color: '#ddd'
								}
							},
							axisLabel: {
								interval: 0,
								textStyle: {
									color: '#ddd'
								}
							},
							data: []
						},
						series: [{
								type: 'scatter',
								coordinateSystem: 'geo',
								data: convertedData[0],
								symbolSize: 4, //原点大小
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#ddb926'
									}
								}
							},
							{
								id: 'bar',
								zlevel: 2,
								type: 'bar',
								symbol: 'none',
								itemStyle: {
									normal: {
										color: '#ddb926'
									}
								},
								data: []
							}
						]
					};

					function renderBrushed(params) {
						var mainSeries = params.batch[0].selected[0],
							selectedItems = [],
							categoryData = [],
							barData = [],
							maxBar = 30,
							sum = 0,
							count = 0;
						for(var i = 0, len = mainSeries.dataIndex.length; i < len; i++) {
							var rawIndex = mainSeries.dataIndex[i];
							var dataItem = convertedData[0][rawIndex];
							var pmValue = dataItem.value[2];
							sum += pmValue;
							count++;
							selectedItems.push(dataItem);
						}
						selectedItems.sort(function(a, b) {
							return a.value[2] - b.value[2];
						});
						var serviceList = [];
						getCityCarAddress().then((result) => {
							let tmpcity = result.data.data;
							tmpcity.forEach((item, index) => {
								var duix = {};
								var ranking = "Top" + item.PX;
								duix.name = ranking;
								duix.type = "effectScatter";
								duix.coordinateSystem = "geo";
								duix.data = [{
									name: item.FIRSTONLINECITY,
									value: [item.FIRSTONLINELNG, item.FIRSTONLINELAT, "合计：" + item.COUNTS]
								}];
								duix.symbolSize = Math.min(item.PX * 3, 25); //原点大小
								duix.showEffectOn = 'emphasis';
								duix.rippleEffect = {
									brushType: 'stroke'
								};
								duix.hoverAnimation = true;
								duix.label = {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									}
								};
								duix.itemStyle = {
									normal: {
										color: '#50a3ba',
										shadowBlur: 10,
										shadowColor: '#333'
									}
								};
								duix.zlevel = 1;
								option.series.push(duix);
							});
							findCarAddressCount().then((result) => {
								let res = result.data.data;
								res.forEach((item, index) => {
									categoryData.push(item.FIRSTONLINEPROVINCE);
									barData.push(item.COUNT);
								});
								this.setOption({
									yAxis: {
										data: categoryData
									},
									xAxis: {
										axisLabel: {
											show: true
										}
									},
									title: {
										id: 'statistic',
										text: count ? '平均: ' + (sum / count).toFixed(4) : ''
									},
									series: {
										id: 'bar',
										data: barData
									}
								});
							});
							this.setOption(option);
						});
					}
					myChart.on('brushselected', renderBrushed);
					if(option && typeof option === "object") {
						myChart.setOption(option, true);
						myChart.dispatchAction({
							type: 'brush',
							areas: [{
								geoIndex: 0,
								brushType: 'polygon',
								coordRange: [119.19, 34.77]
							}]
						});
					}
				});
			});

		}
	}
</script>