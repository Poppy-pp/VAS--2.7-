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
									<el-option label="产品型号" value="prodmodel"></el-option>
									<el-option label="产品类别" value="prodspec"></el-option>
									<el-option label="产品分类" value="prodcategory"></el-option>
									<el-option label="产品单位" value="produnit"></el-option>
									<el-option label="产品名称" value="proddesc"></el-option>
									<el-option label="协议类型" value="protocolname"></el-option>
									<el-option label="保险设备" value="insuranceflag"></el-option>
									<el-option label="常规设备" value="normalflag"></el-option>
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
										<el-option label="产品型号" value="prodmodel"></el-option>
										<el-option label="产品类别" value="prodspec"></el-option>
										<el-option label="产品分类" value="prodcategory"></el-option>
										<el-option label="产品单位" value="produnit"></el-option>
										<el-option label="产品名称" value="proddesc"></el-option>
										<el-option label="协议类型" value="protocolname"></el-option>
										<el-option label="保险设备" value="insuranceflag"></el-option>
										<el-option label="常规设备" value="normalflag"></el-option>
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
							<el-switch v-model="filters.isactive" active-color="#00c1de" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" border stripe :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="prodmodel" label="产品型号" align="center" >
			</el-table-column>
			<el-table-column prop="prodspec" label="产品类别" align="center" >
			</el-table-column>
			<el-table-column prop="prodcategory" label="产品分类" :formatter="prodspecFormat" align="center" >
			</el-table-column>
			<el-table-column prop="produnit" label="产品单位" align="center" >
			</el-table-column>
			<el-table-column prop="proddesc" label="产品名称" align="center" >
			</el-table-column>
			<el-table-column prop="protocolname" label="协议名称" align="center" >
			</el-table-column>
			<el-table-column prop="insuranceflag" label="保险设备" :formatter="prodInsFormat" align="center" >
			</el-table-column>
			<el-table-column prop="normalflag" label="常规设备" :formatter="prodFormat" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive == '0' ? true : false" title="编辑">
						<i :class="scope.row.isactive == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isactive == "0" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isactive == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
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

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">设备类型信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>产品型号:</dt>
							<dd>{{ prodModelData.prodmodel }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>产品类别:</dt>
							<dd>{{ prodModelData.prodspec }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>产品分类:</dt>
							<dd>{{ prodModelData.prodcategory == 'E' ? '设备' : prodModelData.prodcategory == 'C' ? '卡' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>产品单位:</dt>
							<dd>{{ prodModelData.produnit }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>产品名称:</dt>
							<dd>{{ prodModelData.proddesc }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议类型:</dt>
							<dd>{{ prodModelData.protocolname}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否保险设备:</dt>
							<dd>{{ prodModelData.insuranceflag == 'Y' ? '是' : prodModelData.insuranceflag == 'N' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否常规设备:</dt>
							<dd>{{ prodModelData.normalflag == 'Y' ? '是' : prodModelData.normalflag == 'N' ? '否' : '' }}</dd>
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
							<dd>{{prodModelData.createdate == null ? "" :fmtdata.formatDate.format(new Date(prodModelData.createdate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{prodModelData.updatedate == null ? "" :fmtdata.formatDate.format(new Date(prodModelData.updatedate), 'yyyy-MM-dd') }}</dd>
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
						<el-form-item label="产品型号" prop="prodmodel">
							<el-input v-model="editForm.prodmodel" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="产品类别" prop="prodspec">
							<el-select v-model="editForm.prodspec" placeholder="请选择">
								<el-option v-for="item in prodOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="产品分类" prop="prodcategory">
							 <el-radio-group v-model="editForm.prodcategory">
							    <el-radio-button label="E">设备</el-radio-button>
							    <el-radio-button label="C">卡</el-radio-button>
							</el-radio-group>
						</el-form-item> -->
						<el-form-item label="产品单位" prop="produnit">
							<el-input v-model="editForm.produnit" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品名称" prop="proddesc">
							<el-input v-model="editForm.proddesc" disabled auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="协议类型" prop="protocolname">
							<el-select v-model="editForm.protocolname" @visible-change="protocolChange" :loading="protocolLoading" filterable placeholder="请选择协议类型" clearable>
								<el-option v-for="item in protocollist" :key="item.protocolname" :label="item.protocolname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否常规设备" prop="normalflag">
							<el-radio-group v-model="editForm.normalflag">
								<el-radio class="radio" label="Y">是</el-radio>
								<el-radio class="radio" label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否保险设备" prop="insuranceflag">
							<el-radio-group v-model="editForm.insuranceflag">
								<el-radio class="radio" label="Y">是</el-radio>
								<el-radio class="radio" label="N">否</el-radio>
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
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="产品型号" prop="prodmodel">
							<el-input v-model="addForm.prodmodel" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="产品类别" prop="prodspec">
							<el-select v-model="addForm.prodspec" placeholder="请选择">
								<el-option v-for="item in prodOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="产品分类" prop="prodcategory">
							 <el-radio-group v-model="addForm.prodcategory">
							    <el-radio-button label="E">设备</el-radio-button>
							    <el-radio-button label="C">卡</el-radio-button>
							</el-radio-group>
						</el-form-item> -->
						<el-form-item label="产品单位" prop="produnit">
							<el-input v-model="addForm.produnit" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品名称" prop="proddesc">
							<el-input v-model="addForm.proddesc" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="协议类型" prop="protocolname">
							<el-select v-model="addForm.protocolname" @visible-change="protocolChange" :loading="protocolLoading" filterable placeholder="请选择协议类型" clearable>
								<el-option v-for="item in protocollist" :key="item.protocolname" :label="item.protocolname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否常规设备" prop="normalflag">
							<el-radio-group v-model="addForm.normalflag">
								<el-radio class="radio" label="Y">是</el-radio>
								<el-radio class="radio" label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否保险设备" prop="insuranceflag">
							<el-radio-group v-model="addForm.insuranceflag">
								<el-radio class="radio" label="Y">是</el-radio>
								<el-radio class="radio" label="N">否</el-radio>
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
	import { getProductModelList, addProductModel, modifyProductModel, removeProductModel, getSelectListProdModel, getMoNameList, getProtocolList,getNamebyUserid } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					isactive: '1',
					domSearch: [{
						select: ['prodmodel'],
						content: ''
					}] //查询框
				},
				prOptions: util.initProvince(),
				prodspeclist: [], //设备类别列表
				prodspecLoading: false,
				moNamelist: [], //设备型号列表
				moNameLoading: false, //设备型号
				protocollist: [], //协议列表
				protocolLoading: false, //协议
				prodModelData: [], //详情
				radio: '1',
				prodOptions: [{
					value: '有线',
					label: '有线'
				}, {
					value: '无线',
					label: '无线'
				}, {
					value: '卡',
					label: '卡'
				}, {
					value: '其他',
					label: '其他'
				}],
				value: '',
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData: [],
				listLoading: false,
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {

				},
				//编辑界面数据
				editForm: {
					id: '',
					prodmodel: '',
					prodspec: '',
					// prodcategory:'',
					produnit: '',
					proddesc: '',
					protocolid: '',
					protocolname: '',
					insuranceflag: '',
					normalflag: '',
				},
				editFormId: {
					protocolid: '',
					protocolname: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					prodmodel: '',
					prodspec: '',
					prodcategory: 'E',
					produnit: '',
					proddesc: '',
					protocolid: '',
					protocolname: '',
					insuranceflag: '',
					normalflag: '',
					isactive: 1,
				},
				createname: "",
				updatename: "",
			}
		},
		methods: {
			//协议——搜索下拉
			protocolChange(r) {
				if(!r || this.protocollist.length > 0) return;
				this.protocolLoading = true;
				getProtocolList().then((res) => {
					this.protocollist = res.data.data.records;
					this.protocolLoading = false;
				});
			},
			/*设备型号——下拉*/
			moNameChange(r) {
				if(!r || this.moNamelist.length > 0) return;
				this.moNameLoading = true;
				getMoNameList().then((res) => {
					this.moNamelist = res.data.data.records;
					this.moNameLoading = false;
				});
			},
			/*设备类别——下拉*/
			prodspecChange(r) {
				if(!r || this.prodspeclist.length > 0) return;
				this.prodspecLoading = true;
				getParentInfoList().then((res) => {
					this.prodspeclist = res.data.data.records;
					this.prodspecLoading = false;
				});
			},
			//保险设备显示转换
			prodInsFormat: function(row, col) {
				return row.insuranceflag == 'Y' ? '是' : row.insuranceflag == 'N' ? '否' : '';
			},
			//常规设备显示转换
			prodFormat: function(row, col) {
				return row.normalflag == 'Y' ? '是' : row.normalflag == 'N' ? '否' : '';
			},
			// 
			prodspecFormat: function(row, col) {
				return row.prodcategory == 'E' ? '设备' : row.prodcategory == 'C' ? '卡' : '';
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
			formDetailHandle(data) {
				this.formDialogTableVisible = true;
				this.prodModelData = '';
				this.createname = "";
				this.updatename = "";
				nanobar.go(70);
				this.prodModelData = data;

				let paraThree = {
					createby: this.prodModelData.createby == null ? 0 : this.prodModelData.createby,
					updateby: this.prodModelData.updateby == null ? 0 : this.prodModelData.updateby,
				}
				getNamebyUserid(paraThree).then((res) => {
					this.createname = res.data.data[0];
					this.updatename = res.data.data[1];
				});
				nanobar.go(100);
			},
			// 有效无效开关
			showData(i) {
				this.filters.isactive = i;
				this.handleQuery();
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
						id: row.ID,
						isactive: row.isactive == 0 ? 1 : 0,
					}
					modifyProductModel(para).then((res) => {
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
					isactive: this.filters.isactive,
					domSearch: this.filters.domSearch,
					prodcategory: 'E'
				};
				this.listLoading = true;
				getSelectListProdModel(para).then((res) => {
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
					isactive: this.filters.isactive,
					prodcategory: 'E'
				};
				this.listLoading = true;
				getProductModelList(para).then((res) => {
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
					removeProductModel(para).then((res) => {
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
				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					prodmodel: row.prodmodel,
					prodspec: row.prodspec,
					// prodcategory:row.prodcategory,
					produnit: row.produnit,
					proddesc: row.proddesc,
					protocolname: row.protocolname,
					insuranceflag: row.insuranceflag,
					normalflag: row.normalflag,
				};
				this.editFormId = {
					protocolid: row.protocolid,
					protocolname: row.protocolname,
				}

			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					prodmodel: '',
					prodspec: '',
					prodcategory: 'E',
					produnit: '',
					proddesc: '',
					protocolid: '',
					protocolname: '',
					insuranceflag: 'Y',
					normalflag: 'Y',
					isactive: 1,
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							prodmodel: this.editForm.prodmodel,
							prodspec: this.editForm.prodspec,
							// prodcategory:this.editForm.prodcategory,
							produnit: this.editForm.produnit,
							proddesc: this.editForm.proddesc,
							protocolid: this.editForm.protocolname,
							insuranceflag: this.editForm.insuranceflag,
							normalflag: this.editForm.normalflag,
						}
						if(this.editFormId.protocolname == this.editForm.protocolname) {
							para.protocolid = this.editFormId.protocolid;
						} else {
							para.protocolid = this.editForm.protocolname;
						}
						modifyProductModel(para).then((res) => {
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
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							prodmodel: this.addForm.prodmodel,
							prodspec: this.addForm.prodspec,
							prodcategory: this.addForm.prodcategory,
							produnit: this.addForm.produnit,
							proddesc: this.addForm.proddesc,
							protocolid: this.addForm.protocolname,
							insuranceflag: this.addForm.insuranceflag,
							normalflag: this.addForm.normalflag,
							isactive: parseInt(this.addForm.isactive),
						}
						addProductModel(para).then((res) => {
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeProductModel(para).then((res) => {
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
		created() {
			this.handleQuery();
		},

	}
</script>