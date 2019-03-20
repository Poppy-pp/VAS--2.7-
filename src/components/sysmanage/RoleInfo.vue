<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.rolename" @keyup.native.enter="handleQuery" placeholder="角色名称"></el-input>
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
			<el-table-column prop="rolename" label="角色名称" align="center">
			</el-table-column>
			<el-table-column prop="rolevalue" label="角色值" align="center">
			</el-table-column>
			<el-table-column prop="description" label="描述" align="center">
			</el-table-column>
			<el-table-column prop="isenable" label="是否有效" align="center" :formatter="enableStatus">
			</el-table-column>
			<el-table-column label="操作" align="center" width="230">
				<template scope="scope">
					<el-button size="small" @click="addResource(scope.$index, scope.row)">编辑资源</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--资源添加界面-->
		<el-dialog title="编辑资源" :modal-append-to-body="false" :visible.sync="addRourceInfoVisible" :close-on-click-modal="false" @close="rouseEditClose" class="zidigo">
			<el-col :span="8">
				<el-col :span="24" style="text-align: center;line-height: 36px;overflow: hidden;font-weight:bold;">VAS-平台管理系统</el-col>
				<el-col :span="24">
					<el-tree v-loading="treeRouseLoading" element-loading-text="VAS列表加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)" :data="regions" show-checkbox highlight-current node-key="id" check-strictly :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" ref="treeRouse" :render-content="renderContent" @check-change="handleCheckChange" :props="defaultProps">
					</el-tree>
				</el-col>
			</el-col>

			<el-col :span="8">
				<el-col :span="24" style="text-align: center;line-height: 36px;overflow: hidden;font-weight:bold;">GIS-车辆位置服务系统</el-col>
				<el-col :span="24">
					<el-tree v-loading="treeRouseGisLoading" element-loading-text="GIS列表加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)" :data="regionsGis" show-checkbox highlight-current node-key="id" check-strictly :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" ref="treeRouseGis" :render-content="renderContent" @check-change="handleCheckChangeGis" :props="defaultProps">
					</el-tree>
				</el-col>
			</el-col>

			<el-col :span="8">
				<el-col :span="24" style="text-align: center;line-height: 36px;overflow: hidden;font-weight:bold;">ECT-模块权限</el-col>
				<el-col :span="24">
					<el-tree v-loading="treeRouseEctLoading" element-loading-text="ECT列表加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)" :data="regionsEct" show-checkbox highlight-current node-key="id" check-strictly :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" ref="treeRouseEct" :render-content="renderContent" @check-change="handleCheckChangeEct" :props="defaultProps">
					</el-tree>
				</el-col>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addRourceInfoVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleNodeClick" :loading="nodeLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色名称" prop="rolename">
					<el-input v-model="editForm.rolename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色值" prop="rolevalue">
					<el-input v-model="editForm.rolevalue" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="editForm.description" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否有效" prop="isenable">
					<el-switch
						  v-model="editForm.isenable"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  active-text="有效"
						  inactive-text="无效"
						  active-value="1"
    						  inactive-value="0">
					</el-switch>
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
				<el-form-item label="角色名称" prop="rolename">
					<el-input v-model="addForm.rolename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色值" prop="rolevalue">
					<el-input v-model="addForm.rolevalue" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="资源管理" prop="rolevalue">
					<el-input v-model="addForm.rolevalue" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="addForm.description" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否有效" prop="isenable">
					<el-switch
						  v-model="addForm.isenable"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  active-text="有效"
						  inactive-text="无效"
						  active-value="1"
    						  inactive-value="0">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<style type="text/css">
	.zidigo .el-dialog__body {
		padding-top: 0;
	}
