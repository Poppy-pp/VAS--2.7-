<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:   
*-->
<template>
	<div id="zhsystem" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getZhSystem, getCorpnameMontchRepairCount } from "../../../api/api";
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
			findzhsysytem(date) {
				this.$nextTick(function() {
					this.mapMove = this.echarts.init(document.getElementById('zhsystem'));

					let para = {
							declaredate: date.date,
							status: 4
						},
						para1 = {
							declaredate: date.date,
							status: -4
						};

					var corpnames = [],
						installcomplete = [],
						removecomplete = [],
						corpnames1 = [],
						repaircount = [];

					let pm = {
						acquiredmontch: date.date
					}

					//维修量
					/*getCorpnameMontchRepairCount(pm).then((result) => {   
					  console.log(result.data);                      
					     result.data.data.forEach((item,index)=>{                        
					          repaircount.push(item.COUNT); 
					     }); 
					 });  */

					getZhSystem(para1).then((result) => {
						for(var obj in result.data.data) {
							corpnames1.push(result.data.data[obj].CORPNAME);
							removecomplete.push(result.data.data[obj].COUNT);
						}

					});

					getZhSystem(para).then((result) => {

						for(var obj in result.data.data) {
							corpnames.push(result.data.data[obj].CORPNAME);
							installcomplete.push(result.data.data[obj].COUNT);
						}

						var myChart = this.mapMove;

						var option = {
							title: {
								text: '众汇体系月订单情况',

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
											return "报单量:" + p[0].value;
										}

										if(!p[1].value) {
											return "";
										} else {
											return "安装数:" + p[1].value;
										}

										if(!p[2].value) {
											return "";
										} else {
											return "维修量:" + p[2].value;
										}
									}

									if(p.length == 3) {
										if(p[0].value && !p[1].value && !p[2].value) {
											return "";
										} else {

											if(p[0].value == null)
												p[0].value = "0";
											if(p[1].value == null)
												p[1].value = "0";
											if(p[2].value == null)
												p[2].value = "0";

											return "报单量:" + p[0].value + "<br/>" + "安装数:" + p[1].value + "<br/>维修量:" + p[2].value;
										}
									}

								}
							},
							grid: {
								left: 40,
								right: 40,
							},
							legend: {
								data: ['安装量', '拆除量', '维修量']
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
							calculable: true,
							xAxis: [{
								type: 'category',
								data: corpnames > corpnames1 ? corpnames : corpnames1
							}],
							yAxis: [{
								type: 'value'
							}],
							series: [{
									name: '安装量',
									type: 'bar',
									data: installcomplete,
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
								{
									name: '拆除量',
									type: 'bar',
									data: removecomplete,
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
								{
									name: '维修量',
									type: 'bar',
									data: repaircount,
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

								}

							]
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

			this.findzhsysytem(date);

		}
	}
</script>