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
									<el-option label="开票公司名称" value="corpname"></el-option>
									<el-option label="地址" value="address"></el-option>
									<el-option label="联系人" value="contactperson"></el-option>
									<el-option label="联系电话" value="mobile"></el-option>
									<el-option label="地址类型" value="addresstype"></el-option>
									<el-option label="邮编" value="postcode"></el-option>
									<el-option label="默认地址" value="defaultflag"></el-option>
									<el-option label="备注" value="remarks"></el-option>
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
										<el-option label="开票公司名称" value="corpname"></el-option>
										<el-option label="地址" value="address"></el-option>
										<el-option label="联系人" value="contactperson"></el-option>
										<el-option label="联系电话" value="mobile"></el-option>
										<el-option label="地址类型" value="addresstype"></el-option>
										<el-option label="邮编" value="postcode"></el-option>
										<el-option label="默认地址" value="defaultflag"></el-option>
										<el-option label="备注" value="remarks"></el-option>
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
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="empid" label="员工ID" width="70" align="center">
			</el-table-column>
			<el-table-column prop="employeename" label="员工姓名" width="80" align="center">
			</el-table-column>
			<el-table-column prop="corpname" label="开票公司名称" align="center">
			</el-table-column>
			<el-table-column prop="address" label="详细地址" align="center">
			</el-table-column>
			<el-table-column prop="contactperson" label="联系人" align="center" width="80">
			</el-table-column>
			<el-table-column prop="mobile" label="联系电话" align="center" width="100">
			</el-table-column>
			<el-table-column prop="addresstype" label="地址类型" :formatter="addressFormat" width="80" align="center">
			</el-table-column>
			<el-table-column prop="postcode" label="邮编" width="70" align="center">
			</el-table-column>
			<el-table-column prop="defaultflag" label="默认地址" width="80" align="center" :formatter="defaultFormat">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" width="80" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<!-- <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
                        <i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
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
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">地址信息</span>
					</el-col>
					<el-col :span="18">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工ID:</dt>
							<dd>{{ addrThisList.empid }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工:</dt>
							<dd>{{ addrThisList.employeename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>开票公司名称:</dt>
							<dd>{{ addrThisList.corpname == undefined ? '暂无' : addrThisList.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ addrThisList.address == undefined ? '暂无' : addrThisList.address }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址类型:</dt>
							<dd>{{ addrThisList.addresstype == 'C' ? '公司' : addrThisList.addresstype == 'H' ? '家' : addrThisList.addresstype == 'O' ? '其他' : '暂无' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>联系人:</dt>
							<dd>{{ addrThisList.contactperson == undefined ? '暂无' : addrThisList.contactperson }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>联系方式:</dt>
							<dd>{{ addrThisList.mobile == undefined ? '暂无' : addrThisList.mobile }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>邮编:</dt>
							<dd>{{ addrThisList.postcode == undefined ? '暂无' : addrThisList.postcode }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否默认地址:</dt>
							<dd>{{ addrThisList.defaultflag == "Y" ? '默认' : '非默认' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ addrThisList.remarks == undefined ? '暂无' : addrThisList.remarks }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="员工姓名" prop="employeename">
							<el-select v-model="editForm.employeename" filterable placeholder="请选择员工" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
							<!-- <el-autocomplete class="inline-input searchInput" v-model="editForm.employeename" :fetch-suggestions="querySearchName" placeholder="请选择员工" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete> -->
						</el-form-item>
						<el-form-item label="地址类型" prop="addresstype">
							<el-select v-model="editForm.addresstype" filterable placeholder="请选择地址类型" clearable>
								<el-option v-for="item in addressOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="省/市/区" class="mt10" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="editForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailaddress">
							<el-input v-model="editForm.detailaddress" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="开票公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入开票公司" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人" prop="contactperson">
							<el-autocomplete class="inline-input searchInput" v-model="editForm.contactperson" :fetch-suggestions="querySearchNameContact" placeholder="请选择联系人" :trigger-on-focus="false" @select="handleSelectNameContact"></el-autocomplete>
						</el-form-item>
						<el-form-item label="联系电话" prop="mobile">
							<el-input v-model="editForm.mobile" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮编" prop="postcode">
							<el-input v-model="editForm.postcode" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remarks">
							<el-input v-model="editForm.remarks" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="默认地址" prop="defaultflag">
							<el-radio-group v-model="editForm.defaultflag">
								<el-radio-button label="Y">默认</el-radio-button>
								<el-radio-button label="N">非默认</el-radio-button>
							</el-radio-group>
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
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="员工姓名" prop="empid">
							<el-select v-model="addForm.empid" filterable placeholder="请选择员工" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item.id">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="地址类型" prop="addresstype">
							<el-select v-model="addForm.addresstype" filterable placeholder="请选择地址类型" clearable>
								<el-option v-for="item in addressOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="省/市/区" class="mt10" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="addForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="detailaddress">
							<el-input v-model="addForm.detailaddress" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="开票公司" prop="corpname">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入开票公司" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系人" prop="contactperson">
							<el-autocomplete class="inline-input searchInput" v-model="addForm.contactperson" :fetch-suggestions="querySearchNameContact" placeholder="请选择联系人" :trigger-on-focus="false" @select="handleSelectNameContact"></el-autocomplete>
						</el-form-item>
						<el-form-item label="联系电话" prop="mobile">
							<el-input v-model="addForm.mobile" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮编" prop="postcode">
							<el-input v-model="addForm.postcode" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remarks">
							<el-input v-model="addForm.remarks" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="默认地址" prop="defaultflag">
							<el-radio-group v-model="addForm.defaultflag">
								<el-radio-button label="Y">默认</el-radio-button>
								<el-radio-button label="N">非默认</el-radio-button>
							</el-radio-group>
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
	import { getDeliveryAddressList, addDeliveryAddress, modifyDeliveryAddress, removeDeliveryAddress, getCustomerInfoList, getCorpList, getDeptManagerInfoList, getAllCorpList, getSelectListAddr } from '../../api/api';

	export default {
		name:'DeliveryAddress',
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
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['employeename'],
						content: ''
					}], //查询框
					isdelete: '0',
				},
				listData: [],
				prOptions: util.initProvince(),
				empLoading:false,
				empOptions:[],//员工列表
				addrThisList: [],
				formDialogTableVisible: false,
				customers: [],
				addressOptions: [{
					value: 'C',
					label: '公司地址'
				}, {
					value: 'H',
					label: '家庭地址'
				}, {
					value: 'O',
					label: '其他'
				}],
				value: '',
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				corplist: [], //所属客户
				corpLoading: false, //
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					employeename: [{
						required: true,
						message: '请输入员工',
						trigger: 'blur'
					}, ],
					contactperson: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}, ],
					mobile: [{
							required: true,
							message: '请输入联系人电话',
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
					id: '',
					empid: '',
					employeename: '',
					corpname: '',
					address: '',
					addressAll: '',
					province: '',
					city: '',
					district: '',
					detailaddress: '',
					contactperson: '',
					mobile: '',
					postcode: '',
					addresstype: '',
					remarks: '',
					defaultflag: '',
				},
				editFormId: {
					corpid: '',
					corpname: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					employeename: [{
						required: true,
						message: '请输入员工',
						trigger: 'blur'
					}, ],
					contactperson: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}, ],
					mobile: [{
							required: true,
							message: '请输入联系人电话',
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
					empid: '',
					employeename: '',
					corpname: '',
					address: '',
					addressAll: ["四川", "成都", "高新区"],
					province: '',
					city: '',
					district: '',
					detailaddress: '',
					contactperson: '',
					mobile: '',
					postcode: '',
					addresstype: '',
					remarks: '',
					defaultflag: 'Y',
					isdelete: 0,
				},
			}
		},
		methods: {
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(addrid) {
				this.formDialogTableVisible = true;
				this.addrThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: addrid
				}
				nanobar.go(70);
				getDeliveryAddressList(para).then((res) => {
					this.addrThisList = res.data.data.records[0];
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
				this.filters.isdelete = i;
				this.handleQuery();
			},
			//地址类型显示转换
			addressFormat: function(row, col) {
				return row.addresstype == 'C' ? '公司' : row.addresstype == 'H' ? '家庭' : '其他';
			},
			// 公司——搜索下拉
			querySearchCorpName(queryString, cb) {
				let para = {
						corpname: queryString
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
			// 员工——搜索下拉
			empChange(r) {
				if(!r || this.empOptions.length > 0) return;
				this.empLoading = true;
				getDeptManagerInfoList().then((res) => {
					this.empOptions = res.data.data.records;
					this.empLoading = false;
				});
			},
			
			// 联系人——搜索下拉
			querySearchNameContact(queryString, cb) {
				let para = {
						employeename: queryString
					},
					ContactNameArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						ContactNameArray.push({
							value: item.employeename,
							id: item.id,
							mobile: item.mobile
						});
					});
					cb(ContactNameArray);
				});
			},
			handleSelectNameContact(item) {
				this.editForm.contactperson = item.value;
				this.editForm.mobile = item.mobile;
				this.addForm.contactperson = item.value;
				this.addForm.mobile = item.mobile;
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
						id: row.id,
						isdelete: row.isdelete == 0 ? 1 : 0,
					}
					modifyDeliveryAddress(para).then((res) => {
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

			// 默认地址
			defaultFormat: function(row, col) {
				return row.defaultflag == "Y" ? '默认' : '非默认';
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
				getSelectListAddr(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getDeliveryAddressList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},

			// //获取客户列表
			// GetCustomers() {
			//     let para = {};
			//     getCustomerInfoList(para).then((res) => {
			//         this.customers = res.data.data.records;
			//     });
			// },
			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeDeliveryAddress(para).then((res) => {
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
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.id,
					employeename: row.employeename,
					corpname: row.corpname,
					address: row.address,
					addressAll: [row.province, row.city, row.district],
					detailaddress: row.detailaddress,
					contactperson: row.contactperson,
					mobile: row.mobile,
					addresstype: row.addresstype,
					postcode: row.postcode,
					remarks: row.remarks,
					defaultflag: row.defaultflag,
					// province:row.province,
					// city:row.city,
					// district:row.district,
				}
				// this.GetCustomers();
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					empid: '',
					employeename: '',
					corpname: '',
					address: '',
					addressAll: ["四川", "成都", "高新区"],
					province: '',
					city: '',
					district: '',
					detailaddress: '',
					contactperson: '',
					mobile: '',
					addresstype: '',
					postcode: '',
					remarks: '',
					defaultflag: 'Y',
					isdelete: 0,
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						//NProgress.start();
						let para = {
							id: this.editForm.id,
							empid: this.editForm.empid,
							empid: this.editForm.employeename,
							corpname: this.editForm.corpname,
							address: this.editForm.addressAll,
							province: this.editForm.addressAll[0],
							city: this.editForm.addressAll[1],
							district: this.editForm.addressAll[2],
							detailaddress: this.editForm.detailaddress,
							contactperson: this.editForm.contactperson,
							mobile: this.editForm.mobile,
							postcode: this.editForm.postcode,
							addresstype: this.editForm.addresstype,
							remarks: this.editForm.remarks,
							defaultflag: this.editForm.defaultflag,
						}
						modifyDeliveryAddress(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuerySelect();
							// this.handleQuery();
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						//NProgress.start();
						let para = {
							empid: this.addForm.empid,
							employeename: this.addForm.employeename,
							corpname: this.addForm.corpname,
							address: this.addForm.addressAll,
							province: this.addForm.addressAll[0],
							city: this.addForm.addressAll[1],
							district: this.addForm.addressAll[2],
							detailaddress: this.addForm.detailaddress,
							contactperson: this.addForm.contactperson,
							mobile: this.addForm.mobile,
							postcode: this.addForm.postcode,
							addresstype: this.addForm.addresstype,
							remarks: this.addForm.remarks,
							defaultflag: this.addForm.defaultflag,
							isdelete: this.addForm.isdelete,
						}
						if (para.empid == '') {
							this.$message({
								message: '当前员工无效！请选择正确的员工',
								type: 'error'
							});
							this.addLoading = false;
							return;
						}
						addDeliveryAddress(para).then((res) => {
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
					removeDeliveryAddress(para).then((res) => {
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
		activated() {
			this.handleQuery();
		}
	}
</script>