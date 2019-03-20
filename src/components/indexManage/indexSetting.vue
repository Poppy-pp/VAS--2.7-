<!--* 
* @description: 指标管理
* @author: pl 
* @update: pl (2017-10-10 14:26) 
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
									<el-option label="名称" value="kpiname"></el-option>
									<el-option label="级别" value="kpilevel"></el-option>
									<el-option label="定义" value="kpidesc"></el-option>
									<el-option label="周期类型" value="kpicycletype"></el-option>
									<el-option label="周期值" value="kpicycle"></el-option>
									<el-option label="指标值类型" value="kpivaluetype"></el-option>
									<el-option label="指标值" value="kpivalue"></el-option>
									<el-option label="所属公司" value="corpname"></el-option>
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
										<el-option label="名称" value="kpiname"></el-option>
										<el-option label="级别" value="kpilevel"></el-option>
										<el-option label="定义" value="kpidesc"></el-option>
										<el-option label="周期类型" value="kpicycletype"></el-option>
										<el-option label="周期值" value="kpicycle"></el-option>
										<el-option label="指标值类型" value="kpivaluetype"></el-option>
										<el-option label="指标值" value="kpivalue"></el-option>
										<el-option label="所属公司" value="corpname"></el-option>
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
		<el-table stripe :max-height="windowOutHeight-200" border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="kpiname" label="名称" align="center">
			</el-table-column>
			<el-table-column prop="kpilevel" label="级别" :formatter="levelFormat" align="center" width="70">
			</el-table-column>
			<!-- <el-table-column prop="kpiowner" label="指标所属对象" align="center" >
			</el-table-column> -->
			<el-table-column prop="kpidesc" label="定义" align="center">
			</el-table-column>
			<el-table-column prop="kpicycle" label="周期值" align="center" width="70">
			</el-table-column>
			<el-table-column prop="kpicycletype" label="周期类型" :formatter="cycletypeFormat" align="center" width="70">
			</el-table-column>
			<el-table-column prop="kpivalue" label="指标值" align="center" width="100">
			</el-table-column>
			<el-table-column prop="kpivaluetype" label="指标值类型" :formatter="valuetypeFormat" align="center" width="80">
			</el-table-column>
			<el-table-column prop="corpname" label="所属公司" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<!-- <el-button id="button"  @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button> -->
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

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" class="form">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="名称" prop="kpiname">
							<el-input v-model="editForm.kpiname" placeholder="请输入名称" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="所属公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="定义" prop="kpidesc">
							<el-input v-model="editForm.kpidesc" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="col">
						<el-form-item label="指标级别" prop="kpilevel">
							<el-radio-group size="small" v-model="editForm.kpilevel">
								<el-radio-button label="0">公司级</el-radio-button>
								<el-radio-button label="1">部门级</el-radio-button>
								<el-radio-button label="2">分组级</el-radio-button>
								<el-radio-button label="3">个人级</el-radio-button>
								<el-radio-button label="4">区域级</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="指标周期">
							<el-input placeholder="请输入周期值" v-model="editForm.kpicycle">
								<el-select class="select" v-model="editForm.kpicycletype" slot="append" placeholder="周期类型" clearable>
									<el-option label="年" value="y"></el-option>
									<el-option label="季度" value="q"></el-option>
									<el-option label="月" value="m"></el-option>
									<el-option label="周" value="w"></el-option>
									<el-option label="天" value="d"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<el-form-item label="指标值">
							<el-input placeholder="请输入指标值" v-model="editForm.kpivalue">
								<el-select class="select" v-model="editForm.kpivaluetype" slot="append" placeholder="值类型" clearable>
									<el-option label="百分比" value="p"></el-option>
									<el-option label="数字" value="n"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<!-- <el-form-item label="指标所属对象">
						<el-autocomplete v-model="editForm.kpiowner" :fetch-suggestions="querySearchKpi" placeholder="请输入指标所属对象" @select="handleSelectKpi">	
						    <el-select class="selectPre" v-model="editForm.kpilevel" slot="prepend" placeholder="级别" clearable @change="sendKpiLevel">
							<el-option label="公司级" value="0"></el-option>
							<el-option label="部门级" value="1"></el-option>
							<el-option label="分组级" value="2"></el-option>
							<el-option label="个人级" value="3"></el-option>
							<el-option label="区域级" value="4"></el-option>
						    </el-select>
						</el-autocomplete>
					</el-form-item> -->
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
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" class="form">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="名称" prop="kpiname">
							<el-input v-model="addForm.kpiname" placeholder="请输入名称" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="所属公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="定义" prop="kpidesc">
							<el-input v-model="addForm.kpidesc" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="col">
						<el-form-item label="指标级别" prop="kpilevel">
							<el-radio-group size="small" v-model="addForm.kpilevel">
								<el-radio-button label="0">公司级</el-radio-button>
								<el-radio-button label="1">部门级</el-radio-button>
								<el-radio-button label="2">分组级</el-radio-button>
								<el-radio-button label="3">个人级</el-radio-button>
								<el-radio-button label="4">区域级</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="指标周期">
							<el-input placeholder="请输入周期值" v-model="addForm.kpicycle">
								<el-select class="select" v-model="addForm.kpicycletype" slot="append" placeholder="周期类型" clearable>
									<el-option label="年" value="y"></el-option>
									<el-option label="季度" value="q"></el-option>
									<el-option label="月" value="m"></el-option>
									<el-option label="周" value="w"></el-option>
									<el-option label="天" value="d"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<el-form-item label="指标值">
							<el-input placeholder="请输入指标值" v-model="addForm.kpivalue">
								<el-select class="select" v-model="addForm.kpivaluetype" slot="append" placeholder="值类型" clearable>
									<el-option label="百分比" value="p"></el-option>
									<el-option label="数字" value="n"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<!-- <el-form-item label="指标所属对象">
						<el-autocomplete v-model="addForm.kpiowner" :fetch-suggestions="querySearchKpi" placeholder="请输入指标所属对象" @select="handleSelectKpi">	
						    <el-select class="selectPre" v-model="addForm.kpilevel" slot="prepend" placeholder="级别" clearable @change="sendKpiLevel">
							<el-option label="公司级" value="0"></el-option>
							<el-option label="部门级" value="1"></el-option>
							<el-option label="分组级" value="2"></el-option>
							<el-option label="个人级" value="3"></el-option>
							<el-option label="区域级" value="4"></el-option>
						    </el-select>
						</el-autocomplete>
					</el-form-item> -->
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
	
	.form .col .select .el-input {
		width: 105px;
	}
	
	.form .col .selectPre .el-input {
		width: 100px;
		padding-left: 10px;
	}
	
	.form .col .el-autocomplete {
		width: 100%;
	}
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getKpidefineList, addKpidefine, modifyKpidefine, getSelectListKpidefine, getAllCorpList, getMoreKpiList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['kpiname'],
						content: ''
					}], //查询框
					isactive: '1',
				},
				listData: [],
				restaurants: [], //指标所属对象——搜索数据
				levelId: '', //传的级别id
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {

				},
				//编辑界面数据
				editForm: {
					id: '',
					kpiname: '',
					kpilevel: '',
					kpidesc: '',
					corpid: '',
					corpname: '',
					kpiownerid: '',
					kpiowner: '',
					kpicycle: '',
					kpicycletype: '',
					kpivalue: '',
					kpivaluetype: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					kpiname: '',
					kpilevel: '',
					kpidesc: '',
					corpid: '',
					corpname: '',
					kpiownerid: '',
					kpiowner: '',
					kpicycle: '',
					kpicycletype: '',
					kpivalue: '',
					kpivaluetype: '',
				},
			}
		},
		methods: {
			// 下拉框——选择级别，存入级别id
			sendKpiLevel(val) {
				this.levelId = val; //存入级别id
				this.editForm.kpiowner = ''; //初始化输入框
				this.addForm.kpiowner = ''; //初始化输入框
			},
			// 输入框——选择级别指标所属对象
			querySearchKpi(queryString, cb) {
				if(this.levelId == '') {
					this.$message({
						message: '请先选择指标级别！',
						type: 'warning'
					});
				} else {
					let para = {
						id: this.levelId,
						value: queryString
					};
					getMoreKpiList(para).then((res) => {
						cb(res.data.data);
					});
				}
			},
			//输入框—— 选择操作
			handleSelectKpi(item) {
				this.editForm.kpiowner = item.value;
				this.editForm.kpiownerid = item.id;
				this.addForm.kpiowner = item.value;
				this.addForm.kpiownerid = item.id;
			},

			// 公司——搜索下拉
			querySearchCorpName(queryString, cb) {
				let para = {
						corpname: queryString,
						isdelete: 0,
					},
					corpNameArray = [];
				getAllCorpList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						corpNameArray.push({
							value: item.corpname,
							id: item.id
						});
					});
					cb(corpNameArray);
				});
			},
			handleSelectCorpName(item) {
				this.editForm.corpname = item.value;
				this.editForm.corpid = item.id;
				this.addForm.corpname = item.value;
				this.addForm.corpid = item.id;
			},
			// 级别显示
			levelFormat(row, col) {
				return row.kpilevel == '0' ? '公司级' : row.kpilevel == '1' ? '部门级' : row.kpilevel == '2' ? '分组级' : row.kpilevel == '3' ? '个人级' : row.kpilevel == '4' ? '区域级' : '';
			},
			// 周期类型显示
			cycletypeFormat(row, col) {
				return row.kpicycletype == 'y' ? '年' : row.kpicycletype == 'q' ? '季度' : row.kpicycletype == 'm' ? '月' : row.kpicycletype == 'w' ? '周' : row.kpicycletype == 'd' ? '天' : '';
			},
			// 指标值类型显示
			valuetypeFormat(row, col) {
				return row.kpivaluetype == 'p' ? '百分比' : row.kpivaluetype == 'n' ? '数字' : '';
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
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
					modifyKpidefine(para).then((res) => {
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
				getSelectListKpidefine(para).then((res) => {
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
				getKpidefineList(para).then((res) => {
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

					modifyKpidefine(para).then((res) => {
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
					kpiname: row.kpiname,
					kpilevel: row.kpilevel,
					kpidesc: row.kpidesc,
					corpid: row.corpid,
					corpname: row.corpname,
					kpiownerid: row.kpiownerid,
					kpiowner: row.kpiowner,
					kpicycle: row.kpicycle,
					kpicycletype: row.kpicycletype,
					kpivalue: row.kpivalue,
					kpivaluetype: row.kpivaluetype,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					kpiname: '',
					kpilevel: '',
					kpidesc: '',
					corpid: '',
					corpname: '',
					kpiownerid: '',
					kpiowner: '',
					kpicycle: '',
					kpicycletype: '',
					kpivalue: '',
					kpivaluetype: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							kpiname: this.editForm.kpiname,
							kpilevel: this.editForm.kpilevel,
							kpidesc: this.editForm.kpidesc,
							corpid: this.editForm.corpid,
							corpname: this.editForm.corpname,
							kpiownerid: this.editForm.kpiownerid,
							kpiowner: this.editForm.kpiowner,
							kpicycle: this.editForm.kpicycle,
							kpicycletype: this.editForm.kpicycletype,
							kpivalue: this.editForm.kpivalue,
							kpivaluetype: this.editForm.kpivaluetype,
						}
						modifyKpidefine(para).then((res) => {
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
							kpiname: this.addForm.kpiname,
							kpilevel: this.addForm.kpilevel,
							kpidesc: this.addForm.kpidesc,
							corpid: this.addForm.corpid,
							corpname: this.addForm.corpname,
							kpiownerid: this.addForm.kpiownerid,
							kpiowner: this.addForm.kpiowner,
							kpicycle: this.addForm.kpicycle,
							kpicycletype: this.addForm.kpicycletype,
							kpivalue: this.addForm.kpivalue,
							kpivaluetype: this.addForm.kpivaluetype,
						}
						if(para.corpid == '') {
							this.$message({
								message: '请选择所属公司！',
								type: 'warning'
							});
						} else {
							addKpidefine(para).then((res) => {
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
					removeKpidefine(para).then((res) => {
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