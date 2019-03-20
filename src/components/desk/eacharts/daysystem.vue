<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="daysystem" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getDaySystemWithin, getMontchRepairCount } from "../../../api/api";
	export default {
		props: ["echarts"],
		data() {
			return {
				chartColumn: null
			}
		},
		created() {
			let that = this;
			//当页面窗口发生变化的时候 重绘echarts图表
			window.onresize = function() {
				setTimeout(() => {
					that.chartColumn.resize();
				}, 50);
			}
			this.$nextTick(function() {
				let repaircount = [];
				this.chartColumn = this.echarts.init(document.getElementById('daysystem'));
				let pram = {
					type: 'W'
				}
				getMontchRepairCount(pram).then((result) => {
					result.data.data.forEach((item, index) => {
						repaircount.push(item.COUNT);
					});
				});
				getDaySystemWithin().then((res) => {
					let yearData = [],
						barData = [],
						lineData = [],
						stackData = [];
					res.data.data.forEach((item, index) => {
						yearData.push(item.DATAS);
						barData.push(item.INSTALLDETAILCOUNT); //安装量
						lineData.push(item.DECLARATIONCOUNT); //报单量
						stackData.push(item.AFTERSALECOUNT); //售后拆除量

					});

					this.chartColumn.setOption({
						title: {
							text: '万网业务',
							left: 'left'
						},
						tooltip: {
							trigger: 'axis',
							// formatter:(p,c,callback)=>{
							//     console.log(p,c)
							// }
						},
						grid: {
							left: 40,
							right: 20,
						},
						legend: {
							data: ['报单量', '安装量', '新装拆除量', '维修量'],
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
							data: yearData
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
								name: '报单量',
								type: 'line',
								data: lineData
							},
							{
								name: '安装量',
								type: 'line',
								data: barData
							},
							{
								name: '新装拆除量',
								type: 'line',
								data: stackData
							},
							{
								name: '维修量',
								type: 'line',
								data: repaircount
							}
						]
					});

				});

			});

		}
	}
</script>