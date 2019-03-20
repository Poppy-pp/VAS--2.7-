<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入中心区域" v-model="filters.attendcentername"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-200" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="attendcentername" label="考勤中心区域名称" align="center" width="150">
			</el-table-column>
			<el-table-column prop="longitude" label="经度" align="center" width="150">
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" align="center" width="150">
			</el-table-column>
			<el-table-column prop="attendcenteraddress" label="定位地址" align="center"  >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除">
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="考勤中心区域名称" prop="attendcentername">
					<el-input v-model="editForm.attendcentername" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="editForm.longitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="editForm.latitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="定位地址" prop="attendcenteraddress">
					<el-input v-model="editForm.attendcenteraddress" @change="changeMap1" auto-complete="off"></el-input>
				</el-form-item>
				<gdmap1 @draggerMapMarker="draggerMapMarker" :address="editForm.attendcenteraddress" ref="vueAmap1"></gdmap1>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="考勤中心区域名称" prop="attendcentername">
					<el-input v-model="addForm.attendcentername" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="addForm.longitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="addForm.latitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="定位地址" prop="attendcenteraddress">
					<el-input v-model="addForm.attendcenteraddress" @change="changeMap" auto-complete="off"></el-input>
				</el-form-item>
				<gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import gdmap from 'components/map/gdmap';
	import gdmap1 from 'components/map/gdmap1';
	import { getAttdCenterList, addAttdCenter, modifyAttdCenter, removeAttdCenter, getSelectAttdCenterList } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		components: {
			gdmap,
			gdmap1
		},
		data() {
			return {
				filters: {
					attendcentername:'',
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					attendcentername: '',
					longitude: '',
					latitude: '',
					attendcenteraddress: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					attendcentername: '',
					longitude: '',
					latitude: '',
					attendcenteraddress: '',
				},
			}
		},
		methods: {
			changeMap() {
				this.$refs.vueAmap.geocoder(this.addForm.attendcenteraddress, (res) => {
					this.addForm.longitude = res.location.lng;
					this.addForm.latitude = res.location.lat;
				});
			},
			changeMap1() {
				this.$refs.vueAmap1.geocoder(this.editForm.attendcenteraddress, (res) => {
					this.editForm.longitude = res.location.lng;
					this.editForm.latitude = res.location.lat;
				});
			},
			//拖拽地图小点返回的地址
			draggerMapMarker(address, lnglatXY, type) {
				if(this.addFormVisible) {
					this.addForm.attendcenteraddress = address;
					this.addForm.longitude = lnglatXY[0];
					this.addForm.latitude = lnglatXY[1];
				}
				if(type == 2) {
					this.editForm.attendcenteraddress = address;
					this.editForm.longitude = lnglatXY[0];
					this.editForm.latitude = lnglatXY[1];
				}
			},
			//查询清空
			clearAll() {
				this.filters = {
					attendcentername:'',
				} //清空查询框;
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					attendcentername: this.filters.attendcentername,
				};
				this.listLoading = true;
				getAttdCenterList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				this.listLoading = true;
				getAttdCenterList(para).then((res) => {
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
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeAttdCenter(para).then((res) => {
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
				this.editForm = {
					id: row.id,
					attendcentername: row.attendcentername,
					longitude: row.longitude,
					latitude: row.latitude,
					attendcenteraddress: row.attendcenteraddress,
				}
				this.editFormVisible = true;
				this.$nextTick(function(){
					this.$refs.vueAmap1.geocoder(this.editForm.attendcenteraddress, (res) => {
						this.editForm.longitude = res.location.lng;
						this.editForm.latitude = res.location.lat;
					});
				});
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					attendcentername: '',
					longitude: '',
					latitude: '',
					attendcenteraddress: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							attendcentername: this.editForm.attendcentername,
							longitude: this.editForm.longitude,
							latitude: this.editForm.latitude,
							attendcenteraddress: this.editForm.attendcenteraddress
						}
						modifyAttdCenter(para).then((res) => {
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
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							attendcentername: this.addForm.attendcentername,
							longitude: this.addForm.longitude,
							attendcenteraddress: this.addForm.attendcenteraddress,
							latitude: this.addForm.latitude,
						}
						addAttdCenter(para).then((res) => {
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
					//NProgress.start();
					let para = {
						ids: ids,
						method: "delete"
					};
					removeAttdCenter(para).then((res) => {
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
		},

	}
</script>