<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:  
*-->
<template>
	<div id="attendance" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getAttendance } from "../../../api/api";
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
			findattendance(date) {

				this.$nextTick(function() {
					this.chartColumn = this.echarts.init(document.getElementById('attendance'));

					getAttendance(date).then((res) => {
						let yearData = [],
							late = [],
							leaveearly = [],
							nowork = [],
							inwork = [];

						res.data.data.forEach((item, index) => {
							yearData.push(item.date); //时间
							late.push(item.late); //迟到人数
							leaveearly.push(item.leaveearly); //早退人数

							nowork.push(parseInt(item.tobe) - parseInt(item.nosign) - parseInt(item.late)); //上班未打卡

							inwork.push(parseInt(item.tobe) - parseInt(item.checkout) - parseInt(item.leaveearly)); //下班未打卡

						});

						this.chartColumn.setOption({
							title: {
								text: '月考勤情况',
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
								data: ['迟到人数', '早退人数', '上班未打卡', '下班未打卡'],
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
									name: '迟到人数',
									type: 'line',
									data: late
								},
								{
									name: '早退人数',
									type: 'line',
									data: leaveearly
								},
								{
									name: '上班未打卡',
									type: 'line',
									data: nowork
								},
								{
									name: '下班未打卡',
									type: 'line',
									data: inwork
								}
							]
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

			that.findattendance(date);
		}
	}
</script>