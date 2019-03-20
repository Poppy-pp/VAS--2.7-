<!--* 
* @description: 易盗车型管理
* @author: pl 
* @update: pl
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
									<el-option label="品牌" value="brand"></el-option>
									<el-option label="车系" value="serious"></el-option>
									<el-option label="车型" value="model"></el-option>
									<el-option label="年款" value="yeartomarket"></el-option>
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
										<el-option label="品牌" value="brand"></el-option>
										<el-option label="车系" value="serious"></el-option>
										<el-option label="车型" value="model"></el-option>
										<el-option label="年款" value="yeartomarket"></el-option>
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
		<el-table stripe :max-height="windowOutHeight-165" border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="brand" label="品牌" align="center" >
			</el-table-column>
			<el-table-column prop="serious" label="车系" align="center" >
			</el-table-column>
			<el-table-column prop="model" label="车型" align="center" >
			</el-table-column>
			<el-table-column prop="yeartomarket" label="年款" align="center" :formatter="dateFormatterThird" width="80" >
			</el-table-column>
			<el-table-column prop="effectivedate" label="起始日期" :formatter="dateFormatter" width="110" align="center" >
			</el-table-column>
			<el-table-column prop="expirydate" label="截止日期" :formatter="dateFormatterSecond" width="110" align="center" >
			</el-table-column>
			<el-table-column prop="remark" label="备注" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id || scope.row.ID)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index,scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
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
		<el-col :span="24" class="toolbar ipmt5">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">易盗车型信息</span>
					</el-col>
					<el-col :span="14">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>品牌:</dt>
							<dd>{{ EasyStealThisList.brand }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车系:</dt>
							<dd>{{ EasyStealThisList.serious }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车型:</dt>
							<dd>{{ EasyStealThisList.model }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>年款:</dt>
							<dd>{{ EasyStealThisList.yeartomarket }}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>起始日期:</dt>
							<dd>{{ EasyStealThisList.effectivedate == null ? "" :fmtdata.formatDate.format(new Date(EasyStealThisList.effectivedate ), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>截止日期:</dt>
							<dd>{{ EasyStealThisList.expirydate == null ? "" :fmtdata.formatDate.format(new Date(EasyStealThisList.expirydate ), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ EasyStealThisList.remark}}</dd>
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
							<dd>{{ createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{EasyStealThisList.createdate == null ? "" :fmtdata.formatDate.format(new Date(EasyStealThisList.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{EasyStealThisList.updatedate == null ? "" :fmtdata.formatDate.format(new Date(EasyStealThisList.updatedate), 'yyyy-MM-dd') }}</dd>
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
						<el-form-item label="品牌" prop="brand">
							<el-select v-model="editForm.brand" @visible-change="brandChange" :loading="brandLoading" filterable placeholder="请选择车辆品牌" clearable @change="sendBrandIdData">
								<el-option v-for="item in brandlist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车系" prop="serious">
							<el-select v-model="editForm.serious" @visible-change="seriousChange" :loading="seriousLoading" filterable placeholder="请选择车系" clearable @change="sendSeriousIdData">
								<el-option v-for="item in seriouslist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车型" prop="model">
							<el-select v-model="editForm.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable>
								<el-option v-for="item in modellist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="年款" prop="yeartomarket">
							<el-date-picker v-model="editForm.yeartomarket" type="year" placeholder="选择年" @change="changeYear">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="起始日期" prop="effectivedate">
							<el-date-picker v-model="editForm.effectivedate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="截止日期" prop="expirydate">
							<el-date-picker v-model="editForm.expirydate" type="date" placeholder="选择日期" :picker-options="pickerOptions2">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input v-model="editForm.remark" auto-complete="off"></el-input>
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
						<el-form-item label="品牌" prop="brand">
							<el-select v-model="addForm.brand" @visible-change="brandChange" :loading="brandLoading" filterable placeholder="请选择车辆品牌" clearable @change="sendBrandIdData">
								<el-option v-for="item in brandlist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车系" prop="serious">
							<el-select v-model="addForm.serious" @visible-change="seriousChange" :loading="seriousLoading" filterable placeholder="请选择车系" clearable @change="sendSeriousIdData">
								<el-option v-for="item in seriouslist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车型" prop="model">
							<el-select v-model="addForm.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable>
								<el-option v-for="item in modellist" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="年款" prop="yeartomarket">
							<el-date-picker v-model="addForm.yeartomarket" type="year" placeholder="选择年">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="起始日期" prop="effectivedate">
							<el-date-picker v-model="addForm.effectivedate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="截止日期" prop="expirydate">
							<el-date-picker v-model="addForm.expirydate" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input v-model="addForm.remark" auto-complete="off"></el-input>
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
	import { getEasyStealList, addEasySteal, modifyEasySteal, removeEasySteal, getSelectListEasySteal, getDeptManagerInfoList, getAllInfoList,getNamebyUserid } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['brand'],
						content: ''
					}], //查询框
					isdelete: '0'
				},
			            pickerOptions1: {//结束日期
			                disabledDate: (time) => {
			                    return time.getTime() < this.addForm.effectivedate;
			                }
			            },
			            pickerOptions2: {//结束日期
			                disabledDate: (time) => {
			                    return time.getTime() < this.editForm.effectivedate;
			                }
			            },
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				brandlist: [], //品牌列表
				seriouslist: [], //车系列表
				modellist: [], //车型列表
				brandLoading: false, //品牌
				seriousLoading: false, //车系
				modelLoading: false, //车型s
				EasyStealThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					brand: [{
						required: true,
						message: "请输入品牌",
						trigger: 'blur'
					}],
					serious: [{
						required: true,
						message: "请输入车系",
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'blur'
					}],
					yeartomarket: [{
						required: true,
						message: "请选择年款",
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					id: '',
					brand: '',
					serious: '',
					model: '',
					yeartomarket: '',
					effectivedate: '',
					expirydate: '',
					remark: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					brand: [{
						required: true,
						message: "请输入品牌",
						trigger: 'blur'
					}],
					serious: [{
						required: true,
						message: "请输入车系",
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'blur'
					}],
					yeartomarket: [{
						required: true,
						message: "请选择年款",
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					brand: '',
					serious: '',
					model: '',
					yeartomarket: '',
					effectivedate: '',
					expirydate: '',
					remark: '',
					isdelete: 0,
				},
				createname: "",
				updatename: "",
			}
		},
		methods: {
			// 选择品牌时，匹配车系，传brandid
			sendBrandIdData(val) {
				this.addForm.serious = ''; //清空车系
				this.addForm.model = ''; //清空车型
				// this.editForm.serious='';//清空车系
				// this.editForm.model='';//清空车型

				let para = {
					showCount: 1000,
					brand: val,
					value: 'serious',
				}
				getAllInfoList(para).then((res) => {
					this.seriouslist = res.data.data.records;
				});
			},
			// 选择车系时，匹配车型
			sendSeriousIdData(val) {
				this.addForm.model = ''; //清空车型
				// this.editForm.model='';//清空车型
				let para = {
					showCount: 1000,
					serious: val,
					value: 'model',
				}
				getAllInfoList(para).then((res) => {
					this.modellist = res.data.data.records;
				});
			},
			/*品牌——下拉*/
			brandChange(r) {
				if(!r || this.brandlist.length > 0) return;
				this.brandLoading = true;

				let para = {
					value: 'brand',
					showCount: 1000,
				}
				getAllInfoList(para).then((res) => {
					this.brandlist = res.data.data.records;
					this.brandLoading = false;
				});
			},
			//车系——搜索下拉
			seriousChange(r) {
				if(!r || this.seriouslist.length > 0) return;
				this.seriousLoading = true;

				let para = {
					value: 'serious',
				}
				getAllInfoList(para).then((res) => {
					// this.seriouslist = res.data.data.records;//未选择品牌时不获取车系信息
					this.seriousLoading = false;
				});
			},
			/*车型——下拉*/
			modelChange(r) {
				if(!r || this.modellist.length > 0) return;
				this.modelLoading = true;

				let para = {
					value: 'model',
				}
				getAllInfoList(para).then((res) => {
					console.log(res)
					// this.modellist = res.data.data.records;//未选择车系时不获取车型信息
					this.modelLoading = false;
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
			formDetailHandle(brandID) {
				this.formDialogTableVisible = true;
				this.EasyStealThisList = ''; //清空上条数据
				this.createname = "";
				this.updatename = "";
				// 获取当前分组信息
				let para = {
					id: brandID
				}
				nanobar.go(70);
				getEasyStealList(para).then((res) => {
					this.EasyStealThisList = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.EasyStealThisList.createby == null ? 0 : this.EasyStealThisList.createby,
						updateby: this.EasyStealThisList.updateby == null ? 0 : this.EasyStealThisList.updateby,
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
				this.GetPositions();
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
					modifyEasySteal(para).then((res) => {
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
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.effectivedate == "" || row.effectivedate == undefined) return;
				return util.formatDate.format(new Date(row.effectivedate), 'yyyy-MM-dd');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.expirydate == "" || row.expirydate == undefined) return;
				return util.formatDate.format(new Date(row.expirydate), 'yyyy-MM-dd');
			},
			//时间转换3
			dateFormatterThird: function(row, col) {
				if(row.yeartomarket == "" || row.yeartomarket == undefined) return;
				return util.formatDate.format(new Date(row.yeartomarket), 'yyyy');
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
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListEasySteal(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取列表
			GetPositions() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getEasyStealList(para).then((res) => {
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

					removeEasySteal(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.GetPositions();
						// this.handleQuerySelect();
					});
				}).catch(() => {

				});
			},
			// 选择年款，格式化
			changeYear(val){
				this.editForm.yeartomarket = util.formatDate.format(val, 'yyyy');
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.id || row.ID,
					brand: row.brand,
					serious: row.serious,
					model: row.model,
					yeartomarket: row.yeartomarket,
					effectivedate: row.effectivedate,
					expirydate: row.expirydate,
					remark: row.remark,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					brand: '',
					serious: '',
					model: '',
					yeartomarket: '',
					effectivedate: '',
					expirydate: '',
					remark: '',
					isdelete: 0,
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							brand: this.editForm.brand,
							serious: this.editForm.serious,
							model: this.editForm.model,
							yeartomarket: this.editForm.yeartomarket,
							effectivedate: this.editForm.effectivedate,
							expirydate: this.editForm.expirydate,
							remark: this.editForm.remark,
							isdelete: this.editForm.isdelete,
						}

						modifyEasySteal(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.GetPositions();
							// this.handleQuerySelect();
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
							brand: this.addForm.brand,
							serious: this.addForm.serious,
							model: this.addForm.model,
							yeartomarket: util.formatDate.format(this.addForm.yeartomarket, 'yyyy'),
							effectivedate: this.addForm.effectivedate,
							expirydate: this.addForm.expirydate,
							remark: this.addForm.remark,
							isdelete: this.addForm.isdelete,
						}
						addEasySteal(para).then((res) => {
							this.addLoading = false;
							if (res.data.result.code == 0 ) {
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.addFormVisible = false;
								this.$refs['addForm'].resetFields();
								this.GetPositions();
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
					removeEasySteal(para).then((res) => {
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