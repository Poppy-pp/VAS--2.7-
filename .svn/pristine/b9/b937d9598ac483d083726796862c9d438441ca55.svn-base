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
									<el-option label="岗位" value="positionname"></el-option>
									<el-option label="描述" value="positiondesc"></el-option>
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
										<el-option label="岗位" value="positionname"></el-option>
										<el-option label="描述" value="positiondesc"></el-option>
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
		<el-table :max-height="windowOutHeight-165" stripe border :data="positions" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="positionname" label="岗位" align="center" >
			</el-table-column>
			<el-table-column prop="positiondesc" label="描述" align="center" >
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
						<span class="formTile">岗位信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>岗位:</dt>
							<dd>{{ posThisList.positionname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>岗位代码:</dt>
							<dd>{{ posThisList.positioncode == undefined ? '暂无' : posThisList.positioncode }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>岗位描述:</dt>
							<dd>{{ posThisList.positiondesc == undefined ? '暂无' : posThisList.positiondesc}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd>{{ posThisList.corpname == undefined ? '暂无' : posThisList.corpname}}</dd>
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
							<dd>{{posThisList.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(posThisList.createdate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{posThisList.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(posThisList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="岗位名称" prop="positionname" ref="positionname">
					<el-input v-model="editForm.positionname" @blur="checkout('positionname',editForm.positionname,0)"></el-input>
				</el-form-item>
				<el-form-item label="岗位描述" prop="positiondesc">
					<el-input v-model="editForm.positiondesc"></el-input>
				</el-form-item>
				<el-form-item label="所属公司" prop="corpname">
					<el-select v-model="editForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable>
						<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id+''">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="岗位名称" prop="positionname" ref="positionname">
					<el-input v-model="addForm.positionname" @blur="checkout('positionname',addForm.positionname,0)"></el-input>
				</el-form-item>
				<el-form-item label="岗位描述" prop="positiondesc">
					<el-input v-model="addForm.positiondesc"></el-input>
				</el-form-item>
				<el-form-item label="所属公司" prop="corpname">
					<el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable>
						<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id+''">
						</el-option>
					</el-select>
				</el-form-item>
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

	import { getPositionInfoList, addPositionInfo, modifyPositionInfo, removePositionInfo, getSelectListPos, getCorpList, getCheckoutOfPosInfo, getNamebyUserid } from '../../api/api';
	export default {
		name:'PositionInfo',
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['positionname'],
						content: ''
					}], //查询框
					isdelete: '0'
				},
				pickerOptions: { //日期
				},
				positions: [],
				corplist: [], //所属公司
				corpLoading: false, //
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				createname: "",
				updatename: "",
				posThisList: [],
				formDialogTableVisible: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: '', //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					positionname: [{
						required: true,
						message: '请输入岗位',
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
				},
				//编辑界面数据
				editForm: {
					id: '',
					positioncode: '',
					pocoid: '',
					positionname: '',
					positiondesc: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isenable: '',
					isdelete: '',
					corpname: '',
				},
				editFormId: {
					corpid: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					positionname: [{
						required: true,
						message: '请输入岗位',
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					positioncode: '',
					pocoid: '',
					positionname: '',
					positiondesc: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isenable: '',
					isdelete: 0,
					corpname: '',
					corpid: '',
				},
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") {
					this.$refs[p].$el.className = "el-form-item is-error"; //输入框标红
					return;
				}
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfPosInfo(paras).then((res) => {
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
			formDetailHandle(posID) {
				this.createname = "";
				this.updatename = "";
				this.formDialogTableVisible = true;
				this.posThisList = ''; //清空上条数据
				// 获取当前分组信息
				let para = {
					id: posID
				}
				nanobar.go(70);
				getPositionInfoList(para).then((res) => {
					this.posThisList = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.posThisList.createby == null ? 0 : this.posThisList.createby,
						updateby: this.posThisList.updateby == null ? 0 : this.posThisList.updateby,
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
			/*所属公司——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;

				let para = {
					flag: ''
				}
				getCorpList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
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
					modifyPositionInfo(para).then((res) => {
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

			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.createdate == "" || row.createdate == undefined) return;
				return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd');
			},
			//时间转换3
			dateFormatterThird: function(row, col) {
				if(row.updatedate == "" || row.updatedate == undefined) return;
				return util.formatDate.format(new Date(row.updatedate), 'yyyy-MM-dd');
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
				getSelectListPos(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.positions = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			GetPositions() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getPositionInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.positions = res.data.data.records;
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

					removePositionInfo(para).then((res) => {
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
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					pocoid: row.pocoid,
					positioncode: row.positioncode,
					positionname: row.positionname,
					positiondesc: row.positiondesc,
					createdate: row.createdate,
					createby: row.createby,
					updatedate: row.updatedate,
					updateby: row.updateby,
					isdelete: row.isdelete,
					corpname: row.corpname,
				}
				this.editFormId = {
					corpid: row.corpid,
					corpname: row.corpname,
				}
				this.thisInput = this.editForm.positionname; //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					positioncode: '',
					positionname: '',
					positiondesc: '',
					createdate: '',
					createby: '',
					updatedate: '',
					updateby: '',
					isenable: '',
					isdelete: 0,
					corpname: '',
					corpid: '',
				};

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							pocoid: this.editForm.pocoid,
							positioncode: this.editForm.positioncode,
							positionname: this.editForm.positionname,
							positiondesc: this.editForm.positiondesc,
							createdate: this.editForm.createdate,
							createby: this.editForm.createby,
							updatedate: this.editForm.updatedate,
							updateby: this.editForm.updateby,
							isdelete: this.editForm.isdelete,
							corpid: this.editForm.corpname,
						}
						if(this.editFormId.corpname == this.editForm.corpname) {
							para.corpid = this.editFormId.corpid;
						} else {
							para.corpid = this.editForm.corpname;
						}
						modifyPositionInfo(para).then((res) => {
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
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							positioncode: this.addForm.positioncode,
							positionname: this.addForm.positionname,
							positiondesc: this.addForm.positiondesc,
							createdate: this.addForm.createdate,
							createby: this.addForm.createby,
							updatedate: this.addForm.updatedate,
							updateby: this.addForm.updateby,
							isdelete: this.addForm.isdelete,
							corpid: this.addForm.corpname,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addPositionInfo(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.GetPositions();
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
					removePositionInfo(para).then((res) => {
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