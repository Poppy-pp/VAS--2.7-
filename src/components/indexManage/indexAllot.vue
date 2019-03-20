<!--* 
* @description: 指标分配
* @author: pl 
* @update: pl (2017-10-13 14:26) 
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
									<el-option label="所属公司" value="corpname"></el-option>
									<el-option label="指标所属对象" value="kpiownername"></el-option>
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
										<el-option label="所属公司" value="corpname"></el-option>
										<el-option label="指标所属对象" value="kpiownername"></el-option>
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
					</template>
				</template>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table stripe :max-height="windowOutHeight-200" border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="kpiname" label="指标名称" align="center">
			</el-table-column>
			<el-table-column prop="kpilevel" label="级别" :formatter="levelFormat" align="center" width="70">
			</el-table-column>
			<el-table-column prop="kpiownername" label="指标所属对象" align="center">
			</el-table-column>
			<el-table-column prop="corpname" label="所属公司" align="center" width="100">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive == '0' ? true : false" title="编辑">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
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
					<el-col :span="24">
						<el-form-item label="指标名称" prop="kpiname">
							<el-input disabled v-model="editForm.kpiname" placeholder="请输入名称" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="指标级别" prop="kpilevel">
							<el-radio-group v-model="editForm.kpilevel">
								<el-radio-button label="0">公司级</el-radio-button>
								<el-radio-button label="1">部门级</el-radio-button>
								<el-radio-button label="2">分组级</el-radio-button>
								<el-radio-button label="3">个人级</el-radio-button>
								<el-radio-button disabled label="4">区域级</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="指标所属对象">
							<el-select v-show="editForm.kpilevel == '0'" v-model="editForm.tempDatas" multiple remote :remote-method="editRemoteMethodCorp" @visible-change="editCorpChange" placeholder="请选择该指标对应公司" :loading="editCorpLoading" filterable clearable value-key="value">
								<el-option v-for="item in editCorpOptions" :key="item.value" :label="item.value" :value="item">
								</el-option>
							</el-select>
							<el-select v-show="editForm.kpilevel == '1'" v-model="editForm.tempDatas" multiple remote :remote-method="editRemoteMethodDept" @visible-change="editDeptChange" placeholder="请选择该指标对应部门" :loading="editDeptLoading" filterable clearable value-key="value">
								<el-option v-for="item in editDeptOptions" :key="item.value" :label="item.value" :value="item">
								</el-option>
							</el-select>
							<el-select v-show="editForm.kpilevel == '2'" v-model="editForm.tempDatas" multiple remote :remote-method="editRemoteMethodGroup" @visible-change="editGroupChange" placeholder="请选择该指标对应分组" :loading="editGroupLoading" filterable clearable value-key="value">
								<el-option v-for="item in editGroupOptions" :key="item.value" :label="item.value" :value="item">
								</el-option>
							</el-select>
							<el-select v-show="editForm.kpilevel == '3'" v-model="editForm.tempDatas" multiple remote :remote-method="editRemoteMethodEmp" @visible-change="editEmpChange" placeholder="请选择该指标对应人员" :loading="editEmpLoading" filterable clearable value-key="value">
								<el-option v-for="item in editEmpOptions" :key="item.value" :label="item.value" :value="item">
								</el-option>
							</el-select>
						</el-form-item>

					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">指标信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标名称:</dt>
							<dd>{{ kpiThisList.kpiname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标级别:</dt>
							<dd>{{ kpiThisList.kpilevel == '0' ? '公司级' : kpiThisList.kpilevel == '1' ? '部门级' : kpiThisList.kpilevel == '2' ? '分组级' : kpiThisList.kpilevel == '3' ? '个人级' : kpiThisList.kpilevel == '4' ? '区域级' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标定义:</dt>
							<dd>{{ kpiThisList.kpidesc == undefined ? '暂无' : kpiThisList.kpidesc }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd>{{ kpiThisList.corpname == undefined ? '暂无' : kpiThisList.corpname }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标周期值:</dt>
							<dd>{{ kpiThisList.kpicycle == undefined ? '暂无' : kpiThisList.kpicycle }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标周期类型:</dt>
							<dd>{{ kpiThisList.kpicycletype == 'y' ? '年' : kpiThisList.kpicycletype == 'q' ? '季度' : kpiThisList.kpicycletype == 'm' ? '月' : kpiThisList.kpicycletype == 'w' ? '周' : kpiThisList.kpicycletype == 'd' ? '天' : '暂无'}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标值:</dt>
							<dd>{{ kpiThisList.kpivalue == undefined ? '暂无' : kpiThisList.kpivalue }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标值类型:</dt>
							<dd>{{ kpiThisList.kpivaluetype == 'p' ? '百分比' : kpiThisList.kpivaluetype == 'n' ? '数字' : '暂无' }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">分配信息</span>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指标所属对象:</dt>
							<dd>{{kpiThisList.kpiownername == undefined ? '暂无' : kpiThisList.kpiownername}}</dd>
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
							<dd>{{kpiThisList.createby == undefined ? '暂无' : kpiThisList.createby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{kpiThisList.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(kpiThisList.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{kpiThisList.updateby == undefined ? '暂无' : kpiThisList.updateby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{kpiThisList.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(kpiThisList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->
	</section>
</template>

<style type="text/css" media="screen">

</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getKpidefineList, modifyKpiOwner, getSelectListKpidefine, getMoreKpiList, getKpiOwnerList } from '../../api/api';

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
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				kpiThisList: [],
				formDialogTableVisible: false,
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					kpiname: '',
					kpilevel: '',
					owner: [],
					tempDatas: [],
				},

				editCorpOptions: [], //公司
				editCorpLoading: false,
				editDeptOptions: [], //部门
				editDeptLoading: false,
				editGroupOptions: [], //分组
				editGroupLoading: false,
				editEmpOptions: [], //个人
				editEmpLoading: false,
				kpiSelect: [], //编辑页当前已选择的所属对象
			}
		},
		methods: {
			// 远程搜索方法——公司
			editRemoteMethodCorp(query) {
				let para = {
					isdelete: 0,
					id: this.editForm.kpilevel,
					value: query
				};
				this.editCorpLoading = true;
				getMoreKpiList(para).then((res) => {
					this.editCorpLoading = false;
					this.editCorpOptions = res.data.data;
				});
			},
			// 远程搜索方法——部门
			editRemoteMethodDept(query) {
				let para = {
					isdelete: 0,
					id: this.editForm.kpilevel,
					value: query
				};
				this.editDeptLoading = true;
				getMoreKpiList(para).then((res) => {
					this.editDeptLoading = false;
					this.editDeptOptions = res.data.data;
				});
			},
			// 远程搜索方法——分组
			editRemoteMethodGroup(query) {
				let para = {
					isdelete: 0,
					id: this.editForm.kpilevel,
					value: query
				};
				this.editGroupLoading = true;
				getMoreKpiList(para).then((res) => {
					this.editGroupLoading = false;
					this.editGroupOptions = res.data.data;
				});
			},
			// 远程搜索方法——个人
			editRemoteMethodEmp(query) {
				let para = {
					isdelete: 0,
					id: this.editForm.kpilevel,
					value: query
				};
				this.editEmpLoading = true;
				getMoreKpiList(para).then((res) => {
					this.editEmpLoading = false;
					this.editEmpOptions = res.data.data;
				});
			},
			// 所属对象——公司下拉选择
			editCorpChange(r) {
				if(!r || this.editCorpOptions.length > 0) return;
				this.editCorpLoading = true;
				let para = {
					id: this.editForm.kpilevel,
				};
				getMoreKpiList(para).then((res) => {
					this.editCorpOptions = res.data.data;
					this.editCorpLoading = false;
				});
			},
			// 所属对象——部门下拉选择
			editDeptChange(r) {
				if(!r || this.editDeptOptions.length > 0) return;
				this.editDeptLoading = true;
				let para = {
					id: this.editForm.kpilevel,
				};
				getMoreKpiList(para).then((res) => {
					this.editDeptOptions = res.data.data;
					this.editDeptLoading = false;
				});
			},
			// 所属对象——分组下拉选择
			editGroupChange(r) {
				if(!r || this.editGroupOptions.length > 0) return;
				this.editGroupLoading = true;
				let para = {
					id: this.editForm.kpilevel,
				};
				getMoreKpiList(para).then((res) => {
					this.editGroupOptions = res.data.data;
					this.editGroupLoading = false;
				});
			},
			// 所属对象——个人下拉选择
			editEmpChange(r) {
				if(!r || this.editEmpOptions.length > 0) return;
				this.editEmpLoading = true;
				let para = {
					id: this.editForm.kpilevel,
				};
				getMoreKpiList(para).then((res) => {
					this.editEmpOptions = res.data.data;
					this.editEmpLoading = false;
				});
			},

			//详情查看
			formDetailHandle(kpiId) {
				this.formDialogTableVisible = true;
				this.kpiThisList = ''; //清空上条数据
				// 获取当前信息
				let para = {
					id: kpiId
				}
				nanobar.go(70);
				getKpidefineList(para).then((res) => {
					this.kpiThisList = res.data.data.records[0];
					nanobar.go(100);
				});
			},
			// 级别显示
			levelFormat(row, col) {
				return row.kpilevel == '0' ? '公司级' : row.kpilevel == '1' ? '部门级' : row.kpilevel == '2' ? '分组级' : row.kpilevel == '3' ? '个人级' : row.kpilevel == '4' ? '区域级' : '';
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

			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;

				let para = {
						kpiname: row.kpiname,
					},
					thisKpiLevel;
				getKpiOwnerList(para).then((res) => {
					this.kpiSelect = res.data.data.ownerslist; //当前已选择的所属对象
					thisKpiLevel = res.data.data.kpilevel;
					this.editForm.tempDatas = this.kpiSelect; //赋值页面显示

					// 输入框默认选择
					if(thisKpiLevel == '0') { //公司时
						this.editCorpOptions = this.kpiSelect;
					} else if(thisKpiLevel == '1') { //部门时
						this.editDeptOptions = this.kpiSelect;
					} else if(thisKpiLevel == '2') { //分组时
						this.editGroupOptions = this.kpiSelect;
					} else if(thisKpiLevel == '3') { //个人时
						this.editEmpOptions = this.kpiSelect;
					}
				})

				this.editForm = {
					id: row.id,
					kpiname: row.kpiname,
					kpilevel: row.kpilevel,
					owner: [],
					tempDatas: [],
				}
			},

			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							kpilevel: this.editForm.kpilevel,
							owner: [],
						}
						var ownerIds = new Array();
						this.editForm.tempDatas.forEach(function(item, index) {
							ownerIds.push(item.id);
						});
						para.owner = ownerIds;

						modifyKpiOwner(para).then((res) => {
							this.editLoading = false;
							if(res.data.data.code == 4001) {
								this.$message({
									message: res.data.data.desc,
									type: 'error'
								});
							} else {
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.GetPositions();
								// this.handleQuerySelect();
							}
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