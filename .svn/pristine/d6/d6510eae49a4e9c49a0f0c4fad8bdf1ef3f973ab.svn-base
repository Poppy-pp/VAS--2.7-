<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.model" placeholder="姓名"></el-input>
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
		<el-table border :data="listData" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="id_" label="id" width="150" >
			</el-table-column>
			<el-table-column prop="rev_" label="verison" width="150" >
			</el-table-column>
			<el-table-column prop="name_" label="名称" width="150" >
			</el-table-column>
			<el-table-column prop="key_" label="key" width="150" >
			</el-table-column>
			<el-table-column prop="category_" label="分类" width="150" >
			</el-table-column>
			<el-table-column prop="create_time_" label="创建时间" width="150" >
			</el-table-column>
			<el-table-column prop="last_update_time_" label="上次更新时间" width="150" >
			</el-table-column>
			<el-table-column prop="version_" label="版本" width="150" >
			</el-table-column>
			<el-table-column prop="meta_info_" label="META_INFO" width="150" >
			</el-table-column>
			<el-table-column prop="deployment_id_" label="部署id" width="150" >
			</el-table-column>
			<el-table-column prop="editor_source_value_id_" label="EDITOR_SOURCE_VALUE_ID_" width="150" >
			</el-table-column>
			<el-table-column prop="editor_source_extra_value_id_" label="EDITOR_SOURCE_EXTRA_VALUE_ID_" width="150" >
			</el-table-column>
			<el-table-column prop="tenant_id_" label="TENANT_ID_" width="150" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="id" prop="id_">
					<el-input v-model="editForm.id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="verison" prop="rev_">
					<el-input v-model="editForm.rev_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name_">
					<el-input v-model="editForm.name_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="key" prop="key_">
					<el-input v-model="editForm.key_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="category_">
					<el-input v-model="editForm.category_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="create_time_">
					<el-input v-model="editForm.create_time_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上次更新时间" prop="last_update_time_">
					<el-input v-model="editForm.last_update_time_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="版本" prop="version_">
					<el-input v-model="editForm.version_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="META_INFO" prop="meta_info_">
					<el-input v-model="editForm.meta_info_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="部署id" prop="deployment_id_">
					<el-input v-model="editForm.deployment_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EDITOR_SOURCE_VALUE_ID_" prop="editor_source_value_id_">
					<el-input v-model="editForm.editor_source_value_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EDITOR_SOURCE_EXTRA_VALUE_ID_" prop="editor_source_extra_value_id_">
					<el-input v-model="editForm.editor_source_extra_value_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="TENANT_ID_" prop="tenant_id_">
					<el-input v-model="editForm.tenant_id_" auto-complete="off"></el-input>
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
				<el-form-item label="id" prop="id_">
					<el-input v-model="editForm.id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="verison" prop="rev_">
					<el-input v-model="editForm.rev_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name_">
					<el-input v-model="editForm.name_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="key" prop="key_">
					<el-input v-model="editForm.key_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类" prop="category_">
					<el-input v-model="editForm.category_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="create_time_">
					<el-input v-model="editForm.create_time_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上次更新时间" prop="last_update_time_">
					<el-input v-model="editForm.last_update_time_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="版本" prop="version_">
					<el-input v-model="editForm.version_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="META_INFO" prop="meta_info_">
					<el-input v-model="editForm.meta_info_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="部署id" prop="deployment_id_">
					<el-input v-model="editForm.deployment_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EDITOR_SOURCE_VALUE_ID_" prop="editor_source_value_id_">
					<el-input v-model="editForm.editor_source_value_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EDITOR_SOURCE_EXTRA_VALUE_ID_" prop="editor_source_extra_value_id_">
					<el-input v-model="editForm.editor_source_extra_value_id_" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="TENANT_ID_" prop="tenant_id_">
					<el-input v-model="editForm.tenant_id_" auto-complete="off"></el-input>
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
	//import NProgress from 'nprogress'
	import { getActModelList, addActModel, modifyActModel, removeActModel, getCustomerInfoList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					model: ''
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id_: '',
					rev_: 0,
					name_: '',
					key_: '',
					category_: '',
					create_time_: '2017-01-05',
					last_update_time_: '2017-01-05',
					version_: 0,
					meta_info_: '',
					deployment_id_: '',
					editor_source_value_id_: '',
					editor_source_extra_value_id_: '',
					tenant_id_: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					id_: '',
					rev_: 0,
					name_: '',
					key_: '',
					category_: '',
					create_time_: '2017-01-05',
					last_update_time_: '2017-01-05',
					version_: 0,
					meta_info_: '',
					deployment_id_: '',
					editor_source_value_id_: '',
					editor_source_extra_value_id_: '',
					tenant_id_: '',
				},
			}
		},
		methods: {
			//有效转换器
			formatIsactive(row, column) {
				return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: 12
				};
				this.listLoading = true;
				//NProgress.start();
				getActModelList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
					//NProgress.done();
				});
			},

			//获取客户列表
			GetCustomers() {
				let para = {};
				getCustomerInfoList(para).then((res) => {
					this.customers = res.data.data.records;
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

					// let para = new FormData();
					// para.append('ids',row.id);
					// para.append('method','delete');

					removeActModel(para).then((res) => {
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
				this.editForm = Object.assign({}, row);
				this.GetCustomers();
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					serialnum: '111',
					policyno: '222',
					carsid: 1,
					isactive: 1,
					insurancecorpid: '',
					issuedate: 2423,
					effectivedate: 4636,
					expiredate: 3534564,
					price: '12424',
					indemnitylimit: 0,
					beneficiary: '35346',
				};
				this.GetCustomers();

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							modifyActModel(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							});
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addActModel(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							});
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
					removeActModel(para).then((res) => {
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