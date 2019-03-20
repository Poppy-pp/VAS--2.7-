<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.model" placeholder="请输入关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-170" stripe :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column prop="act_key" label="流程变量key" align="center">
			</el-table-column>
			<el-table-column prop="act_value" label="流程变量value" align="center">
			</el-table-column>
			<el-table-column prop="act_type" label="流程变量类型" align="center">
			</el-table-column>
			<el-table-column prop="busi_table" label="业务表名" align="center">
			</el-table-column>
			<el-table-column prop="busi_column" label="业务列名" align="center">
			</el-table-column>
			<el-table-column prop="act_procinstanceid" label="流程实例id" align="center">
			</el-table-column>
			<el-table-column prop="act_taskid" label="流程任务id" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="流程变量key" prop="act_key">
					<el-input v-model="editForm.act_key" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程变量value" prop="act_value">
					<el-input v-model="editForm.act_value" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程变量类型" prop="act_type">
					<el-input v-model="editForm.act_type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="业务表名" prop="busi_table">
					<el-input v-model="editForm.busi_table" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="业务列名" prop="busi_column">
					<el-input v-model="editForm.busi_column" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程实例id" prop="act_procinstanceid">
					<el-input v-model="editForm.act_procinstanceid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程任务id" prop="act_taskid">
					<el-input v-model="editForm.act_taskid" auto-complete="off"></el-input>
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
				<el-form-item label="流程变量key" prop="act_key">
					<el-input v-model="addForm.act_key" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程变量value" prop="act_value">
					<el-input v-model="addForm.act_value" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程变量类型" prop="act_type">
					<el-input v-model="addForm.act_type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="业务表名" prop="busi_table">
					<el-input v-model="addForm.busi_table" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="业务列名" prop="busi_column">
					<el-input v-model="addForm.busi_column" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程实例id" prop="act_procinstanceid">
					<el-input v-model="addForm.act_procinstanceid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="流程任务id" prop="act_taskid">
					<el-input v-model="addForm.act_taskid" auto-complete="off"></el-input>
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
	import { getActVariableMappingList, addActVariableMapping, modifyActVariableMapping, removeActVariableMapping } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					model: ''
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
					act_key: '',
					act_value: '',
					act_type: '',
					busi_table: '',
					busi_column: '',
					act_procinstanceid: '',
					act_taskid: '',
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					id: 0,
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					act_key: '',
					act_value: '',
					act_type: '',
					busi_table: '',
					busi_column: '',
					act_procinstanceid: '',
					act_taskid: '',
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
				},
			}
		},
		methods: {
			//有效转换器
			formatIsactive(row, column) {
				return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize
				};
				this.listLoading = true;
				//NProgress.start();
				getActVariableMappingList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
					//NProgress.done();
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

					removeActVariableMapping(para).then((res) => {
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
					act_key: '',
					act_value: '',
					act_type: '',
					busi_table: '',
					busi_column: '',
					act_procinstanceid: '',
					act_taskid: '',
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
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
							modifyActVariableMapping(para).then((res) => {
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
							addActVariableMapping(para).then((res) => {
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
					removeActVariableMapping(para).then((res) => {
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