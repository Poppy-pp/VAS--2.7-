<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.model" @keyup.native.enter="handleQuery" placeholder="姓名"></el-input>
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
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column prop="batchno" label="批号">
			</el-table-column>
			<el-table-column prop="supplierid" label="供应商ID">
			</el-table-column>
			<el-table-column prop="storageid" label="库房ID">
			</el-table-column>
			<el-table-column prop="productid" label="产品ID">
			</el-table-column>
			<el-table-column prop="outquantity" label="出库数量">
			</el-table-column>
			<el-table-column prop="outprice" label="出库价">
			</el-table-column>
			<el-table-column prop="createdate" label="首次创建日期">
			</el-table-column>
			<el-table-column prop="createby" label="创建人">
			</el-table-column>
			<el-table-column prop="updatedate" label="修改日期">
			</el-table-column>
			<el-table-column prop="updateby" label="修改人">
			</el-table-column>
			<el-table-column prop="approvedate" label="批准日期">
			</el-table-column>
			<el-table-column prop="approveby" label="批准人">
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
			<el-button type="danger" @click="batchRemove"  :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="" prop="act_id">
					<el-input v-model="editForm.act_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="" prop="act_status">
					<el-input v-model="editForm.act_status" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批号" prop="batchno">
					<el-input v-model="editForm.batchno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="供应商ID" prop="supplierid">
					<el-input v-model="editForm.supplierid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库房ID" prop="storageid">
					<el-input v-model="editForm.storageid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品ID" prop="productid">
					<el-input v-model="editForm.productid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出库数量" prop="outquantity">
					<el-input v-model="editForm.outquantity" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出库价" prop="outprice">
					<el-input v-model="editForm.outprice" auto-complete="off"></el-input>
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
				<el-form-item label="批准日期" prop="approvedate">
					<el-input v-model="editForm.approvedate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批准人" prop="approveby">
					<el-input v-model="editForm.approveby" auto-complete="off"></el-input>
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
				<el-form-item label="批号" prop="batchno">
					<el-input v-model="addForm.batchno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="供应商ID" prop="supplierid">
					<el-input v-model="addForm.supplierid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="库房ID" prop="storageid">
					<el-input v-model="addForm.storageid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品ID" prop="productid">
					<el-input v-model="addForm.productid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出库数量" prop="outquantity">
					<el-input v-model="addForm.outquantity" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="出库价" prop="outprice">
					<el-input v-model="addForm.outprice" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="首次创建日期" prop="createdate">
					<el-input v-model="addForm.createdate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批准日期" prop="approvedate">
					<el-input v-model="addForm.approvedate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批准人" prop="approveby">
					<el-input v-model="addForm.approveby" auto-complete="off"></el-input>
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
	import { getStoOutList, addStoOut, modifyStoOut, removeStoOut } from '../../api/api';

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
					act_id: '',
					act_status: '',
					id: 0,
					batchno: '',
					supplierid: 0,
					storageid: 0,
					productid: 0,
					outquantity: 0,
					outprice: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					approvedate: '2017-01-05',
					approveby: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					act_id: '',
					act_status: '',
					batchno: '',
					supplierid: 0,
					storageid: 0,
					productid: 0,
					outquantity: 0,
					outprice: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					approvedate: '2017-01-05',
					approveby: '',
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
				getStoOutList(para).then((res) => {
					//this.total = res.data.data.totalResult;
					//this.listData = res.data.data.records;
					this.listLoading = false;
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
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeStoOut(para).then((res) => {
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
					batchno: '',
					supplierid: 0,
					storageid: 0,
					productid: 0,
					outquantity: 0,
					outprice: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					approvedate: '2017-01-05',
					approveby: '',
				};
				this.GetCustomers();
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							modifyStoOut(para).then((res) => {
								this.editLoading = false;
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
							let para = Object.assign({}, this.addForm);
							addStoOut(para).then((res) => {
								this.addLoading = false;
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeStoOut(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {});
			}
		},
		created() {
			this.handleQuery();
		}
	}
</script>