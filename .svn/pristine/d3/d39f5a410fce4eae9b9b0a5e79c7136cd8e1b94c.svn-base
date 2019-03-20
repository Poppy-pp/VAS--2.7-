<!--* 
* @description: 留言管理
* @author: pl 
* @update: pl (2017-09-25 14:26) 
*-->
<template>
	<section class="tab_content-wrapper">
		<!--列表-->
		<el-row class="card" v-loading="listLoading">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;z-index:101;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="作者" value="author"></el-option>
										<!-- <el-option label="发表平台" value=""></el-option>
									       <el-option label="状态" value=""></el-option> -->
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
									</template>
								</el-input>
							</div>
							<el-form-item prop="timeScope" class="sf100">
								<el-date-picker style="width:350px;" v-model="filters.timeScope" type="daterange" placeholder="请选择发表日期">
								</el-date-picker>
							</el-form-item>
						</template>
						<template v-else>
							<el-col :span="24">
								<div style="display:inline-block;margin:0 10px 10px 0;">
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
										<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
											<el-option label="作者" value="author"></el-option>
											<!-- <el-option label="发表平台" value=""></el-option>
									       <el-option label="状态" value=""></el-option> -->
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
						</template>
					</template>
				</el-form>
			</el-col>

			<el-col :span="8" v-for="(item, index) in listData" id="box1">
				<el-card :body-style="{ padding: '0px' }" @mouseenter.native="showOperate" @mouseleave.native="hideOperate">
					<span style="color:#16A085;font-size:18px;">{{item.title != undefined ? '标题' + '：' + item.title : '标题' + '：' + '无'}}</span>
					<div style="padding: 10px;">
						<span class="msgContent" style="-webkit-box-orient:vertical;">{{htmlTransfer(item.content)}}</span>
						<div class="bottom clearfix">
							<time class="time">{{item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd')  }}</time>
							<span class="author">{{item.author}}</span>
						</div>
					</div>

					<!-- 弹出操作框 -->
					<div class="operateDiv">
						<el-button id="button" @click="handleChange(item)" title='回复'>
							<i class='iconfont icon-pinglun3 icon'></i>
						</el-button>
						<el-button id="button" @click="handleEdit(item)" title="编辑">
							<i class="iconfont icon-bianji1 icon"></i>
						</el-button>
						<el-button id="button" @click="handleDel(item)" title="删除">
							<i class="iconfont icon-p-delet icon"></i>
						</el-button>
					</div>
				</el-card>
			</el-col>
			<!-- 默认添加框 -->
			<el-col :span="8">
				<el-card :body-style="{ padding: '0px',height:'149px' }" @click.native="handleAdd">
					<el-button icon="el-icon-plus" title="新增留言" class='addBtn'></el-button>
				</el-card>
			</el-col>
		</el-row>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="标题" prop="title">
								<el-input v-model="editForm.title" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="作者" prop="author">
								<el-input v-model="editForm.author" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="摘要" prop="abstract_">
								<textarea class="textareaTwo" name="" v-model="editForm.abstract_"></textarea>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="权限" prop="priviledge">
								<el-radio-group v-model="editForm.priviledge">
									<el-radio-button label="P">公共</el-radio-button>
									<el-radio-button label="E">外部</el-radio-button>
									<el-radio-button label="I">内部</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发布时间" prop="releasedate">
								<el-date-picker v-model="editForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-form-item label="内容" prop="content">
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
							<el-form-item label="标题" prop="title">
								<el-input v-model="addForm.title" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="作者" prop="author">
								<el-input v-model="addForm.author" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="文章摘要" prop="abstract_">
								<textarea class="textareaTwo" name="" v-model="addForm.abstract_"></textarea>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="权限" prop="priviledge">
								<el-radio-group v-model="addForm.priviledge">
									<el-radio-button label="P">公共</el-radio-button>
									<el-radio-button label="E">外部</el-radio-button>
									<el-radio-button label="I">内部</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发布时间" prop="releasedate">
								<el-date-picker v-model="addForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-form-item label="内容" prop="content">
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

<style type="text/css" media="screen">
	.card {
		position: relative;
	}
	
	.card .el-col-8 {
		margin: 0 10px 10px 0;
		width: 265px !important;
		cursor: pointer;
	}
	
	.card .el-card {
		height: 173px;
	}
	
	.card .msgContent {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.card .el-col-8:hover {}
	
	.card .time,
	.card .author {
		font-size: 13px;
		color: #999;
	}
	
	.card .author {
		margin-left: 10px;
	}
	
	.card .bottom {
		margin: 20px 0 0 0;
		line-height: 12px;
	}
	
	.card .button {
		padding: 0;
		float: right;
	}
	
	.card .clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.card .clearfix:after {
		clear: both
	}
	
	.card .operateDiv {
		position: absolute;
		top: 0;
		left: 0;
		width: 265px;
		height: 100%;
		background-color: #16A085;
		opacity: 0.7;
		line-height: 173px;
		display: none;
	}
	
	.card .operateDiv .icon {
		font-size: 30px;
		color: #fff;
	}
	
	.card .operateDiv #button {
		margin: 5px;
		position: relative;
		left: -138px;
	}
	
	.card .addBtn {
		border: none;
		font-size: 46px;
		color: #16A085;
		line-height: 100px;
		margin-left: calc(32%);
		float: left;
	}
	
	.textareaTwo {
		min-height: 50px;
		width: 97%;
	}
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import vueEditor from 'components/contentManage/vue-editor';
	import vueEditor2 from 'components/contentManage/vue-editor2';
	import { getSelectListArtcile, addArtcile, modifyArtcile, removeArtcile, getSelectListArtcileItem, getArtcileCategoryList, getArtcileListItem } from '../../api/api';

	export default {
		components: {
			vueEditor,
			vueEditor2
		},
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['author'],
						content: ''
					}], //查询框
					timeScope: '',
				},
				pickerOptions: {},
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				ArtcileThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					positionname: [{
						required: true,
						message: '请输入岗位',
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					highlightflag: '',
					releasedate: '',
					releaseby: '',
					updatedate: '',
					updateby: '',
					id: '',
					parentid: '',
					categoryid: 22,
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
					categoryid: 22,
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
			// 鼠标移入触发
			showOperate(e) {
				$(e.target).find(".operateDiv").fadeIn(500);
				$(e.target).find('.operateDiv').children('#button').animate({
					left: '50px',
				}, 500);
			},
			hideOperate(e) {
				$(e.target).find(".operateDiv").fadeOut(500);
				$(e.target).find('.operateDiv').children('#button').animate({
					left: '245px',
				}, 500);
				$(e.target).find('.operateDiv').children('#button').css({
					left: '-138px'
				});
			},

			// 留言板html转换——去掉html标签
			htmlTransfer(ht) {
				if($(ht).length == 0) { //当没有html标签时
					return ht;
				} else { //有html标签时，返回纯文本内容
					return $(ht).text();
				}
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(posID) {
				this.formDialogTableVisible = true;
				this.ArtcileThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: posID
				}
				nanobar.go(70);
				getSelectListArtcile(para).then((res) => {
					this.ArtcileThisList = res.data.data.records[0];
					nanobar.go(100);
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
			// 有效无效开关
			// showData(i){
			// 	this.filters.isactive = i;
			// 	this.GetPositions();
			// },

			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.GetPositions();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.GetPositions();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					domSearch: this.filters.domSearch,
					startdate: this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd') : '',
					enddate: this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd') : '',
					categoryid: 22,
				};
				this.listLoading = true;
				getSelectListArtcile(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			GetPositions() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					categoryid: 22,
					startdate: this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd') : '',
					enddate: this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd') : '',
				};
				this.listLoading = true;
				getSelectListArtcile(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			// 回复
			handleChange() {
				this.$message({
					message: '暂未开通回复功能！',
					type: 'warning'
				});
			},
			//删除
			handleDel(row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: row.id,
						method: 'delete'
					};
					removeArtcile(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.GetPositions();
					});
				}).catch(() => {});
			},
			//显示编辑界面
			handleEdit(row) {
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
					this.editForm = res.data.data; //返回当前留言详情数据
					if(this.editForm.content != null) { //有内容时
						this.$refs.myTextEditor2.ue.ready(function() {
							this.setContent(_this.editForm.content);
						});
					} else { //没有内容时
						this.$refs.myTextEditor2.ue.ready(function() {
							this.setContent('');
						});
					}
				});
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
					categoryid: 22,
					title: '',
					abstract_: '',
					abstract_pic: '',
					content: '',
					author: '',
					topflag: '',
					priviledge: '',
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
							categoryid: this.editForm.categoryid,
						}

						modifyArtcile(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.GetPositions();
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
							categoryid: this.addForm.categoryid,
							title: this.addForm.title,
							abstract_: this.addForm.abstract_,
							abstract_pic: this.addForm.abstract_pic,
							author: this.addForm.author,
							priviledge: this.addForm.priviledge,
							content: this.$refs.myTextEditor.ue.getContent(),
							releasedate: this.addForm.releasedate,
						}
						addArtcile(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.GetPositions();
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
						this.GetPositions();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.GetPositions();
		},

	}
</script>