<!--* 
* @description: 库房-超龄库存汇总
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<div id="main" style="width:100%;height:500px;"></div>
</template>
<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				mainDiv: null
			}
		},
		watch: {
		},
		methods: {
			designEcharts() {
				// 基于准备好的dom，初始化echarts实例
				this.mainDiv = this.$echarts.init(document.getElementById('main'));
				

				axios.get('/vasms-web/api/v1/bi/biViewNameAll?_viewName=VW_BI_OLDPROD_BALANCE').then((res) => {
					let xData = res.data.data.records.map((item,index) => {
						return item.REC_AREA;
					});
					let listData = res.data.data.records.map((item,index) => {
						return item.PRODCOUNT;
					});
				

					// 指定图表的配置项和数据
					var option = {
						title: {//标题
							text: '超2月库存汇总',
						},
						tooltip: {//弹出提示框
							trigger: 'axis',
						},
						legend: {//图例组件
							data: ['订单退回'],
						},
						toolbox: {//工具栏
							show: true,
						            feature: {
							            dataZoom: {
							                yAxisIndex: 'none'
							            },
							            dataView: {readOnly: false},
							            magicType: {type: ['line', 'bar']},
							            restore: {},
							            saveAsImage: {}
						            }
						},
						grid: {//直角坐标系内绘图网格
							left: '3%',
							right: '5%',
							bottom: '3%',
							containLabel: true
						},
						calculable: true,
						xAxis: [{//grid 中的 x 轴
							name:'地区',
							nameTextStyle:{color:'#E70336',fontSize:16},
						        	nameLocation:'center',
							type: 'category',
							data: xData,   //x轴数据
						}],
						yAxis: [{//grid 中的 y 轴
							name:'超龄库存数',
							nameTextStyle:{color:'#E70336',fontSize:16},
							type: 'value'
						}],
						series: [{//系列列表
								name: '超2月库存汇总',
								type: 'line',//柱状/条形图
								smooth: true,
								data: listData,   //数据
								markPoint: {//图表标注
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
								markLine: {//图表标线
									data: [{
										type: 'average',
										name: '平均值'
									}]
								}

							},

						]
					};
					// 使用刚指定的配置项和数据显示图表。
					if(option && typeof option === "object") {
						this.mainDiv.setOption(option, true);
					}
				});
			}
		},
		created() {
			//当页面窗口发生变化的时候 重绘echarts图表
			let _this = this;
			window.onresize = function() {
				setTimeout(() => {
					_this.mainDiv.resize();
				}, 50);
			};

			this.$nextTick(function() {
				this.designEcharts();
			});
		}
	}
</script>