<!--* 
* @description: 我的补登 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper">
		<el-tabs :tab-position="tabPosition" v-model="activeName" class="newForm_s" @tab-click="handleClick">
			<el-tab-pane label="新装登记" name="1">
				<el-card class="newForm_s_col_2 ml10">
					<div class="text item">
						<section class="myorderFF">
							<newOrderSupplement :windowOutHeight="windowOutHeight"></newOrderSupplement>
						</section>
					</div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	//组件引入
	import newOrderSupplement from 'components/businessManage/declarationFormProcess/newOrderSupplement';
	export default {
		props: ['windowOutHeight'],
		components: {
			newOrderSupplement
		},
		data() {
			return {
				tabPosition: 'left',
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