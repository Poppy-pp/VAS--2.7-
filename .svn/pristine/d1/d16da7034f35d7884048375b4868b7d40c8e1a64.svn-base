<!--* 
* @description: 我的补登列表 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="新装单管理" name="1">
				<mytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 1"></mytodolist>
			</el-tab-pane>
			<!-- <el-tab-pane label="拆除单管理" name="2" disabled>
   				<dismantleMytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 2"></dismantleMytodolist>
		    </el-tab-pane>
		    <el-tab-pane label="维修单管理" name="3" disabled>
		     	<serviceMytodolist :windowOutHeight="windowOutHeight" v-if="activeName == 3"></serviceMytodolist>
		    </el-tab-pane> -->
		</el-tabs>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	//组件引入
	import mytodolist from 'components/businessManage/myOrderSupplementInfo/mytodolist';
	import dismantleMytodolist from 'components/businessManage/myOrderSupplementInfo/dismantleMytodolist';
	import serviceMytodolist from 'components/businessManage/myOrderSupplementInfo/serviceMytodolist';
	export default {
		props: ['windowOutHeight'],
		components: {
			mytodolist,
			dismantleMytodolist,
			serviceMytodolist
		},
		data() {
			return {
				activeName: '1'
			}
		},
		methods: {
			//页面管理切换
			handleClick(tab, event) {
				// console.log(tab.name, event);
			}
		},
		created() {}
	}
</script>