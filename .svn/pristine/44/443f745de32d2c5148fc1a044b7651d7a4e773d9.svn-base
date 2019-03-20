<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.employeename" @keyup.native.13="handleQuery" placeholder="员工姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="handleQuery1(2)">签入</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="info" @click="handleQuery1(1)">签出</el-button>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search" @keyup.native.13="handleQuery">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-170" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="employeename" label="员工" align="center" width="130">
			</el-table-column>
			<el-table-column prop="attendtype" label="考勤类别" :formatter="typeFormatter" align="center" width="100">
			</el-table-column>
			<el-table-column prop="attendtime" label="考勤时间" :formatter="dateFormatter" align="center" width="150">
			</el-table-column>
			<el-table-column prop="attendaddress" label="考勤地址" align="center" width="250">
			</el-table-column>
			<el-table-column prop="attendphonemodel" label="手机型号" align="center">
			</el-table-column>
			<el-table-column prop="attendphonemac" label="手机识别码" align="center" width="160">
			</el-table-column>
			<el-table-column prop="attendphoneos" label="操作系统" align="center">
			</el-table-column>
			<el-table-column prop="attendresult" label="考勤结果" :formatter="resultFormatter" align="center" width="100">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" align="center">
			</el-table-column>
			<!-- <el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)"  title="删除" >
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="员工" prop="employeename">
					<el-input v-model="editForm.employeename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤类别" prop="attendtype">
					<el-input v-model="editForm.attendtype" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤时间" prop="attendtime">
					<el-input v-model="editForm.attendtime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤区域" prop="attendarea">
					<el-input v-model="editForm.attendarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤地址" prop="attendaddress">
					<el-input v-model="editForm.attendaddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤来源" prop="attendsource">
					<el-input v-model="editForm.attendsource" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤规则ID" prop="attendruleid">
					<el-input v-model="editForm.attendruleid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤结果" prop="attendresult">
					<el-input v-model="editForm.attendresult" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-input v-model="editForm.remarks" auto-complete="off"></el-input>
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
				<el-form-item label="员工" prop="employeename">
					<el-input v-model="addForm.employeename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤类别" prop="attendtype">
					<el-input v-model="addForm.attendtype" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤时间" prop="attendtime">
					<el-input v-model="addForm.attendtime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤区域" prop="attendarea">
					<el-input v-model="addForm.attendarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤地址" prop="attendaddress">
					<el-input v-model="addForm.attendaddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤来源" prop="attendsource">
					<el-input v-model="addForm.attendsource" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤规则ID" prop="attendruleid">
					<el-input v-model="addForm.attendruleid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="考勤结果" prop="attendresult">
					<el-input v-model="addForm.attendresult" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-input v-model="addForm.remarks" auto-complete="off"></el-input>
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
	import { getAttdrecordList, addAttdrecord, modifyAttdrecord, removeAttdrecord } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					employeename: '',
					attendtype:'IN'
				},
				listData: [],
				customers: [],
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
					id: 0,
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
				},
			}
		},
		methods: {
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.attendtime == "" || row.attendtime == undefined) return;
				return util.formatDate.format(new Date(row.attendtime), 'yyyy-MM-dd hh:mm:ss');
			},
			// 签入签出状态转换
			typeFormatter: function(row, col) {
				return row.attendtype == 'IN' ? '签入' : row.attendtype == 'OUT' ? '签出' : '';
			},
			// 考勤结果转换
			resultFormatter: function(row, col) {
				return row.attendresult == 'CL' ? '迟到' : row.attendresult == 'LE' ? '早退' : row.attendresult == 'NO' ? '正常' : '';
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
			handleQuery1(type){
				if(type == 1)
					this.filters.attendtype = 'OUT';
				else
					this.filters.attendtype = 'IN';
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					employeename: this.filters.employeename,
					attendtype:this.filters.attendtype
				};
				this.listLoading = true;
				//NProgress.start();
				getAttdrecordList(para).then((res) => {
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
					removeAttdrecord(para).then((res) => {
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
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
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
							modifyAttdrecord(para).then((res) => {
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
							addAttdrecord(para).then((res) => {
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
		},
		created() {
			this.handleQuery();
		}
	}
</script>