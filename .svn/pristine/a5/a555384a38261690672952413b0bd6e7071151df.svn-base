<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:   
*-->
<template>
	<div id="groupinformation" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getGroupInformation, getGroupInformationes } from "../../../api/api";
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
			getGroupInformations(groupid) {
				this.$nextTick(function() {
					let data = [],
						geoCoordMap = {};
					this.mapMove = this.echarts.init(document.getElementById('groupinformation'));

					var para = {
						groupid: groupid
					}

					getGroupInformation(para).then((result) => {
						var groupname, groupcount = [],
							prodmodel = [];
						for(var obj in result.data.data) {
							groupname = result.data.data[obj].GROUPNAME;
							groupcount.push(result.data.data[obj].HEJ);
							prodmodel.push(result.data.data[obj].PRODMODEL);
						}

						var myChart = this.mapMove;

						var option = {
							title: {
								text: groupname,

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
											return "库存量:" + p[0].value;
										}
									}

								}
							},
							grid: {
								left: 40,
								right: 20,
							},
							legend: {
								data: ['库存量']
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
								data: prodmodel
							}],
							yAxis: [{
								type: 'value'
							}],
							series: [{
									name: '库存量:',
									type: 'bar',
									data: groupcount,
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
			getGroupInformationes().then((result) => {
				this.getGroupInformations(result.data.data[0].ID);
			});
		}
	}
</script>