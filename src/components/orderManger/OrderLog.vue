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
									<el-option label="目标号码" value="simcardnum"></el-option>
									<el-option label="短信类型" value="ordertype"></el-option>
									<!-- <el-option label="短信代码" value="ordercode"></el-option> -->
									<el-option label="发送人" value="sendby"></el-option>
									<el-option label="状态" value="status"></el-option>
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
										<el-option label="目标号码" value="simcardnum"></el-option>
										<el-option label="短信类型" value="ordertype"></el-option>
										<!-- <el-option label="短信代码" value="ordercode"></el-option> -->
										<el-option label="发送人" value="sendby"></el-option>
										<el-option label="状态" value="status"></el-option>
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
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-165" stripe :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="simcardnum" label="目标号码" align="center" >
			</el-table-column>
			<el-table-column prop="ordertype" label="短信类型" align="center" >
			</el-table-column>
			<el-table-column prop="ordercode" label="短信代码" align="center" >
			</el-table-column>
			<el-table-column prop="orderdesc" label="短信描述" align="center" >
			</el-table-column>
			<el-table-column prop="sendby" label="发送人" align="center" >
			</el-table-column>
			<el-table-column prop="senddate" label="发送时间" :formatter="dateFormatter" align="center" >
			</el-table-column>
			<el-table-column prop="respcontent" label="响应内容" align="center" >
			</el-table-column>
			<el-table-column prop="resptime" label="响应时间" align="center" >
			</el-table-column>
			<el-table-column prop="responsecode" label="响应代码" align="center" >
			</el-table-column>
			<el-table-column prop="responsedesc" label="响应描述" align="center" >
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center" >
			</el-table-column>
			<el-table-column prop="flag" label="标志" align="center" >
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getOrderLogList, addOrderLog, modifyOrderLog, removeOrderLog, getSelectOrderLogList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					domSearch: [{
						select: ['simcardnum'],
						content: ''
					}], //查询框
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					simcardnum: '',
					ordertype: '',
					ordercode: '',
					orderdesc: '',
					sendby: 0,
					senddate: '2017-01-05',
					responsecode: '',
					responsedesc: '',
					status: '',
					flag: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					simcardnum: '',
					ordertype: '',
					ordercode: '',
					orderdesc: '',
					sendby: 0,
					senddate: '2017-01-05',
					responsecode: '',
					responsedesc: '',
					status: '',
					flag: '',
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
				getSelectOrderLogList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.senddate == "" || row.senddate == undefined) return;
				return util.formatDate.format(new Date(row.senddate), 'yyyy-MM-dd hh:mm:ss');
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: 15,
				};
				this.listLoading = true;
				getOrderLogList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				});
			},
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

					removeOrderLog(para).then((res) => {
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
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					simcardnum: '',
					ordertype: '',
					ordercode: '',
					orderdesc: '',
					sendby: 0,
					senddate: '2017-01-05',
					responsecode: '',
					responsedesc: '',
					status: '',
					flag: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							modifyOrderLog(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							});
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addOrderLog(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							});
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
					removeOrderLog(para).then((res) => {
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

<style scoped>

</style>