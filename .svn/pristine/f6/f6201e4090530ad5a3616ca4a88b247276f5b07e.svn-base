<!--* 
* @description: 代理设置
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
									<el-option label="员工" value="employeename"></el-option>
									<el-option label="代理员工" value="agentemployeename"></el-option>
									<el-option label="代理产品" value="agentsystem"></el-option>
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
										<el-option label="员工" value="employeename"></el-option>
										<el-option label="代理员工" value="agentemployeename"></el-option>
										<el-option label="代理产品" value="agentsystem"></el-option>
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
		<el-table :max-height="windowOutHeight-170" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="employeename" label="员工" align="center" >
			</el-table-column>
			<el-table-column prop="agentemployeename" label="代理员工" align="center" >
			</el-table-column>
			<el-table-column prop="agentstarttime" label="代理开始时间" :formatter="dateFormatter" align="center" >
			</el-table-column>
			<el-table-column prop="agentendtime" label="代理结束时间" :formatter="dateFormatterSecond" align="center" >
			</el-table-column>
			<el-table-column prop="agentsystem" label="代理产品" :formatter="agentProdFormatter" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
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
			<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination> -->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">代理信息</span>
					</el-col>
					<el-col :span="14">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工:</dt>
							<dd>{{ agentThisList.employeename + '(' + agentThisList.mobile + ')' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>代理员工:</dt>
							<dd>{{ agentThisList.agentemployeename + '(' + agentThisList.agentmobile + ')' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>代理产品:</dt>
							<dd>{{ agentThisList.agentsystem == "A" ? 'VAS' : agentThisList.agentsystem == "B" ? 'E车宝' : agentThisList.agentsystem == "C" ? 'UCHE' : '未知'}}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>代理开始时间:</dt>
							<dd>{{ agentThisList.agentstarttime == null ? "" :fmtdata.formatDate.format(new Date(agentThisList.agentstarttime), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>代理结束时间:</dt>
							<dd>{{ agentThisList.agentendtime == null ? "" :fmtdata.formatDate.format(new Date(agentThisList.agentendtime), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{agentThisList.createby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{agentThisList.createdate == null ? "" :fmtdata.formatDate.format(new Date(agentThisList.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{agentThisList.updateby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{agentThisList.updatedate == null ? "" :fmtdata.formatDate.format(new Date(agentThisList.updatedate), 'yyyy-MM-dd') }}</dd>
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
					<el-col :span="12">
						<el-form-item label="员工" prop="employeename">
							<el-select v-model="editForm.employeename" filterable placeholder="请选择员工" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="代理员工" prop="agentemployeename">
							<el-select v-model="editForm.agentemployeename" filterable placeholder="请选择代理员工" @visible-change="agentEmpChange" :loading="agentEmpLoading" filterable clearable>
							    <el-option
							      v-for="item in agentEmpOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="代理产品" prop="agentsystem">
							<el-select v-model="editForm.agentsystem" filterable placeholder="请选择代理产品" clearable>
								<el-option v-for="item in agentProdOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="代理开始时间" prop="agentstarttime">
							<el-date-picker v-model="editForm.agentstarttime" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="代理结束时间" prop="agentendtime">
							<el-date-picker v-model="editForm.agentendtime" type="date" placeholder="选择日期" :picker-options="pickerOptions2">
							</el-date-picker>
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
					<el-col :span="12">
						<el-form-item label="员工" prop="employeename">
							<el-select v-model="addForm.employeename" filterable placeholder="请选择员工" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="代理员工" prop="agentemployeename">
							<el-select v-model="addForm.agentemployeename" filterable placeholder="请选择代理员工" @visible-change="agentEmpChange" :loading="agentEmpLoading" filterable clearable>
							    <el-option
							      v-for="item in agentEmpOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="代理产品" prop="agentsystem">
							<el-select v-model="addForm.agentsystem" filterable placeholder="请选择代理产品" clearable>
								<el-option v-for="item in agentProdOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="代理开始时间" prop="agentstarttime">
							<el-date-picker v-model="addForm.agentstarttime" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="代理结束时间" prop="agentendtime">
							<el-date-picker v-model="addForm.agentendtime" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
							</el-date-picker>
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
	import { getAgentList, addAgent, modifyAgent, removeAgent, getSelectListAgent, getDeptManagerInfoList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['employeename'],
						content: ''
					}], //查询框
					isactive: '1'
				},
				pickerOptions1: {//结束日期
			                disabledDate: (time) => {
			                    return time.getTime() < this.addForm.agentstarttime;
			                }
			            },
			            pickerOptions2: {//结束日期
			                disabledDate: (time) => {
			                    return time.getTime() < this.editForm.agentstarttime;
			                }
			            },
				agentProdOptions: [{
					value: 'A',
					label: 'VAS'
				}, {
					value: 'B',
					label: 'E车宝'
				}, {
					value: 'C',
					label: 'UCHE'
				}],
				value: '',
				listData: [],
				empLoading:false,
				empOptions:[],//员工列表
				agentEmpLoading:false,
				agentEmpOptions:[],//代理员工列表
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				agentThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					positionname: [{
						required: true,
						message: '请输入岗位',
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					id: '',
					employeeid: '',
					agentemployeeid: '',
					employeename: '',
					agentemployeename: '',
					agentsystem: '',
					agentstarttime: '',
					agentendtime: '',
					mobile: '',
					agentmobile: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					positionname: [{
						required: true,
						message: '请输入岗位',
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					employeeid: '',
					agentemployeeid: '',
					employeename: '',
					agentemployeename: '',
					agentsystem: '',
					agentstarttime: '',
					agentendtime: '',
					isactive: 1,
					mobile: '',
					agentmobile: '',
				},
			}
		},
		methods: {
			// 员工——搜索下拉
			empChange(r) {
				if(!r || this.empOptions.length > 0) return;
				this.empLoading = true;
				getDeptManagerInfoList().then((res) => {
					this.empOptions = res.data.data.records;
					this.empLoading = false;
				});
			},
			// 代理员工——搜索下拉
			agentEmpChange(r) {
				if(!r || this.agentEmpOptions.length > 0) return;
				this.agentEmpLoading = true;
				getDeptManagerInfoList().then((res) => {
					this.agentEmpOptions = res.data.data.records;
					this.agentEmpLoading = false;
				});
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(posID) {
				this.formDialogTableVisible = true;
				this.agentThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: posID
				}
				nanobar.go(70);
				getAgentList(para).then((res) => {
					this.agentThisList = res.data.data.records[0];
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
						id: row.ID,
						isactive: row.isactive == 0 ? 1 : 0,
					}
					modifyAgent(para).then((res) => {
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
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.agentstarttime == "" || row.agentstarttime == undefined) return;
				return util.formatDate.format(new Date(row.agentstarttime), 'yyyy-MM-dd');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.agentendtime == "" || row.agentendtime == undefined) return;
				return util.formatDate.format(new Date(row.agentendtime), 'yyyy-MM-dd');
			},
			// 代理产品
			agentProdFormatter: function(row, col) {
				return row.agentsystem == "A" ? 'VAS' : row.agentsystem == "B" ? 'E车宝' : row.agentsystem == "C" ? 'UCHE' : '未知';
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
				getSelectListAgent(para).then((res) => {
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
				getAgentList(para).then((res) => {
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
						ids: row.ID,
						method: "delete"
					};

					removeAgent(para).then((res) => {
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
					id: row.ID,
					employeeid: row.employeeid,
					agentemployeeid: row.agentemployeeid,
					employeename: row.employeename,
					agentemployeename: row.agentemployeename,
					agentsystem: row.agentsystem,
					agentstarttime: row.agentstarttime,
					agentendtime: row.agentendtime,
					agentmobile: row.agentmobile,
					mobile: row.mobile,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					employeeid: '',
					agentemployeeid: '',
					employeename: '',
					agentemployeename: '',
					agentsystem: '',
					agentstarttime: '',
					agentendtime: '',
					isactive: 1,
					agentmobile: '',
					mobile: '',
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							employeeid: this.editForm.employeeid,
							agentemployeeid: this.editForm.agentemployeeid,
							employeename: this.editForm.employeename,
							agentemployeename: this.editForm.agentemployeename,
							agentsystem: this.editForm.agentsystem,
							agentstarttime: util.formatDate.format(new Date(this.editForm.agentstarttime), 'yyyy-MM-dd'),
							agentendtime: util.formatDate.format(new Date(this.editForm.agentendtime), 'yyyy-MM-dd'),
							agentmobile: this.editForm.agentmobile,
							mobile: this.editForm.mobile,
						}

						if (para.employeename == '') {
							this.$message({
								message: '当前【员工】无效！请选择系统正确的员工',
								type: 'error'
							});
							this.editLoading = false;
							return;
						}else if (para.agentemployeename == '') {
							this.$message({
								message: '当前【代理员工】无效！请选择系统正确的员工',
								type: 'error'
							});
							this.editLoading = false;
							return;
						}else{
							para.employeeid = isNaN(this.editForm.employeename) ? this.editForm.employeeid : this.editForm.employeename;
							para.agentemployeeid = isNaN(this.editForm.agentemployeename) ? this.editForm.agentemployeeid : this.editForm.agentemployeename;
						}
						modifyAgent(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.editFormVisible = false;
							this.$refs['editForm'].resetFields();
							this.GetPositions();
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
							employeeid: this.addForm.employeename,
							agentemployeeid: this.addForm.agentemployeename,
							employeename: this.addForm.employeename,
							agentemployeename: this.addForm.agentemployeename,
							agentsystem: this.addForm.agentsystem,
							agentstarttime: this.addForm.agentstarttime,
							agentendtime: this.addForm.agentendtime,
							isactive: this.addForm.isactive,
							agentmobile: this.addForm.agentmobile,
							mobile: this.addForm.mobile,
						}
						if (para.employeeid == '') {
							this.$message({
								message: '当前【员工】无效！请选择系统正确的员工',
								type: 'error'
							});
							this.addLoading = false;
							return;
						}
						if (para.agentemployeeid == '') {
							this.$message({
								message: '当前【代理员工】无效！请选择系统正确的员工',
								type: 'error'
							});
							this.addLoading = false;
							return;
						}
						addAgent(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.addFormVisible = false;
							this.$refs['addForm'].resetFields();
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
					removeAgent(para).then((res) => {
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