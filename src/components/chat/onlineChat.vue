<template>
	<div id="leftsead">
		<ul>
			<li>
				<a href="javascript:void(0);" @click="openChat" class="hides iconfont icon-liaotian"><i>在线聊天</i></a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	@import '/static/css/common.css';
	@import './css/onlineChat.css';
</style>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			openChat() {
				this.$emit("openChat");
			}
		}
	}
</script>