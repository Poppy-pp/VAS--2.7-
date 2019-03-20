<!--* 
* @description: 车型管理
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
									<el-option label="外观颜色" value="wgys"></el-option>
									<el-option label="颜色码" value="wgysm"></el-option>
									<el-option label="年款" value="yeartomarket"></el-option>
									<el-option label="首字母" value="firstcategory"></el-option>
									<el-option label="状态" value="salestatus"></el-option>
									<el-option label="厂商指导价" value="standardprice"></el-option>
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
										<el-option label="外观颜色" value="wgys"></el-option>
										<el-option label="颜色码" value="wgysm"></el-option>
										<el-option label="年款" value="yeartomarket"></el-option>
										<el-option label="首字母" value="firstcategory"></el-option>
										<el-option label="状态" value="salestatus"></el-option>
										<el-option label="厂商指导价" value="standardprice"></el-option>
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
			<el-table-column prop="brand" label="品牌" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="serious" label="车系" align="center" >
			</el-table-column>
			<el-table-column prop="model" label="车型" align="center" >
			</el-table-column>
			<el-table-column prop="wgys" label="外观颜色" align="center" >
			</el-table-column>
			<el-table-column prop="wgysm" label="颜色码" align="center" >
			</el-table-column>
			<el-table-column prop="yeartomarket" label="年款" align="center" :formatter="dateFormatterThird" width="80" >
			</el-table-column>
			<el-table-column prop="firstcategory" label="首字母" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="salestatus" label="状态" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="standardprice" label="厂商指导价(万)" width="140" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情">
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index,scope.row)" title="编辑" disabled>
						<i class="iconfont icon-bianji1 operate operate-bianji"></i>
					</el-button>
					<!--         <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" >
                        <i class="iconfont icon-p-delet operate operate-p-delet"></i>
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
						<span class="formTile">车型信息</span>
					</el-col>
					<el-col :span="14">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>品牌:</dt>
							<dd>{{ VehTypeThisList.brand }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车系:</dt>
							<dd>{{ VehTypeThisList.serious }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车型:</dt>
							<dd>{{ VehTypeThisList.model }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>颜色:</dt>
							<dd>{{ VehTypeThisList.wgys == undefined ? '暂无' : VehTypeThisList.wgys}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>颜色码:</dt>
							<dd>{{ VehTypeThisList.wgysm == undefined ? '暂无' : VehTypeThisList.wgysm}}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>年款:</dt>
							<dd>{{ VehTypeThisList.yeartomarket == null ? "暂无" :fmtdata.formatDate.format(new Date(VehTypeThisList.yeartomarket), 'yyyy') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>首字母:</dt>
							<dd>{{ VehTypeThisList.firstcategory == undefined ? '暂无' : VehTypeThisList.firstcategory }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ VehTypeThisList.salestatus == undefined ? '暂无' : VehTypeThisList.salestatus }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>厂商指导价:</dt>
							<dd>{{ VehTypeThisList.standardprice == undefined ? '暂无' : VehTypeThisList.standardprice}}</dd>
						</dl>
					</el-col>
				</el-row>

				<!-- <el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
                         <el-col :span="24">
                                <span class="formTile">创建信息</span>
                         </el-col>
                        <el-col :span="6">
                                 <dl class="dllist" style="margin-bottom:10px;">
                                   <dt>创建人:</dt>
                                  <dd>{{ VehTypeThisList.createby}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="6">
                            <dl class="dllist" style="margin-bottom:10px;">
                                   <dt>创建日期:</dt>
                                  <dd>{{VehTypeThisList.createdate == null ? "" :fmtdata.formatDate.format(new Date(VehTypeThisList.createdate), 'yyyy-MM-dd') }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="6">
                            <dl class="dllist" style="margin-bottom:10px;">
                                   <dt>修改人:</dt>
                                  <dd>{{VehTypeThisList.updateby}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="6">
                            <dl class="dllist" style="margin-bottom:10px;">
                                   <dt>修改日期:</dt>
                                  <dd>{{VehTypeThisList.updatedate == null ? "" :fmtdata.formatDate.format(new Date(VehTypeThisList.updatedate), 'yyyy-MM-dd') }}</dd>
                            </dl>
                        </el-col>
                    </el-row> -->
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-collapse v-model="activeNames">
					<el-collapse-item title="基础信息" name="1">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="品牌" prop="brand">
									<el-autocomplete class="inline-input searchInput" v-model="editForm.brand" :fetch-suggestions="querySearchBrand" placeholder="请输入品牌" :trigger-on-focus="false" @select="handleSelectBrand" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="车系" prop="serious">
									<el-autocomplete class="inline-input searchInput" v-model="editForm.serious" :fetch-suggestions="querySearchSerious" placeholder="请输入车系" :trigger-on-focus="false" @select="handleSelectSerious" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="车型" prop="model">
									<el-autocomplete class="inline-input searchInput" v-model="editForm.model" :fetch-suggestions="querySearchModel" placeholder="请输入车型" :trigger-on-focus="false" @select="sendColorIdData" clearable>
									</el-autocomplete>
								</el-form-item>
								<el-form-item label="年款" prop="yeartomarket">
									<el-date-picker v-model="editForm.yeartomarket" type="year" placeholder="选择年">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="颜色" prop="wgys">
									<div style="display:flex;">
										<el-select v-model="editForm.wgys" clearable @change="changeCarColorAdd" style="flex:1;" placeholder="请选择车辆颜色">
											<el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item">
												<p>
													<div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',marginTop:'7px'}"></div>{{ item.color }}</p>
											</el-option>
										</el-select>
										<el-color-picker style="width:60px;flex:0 0 60px;" v-model="editForm.wgysm"></el-color-picker>
									</div>
								</el-form-item>

							</el-col>
							<el-col :span="12">
								<el-form-item label="颜色码" prop="wgysm">
									<el-input v-model="editForm.wgysm" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="首字母" prop="firstcategory">
									<el-select v-model="editForm.firstcategory" @visible-change="firstChange" :loading="firstLoading" filterable placeholder="请选择首字母" clearable>
										<el-option v-for="item in firstlist" :key="item" :label="item" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="状态" prop="salestatus">
									<el-radio-group v-model="editForm.salestatus">
										<el-radio-button label="在售">在售</el-radio-button>
										<el-radio-button label="停售">停售</el-radio-button>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="厂商指导价(万)" prop="standardprice">
									<el-input v-model="editForm.standardprice" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="详细信息" name="2">
					</el-collapse-item>
				</el-collapse>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-collapse v-model="activeNames">
					<el-collapse-item title="基础信息" name="1">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="品牌" prop="brand">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.brand" :fetch-suggestions="querySearchBrand" placeholder="请输入品牌" :trigger-on-focus="false" @select="handleSelectBrand" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="车系" prop="serious">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.serious" :fetch-suggestions="querySearchSerious" placeholder="请输入车系" :trigger-on-focus="false" @select="handleSelectSerious" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="车型" prop="model">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.model" :fetch-suggestions="querySearchModel" placeholder="请输入车型" :trigger-on-focus="false" @select="sendColorIdData" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="年款" prop="yeartomarket">
									<el-date-picker v-model="addForm.yeartomarket" type="year" placeholder="选择年">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="颜色" prop="wgys">
									<div style="display:flex;">
										<el-input v-model="addForm.wgys" auto-complete="off"></el-input>
										<el-color-picker style="width:60px;flex:0 0 60px;" v-model="addForm.wgysm"></el-color-picker>
									</div>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="颜色码" prop="wgysm">
									<el-input v-model="addForm.wgysm" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="首字母" prop="firstcategory">
									<el-select v-model="addForm.firstcategory" @visible-change="firstChange" :loading="firstLoading" filterable placeholder="请选择首字母" clearable>
										<el-option v-for="item in firstlist" :key="item" :label="item" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="厂商指导价(万)" prop="standardprice">
									<el-input v-model="addForm.standardprice" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
					<el-collapse-item title="详细信息" name="2">
					</el-collapse-item>
				</el-collapse>
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
	import { getVehTypeList, addVehType, modifyVehType, removeVehType, getSelectListVehType, getAllInfoList, getAllColorList, getFirstcategoryList, getModelListInfo1 } from '../../api/api';

	export default {
		name:'VehicleType',
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
				pickerOptions: { //日期
				},
				listData: [],
				carColor: [], //车型颜色
				activeNames: ['1'],
				firstlist: [], //首字母列表
				firstLoading: false, //
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
				VehTypeThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					brand: [{
						required: true,
						message: "请选择品牌",
						trigger: 'blur'
					}], 
					serious: [{
						required: true,
						message: "请选择车系",
						trigger: 'blur'
					}], 
					model: [{
						required: true,
						message: "请选择车型",
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
					firstcategory: '',
					salestatus: '',
					wgys: '',
					wgysm: '',
					standardprice: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					brand: [{
						required: true,
						message: "请选择品牌",
						trigger: 'blur'
					}], 
					serious: [{
						required: true,
						message: "请选择车系",
						trigger: 'blur'
					}], 
					model: [{
						required: true,
						message: "请选择车型",
						trigger: 'blur'
					}], 
				},
				//新增界面数据
				addForm: {
					brand: '',
					serious: '',
					model: '',
					yeartomarket: '',
					firstcategory: '',
					salestatus: '在售',
					wgys: '',
					wgysm: '',
					standardprice: '',
				},
			}
		},
		methods: {
			// 新增——品牌——搜索下拉
			querySearchBrand(queryString, cb) {
				let para = {
						brand: queryString,
						value: 'brand'
					},
					brandArray = [];
				getAllInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						brandArray.push({
							value: item
						});
					});
					cb(brandArray);
				});
			},
			handleSelectBrand(item) {
				this.addForm.brand = item.value;
			},
			// 新增——车系——搜索下拉
			querySearchSerious(queryString, cb) {
				let para = {
						serious: queryString,
						value: 'serious'
					},
					seriousArray = [];
				getAllInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						seriousArray.push({
							value: item
						});
					});
					cb(seriousArray);
				});
			},
			handleSelectSerious(item) {
				this.addForm.serious = item.value;
			},
			// 新增——车型——搜索下拉
			querySearchModel(queryString, cb) {
				let para = {
						model: queryString,
						value: 'model'
					},
					modelArray = [];
				getAllInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						modelArray.push({
							value: item
						});
					});
					cb(modelArray);
				});
			},
			handleSelectModel(item) {
				this.addForm.model = item.value;
			},

			// 编辑——选择品牌时，匹配车系，传brandid
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
			// 编辑——选择车系时，匹配车型
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
			// 编辑——选择车型时，匹配颜色
			sendColorIdData(val) {
				let para = {
					model: val,
				}
				getAllColorList(para).then((res) => {
					let carModelList = [];
					res.data.data.records.forEach((res, index) => {
						if(res.color) {
							res.color.split(";").forEach((color, index) => {
								carModelList.push({
									color: color,
									color_rgb: res.color_rgb.split(";")[index]
								});
							});
						}
					});
					this.carColor = carModelList;
				});
			},
			//编辑——选择车辆颜色
			changeCarColorAdd(v) {
				if(typeof v != "object") return;
				if(this.editFormVisible) {
					this.editForm.wgys = v.color; //存colorname汉字
					this.editForm.wgysm = v.color_rgb; //存color码
				}
				if(this.addFormVisible) {
					this.addForm.wgys = v.color; //存colorname汉字
					this.addForm.wgysm = v.color_rgb; //存color码
				}
			},
			/*编辑——品牌——下拉*/
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
			//编辑——车系——搜索下拉
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
			//车型选择
			handleItemChange(queryString, cb) {
				let para = {
						_viewName: "VW_VAS_WEB_VAS_VEHICLE_MODEL",
						showCount: 30,
						model: queryString
					},
					ownerArray = [];
				getModelListInfo1(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						ownerArray.push({
							value: item.model,
							brand: item.brand,
							serious: item.serious
						});
					});
					cb(ownerArray);
				});
			},
			// 首字母
			firstChange(r) {
				if(!r || this.firstlist.length > 0) return;
				this.firstLoading = true;
				getFirstcategoryList().then((res) => {
					this.firstlist = res.data.data;
					this.firstLoading = false;
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
				this.VehTypeThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: brandID
				}
				nanobar.go(70);
				getVehTypeList(para).then((res) => {
					this.VehTypeThisList = res.data.data.records[0];
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
					modifyVehType(para).then((res) => {
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
					// isdelete:this.filters.isdelete,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListVehType(para).then((res) => {
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
					// isdelete:this.filters.isdelete,
				};
				this.listLoading = true;
				getVehTypeList(para).then((res) => {
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

					removeVehType(para).then((res) => {
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
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.id,
					brand: row.brand,
					serious: row.serious,
					model: row.model,
					yeartomarket: row.yeartomarket,
					firstcategory: row.firstcategory,
					salestatus: row.salestatus,
					wgys: row.wgys,
					wgysm: row.wgysm,
					standardprice: row.standardprice,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					brand: '',
					serious: '',
					model: '',
					yeartomarket: new Date(),
					firstcategory: '',
					salestatus: '在售',
					wgys: '',
					wgysm: '',
					standardprice: '',
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
							// yeartomarket:util.formatDate.format(this.editForm.yeartomarket,'yyyy'),
							yeartomarket: this.editForm.yeartomarket,
							firstcategory: this.editForm.firstcategory,
							salestatus: this.editForm.salestatus,
							wgys: this.editForm.wgys,
							wgysm: this.editForm.wgysm,
							standardprice: this.editForm.standardprice,
						}

						modifyVehType(para).then((res) => {
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
							firstcategory: this.addForm.firstcategory,
							salestatus: this.addForm.salestatus,
							wgys: this.addForm.wgys,
							wgysm: this.addForm.wgysm,
							standardprice: this.addForm.standardprice,
						}
						addVehType(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.GetPositions();
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
					removeVehType(para).then((res) => {
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
		activated() {
			this.GetPositions();
		}
	}
</script>