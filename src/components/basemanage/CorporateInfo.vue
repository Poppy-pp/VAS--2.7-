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
									<el-option label="名称" value="corpname"></el-option>
									<el-option label="名称缩写" value="corpshortname"></el-option>
									<el-option label="级别" value="corplevel"></el-option>
									<el-option label="电话" value="tel1"></el-option>
									<el-option label="父级公司名称" value="parentname"></el-option>
									<el-option label="类型" value="corptype"></el-option>
									<el-option label="地址" value="area"></el-option>
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
										<el-option label="名称" value="corpname"></el-option>
										<el-option label="名称缩写" value="corpshortname"></el-option>
										<el-option label="级别" value="corplevel"></el-option>
										<el-option label="电话" value="tel1"></el-option>
										<el-option label="父级公司名称" value="parentname"></el-option>
										<el-option label="类型" value="corptype"></el-option>
										<el-option label="地址" value="area"></el-option>
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
				<el-form-item style="float:right;">
					<el-button type="primary" @click="corpIn" icon="el-icon-circle-check">新增客户</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="corpname" label="名称" align="center" >
			</el-table-column>
			<el-table-column prop="corpshortname" label="名称缩写" align="center" >
			</el-table-column>
			<el-table-column prop="corplevel" label="级别" align="center" >
			</el-table-column>
			<el-table-column prop="tel1" label="电话" align="center" >
			</el-table-column>
			<el-table-column prop="parentname" label="父级公司名称" align="center" >
			</el-table-column>
			<el-table-column prop="corptype" label="类型" align="center" >
			</el-table-column>
			<el-table-column prop="area" label="地址" align="center" >
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
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">组织信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>名称:</dt>
							<dd>{{ corpThisList.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>名称缩写:</dt>
							<dd>{{ corpThisList.corpshortname == undefined ? '暂无' : corpThisList.corpshortname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>级别:</dt>
							<dd>{{ corpThisList.clevel == '0' ? '集团' : corpThisList.clevel == '1' ? '分公司' : corpThisList.clevel == '2' ? '子公司' : corpThisList.clevel=='3' ? '门店' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>电话:</dt>
							<dd>{{ corpThisList.tel1 == undefined ? '暂无' : corpThisList.tel1 }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>父级公司名称:</dt>
							<dd>{{ corpThisList.parentname == undefined ? '暂无' : corpThisList.parentname}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>类型:</dt>
							<dd>{{ corpThisList.ctype == 'WW' ? '万网公司' : corpThisList.ctype== 'INSU' ? '保险公司' : corpThisList.ctype == 'GUAR' ? '担保公司' : corpThisList.ctype == 'BANK' ? '银行' : corpThisList.ctype == 'GROUP' ? '集团公司' : corpThisList.ctype == 'AUTO' ? '汽车销售公司' : corpThisList.ctype == 'OTH' ? '其他' : '暂无'}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>区域:</dt>
							<dd>{{ corpThisList.area == undefined ? '暂无' : corpThisList.area }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ corpThisList.address == undefined ? '暂无' : corpThisList.address }}</dd>
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
							<dd>{{corpThisList.activatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(corpThisList.activatedate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{corpThisList.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(corpThisList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="公司名称" prop="corpname" ref="corpname">
							<el-input v-model="editForm.corpname" auto-complete="off" @blur="checkout('corpname',editForm.corpname,0)"></el-input>
						</el-form-item>
						<el-form-item label="公司名称缩写" prop="corpshortname" ref="corpshortname">
							<el-input v-model="editForm.corpshortname" auto-complete="off" @blur="checkout('corpshortname',editForm.corpshortname,1)"></el-input>
						</el-form-item>
						<el-form-item label="组织级别" prop="corplevel">
							<el-select v-model="editForm.corplevel" filterable placeholder="请选择公司级别" clearable>
								<el-option v-for="item in corpOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="父级公司名称" prop="parentname" v-show="editForm.corplevel != '0'">
							<el-select v-model="editForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择父级公司名称" clearable>
								<el-option v-for="item in parlist" :key="item.corpname" :label="item.corpname" :value="item.corpcode">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公司类型" prop="corptype">
							<el-select v-model="editForm.corptype" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择公司类型" clearable>
								<el-option v-for="item in corplist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="公司电话" prop="tel1">
							<el-input v-model="editForm.tel1" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="公司地址" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="editForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="address">
							<el-input v-model="editForm.address" auto-complete="off"></el-input>
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
						<el-form-item label="公司名称" prop="corpname" ref="corpname">
							<el-input v-model="addForm.corpname" auto-complete="off" @blur="checkout('corpname',addForm.corpname,0)"></el-input>
						</el-form-item>
						<el-form-item label="公司名称缩写" prop="corpshortname" ref="corpshortname">
							<el-input v-model="addForm.corpshortname" auto-complete="off" @blur="checkout('corpshortname',addForm.corpshortname,1)"></el-input>
						</el-form-item>
						<el-form-item label="组织级别" prop="corplevel">
							<el-select v-model="addForm.corplevel" filterable placeholder="请选择公司级别" clearable>
								<el-option v-for="item in corpOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="父级公司名称" prop="parentname" v-show="addForm.corplevel == '2' || addForm.corplevel == '3'">
							<el-select v-model="addForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择父级公司名称" clearable remote :remote-method="parChangeSelsect">
								<el-option v-for="item in parlist" :key="item.corpname" :label="item.corpname" :value="item.corpcode">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- 分公司时 判断是否有父级公司 -->
						<el-form-item label="是否有父级公司" prop="hasParent" v-show="addForm.corplevel == '1'">
							<el-switch v-model="addForm.hasParent" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有" inactive-value="0" inactive-text="无">
							</el-switch>

							<el-select v-model="addForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择父级公司名称" clearable v-show="addForm.hasParent == '1'" remote :remote-method="parChangeSelsect">
								<el-option v-for="item in parlist" :key="item.corpname" :label="item.corpname" :value="item.corpcode">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公司类型" prop="corptype">
							<el-select v-model="addForm.corptype" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择公司类型" clearable>
								<el-option v-for="item in corplist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="公司电话" prop="tel1">
							<el-input v-model="addForm.tel1" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="公司地址" prop="addressAll">
							<el-cascader placeholder="请选择省/市/区" v-model="addForm.addressAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" prop="address">
							<el-input v-model="addForm.address" auto-complete="off"></el-input>
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

	import { getCorporateInfoList, addCorporateInfo, modifyCorporateInfo, removeCorporateInfo, getParentInfoList, getCorpType, getSelectList, searchCorpNameList, getSelectListCorp, getDeptManagerInfoList, getCheckoutOfCorpInfo, getNamebyUserid } from '../../api/api';

	export default {
		name:'CorporateInfo',
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
			//验证公司名字
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
						select: ['corpname'],
						content: ''
					}], //查询框
					isdelete: '0',
				},
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
				fmtdata: util,
				prOptions: util.initProvince(),
				listData: [],
				corpThisList: [], //详情展示当前公司信息
				formDialogTableVisible: false,
				customers: [],
				parlist: [], //父级车名称列表
				parLoading: false, //父级车名称
				corplist: [], //公司类型列表
				corpLoading: false, //公司类型
				total: 0,
				createname: "",
				updatename: "",
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: [], //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
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
						message: '请输入类型',
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
				},
				pageSize: 15,
				//编辑界面数据
				editForm: {
					id: 0,
					corpcode: '',
					corpname: '',
					corpshortname: '',
					corplevel: '',
					parentname: '',
					tel1: '',
					address: '',
					area: '',
					addressAll: [],
					parentcorpcode: '',
					corptype: '',
					corptypeid: '',
					showorder: 0
				},
				editFormId: {
					parentcorpcode: '',
					parentname: '',
					value: '',
				},
				addFormVisible: false, //新增界面是否显示
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
						message: '请输入类型',
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
				},
				//新增界面数据
				addForm: {
					corpcode: '',
					corpname: '',
					corpshortname: '',
					corplevel: '',
					parentcorpcode: '',
					tel1: '',
					address: '',
					area: '',
					addressAll: [],
					parentname: '',
					corptype: '',
					corptypeid: '',
					showorder: 0,
					isdelete: 0,
					hasParent: 1,
				},
			}
		},
		methods: {
			// 新增客户跳转
			corpIn() {
				this.$router.push('/corpAddProcess');
			},
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput[index] == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfCorpInfo(paras).then((res) => {
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
			formDetailHandle(corpid) {
				this.formDialogTableVisible = true;
				this.corpThisList = ''; //清空上条数据
				this.createname = "";
				this.updatename = "";
				// 获取当前组织信息
				let para = {
					id: corpid
				}
				nanobar.go(70);
				getCorporateInfoList(para).then((res) => {
					this.corpThisList = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.corpThisList.createby == null ? 0 : this.corpThisList.createby,
						updateby: this.corpThisList.updateby == null ? 0 : this.corpThisList.updateby,
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
			/*父级公司名称——搜索下拉*/
			parChangeSelsect(query) {
				let para = {
					showCount: 30,
					corpname: query,
					hascorpcode: 'Y',
				}
				getParentInfoList(para).then((res) => {
					this.parlist = res.data.data.records;
					this.parLoading = false;
				});
			},
			/*公司类型——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;
				getCorpType().then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
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
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListCorp(para).then((res) => {
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
					removeCorporateInfo(para).then((res) => {
						this.listLoading = false;
						if(res.data.result.desc != 'success') {
							this.$message({
								message: '当前组织下有有效部门或者有效员工！',
								type: 'warning'
							});
						} else {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
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
				var addrVal = row.area;
				if(addrVal != null) {
					var addrArr = addrVal.split(",");
				} else {
					var addrArr = ["四川", "成都", "高新区"];
				}
				this.editForm = {
					id: row.ID,
					corpcode: row.corpcode,
					corpname: row.corpname,
					corpshortname: row.corpshortname,
					corplevel: row.corplevel,
					tel1: row.tel1,
					addressAll: addrArr, //区域
					address: row.address, //详细地址
					// area:addrVal,//区域显示
					parentname: row.parentname,
					showorder: row.showorder,
					corptype: row.corptype,
					corptypeid: row.corptypeid
				}
				this.editFormId = {
					parentcorpcode: row.parentcorpcode,
					parentname: row.parentname,
					corptype: row.corptype,
					corptypeid: row.corptypeid,
					value: row.value,
					corplevel: row.corplevel,
				}
				this.thisInput.push(this.editForm.corpname, this.editForm.corpshortname); //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					corpcode: '',
					corpname: '',
					corpshortname: '',
					corplevel: '',
					parentcorpcode: '',
					tel1: '',
					address: '',
					addressAll: ["四川", "成都", "高新区"],
					area: '',
					parentname: '',
					corptype: '',
					corptypeid: '',
					isdelete: 0,
					showorder: 0,
					hasParent: '1',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							corpcode: this.editForm.corpcode,
							corpname: this.editForm.corpname,
							corpshortname: this.editForm.corpshortname,
							corplevel: this.editForm.corplevel,
							parentcorpcode: this.editForm.parentcorpcode,
							tel1: this.editForm.tel1,
							// parentname:this.editForm.parentname,
							corptype: this.editForm.corptype,
							// corptypeid:this.editForm.corptypeid,
							isdelete: parseInt(this.editForm.isdelete),
							showorder: this.editForm.showorder,
							area: this.editForm.addressAll.toString(),
							address: this.editForm.address,
						}
						if(this.editFormId.parentname == this.editForm.parentname) {
							para.parentcorpcode = this.editFormId.parentcorpcode;
						} else {
							para.parentcorpcode = this.editForm.parentname;
						}
						if(this.editFormId.corptype == this.editForm.corptype) {
							para.corptype = this.editFormId.corptypeid;
						} else {
							para.corptype = this.editForm.corptype;
						}
						if(this.editFormId.corplevel == this.editForm.corplevel) {
							para.corplevel = this.editFormId.value;
						} else {
							para.corplevel = this.editForm.corplevel;
						}
						modifyCorporateInfo(para).then((res) => {
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
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							corpcode: this.addForm.corpcode,
							corpname: this.addForm.corpname,
							corpshortname: this.addForm.corpshortname,
							corplevel: this.addForm.corplevel,
							parentcorpcode: this.addForm.parentname,
							tel1: this.addForm.tel1,
							// parentname:this.addForm.parentname,
							corptype: this.addForm.corptype,
							isdelete: parseInt(this.addForm.isdelete),
							showorder: this.addForm.showorder,
							area: this.addForm.addressAll.toString(),
							address: this.addForm.address,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addCorporateInfo(para).then((res) => {
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
					removeCorporateInfo(para).then((res) => {
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