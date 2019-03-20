<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.corpname" @keyup.native.enter="handleQuery" placeholder="所属客户"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="corpname" label="所属客户" align="center" width="300" >
			</el-table-column>
			<el-table-column prop="" label="用户名" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120" align="center">
				<template scope="scope">
					<el-button size="small" @click="groupClick(scope.$index, scope.row)">分组管理</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--标签管理-->
		<el-dialog title="标签管理" :modal-append-to-body="false" :visible.sync="labelEditFormVisible" :close-on-click-modal="false">
			<el-input style="margin-bottom:10px" placeholder="输入关键字进行过滤" v-model="filterText">
			</el-input>
			<el-tree 
			v-loading="treeRouseLoading" 
			element-loading-text="拼命加载中..." 
			element-loading-spinner="el-icon-loading" 
			:load="loadLabelChild"
			lazy
			element-loading-background="rgba(0, 0, 0, 0.7)" 
			class="filter-tree" 
			:data="vasRegions" 
			:props="defaultProps" 
			highlight-current
			node-key="id" 
			:filter-node-method="filterNode" 
			:render-content="renderContent" 
			ref="tree2"
			default-expand-all>
			</el-tree>
			<!--编辑界面-->
			<el-dialog title="编辑" :modal-append-to-body="false" :modal="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="名称" prop="tagname">
						<el-input v-model="editForm.tagname" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>

			<!--新增子类界面-->
			<el-dialog title="新增子类" :modal-append-to-body="false" :modal="false" size="small" :visible.sync="addFormVisible" :close-on-click-modal="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="名称" prop="tagname">
						<el-input v-model="addForm.tagname" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmitChild" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>
		</el-dialog>

		<!-- 新增客户 -->
		<el-dialog title="新增客户公司" :modal-append-to-body="false" :visible.sync="addFormCorpVisible" :close-on-click-modal="false">
			<el-form :model="addFormCorp" label-width="110px" :rules="addFormRules" ref="addFormCorp">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="公司名称" prop="corpname" >
							<el-select v-model="addFormCorp.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable remote :remote-method="corpChangeSelect">
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="标签名称" prop="tagname">
							<el-input v-model="addFormCorp.tagname" auto-complete="off" placeholder="请输入标签名称"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormCorpVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoadingCorp">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { corporatelevel_corp,getCorporatelevel_level,addCorporatelevel,editCorporatelevel,getCopNameBy } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		data() {
			return {
				labelEditFormVisible:false,
				fmtdata: util,
				filters: {
					corpname: ''
				},
				listData: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,

				treeRouseLoading:false,
				filterText: '',
				store: null,
				treeData: null,
				vasRegions: [],
				emptyText: "加载中~~~",
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					tagname: ''
				},
				defaultExpandedKeys:[],
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormCorpVisible:false,//新增客户
				addLoadingCorp:false,
				addFormCorp:{
					corpname:'',
					tagname:'',
				},
				corplist: [], //所属公司
				corpLoading: false, //
				addFormRules: {},
				//新增界面数据
				addForm: {
					tagname: '',
					parentid:''
				},
				curTagname:'',
				defaultProps: {
					label: 'name',
          			children: 'children'
				},
				curCorpid:'',
			}
		},
		methods: {
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormCorpVisible = true;
				this.addFormCorp = {
					corpname: '',
					tagname:'',
				};
			},
			//新增
			addSubmit() {
				this.$refs.addFormCorp.validate((valid) => {
					if(valid) {
						this.addLoadingCorp = true;
						let para = {
							corpid: this.addFormCorp.corpname,
							parenttagid:0,
							tagname:this.addFormCorp.tagname,
						}
						addCorporatelevel(para).then((res) => {
							this.addLoadingCorp = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addFormCorp'].resetFields();
							this.addFormCorpVisible = false;
							this.handleQuery();
						});

					}
				});
			},
			/*所属公司——下拉*/
			corpChange(r) {
				this.corplist = [];
				if(!r || this.corplist.length > 0) return;
				let para = {
					showCount: 30
				}
				this.corpLoading = true;
				getCopNameBy(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			// 所属公司，模糊查询
			corpChangeSelect(query) {
				let para = {
					showCount: 30,
					corpname: query,
				}
				this.corpLoading = true;
				getCopNameBy(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			//点击父类加载子类标签节点
			loadLabelChild(node, resolve) {
				if (node.level === 0) {
				          return resolve([{ tagname: this.curTagname }]);
				}
			        	// if (node.level > 3) return resolve([]);
				let para = {
					corpid: this.curCorpid,
					parenttagid:0
				},data;
				if(node.data.id){
					para.parenttagid = node.data.id;
				}
				this.isLevelLoading = true;
				getCorporatelevel_level(para).then((res)=>{
					this.isLevelLoading = false;
					if(res.data.result.code == 0){
						data = res.data.data;
						resolve(data)
					}
				});
			},
			filterNode(value, data) {
				if(!value || !data.tagname) return true;
				if (data.tagname.indexOf(value) !== -1) {
					$("#s"+data.id).parents('.el-tree-node__content').next().children().show();//二级
					$("#s"+data.id).parents('.el-tree-node__content').next().children().children('.el-tree-node__children').children().show();//三级
					$("#s"+data.id).parents('.el-tree-node__content').next().children().children('.el-tree-node__children').children().children('.el-tree-node__children').children().show();//四级
					return data;
				}
			},
			append(store, treeData) {
				this.addFormVisible = true;
				this.addForm = {
					tagname: '',
					parentid:''
				}
				this.addForm.parentid = treeData.id?treeData.id:0;
				this.store = store;
				this.treeData = treeData;
			},
			remove(store, data) {
				this.$confirm('确认将该标签无效吗?', '提示', {
					type: 'warning'
				}).then(() => {
					if (data.id == undefined) {
						this.$message({
							message: '不可将父级无效！',
							type: 'warning'
						});
						return;
					}else{
						this.listLoading = true;
						let para = {
							id: data.id,
							isdelete:1
						};
						editCorporatelevel(para).then((res) => {
							this.listLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '无效成功',
									type: 'success'
								});
								store.remove(data);
							}
						});
					}
					
				});
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						editCorporatelevel(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '编辑菜单成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.vasRegions = [{ tagname: this.curTagname }];
							}
						});
					}
				});
			},
			//新增
			addSubmitChild() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							parenttagid:this.addForm.parentid,
							corpid:this.curCorpid,
							tagname: this.addForm.tagname,
						};
						addCorporatelevel(para).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '新增标签成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.vasRegions = [{ tagname: this.curTagname }];
							}
						});
					}
				});
			},
			edit(store, treeData) {
				this.editFormVisible = true;
				this.editForm.id = treeData.id;
				this.editForm.tagname = treeData.tagname;
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
	            <span id={'s'+ data.id}>
	              <span>{!data.tagname ? data.children[0].tagname : data.tagname}</span>
	            </span>
	            <span style="float: right;">
	              <el-button type="text" title="新增子类" icon="el-icon-plus" on-click={ (e) => {this.append(store, data);e.stopPropagation();} }></el-button>
	              <el-button type="text" title="编辑" icon="el-icon-edit" on-click={ (e) => {this.edit(store, data);e.stopPropagation();} }></el-button>
	              <el-button type="text" title="删除" style="color:#fa5555;" icon="el-icon-delete" on-click={ (e) => {this.remove(store, data);e.stopPropagation();} }></el-button>
	            </span>
	          </span>);
			},
			//时间转换1
			dateFormatter(row, col) {
				if(row.recorddatetime == "" || row.recorddatetime == undefined) return;
				return util.formatDate.format(new Date(row.recorddatetime), 'yyyy-MM-dd hh:mm:ss');
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//分组管理点击
			groupClick(index,row){
				this.labelEditFormVisible = true;
				this.curCorpid = row.id;
				this.curTagname = row.corpname;
				this.vasRegions = [{ tagname: this.curTagname }];
			},
			//获取保单列表 
			handleQuery() {
				let para = {
					currentPage: this.currentPage, 
					showCount: this.pagesize,
					corpname:this.filters.corpname
				}
				this.listLoading = true;
				corporatelevel_corp(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.listData = res.data.data.records;
						this.total = res.data.data.totalResult;
					}
				});
			}
		},
		created() {
			this.handleQuery();
		},
	}
</script>