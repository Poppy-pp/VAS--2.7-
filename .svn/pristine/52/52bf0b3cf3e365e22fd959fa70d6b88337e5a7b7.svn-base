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
									<el-option label="部门" value="deptname"></el-option>
									<el-option label="分组" value="groupname"></el-option>
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
										<el-option label="部门" value="deptname"></el-option>
										<el-option label="分组" value="groupname"></el-option>
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
		<el-table :max-height="windowOutHeight-200" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="deptname" label="部门" align="center">
			</el-table-column>
			<el-table-column prop="groupname" label="分组" align="center">
			</el-table-column>
			<el-table-column prop="emplevel" label="员工级别" align="center">
			</el-table-column>
			<el-table-column prop="standardintime" label="签到标准时间" align="center">
			</el-table-column>
			<el-table-column prop="standardouttime" label="签出标准时间" align="center">
			</el-table-column>
			<el-table-column prop="buffertime" label="缓冲时间(分)" align="center">
			</el-table-column>
			<el-table-column prop="attendcentername" label="所属中心区域" align="center">
			</el-table-column>
			<el-table-column prop="attendparam" label="考勤区域范围参数(半径N米)" width="200" align="center">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
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
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="部门" prop="deptname">
							<el-select v-model="editForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable @change="sendDeptIdData">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="分组" prop="groupname">
							<el-select v-model="editForm.groupname":loading="groupLoading" filterable placeholder="请选择所属分组" clearable>
								<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="员工级别" prop="emplevel">
							<el-input v-model="editForm.emplevel" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="签到标准时间" prop="standardintime">
							<el-time-picker v-model="editForm.standardintime" editable clearable size="large" :picker-options="{
								      selectableRange: '06:00:00 - 24:00:00'
								    }" placeholder="请设置标准签到时间">
							</el-time-picker>
						</el-form-item>
						<el-form-item label="签出标准时间" prop="standardouttime">
							<el-time-picker v-model="editForm.standardouttime" editable clearable size="large" :picker-options="{
								      selectableRange: '06:00:00 - 24:00:00'
								    }" placeholder="请设置标准签到时间">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缓冲时间(分)" prop="buffertime">
							<el-input v-model="editForm.buffertime" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="所属中心区域" prop="attendcentername">
							<el-select v-model="editForm.attendcentername" @visible-change="attendcenterChange" :loading="attendcenterLoading" filterable placeholder="请选择所属中心区域" clearable>
								<el-option v-for="item in attendcenterlist" :key="item.attendcentername" :label="item.attendcentername" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="考勤区域范围参数(半径N米)" prop="attendparam">
							<el-input v-model="editForm.attendparam" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remarks">
							<el-input v-model="editForm.remarks" auto-complete="off"></el-input>
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
			<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="部门" prop="deptname">
							<el-select v-model="addForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable @change="sendDeptIdData">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="分组" prop="groupname">
							<el-select v-model="addForm.groupname" :loading="groupLoading" filterable placeholder="请选择所属分组" clearable>
								<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="员工级别" prop="emplevel">
							<el-input v-model="addForm.emplevel" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="签到标准时间" prop="standardintime">
							<el-time-picker v-model="addForm.standardintime" editable clearable size="large" :picker-options="{
										      selectableRange: '06:00:00 - 24:00:00'
										    }" placeholder="请设置标准签到时间">
							</el-time-picker>
						</el-form-item>
						<el-form-item label="签出标准时间" prop="standardouttime">
							<el-time-picker v-model="addForm.standardouttime" editable clearable size="large" :picker-options="{
										      selectableRange: '06:00:00 - 24:00:00'
										    }" placeholder="请设置标准签到时间">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缓冲时间(分)" prop="buffertime">
							<el-input v-model="addForm.buffertime" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="所属中心区域" prop="attendcentername">
							<el-select v-model="addForm.attendcentername" @visible-change="attendcenterChange" :loading="attendcenterLoading" filterable placeholder="请选择所属中心区域" clearable>
								<el-option v-for="item in attendcenterlist" :key="item.attendcentername" :label="item.attendcentername" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="考勤区域范围参数(半径N米)" prop="attendparam">
							<el-input v-model="addForm.attendparam" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remarks">
							<el-input v-model="addForm.remarks" auto-complete="off"></el-input>
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

