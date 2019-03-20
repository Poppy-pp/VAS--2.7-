<template>
	<div class="gisnewTab">
		<personnelPositioning></personnelPositioning>
		<!-- <iframe width="933" height="700" src="https://app.powerbi.cn/view?r=eyJrIjoiMDIyOTIwMDktZDVhNS00MTkwLTgwZjAtZDhjZWVjMzM2ZGM2IiwidCI6IjgwYzg1ZTgyLTgzNzEtNDVlYy1hOGViLWIzMDJmYjI4NTU3NiJ9" frameborder="0" allowFullScreen="true"></iframe> -->
	</div>
</template>
<script>
	//人员定位
	import personnelPositioning from 'components/map/personnelPositioning'
	export default {
		components:{
			personnelPositioning
		},
		data() {
			return {
			};
		},
		methods: {
		},
		created() {
		}
	};
</script>