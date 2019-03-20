<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.beneficiary" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="GetInsurances" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :data="insurances" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="" label="类别" align="center" width="120" >
			</el-table-column>
			<el-table-column prop="" label="指令名称" align="center" width="120" >
			</el-table-column>
			<el-table-column prop="" label="指令说明" align="center" >
			</el-table-column>
			<el-table-column prop="" label="指令内容" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="80" align="center" prop="">
				<template scope="scope">
					<el-popover ref="popover" placement="right" width="400" trigger="click">
						<el-table border :data="scope.row.PRODUCT">
							<el-table-column type="index" label="#" width="20" align="center">
							</el-table-column>
							<el-table-column prop="PRODSPEC" label="指令状态" align="center"></el-table-column>
							<el-table-column prop="PRODMODEL" label="指令下发时间" align="center"></el-table-column>
							<el-table-column prop="Eprodnum" label="操作" align="center">
								<el-button size="middle" prop="" type="success" @click="handleChange(scope.$index, scope.row)">{{操作}}</el-button>
							</el-table-column>
						</el-table>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover>详情</a>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>

		<!--发送界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="保单号" prop="policyno">
					<el-input v-model="editForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保险公司" prop="insurancecorpid">
					<el-select v-model="editForm.insurancecorpid" filterable placeholder="请选择保险公司" clearable>
						<el-option v-for="item in customers" :label="item.custname" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车辆ID" prop="carsid">
					<el-input v-model="editForm.carsid"></el-input>
				</el-form-item>
				<el-form-item label="保险项目" prop="insurancetype">
					<el-input v-model="editForm.insurancetype"></el-input>
				</el-form-item>
				<el-form-item label="出单日" prop="issuedate">
					<el-input v-model="editForm.issuedate"></el-input>
				</el-form-item>
				<el-form-item label="生效日" prop="effectivedate">
					<el-input v-model="editForm.effectivedate"></el-input>
				</el-form-item>
				<el-form-item label="到期日" prop="expiredate">
					<el-input v-model="editForm.expiredate" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保单价格" prop="price">
					<el-input v-model="editForm.price"></el-input>
				</el-form-item>
				<el-form-item label="保单赔偿限额" prop="indemnitylimit">
					<el-input v-model="editForm.indemnitylimit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保险受益人" prop="beneficiary">
					<el-input v-model="editForm.beneficiary"></el-input>
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
				<el-form-item label="保单号" prop="policyno">
					<el-input v-model="editForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保险公司" prop="insurancecorpid">
					<el-select v-model="editForm.insurancecorpid" filterable placeholder="请选择保险公司" clearable>
						<el-option v-for="item in customers" :label="item.custname" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车辆ID" prop="carsid">
					<el-input v-model="editForm.carsid"></el-input>
				</el-form-item>
				<el-form-item label="保险项目" prop="insurancetype">
					<el-input v-model="editForm.insurancetype"></el-input>
				</el-form-item>
				<el-form-item label="出单日" prop="issuedate">
					<el-input v-model="editForm.issuedate" :picker-options="pickerOptions0"></el-input>
				</el-form-item>
				<el-form-item label="生效日" prop="effectivedate">
					<el-input v-model="editForm.effectivedate" :picker-options="pickerOptions0"></el-input>
				</el-form-item>
				<el-form-item label="到期日" prop="expiredate">
					<el-input v-model="editForm.expiredate" auto-complete="off" :picker-options="pickerOptions0"></el-input>
				</el-form-item>
				<el-form-item label="保单价格" prop="price">
					<el-input v-model="editForm.price"></el-input>
				</el-form-item>
				<el-form-item label="保单赔偿限额" prop="indemnitylimit">
					<el-input v-model="editForm.indemnitylimit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保险受益人" prop="beneficiary">
					<el-input v-model="editForm.beneficiary"></el-input>
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
	import { getInsuranceInfoList, addInsuranceInfo, modifyInsuranceInfo, removeInsuranceInfo, getCustomerInfoList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					Formate(value) {
						return new Date(value).toLocaleDateString().replace(/\//g, "-");
					},
					beneficiary: '',
					insurancetype: '',
				},
				insurances: [],
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
					policyno: '',
					insurancecorpid: '',
					carsid: '',
					insurancetype: '',
					issuedate: '',
					effectivedate: '',
					expiredate: '',
					price: '',
					indemnitylimit: '',
					beneficiary: '',
					isactive: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					policyno: '',
					insurancecorpid: '',
					carsid: '',
					insurancetype: '',
					issuedate: '',
					effectivedate: '',
					expiredate: '',
					price: '',
					indemnitylimit: '',
					beneficiary: '',
					isactive: '',
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
			}
		},
		methods: {
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.dateFormatter == "" || row.dateFormatter == undefined) return;
				return util.formatDate.format(new Date(row.dateFormatter), 'yyyy-MM-dd hh:mm:ss');
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.GetInsurances();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.GetInsurances();
			},
			//获取保单列表
			GetInsurances() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					beneficiary: this.filters.beneficiary,
					insurancetype: this.filters.insurancetype,
				};
				this.listLoading = true;
				getInsuranceInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.insurances = res.data.data.records;
					this.insurances.dateString = '';
					this.listLoading = false;
				}).catch((error) => {
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
					policyno: '',
					insurancecorpid: '',
					carsid: '',
					insurancetype: '',
					issuedate: '',
					effectivedate: '',
					expiredate: '',
					price: '',
					indemnitylimit: '',
					beneficiary: '',
					isactive: '',
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
							modifyInsuranceInfo(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.GetInsurances();
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
							addInsuranceInfo(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.GetInsurances();
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
					removeInsuranceInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.GetInsurances();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.GetInsurances();
		}
	}
</script>