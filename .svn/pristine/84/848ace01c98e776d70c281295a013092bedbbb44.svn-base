<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.STORAGENAME" @keyup.native.enter="handleQuery" placeholder="所属库房"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.PRODMODEL" @keyup.native.enter="handleQuery" placeholder="产品型号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-175" stripe :data="listData" @cell-click="editLimitfunction" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="35" label="#" align="center">
			</el-table-column>
			<el-table-column prop="STORAGENAME" label="所属库房" align="center">
			</el-table-column>
			<el-table-column prop="PRODMODEL" label="产品型号" align="center">
			</el-table-column>
			<el-table-column prop="" label="当前库存数量" align="center">
				<template scope="scope">
					<el-popover ref="popover4" placement="right" width="800" @show="showprodData(scope.row.PRODUCTMODELID,scope.row.STORAGEID,3)" trigger="click">
						<el-table max-height="200" border :data="prodData">
							<el-table-column type="index" width="20" align="center" label="#">
							</el-table-column>
							<el-table-column prop="PRODUCTMODELNAME" label="产品型号" align="center"></el-table-column>
							<el-table-column prop="PRODNUM" label="产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPEC" label="产品类型" align="center"></el-table-column>
							<el-table-column prop="PRODMODELB" label="绑定产品型" align="center"></el-table-column>
							<el-table-column prop="PRODNUMB" label="绑定产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPECB" label="绑定产品类型" align="center"></el-table-column>
						</el-table>
						<!--工具条-->
						<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover4>
						<span class="comnum">{{scope.row.BALANCEQTY}}</span>
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="ISPACK" label="组装数量" align="center">
				<template scope="scope">
					<el-popover ref="popover5" placement="right" width="800" @show="showprodData(scope.row.PRODUCTMODELID,scope.row.STORAGEID,1)" trigger="click">
						<el-table max-height="200" border :data="prodData">
							<el-table-column type="index" width="20" align="center" label="#">
							</el-table-column>
							<el-table-column prop="PRODUCTMODELNAME" label="产品型号" align="center"></el-table-column>
							<el-table-column prop="PRODNUM" label="产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPEC" label="产品类型" align="center"></el-table-column>
							<el-table-column prop="PRODMODELB" label="绑定产品型" align="center"></el-table-column>
							<el-table-column prop="PRODNUMB" label="绑定产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPECB" label="绑定产品类型" align="center"></el-table-column>
						</el-table>
						<!--工具条-->
						<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover5><span class="comnum">{{scope.row.ISPACK}}</span></a>
				</template>
			</el-table-column>
			<el-table-column prop="NOPACK" label="未组装数量" align="center">
				<template scope="scope">
					<el-popover ref="popover6" placement="right" width="800" @show="showprodData(scope.row.PRODUCTMODELID,scope.row.STORAGEID,0)" trigger="click">
						<el-table max-height="200" border :data="prodData">
							<el-table-column type="index" width="20" align="center" label="#">
							</el-table-column>
							<el-table-column prop="PRODUCTMODELNAME" label="产品型号" align="center"></el-table-column>
							<el-table-column prop="PRODNUM" label="产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPEC" label="产品类型" align="center"></el-table-column>
							<el-table-column prop="PRODMODELB" label="绑定产品型" align="center"></el-table-column>
							<el-table-column prop="PRODNUMB" label="绑定产品编号" align="center"></el-table-column>
							<el-table-column prop="PRODSPECB" label="绑定产品类型" align="center"></el-table-column>
						</el-table>
						<!--工具条-->
						<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover6><span class="comnum">{{scope.row.NOPACK}}</span></a>
				</template>
			</el-table-column>
			<el-table-column prop="BALANCEDATE" label="最后一次更新日期" :formatter="dateFormatter" align="center">
			</el-table-column>
			<el-table-column prop="MINLIMIT" label="最低预警值" align="center">
			</el-table-column>
			<el-table-column prop="MAXLIMIT" label="最高预警值" align="center">
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editlimtVisible" :close-on-click-modal="false" style="width:800px;margin:0px auto;">
			<el-form :model="editlmitForm" label-width="100px" :rules="editFormRules" ref="editlmitForm">

				<el-form-item label="最低预警值" prop="MINLIMIT">
					<el-input v-model="editlmitForm.minlimit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="最高预警值" prop="MAXLIMIT">
					<el-input v-model="editlmitForm.maxlimit" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editlimtVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editLimitSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getStockList, addStockList, modifyStockList, removeStockList, getProdIDInfoList } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					STORAGENAME: '',
					PRODMODEL: '',
				},
				pickerOptions: { //日期
				},
				listData: [],
				prodData: [],
				customers: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editlimtVisible: false, //编辑预警值页面不显示
				editLoading: false,
				editFormRules: {},
				type: 3,
				//编辑界面数据
				editForm: {
					act_id: '',
					storagecode: '',
					STORAGENAME: '',
					PRODMODEL: '',
					BALANCEQTY: 5,
					BALANCEDATE: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isdelete: '',
				},

				editlmitForm: {
					id: '',
					storageid: '',
					storagename: '',
					productmodelid: '',
					prodmodel: '',
					balanceqty: '',
					balancedate: '',
					act_id: '',
					act_status: '',
					vwid: '',
					minlimit: '',
					maxlimit: ''
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
					STORAGENAME: '',
					PRODMODEL: '',
					BALANCEQTY: '',
					BALANCEDATE: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isdelete: '',
				},
				dtotal: 0,
				dcurrentPage: 0,
				dpageSize: 15,
				prodid: '',
				stoid: ''
			}
		},
		methods: {
			//判断库存数量是否超过预警值，超过就标红
			tableRowClassName: function(row, index) {
				var max = row.MAXLIMIT;
				var num = row.BALANCEQTY;
				var min = row.MINLIMIT;
				if(num >= max || num <= min) {
					console.log('laile');
					return 'info-row';
				}
				return '';
			},
			// 显示关联的设备ID信息
			showprodData(prodid, stoid, type) {
				let para = {
					prodmodelid: prodid,
					storageid: stoid,
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
				}
				this.type = type;
				if(type != 3) para.ispack = type;
				//获取设备信息
				getProdIDInfoList(para).then((res) => {
					if(res.data.result.code == 0) {
						this.dtotal = res.data.data.totalResult;
						this.prodData = res.data.data.records;
						this.stoid = stoid;
						this.prodid = prodid;
					}
				});
			},
			//有效转换器
			formatIsactive(row, column) {
				return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
			},
			//时间转换
			dateFormatter: function(row, col) {
				if(row.BALANCEDATE == "" || row.BALANCEDATE == undefined) return;
				return util.formatDate.format(new Date(row.BALANCEDATE), 'yyyy-MM-dd');
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
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.showprodData(this.prodid, this.stoid, this.type);
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.showprodData(this.prodid, this.stoid, this.type);
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					STORAGENAME: this.filters.STORAGENAME,
					PRODMODEL: this.filters.PRODMODEL,
				};
				this.listLoading = true;
				getStockList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
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
					act_id: '',
					act_status: '',
					parentid: 0,
					storagecode: '',
					STORAGENAME: '',
					PRODMODEL: '',
					BALANCEQTY: '',
					BALANCEDATE: '',
					storagelevel: 0,
					managerid: 0,
					createdate: '2017-01-05',
					createby: '',
					updatedate: '2017-01-05',
					updateby: '',
					isdelete: '',
				};
				// this.GetCustomers();

			},
			editLimitfunction(row, column, cell, event) {
				if(column.property == 'MINLIMIT' || column.property == 'MAXLIMIT') {
					this.editlimtVisible = true;
					this.editlmitForm = {
						vwid: row.VWID,
						minlimit: row.MINLIMIT,
						maxlimit: row.MAXLIMIT,
						id: row.ID,
						storageid: row.STORAGEID,
						storagename: row.STORAGENAME,
						productmodelid: row.PRODUCTMODELID,
						prodmodel: row.PRODMODEL,
						balanceqty: row.BALANCEQTY,
						balancedate: row.BALANCEDATE,
						act_id: row.ACT_ID,
						act_status: row.ACT_STATUS,
					}
				}

			},
			//编辑预警值
			editLimitSubmit: function() {
				this.editLoading = true;
				console.log(this.editlmitForm);
				let para = {
					vwid: this.editlmitForm.vwid,
					minlimit: this.editlmitForm.minlimit,
					maxlimit: this.editlmitForm.maxlimit,
					id: this.editlmitForm.id,
					storageid: this.editlmitForm.storageid,
					storagename: this.editlmitForm.storagename,
					productmodelid: this.editlmitForm.productmodelid,
					prodmodel: this.editlmitForm.prodmodel,
					balanceqty: this.editlmitForm.balanceqty,
					balancedate: this.editlmitForm.balancedate,
					act_id: this.editlmitForm.act_id,
					act_status: this.editlmitForm.act_status,
				}
				modifyStockList(para).then((res) => {
					this.editLoading = false;
					if(res.data.result.code == 0) {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						this.$refs['editlmitForm'].resetFields();
						this.editlimtVisible = false;
						this.handleQuery();
					}
				}).catch(() => {
					this.listLoading = false;
				});
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						modifyStockList(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							}
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
						addStockList(para).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							}
						});
					}
				});
			}
		},
		created() {
			this.handleQuery();
		}
	}
</script>

<style>
	.el-table .info-row {
		background: #FF4949;
	}
</style>