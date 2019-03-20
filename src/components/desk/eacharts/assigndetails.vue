<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="assigndetails" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getAssignDetails, getCorpnameMontchRepairCount } from "../../../api/api";
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
					this.chartColumn = this.echarts.init(document.getElementById('assigndetails'));
					let yearData1 = [],
						yearData2 = [],
						installcomplete = [],
						removecomplete = [],
						repaircount = [],
						times = '';

					let pram = {
						declaredate: date.date,
						status: 4
					};

					let pram1 = {
						declaredate: date.date,
						status: -4
					};

					let pm = {
						acquiredmontch: date.date
					}

					//维修量
					getCorpnameMontchRepairCount(pm).then((result) => {
						result.data.data.forEach((item, index) => {
							repaircount.push(item.COUNT);
						});
					});

					getAssignDetails(pram).then((res) => {
						res.data.data.forEach((item, index) => {
							yearData1.push(item.SJ); //时间
							installcomplete.push(item.SL); //安装

						});

						getAssignDetails(pram1).then((res) => {

							res.data.data.forEach((item, index) => {
								yearData2.push(item.SJ); //时间
								removecomplete.push(item.SL); //拆除

							});

							yearData1.length > yearData2.length ? times = yearData1 : times = yearData2;

							//   console.log(yearData1.length  +"--"+yearData2.length);

							this.chartColumn.setOption({
								title: {
									text: '文员月订单处理情况',
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
									data: ['新装派单', '拆除派单', '维修量'],
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
										name: '新装派单',
										type: 'line',
										data: installcomplete
									},
									{
										name: '拆除派单',
										type: 'line',
										data: removecomplete
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