</style>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getSysRoleInfoList, addSysRoleInfo, modifySysRoleInfo, removeSysRoleInfo, getSysResourceInfoList, editRuleResourceInfo, getRuleResourceInfo } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					rolename: ''
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				addRourceInfoVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				nodeLoading: false,
				defaultCheckedKeys: [],
				defaultExpandedKeys: [],
				curRoleId: '',
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					rolename: '',
					rolevalue: '',
					description: '',
					isenable: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					rolename: '',
					rolevalue: '',
					description: '',
					isenable: '1',
				},
				regions: [],
				regionsGis: [],
				regionsEct:[],
				treeRouseLoading: false,
				treeRouseGisLoading: false,
				treeRouseEctLoading:false,
				defaultProps: {
					label: 'name',
					children: 'children'
				},
				isPewe: true
			}
		},
		methods: {
			enableStatus(row,col){
				return row.isenable == 1 ? '有效' : row.isenable == 0 ? '无效' : '未设置';
			},
			rouseEditClose() {
				this.regions = [];
				this.regionsGis = [];
				this.regionsEct = [];
			},
			//树的选中操作
			handleCheckChangeEct(data, checked, indeterminate) {
				var arr = this.$refs.treeRouseEct.getCheckedKeys(),
					kesarry = this.$refs.treeRouseEct.getCheckedNodes(),
					isClearFl = false;
				/*如果子菜单有选中不能取消当前选择 start*/
				if(!checked && data.parentid != 0) {
					kesarry.forEach((res, index) => {
						if(res.id == data.parentid) {
							res.children.forEach((res, index) => {
								if($.inArray(res.id, arr) > 0) {
									isClearFl = true;
									return false;
								}
							});
							if(!isClearFl) {
								this.$refs.treeRouseEct.setChecked(data.parentid, false);
								return false;
							}
						}
					});
				}
				/*如果子菜单有选中不能取消当前选择 end*/
				/*选中子类的时候选中 至少一个父类*/
				if($.inArray(data.parentid, arr) < 0 && checked && data.parentid != 0) {
					this.$refs.treeRouseEct.setChecked(data.parentid, true);
					/*选中父类时候选中所有子类*/
					if(data.children.length > 0 && this.isPewe) {
						util.setChecked(this.$refs.treeRouseEct, data, true, true);
					};
					this.isPewe = false;
					return;
				};
				/*选中父类时候选中给所有子类*/
				if(data.parentid == 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseEct, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid == 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseEct, data, false, true);
					return;
				};

				/*选中父类时候选中所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseEct, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseEct, data, false, true);
					return;
				};
				this.isPewe = true;
			},
			//树的选中操作
			handleCheckChangeGis(data, checked, indeterminate) {
				var arr = this.$refs.treeRouseGis.getCheckedKeys(),
					kesarry = this.$refs.treeRouseGis.getCheckedNodes(),
					isClearFl = false;
				/*如果子菜单有选中不能取消当前选择 start*/
				if(!checked && data.parentid != 0) {
					kesarry.forEach((res, index) => {
						if(res.id == data.parentid) {
							res.children.forEach((res, index) => {
								if($.inArray(res.id, arr) > 0) {
									isClearFl = true;
									return false;
								}
							});
							if(!isClearFl) {
								this.$refs.treeRouseGis.setChecked(data.parentid, false);
								return false;
							}
						}
					});
				}
				/*如果子菜单有选中不能取消当前选择 end*/
				/*选中子类的时候选中 至少一个父类*/
				if($.inArray(data.parentid, arr) < 0 && checked && data.parentid != 0) {
					this.$refs.treeRouseGis.setChecked(data.parentid, true);
					/*选中父类时候选中所有子类*/
					if(data.children.length > 0 && this.isPewe) {
						util.setChecked(this.$refs.treeRouseGis, data, true, true);
					};
					this.isPewe = false;
					return;
				};
				/*选中父类时候选中给所有子类*/
				if(data.parentid == 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseGis, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid == 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseGis, data, false, true);
					return;
				};

				/*选中父类时候选中所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseGis, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouseGis, data, false, true);
					return;
				};
				this.isPewe = true;
			},
			//树的选中操作
			handleCheckChange(data, checked, indeterminate) {
				var arr = this.$refs.treeRouse.getCheckedKeys(),
					kesarry = this.$refs.treeRouse.getCheckedNodes(),
					isClearFl = false;
				/*如果子菜单有选中不能取消当前选择 start*/
				if(!checked && data.parentid != 0) {
					kesarry.forEach((res, index) => {
						if(res.id == data.parentid) {
							res.children.forEach((res, index) => {
								if($.inArray(res.id, arr) > 0) {
									isClearFl = true;
									return false;
								}
							});
							if(!isClearFl) {
								this.$refs.treeRouse.setChecked(data.parentid, false);
								return false;
							}
						}
					});
				}
				/*如果子菜单有选中不能取消当前选择 end*/
				/*选中子类的时候选中 至少一个父类*/
				if($.inArray(data.parentid, arr) < 0 && checked && data.parentid != 0) {
					this.$refs.treeRouse.setChecked(data.parentid, true);
					/*选中父类时候选中所有子类*/
					if(data.children.length > 0 && this.isPewe) {
						util.setChecked(this.$refs.treeRouse, data, true, true);
					};
					this.isPewe = false;
					return;
				};

				/*选中父类时候选中给所有子类*/
				if(data.parentid == 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid == 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, false, true);
					return;
				};
				/*选中父类时候选中所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, false, true);
					return;
				};
				this.isPewe = true;
			},
			handleNodeClick() {
				let treeNode = this.$refs.treeRouse.getCheckedNodes(),//VAS
					treeRouseGis = this.$refs.treeRouseGis.getCheckedNodes(),//GIS
					treeRouseEct = this.$refs.treeRouseEct.getCheckedNodes(),//ECT
					para = [],
					_this = this;

				treeNode.forEach(function(item, index) {
					var obj = {};
					obj.roleid = _this.curRoleId;
					obj.resid = item.id;
					para.push(obj);
					/*2c*/
					if(item.children.length > 0) {
						item.children.forEach(function(item1, index) {
							var obj = {};
							if(item1.hidden == 1 && item1.restype == 1) {
								obj.roleid = _this.curRoleId;
								obj.resid = item1.id;
								para.push(obj);
							}
						});
					}
				});
				treeRouseGis.forEach(function(item, index) {
					var obj = {};
					obj.roleid = _this.curRoleId;
					obj.resid = item.id;
					para.push(obj);
					/*2c*/
					if(item.children.length > 0) {
						item.children.forEach(function(item1, index) {
							var obj = {};
							if(item1.hidden == 1 && item1.restype == 1) {
								obj.roleid = _this.curRoleId;
								obj.resid = item1.id;
								para.push(obj);
							}
						});
					}
				});
				treeRouseEct.forEach(function(item, index) {
					var obj = {};
					obj.roleid = _this.curRoleId;
					obj.resid = item.id;
					para.push(obj);
					/*2c*/
					if(item.children.length > 0) {
						item.children.forEach(function(item1, index) {
							var obj = {};
							if(item1.hidden == 1 && item1.restype == 1) {
								obj.roleid = _this.curRoleId;
								obj.resid = item1.id;
								para.push(obj);
							}
						});
					}
				});
				this.nodeLoading = true;
				editRuleResourceInfo(para).then((res) => {
					this.nodeLoading = false;
					this.addRourceInfoVisible = false;
					if(res.data.result.code == 0) {
						this.$message({
							message: '编辑资源成功！',
							type: 'success'
						});
					}
				});
			},
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
			//编辑角色资源
			addResource(index, row) {
				this.curRoleId = row.id;
				this.addRourceInfoVisible = true;
				let para = {
					roleid: row.id,
					showCount: 2000,
					rolename: this.filters.rolename
				};
				this.treeRouseLoading = true;
				this.treeRouseGisLoading = true;
				this.treeRouseEctLoading = true;
				getRuleResourceInfo(para).then((res) => {
					var dk = [],ek = [],
						para = {
							parentid: 0,
							system: 'A'
						};
					res.data.data.records.forEach(function(obj) {
						dk.push(obj.resid);
						ek.push(obj.resid);
					});
					this.defaultCheckedKeys = dk; //选中当前树
					this.defaultExpandedKeys = ek; //展开
					if(this.regions.length > 0) return;
					//初始化所有父节点树
					getSysResourceInfoList(para).then((res) => {//VAS菜单列
						this.regions = res.data.data.records;
						this.treeRouseLoading = false;
						//初始化所有父节点树
						getSysResourceInfoList({//GIS菜单列
							parentid: 0,
							system: 'E'
						}).then((res) => {
							this.regionsGis = res.data.data.records;
							this.treeRouseGisLoading = false;
						});

						getSysResourceInfoList({//ECT菜单列
							parentid: 0,
							system: 'ECT'
						}).then((res) => {
							this.regionsEct = res.data.data.records;
							this.treeRouseEctLoading = false;
						});
					});
				});
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				if(data.hidden == 1 && data.restype == 1) store.remove(data);
				if(!data.name && !data.children[0]) return;
				return (
					<span>
		              <span>{ !data.name ? data.children[0].name : data.name }</span>
		            </span>);
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					rolename:this.filters.rolename
				};
				this.listLoading = true;
				getSysRoleInfoList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
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
					removeSysRoleInfo(para).then((res) => {
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
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							modifySysRoleInfo(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '编辑成功',
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
							addSysRoleInfo(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '新增成功',
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
					removeSysRoleInfo(para).then((res) => {
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