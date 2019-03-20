<!--* 
* @description: 二维码生成
* @author: wp 
* @update: wp (2018-03-06 14:26) 
*-->
<template>
	<section class="tab_content-wrapper">
		<div class="ewm">
			<el-input placeholder="请输入你需要生成二维码的链接" class="ewmInput" @change="ewmScFunc" v-model="ewmUrl" clearable></el-input>
			<div id="zdSCcodeUrl"></div>
		</div>
	</section>
</template>
<style type="text/css">
	.ewm{
		width: 300px;
		margin: 0 auto;
	}
	.ewmInput{
		width: 300px;
	}
</style>

<script>
	export default {
		data() {
			return {
				ewmUrl:''
			}
		},
		methods: {
			ewmScFunc(v){
				if(!v) {
					$("#zdSCcodeUrl").html('')
					return;
				};
				$("#zdSCcodeUrl").erweima({
					label: '',
					fill: '#222',
					text: v,
					quiet: 0,
					mSize: 13,
					fontcolor: '#409EFF',
					size: 300
				});
			}
		},
		created() {
		}

	}
</script>