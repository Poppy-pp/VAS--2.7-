<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.model" @keyup.native.enter="handleQuery" placeholder="	请输入关键字"></el-input>
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
		<el-table border :max-height="windowOutHeight-200" stripe :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="150" >
			</el-table-column>
			<el-table-column prop="password" label="密码" width="150" >
			</el-table-column>
			<el-table-column prop="usertype" label="用户类型(C=客户，E=员工)" width="150" >
			</el-table-column>
			<el-table-column prop="createdate" label="首次创建日期" width="150" >
			</el-table-column>
			<el-table-column prop="createby" label="创建人" width="150" >
			</el-table-column>
			<el-table-column prop="updatedate" label="修改日期" width="150" >
			</el-table-column>
			<el-table-column prop="updateby" label="修改人" width="150" >
			</el-table-column>
			<el-table-column prop="firstlogintime" label="第一次登录时间" width="150" >
			</el-table-column>
			<el-table-column prop="lastlogintime" label="最后一次登录时间" width="150" >
			</el-table-column>
			<el-table-column prop="logincount" label="总登录次数" width="150" >
			</el-table-column>
			<el-table-column prop="isenable" label="是否有效（Y是N否）" width="150" >
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
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户类型(C=客户，E=员工)" prop="usertype">
					<el-input v-model="editForm.usertype" auto-complete="off"></el-input>
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
				<el-form-item label="第一次登录时间" prop="firstlogintime">
					<el-input v-model="editForm.firstlogintime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="最后一次登录时间" prop="lastlogintime">
					<el-input v-model="editForm.lastlogintime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="总登录次数" prop="logincount">
					<el-input v-model="editForm.logincount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否有效（Y是N否）" prop="isenable">
					<el-input v-model="editForm.isenable" auto-complete="off"></el-input>
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
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="editForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户类型(C=客户，E=员工)" prop="usertype">
					<el-input v-model="editForm.usertype" auto-complete="off"></el-input>
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
				<el-form-item label="第一次登录时间" prop="firstlogintime">
					<el-input v-model="editForm.firstlogintime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="最后一次登录时间" prop="lastlogintime">
					<el-input v-model="editForm.lastlogintime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="总登录次数" prop="logincount">
					<el-input v-model="editForm.logincount" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否有效（Y是N否）" prop="isenable">
					<el-input v-model="editForm.isenable" auto-complete="off"></el-input>
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
	import { getSysUserInfoList, addSysUserInfo, modifySysUserInfo, removeSysUserInfo, getCustomerInfoList } from '../../api/api';

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
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					password: '',
					usertype: '',
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					firstlogintime: '2017-01-05',
					lastlogintime: '2017-01-05',
					logincount: 0,
					isenable: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					name: '',
					password: '',
					usertype: '',
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					firstlogintime: '2017-01-05',
					lastlogintime: '2017-01-05',
					logincount: 0,
					isenable: '',
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
				getSysUserInfoList(para).then((res) => {
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

					removeSysUserInfo(para).then((res) => {
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
							modifySysUserInfo(para).then((res) => {
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
							addSysUserInfo(para).then((res) => {
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
					removeSysUserInfo(para).then((res) => {
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