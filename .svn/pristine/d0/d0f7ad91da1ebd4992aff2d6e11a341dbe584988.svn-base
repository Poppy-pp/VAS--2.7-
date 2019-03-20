<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: chen 
* @update:   
*-->
<template>
	<div id="e2" style="width:100%;height:500px;"></div>
</template>
<script>
	import { getDeclarationtotel, getinstalldetailtotel, findtotel, getMontchRepairCount } from "../../../api/api";
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
			findDeclarationInstallNumber(corpid) {
				let data = [],
					geoCoordMap = {},
					totel = {},
					installdetailtotel = [],
					repairtolcount = [],
					declaration = [];
				this.mapMove = this.echarts.init(document.getElementById('e2'));
				var para = {
					corpid: corpid
				}
				getinstalldetailtotel(para).then((result) => {
					result.data.data.forEach((item, index) => {
						declaration[parseInt(item.YF) - 1] = item.hj;
					});
					findtotel(para).then((result) => {
						var item = result.data.data;
						totel.installdetailcount = item.installdetailcount;
						totel.declarationcount = item.declarationcount;
						totel.repaircounts = item.repaircount;
						getMontchRepairCount(para).then((result) => {
							result.data.data.forEach((item, index) => {
								repairtolcount[6] = item.COUNT;
							});
							getDeclarationtotel(para).then((result) => {
								var corpname, declaration = [];
								for(var obj in result.data.data) {
									corpname = result.data.data[obj].CORPNAME;
									declaration[parseInt(result.data.data[obj].YF) - 1] = result.data.data[obj].DYHJ;
								}
								var myChart = this.mapMove;
								if(corpname == null)
									corpname = "";
								var option = {
									title: {
										text: corpname,
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
									legend: {
										data: ['报单量:' + totel.declarationcount, '安装数:' + totel.installdetailcount, '维修量:' + totel.repaircounts],
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
										right: 40,
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
											name: '报单量:' + totel.declarationcount,
											type: 'bar',
											data: declaration,
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
											name: '安装数:' + totel.installdetailcount,
											type: 'bar',
											data: declaration,
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
											name: '维修量:' + totel.repaircounts,
											type: 'bar',
											data: repairtolcount,
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

						});
					});
				});
			}
		},
		created() {
			let corpid = JSON.parse(sessionStorage.getItem('user'));
			this.$nextTick(function() {
				this.findDeclarationInstallNumber(corpid.corporateInfo.id);
			});
		}
	}
</script>