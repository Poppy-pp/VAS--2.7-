<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
				<el-row :gutter="10" class="colflex">
					<el-col :span="4">
						<el-form-item prop="employeename" class="sf100">
							<el-input v-model="filters.employeename" @keyup.native.enter="handleQuery" placeholder="请输入操作人姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="startDate" class="sf100">
							<el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<!--  <el-col :span="8">
				        <el-form-item prop="vin" class="sf100">
				            <el-input v-model="filters.vin" @keyup.native.enter="handleQuery" placeholder="请输入(车架号/车牌号)"></el-input>
				        </el-form-item>
					</el-col> -->
				</el-row>
				<div class="colflex1">
					<el-form-item style="float:right;margin-right:0;">
						<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
						<el-button @click="resetForm('filters')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-170" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column prop="id" width="80" align="center" label="编号">
			</el-table-column>
			<el-table-column prop="" align="center" width="180" label="操作对象">
				<template slot-scope="scope">
					<span v-if="scope.row.parname">
						{{ scope.row.parname }}
					</span>
					<span v-if="scope.row.resname">
						{{ ":"+scope.row.resname }} 
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="actiontype" align="center" width="80" label="操作方式">
				<template slot-scope="scope">
					{{ scope.row.actiontype }}
				</template>
			</el-table-column>
			<el-table-column prop="logtime" align="center"  width="180" :formatter="dateFormatter" label="操作时间">
			</el-table-column>
			<el-table-column prop="employeename" align="center" width="100" label="操作人">
			</el-table-column>
			<el-table-column prop="logdesc" align="center" label="描述">
			</el-table-column>
			<el-table-column label="操作" align="center" width="80">
				<template scope="scope">
					<el-button size="small" @click="showDetails(scope.$index, scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="记录详情" :modal-append-to-body="false" :visible.sync="recordFormVisible" :close-on-click-modal="false">
			<!--列表-->
			<el-table border stripe :data="dlistData" highlight-current-row v-loading="dlistLoading" style="width: 100%;">
				<el-table-column type="index" label="#" width="35" align="center">
				</el-table-column>
				<el-table-column prop="columnname" align="center" label="字段">
				</el-table-column>
				<el-table-column prop="beforevaluedesc" align="center" label="字段前值">
				</el-table-column>
				<el-table-column prop="aftervaluedesc" align="center" label="字段后值">
				</el-table-column>
			</el-table>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getOperationRecordList, getOperationRecordDetails } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					startDate: '',
					vin: '',
					employeename: ''
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
				return util.formatDate.format(new Date(row.logtime), 'yyyy-MM-dd hh:mm:ss');
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