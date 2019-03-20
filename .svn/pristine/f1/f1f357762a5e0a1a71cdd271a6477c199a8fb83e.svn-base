<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.storagename" @keyup.native.enter="handleQuery" placeholder="库房名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-200" stripe :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="35" label="#" align="center">
			</el-table-column>
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column prop="storagename" label="库房名称" align="center">
			</el-table-column>
			<el-table-column prop="storagelevel" label="库房级别" align="center">
			</el-table-column>
			<el-table-column prop="managerid" label="库管ID" align="center">
			</el-table-column>
			<el-table-column prop="createdate" label="首次创建日期" :formatter="dateFormatter" align="center" width="180">
			</el-table-column>
			<el-table-column prop="createby" label="创建人" align="center">
			</el-table-column>
			<el-table-column prop="updatedate" label="修改日期" align="center" width="180">
			</el-table-column>
			<el-table-column prop="updateby" label="修改人" align="center">
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination> -->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="库房名称" prop="storagename">
					<el-input v-model="editForm.storagename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库房级别" prop="storagelevel">
					<el-input v-model="editForm.storagelevel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库管ID" prop="managerid">
					<el-input v-model="editForm.managerid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="首次创建日期" prop="createdate">
					<el-input v-model="editForm.createdate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建人" prop="createby">
					<el-input v-model="editForm.createby" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改日期" prop="updatedate">
					<el-input v-model="editForm.updatedate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改人" prop="updateby">
					<el-input v-model="editForm.updateby" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="库房名称" prop="storagename">
					<el-input v-model="addForm.storagename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库房级别" prop="storagelevel">
					<el-input v-model="addForm.storagelevel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库管ID" prop="managerid">
					<el-input v-model="addForm.managerid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="首次创建日期" prop="createdate">
					<el-input v-model="addForm.createdate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建人" prop="createby">
					<el-input v-model="addForm.createby" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改日期" prop="updatedate">
					<el-input v-model="addForm.updatedate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改人" prop="updateby">
					<el-input v-model="addForm.updateby" auto-complete="off"></el-input>
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
	import { getStorageInfoList, addStorageInfo, modifyStorageInfo, removeStorageInfo } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					storagename: ''
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					act_id: '',
					storagecode: '',
					storagename: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					isdelete: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					act_id: '',
					act_status: '',
					parentid: 0,
					storagecode: '',
					storagename: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					isdelete: '',
				},
			}
		},
		methods: {
			//有效转换器
			formatIsactive(row, column) {
				return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
			},
			//时间转换
			dateFormatter: function(row, col) {
				return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd hh:mm:ss');
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					storagename: this.filters.storagename
				};
				this.listLoading = true;
				getStorageInfoList(para).then((res) => {
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
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeStorageInfo(para).then((res) => {
						this.listLoading = false;
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
				this.editForm = Object.assign({}, row);
				this.GetCustomers();
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					act_id: '',
					act_status: '',
					parentid: 0,
					storagecode: '',
					storagename: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					isdelete: '',
				};
				this.GetCustomers();

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						modifyStorageInfo(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '提交成功',
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
						let para = Object.assign({}, this.addForm);
						addStorageInfo(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '提交成功',
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeStorageInfo(para).then((res) => {
						this.listLoading = false;
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