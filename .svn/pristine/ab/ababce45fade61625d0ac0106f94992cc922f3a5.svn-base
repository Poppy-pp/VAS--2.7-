<template>
	<section class="tab_content-wrapper">
		<section class="layout">
			<div>
				<el-steps :space="260" process-status="finish" direction="vertical" style="margin: 30px 0 0 50px;" :active="active" finish-status="success">
					<el-step title="客户"> </el-step>
					<el-step title="员工"></el-step>
					<el-step title="文员"></el-step>
					<el-step title="完成"></el-step>
				</el-steps>
			</div>

			<div style="width:80%;">
				<!-- 步骤一：公司 -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-if="active == 0" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">填写客户信息</span>
						</el-col>
						<el-row :gutter="80">
							<el-col :span="12">
								<el-form-item label="客户名称" prop="corpname" ref="corpname">
									<el-input v-model="addForm.corpname" auto-complete="off" @blur="checkout('corpname',addForm.corpname,0)"></el-input>
								</el-form-item>
								<el-form-item label="客户名称缩写" prop="corpshortname" ref="corpshortname">
									<el-input v-model="addForm.corpshortname" auto-complete="off" @blur="checkout('corpshortname',addForm.corpshortname,1)"></el-input>
								</el-form-item>
								<el-form-item label="联系电话" prop="tel1">
									<el-input v-model="addForm.tel1" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="公司类型" prop="corptype">
									<el-select v-model="addForm.corptype" @visible-change="corptypeChange" :loading="corptypeLoading" filterable placeholder="请选择公司类型" clearable>
										<el-option v-for="item in corptypelist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="组织级别" prop="corplevel">
									<el-select v-model="addForm.corplevel" filterable placeholder="请选择公司级别" clearable>
										<el-option v-for="item in corpOptions" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="父级公司名称" prop="parentname" v-show="addForm.corplevel == '2' || addForm.corplevel == '3'">
									<el-select v-model="addForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择父级公司名称" clearable>
										<el-option v-for="item in parlist" :key="item.corpname" :label="item.corpname" :value="item.corpcode">
										</el-option>
									</el-select>
								</el-form-item>
								<!-- 分公司时 判断是否有父级公司 -->
								<el-form-item label="是否有父级公司" prop="hasParent" v-show="addForm.corplevel == '1'">
									<el-switch v-model="addForm.hasParent" on-color="#16a085" off-color="#ff4949" on-value="1" on-text="有" off-value="0" off-text="无">
									</el-switch>
									<el-select v-model="addForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择父级公司" clearable v-show="addForm.hasParent == '1'" style="margin-top:20px;">
										<el-option v-for="item in parlist" :key="item.corpname" :label="item.corpname" :value="item.corpcode">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="客户地址" prop="addressAll">
									<el-cascader placeholder="请选择省/市/区" v-model="addForm.addressAll" :options="prOptions" filterable clearable change-on-select @change="sendAddressAll"></el-cascader>
								</el-form-item>
								<el-form-item label="详细地址" prop="address">
									<el-input v-model="addForm.address" auto-complete="off" @change="changeMap"></el-input>
								</el-form-item>
								<gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
							</el-col>
						</el-row>
						<el-row :gutter="80">
							<el-col :span="24" style="margin-top:50px">
								<span class="formTile">填写对应业务人员</span>
							</el-col>

							<el-col :span="12">
								<el-form-item label="业务员" prop="">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.businessrelation.salesman" :fetch-suggestions="querySearchNameBusiness" placeholder="请输入业务员" :trigger-on-focus="false" @select="handleSelectNameBusiness"></el-autocomplete>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</el-form>

				<!-- 步骤二： -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-if="active == 1" class="step-form">
					<template v-for="(item,index) in addForm.employees">
						<template v-if="index == 0">
							<el-card :body-style="{ padding: '0px' }">
								<div style="display:inline-block;margin:0 10px 10px 0;">
									<el-col :span="24">
										<span class="formTile">填写员工信息</span>
									</el-col>
									<el-row :gutter="80">
										<el-col :span="12">
											<el-form-item label="员工姓名" prop="employeename">
												<i style="color:red;position: absolute;left: -80px;">*</i><!--必选项 -->
												<el-input v-model="addForm.employees[index].employeename" placeholder="请输入员工姓名" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="手机号码" prop="mobile" ref="mobile">
												<i style="color:red;position: absolute;left: -80px;">*</i><!--必选项 -->
												<el-input v-model="addForm.employees[index].mobile" placeholder="请输入员工手机号码" auto-complete="off" @blur="checkout('mobile',addForm.employees[index].mobile)"></el-input>
											</el-form-item>
											<el-form-item label="性别" prop="gender">
												<el-radio-group v-model="addForm.employees[index].gender">
													<el-radio class="radio" label="M">男</el-radio>
													<el-radio class="radio" label="F">女</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item label="类型" prop="employeetypename">
												<el-select v-model="addForm.employees[index].employeetypename" @visible-change="empChange" :loading="etLoading" filterable placeholder="请选择员工类型" clearable>
													<el-option v-for="item in emptype" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="员工编号" prop="employeecode">
												<el-input v-model="addForm.employees[index].employeecode" placeholder="请输入员工编号" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="所属部门" prop="deptname">
												<el-input v-model="addForm.employees[index].deptname" placeholder="请输入所属部门" auto-complete="off"></el-input>
											</el-form-item>
						 				</el-col>
										<el-col :span="12">
											<el-form-item label="员工岗位" prop="positionname">
												<el-select v-model="addForm.employees[index].positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择员工岗位" clearable>
													<el-option v-for="item in poslist" :key="item.positionname" :label="item.positionname" :value="item.ID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="所属区域" prop="region">
												<el-cascader placeholder="请选择省/市/区" v-model="addForm.employees[index].regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
											</el-form-item>
											<el-form-item label="通讯地址" prop="address">
												<el-input v-model="addForm.employees[index].address" placeholder="请输入详细通讯地址" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="QQ" prop="qq">
												<el-input v-model="addForm.employees[index].qq" placeholder="请输入员工QQ" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="微信" prop="wechatid">
												<el-input v-model="addForm.employees[index].wechatid" placeholder="请输入员工微信" auto-complete="off"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-col :span="24" style="margin-top:50px;">
										<span class="formTile">分配员工角色权限</span>
									</el-col>
									<div style="margin: 15px 0;"></div>
									<el-checkbox-group v-model="addForm.employees[index].val" class="userchedaa">
										<el-checkbox v-for="city in cities" :label="city.id">{{ city.rolename }}</el-checkbox>
									</el-checkbox-group>
									<!-- 加减号按钮 -->
									<template v-if="index == addForm.employees.length-1">
										<el-button style="float:right;" type="primary" slot="append" @click="addSelect" icon="el-icon-plus" title="添加员工">添加员工</el-button>
									</template>
									<template v-else>
										<el-button style="float:right;" type="primary" slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除员工">移除员工</el-button>
									</template>
								</div>
							</el-card>
						</template>
						<template v-else>
							<el-card :body-style="{ padding: '0px' }" class="marginTop">
								<div style="display:inline-block;margin:0 10px 10px 0;">
									<el-col :span="24">
										<span class="formTile">填写员工信息</span>
									</el-col>
									<el-row :gutter="80">
										<el-col :span="12">
											<el-form-item label="员工姓名" prop="employeename">
												<i style="color:red;position: absolute;left: -80px;">*</i><!--必选项 -->
												<el-input v-model="addForm.employees[index].employeename" placeholder="请输入员工姓名" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="手机号码" prop="mobile" ref="mobile">
												<i style="color:red;position: absolute;left: -80px;">*</i><!--必选项 -->
												<el-input v-model="addForm.employees[index].mobile" placeholder="请输入员工手机号码" auto-complete="off" @blur="checkout('mobile',addForm.employees[index].mobile)"></el-input>
											</el-form-item>
											<el-form-item label="性别" prop="gender">
												<el-radio-group v-model="addForm.employees[index].gender">
													<el-radio class="radio" label="M">男</el-radio>
													<el-radio class="radio" label="F">女</el-radio>
												</el-radio-group>
											</el-form-item>
											<el-form-item label="类型" prop="employeetypename">
												<el-select v-model="addForm.employees[index].employeetypename" @visible-change="empChange" :loading="etLoading" filterable placeholder="请选择员工类型" clearable>
													<el-option v-for="item in emptype" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="员工编号" prop="employeecode">
												<el-input v-model="addForm.employees[index].employeecode" placeholder="请输入员工编号" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="所属部门" prop="deptname">
												<el-input v-model="addForm.employees[index].deptname" placeholder="请输入员工编号" auto-complete="off"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="员工岗位" prop="positionname">
												<el-select v-model="addForm.employees[index].positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择员工岗位" clearable>
													<el-option v-for="item in poslist" :key="item.positionname" :label="item.positionname" :value="item.ID">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="所属区域" prop="region">
												<el-cascader placeholder="请选择省/市/区" v-model="addForm.employees[index].regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
											</el-form-item>
											<el-form-item label="通讯地址" prop="address">
												<el-input v-model="addForm.employees[index].address" placeholder="请输入详细通讯地址" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="QQ" prop="qq">
												<el-input v-model="addForm.employees[index].qq" placeholder="请输入员工QQ" auto-complete="off"></el-input>
											</el-form-item>
											<el-form-item label="微信" prop="wechatid">
												<el-input v-model="addForm.employees[index].wechatid" placeholder="请输入员工微信" auto-complete="off"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-col :span="24" style="margin-top:50px;">
										<span class="formTile">分配员工角色权限</span>
									</el-col>
									<div style="margin: 15px 0;"></div>
									<el-checkbox-group v-model="addForm.employees[index].val" class="userchedaa">
										<el-checkbox v-for="city in cities" :label="city.id">{{ city.rolename }}</el-checkbox>
									</el-checkbox-group>

									<!-- 加减号按钮 -->
									<template v-if="index == addForm.employees.length-1">
										<el-button style="float:right;" type="primary" slot="append" @click="addSelect" icon="el-icon-plus" title="添加员工">添加员工</el-button>
									</template>
									<template v-else>
										<el-button style="float:right;" type="primary" slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除员工">移除员工</el-button>
									</template>
								</div>
							</el-card>
						</template>
					</template>
				</el-form>

				<!-- 步骤三： -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-if="active == 2" class="step-form">
					<el-card :body-style="{ padding: '0px' }">
						<el-col :span="24">
							<span class="formTile">分配文员</span>
						</el-col>
						<el-col :span="24">
							<el-form-item label="派单" prop="custEmps">
								<el-select v-model="addForm.custEmps" multiple placeholder="请选择" @visible-change="custEmpsChange" :loading="custEmpsLoading" filterable clearable>
									<el-option v-for="item in custEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item.ID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="售后" prop="afterEmps">
								<el-select v-model="addForm.afterEmps" multiple placeholder="请选择" @visible-change="afterEmpsChange" :loading="afterEmpsLoading" filterable clearable>
									<el-option v-for="item in afterEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item.ID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="保险" prop="insEmps">
								<el-select v-model="addForm.insEmps" multiple placeholder="请选择" @visible-change="insEmpsChange" :loading="insEmpsLoading" filterable clearable>
									<el-option v-for="item in insEmpsOptions" :key="item.employeename" :label="item.employeename" :value="item.ID">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						</el-row>
					</el-card>
				</el-form>

				<!-- 步骤四：完成 -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-if="active == 3" class="step-form">
					<div class="center"><i class='iconfont icon-chenggongjierutongguo'></i>新增成功</div>

					<div style="margin-top:10%;width:100%;">
						<el-row style="padding:0 40px;margin-bottom:20px;">
							<el-col :span="24">
								<span class="formTile">客户信息</span>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>客户名称:</dt>
									<dd>{{ successData.corpname }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>客户名称缩写:</dt>
									<dd>{{ successData.corpshortname }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>客户电话:</dt>
									<dd>{{ successData.tel1 }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>公司类型:</dt>
									<dd>{{ successData.corptype }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>组织级别:</dt>
									<dd>{{ successData.corplevel == '0' ? '集团' : successData.corplevel == '1' ? '分公司' : successData.corplevel == '2' ? '子公司' : successData.corplevel =='3' ? '门店' : '' }}</dd>
								</dl>
							</el-col>
							<el-col :span="12">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>父级公司:</dt>
									<dd>{{ successData.parentcorpcode }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>客户地址:</dt>
									<dd>{{ successData.area }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>详细地址:</dt>
									<dd>{{ successData.address }}</dd>
								</dl>
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>对应业务员:</dt>
									<dd>{{ salesMan }}</dd>
								</dl>
							</el-col>
						</el-row>

						<el-row style="padding:10px 40px;margin-bottom:20px;">
							<el-col :span="24">
								<span class="formTile">员工信息</span>
							</el-col>
							<template v-for="(item,index) in this.successData.employees">
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
									<dl class="dllist" style="margin-bottom:10px;">
										<dt>所属部门:</dt>
										<dd>{{item.deptname}}</dd>
									</dl>
								</el-col>
								<el-col :span="12">
									<dl class="dllist" style="margin-bottom:10px;">
										<dt>员工岗位:</dt>
										<dd>{{item.positionname}}</dd>
									</dl>
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
									<dl class="dllist" style="margin-bottom:10px;">
										<dt>角色权限:</dt>
										<dd>{{item.rolename}}</dd>
									</dl>
								</el-col>
							</template>
						</el-row>

						<el-row style="padding:10px 40px;margin-bottom:20px;">
							<el-col :span="24">
								<span class="formTile">文员信息</span>
							</el-col>
							<el-col :span="24">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>派单文员:</dt>
									<dd>{{barr1.join("，")}}</dd>
								</dl>
							</el-col>
							<el-col :span="24">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>售后文员:</dt>
									<dd>{{barr2.join("，")}}</dd>
								</dl>
							</el-col>
							<el-col :span="24">
								<dl class="dllist" style="margin-bottom:10px;">
									<dt>保险文员:</dt>
									<dd>{{barr3.join("，")}}</dd>
								</dl>
							</el-col>
						</el-row>
					</div>
				</el-form>
			</div>
		</section>

		<el-button-group class="step-btn">
			<!-- 上一步按钮 -->
			<el-button type="primary" @click="prev" icon="el-icon-arrow-left" v-show="active > 0 && active < 3">上一步</el-button>
			<!-- 下一步按钮 -->
			<el-button type="primary" @click="next" v-show="active < 3">{{this.active == 2 ? '保存' : '下一步' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			<!-- 返回按钮 -->
			<el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
		</el-button-group>

		<!-- <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button> -->

	</section>
</template>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import gdmap from 'components/map/gdmap';
	import { getCorporateInfoList, addCorporateDesk, getParentInfoList, getCorpType, getSysRoleInfoList, getSelectList, getDeptManagerInfoList, getEmpType, getPositionList, getEmpsGroupList, getEmployeeInfoList, getDeptList, getCheckoutOfCorpInfo, getCheckout } from '../../api/api';

	export default {
		components: {
			gdmap,
		},
		data() {
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入中文,不能大于四个汉字'));
				} else {
					callback();
				}
			};
			// 验证所有电话
			var checkAllMobile = (rule, value, callback) => {
				var reg = /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$)/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('请输入固机(028-2542212)或手机号码'));
				} else {
					callback();
				}
			};
			//验证中文
			var checkChinese = (rule, value, callback) => {
				var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\(（\)）]+$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入中文、数字和字母'));
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
				checkList: [],
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
				successData: [], //新增成功后返回的数据
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
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //
				empMobileCheck: '', //员工电话验证存入
				pageSize: 15,
				addLoading: false,
				addFormRules: {
					corpname: [{
							required: true,
							message: '请输入组织名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					corptype: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur'
					}],
					tel1: [{
							required: true,
							message: '请输入组织电话',
							trigger: 'blur'
						},
						{
							validator: checkAllMobile,
							trigger: 'blur'
						}
					],
					// employeename:[
					// 	{ required: true, message: '请输入员工姓名', trigger: 'blur' },
					// 	{validator: checkName,trigger: 'blur'}
					// ],
			         		// mobile:[
				         	// 	{required:true,message:"请输入员工手机号码",trigger: 'blur'},
				         	// 	{validator: checkAllMobile,trigger: 'blur'}
				         	// ],
				},
				//新增界面数据
				addForm: {
					corpcode: '',
					corpname: '',
					corpshortname: '',
					corplevel: '',
					parentcorpcode: '',
					address: '',
					area: '',
					tel1: '',
					addressAll: [],
					parentname: '',
					corptype: '',
					corptypeid: '',
					showorder: 0,
					isdelete: 0,
					hasParent: 1,

					businessrelation: {
						employeeid: '',
						salesman: '',
					},

					employees: [{
						employeename: '',
						mobile: '',
						id: '',
						employeetypename: '客户',
						employeetype: '客户',
						employeecode: '',
						positionname: '',
						isenable: 1,
						positionid: '',
						gender: 'M',
						region: '',
						address: '',
						wechatid: '',
						qq: '',
						regionAll: [],
						deptname: '',
						sysUserRoles: [],
						sysUserInfo: {
							password: '123',
						},
						val: [], //选择的角色权限组
					}],
					departmentInfo: [{
						deptname: '',
					}],

					assignments: [

					],

					custEmps: [], //派单文员组
					afterEmps: [], //售后文员组
					insEmps: [], //保险文员组
				},
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				this.checkoutDataT = true; //初始化

				// 判断手机号格式
				if (p == 'mobile') {
					var reg = /^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$)/g,flag = reg.test(v);
					if(!flag) {
						this.$refs['mobile'][0].$el.className = "el-form-item is-error"; //输入框标红
						this.$message({
							message: '手机号格式不正确！',
							type: 'error'
						});
					} else {
						this.$refs['mobile'][0].$el.className = "el-form-item"; //输入框恢复
					}
				}
				

				let paras = {
					para: p,
					value: v,
				}
				if(this.active == 0) { //新增客户验证时
					getCheckoutOfCorpInfo(paras).then((res) => {
						let errorInput = res.data.data.param; //保存验证失败的字段
						if(!res.data.data.result) {
							this.$message({
								message: '组织信息输入重复！',
								type: 'warning'
							});
							this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
							this.checkoutDataF[index] = false
						} else {
							this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
							this.checkoutDataF[index] = true
						}
					});
				} else if(this.active == 1) {
					getCheckout(paras).then((res) => {
						let errorInput = res.data.data.param; //保存验证失败的字段
						if(!res.data.data.result) {
							this.$message({
								message: '员工信息输入重复！',
								type: 'warning'
							});
							// this.$refs[errorInput].$el.className="el-form-item is-error";//输入框标红
							this.checkoutDataF[index] = false;
							this.empMobileCheck = this.checkoutDataF[index]; //员工电话验证存入
						} else {
							// this.$refs[errorInput].$el.className="el-form-item";//输入框恢复
							this.checkoutDataF[index] = true;
							this.empMobileCheck = this.checkoutDataF[index]; //员工电话验证存入
						}
					});
				}

			},
			// 添加查询条件
			addSelect() {
				this.addForm.employees.push({
					employeename: '',
					mobile: '',
					id: '',
					employeetypename: '客户',
					employeetype: '客户',
					employeecode: '',
					positionname: '',
					isenable: 1,
					positionid: '',
					gender: 'M',
					region: '',
					address: '',
					wechatid: '',
					qq: '',
					regionAll: [],
					deptname: '',
					sysUserRoles: [],
					sysUserInfo: {
						password: '123',
					},
					val: [], //选择的角色权限组
				});
			},
			// 移除查询条件
			removeSelect(index) {
				this.addForm.employees.splice(index, 1); //从当前index位置开始，删除一项
			},
			// 省市区选择时赋值给定位
			sendAddressAll(val) {
				this.addForm.address = val.join('');
				this.changeMap();
			},
			// 地址输入框输入地址时
			changeMap() {
				this.$refs.vueAmap.geocoder(this.addForm.address, (res) => {});
			},
			//拖拽地图小点返回的地址
			draggerMapMarker(address, lnglatXY, type) {
				this.addForm.address = address;
			},

			//所属 部门——搜索下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				getDeptList().then((res) => {
					this.deptlist = res.data.data.records;
					this.deptLoading = false;
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
				this.addForm.businessrelation.salesman = item.value;
				this.addForm.businessrelation.employeeid = item.id;
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
			// 上一步按钮
			prev() {
				if(this.active-- < 1) this.active = 0;
			},
			// 下一步按钮
			next() {
				if(this.active++ > 2) this.active = 0;
				if(this.active == 1) {
					this.$refs.addForm.validate((valid) => {
						if(valid) {
							this.checkoutDataF.forEach((item, index) => {
								this.checkoutDataT = item && this.checkoutDataT;
							});
							if(this.checkoutDataT) { //数据不重复时
								this.active = 1;
								//初始化角色
								getSysRoleInfoList().then((res) => {
									this.cities = res.data.data.records;
								});
							} else {
								this.$message({
									message: '标红信息已存在！',
									type: 'warning'
								});
								this.active = 0;
							}
						} else {
							this.active = 0;
						}
					});
				}
				if(this.active == 2) {
					if(this.addForm.employees[0].employeename == ""){
						this.$message({
							message: '该员工姓名不能为空',
							type: 'warning'
						});
						this.active = 1;
						return;
					}
					if(this.addForm.employees[0].mobile == ""){
						this.$message({
							message: '该员工电话不能为空',
							type: 'warning'
						});
						this.active = 1;
						return;
					}
					let reg = /^[0-9]*$/g,
					flag = reg.test(this.addForm.employees[0].mobile);
					if(!flag) {
						this.$message({
							message: '手机号格式不对！',
							type: 'warning'
						});
						this.active = 1;
						return;
					}

					if(this.empMobileCheck) { //员工电话验证通过时，不重复时
						this.active = 2;
					} else { //员工电话验证重复时
						this.active = 1;
						this.$message({
							message: '该员工电话号码已存在！',
							type: 'warning'
						});
						return;
					}
				}
				if(this.active == 3) {
					this.$confirm('确认新增吗？', '提示', {}).then(() => {
						this.addSubmit();
					}).catch((error) => {
						this.active--;
					});
				}
			},
			/*父级公司名称——下拉*/
			parChange(r) {
				if(!r || this.parlist.length > 0) return;
				this.parLoading = true;
				let para = {
					hascorpcode: 'Y',
				}
				getParentInfoList(para).then((res) => {
					this.parlist = res.data.data.records;
					this.parLoading = false;
				});
			},
			/*公司类型——下拉*/
			corptypeChange(r) {
				if(!r || this.corptypelist.length > 0) return;
				this.corptypeLoading = true;
				getCorpType().then((res) => {
					this.corptypelist = res.data.data.records;
					this.corptypeLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					corpname: this.filters.corpname,
					corpcode: this.filters.corpcode,
					ctype: this.filters.corptype,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getCorporateInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//新增
			addSubmit() {
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				// 遍历已选权限 存id
				this.addForm.employees.forEach((item1, index1) => {
					item1.val.forEach((item2, index2) => {
						item1.sysUserRoles.push({
							roleid: item2
						});
					});

				});
				// 遍历 传地址、岗位
				this.addForm.employees.forEach((item, index) => {
					item.region = item.regionAll.toString();
					item.positionid = item.positionname;
				});
				// 遍历派单
				this.addForm.custEmps.forEach((item, index) => {
					this.addForm.assignments.push({
						assigneeid: item,
						assigntype: 'B1'
					});
				});
				// 遍历售后
				this.addForm.afterEmps.forEach((item, index) => {
					this.addForm.assignments.push({
						assigneeid: item,
						assigntype: 'B2'
					});
				});
				// 遍历保险
				this.addForm.insEmps.forEach((item, index) => {
					this.addForm.assignments.push({
						assigneeid: item,
						assigntype: 'B3'
					});
				});

				this.$refs.addForm.validate((valid) => {
					if(valid) {
						let para = {
							corpcode: this.addForm.corpcode,
							corpname: this.addForm.corpname,
							corpshortname: this.addForm.corpshortname,
							corplevel: this.addForm.corplevel,
							parentcorpcode: this.addForm.parentname,
							parentname: this.addForm.parentname,
							corptype: this.addForm.corptype,
							isdelete: parseInt(this.addForm.isdelete),
							showorder: this.addForm.showorder,
							area: this.addForm.addressAll.toString(),
							address: this.addForm.address,
							tel1: this.addForm.tel1,

							businessrelation: this.addForm.businessrelation,

							departmentInfo: this.addForm.employees.deptname,

							employees: this.addForm.employees,

							assignments: this.addForm.assignments,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addCorporateDesk(para).then((res) => {
								this.$message({
									message: '新增成功！',
									type: 'success'
								});
								this.successData = res.data.data;

								// 遍历文员
								this.successData.assignments.forEach((item, index) => {
									if(item.assigntype == "B1") {
										this.barr1.push(item.assigneename);
									}
									if(item.assigntype == "B2") {
										this.barr2.push(item.assigneename);
									}
									if(item.assigntype == "B3") {
										this.barr3.push(item.assigneename);
									}
								});
								// 业务员
								this.salesMan = this.successData.businessrelation.salesman;

								this.$refs['addForm'].resetFields();
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
	
	.marginTop {
		margin-top: 20px;
	}
</style>