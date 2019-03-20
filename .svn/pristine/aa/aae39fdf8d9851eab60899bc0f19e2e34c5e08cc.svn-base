<!--* 
* @description: 人力行政-考勤明细
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item prop="searchKey">
					<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
				</el-form-item>
				<el-form-item prop="deptname" class="small">
					<el-select v-model="filters.deptname" clearable filterable placeholder="所属部门" @visible-change="deptChange"  :loading="deptloading">
						<el-option v-for="item in deptOptions" :key="item.deptname" :label="item.deptname" :value="item.deptname">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="startDate" label="考勤日期">
				            <el-date-picker
					            v-model="filters.startDate"
					            type="daterange"
					            range-separator="至"
					            start-placeholder="开始日期"
					            end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row  style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="DEPTNAME" label="部门" align="center" width="100">
			</el-table-column>
			<el-table-column prop="EMPLOYEENAME" label="员工姓名" align="center" width="100">
			</el-table-column>
			<el-table-column prop="ATTENDDATE" label="日期" align="center" :formatter="dateFormatter1"  width="100">
			</el-table-column>
			<el-table-column prop="IN_TIME" label="签到时间" align="center" :formatter="dateFormatter2" width="150">
			</el-table-column>
			<el-table-column prop="IN_ADDRESS" label="签到地址" align="center">
			</el-table-column>
			<el-table-column prop="OUT_TIME" label="签退时间" align="center" :formatter="dateFormatter3" width="150">
			</el-table-column>
			<el-table-column prop="OUT_ADDRESS" label="签退地址" align="center">
			</el-table-column>
			<el-table-column prop="ATTDRESULT" label="考勤结果" align="center" width="130">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<style>
</style>

<script>
	import util from '../../../../common/js/util.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				filters: {
					searchKey:'',
					deptname:'',
					startDate: '',
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				listDataTwo:[],//表格数据
				corpOptions:[],//所属公司
				corploading:false,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				deptOptions:[],//所属部门
				deptloading:false,

			}
		},
		methods: {
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biAttd/export_attdDetail?_viewName=VW_BI_ATTD_DETAIL&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&deptname=' + this.filters.deptname + '&showCount=' + 20000
					+ '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd') : '') : '');
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
		                         deptname:'',
				startDate: '',
		                }
		            },
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getData();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getData();
			},
			//获取用户列表
			getData() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					deptname:this.filters.deptname,
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAttd/getAttdDetailList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.ATTENDDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.ATTENDDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.IN_TIME == undefined) return '--';
				return util.formatDate.format(new Date(row.IN_TIME), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatter3(row, col) {
				if(row.OUT_TIME == undefined) return '--';
				return util.formatDate.format(new Date(row.OUT_TIME), 'yyyy-MM-dd hh:mm:ss');
			},
			/*所属部门——下拉*/
		            deptChange(r) {
		                if(!r || this.deptOptions.length > 0) return;
		                let para = {
		                    showCount: 30,
		                    domSearch: [{select: ['corpname'],content: '万网'}]
		                }
		                this.deptloading = true;
		                axios.get('/vasms-web/api/v1/org/departmentInfo/query/like', {params: para}).then((res) => {
		                    this.deptOptions = res.data.data.records;
		                    this.deptloading = false;
		                });
		            },
			// 所属部门-远程搜索
			// deptRemoteMethod(query) {
			//         	let para = {
			// 		showCount: 30,
			// 		deptname: query,
			// 	}
			// 	this.deptloading = true;
			// 	axios.get('/vasms-web/api/v1/org/departmentInfo?dicvalue=DeptName', {params: para}).then((res) => {
			// 		this.deptOptions = res.data.data.records;
			// 		this.deptloading = false;
			// 	});
			// }
		},
		created(){
			this.$nextTick(function(){
				this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>