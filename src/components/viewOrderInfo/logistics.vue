<!--* 
* @description: 物流信息
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<div class="logistice_content" v-loading="expandLoading" element-loading-text="物流信息加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
		<div v-if="notext" style="text-align: center;color: #555;margin-top: 40px;">
			<span class="iconfont icon-notfind01" style="font-size:8rem;dispaly:block;color:#555"></span>
			<p>{{ notext }}</p>
		</div>
		<article v-else>
			<section v-for="(item,index) in logisticsList">
				<span class="point-time point-green"></span>
				<time datetime="2013-03">
          <span class="f16">{{ item.acceptTime.split(" ")[1] }}</span>
          <span class="c999">{{ item.acceptTime.split(" ")[0] }}</span>
        </time>
				<div class="aside">
					<p class="things">{{ item.acceptStation.split(" ")[0] }}</p>
					<p class="brief"><span class="text-green">{{ item.acceptStation }}</span></p>
				</div>
			</section>
		</article>
	</div>
</template>
<style type="text/css">
	@import '/static/css/common.css';
</style>
<script>
	import util from '../../common/js/util';
	import { getLogistics } from '../../api/api';
	export default {
		props: ['logisticsID'],
		data() {
			return {
				logisticsList: [],
				notext: '',
				expandLoading: false
			};
		},
		methods: {
			//获取当前物流信息
			getLogistics() {
				let para;
				if(this.$route.query.logisticsID && this.$route.query.token) {
					para = {
						id: this.$route.query.logisticsID,
						token: this.$route.query.token
					}
				} else {
					para = {
						id: this.logisticsID
					}
				}
				this.expandLoading = true;
				getLogistics(para).then((res) => {
					this.expandLoading = false;
					if(res.data.result.code == 0) {
						if(res.data.data.traces.length == 0) {
							this.notext = "暂时没有物流信息";
						} else {
							this.logisticsList = util.sortArray(res.data.data.traces);
						}
					} else {
						this.notext = res.data.result.desc;
					}
				}).catch((error) => {
					this.expandLoading = false;
					this.notext = '加载失败！' + error;
				});
			}
		},
		created() {
			this.getLogistics();
		}
	}
</script>