<script>
	import util from '../../common/js/util'
	import { getAttdRuleList, addAttdRule, modifyAttdRule, removeAttdRule, getSelectAttdRuleList, getGroupInfoList, getDeptList, getEmpGroupInfoList, getAttdCenterList } from '../../api/api';

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
				customers: [],
				deptlist: [], //员工所属部门列表
				deptLoading: false,
				grouplist: [], //所属分组
				groupLoading: false, //
				attendcenterlist: [], //所属中心区域
				attendcenterLoading: false, //
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					// deptname: [
					// 	{ required: true, message: '请选择部门', trigger: 'blur' }
					// ],
					// standardintime: [
					// 	{ required: true, message: '请输入签入标准时间', trigger: 'blur' }
					// ],
					// standardouttime: [
					// 	{ required: true, message: '请输入签出标准时间', trigger: 'blur' }
					// ],
				},
				//编辑界面数据
				editForm: {
					id: '',
					deptid: '',
					groupid: '',
					emplevel: '',
					standardintime: '',
					standardouttime: '',
					buffertime: '',
					attendcenterid: '',
					attendparam: '',
					remarks: '',
					deptname: '',
					groupname: '',
					attendcentername: '',
				},
				editFormId: {
					groupid: '',
					groupname: '',
					deptname: '',
					deptid: '',
					attendcenterid: '',
					attendcentername: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					// deptname: [
					// 	{ required: true, message: '请选择部门', trigger: 'blur' }
					// ],
					// standardintime: [
					// 	{ required: true, message: '请输入签入标准时间', trigger: 'blur' }
					// ],
					// standardouttime: [
					// 	{ required: true, message: '请输入签出标准时间', trigger: 'blur' }
					// ],
				},
				//新增界面数据
				addForm: {
					deptid: '',
					groupid: '',
					emplevel: '',
					standardintime: '',
					standardouttime: '',
					buffertime: '0',
					attendcenterid: '',
					attendparam: '',
					remarks: '',
					deptname: '',
					groupname: '',
					attendcentername: '',
				},
			}
		},
		methods: {
			// 选择所属部门时，匹配分组，传deptid
			sendDeptIdData(val) {
				this.addForm.groupname = ''; //清空所属分组
				this.editForm.groupname = ''; //清空所属分组
				let para = {
					deptid: val
				}
				getGroupInfoList(para).then((res) => {
					this.grouplist = res.data.data.records;
				});
			},
			//所属 部门——搜索下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				let para = {
					showCount:10000
				}
				getDeptList(para).then((res) => {
					this.deptlist = res.data.data.records;
					this.deptLoading = false;
				});
			},
			/*所属中心区域——下拉*/
			attendcenterChange(r) {
				if(!r || this.attendcenterlist.length > 0) return;
				this.attendcenterLoading = true;
				getAttdCenterList().then((res) => {
					this.attendcenterlist = res.data.data.records;
					this.attendcenterLoading = false;
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
				getSelectAttdRuleList(para).then((res) => {
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
				getAttdRuleList(para).then((res) => {
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
					removeAttdRule(para).then((res) => {
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
					id: row.id,
					deptname: row.deptname,
					groupname: row.groupname,
					emplevel: row.emplevel,
					standardintime: new Date(2017, 7, 7, row.standardintime.split(":")[0], row.standardintime.split(":")[1], row.standardintime.split(":")[2]),
					standardouttime: new Date(2017, 7, 7, row.standardouttime.split(":")[0], row.standardouttime.split(":")[1], row.standardouttime.split(":")[2]),
					buffertime: row.buffertime,
					attendcentername: row.attendcentername,
					attendparam: row.attendparam,
					remarks: row.remarks,
				}
				this.editFormId = {
					deptid: row.deptid,
					deptname: row.deptname,
					groupid: row.groupid,
					groupname: row.groupname,
					attendcenterid: row.attendcenterid,
					attendcentername: row.attendcentername,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					groupid: '',
					groupname: '',
					deptname: '',
					deptid: '',
					attendcenterid: '',
					attendcentername: '',
					emplevel: '',
					standardintime: new Date(2017, 7, 19, 9, 0),
					standardouttime: new Date(2017, 7, 19, 17, 30),
					buffertime: '0',
					attendparam: '',
					remarks: '',
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							deptid: this.editForm.deptname,
							groupid: this.editForm.groupname,
							emplevel: this.editForm.emplevel,
							standardintime: util.formatDate.format(this.editForm.standardintime, 'hh:mm:ss'),
							standardouttime: util.formatDate.format(this.editForm.standardouttime, 'hh:mm:ss'),
							buffertime: this.editForm.buffertime,
							attendcenterid: this.editForm.attendcentername,
							attendparam: this.editForm.attendparam,
							remarks: this.editForm.remarks,
						}
						if(this.editFormId.deptname == this.editForm.deptname) {
							para.deptid = this.editFormId.deptid;
						} else {
							para.deptid = this.editForm.deptname;
						}
						if(this.editFormId.groupname == this.editForm.groupname) {
							para.groupid = this.editFormId.groupid;
						} else {
							para.groupid = this.editForm.groupname;
						}
						if(this.editFormId.attendcentername == this.editForm.attendcentername) {
							para.attendcenterid = this.editFormId.attendcenterid;
						} else {
							para.attendcenterid = this.editForm.attendcentername;
						}
						modifyAttdRule(para).then((res) => {
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
							deptid: this.addForm.deptname,
							groupid: this.addForm.groupname,
							emplevel: this.addForm.emplevel,
							standardintime: util.formatDate.format(this.addForm.standardintime, 'hh:mm:ss'),
							standardouttime: util.formatDate.format(this.addForm.standardouttime, 'hh:mm:ss'),
							buffertime: this.addForm.buffertime,
							attendcenterid: this.addForm.attendcentername,
							attendparam: this.addForm.attendparam,
							remarks: this.addForm.remarks,
						}
						addAttdRule(para).then((res) => {
							if(res.data.result.code == 4001) {
								this.$message({
									message: res.data.result.desc,
									type: 'warning'
								});
								this.addLoading = false;
							} else {
								this.addLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							}
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
		},
	}
</script>