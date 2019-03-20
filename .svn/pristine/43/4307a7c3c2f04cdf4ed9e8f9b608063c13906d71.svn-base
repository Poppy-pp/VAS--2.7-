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
									<el-option label="组名" value="groupname"></el-option>
									<el-option label="组类型" value="grouptype"></el-option>
									<el-option label="组长" value="leadername"></el-option>
									<el-option label="组长电话" value="mobile"></el-option>
									<el-option label="组人数" value="croupnum"></el-option>
									<el-option label="所属部门" value="deptname"></el-option>
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
										<el-option label="组名" value="groupname"></el-option>
										<el-option label="组类型" value="grouptype"></el-option>
										<el-option label="组长" value="leadername"></el-option>
										<el-option label="组长电话" value="mobile"></el-option>
										<el-option label="组人数" value="croupnum"></el-option>
										<el-option label="所属部门" value="deptname"></el-option>
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
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="groups" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="groupname" label="组名" align="center" width="110" >
			</el-table-column>
			<el-table-column prop="grouptype" label="类型" :formatter="formattype" align="center" >
			</el-table-column>
			<el-table-column prop="leadername" label="组长" align="center" >
			</el-table-column>
			<el-table-column prop="mobile" label="组长电话" align="center" >
			</el-table-column>
			<el-table-column prop="croupnum" label="组人数" align="center" >
				<template scope="scope">
					<el-popover ref="popover4" placement="right" width="400" @show="showNumData(scope.row.ID)" trigger="click">
						<el-table border :data="groupNumData" max-height="400">
							<el-table-column type="index" width="20" align="center" label="#">
							</el-table-column>
							<el-table-column prop="employeename" label="组员姓名" align="center"></el-table-column>
						</el-table>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover4>
						<span class="comnum">{{scope.row.croupnum}}</span>
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="deptname" label="所属部门" align="center" >
			</el-table-column>
			<el-table-column prop="corpname" label="所属公司" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
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
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">分组信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组名:</dt>
							<dd>{{ groupThisList.groupname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组代码:</dt>
							<dd>{{ groupThisList.groupcode == undefined ? '暂无' : groupThisList.groupcode }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组长:</dt>
							<dd>{{ groupThisList.leadername == undefined ? '暂无' : groupThisList.leadername}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组长电话:</dt>
							<dd>{{ groupThisList.mobile == undefined ? '暂无' : groupThisList.mobile}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组类型:</dt>
							<dd>{{ !groupThisList.grouptype ?'未知':groupThisList.grouptype}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属部门:</dt>
							<dd>{{ groupThisList.deptname == undefined ? '暂无' : groupThisList.deptname}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd>{{ groupThisList.corpname == undefined ? '暂无' : groupThisList.corpname}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>组人数:</dt>
							<dd>{{ groupThisList.croupnum == undefined ? '暂无' : groupThisList.croupnum }}</dd>
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
							<dd>{{groupThisList.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(groupThisList.createdate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{groupThisList.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(groupThisList.updatedate), 'yyyy-MM-dd') }}</dd>
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
						<el-form-item label="组名" prop="groupname" ref="groupname">
							<el-input v-model="editForm.groupname" @blur="checkout('groupname',editForm.groupname,0)"></el-input>
						</el-form-item>
						<el-form-item label="组类型" prop="grouptype">
							<el-select v-model="editForm.grouptype" :loading="grouptypeLoading" @visible-change="grouptypeChange" filterable placeholder="组类型" clearable>
								<el-option v-for="item in grouptypeOptions" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="组长姓名" prop="leadername">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.leadername" :fetch-suggestions="querySearchName" placeholder="请输入组长姓名" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="组长电话" prop="mobile">
							<el-input v-model="editForm.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属部门" prop="deptname">
							<el-select v-model="editForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable remote :remote-method="deptChangeSelect">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="编辑员工" prop="tempEmps">
							<el-select collapse-tags v-model="editForm.tempEmps" multiple remote :remote-method="editRemoteMethod" @visible-change="editEmpChange" placeholder="请选择" :loading="editEmpLoading" filterable clearable value-key="employeename">
								<el-option v-for="item in editEmpOptions" :key="item.employeename" :label="item.employeename" :value="item">
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
						<el-form-item label="组名" prop="groupname" ref="groupname">
							<el-input v-model="addForm.groupname" @blur="checkout('groupname',addForm.groupname,0)"></el-input>
						</el-form-item>

						<el-form-item label="组类型" prop="grouptype">
							<el-select v-model="addForm.grouptype" :loading="grouptypeLoading" @visible-change="grouptypeChange" filterable placeholder="组类型" clearable>
								<el-option v-for="item in grouptypeOptions" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="组长姓名" prop="leadername">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.leadername" :fetch-suggestions="querySearchName" placeholder="请输入组长姓名" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
						</el-form-item>
						<el-form-item label="组长电话" prop="mobile">
							<el-input v-model="addForm.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属部门" prop="deptname">
							<el-select v-model="addForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable remote :remote-method="deptChangeSelect">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item  label="所属公司" prop="corpname">
                             <el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable>
                                <el-option
                                  v-for="item in corplist"
                                  :key="item.corpname"
                                  :label="item.corpname"
                                  :value="item.id">
                                </el-option>
                              </el-select>
                          </el-form-item> -->
						<el-form-item label="新增员工" prop="emps">
							<el-select collapse-tags v-model="addForm.emps" multiple placeholder="请选择" remote :remote-method="remoteMethod" @visible-change="empChange" :loading="empLoading" filterable clearable>
								<el-option v-for="item in empOptions" :key="item.employeename" :label="item.employeename" :value="item.id">
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
	import { getGroupInfoList, addGroupInfo, modifyGroupInfo, removeGroupInfo, getAllDeptList, getDeptManagerInfoList, getEmpsGroupList, getEmpsList, getSelectListGroup, getCheckoutOfGroupInfo, getNamebyUserid, SetStateGroupInfo, groupClass } from '../../api/api';
	export default {
		name:'GroupInfo',
		props: ['windowOutHeight'],
		data() {
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
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['groupname'],
						content: ''
					}], //查询框
					isdelete: '0'
				},
				pickerOptions: { //日期
				},
				grouptypeOptions: [],
				value: '',
				formDialogTableVisible: false,
				corplist: [], //所属公司
				corpLoading: false, //
				groups: [],
				groupThisList: [],
				empOptions: [], //员工分组列表
				groupNumData: [], //组人数详情列表
				empLoading: false,
				total: 0,
				currentPage: 1,
				pageSize: 15,
				createname: "",
				updatename: "",
				listLoading: false,
				deptlist: [], //员工所属部门列表
				deptLoading: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: '', //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editEmpLoading: false,
				editFormRules: {
					groupname: [{
							required: true,
							message: '请输入组名',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					leadername: [{
						required: true,
						message: '请输入组长姓名',
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '请输入组长电话',
							trigger: 'blur'
						},
						{
							validator: checkAllMobile,
							trigger: 'blur'
						}
					],
				},
				//编辑界面数据
				editForm: {
					ID: '',
					groupleaderid: '',
					groupcode: '',
					croupnum: '',
					groupname: '',
					grouptype: '',
					leadername: '',
					employeename: '',
					deptname: '',
					corpname: '',
					mobile: '',
					emps: [],
					tempEmps: []
				},
				editFormId: {
					deptid: '',
					corpid: '',
				},
				editEmpOptions: [],
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					groupname: [{
							required: true,
							message: '请输入组名',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					leadername: [{
						required: true,
						message: '请输入组长姓名',
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '请输入组长电话',
							trigger: 'blur'
						},
						{
							validator: checkAllMobile,
							trigger: 'blur'
						}
					],
				},
				//新增界面数据
				addForm: {
					groupleaderid: '',
					groupcode: '',
					groupname: '',
					grouptype: '',
					croupnum: '',
					leadername: '',
					employeename: '',
					deptname: '',
					corpname: '',
					mobile: '',
					isdelete: 0,
					emps: []
				},
				grouptypeLoading: false,
				curGroupUser: [], //编辑页当前已选择的组员
			}
		},
		methods: {
			//分组类型查询
			grouptypeChange(r) {
				if(!r || this.grouptypeOptions.length > 0) return;
				this.grouptypeLoading = true;
				let para = {
					dictvalue: 'GroupType'
				}
				groupClass(para).then((res) => {
					this.grouptypeOptions = res.data.data;
					this.grouptypeLoading = false;
				});
			},
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfGroupInfo(paras).then((res) => {
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
			//详情查看
			formDetailHandle(groupid) {
				this.createname = "";
				this.updatename = "";
				this.formDialogTableVisible = true;
				this.groupThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: groupid
				}
				nanobar.go(70);
				getGroupInfoList(para).then((res) => {
					this.groupThisList = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.groupThisList.createby == null ? 0 : this.groupThisList.createby,
						updateby: this.groupThisList.updateby == null ? 0 : this.groupThisList.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
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
				this.filters.isdelete = i;
				this.getGroup();
			},
			/*所属公司——下拉*/
			// corpChange(r){
			//     if(!r || this.corplist.length > 0) return;
			//     this.corpLoading = true;
			//     getCorpList().then((res) => {
			//         this.corplist = res.data.data.records;
			//         this.corpLoading = false;
			//     });
			// },
			// 组人数详情列表
			showNumData(id) {
				let para = {
					groupid: id,
				}
				//获取设备信息
				getEmpsList(para).then((res) => {
					this.groupNumData = res.data.data;
				});
			},
			editRemoteMethod(query) {
				let para = {
					isenable: 1,
					showCount: 30,
					employeename: query
				};
				this.editEmpLoading = true;
				getEmpsGroupList(para).then((res) => {
					this.editEmpLoading = false;
					this.editEmpOptions = res.data.data.records;
				});
			},
			editEmpChange(r) {
				if(!r || this.editEmpOptions.length > 0) return;
				this.editEmpLoading = true;
				let para = {
					isenable: 1,
					showCount: 30
				};
				getEmpsGroupList(para).then((res) => {
					this.editEmpOptions = res.data.data.records;
					this.editEmpLoading = false;
				});
			},
			// 新增员工分组
			empChange(r) {
				if(!r || this.empOptions.length > 0) return;
				this.empLoading = true;
				let para = {
					isenable: 1,
					showCount: 30
				};
				getEmpsGroupList(para).then((res) => {
					this.empOptions = res.data.data.records;
					this.empLoading = false;
				});
			},
			remoteMethod(query) {
				let para = {
					isenable: 1,
					showCount: 30,
					employeename: query
				};
				this.empLoading = true;
				getEmpsGroupList(para).then((res) => {
					this.empLoading = false;
					this.empOptions = res.data.data.records;
				});
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.isdelete == 1 ? '否' : row.isdelete != undefined ? '是' : '未知';
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
					SetStateGroupInfo(para).then((res) => {
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
			// 部门——搜索下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				getAllDeptList().then((res) => {
					this.deptlist = res.data.data.records;
					this.deptLoading = false;
				});
			},
			// 部门——搜索下拉
			deptChangeSelect(query) {
				let para = {
					showCount: 30,
					deptname: query,
				}
				getAllDeptList(para).then((res) => {
					this.deptlist = res.data.data.records;
					this.deptLoading = false;
				});
			},
			// 组长——搜索下拉
			querySearchName(queryString, cb) {
				let para = {
						employeename: queryString
					},
					leaderNameArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						leaderNameArray.push({
							value: item.employeename,
							id: item.id,
							leadermobile: item.mobile
						});
					});
					cb(leaderNameArray);
				});
			},
			handleSelectName(item) {
				this.editForm.employeename = item.value;
				this.editForm.groupleaderid = item.id;
				this.editForm.mobile = item.leadermobile;
				this.addForm.employeename = item.value;
				this.addForm.groupleaderid = item.id;
				this.addForm.mobile = item.leadermobile;
			},
			//分组类型显示转换
			formattype(row, column) {
				return !row.grouptype ? '未知' : row.grouptype;
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.getGroup();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getGroup();
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
				getSelectListGroup(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.groups = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取用户列表
			getGroup() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getGroupInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.groups = res.data.data.records;
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
					removeGroupInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getGroup();
					});
				}).catch(() => {
					s

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisible = true;
				this.curGroupUser = row.emps; //当前已选择的组员
				this.editForm = {
					id: row.ID,
					groupcode: row.groupcode,
					groupname: row.groupname,
					deptname: row.deptname,
					corpname: row.corpname,
					croupnum: row.croupnum,
					grouptype: row.grouptype,
					mobile: row.mobile,
					groupleaderid: row.groupleaderid,
					leadername: row.leadername,
					emps: [],
					tempEmps: [],
				};
				this.editForm.tempEmps = this.curGroupUser;
				this.editEmpOptions = this.curGroupUser;
				this.editFormId = {
					deptid: row.deptid,
					deptname: row.deptname,
					corpid: row.corpid,
					corpname: row.corpname,
				}
				this.thisInput = this.editForm.groupname; //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					groupcode: '',
					groupname: '',
					grouptype: '',
					groupleaderid: '',
					mobile: '',
					croupnum: '',
					leadername: '',
					deptname: '',
					corpname: '',
					isdelete: 0,
					emps: []
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						let grouptype = null,
							para,
							reg = /^[A-Za-z]+$/;
						this.editLoading = true;
						if(reg.test(this.editForm.grouptype)) {
							grouptype = this.editForm.grouptype;
						}
						para = {
							id: this.editForm.id,
							groupcode: this.editForm.groupcode,
							groupname: this.editForm.groupname,
							deptid: this.editForm.deptname,
							corpid: this.editForm.corpname,
							mobile: this.editForm.mobile,
							grouptype: grouptype,
							groupleaderid: this.editForm.groupleaderid,
							leadername: this.editForm.leadername,
							// emps:this.editForm.tempEmps
							emps: [],
						}
						if(this.editFormId.deptname == this.editForm.deptname) {
							para.deptid = this.editFormId.deptid;
						} else {
							para.deptid = this.editForm.deptname;
						}
						var empsIds = new Array();
						this.editForm.tempEmps.forEach(function(item, index) {
							empsIds.push(item.id);
						});
						para.emps = empsIds;

						modifyGroupInfo(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getGroup();
							}
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
							groupcode: this.addForm.groupcode,
							groupname: this.addForm.groupname,
							deptid: this.addForm.deptname,
							corpid: this.addForm.corpname,
							mobile: this.addForm.mobile,
							grouptype: this.addForm.grouptype,
							groupleaderid: this.addForm.groupleaderid,
							leadername: this.addForm.leadername,
							emps: this.addForm.emps,
							isdelete: this.addForm.isdelete,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addGroupInfo(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getGroup();
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
					removeGroupInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getGroup();
					});
				}).catch(() => {

				});
			}
		},
		activated() {
			this.getGroup();
		}

	}
</script>