<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<template v-for="(item,index) in filters.domSearch">
					<template v-if="index == 0">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
								<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
									<el-option label="名称" value="INTERFACENAME"></el-option>
									<el-option label="使用范围" value="SYSTEM"></el-option>
								</el-select>
								<template v-if="index == filters.domSearch.length-1">
									<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
								</template>
								<template v-else>
									<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
								</template>
							</el-input>
						</div>
					</template>
					<template v-else>
						<el-col :span="24">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="名称" value="INTERFACENAME"></el-option>
										<el-option label="使用范围" value="SYSTEM"></el-option>
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
									</template>
								</el-input>
							</div>
						</el-col>
					</template>

					<template v-if="index == 0">
						<el-form-item>
							<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-170" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="INTERFACENAME" label="名称" align="center" >
			</el-table-column>
			<el-table-column prop="INTERFACEADDRESS" label="地址" align="center" >
			</el-table-column>
			<el-table-column prop="INTERFACEFORMAT" label="支持格式" align="center" >
			</el-table-column>
			<el-table-column prop="REQUESTWAY" label="请求方式" align="center" >
			</el-table-column>
			<el-table-column prop="REQUESTSAMPLE" label="请求示例" align="center" >
			</el-table-column>
			<el-table-column prop="INSTRUCTION" label="说明" align="center" >
			</el-table-column>
			<el-table-column prop="SYSTEM" label="使用范围" align="center" width="80">
			</el-table-column>
			<el-table-column prop="STATUS" label="状态" align="center" width="60">
			</el-table-column>
			<el-table-column prop="SOURCE" label="来源" align="center" width="60">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID,scope.row)" title="详情">
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除">
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">接口信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>名称:</dt>
							<dd>{{ interfaceData.INTERFACENAME }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ interfaceData.INTERFACEADDRESS }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>支持格式:</dt>
							<dd>{{ interfaceData.INTERFACEFORMAT }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>请求方式:</dt>
							<dd>{{ interfaceData.REQUESTWAY }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>请求示例:</dt>
							<dd>{{ interfaceData.REQUESTSAMPLE }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>说明:</dt>
							<dd>{{ interfaceData.INSTRUCTION }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>使用范围:</dt>
							<dd>{{ interfaceData.SYSTEM }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ interfaceData.STATUS }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>来源:</dt>
							<dd>{{ interfaceData.SOURCE }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>明文返回示例:</dt>
							<dd>{{ interfaceData.PLAINTEXTSAMPLE }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>密文返回示例:</dt>
							<dd>{{ interfaceData.CIPHERTEXTSAMPLE }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:0 40px;" v-show="paraThisList != ''">
					<el-col :span="24">
						<span class="formTile">参数信息</span>
					</el-col>
					<template v-for="(item,index) in paraThisList">
						<el-col :span="12">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>接口ID:</dt>
								<dd>{{ item.INTERFACEID }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>参数类型:</dt>
								<dd>{{ item.PARAMTYPE == 'P' ? '明文' : item.PARAMTYPE == 'C' ? '密文' : ''}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>参数名称:</dt>
								<dd>{{ item.PARAMNAME }}</dd>
							</dl>
						</el-col>
						<el-col :span="12">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>数据类型:</dt>
								<dd>{{ item.DATATYPE }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>是否必填:</dt>
								<dd>{{ item.MANDATORY == 'Y' ? '是' : item.MANDATORY == 'N' ? '否' : '' }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>参数说明:</dt>
								<dd>{{ item.DESCRIPTION }}</dd>
							</dl>
						</el-col>
					</template>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="名称" prop="INTERFACENAME">
					<el-input v-model="editForm.INTERFACENAME" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="INTERFACEADDRESS">
					<el-input v-model="editForm.INTERFACEADDRESS" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="支持格式" prop="INTERFACEFORMAT">
					<el-input v-model="editForm.INTERFACEFORMAT" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="请求方式" prop="REQUESTWAY">
					<el-input v-model="editForm.REQUESTWAY" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="请求示例" prop="REQUESTSAMPLE">
					<el-input v-model="editForm.REQUESTSAMPLE" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="说明" prop="INSTRUCTION">
					<el-input v-model="editForm.INSTRUCTION" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="使用范围" prop="SYSTEM">
					<el-input v-model="editForm.SYSTEM" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="STATUS">
					<el-input v-model="editForm.STATUS" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="SOURCE">
					<el-input v-model="editForm.SOURCE" auto-complete="off"></el-input>
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
				<el-form-item label="名称" prop="INTERFACENAME">
					<el-input v-model="addForm.INTERFACENAME" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="INTERFACEADDRESS">
					<el-input v-model="addForm.INTERFACEADDRESS" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="支持格式" prop="INTERFACEFORMAT">
					<el-input v-model="addForm.INTERFACEFORMAT" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="请求方式" prop="REQUESTWAY">
					<el-input v-model="addForm.REQUESTWAY" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="请求示例" prop="REQUESTSAMPLE">
					<el-input v-model="addForm.REQUESTSAMPLE" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="说明" prop="INSTRUCTION">
					<el-input v-model="addForm.INSTRUCTION" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="使用范围" prop="SYSTEM">
					<el-input v-model="addForm.SYSTEM" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="STATUS">
					<el-input v-model="addForm.STATUS" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="SOURCE">
					<el-input v-model="addForm.SOURCE" auto-complete="off"></el-input>
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
	import { getInterfaceList, addInterface, modifyInterface, removeInterface, getSelectInterfaceList, getInterfaceParaList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					domSearch: [{
						select: [],
						content: ''
					}], //查询框
				},
				listData: [],
				interfaceData: [], //接口
				paraThisList: [], //参数
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					ID: '',
					INTERFACENAME: '',
					INTERFACEADDRESS: '',
					INTERFACEFORMAT: '',
					REQUESTWAY: '',
					REQUESTSAMPLE: '',
					INSTRUCTION: '',
					SYSTEM: '',
					STATUS: '',
					SOURCE: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					INTERFACENAME: '',
					INTERFACEADDRESS: '',
					INTERFACEFORMAT: '',
					REQUESTWAY: '',
					REQUESTSAMPLE: '',
					INSTRUCTION: '',
					SYSTEM: '',
					STATUS: '',
					SOURCE: '',
				},
			}
		},
		methods: {
			//详情查看
			formDetailHandle(interfaceid, data) {
				this.formDialogTableVisible = true;
				this.interfaceData = data;
				this.paraThisList = ''; //清空上条数据
				// 获取当前参数信息
				let para = {
					INTERFACEID: interfaceid
				}
				getInterfaceParaList(para).then((res) => {
					if(res.data.data.records.length == 0) {
						this.$message({
							message: '该接口暂无参数信息！',
							type: 'warning'
						});
					} else {
						this.paraThisList = res.data.data.records;
					}
				});
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询条件
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectInterfaceList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
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
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				this.listLoading = true;
				getInterfaceList(para).then((res) => {
					console.log(res)
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
						ids: row.ID,
						method: "delete"
					};
					removeInterface(para).then((res) => {
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
				this.editForm = {
					ID: row.ID,
					INTERFACENAME: row.INTERFACENAME,
					INTERFACEADDRESS: row.INTERFACEADDRESS,
					INTERFACEFORMAT: row.INTERFACEFORMAT,
					REQUESTWAY: row.REQUESTWAY,
					REQUESTSAMPLE: row.REQUESTSAMPLE,
					INSTRUCTION: row.INSTRUCTION,
					SYSTEM: row.SYSTEM,
					STATUS: row.STATUS,
					SOURCE: row.SOURCE,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					INTERFACENAME: '',
					INTERFACEADDRESS: '',
					INTERFACEFORMAT: '',
					REQUESTWAY: '',
					REQUESTSAMPLE: '',
					INSTRUCTION: '',
					SYSTEM: '',
					STATUS: '',
					SOURCE: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							ID: this.editForm.ID,
							INTERFACENAME: this.editForm.INTERFACENAME,
							INTERFACEADDRESS: this.editForm.INTERFACEADDRESS,
							INTERFACEFORMAT: this.editForm.INTERFACEFORMAT,
							REQUESTWAY: this.editForm.REQUESTWAY,
							REQUESTSAMPLE: this.editForm.REQUESTSAMPLE,
							INSTRUCTION: this.editForm.INSTRUCTION,
							SYSTEM: this.editForm.SYSTEM,
							STATUS: this.editForm.STATUS,
							SOURCE: this.editForm.SOURCE,
						}
						modifyInterface(para).then((res) => {
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
						let para = {
							INTERFACENAME: this.addForm.INTERFACENAME,
							INTERFACEADDRESS: this.addForm.INTERFACEADDRESS,
							INTERFACEFORMAT: this.addForm.INTERFACEFORMAT,
							REQUESTWAY: this.addForm.REQUESTWAY,
							REQUESTSAMPLE: this.addForm.REQUESTSAMPLE,
							INSTRUCTION: this.addForm.INSTRUCTION,
							SYSTEM: this.addForm.SYSTEM,
							STATUS: this.addForm.STATUS,
							SOURCE: this.addForm.SOURCE,
						}
						addInterface(para).then((res) => {
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
					//NProgress.start();
					let para = {
						ids: ids,
						method: "delete"
					};
					removeInterface(para).then((res) => {
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
		},

	}
</script>