<template>
	<section class="tab_content-wrapper">
		<section class="layout">
			<div>
				<el-steps :space="190" process-status="finish" direction="vertical" style="margin: 30px 0 0 50px;" :active="active" finish-status="success">
					<el-step title="账号"> </el-step>
					<el-step title="库房"></el-step>
					<el-step title="地址"></el-step>
					<el-step title="权限"></el-step>
					<el-step title="完成"></el-step>
				</el-steps>
			</div>

			<div style="width:80%;">
				<!-- 步骤一： -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-show="this.active == 0" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">新建员工账号</span>
						</el-col>
						<el-row :gutter="80">
							<el-col :span="12">
								<el-form-item label="员工姓名" prop="employeename" ref="employeename">
									<el-input v-model="addForm.employeename" placeholder="请输入员工姓名" auto-complete="off" @blur="checkout('employeename',addForm.employeename,1)"></el-input>
								</el-form-item>
								<el-form-item label="手机号码" prop="mobile" ref="mobile">
									<el-input v-model="addForm.mobile" placeholder="请输入手机号作为登陆账号" auto-complete="off" @blur="checkout('mobile',addForm.mobile,0)"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="gender">
									<el-radio-group v-model="addForm.gender">
										<el-radio class="radio" label="M">男</el-radio>
										<el-radio class="radio" label="F">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="类型" prop="employeetypename">
									<el-select v-model="addForm.employeetypename" @visible-change="empChange" :loading="etLoading" filterable placeholder="请选择员工类型" clearable>
										<el-option v-for="item in emptype" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="员工编号" prop="employeecode">
									<el-input v-model="addForm.employeecode" placeholder="请输入员工编号" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="员工QQ" prop="qq">
									<el-input v-model="addForm.qq" placeholder="请输入员工QQ" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="员工微信" prop="wechatid">
									<el-input v-model="addForm.wechatid" placeholder="请输入员工微信" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="所属公司" prop="corpname">
									<el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable @change="sendCorpIdData">
										<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属部门" prop="deptname">
									<el-select v-model="addForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable @change="sendDeptIdData">
										<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属分组" prop="groupname">
									<el-select v-model="addForm.groupname" @visible-change="groupChange" :loading="groupLoading" filterable placeholder="请选择所属分组" clearable>
										<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="员工岗位" prop="positionname">
									<el-select v-model="addForm.positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择员工岗位" clearable>
										<el-option v-for="item in poslist" :key="item.positionname" :label="item.positionname" :value="item.ID">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属区域" prop="regionAll">
									<el-cascader placeholder="请选择省/市/区" v-model="addForm.regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
								</el-form-item>
								<el-form-item label="通讯地址" prop="address">
									<el-input v-model="addForm.address" placeholder="请输入通讯地址" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="添加库房" prop="hasstorage">
									<el-radio-group v-model="addForm.hasstorage">
										<el-radio-button label="Y">是</el-radio-button>
										<el-radio-button label="N">否</el-radio-button>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</el-form>

				<!-- 步骤二: -->
				<el-form :model="addForm.storageInfo" label-width="110px" :rules="addFormRules" ref="addForm1" v-show="this.active == 1" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">新增库房</span>
						</el-col>
						<el-row :gutter="80">
							<el-col :span="12">
								<el-form-item label="库房名称" prop="storagename">
									<el-input v-model="addForm.employeename" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="库房级别" prop="storagelevel">
									<el-select v-model="addForm.storageInfo.storagelevel" filterable placeholder="请选择库房级别" clearable>
										<el-option v-for="item in stoOptions" :key="item.label" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="上级库房" prop="parentname" v-show="addForm.storageInfo.storagelevel == '2' || addForm.storageInfo.storagelevel == '3'">
									<el-select v-model="addForm.storageInfo.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择上级库房" clearable remote :remote-method="stoChangeSelect">
										<el-option v-for="item in parlist" :key="item.STORAGENAME" :label="item.STORAGENAME" :value="item.ID">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="库管人员" prop="managername">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.employeename" :fetch-suggestions="querySearchName" placeholder="请选择库管" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
								</el-form-item>
								<el-form-item label="库管电话" prop="managermobile">
									<el-input v-model="addForm.mobile" disabled auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="库管区域" prop="managerregion">
									<el-cascader disabled placeholder="请选择省/市/区" v-model="addForm.regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
								</el-form-item>
								<el-form-item label="库管地址" prop="manageraddress">
									<el-input v-model="addForm.address" disabled auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</el-form>

				<!-- 步骤三：-->
				<el-form :model="addForm.storageInfo.deliveryaddress" label-width="110px" :rules="addFormRules" ref="addForm2" v-show="this.active == 2" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">新增收发货地址</span>
						</el-col>
						<el-row :gutter="80">
							<el-col :span="12">
								<el-form-item label="员工姓名" prop="employeenameAddress">
									<el-input v-model="addForm.employeename" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="地址类型" prop="addresstype">
									<el-select v-model="addForm.storageInfo.deliveryaddress.addresstype" filterable placeholder="请选择地址类型" clearable>
										<el-option v-for="item in addressOptions" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="省/市/区" class="mt10" prop="addressAll">
									<el-cascader placeholder="请选择省/市/区" v-model="addForm.storageInfo.deliveryaddress.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
								</el-form-item>
								<el-form-item label="详细地址" prop="detailaddress">
									<el-input v-model="addForm.storageInfo.deliveryaddress.detailaddress" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="所属公司" prop="corpname">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.storageInfo.deliveryaddress.corpname" :fetch-suggestions="querySearchCorpName" placeholder="请输入所属公司" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="联系人" prop="contactperson">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.storageInfo.deliveryaddress.contactperson" :fetch-suggestions="querySearchNameContact" placeholder="请选择联系人" :trigger-on-focus="false" @select="handleSelectNameContact"></el-autocomplete>
								</el-form-item>
								<el-form-item label="联系电话" prop="mobile">
									<el-input v-model="addForm.storageInfo.deliveryaddress.mobile" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="邮编" prop="postcode">
									<el-input v-model="addForm.storageInfo.deliveryaddress.postcode" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="备注" prop="remarks">
									<el-input v-model="addForm.storageInfo.deliveryaddress.remarks" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="默认地址" prop="defaultflag">
									<el-radio-group v-model="addForm.storageInfo.deliveryaddress.defaultflag">
										<el-radio-button label="Y">默认</el-radio-button>
										<el-radio-button label="N">非默认</el-radio-button>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</el-form>

				<!-- 步骤四： -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm3" v-show="this.active == 3" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">编辑员工角色权限</span>
						</el-col>
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedCities" class="userchedaa" @change="handleCheckedCitiesChange">
							<el-checkbox v-for="city in cities" :label="city.id">{{ city.rolename }}</el-checkbox>
						</el-checkbox-group>
					</el-card>
				</el-form>

				<!-- 步骤五：完成 -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm4" v-show="this.active == 4" class="step-form">
					<div class="center"><i class='iconfont icon-chenggongjierutongguo'></i>入职成功</div>

					<div style="margin-top:10%;width:100%;">
						<el-row style="padding:0 40px;margin-bottom:20px;">
							<el-col :span="24">
								<span class="formTile">员工信息</span>
							</el-col>
							<el-col :span="9">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>员工姓名:</dt>
									<dd>{{ successData.employeename }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>手机号码:</dt>
									<dd>{{ successData.mobile }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>性别:</dt>
									<dd>{{ successData.gender == 'M' ? '男' : '女' }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>类型:</dt>
									<dd>{{ successData.employeetype }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>员工编号:</dt>
									<dd>{{ successData.employeecode }}</dd>
								</dl>
							</el-col>
							<el-col :span="10">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>员工QQ:</dt>
									<dd>{{ successData.qq }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>员工微信:</dt>
									<dd>{{ successData.wechatid }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>所属公司:</dt>
									<dd>{{ successData.corpname }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>所属部门:</dt>
									<dd>{{ successData.deptname }}</dd>
								</dl>
							</el-col>
							<el-col :span="5">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>所属分组:</dt>
									<dd>{{ successData.groupname }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>员工岗位:</dt>
									<dd>{{ successData.positionname }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>所属区域:</dt>
									<dd>{{ successData.region }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>通讯地址:</dt>
									<dd>{{ successData.address }}</dd>
								</dl>
							</el-col>
						</el-row>

						<el-row style="padding:10px 40px;margin-bottom:20px;" v-show="successData.hasstorage == 'Y'">
							<el-col :span="24">
								<span class="formTile">库房信息</span>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库房名称:</dt>
									<dd>{{successData.storagename}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库房级别:</dt>
									<dd>{{successData.storagelevel}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>上级库房:</dt>
									<dd>{{successData.pstoragename}}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库管人员:</dt>
									<dd>{{successData.employeename}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库管电话:</dt>
									<dd>{{successData.mobile}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库管区域:</dt>
									<dd>{{successData.region}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>库管地址:</dt>
									<dd>{{successData.address}}</dd>
								</dl>
							</el-col>
						</el-row>

						<el-row style="padding:10px 40px;margin-bottom:20px;" v-show="successData.hasstorage == 'Y'">
							<el-col :span="24">
								<span class="formTile">地址信息</span>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>地址类型:</dt>
									<dd>{{successData.addresstype}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>省/市/区:</dt>
									<dd>{{successData.address}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>详细地址:</dt>
									<dd>{{successData.detailaddress}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>所属公司:</dt>
									<dd>{{successData.corpname}}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>联系人:</dt>
									<dd>{{successData.contactperson}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>联系电话:</dt>
									<dd>{{successData.mobile}}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>邮编:</dt>
									<dd>{{successData.postcode }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>备注:</dt>
									<dd>{{successData.stoaddressremark }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>默认地址:</dt>
									<dd>{{successData.defaultflag == 'Y' ? '默认' : '非默认' }}</dd>
								</dl>
							</el-col>
						</el-row>

						<el-row style="padding:10px 40px;margin-bottom:20px;">
							<el-col :span="24">
								<span class="formTile">权限信息</span>
							</el-col>
							<el-col :span="24">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>角色权限:</dt>
									<dd>{{successData.rolesinfo}}</dd>
								</dl>
							</el-col>
						</el-row>
					</div>
				</el-form>
			</div>
		</section>

		<el-button-group class="step-btn">
			<!-- 上一步按钮 -->
			<el-button type="primary" @click="prev" icon="el-icon-arrow-left" v-show="active > 0 && active < 4">上一步</el-button>
			<!-- 下一步按钮 -->
			<el-button type="primary" @click="next" v-show="active < 4">{{this.active == 3 ? '保存' : '下一步' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			<!-- 返回按钮 -->
			<el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
		</el-button-group>

		<!-- <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button> -->

	</section>
</template>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getDepartmentInfoList, getGroupInfoList, getAllCorpList, getDeptList, getEmpGroupInfoList, getPositionList, getSysRoleInfoList, getEmpType, getDeptManagerInfoList, getStorageInfoListSelect, addEmpInList, getCheckout } from '../../api/api';

	export default {
		data() {
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入10个以内的汉字和字母'));
				} else {
					callback();
				}
			};
			// 验证手机
			var checkMobile = (rule, value, callback) => {
				var reg = /^1\d{10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('请输入11位的手机号码'));
				} else {
					callback();
				}
			};
			return {
				filters: {
					domSearch: [{
						select: [],
						content: ''
					}], //查询框
					isdelete: '0',
				},
				stoOptions: [{
					value: '1',
					label: '总库'
				}, {
					value: '2',
					label: '地方库'
				}, {
					value: '3',
					label: '个人库'
				}],
				value: '',
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
				checkList: [],
				isIndeterminate: true,
				checkAll: false,
				checkedCities: [],
				cities: [],
				active: 0, //步骤
				prOptions: util.initProvince(),
				listData: [],
				emptype: [], //员工类型列表
				poslist: [], //员工职位列表
				posLoading: false,
				deptlist: [], //员工所属部门列表
				corplist: [], //所属公司
				corpLoading: false, //
				grouplist: [], //所属分组
				groupLoading: false, //
				etLoading: false,
				ptLoading: false,
				deptLoading: false,
				parlist: [], //上级库房列表
				parLoading: false,
				checkNum: 0, //角色权限选择时 已选的数量
				val: [], //选择的角色权限组
				successData: [], //添加成功后返回的数据
				total: 0,
				currentPage: 1,
				listLoading: false,
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				sels: [], //列表选中列
				pageSize: 15,
				addLoading: false,
				addFormRules: {
					employeename: [{
							required: true,
							message: "请输入员工姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: "请输入员工手机号码",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					// storagename: [
					// 	{ required: true, message: '请输入库房名称', trigger: 'blur' },
					// 	{validator: checkName,trigger: 'blur'}
					// ],
					// managername: [
					// 	{ required: true, message: '请输入库管名称', trigger: 'blur' },
					// 	{validator: checkName,trigger: 'blur'}
					// ],
					storagelevel: [{
						required: true,
						message: '请选择库房级别',
						trigger: 'blur'
					}],
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
							validator: checkMobile,
							trigger: 'blur'
						}
					],
				},
				//新增界面数据
				addForm: {
					employeetypename: '',
					employeecode: '',
					employeename: '',
					username: '',
					positionname: '',
					deptname: '',
					groupname: '',
					corpname: '',
					mobile: '',
					stogisneed: '',
					isenable: 1,
					positionid: '',
					deptid: '',
					groupid: '',
					corpid: '',
					gender: 'M',
					region: '',
					address: '',
					wechatid: '',
					qq: '',
					regionAll: [],
					hasstorage: 'Y',
					sysUserRoles: [],

					storageInfo: {
						storagecode: '',
						storagename: '',
						storagelevel: '',
						parentname: '',
						isdelete: 0,
						managerid: '',
						managername: '',
						managermobile: '',
						managerregion: [],
						manageraddress: '',

						deliveryaddress: {
							employeenameAddress: '',
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
					},
				}
			}
		},
		methods: {
			// 选择编辑角色
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

				this.checkNum = checkedCount; //将已选择的数量存入
				this.val = value; //已选权限存入
			},
			// 全选角色
			handleCheckAllChange(event) {
				let arry = [];
				this.cities.forEach(function(obj) {
					arry.push(obj.id);
				});
				this.checkedCities = event ? arry : [];
				this.isIndeterminate = false;
			},

			// 选择所属公司时，匹配部门，传corpid
			sendCorpIdData(val) {
				this.addForm.deptname = ''; //清空所属部门
				this.addForm.groupname = ''; //清空所属分组

				let para = {
					corpid: val
				}
				getDepartmentInfoList(para).then((res) => {
					this.deptlist = res.data.data.records;
				});
			},
			// 选择所属部门时，匹配分组，传deptid
			sendDeptIdData(val) {
				this.addForm.groupname = ''; //清空所属分组
				let para = {
					deptid: val
				}
				getGroupInfoList(para).then((res) => {
					this.grouplist = res.data.data.records;
				});
			},
			/*所属公司——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;
				let para = {
					showCount:1000
				}
				getAllCorpList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			//所属 部门——搜索下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				getDeptList().then((res) => {
					// this.deptlist = res.data.data.records;//未选择公司时不获取部门信息
					this.deptLoading = false;
				});
			},
			/*所属分组——下拉*/
			groupChange(r) {
				if(!r || this.grouplist.length > 0) return;
				this.groupLoading = true;
				getEmpGroupInfoList().then((res) => {
					// this.grouplist = res.data.data.records;//未选择部门时不获取分组信息
					this.groupLoading = false;
				});
			},
			// 员工岗位——搜索下拉
			posChange(r) {
				if(!r || this.poslist.length > 0) return;
				this.posLoading = true;
				getPositionList().then((res) => {
					this.poslist = res.data.data.records;
					this.posLoading = false;
				});
			},
			// 员工类型
			empChange(r) {
				if(!r || this.emptype.length > 0) return;
				this.etLoading = true;
				getEmpType().then((res) => {
					this.emptype = res.data.data.records;
					this.etLoading = false;
				});
			},

			// 库管——搜索下拉
			querySearchName(queryString, cb) {
				let para = {
						notStorageManager: 'y',
						employeename: queryString
					},
					MagNameArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						MagNameArray.push({
							value: item.employeename,
							id: item.id,
							mobile: item.mobile,
							region: item.region,
							address: item.address
						});
					});
					cb(MagNameArray);
				});
			},
			handleSelectName(item) {
				this.addForm.storageInfo.managername = item.value;
				this.addForm.storageInfo.managerid = item.id;
				this.addForm.storageInfo.managermobile = item.mobile;
				this.addForm.storageInfo.managerregion = item.region;
				this.addForm.storageInfo.manageraddress = item.address;

				// this.addForm.storageInfo.managername = this.addForm.employeename;
				// this.addForm.storageInfo.managermobile = this.addForm.mobile;
				// this.addForm.storageInfo.managerregion = this.addForm.regionAll;
				// this.addForm.storageInfo.manageraddress = this.addForm.address;
			},
			// 上级库房——下拉
			parChange(r) {
				if(!r || this.parlist.length > 0) return;
				this.parLoading = true;
				getStorageInfoListSelect().then((res) => {
					this.parlist = res.data.data.records;
					this.parLoading = false;
				});
			},
			stoChangeSelect(query) {
				let para = {
					showCount: 30,
					storagename: query,
				}
				this.parLoading = true;
				getStorageInfoListSelect(para).then((res) => {
					this.parlist = res.data.data.records;
					this.parLoading = false;
				});
			},

			// 地址所属公司——搜索下拉
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
				this.addForm.storageInfo.deliveryaddress.corpname = item.value;
				this.addForm.storageInfo.deliveryaddress.corpid = item.id;
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
				this.addForm.storageInfo.deliveryaddress.contactperson = item.value;
				this.addForm.storageInfo.deliveryaddress.mobile = item.mobile;
			},
			// 上一步按钮
			prev() {
				if(this.active < 4 && this.active > 0) { //
					// if(this.addForm.hasstorage == 'N') { //当未选择添加库房时
					// 	this.active = 0; //上一步到第一页
					// } else {
						this.active = this.active;
					// }
				}
				if(this.active -- < 1) this.active = 0; //其余依次递减
			},
			// 下一步按钮
			next() {
				// if (this.active++ > 3) this.active = 0;
				if(this.active == 0) { //添加员工账号
					this.$refs.addForm.validate((valid) => { //启动验证
						if(valid) {
							if(this.checkoutDataT) { //验证通过时(无重复时)
								this.active = 1;
							}else{
								this.$message({
									message: '当前标红信息系统已存在！',
									type: 'warning'
								});
							}
							// if(this.addForm.hasstorage == 'Y') { //选择添加库房时
								
							// } else {
							// 	this.active = 3;
							// 	//初始化角色
							// 	getSysRoleInfoList().then((res) => {
							// 		this.cities = res.data.data.records;
							// 	});
							// }
						}
					});
				}
				if(this.active == 1) { //新增库房
					this.$refs.addForm1.validate((valid) => { //启动验证
						if(valid) {
							this.active = 2;
						}
					});
				}
				if(this.active == 3) { //编辑角色权限
					if(this.checkNum != 0) {
						this.$confirm('确认新增该员工入职吗？', '提示', {}).then(() => {
							this.addSubmit();
							this.active = 4;
						}).catch((error) => {});
					} else {
						this.$message({
							message: '请为该员工分配权限！',
							type: 'warning'
						});
					}
				}
				if(this.active == 2) { //新增收发货地址
					this.$refs.addForm2.validate((valid) => { //启动验证
						if(valid) {
							this.active = 3;
							//初始化角色
							getSysRoleInfoList().then((res) => {
								this.cities = res.data.data.records;
							});
						}
					});
				}
			},
			//新增时数据监测
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckout(paras).then((res) => {
					let errorInput = res.data.data.param; //保存验证失败的字段
					if(!res.data.data.result) {
						this.$message({
							message: '信息输入重复！',
							type: 'warning'
						});
						this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
						this.checkoutDataF[index] = false;
						this.checkoutDataT = false;
					} else {
						this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
						this.checkoutDataF[index] = true;
					}
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				this.listLoading = true;
				// getCorporateInfoList(para).then((res) => {
				// 	this.total = res.data.data.totalResult;
				// 	this.listData = res.data.data.records;
				// 	this.listLoading = false;
				// }).catch((error) => {
				//                this.listLoading = false;
				// });
			},

			//新增
			addSubmit() {
				// 遍历已选权限 存id
				this.val.forEach((item, index) => {
					this.addForm.sysUserRoles.push({
						roleid: item
					});
				});
				let para = {
					employeetype: this.addForm.employeetypename,
					employeecode: this.addForm.employeecode,
					employeename: this.addForm.employeename,
					username: this.addForm.username,
					positionid: this.addForm.positionname,
					deptid: this.addForm.deptname,
					corpid: this.addForm.corpname,
					groupid: this.addForm.groupname,
					mobile: this.addForm.mobile,
					stogisneed: this.addForm.stogisneed,
					isenable: this.addForm.isenable,
					gender: this.addForm.gender,
					region: this.addForm.regionAll.toString(),
					address: this.addForm.address,
					wechatid: this.addForm.wechatid,
					qq: this.addForm.qq,
					hasstorage: this.addForm.hasstorage,
					sysUserRoles: this.addForm.sysUserRoles,

					storageInfo: {
						storagename: this.addForm.employeename,
						storagelevel: this.addForm.storageInfo.storagelevel,
						parentid: this.addForm.storageInfo.parentname,
						isdelete: this.addForm.storageInfo.isdelete,
						managerid: this.addForm.storageInfo.managerid,
						managername: this.addForm.storageInfo.managername == '' ? this.addForm.employeename : this.addForm.storageInfo.managername,
						managermobile: this.addForm.storageInfo.managermobile == '' ? this.addForm.mobile : this.addForm.storageInfo.managermobile,
						managerregion: this.addForm.storageInfo.managerregion.length == 0 ? this.addForm.regionAll.toString() : this.addForm.storageInfo.managerregion.toString(),
						manageraddress: this.addForm.storageInfo.manageraddress == '' ? this.addForm.address : this.addForm.storageInfo.manageraddress,

						deliveryaddress: {
							employeename: this.addForm.employeename,
							corpname: this.addForm.storageInfo.deliveryaddress.corpname,
							address: this.addForm.storageInfo.deliveryaddress.addressAll,
							province: this.addForm.storageInfo.deliveryaddress.addressAll[0],
							city: this.addForm.storageInfo.deliveryaddress.addressAll[1],
							district: this.addForm.storageInfo.deliveryaddress.addressAll[2],
							detailaddress: this.addForm.storageInfo.deliveryaddress.detailaddress,
							contactperson: this.addForm.storageInfo.deliveryaddress.contactperson,
							mobile: this.addForm.storageInfo.deliveryaddress.mobile,
							postcode: this.addForm.storageInfo.deliveryaddress.postcode,
							addresstype: this.addForm.storageInfo.deliveryaddress.addresstype,
							remarks: this.addForm.storageInfo.deliveryaddress.remarks,
							defaultflag: this.addForm.storageInfo.deliveryaddress.defaultflag,
							isdelete: this.addForm.storageInfo.deliveryaddress.isdelete,
						}
					}
				}
				addEmpInList(para).then((res) => {
					if(res.data.result.desc != 'success') {
						this.$message({
							message: res.data.result.desc,
							type: 'warning'
						});
						this.active = 3;
						return;
					} else {
						this.$message({
							message: '新增成功！',
							type: 'success'
						});
						this.active = 4;
						this.successData = res.data.data;
						console.log(this.successData)
					}
					this.$refs['addForm'].resetFields();
					this.handleQuery();
				}).catch((error) => {
					this.editLoading = false;
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

<style>
	.layout {
		display: flex;
	}
	
	.step-btn {
		position: fixed;
		right: 25px;
		bottom: 60px;
	}
	
	.step-form {
		margin-top: 35px;
		margin-left: 100px;
		width: 80%;
	}
	
	.center {
		font-size: 25px;
		color: #16A085;
		position: absolute;
		top: calc(5%);
		left: calc(50%);
	}
	
	.center i {
		font-size: 40px;
		color: #16A085;
		position: absolute;
		top: -10px;
		left: -50px;
	}
</style>