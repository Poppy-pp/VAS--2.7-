<!--* 
* @description: 客户管理
* @author: pl 
* @update: pl (2017-08-23 14:26) 
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
									<el-option label="客户名称" value="corpname"></el-option>
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
										<el-option label="客户名称" value="corpname"></el-option>
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
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
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
			<el-table-column prop="corpname" label="客户名称" align="center" >
			</el-table-column>
			<el-table-column prop="" :formatter="b1Format" label="派单人员" align="center" >
			</el-table-column>
			<el-table-column prop="" :formatter="b2Format" label="售后人员" align="center" >
			</el-table-column>
			<el-table-column prop="" :formatter="b3Format" label="保险人员" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">客户信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>客户名称:</dt>
							<dd>{{ corpThisData.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>客户名称缩写:</dt>
							<dd>{{ corpThisData.corpshortname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>客户电话:</dt>
							<dd>{{ corpThisData.tel1 }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>公司类型:</dt>
							<dd>{{ corpThisData.corptype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组织级别:</dt>
							<dd>{{ corpThisData.clevel == '0' ? '集团' : corpThisData.clevel == '1' ? '分公司' : corpThisData.clevel == '2' ? '子公司' : corpThisData.clevel =='3' ? '门店' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>父级公司:</dt>
							<dd>{{ corpThisData.parentname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>客户地址:</dt>
							<dd>{{ corpThisData.area }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>详细地址:</dt>
							<dd>{{ corpThisData.address }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>对应业务员:</dt>
							<dd>{{ salesMan }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">员工信息</span>
					</el-col>
					<template v-for="(item,index) in this.corpThisData.employees">
						<el-col :span="24" style="margin-top:10px;">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>员工:</dt>
								<dd>{{index+1}}</dd>
							</dl>
						</el-col>
						<el-col :span="12">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>员工姓名:</dt>
								<dd>{{item.employeename}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>手机号码:</dt>
								<dd>{{item.mobile}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>性别:</dt>
								<dd>{{item.gender == 'M' ? '男' : '女' }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>类型:</dt>
								<dd>{{item.employeetype}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>员工编号:</dt>
								<dd>{{item.employeecode}}</dd>
							</dl>
							<!-- <dl class="dllist" style="margin-bottom:10px;">
								   <dt>所属部门:</dt>
								  <dd>{{item.departments[0].deptname}}</dd>
							</dl> -->
						</el-col>
						<el-col :span="12">
							<!-- <dl class="dllist" style="margin-bottom:10px;">
								   <dt>员工岗位:</dt>
								  <dd>{{item.positionname}}</dd>
							</dl> -->
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>所属区域:</dt>
								<dd>{{item.region}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>通讯地址:</dt>
								<dd>{{item.address}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>QQ:</dt>
								<dd>{{item.qq}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>微信:</dt>
								<dd>{{item.wechatid}}</dd>
							</dl>
							<!-- <dl class="dllist" style="margin-bottom:10px;">
								   <dt>角色权限:</dt>
								  <dd>{{item.rolename}}</dd>
							</dl> -->
						</el-col>
					</template>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">文员信息</span>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>派单文员:</dt>
							<dd>{{ barr1.join(',') }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>售后文员:</dt>
							<dd>{{ barr2.join(',') }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>保险文员:</dt>
							<dd>{{ barr3.join(',') }}</dd>
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
						<el-form-item label="客户名称" prop="corpname">
							<el-input v-model="editForm.corpname" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="业务员" prop="">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.employeename" :fetch-suggestions="querySearchNameBusiness" placeholder="请输入业务员" :trigger-on-focus="false" @select="handleSelectNameBusiness"></el-autocomplete>
						</el-form-item>
						<el-form-item label="派单" prop="B1">
							<el-select v-model="editForm.assignment.B1" multiple placeholder="请选择" @visible-change="custEmpsChange" :loading="custEmpsLoading" filterable clearable value-key="employeename">
								<el-option v-for="item in custEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="售后" prop="B2">
							<el-select v-model="editForm.assignment.B2" multiple placeholder="请选择" @visible-change="afterEmpsChange" :loading="afterEmpsLoading" filterable clearable value-key="employeename">
								<el-option v-for="item in afterEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="保险" prop="B3">
							<el-select v-model="editForm.assignment.B3" multiple placeholder="请选择" @visible-change="insEmpsChange" :loading="insEmpsLoading" filterable clearable value-key="employeename">
								<el-option v-for="item in insEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item">
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
	import gdmap from 'components/map/gdmap';
	import { getCustomerCorpList, addCorporateDesk, getParentInfoList, getCorpType, getSysRoleInfoList, getSelectList, getDeptManagerInfoList, getEmpType, getPositionList, getEmpsGroupList, getEmployeeInfoList, getDeptList, getCheckoutOfCorpInfo, getCheckout, modifyCustomerCorp,modifyCorporateInfo } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		components: {
			gdmap,
		},
		data() {
			// 验证所有电话
			var checkAllMobile = (rule, value, callback) => {
				var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('请输入电话号码或手机号码'));
				} else {
					callback();
				}
			};
			//验证中文
			var checkChinese = (rule, value, callback) => {
				var reg = /^[\u4e00-\u9fa5]+$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入中文'));
				} else {
					callback();
				}
			};
			return {
				filters: {
					domSearch: [{
						select: ['corpname'],
						content: ''
					}], //查询框
					isdelete: '0',
				},
				checkList: [],
				activeNames: ['1'],
				barr1: [], //文员
				barr2: [],
				barr3: [],
				corpOptions: [{
					value: '0',
					label: '集团'
				}, {
					value: '1',
					label: '分公司'
				}, {
					value: '2',
					label: '子公司'
				}, {
					value: '3',
					label: '门店'
				}],
				value: '',
				salesMan: '', //存储返回成功后的业务员
				corpThisData: [], //新增成功后返回的数据
				emptype: [], //员工类型列表
				poslist: [], //员工职位列表
				etLoading: false,
				posLoading: false,
				checkedCities: [{
					checkedCities: []
				}],
				cities: [],
				active: 0, //步骤
				prOptions: util.initProvince(),
				listData: [],
				customers: [],
				deptlist: [], //员工所属部门列表
				deptLoading: false,
				parlist: [], //父级车名称列表
				parLoading: false, //父级车名称
				corptypelist: [], //公司类型列表
				corptypeLoading: false, //公司类型
				val: [], //选择的角色权限组
				custEmpsOptions: [], //派单文员组列表
				custEmpsLoading: false,
				afterEmpsOptions: [], //售后文员组列表
				afterEmpsLoading: false,
				insEmpsOptions: [], //保险文员组列表
				insEmpsLoading: false,
				val: [], //选择的角色权限组
				formDialogTableVisible: false,
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //
				empMobileCheck: '', //员工电话验证存入
				pageSize: 15,

				editLoading: false, //编辑界面是否显示
				editFormVisible: false,
				editFormRules: {

				},
				//编辑界面数据
				editForm: {
					corpid: '',
					corpname: '',
					employeename: '',
					employeeid: '',
					assignment: {
						B1: [], //派单文员组
						B2: [], //售后文员组
						B3: [], //保险文员组
					}
				},
				custThis: [], //当前已有的派单文员组
				afterThis: [], //当前已有的售后文员组
				insThis: [], //当前已有的保险文员组
			}
		},
		methods: {
			// 派单文员显示
			b1Format(row, col) {
				let b1Data = [];
				row.B1.forEach(function(item, index) {
					b1Data.push(item.employeename);
				});
				return b1Data.join(",");
			},
			// 售后文员显示
			b2Format(row, col) {
				let b2Data = [];
				row.B2.forEach(function(item, index) {
					b2Data.push(item.employeename);
				});
				return b2Data.join(",");
			},
			// 保险文员显示
			b3Format(row, col) {
				let b3Data = [];
				row.B3.forEach(function(item, index) {
					b3Data.push(item.employeename);
				});
				return b3Data.join(",");
			},
			// 业务员
			querySearchNameBusiness(queryString, cb) {
				let para = {
						employeename: queryString,
						deptname: '业务部',
						corpname: '万网公司',
					},
					businessNameArray = [];
				getEmployeeInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						businessNameArray.push({
							value: item.employeename,
							id: item.ID
						});
					});
					cb(businessNameArray);
				});
			},
			handleSelectNameBusiness(item) {
				this.editForm.employeename = item.value;
				this.editForm.employeeid = item.id;
			},
			//  派单文员组
			custEmpsChange(r) {
				if(!r || this.custEmpsOptions.length > 0) return;
				this.custEmpsLoading = true;
				let para = {
					isenable: 1,
					positionname: '派单',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.custEmpsOptions = res.data.data.records;
					this.custEmpsLoading = false;
				});
			},
			//  售后文员组
			afterEmpsChange(r) {
				if(!r || this.afterEmpsOptions.length > 0) return;
				this.afterEmpsLoading = true;
				let para = {
					isenable: 1,
					positionname: '售后',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.afterEmpsOptions = res.data.data.records;
					this.afterEmpsLoading = false;
				});
			},
			//  保险文员组
			insEmpsChange(r) {
				if(!r || this.insEmpsOptions.length > 0) return;
				this.insEmpsLoading = true;
				let para = {
					isenable: 1,
					positionname: '保险',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.insEmpsOptions = res.data.data.records;
					this.insEmpsLoading = false;
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
			formDetailHandle(data) {
				this.formDialogTableVisible = true;
				this.corpThisData = ''; //清空上条数据
				this.barr1 = [];
				this.barr2 = [];
				this.barr3 = [];

				this.corpThisData = data;

				// 遍历文员
				this.corpThisData.B1.forEach((item, index) => {
					this.barr1.push(item.employeename);
				});
				this.corpThisData.B2.forEach((item, index) => {
					this.barr2.push(item.employeename);
				});
				this.corpThisData.B3.forEach((item, index) => {
					this.barr3.push(item.employeename);
				});
				// 业务员
				this.salesMan = this.corpThisData.businessRelation.employeename;
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
				// getSortList(para).then((res) => {});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.handleQuery();
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.isdelete == 1 ? '是' : row.isdelete != undefined ? '否' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isdelete == 1) {
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
						isdelete: row.isdelete == 0 ? 1 : 0,
					}
					modifyCorporateInfo(para).then((res) => {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						row.isdelete = para.isdelete;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getCustomerCorpList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getCustomerCorpList(para).then((res) => {
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
						id: row.ID,
						isdelete: 1,
					}
					modifyCorporateInfo(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			},
			// 编辑派单文员
			editCustEmpChange() {
				if(this.custEmpsOptions.length > 0) {
					this.custEmpsOptions.forEach((item1, index) => {
						this.custThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B1.push(item1);
							}
						});
					});
					return;
				}
				let para = {
					isenable: 1,
					positionname: '派单',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.custEmpsOptions = res.data.data.records;
					this.custEmpsLoading = false;
					this.custEmpsOptions.forEach((item1, index) => {
						this.custThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B1.push(item1);
							}
						});
					});
				});
			},
			// 编辑售后文员
			editAfterEmpChange() {
				if(this.afterEmpsOptions.length > 0) {
					this.afterEmpsOptions.forEach((item1, index) => {
						this.afterThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B2.push(item1);
							}
						});
					});
					return;
				}
				let para = {
					isenable: 1,
					positionname: '售后',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.afterEmpsOptions = res.data.data.records;
					this.afterEmpsLoading = false;
					this.afterEmpsOptions.forEach((item1, index) => {
						this.afterThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B2.push(item1);
							}
						});
					});
				});
			},
			// 编辑保险文员
			editInsEmpChange() {
				if(this.insEmpsOptions.length > 0) {
					this.insEmpsOptions.forEach((item1, index) => {
						this.insThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B3.push(item1);
							}
						});
					});
					return;
				}
				let para = {
					isenable: 1,
					positionname: '保险',
					corpname: '万网'
				};
				getEmployeeInfoList(para).then((res) => {
					this.insEmpsOptions = res.data.data.records;
					this.insEmpsLoading = false;
					this.insEmpsOptions.forEach((item1, index) => {
						this.insThis.forEach((item2, index) => {
							if(item1.ID == item2.ID) {
								this.editForm.assignment.B3.push(item1);
							}
						});
					});
				});
			},
			//新增界面
			handleAdd() {
				this.$router.push('/corpAddProcess');
			},

			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {}; //清空
				this.custThis = row.B1; //当前已选择派单
				this.afterThis = row.B2; //当前已选择售后
				this.insThis = row.B3; //当前已选择保险

				if(row.businessRelation != null) { //当有业务员的时候
					this.editForm = {
						corpid: row.ID,
						corpname: row.corpname,

						employeename: row.businessRelation.employeename,
						employeeid: row.businessRelation.employeeid,

						assignment: {
							B1: [], //派单文员组
							B2: [], //售后文员组
							B3: [], //保险文员组
						}
					}
				} else { //当没有业务员的时候
					this.editForm = {
						corpid: row.ID,
						corpname: row.corpname,
						employeename: '',
						employeeid: '',
						assignment: {
							B1: [], //派单文员组
							B2: [], //售后文员组
							B3: [], //保险文员组
						}
					}
				}

				this.editCustEmpChange(); //派单
				this.editAfterEmpChange(); //售后
				this.editInsEmpChange(); //保险
			},

			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							corpid: this.editForm.corpid,
							corpname: this.editForm.corpname,
							business: this.editForm.employeeid,

							assignment: {
								B1: [],
								B2: [],
								B3: [],
							},
						}
						// 派单
						var custEmpsIds = new Array();
						this.editForm.assignment.B1.forEach(function(item, index) {
							custEmpsIds.push(item.ID);
						});
						para.assignment.B1 = custEmpsIds;

						// 售后
						var afterEmpsIds = new Array();
						this.editForm.assignment.B2.forEach(function(item, index) {
							afterEmpsIds.push(item.ID);
						});
						para.assignment.B2 = afterEmpsIds;

						// 保险
						var insEmpsIds = new Array();
						this.editForm.assignment.B3.forEach(function(item, index) {
							insEmpsIds.push(item.ID);
						});
						para.assignment.B3 = insEmpsIds;

						modifyCustomerCorp(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuery();
							// this.handleQuerySelect();
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
					removeProtocol(para).then((res) => {
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