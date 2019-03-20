<template>
	<div style="width:100%;" v-loading="mapLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
		<el-amap vid="vuemap4" 
			:center="center" 
			:plugin="plugin" 
			:zoom="zoom" 
			:events="events" 
			style="width:100%;height:300px;">
		</el-amap>
		<div v-if="distanceDataList">
			<span><span style="color:red;font-size:15px;">{{ distanceDataList.name }}</span>，距离预约安装地址：<span style="color:#555;font-weight:bold;font-size:15px;">{{ distanceDataList.distance }}</span>米</span>
			<el-tag type="success" size="mini">最近</el-tag>
		</div>
	</div>
</template>
<style type="text/css" scoped>
	div.amap-geolocation-con {
		z-index: 100 !important;
	}
	div.amap-maps{
		font-size: 12px;
	}
</style>
<script>
	import { userLocationHistory } from '../../api/api';
	export default {
		props:{
			groupid:{
				default:''
			},
			installposition:{
				type:Array,
				default() {
			        return [104.0668129921, 30.5427337221]
			    }
			}
		},
		data() {
			let self = this;
			return {
				mapLoading:false,
				zoom: 14,
				center: [121.59996, 31.197646],
				curposition:[],
				pathSimplifierIns:'',
				distanceDataList:{},
				vueMap: null,
				events: {
					init(map) {
						self.vueMap = map;
					}
				},
				plugin: [{
					pName: 'Geolocation',
					enableHighAccuracy: true,
					showButton: true, //显示定位按钮，默认：true
					showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
					zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if(result && result.position) {
									self.curposition = [result.position.lng, result.position.lat];
								} else {
									self.curposition = [104.0668129921, 30.5427337221];
								}
							});
						}
					}
				}]
			};
		}, 
		methods: {
			// 信息提示窗体
			infoWindow(marker, content) {
				var infoWindow = new AMap.InfoWindow({
					content: content,
					offset: {
						x: 0,
						y: -30
					}
				});
				marker.on("click", (e) => {
					infoWindow.open(this.vueMap, marker.getPosition());
				});
			},
			compare(property){
			    return function(a,b){
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2;
			    }
			},
			//点之间的距离 返回所有人员点
			spotDistance(startSpot,otherSpot){
			    let lnglat = new AMap.LngLat(startSpot[0], startSpot[1]),
			    distanceList = [];
			    otherSpot.forEach((spot,index)=>{
			    	let ps = {
			    		path:[]
			    	};
			    	ps.name = spot.employeename;
			    	ps.lng = spot.lng;
			    	ps.lat = spot.lat;
			    	ps.distance = lnglat.distance([spot.lng, spot.lat]).toFixed(2);
			    	ps.path.push([startSpot[0],startSpot[1]]);
					ps.path.push([spot.lng,spot.lat]);
			    	distanceList.push(ps);
			    });
			    this.distanceDataList = distanceList.sort(this.compare('distance'))[0];
			    return distanceList.sort(this.compare('distance'));
			},
			//根据用户选取地址 标注点
			addMarker() {
				this.$nextTick(function(){
					let map = this.vueMap,
					position = this.curposition;
					if(this.installposition.length != 0){
						position = this.installposition;
					}
					let marker = new AMap.Marker({
						bubble: true,
						animation: "AMAP_ANIMATION_DROP",
						position: position,
						title:"预约安装地址",
						map:map
					});
					if(this.pathSimplifierIns){
						this.pathSimplifierIns.setData([]);
					}
					map.setCenter(position);
					map.setFitView();
					map.clearMap();
					this.initPath(position,map,this.groupid);
				});
			},
			//绘画安装人员到预约安装地址的轨迹
			initPath(endposition,map,groupid){
				let _this = this;
				 AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
			        if (!PathSimplifier.supportCanvas) {
			            alert('当前环境不支持 Canvas！');
			            return;
			        }
	                var defaultRenderOptions = {
			            renderAllPointsIfNumberBelow: -1,
			            pathTolerance: 2,
			            keyPointTolerance: 0,
			            pathLineStyle: {
			                lineWidth: 2,
			                strokeStyle: '#F7B538',
			                borderWidth: 1,
			                borderStyle: '#eeeeee',
			                dirArrowStyle: false
			            },
			            pathLineHoverStyle: {
			                lineWidth: 2,
			                strokeStyle: 'rgba(204, 63, 88,1)',
			                borderWidth: 1,
			                borderStyle: '#cccccc',
			                dirArrowStyle: false
			            },
			            pathLineSelectedStyle: {
			                lineWidth: 4,
			                strokeStyle: '#00bd01',
			                borderWidth: 1,
			                borderStyle: '#cccccc',
			                dirArrowStyle: true
			            },
			            dirArrowStyle: {
			                stepSpace: 35,
			                strokeStyle: '#ffffff',
			                lineWidth: 2
			            },
			            startPointStyle: {
			                radius: 4,
			                fillStyle: '#00c1de',
			                lineWidth: 1,
			                strokeStyle: '#eeeeee'
			            },
			            endPointStyle: {
			                radius: 4,
			                fillStyle: '#dc3912',
			                lineWidth: 1,
			                strokeStyle: '#eeeeee'
			            },
			            keyPointStyle: {
			                radius: 3,
			                fillStyle: 'rgba(8, 126, 196, 1)',
			                lineWidth: 1,
			                strokeStyle: '#eeeeee'
			            },
			            keyPointHoverStyle: {
			                radius: 4,
			                fillStyle: 'rgba(0, 0, 0, 0)',
			                lineWidth: 2,
			                strokeStyle: '#ffa500'
			            },
			            keyPointOnSelectedPathLineStyle: {
			                radius: 4,
			                fillStyle: 'rgba(8, 126, 196, 1)',
			                lineWidth: 2,
			                strokeStyle: '#eeeeee'
			            }
			        };
			         var pathSimplifierIns = new PathSimplifier({
			            zIndex: 100,
			            map: map,
			            autoSetFitView:false,
			            getPath(pathData, pathIndex) {
			                return pathData.path;
			            },
			            getHoverTitle(pathData, pathIndex, pointIndex) {
			                if (pointIndex == 0) {
			                    return '预约安装地址点';
			                }
			                return pathData.name + '到预约安装地址:' + pathData.distance +'米';
			            },
			            renderOptions: defaultRenderOptions
			        });
			        _this.pathSimplifierIns = pathSimplifierIns;
			        let para = {
						groupid:groupid
					}
					_this.mapLoading = true;
			        userLocationHistory(para).then((res)=>{
			        	_this.mapLoading = false;
						if(res.data.result.code == 0){
							let reslist = res.data.data.records;
							let path1 = _this.spotDistance(endposition,reslist);
							pathSimplifierIns.setData(path1);
							if(path1.length > 0)
							    pathSimplifierIns.setSelectedPathIndex(0);
						}
					});
			    });
			}
		}
	};
</script>
