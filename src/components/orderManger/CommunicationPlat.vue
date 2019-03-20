<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<template v-for="(item,index) in filters.domSearch">
					<template v-if="index == 0">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
								<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
									<el-option label="平台名称" value="platname"></el-option>
									<el-option label="平台IP" value="platip"></el-option>
									<el-option label="平台功能说明" value="remarks"></el-option>
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
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="平台名称" value="platname"></el-option>
										<el-option label="平台IP" value="platip"></el-option>
										<el-option label="平台功能说明" value="remarks"></el-option>
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
							<el-button type="primary" @click="handleQuerySelect" @keyup.native.13="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="platname" label="平台名称" align="center" >
			</el-table-column>
			<el-table-column prop="platip" label="平台IP" align="center" >
			</el-table-column>
			<el-table-column prop="remarks" label="平台功能说明" align="center" >
			</el-table-column>
			<el-table-column label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情">
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除">
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;">
					<el-col :span="24">
						<span class="formTile">平台信息</span>
					</el-col>
					<el-col :span="14">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台名称:</dt>
							<dd>{{ platList.platname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台IP:</dt>
							<dd>{{ platList.platip }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台功能说明:</dt>
							<dd>{{ platList.remarks }}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{ platList.createby }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建时间:</dt>
							<dd>{{ platList.createdate == null ? "" :fmtdata.formatDate.format(new Date(platList.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{ platList.updateby }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改时间:</dt>
							<dd>{{ platList.updatedate == null ? "" :fmtdata.formatDate.format(new Date(platList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="平台名称" prop="platname">
					<el-input v-model="editForm.platname" auto-complete="off" placeholder="请输入平台名称"></el-input>
				</el-form-item>
				<el-form-item label="平台IP" prop="platip">
					<el-input v-model="editForm.platip" auto-complete="off" placeholder="请输入平台IP"></el-input>
				</el-form-item>
				<el-form-item label="平台功能说明" prop="remarks" style="margin-top:20px;">
					<el-input v-model="editForm.remarks" placeholder="请输入平台功能说明"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="平台名称" prop="platname">
					<el-input v-model="addForm.platname" auto-complete="off" placeholder="请输入平台名称"></el-input>
				</el-form-item>
				<el-form-item label="平台IP" prop="platip">
					<el-input v-model="addForm.platip" auto-complete="off" placeholder="请输入平台IP"></el-input>
				</el-form-item>
				<el-form-item label="平台功能说明" prop="remarks" style="margin-top:20px;">
					<el-input v-model="addForm.remarks" placeholder="请输入平台功能说明"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getPlatList, addPlat, modifyPlat, removePlat, getSelectListPlat } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: [],
						content: ''
					}], //查询框
				},
				listData: [],
				platList: [],
				formDialogTableVisible: false,
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					platname: '',
					platip: '',
					remarks: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					platname: '',
					platip: '',
					remarks: '',
				}
			}
		},
		methods: {
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(paltid) {
				this.formDialogTableVisible = true;
				this.platList = '';
				let para = {
					id: paltid,
				}
				getPlatList(para).then((res) => {
					this.platList = res.data.data.records[0];
					console.log(res)
				});
			},
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
				console.log(para);
				// getSortList(para).then((res) => {});
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				// this.getPlat();
				this.handleQuerySelect();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getPlat();
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
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListPlat(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取用户列表
			getPlat() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				this.listLoading = true;
				getPlatList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: row.ID,
						method: "delete"
					};
					removePlat(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						// this.getPlat();
						this.handleQuerySelect();
					});
				}).catch(() => {
					this.listLoading = false;
				});
			},

			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					platname: row.platname,
					platip: row.platip,
					remarks: row.remarks,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					platname: '',
					platip: '',
					remarks: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs['editForm'].validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							platname: this.editForm.platname,
							platip: this.editForm.platip,
							remarks: this.editForm.remarks,
						}
						modifyPlat(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuerySelect();
						}).catch(function(error) {
							this.editLoading = false;
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs['addForm'].validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							platname: this.addForm.platname,
							platip: this.addForm.platip,
							remarks: this.addForm.remarks,
						}
						addPlat(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功！',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getPlat();
						}).catch((error) => {
							this.addLoading = false;
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
					removePlat(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getPlat();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.getPlat();
		}
	}
</script>