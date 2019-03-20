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
									<el-option label="库房" value="STORAGENAME"></el-option>
									<el-option label="级别" value="STORAGELEVEL"></el-option>
									<el-option label="上级库房" value="PARENTNAME"></el-option>
									<!-- <el-option label="库房区域" value=""></el-option> -->
									<el-option label="库管人员" value="MANAGERNAME"></el-option>
									<el-option label="库管电话" value="MANAGERMOBILE"></el-option>
									<el-option label="所属分组" value="GROUPNAME"></el-option>
									<el-option label="库管区域" value="MANAGERREGION"></el-option>
									<el-option label="库管地址" value="MANAGERADDRESS"></el-option>
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
										<el-option label="库房" value="STORAGENAME"></el-option>
										<el-option label="级别" value="STORAGELEVEL"></el-option>
										<el-option label="上级库房" value="PARENTNAME"></el-option>
										<!-- <el-option label="库房区域" value=""></el-option> -->
										<el-option label="库管人员" value="MANAGERNAME"></el-option>
										<el-option label="库管电话" value="MANAGERMOBILE"></el-option>
										<el-option label="所属分组" value="GROUPNAME"></el-option>
										<el-option label="库管区域" value="MANAGERREGION"></el-option>
										<el-option label="库管地址" value="MANAGERADDRESS"></el-option>
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
							<el-switch v-model="filters.ISDELETE" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" label="#" align="center">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="STORAGENAME" label="库房" align="center" >
			</el-table-column>
			<el-table-column prop="STORAGELEVEL" label="库房级别" align="center" >
			</el-table-column>
			<el-table-column prop="PARENTNAME" label="上级库房" align="center" >
			</el-table-column>
			<!-- <el-table-column prop="" label="库房区域" align="center" >
        </el-table-column> -->
			<el-table-column prop="MANAGERNAME" label="库管" align="center" >
			</el-table-column>
			<el-table-column prop="MANAGERMOBILE" label="库管电话" align="center" >
			</el-table-column>
			<el-table-column prop="GROUPNAME" label="所属分组" align="center" >
			</el-table-column>
			<el-table-column prop="MANAGERREGION" label="库管区域" align="center" >
			</el-table-column>
			<el-table-column prop="MANAGERADDRESS" label="库管地址" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID,scope.row.MANAGERID)" title="详情" :disabled="scope.row.ISDELETE == '1' ? true : false">
						<i :class="scope.row.ISDELETE == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.ISDELETE == '1' ? true : false" title="编辑">
						<i :class="scope.row.ISDELETE == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.ISDELETE == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.ISDELETE == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<!-- <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.ISDELETE == '1' ? true : false">
                        <i :class="scope.row.ISDELETE == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
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
						<span class="formTile">库房信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ stoThisList.STORAGENAME }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房级别:</dt>
							<dd>{{ stoThisList.STORAGELEVEL == undefined ? '暂无' : stoThisList.STORAGELEVEL }}</dd>
						</dl>

						<dl class="dllist" style="margin-bottom:10px;">
							<dt>上级库房:</dt>
							<dd>{{ stoThisList.PARENTNAME == undefined ? '暂无' : stoThisList.PARENTNAME}}</dd>
						</dl>
						<!-- <dl class="dllist" style="margin-bottom:10px;">
                               <dt>库房区域:</dt>
                               <dd>{{ '暂无' }}</dd>
                            </dl> -->
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库管:</dt>
							<dd>{{ stoThisList.MANAGERNAME == undefined ? '暂无' : stoThisList.MANAGERNAME }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库管电话:</dt>
							<dd>{{ stoThisList.MANAGERMOBILE == undefined ? '暂无' : stoThisList.MANAGERMOBILE }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属分组:</dt>
							<dd>{{ stoThisList.GROUPNAME == undefined ? '暂无' : stoThisList.GROUPNAME }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库管区域:</dt>
							<dd>{{ stoThisList.MANAGERREGION == undefined ? '暂无' : stoThisList.MANAGERREGION}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库管地址:</dt>
							<dd>{{ stoThisList.MANAGERADDRESS == undefined ? '暂无' : stoThisList.MANAGERADDRESS}}</dd>
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
							<dd>{{stoThisList.CREATEDATE == null ? "暂无" :fmtdata.formatDate.format(new Date(stoThisList.CREATEDATE), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{stoThisList.UPDATEDATE == null ? "暂无" :fmtdata.formatDate.format(new Date(stoThisList.UPDATEDATE), 'yyyy-MM-dd') }}</dd>
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
						<el-form-item label="库房名称" prop="storagename" ref="storagename">
							<el-input v-model="editForm.storagename" auto-complete="off" @blur="checkout('storagename',editForm.storagename,0)"></el-input>
						</el-form-item>
						<el-form-item label="库房级别" prop="storagelevel">
							<el-select v-model="editForm.storagelevel" filterable placeholder="请选择库房级别" clearable>
								<el-option v-for="item in stoOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上级库房" prop="parentname" v-show="editForm.storagelevel != '1'">
							<el-select v-model="editForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择上级库房" clearable remote :remote-method="parChangeSelect">
								<el-option v-for="item in parlist" :key="item.STORAGENAME" :label="item.STORAGENAME" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="库房区域" prop="addressAll">
                                    <el-cascader
                                                          placeholder="请选择省/市/区"
                                                          v-model="editForm.addressAll"
                                                          :options="prOptions"
                                                          filterable
                                                          clearable
                                                          change-on-select
                                                        ></el-cascader>
                                                    </el-form-item> -->
					</el-col>
					<el-col :span="12">
						<el-form-item label="库管人员" prop="managername">
							<el-select v-model="editForm.employeename" filterable placeholder="请选择库管人员" @visible-change="empChange" @change="handleSelectName" :loading="empLoading" filterable clearable value-key="employeename">
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item">
							    </el-option>
							  </el-select>
							<!-- <el-autocomplete class="inline-input searchInput" v-model="editForm.managername" :fetch-suggestions="querySearchName" placeholder="请选择库管" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete> -->
						</el-form-item>
						<el-form-item label="库管电话" prop="managermobile">
							<el-input v-model="editForm.managermobile" disabled auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="库管区域" prop="addressAllMag">
							<el-input v-model="editForm.managerregion" disabled auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="库管地址" prop="manageraddress">
							<el-input v-model="editForm.manageraddress" disabled auto-complete="off"></el-input>
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
						<el-form-item label="库房名称" prop="storagename" ref="storagename">
							<el-input v-model="addForm.storagename" auto-complete="off" @blur="checkout('storagename',addForm.storagename,0)"></el-input>
						</el-form-item>
						<el-form-item label="库房级别" prop="storagelevel">
							<el-select v-model="addForm.storagelevel" filterable placeholder="请选择库房级别" clearable>
								<el-option v-for="item in stoOptions" :key="item.label" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上级库房" prop="parentname" v-show="addForm.storagelevel == '2' || addForm.storagelevel == '3'">
							<el-select v-model="addForm.parentname" @visible-change="parChange" :loading="parLoading" filterable placeholder="请选择上级库房" clearable remote :remote-method="parChangeSelect">
								<el-option v-for="item in parlist" :key="item.STORAGENAME" :label="item.STORAGENAME" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="库房区域" prop="addressAll">
                                <el-cascader
                                                  placeholder="请选择省/市/区"
                                                  clearable
                                                  v-model="addForm.addressAll"
                                                  :options="prOptions"
                                                  filterable
                                                  change-on-select
                                                ></el-cascader>
                                            </el-form-item> -->
					</el-col>
					<el-col :span="12">
						<el-form-item label="库管人员" prop="managername">
							<el-select v-model="addForm.employeename" filterable placeholder="请选择库管人员" @visible-change="empChange" @change="handleSelectName" :loading="empLoading" filterable clearable value-key="employeename">
							    <el-option
							      v-for="item in empOptions"
							      :key="item.id"
							      :label="item.employeename"
							      :value="item">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="库管电话" prop="managermobile">
							<el-input v-model="addForm.managermobile" disabled auto-complete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="所属分组" prop="groupname">
                             <el-input v-model="addForm.groupname" disabled auto-complete="off"></el-input>
                         </el-form-item> -->
						<el-form-item label="库管区域" prop="managerregion">
							<el-input v-model="addForm.managerregion" disabled auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="库管地址" prop="manageraddress">
							<el-input v-model="addForm.manageraddress" disabled auto-complete="off"></el-input>
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

	import { getStorageInfoList, addStorageInfo, modifyStorageInfo, removeStorageInfo, getSelectListSto, getDeptManagerInfoList, getStorageInfoListSelect, getNamebyUserid, getCheckoutOfStoInfo } from '../../api/api';

	export default {
		name:'StorageInfo',
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
			return {
				fmtdata: util,
				prOptions: util.initProvince(),
				filters: {
					domSearch: [{
						select: ['STORAGENAME'],
						content: ''
					}], //查询框
					ISDELETE: '0',
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
				pickerOptions: { //日期
				},
				empLoading:false,
				empOptions:[],//员工列表
				listData: [],
				parlist: [], //上级库房列表
				parLoading: false,
				customers: [],
				total: 0,
				currentPage: 0,
				createname: "",
				updatename: "",
				pageSize: 15,
				listLoading: false,
				stoThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: '', //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					storagename: [{
							required: true,
							message: '请输入库房名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					managername: [{
							required: true,
							message: '请输入库管名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					storagelevel: [{
						required: true,
						message: '请选择库房级别',
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					act_id: '',
					storagecode: '',
					storagename: '',
					storagelevel: '',
					parentname: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isdelete: '',
					addressAll: '',
					managerid: '',
					managername: '',
					managermobile: '',
					managerregion: '',
					manageraddress: '',
				},
				editFormId: {
					parentid: '',
					storageid: '',
					value: '',
					managerid: '',
					managername: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					storagename: [{
							required: true,
							message: '请输入库房名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					managername: [{
							required: true,
							message: '请输入库管名称',
							trigger: 'blur'
						},
						{
							validator: checkChinese,
							trigger: 'blur'
						}
					],
					storagelevel: [{
						required: true,
						message: '请选择库房级别',
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					act_id: '',
					act_status: '',
					parentname: '',
					storagecode: '',
					storagename: '',
					storagelevel: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isdelete: 0,
					addressAll: '',
					managerid: '',
					managername: '',
					managermobile: '',
					managerregion: '',
					manageraddress: '',
				},
			}
		},
		methods: {
			// 员工——搜索下拉
			empChange(r) {
				if(!r || this.empOptions.length > 0) return;
				this.empLoading = true;
				let para = {
					notStorageManager: 'y',
					isenable: 1,
					showCount:10000
				}
				getDeptManagerInfoList(para).then((res) => {
					this.empOptions = res.data.data.records;
					this.empLoading = false;
				});
			},
			handleSelectName(value) {
				this.editForm.managername = value.employeename;
				this.editForm.managerid = value.id;
				this.editForm.managermobile = value.mobile;
				this.editForm.managerregion = value.region;
				this.editForm.manageraddress = value.address;
				this.addForm.managername = value.employeename;
				this.addForm.managerid = value.id;
				this.addForm.managermobile = value.mobile;
				this.addForm.managerregion = value.region;
				this.addForm.manageraddress = value.address;
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
				getCheckoutOfStoInfo(paras).then((res) => {
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
			formDetailHandle(stoid, magid) {
				this.formDialogTableVisible = true;
				this.stoThisList = ''; //清空上条数据
				// 获取当前库房信息
				let para = {
					id: stoid
				}
				nanobar.go(70);
				getStorageInfoList(para).then((res) => {
					this.stoThisList = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.stoThisList.CREATEBY == null ? 0 : this.stoThisList.CREATEBY,
						updateby: this.stoThisList.UPDATEBY == null ? 0 : this.stoThisList.UPDATEBY,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
				});
			},
			// 库管——搜索下拉
			// querySearchName(queryString, cb) {
			// 	let para = {
			// 			notStorageManager: 'y',
			// 			employeename: queryString,
			// 			isenable: 1
			// 		},
			// 		MagNameArray = [];
			// 	getDeptManagerInfoList(para).then((res) => {
			// 		res.data.data.records.forEach(function(item, index) {
			// 			MagNameArray.push({
			// 				value: item.employeename,
			// 				id: item.id,
			// 				mobile: item.mobile,
			// 				region: item.region,
			// 				address: item.address
			// 			});
			// 		});
			// 		cb(MagNameArray);
			// 	});
			// },
			// handleSelectName(item) {
			// 	this.editForm.managername = item.value;
			// 	this.editForm.managerid = item.id;
			// 	this.editForm.managermobile = item.mobile;
			// 	this.editForm.managerregion = item.region;
			// 	this.editForm.manageraddress = item.address;
			// 	this.addForm.managername = item.value;
			// 	this.addForm.managerid = item.id;
			// 	this.addForm.managermobile = item.mobile;
			// 	this.addForm.managerregion = item.region;
			// 	this.addForm.manageraddress = item.address;
			// },
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
				this.filters.ISDELETE = i;
				this.handleQuery();
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.ISDELETE == 1 ? '否' : row.ISDELETE != undefined ? '是' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.ISDELETE == 1) {
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
						isdelete: row.ISDELETE == 0 ? 1 : 0,
						isactive:1
					}
					modifyStorageInfo(para).then((res) => {
						if(para.isdelete == 1) {
							if(res.data.result.code == 4001) {
								this.$message({
									message: res.data.result.desc,
									type: 'warning'
								});
							} else {
								this.$message({
									message: '设置成功',
									type: 'success'
								});
								row.ISDELETE = para.isdelete;
							}
						} else {
							this.$message({
								message: '设置成功',
								type: 'success'
							});
							row.ISDELETE = para.isdelete;
						}
					}).catch(() => {
						this.listLoading = false;
					});
				});
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
			// 上级库房——下拉
			parChangeSelect(query) {
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
			//有效转换
			isactiveFomat(row, col) {
				return row.isactive == 1 ? '是' : '否';
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
					isdelete: this.filters.ISDELETE,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListSto(para).then((res) => {
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
					isdelete: this.filters.ISDELETE,
				};
				this.listLoading = true;
				getStorageInfoList(para).then((res) => {
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
					removeStorageInfo(para).then((res) => {
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
				var addrVal = row.area;
				if(addrVal != null) {
					var addrArr = addrVal.split(",");
				} else {
					var addrArr = ["四川", "成都", "高新区"];
				}
				this.editForm = {
					id: row.ID,
					storagecode: row.STORAGECODE,
					storagename: row.STORAGENAME,
					storagelevel: row.STORAGELEVEL,
					parentname: row.PARENTNAME,
					createdate: row.CREATEDATE,
					createby: row.CREATEBY,
					updatedate: row.UPDATEDATE,
					updateby: row.UPDATEBY,
					isdelete: row.ISDELETE,
					addressAll: addrArr, //区域
					managerid: row.MANAGERID,
					managername: row.MANAGERNAME,
					managermobile: row.MANAGERMOBILE,
					managerregion: row.MANAGERREGION,
					manageraddress: row.MANAGERADDRESS,
				}
				this.editFormId = {
					parentid: row.PARENTID,
					parentname: row.PARENTNAME,
					storageid: row.STORAGEID,
					storagelevel: row.STORAGELEVEL,
					value: row.value,
					managerid: row.MANAGERID,
					managername: row.MANAGERNAME,
				}
				this.thisInput = this.editForm.storagename; //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					storagecode: '',
					storagename: '',
					storagelevel: '',
					parentname: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isdelete: 0,
					addressAll: ["四川", "成都", "高新区"],
					managerid: '',
					managername: '',
					managermobile: '',
					managerregion: '',
					manageraddress: '',
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							storagename: this.editForm.storagename,
							storagelevel: this.editForm.storagelevel,
							parentid: this.editForm.parentname,
							createdate: this.editForm.createdate,
							createby: this.editForm.createby,
							updatedate: this.editForm.updatedate,
							updateby: this.editForm.updateby,
							// area:this.editForm.addressAll.toString(),
							managerid: this.editForm.managerid,
							managername: this.editForm.managername,
							managermobile: this.editForm.managermobile,
							manageraddress: this.editForm.manageraddress,
						}
						if(this.editFormId.parentname == this.editForm.parentname) {
							para.parentid = this.editFormId.parentid;
						} else {
							para.parentid = this.editForm.parentname;
						}
						if(this.editFormId.storagelevel == this.editForm.storagelevel) {
							para.storagelevel = this.editFormId.value;
						} else {
							para.storagelevel = this.editForm.storagelevel;
						}
						if(para.storagelevel == 1) {
							para.parentid = ''; //清空父级
						}
						if (para.managerid == '') {
							this.$message({
								message: '此库管人员已有库房或库管无效！',
								type: 'error'
							});
							this.editLoading = false;
							return;
						}
						console.log(para)
						modifyStorageInfo(para).then((res) => {
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
							storagename: this.addForm.storagename,
							storagelevel: this.addForm.storagelevel,
							parentid: this.addForm.parentname,
							createdate: this.addForm.createdate,
							createby: this.addForm.createby,
							updatedate: this.addForm.updatedate,
							updateby: this.addForm.updateby,
							isdelete: this.addForm.isdelete,
							// area:this.addForm.addressAll.toString(),
							managerid: this.addForm.managerid,
							managername: this.addForm.managername,
							managermobile: this.addForm.managermobile,
							manageraddress: this.addForm.manageraddress,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							if(para.managerid == '') {
								this.$message({
									message: '此库管人员已有库房或当前库管无效！',
									type: 'warning'
								});
								this.addLoading = false;
							} else {
								addStorageInfo(para).then((res) => {
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
					removeStorageInfo(para).then((res) => {
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