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
									<!-- <el-option label="代码" value="code"></el-option> -->
									<el-option label="短信名称" value="name"></el-option>
									<el-option label="短信说明" value="alias"></el-option>
									<el-option label="短息类型" value="type"></el-option>
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
										<!-- <el-option label="代码" value="code"></el-option> -->
										<el-option label="短信名称" value="name"></el-option>
										<el-option label="短信说明" value="alias"></el-option>
										<el-option label="短息类型" value="type"></el-option>
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
							<el-button type="primary" @click="handleQuerySelect" @keyup.native.13="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border max-height="700" :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="code" label="代码" width="700" align="center" >
			</el-table-column>
			<el-table-column prop="name" label="短信名称" align="center" >
			</el-table-column>
			<el-table-column prop="alias" label="短信说明" width="150" align="center" >
			</el-table-column>
			<el-table-column prop="type" label="短信类型" align="center" >
			</el-table-column>
			<!-- <el-table-column prop="createby" label="创建人"  align="center" >
			</el-table-column>
			<el-table-column prop="createdate" label="创建日期" :formatter="dateFormatter"  align="center" >
			</el-table-column> -->
			<!-- <el-table-column prop="updateby" label="修改人"  align="center" >
			</el-table-column>
			<el-table-column prop="updatedate" label="修改日期" :formatter="dateFormatterSecond"  align="center" >
			</el-table-column> -->
			<el-table-column label="操作" align="center">
				<template scope="scope">
					<el-button id="button" @click="handleSend(scope.$index, scope.row)" title='点击发送'>
						<i class='iconfont icon-fasongduilie operate operate-fasongduilie'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--发送界面-->
		<el-dialog title="选择目标号码发送指令" :modal-append-to-body="false" :visible.sync="sendFormVisible" :close-on-click-modal="false">
			<el-form :model="sendForm" :rules="sendFormRules" ref="sendForm">
				<el-form-item label="目标号码" prop="simcardnum">
					<el-input v-model="sendForm.simcardnum" placeholder="请输入目标号码" @change="inputVal"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="sendFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="sendSubmit" :loading="sendLoading">确认发送</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="代码" prop="code">
					<el-input v-model="addForm.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="短信名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="短信说明" prop="alias">
					<el-input v-model="addForm.alias" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="短信类型" prop="type">
					<el-input v-model="addForm.type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建人" prop="createby">
					<el-input v-model="addForm.createby" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="创建日期" prop="createdate">
					<el-date-picker v-model="addForm.createdate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getOrderList, addOrder, modifyOrder, removeOrder, getCustomerInfoList, getOrderLogList, sendOrderLog, getSelectOrderList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					domSearch: [{
						select: [],
						content: ''
					}], //查询框
				},
				pickerOptions: { //日期
				},
				listData: [],
				orderLogList: [], //获取指令记录
				customers: [],
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				sendFormVisible: false, //编辑界面是否显示
				sendLoading: false,
				sendFormRules: {},
				//发送界面数据
				sendForm: {
					id: '',
					simcardnum: '',
					code: '',
					ordercode: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {
					code: '',
					name: '',
					alias: '',
					type: '',
					createby: '',
					updateby: '',
					updatedate: '',
					createdate: '',
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
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.createdate == "" || row.createdate == undefined) return;
				return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.updatedate == "" || row.updatedate == undefined) return;
				return util.formatDate.format(new Date(row.updatedate), 'yyyy-MM-dd');
			},
			handleCurrentChange(val) {
				this.currentPage = val;
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
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectOrderList(para).then((res) => {
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
					showCount: 15,
					name: this.filters.name,
				};
				this.listLoading = true;
				getOrderList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				});
				// 获取指令记录中目标号码列表
				getOrderLogList(para).then((res) => {
					this.orderLogList = res.data.data.records;
				});
			},

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

					// let para = new FormData();
					// para.append('ids',row.id);
					// para.append('method','delete');

					removeOrder(para).then((res) => {
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
			//显示发送界面
			handleSend(index, row) {
				this.sendFormVisible = true;
				this.sendForm = {
					id: row.id,
					code: row.code,
					ordercode: row.code,
					simcardnum: '',
				}
				console.log(this.sendForm)
			},
			// 获取输入框值
			inputVal(val) {
				this.sendForm.simcardnum = val;
			},

			//发送
			sendSubmit() {
				this.$refs.sendForm.validate((valid) => {
					if(valid) {
						this.sendLoading = true;
						let para = {
							id: this.sendForm.id,
							code: this.sendForm.code,
							simcardnum: this.sendForm.simcardnum,
							ordercode: this.sendForm.code,
						}
						sendOrderLog(para).then((res) => {
							this.sendLoading = false;
							this.$message({
								message: '发送成功',
								type: 'success'
							});
							this.$refs['sendForm'].resetFields();
							this.sendFormVisible = false;
							this.handleQuery();
						}).catch((error) => {
							this.sendLoading = false;
						});
					}
				});
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					code: '',
					name: '',
					alias: '',
					type: '',
					createby: '',
					updateby: '',
					updatedate: '',
					createdate: '',
				};

			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							code: this.addForm.code,
							name: this.addForm.name,
							alias: this.addForm.alias,
							type: this.addForm.type,
							createby: this.addForm.createby,
							createdate: this.addForm.createdate,
							updateby: this.addForm.updateby,
							updatedate: this.addForm.updatedate,
						};
						console.log(para);
						addOrder(para).then((res) => {
							this.addLoading = false;
							//NProgress.done();
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
					removeOrder(para).then((res) => {
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
		created() {
			this.handleQuery();
		}
	}
</script>