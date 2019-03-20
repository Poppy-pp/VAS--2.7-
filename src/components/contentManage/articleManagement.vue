<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<template v-for="(item,index) in filters.domSearch">
					<template v-if="index == 0">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" placeholder="请输入查询内容" v-model="filters.domSearch[index].content" @keyup.native.13="handleQuerySelect">
								<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
									<el-option label="文章分类" value="categorydesc"></el-option>
									<el-option label="文章标题" value="title"></el-option>
									<el-option label="文章摘要" value="abstract_"></el-option>
									<el-option label="作者" value="author"></el-option>
									<el-option label="权限" value="priviledge"></el-option>
								</el-select>
								<template v-if="index == filters.domSearch.length-1">
									<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
								</template>
								<template v-else>
									<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
								</template>
							</el-input>
						</div>
					</template>
					<template v-else>
						<el-col :span="24">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" placeholder="请输入查询内容" v-model="filters.domSearch[index].content" @keyup.native.13="handleQuerySelect">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="文章分类" value="categorydesc"></el-option>
										<el-option label="文章标题" value="title"></el-option>
										<el-option label="文章摘要" value="abstract_"></el-option>
										<el-option label="作者" value="author"></el-option>
										<el-option label="权限" value="priviledge"></el-option>
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
									</template>
								</el-input>
							</div>
						</el-col>
					</template>

					<template v-if="index == 0">
						<el-form-item>
							<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-176" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="categorydesc" label="文章分类" width="80" align="center">
			</el-table-column>
			<el-table-column prop="title" label="文章标题" align="center">
			</el-table-column>
			<el-table-column prop="abstract_" label="文章摘要" align="center">
			</el-table-column>
			<el-table-column prop="abstract_pic" label="摘要图片" align="center" width="60">
				<template scope="scope">
					<div class="brod">
						<template v-if="scope.row.categoryid == 6">
							<img :src="scope.row.abstract_pic" class="avatar">
						</template>
						<template v-else>
							<img :src="$store.state.IMG_URL+scope.row.abstract_pic" class="avatar">
						</template>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="author" label="作者" align="center">
			</el-table-column>
			<el-table-column prop="priviledge" label="权限" :formatter="priviledgeFormat" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<template v-if="scope.row.categoryid == 6">
						<el-button id="button" disabled title="编辑">
							<i class="iconfont icon-bianji1 operate"></i>
						</el-button>
						<el-button id="button" disabled>
							<i class='iconfont icon-duigou operate operate-duigou' style="color: #ddd;"></i>
						</el-button>
						<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
							<i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
						</el-button>
					</template>
					<template v-else>
						<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
							<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
						</el-button>
						<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
							<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
						</el-button>
						<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
							<i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
						</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar ipmt5">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;">
					<el-col :span="24">
						<span class="formTile">文章信息</span>
					</el-col>
					<el-col :span="16">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>文章分类:</dt>
							<dd>{{ artList.categorydesc }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>文章标题:</dt>
							<dd>{{ artList.title }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>文章摘要:</dt>
							<dd>{{ artList.abstract_ }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>摘要图片:</dt>
							<dd>
								<template v-if="artList.categoryid == 6">
									<img style="width:40px;height:40px;border-radius:5px;" :src="artList.abstract_pic" alt="图片">
								</template>
								<template v-else>
									<img style="width:40px;height:40px;border-radius:5px;" :src="$store.state.IMG_URL+artList.abstract_pic" alt="图片">
								</template>
							</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>作者:</dt>
							<dd>{{ artList.author }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>权限:</dt>
							<dd>{{ artList.priviledge == 'P' ? '公共' : artList.priviledge == 'E' ? '外部' : artList.priviledge == 'I' ? '内部' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发布日期:</dt>
							<dd>{{ artList.releasedate == null ? "" :fmtdata.formatDate.format(new Date(artList.releasedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>文章内容:</dt>
							<dd v-html="artList.content">{{ artList.content }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="文章分类" prop="categorydesc">
								<el-select v-model="editForm.categorydesc" @visible-change="categoryChange" :loading="categoryLoading" filterable placeholder="请选择文章分类" clearable>
									<el-option v-for="item in categoryTypeList" :key="item.categorydesc" :label="item.categorydesc" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="文章标题" prop="title">
								<el-input v-model="editForm.title" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="文章摘要" prop="abstract_">
								<textarea class="textarea" name="" v-model="editForm.abstract_"></textarea>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="摘要图片" prop="abstract_pic">
								<el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-col :span="8">
							<el-form-item label="权限" prop="priviledge">
								<el-radio-group size="small" v-model="editForm.priviledge">
									<el-radio-button label="P">公共</el-radio-button>
									<el-radio-button label="E">外部</el-radio-button>
									<el-radio-button label="I">内部</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="发布时间" prop="releasedate">
								<el-date-picker v-model="editForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="作者" prop="author">
								<el-input v-model="editForm.author" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="文章内容" prop="content">
								<vueEditor2 ref="myTextEditor2" v-model="editForm.content"></vueEditor2>
							</el-form-item>
						</el-col>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="文章分类" prop="categorydesc">
								<el-select v-model="addForm.categorydesc" @visible-change="categoryChange" :loading="categoryLoading" filterable placeholder="请选择文章分类" clearable>
									<el-option v-for="item in categoryTypeList" :key="item.categorydesc" :label="item.categorydesc" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="文章标题" prop="title">
								<el-input v-model="addForm.title" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="文章摘要" prop="abstract_">
								<textarea class="textarea" name="" v-model="addForm.abstract_"></textarea>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="摘要图片" prop="abstract_pic">
								<el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-col :span="8">
							<el-form-item label="权限" prop="priviledge">
								<el-radio-group size="small" v-model="addForm.priviledge">
									<el-radio-button label="P">公共</el-radio-button>
									<el-radio-button label="E">外部</el-radio-button>
									<el-radio-button label="I">内部</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="发布时间" prop="releasedate">
								<el-date-picker v-model="addForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="作者" prop="author">
								<el-input v-model="addForm.author" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="文章内容" prop="content">
								<vueEditor ref="myTextEditor" v-model="addForm.content"></vueEditor>
							</el-form-item>
						</el-col>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<style type="text/css">
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
	
	div.brod {
		border-radius: 100%;
		width: 35px;
		height: 35px;
		overflow: hidden;
		margin: 2px auto;
	}
	
	div.brod img {
		width: 100%;
		height: 100%;
	}
	
	.el-upload--picture-card {
		overflow: hidden;
	}
	
	.textarea {
		min-height: 135px;
		width: 90%;
	}
</style>

<script>
	import util from '../../common/js/util';
	import vueEditor from 'components/contentManage/vue-editor';
	import vueEditor2 from 'components/contentManage/vue-editor2';
	import { getArtcileList, addArtcile, modifyArtcile, removeArtcile, getArtcileListItem, getArtcileCategoryList, getSelectListArtcile } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		components: {
			vueEditor,
			vueEditor2
		},
		data() {
			return {
				filters: {
					domSearch: [{
						select: ['categorydesc'],
						content: ''
					}], //查询框
					isdelete: '0',
				},
				pickerOptions: { //日期
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				fmtdata: util,
				listData: [],
				customers: [],
				artList: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				categoryTypeList: [], //文章类型
				categoryLoading: false,
				formDialogTableVisible: false,
				imageUrl: '', //头像
				accept: '.jpg,.png,.jpeg',
				editFormRules: {},
				//编辑界面数据
				editForm: {
					highlightflag: '',
					releasedate: '',
					releaseby: '',
					updatedate: '',
					updateby: '',
					id: '',
					parentid: '',
					// categoryid:'',
					title: '',
					abstract_: '',
					abstract_pic: '',
					content: '',
					author: '',
					isdelete: 0,
					topflag: '',
					priviledge: '',
					showorder: 0,
					categorydesc: '',
				},
				editFormId: {
					categoryid: '',
					categorydesc: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					highlightflag: '',
					releasedate: '',
					releaseby: '',
					updatedate: '',
					updateby: '',
					parentid: '',
					categoryid: '',
					title: '',
					abstract_: '',
					abstract_pic: '',
					content: '',
					author: '',
					isdelete: 0,
					topflag: '',
					priviledge: '',
					showorder: 0,
					categorydesc: '',
				}
			}
		},
		methods: {
			// 文章类型
			categoryChange(r) {
				if(!r || this.categoryTypeList.length > 0) return;
				this.categoryLoading = true;
				getArtcileCategoryList().then((res) => {
					this.categoryTypeList = res.data.data.records;
					this.categoryLoading = false;
				});
			},
			// 上传图片成功后
			headImgSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.editForm.abstract_pic = res;
				this.addForm.abstract_pic = res;
			},
			//详情查看
			formDetailHandle(artid) {
				this.formDialogTableVisible = true;
				this.artList = ''; //清空上条数据
				// 获取当前组织信息
				let para = {
					id: artid
				}
				getArtcileListItem(para).then((res) => {
					this.artList = res.data.data;
				});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.handleQuerySelect();
			},
			// 有效 鼠标移入
			mouseoverChange(e) {
				if($(e.target).hasClass('icon-duigou')) {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				} else {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				}
			},
			// 有效 鼠标移除
			mouseoutChange(e) {
				if($(e.target).hasClass('icon-cha')) {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				} else {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				}
			},
			//显示转换
			priviledgeFormat: function(row, col) {
				return row.priviledge == 'P' ? '公共' : row.priviledge == 'E' ? '外部' : row.priviledge == 'I' ? '内部' : '';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isdelete == 1) {
					return 'warning-row';
				}
				return '';
			},
			// 有效按钮切换状态
			handleChange: function(index, row) {
				this.$confirm('确认设置该条记录的状态吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id,
						isdelete: row.isdelete == 0 ? 1 : 0,
					}
					modifyArtcile(para).then((res) => {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						row.isdelete = para.isdelete;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询条件
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.GetPositions();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuerySelect();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListArtcile(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.$message({
						message: "请求错误" + error,
						type: 'error'
					});
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getArtcileList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				});
			},

			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeArtcile(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				// this.editForm = {
				// 	id:row.id,
				// 	categoryid:row.categoryid,
				// 	title:row.title,
				// 	abstract_:row.abstract_,
				// 	content:row.content,
				// 	author:row.author,
				// 	priviledge:row.priviledge,
				// }
				let para = {
					id: row.id,
				}
				getArtcileListItem(para).then((res) => {
					let _this = this;
					this.editForm = res.data.data;
					this.$refs.myTextEditor2.ue.ready(function() {
						this.setContent(_this.editForm.content);
					});
				});
				this.editFormId = {
					categoryid: row.categoryid,
					categorydesc: row.categorydesc,
				}
				// 设置编辑时获取头像方式
				if(row.abstract_pic == undefined || row.abstract_pic == '') {
					this.imageUrl = '';
					return;
				}
				if(row.categoryid == 6) {
					this.imageUrl = row.abstract_pic;
				} else {
					this.imageUrl = this.$store.state.IMG_URL + row.abstract_pic;
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					highlightflag: '',
					releasedate: '',
					releaseby: '',
					updatedate: '',
					updateby: '',
					parentid: '',
					categoryid: '',
					title: '',
					abstract_: '',
					abstract_pic: '',
					content: '',
					author: '',
					isdelete: 0,
					topflag: '',
					priviledge: '',
					showorder: 0,
					categorydesc: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							title: this.editForm.title,
							abstract_: this.editForm.abstract_,
							content: this.$refs.myTextEditor2.ue.getContent(),
							author: this.editForm.author,
							priviledge: this.editForm.priviledge,
							releasedate: this.editForm.releasedate,
							abstract_pic: this.editForm.abstract_pic,
							categoryid: this.editForm.categorydesc,
						}
						if(this.editFormId.categorydesc == this.editForm.categorydesc) {
							para.categoryid = this.editFormId.categoryid;
						} else {
							para.categoryid = this.editForm.categorydesc;
						}
						modifyArtcile(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuery();
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							categoryid: this.addForm.categorydesc,
							title: this.addForm.title,
							abstract_: this.addForm.abstract_,
							abstract_pic: this.addForm.abstract_pic,
							author: this.addForm.author,
							priviledge: this.addForm.priviledge,
							content: this.$refs.myTextEditor.ue.getContent(),
							releasedate: this.addForm.releasedate,
							isdelete: this.addForm.isdelete,
						}
						addArtcile(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.handleQuery();
						});
					}
				});
			},
			selsChange(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: ids,
						method: "delete"
					};
					removeArtcile(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.handleQuery();
		}
	}
</script>