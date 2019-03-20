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
									<el-option label="名称缩写" value="deptshortname"></el-option>
									<el-option label="父级部门" value="parentname"></el-option>
									<el-option label="所属公司" value="corpname"></el-option>
									<el-option label="负责人" value="deptmanagername"></el-option>
									<el-option label="地址" value="deptaddress"></el-option>
									<el-option label="电话" value="deptcontactno"></el-option>
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
										<el-option label="名称缩写" value="deptshortname"></el-option>
										<el-option label="父级部门" value="parentname"></el-option>
										<el-option label="所属公司" value="corpname"></el-option>
										<el-option label="负责人" value="deptmanagername"></el-option>
										<el-option label="地址" value="deptaddress"></el-option>
										<el-option label="电话" value="deptcontactno"></el-option>
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
							<el-switch v-model="filters.isenable" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="deptname" label="部门" width="150" align="center" >
			</el-table-column>
			<el-table-column prop="deptshortname" label="名称缩写" align="center" >
			</el-table-column>
			<el-table-column prop="parentname" label="父级部门" align="center" >
			</el-table-column>
			<el-table-column prop="corpname" label="所属公司" align="center" >
			</el-table-column>
			<el-table-column prop="deptmanagername" label="负责人" align="center" >
			</el-table-column>
			<el-table-column prop="deptaddress" label="地址" align="center" >
			</el-table-column>
			<el-table-column prop="deptcontactno" label="电话" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isenable == '0' ? true : false">
						<i :class="scope.row.isenable == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isenable == '0' ? true : false" title="编辑">
						<i :class="scope.row.isenable == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isenable == "0" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isenable == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<!-- <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.isenable == '0' ? true : false">
                        <i :class="scope.row.isenable == '0' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
                    </el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">部门信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>部门:</dt>
							<dd>{{ deptData.deptname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>代码:</dt>
							<dd>{{ deptData.deptcode == undefined ? '暂无' : deptData.deptcode }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>名称缩写:</dt>
							<dd>{{ deptData.deptshortname == undefined ? '暂无' : deptData.deptshortname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>负责人:</dt>
							<dd>{{ deptData.deptmanagername == undefined ? '暂无' : deptData.deptmanagername }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ deptData.deptaddress == undefined ? '暂无' : deptData.deptaddress }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>电话:</dt>
							<dd>{{ deptData.deptcontactno == undefined ? '暂无' : deptData.deptcontactno}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>父级部门:</dt>
							<dd>{{ deptData.parentname == undefined ? '暂无' : deptData.parentname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd>{{ deptData.corpname == undefined ? '暂无' : deptData.corpname }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{deptData.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(deptData.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{deptData.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(deptData.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="所属公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="部门名称" prop="deptname" ref="deptname">
							<el-input v-model="editForm.deptname" placeholder="请输入部门名称" auto-complete="off" @blur="checkout('deptname',editForm.deptname,0)"></el-input>
						</el-form-item>
						<el-form-item label="部门名称缩写" prop="deptshortname" ref="deptshortname">
							<el-input v-model="editForm.deptshortname" placeholder="请输入部门名称缩写" auto-complete="off" @blur="checkout('deptshortname',editForm.deptshortname,1)"></el-input>
						</el-form-item>
						<el-form-item label="负责人" prop="deptmanagername">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.deptmanagername" :fetch-suggestions="querySearchName" placeholder="请输入负责人" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="部门电话" prop="deptcontactno">
							<el-input v-model="editForm.deptcontactno" placeholder="请输入部门电话" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="editForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<!-- 判断是否有父级部门 -->
						<el-form-item label="父级部门" prop="hasParent">
							<el-switch v-model="editForm.hasParent" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有" inactive-value="0" inactive-text="无">
							</el-switch>
						</el-form-item>
						<el-form-item>
							<el-select v-show="editForm.hasParent == '1'" v-model="editForm.parentname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择父级部门" clearable>
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
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

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="所属公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="部门名称" prop="deptname" ref="deptname">
							<el-input v-model="addForm.deptname" placeholder="请输入部门名称" auto-complete="off" @blur="checkout('deptname',addForm.deptname,0)"></el-input>
						</el-form-item>
						<el-form-item label="部门名称缩写" prop="deptshortname" ref="deptshortname">
							<el-input v-model="addForm.deptshortname" placeholder="请输入部门名称缩写" auto-complete="off" @blur="checkout('deptshortname',addForm.deptshortname,1)"></el-input>
						</el-form-item>
						<el-form-item label="负责人" prop="deptmanagername">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.deptmanagername" :fetch-suggestions="querySearchName" placeholder="请输入负责人" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="部门电话" prop="deptcontactno">
							<el-input v-model="addForm.deptcontactno" placeholder="请输入部门电话" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="addForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<!-- 判断是否有父级部门 -->
						<el-form-item label="父级部门" prop="hasParent">
							<el-switch v-model="addForm.hasParent" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有" inactive-value="0" inactive-text="无">
							</el-switch>
						</el-form-item>
						<el-form-item>
							<el-select v-show="addForm.hasParent == '1'" v-model="addForm.parentname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择父级部门" clearable>
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
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
	import { getDepartmentInfoList, addDepartmentInfo, modifyDepartmentInfo, removeDepartmentInfo, getCustomerInfoList, getDeptManagerInfoList, getAllCorpList, getSelectListDept, getAllDeptList, getNamebyUserid, getCheckoutOfDeptInfo } from '../../api/api';
	export default {
		name:'DepartmentInfo',
		props: ['windowOutHeight'],
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
				fmtdata: util,
				filters: {
					isenable: '1',
					domSearch: [{
						select: ['deptname'],
						content: ''
					}] //查询框
				},
				prOptions: util.initProvince(),
				customers: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData: [],
				listLoading: false,
				deptlist: [],
				createname: "",
				updatename: "",
				deptLoading: false,
				deptData: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: [], //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					deptname: [{
							required: true,
							message: '请输入部门名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					deptmanagername: [{
							required: true,
							message: '请输入负责人',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					deptcontactno: [{
							required: true,
							message: '请输入部门电话',
							trigger: 'blur'
						},
						{
							validator: checkAllMobile,
							trigger: 'blur'
						}
					],
					corpname: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					id: 0,
					deptcode: '',
					deptname: '',
					deptshortname: '',
					parentdeptcode: '',
					parentname: '',
					corpid: '',
					corpname: '',
					employeename: '',
					deptmanagername: '',
					deptmanagerid: '',
					showorder: 0,
					isenable: 1,
					deptaddress: '',
					addressAll: '',
					deptcontactno: '',
					radio: '',
				},
				editFormId: {
					deptcode: '',
					deptname: '',
					parentdeptcode: '',
					parentname: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					deptname: [{
							required: true,
							message: '请输入部门名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					deptmanagername: [{
							required: true,
							message: '请输入负责人',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					deptcontactno: [{
							required: true,
							message: '请输入部门电话',
							trigger: 'blur'
						},
						{
							validator: checkAllMobile,
							trigger: 'blur'
						}
					],
					corpname: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					corpid: '',
					deptcode: '',
					deptname: '',
					deptshortname: '',
					employeename: '',
					parentdeptcode: '',
					parentname: '',
					corpname: '',
					deptmanagername: '',
					deptmanagerid: '',
					showorder: 0,
					isenable: 1,
					deptaddress: '',
					addressAll: '',
					deptcontactno: '',
					radio: '',
					hasParent: '',
				},
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput[index] == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化

				let corpID;
				if(this.addFormVisible) { //当新增打开时
					corpID = this.addForm.corpid;
				} else if(this.editFormVisible) { //当编辑打开时
					corpID = this.editForm.corpid;
				}
				let paras = {
					para: p,
					value: v,
					corpid: corpID,
				}
				getCheckoutOfDeptInfo(paras).then((res) => {
					let errorInput = res.data.data.param; //保存验证失败的字段
					if(!res.data.data.result) {
						this.$message({
							message: '信息输入重复！',
							type: 'warning'
						});
						this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
						this.checkoutDataF[index] = false
					} else {
						this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
						this.checkoutDataF[index] = true
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
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
				console.log(para);
				// getSortList(para).then((res) => {});
			},
			//详情查看
			formDetailHandle(deptid) {
				this.createname = "";
				this.updatename = "";
				this.formDialogTableVisible = true;
				this.deptData = '';
				let para = {
					id: deptid,
				}
				nanobar.go(70);
				getDepartmentInfoList(para).then((res) => {
					this.deptData = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.deptData.createby == null ? 0 : this.deptData.createby,
						updateby: this.deptData.updateby == null ? 0 : this.deptData.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
				});

			},
			// 有效无效开关
			showData(i) {
				this.filters.isenable = i;
				this.handleQuery();
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
			//有效无效转换
			isenableFomat(row, col) {
				return row.isenable == 1 ? '是' : row.isenable != undefined ? '否' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isenable == 0) {
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
						isenable: row.isenable == 0 ? 1 : 0,
					}
					modifyDepartmentInfo(para).then((res) => {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						row.isenable = para.isenable;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},
			// 负责人——搜索下拉
			querySearchName(queryString, cb) {
				let para = {
						employeename: queryString
					},
					magNameArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						magNameArray.push({
							value: item.employeename,
							id: item.id
						});
					});
					cb(magNameArray);
				});
			},
			handleSelectName(item) {
				this.editForm.employeename = item.value;
				this.editForm.deptmanagerid = item.id;
				this.addForm.employeename = item.value;
				this.addForm.deptmanagerid = item.id;
			},
			// 部门名称——下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				getAllDeptList().then((res) => {
					this.deptlist = res.data.data.records;
					this.deptLoading = false;
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
					isenable: this.filters.isenable,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListDept(para).then((res) => {
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
					isenable: this.filters.isenable,
				};
				this.listLoading = true;
				getDepartmentInfoList(para).then((res) => {
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
						ids: row.id,
						method: "delete"
					};
					// let para = new FormData();
					// para.append('ids',row.id);
					// para.append('method','delete');

					removeDepartmentInfo(para).then((res) => {
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
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisible = true;
				// 地址
				var addrVal = row.deptaddress;
				if(addrVal != null) {
					var addrArr = addrVal.split(",");
				}
				this.editForm = {
					id: row.id,
					deptcode: row.deptcode,
					deptname: row.deptname,
					deptshortname: row.deptshortname,
					parentname: row.parentname,
					corpid: row.corpid,
					corpname: row.corpname,
					deptmanagername: row.deptmanagername,
					showorder: row.showorder,
					isenable: row.isenable,
					deptcontactno: row.deptcontactno,
					addressAll: addrArr, //区域
					hasParent: row.parentname != null ? '1' : '0',
				};
				this.editFormId = {
					parentdeptcode: row.parentdeptcode,
					parentname: row.parentname,
				}
				this.thisInput.push(this.editForm.deptname, this.editForm.deptshortname); //将当前验证的字段 已获得的值存入

			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					deptcode: '',
					deptname: '',
					deptaddress: '',
					addressAll: ["四川", "成都", "高新区"],
					deptcontactno: '',
					deptshortname: '',
					parentdeptcode: '',
					parentname: '',
					corpid: '',
					corpname: '',
					deptmanagername: '',
					showorder: 0,
					isenable: 1,
					hasParent: '0'
				};
				// this.GetCustomers();
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						if(this.editForm.addressAll == undefined) { //地址未选时
							this.editLoading = false;
							this.$message({
								message: '请选择地址',
								type: 'warning'
							});
							return;
						}
						let para = {
							id: this.editForm.id,
							deptcode: this.editForm.deptcode,
							deptname: this.editForm.deptname,
							deptshortname: this.editForm.deptshortname,
							// deptaddress:this.editForm.deptaddress,
							deptaddress: this.editForm.addressAll.toString(),
							deptcontactno: this.editForm.deptcontactno,
							parentdeptcode: this.editForm.parentname,
							corpid: this.editForm.corpid,
							corpname: this.editForm.corpname,
							deptmanagerid: this.editForm.deptmanagerid,
							deptmanagername: this.editForm.deptmanagername,
							showorder: this.editForm.showorder,
							isenable: parseInt(this.editForm.isenable),
						}

						if(this.editFormId.parentname == this.editForm.parentname) {
							para.parentdeptcode = this.editFormId.parentdeptcode;
						} else {
							para.parentdeptcode = this.editForm.parentname;
						}

						modifyDepartmentInfo(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuerySelect();
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							deptcode: this.addForm.deptcode,
							deptname: this.addForm.deptname,
							deptshortname: this.addForm.deptshortname,
							// deptaddress:this.addForm.deptaddress,
							deptaddress: this.addForm.addressAll.toString(),
							deptcontactno: this.addForm.deptcontactno,
							parentdeptcode: this.addForm.parentname,
							corpid: this.addForm.corpid,
							corpname: this.addForm.corpname,
							deptmanagerid: this.addForm.deptmanagerid,
							deptmanagername: this.addForm.deptmanagername,
							showorder: this.addForm.showorder,
							isenable: parseInt(this.addForm.isenable),
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addDepartmentInfo(para).then((res) => {
								console.log(para.deptmanagerid)
								this.addLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							});
						} else {
							this.addLoading = false;
							this.$message({
								message: '标红信息已存在！',
								type: 'warning'
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
					removeDepartmentInfo(para).then((res) => {
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
		activated() {
			this.handleQuery();
		}
	}
</script>