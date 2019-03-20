<template>
	<section class="tab_content-wrapper">
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-upload :accept="accept" class="upload-demo" :headers="headers" :data="data" action="/vasms-web/api/v1/imp/imploading/batch_save" name="mediaFile">
						<el-button type="primary" size="large">点击提交<i class="el-icon-upload el-icon--right"></i></el-button>
						<div slot="tip" class="el-upload__tip"> 只能上传excel文件</div>
					</el-upload>
				</div>
			</el-col>

			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-select v-model="data.tableId" :loading="dloading" placeholder="请选择">
						<el-option v-for="item in tablelist" :key="item.tablename" :label="item.tablename" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</el-col>

		</el-row>
	</section>

</template>

<script>
	import util from '../../common/js/util'
	import { getUploadFile } from '../../api/api';

	export default {
		data() {
			return {
				// fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
				accept: '.xls,.xlsx',
				currentPage: 1,
				dloading: false,
				listData: [],
				headers: {
					token: JSON.parse(localStorage.getItem('user')).token
				},
				total: 0,
				tablelist: [],
				data: {
					tableId: ''
				},
				listLoading: false,
				sels: [], //列表选中列
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					tablename: '',
				},
			};
		},
		methods: {
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},

		},
		created() {
			this.dloading = true;
			getUploadFile().then((res) => {
				this.dloading = false;
				this.tablelist = res.data.data.records;
			});
		},
	}
</script>