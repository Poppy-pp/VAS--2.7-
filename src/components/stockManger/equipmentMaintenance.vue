<!--* 
* @description: 设备检修
* @author: pl
* @update: pl 
*-->
<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
					<el-form-item prop="searchKey" class="sf100">
						<el-input v-model="filters.searchKey" @keyup.native.enter="handleQuery" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="startDate" class="sf100">
						<el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				<div>
					<el-form-item>
						<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
						<el-button icon="el-icon-refresh" @click="resetForm('filters')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-170" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column prop="id" width="80" align="center" label="类型">
			</el-table-column>
			<el-table-column prop="" align="center" label="库存类型">
			</el-table-column>
			<el-table-column prop="" align="center" label="责任人">
			</el-table-column>
			<el-table-column prop="" align="center" label="所属区域">
			</el-table-column>
			<el-table-column prop="logtime" align="center" :formatter="dateFormatter" label="登记时间">
			</el-table-column>
			<el-table-column prop="" align="center" label="设备类型">
			</el-table-column>
			<el-table-column prop="" align="center" label="设备型号">
			</el-table-column>
			<el-table-column prop="" align="center" label="设备编号">
			</el-table-column>
			<el-table-column prop="" align="center" label="通讯卡类型">
			</el-table-column>
			<el-table-column prop="" align="center" label="通讯卡号">
			</el-table-column>
			<el-table-column prop="" align="center" label="ICCID">
			</el-table-column>
			<el-table-column prop="" align="center" label="备注原因">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center" width="230">
				<template scope="scope">
					<el-button-group>
						<el-button class="btn" type="success" size="small" @click="returnFactory()">返厂</el-button>
						<el-button class="btn" type="primary" size="small" @click="recover()">恢复</el-button>
						<el-button class="btn" type="danger" size="small" @click="lose()">丢失</el-button>
						<el-button class="btn" type="info" size="small" @click="scrap()">报损</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="记录详情" :modal-append-to-body="false" :visible.sync="recordFormVisible" :close-on-click-modal="false">
			<!--列表-->
			<el-table border stripe :data="dlistData" highlight-current-row v-loading="dlistLoading" style="width: 100%;">
				<el-table-column type="index" label="#" width="35" align="center">
				</el-table-column>
				<el-table-column prop="actiontable" align="center" label="数据表">
				</el-table-column>
				<el-table-column prop="actioncolumn" align="center" label="字段名">
				</el-table-column>
				<el-table-column prop="columnname" align="center" label="字段注释">
				</el-table-column>
				<el-table-column prop="beforevalue" align="center" label="字段前值">
				</el-table-column>
				<el-table-column prop="aftervalue" align="center" label="字段后值">
				</el-table-column>
			</el-table>
		</el-dialog>
	</section>
</template>

<style type="text/css" media="screen">
	.btn.el-button + .el-button{margin-left: 0;}
</style>

<script>
	import util from '../../common/js/util'
	import { getOperationRecordList, getOperationRecordDetails } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					startDate: '',
					searchKey: ''
				},
				recordFormVisible: false,
				listData: [],
				dlistData: [],
				dlistLoading: false,
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
			}
		},
		methods: {
			// 返厂按钮
			returnFactory(){
				this.$router.push('/equipmentReturnFactoryManger');
			},
			// 恢复设备
			recover(){

			},
			// 丢失设备
			lose(){
				this.$confirm('该设备经核实是否丢失？', '提示', {
				          confirmButtonText: '确认丢失',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '确认丢失'
				          });
				          this.$router.push('/abEquipmentReturnFactoryManger');
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				});
			},
			// 报损设备
			scrap(){
				this.$confirm('该设备经核实是否报损？', '提示', {
				          confirmButtonText: '确认报损',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '确认报损'
				          });
				          this.$router.push('/abEquipmentReturnFactoryManger');
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				});
			},
			//查看日志记录详情
			showDetails(index, row) {
				let para = {
					id: row.id
				};
				this.recordFormVisible = true;
				this.dlistLoading = true;
				getOperationRecordDetails(para).then((res) => {
					this.dlistLoading = false;
					if(res.data.result.code == 0) {
						this.dlistData = res.data.data;
					}
				});
			},
			//格式化后台传来的时间戳
			dateFormatter(row, col) {
				return util.formatDate.format(new Date(row.logtime), 'yyyy-MM-dd');
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//获取操作记录列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					employeename: this.filters.employeename,
					startTime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
					endTime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : ''
				};
				this.listLoading = true;
				getOperationRecordList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
				});
			},
			resetForm() {
				this.filters = {
					startDate: '',
					vin: '',
					employeename: ''
				}
			}
		},
		created() {
			this.handleQuery();
		}
	}
</script>