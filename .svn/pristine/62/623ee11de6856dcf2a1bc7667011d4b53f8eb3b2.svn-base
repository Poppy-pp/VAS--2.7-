<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.model" placeholder="条件"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getCustomer">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :data="processs" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="id" width="60">
			</el-table-column>
			<el-table-column prop="id" label="定义ID" align="center">
			</el-table-column>
			<el-table-column prop="key" label="部署ID" align="center">
			</el-table-column>
			<el-table-column prop="name" label="名称" align="center">
			</el-table-column>
			<el-table-column prop="version" label="KEY" align="center">
			</el-table-column>
			<el-table-column prop="createTime" label="版本号" align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="XML" align="center">
			</el-table-column>
			<el-table-column prop="metaInfo" label="图片" align="center">
			</el-table-column>
			<el-table-column prop="metaInfo" label="部署时间" align="center">
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
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="名称" prop="custName">
					<el-input v-model="editForm.custname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="custType">
					<el-input v-model="editForm.custtype"></el-input>
				</el-form-item>
				<el-form-item label="用户ID">
					<el-input v-model="editForm.userid"></el-input>
				</el-form-item>
				<el-form-item label="用户SVCID">
					<el-input v-model="editForm.custsvcid"></el-input>
				</el-form-item>
				<el-form-item label="SalerID">
					<el-input v-model="editForm.aftsalerid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="域名账号">
					<el-input v-model="editForm.accountdomain"></el-input>
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
				<el-form-item label="名称" prop="custName">
					<el-input v-model="addForm.custname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="custType">
					<el-input v-model="addForm.custtype"></el-input>
				</el-form-item>
				<el-form-item label="用户ID">
					<el-input v-model="addForm.userid"></el-input>
				</el-form-item>
				<el-form-item label="用户SVCID">
					<el-input v-model="addForm.custsvcid"></el-input>
				</el-form-item>
				<el-form-item label="SalerID">
					<el-input v-model="addForm.aftsalerid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="域名账号">
					<el-input v-model="addForm.accountdomain"></el-input>
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
	import { getCustomerInfoList, addCustomerInfo, modifyCustomerInfo, removeCustomerInfo } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					model: ''
				},
				processs: [],
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列

				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					key: '',
					name: '',
					version: 1,
					createTime: 0,
					updateTime: 0,
					metaInfo: '',
					category: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					key: '',
					name: '',
					version: 1,
					createTime: 0,
					updateTime: 0,
					metaInfo: '',
					category: '',
				}
			}
		},
		methods: {
			//性别显示转换
			formatcolor(row, column) {
				return row.color == 1 ? '黑' : row.color == 0 ? '白' : '未知';
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getCustomer();
			},
			//获取用户列表
			getCustomer() {
				let para = {
					currentPage: this.currentPage,
					showCount: 12
				};
				this.listLoading = true;
				//NProgress.start();
				getCustomerInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.processs = res.data.data.records;
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

					removeCustomerInfo(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getCustomer();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					key: '',
					name: '',
					version: 1,
					createTime: 0,
					updateTime: 0,
					metaInfo: '',
					category: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							modifyCustomerInfo(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getCustomer();
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
							addCustomerInfo(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getCustomer();
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
					removeCustomerInfo(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getCustomer();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.getCustomer();
		}
	}
</script>