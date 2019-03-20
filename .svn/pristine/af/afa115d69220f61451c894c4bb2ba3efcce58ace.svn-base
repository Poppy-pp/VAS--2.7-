<template>
	<section class="tab_content-wrapper">
		<el-input style="margin-bottom:10px" placeholder="输入关键字进行过滤" v-model="filterText">
		</el-input>
		<el-tree 
		v-loading="treeRouseLoading" 
		element-loading-text="拼命加载中..." 
		element-loading-spinner="el-icon-loading" 
		element-loading-background="rgba(0, 0, 0, 0.7)" 
		 class="filter-tree" :data="vasRegions" :props="defaultProps" highlight-current default-expand-all node-key="id" :filter-node-method="filterNode" :render-content="renderContent" ref="tree2">
		</el-tree>
		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="父级ID" prop="parentid">
					<el-input v-model="editForm.parentid" readonly auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图标类名" prop="iconCls">
					<el-input v-model="editForm.iconCls" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="path" prop="path">
					<el-input v-model="editForm.path" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品" prop="system">
					<el-select v-model="editForm.system" placeholder="请选择">
						<el-option v-for="item in systemoptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="显示" prop="hidden">
					<el-switch v-model="editForm.hidden" active-color="#00C1DE" inactive-color="#cccccc" active-text="是" inactive-text="否" active-value="0" inactive-value="1">
					</el-switch>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="editForm.description" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增子类" :modal-append-to-body="false" size="small" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="父级ID" prop="parentid">
					<el-input v-model="addForm.parentid" readonly auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图标类名" prop="iconCls">
					<el-input v-model="addForm.iconCls" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="path" prop="path">
					<el-input v-model="addForm.path" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="产品" prop="system">
					<el-select v-model="addForm.system" disabled placeholder="请选择">
						<el-option v-for="item in systemoptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="addForm.description" auto-complete="off"></el-input>
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
	import { getSysResourceInfoList, addSysResourceInfo, modifySysResourceInfo, removeSysResourceInfo } from '../../api/api';

	export default {



		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		methods: {
			filterNode(value,data,node) {
				if(!value || !data.name) return true;
				if (data.name.indexOf(value) !== -1) {
					$("#s"+data.id).parents('.el-tree-node__content').next().children().show();
					return data;
				}
			},
			append(store, treeData) {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					parentid: 0,
					path: '',
					hidden: '0',
					system: treeData.system,
					iconCls: '',
					description: '',
				}
				this.addForm.parentid = treeData.id;
				this.store = store;
				this.treeData = treeData;
			},
			remove(store, data) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: data.id,
						method: "delete"
					};
					removeSysResourceInfo(para).then((res) => {
						this.listLoading = false;
						if(res.data.result.code == 0) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							store.remove(data);
						}
					});
				}).catch(() => {

				});
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						modifySysResourceInfo(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '编辑菜单成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								if(para.system == "A") {
									this.initVasRoles();
								}
								if(para.system == "E") {
									this.initGISRoles();
								}
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
						let para = {
							name: this.addForm.name,
							parentid: this.addForm.parentid,
							path: this.addForm.path,
							system: this.addForm.system,
							iconCls: this.addForm.iconCls,
							restype: 1,
							description: this.addForm.description,
						};
						addSysResourceInfo(para).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '新增菜单成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								if(para.system == "A") {
									this.initVasRoles();
								}
								if(para.system == "E") {
									this.initGISRoles();
								}
							}
						});
					}
				});
			},
			edit(store, treeData) {
				this.editFormVisible = true;
				this.editForm.name = treeData.name;
				this.editForm.parentid = treeData.parentid;
				this.editForm.iconCls = treeData.iconCls;
				this.editForm.path = treeData.path;
				this.editForm.system = treeData.system;
				this.editForm.id = treeData.id;
				this.editForm.restype = 1;
				this.editForm.hidden = ((treeData.hidden == 0 || !treeData.hidden) ? '0' : '1');
				this.editForm.description = treeData.description;
				this.store = store;
				this.treeData = treeData;
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				if(data.hidden == 1 && data.restype == 1 && !data.name) store.remove(data);
				if(!data.name && !data.children[0]) return;
				return(
					<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
	            <span id={"s"+data.id}>
	              <span>{!data.name ? data.children[0].name : data.name}</span>
	            </span>
	            {data.hidden == 1?<el-tag size="mini" type="danger">未显示</el-tag>:''}
	            <span style="float: right;">
	              <el-button type="text" title="新增子类" icon="el-icon-plus" on-click={ (e) => {this.append(store, data);e.stopPropagation();} }></el-button>
	              <el-button type="text" title="编辑" icon="el-icon-edit" on-click={ (e) => {this.edit(store, data);e.stopPropagation();} }></el-button>
	              <el-button type="text" title="删除" style="color:#fa5555;" icon="el-icon-delete" on-click={ (e) => {this.remove(store, data);e.stopPropagation();} }></el-button>
	            </span>
	          </span>);
			},
			initVasRoles() {
				let para = {
					parentid: 0,
					system: 'A'
				};
				this.emptyText = "加载中~~~";
				this.treeRouseLoading = true;
				//初始化所有父节点树
				getSysResourceInfoList(para).then((res) => {
					this.treeRouseLoading = false;
					if(res.data.result.code == 0){
						this.vasRegions[0].children = res.data.data.records;
					}
					this.emptyText = "完成";
				});
			},
			initGISRoles() {
				let para = {
					parentid: 0,
					system: 'E'
				};
				this.emptyText = "加载中~~~";
				//初始化所有父节点树
				getSysResourceInfoList(para).then((res) => {
					this.vasRegions[1].children = res.data.data.records;
					this.emptyText = "完成";
				});
			}
		},
		data() {
			return {
				treeRouseLoading:false,
				filterText: '',
				store: null,
				treeData: null,
				systemoptions: [{
					value: 'A',
					label: 'VAS-平台管理系统'
				}, {
					value: 'B',
					label: 'ECT-E车宝'
				}, {
					value: 'C',
					label: 'UCHE-万网优车企业版'
				}, {
					value: 'D',
					label: 'UCHE-万网优车个人版'
				}, {
					value: 'E',
					label: 'GIS-车辆位置服务系统'
				}],
				vasRegions: [{
					name: "VAS-平台管理系统",
					hidden: "",
					system: "A",
					id: 0,
					children: []
				}, {
					name: "GIS-车辆位置服务系统",
					hidden: "",
					system: "E",
					id: 0,
					children: []
				}],
				emptyText: "加载中~~~",
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					parentid: 0,
					path: '',
					system: 'A',
					iconCls: '',
					hidden: 1,
					description: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					name: '',
					parentid: 0,
					path: '',
					hidden: '0',
					system: 'A',
					iconCls: '',
					description: '',
				},
				defaultProps: {
					label: 'name',
					children: 'children'
				},
			}
		},
		created() {
			this.initVasRoles();
			this.initGISRoles();
		}
	};
</script>