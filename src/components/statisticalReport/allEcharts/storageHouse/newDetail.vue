<!--* 
* @description: 库房-新装明细
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
				mainDiv: null,
			}
		},
		methods: {
			designEcharts() {
				// 基于准备好的dom，初始化echarts实例
				this.mainDiv = this.$echarts.init(document.getElementById('main'));
				

				axios.get('/vasms-web/api/v1/bi/biViewNameAll?_viewName=VW_BI_INSTALLDETAIL_BY_MODEL').then((res) => {
					// 去重设备型号
					let xData = [...new Set(res.data.data.records.map((item,index) => {
						return item.PRODMODEL;
					}))];
					// 地区去重
					let yData = [...new Set(res.data.data.records.map((item,index) => {
						return item.INSTALLAREA;
					}))];
					let listData = res.data.data.records.map((item,index) => {
						return item.NUM;
					});
					


					// 指定图表的配置项和数据
					var option = {
						    title: {
						        text: '设备新装明细'
						    },
						    tooltip: {
						        trigger: 'axis'
						    },
						    legend: {
						        data:yData
						    },
						    grid: {
						        left: '3%',
						        right: '5%',
						        bottom: '3%',
						        containLabel: true
						    },
						    toolbox: {
						        feature: {
						            saveAsImage: {}
						        }
						    },
						    xAxis: {
						        name:'设备型号',
						        nameTextStyle:{color:'#E70336',fontSize:16},
						        nameLocation:'center',
						        type: 'category',
						        boundaryGap: false,
						        data: xData
						    },
						    yAxis: {
						        name:'新装台数',
						        nameTextStyle:{color:'#E70336',fontSize:16},
						        type: 'value',
						    },
						    series: [
						        {
						            name:yData[0],
						            type:'line',
						            data:[120, 132, 101, 134, 90, 230, 210,130,254,120]
						        },
						        {
						            name:yData[1],
						            type:'line',
						            data:[220, 182, 191, 234, 290, 330, 310]
						        },
						        {
						            name:yData[2],
						            type:'line',
						            data:[150, 232, 201, 154, 190, 330, 410]
						        },
						        {
						            name:yData[3],
						            type:'line',
						            data:[320, 332, 301, 334, 390, 330, 320]
						        },
						        {
						            name:yData[4],
						            type:'line',
						            data:[220, 332, 201, 334, 290, 330, 320]
						        },
						        {
						            name:yData[5],
						            type:'line',
						            data:[320, 382, 391, 334, 390, 330, 310]
						        },
						        {
						            name:yData[6],
						            type:'line',
						            data:[450, 432, 401, 454, 490, 430, 410]
						        },
						        {
						            name:yData[7],
						            type:'line',
						            data:[520, 632, 701, 834, 990, 530, 520]
						        },
						        {
						            name:yData[8],
						            type:'line',
						            data:[920, 932, 901, 934, 1290, 1330, 1320]
						        }
						    ]
						};


					// 使用刚指定的配置项和数据显示图表
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
		},

	}
</script>