<!--* 
* @description: 检测参数设置
* @author: pl 
* @update: pl (2017-08-04 14:26) 
*-->
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
									<el-option label="参数代码" value="paramcode"></el-option>
									<el-option label="参数值" value="paramvalue"></el-option>
									<el-option label="参数类型" value="paramtype"></el-option>
									<el-option label="参数描述" value="paramdesc"></el-option>
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
										<el-option label="参数代码" value="paramcode"></el-option>
										<el-option label="参数值" value="paramvalue"></el-option>
										<el-option label="参数类型" value="paramtype"></el-option>
										<el-option label="参数描述" value="paramdesc"></el-option>
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
						<el-form-item>
							<el-switch v-model="filters.isactive" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :max-height="windowOutHeight-170" border stripe :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="paramcode" label="参数代码" align="center" >
			</el-table-column>
			<el-table-column prop="paramvalue" label="参数值" align="center" >
			</el-table-column>
			<el-table-column prop="paramtype" label="参数类型" align="center" >
			</el-table-column>
			<el-table-column prop="paramdesc" label="参数描述" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive == '0' ? true : false" title="编辑">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isactive == "0" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isactive == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除" :disabled="scope.row.isactive == '0' ? true : false">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">检测参数信息</span>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>参数代码:</dt>
							<dd>{{ GisParamThisList.paramcode }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>参数值:</dt>
							<dd>{{ GisParamThisList.paramvalue}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>参数类型:</dt>
							<dd>{{ GisParamThisList.paramtype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>参数描述:</dt>
							<dd>{{ GisParamThisList.paramdesc }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{GisParamThisList.createby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{GisParamThisList.createdate == null ? "" :fmtdata.formatDate.format(new Date(GisParamThisList.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{GisParamThisList.updateby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{GisParamThisList.updatedate == null ? "" :fmtdata.formatDate.format(new Date(GisParamThisList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="参数代码" prop="paramcode">
							<el-input v-model="editForm.paramcode" placeholder="请输入参数代码" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="参数值" prop="paramvalue">
							<el-input v-model="editForm.paramvalue" placeholder="请输入参数值" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="参数类型" prop="paramtype">
							<el-input v-model="editForm.paramtype" placeholder="请输入参数类型" auto-complete="off"></el-input>
							<!-- <el-select v-model="editForm.paramtype" @visible-change="paramtypeChange" :loading="paramtypeLoading" filterable placeholder="请选择参数类型" clearable>
						    <el-option
						      v-for="item in paramtypelist"
						      :key="item.paramname"
						      :label="item.paramname"
						      :value="item.id">
						    </el-option>
						</el-select> -->
						</el-form-item>
						<el-form-item label="参数描述" prop="paramdesc">
							<el-input v-model="editForm.paramdesc" placeholder="请输入参数描述" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="参数代码" prop="paramcode">
							<el-input v-model="addForm.paramcode" placeholder="请输入参数代码" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="参数值" prop="paramvalue">
							<el-input v-model="addForm.paramvalue" placeholder="请输入参数值" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="参数类型" prop="paramtype">
							<el-input v-model="addForm.paramtype" placeholder="请输入参数类型" auto-complete="off"></el-input>
							<!-- <el-select v-model="addForm.paramtype" @visible-change="paramtypeChange" :loading="paramtypeLoading" filterable placeholder="请选择参数类型" clearable>
							    <el-option
							      v-for="item in paramtypelist"
							      :key="item.paramname"
							      :label="item.paramname"
							      :value="item.id">
							    </el-option>
							</el-select> -->
						</el-form-item>
						<el-form-item label="参数描述" prop="paramdesc">
							<el-input v-model="addForm.paramdesc" placeholder="请输入参数描述" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<style type="text/css" media="screen">
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getGisParamList, addGisParam, modifyGisParam, removeGisParam, getSelectListGisParam, deleteGisParam } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['paramvalue'],
						content: ''
					}], //查询框
					isactive: '1'
				},
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				paramtypeLoading: false, //报警类型
				paramtypelist: [], //报警类型
				GisParamThisList: [], //详情
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					paramcode: '',
					paramvalue: '',
					paramtype: '',
					paramdesc: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					paramcode: '',
					paramvalue: '',
					paramtype: '',
					paramdesc: '',
					isactive: '1',
				},
			}
		},
		methods: {
			// 报警类型——搜索下拉
			paramtypeChange(r) {
				if(!r || this.paramtypelist.length > 0) return;
				this.paramtypeLoading = true;

				// getAlarmTypeList().then((res) => {
				// 	this.paramtypelist = res.data.data.records;
				// 	this.paramtypeLoading = false;
				// });
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(paramID) {
				this.formDialogTableVisible = true;
				this.GisParamThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: paramID
				}
				nanobar.go(70);
				getGisParamList(para).then((res) => {
					this.GisParamThisList = res.data.data.records[0];
					nanobar.go(100);
				});
			},
			// 有效 鼠标移入
			mouseoverChange(e) {
				if($(e.target).hasClass('icon-duigou')) {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				} else {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				}
			},
			// 有效 鼠标移除
			mouseoutChange(e) {
				if($(e.target).hasClass('icon-cha')) {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				} else {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				}
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
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
				console.log(para);
				// getSortList(para).then((res) => {});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isactive = i;
				this.GetPositions();
			},
			//有效无效转换
			isactiveFomat(row, col) {
				return row.isactive == 1 ? '是' : row.isactive != undefined ? '否' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isactive == 0) {
					return 'warning-row';
				}
				return '';
			},
			// 有效按钮切换状态
			handleChange: function(index, row) {
				this.$confirm('确认设置该条记录的状态吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.id,
						isactive: row.isactive == 0 ? 1 : 0,
					}
					modifyGisParam(para).then((res) => {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						row.isactive = para.isactive;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},

			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.GetPositions();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.GetPositions();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isactive: this.filters.isactive,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListGisParam(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			GetPositions() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					isactive: this.filters.isactive,
				};
				this.listLoading = true;
				getGisParamList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
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
						id: row.id,
						isdelete: 1,
					};

					deleteGisParam(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.GetPositions();
						// this.handleQuerySelect();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.id,
					paramcode: row.paramcode,
					paramvalue: row.paramvalue,
					paramtype: row.paramtype,
					paramdesc: row.paramdesc,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					paramcode: '',
					paramvalue: '',
					paramtype: '',
					paramdesc: '',
					isactive: 1,
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							paramcode: this.editForm.paramcode,
							paramvalue: this.editForm.paramvalue,
							paramtype: this.editForm.paramtype,
							paramdesc: this.editForm.paramdesc,
						}

						modifyGisParam(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.GetPositions();
							// this.handleQuerySelect();
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
							paramcode: this.addForm.paramcode,
							paramvalue: this.addForm.paramvalue,
							paramtype: this.addForm.paramtype,
							paramdesc: this.addForm.paramdesc,
							isactive: this.addForm.isactive,
						}
						addGisParam(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.GetPositions();
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
					removeGisParam(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.GetPositions();
					});
				}).catch(() => {

				});
			}
		},
		created() {
			this.GetPositions();
		},

	}
</script>