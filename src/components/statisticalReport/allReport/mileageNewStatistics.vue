<!--* 
* @description: 里程统计表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section class="tab_content-wrapper yewu">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item prop="searchKey">
					<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
				</el-form-item>
				<el-form-item prop="CORPNAME">
					<el-cascader
					  placeholder="公司名称"
					  :options="corpOptions"
					  change-on-select clearable filterable
					  v-model="filters.CORPNAME"
					  @change="handleChange"
					  :props="props"
					></el-cascader>
				</el-form-item>
				<el-form-item prop="startDate" label="查询日期">
				            <el-date-picker
					            v-model="filters.startDate"
					            type="daterange"
					            range-separator="至"
					            start-placeholder="开始日期"
					            end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="calend_time" label="节假日">
					<el-select v-model="filters.calend_time" multiple clearable placeholder="请选择节假日">
					    <el-option
					      v-for="item in calend_timeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row  style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="CORPNAME" label="公司名称" align="center">
			</el-table-column>
			<el-table-column prop="LICENSEPLATENUM" label="车牌号" align="center" width="90">
			</el-table-column>
			<el-table-column prop="VIN" label="车架号" align="center" width="160">
			</el-table-column>
			<el-table-column prop="PRODNUM" label="设备号" align="center" width="130">
			</el-table-column>
			<el-table-column prop="NAME" label="车主" align="center" width="80">
			</el-table-column>
			<el-table-column prop="MOBILE" label="车主电话" align="center" width="100">
			</el-table-column>
			<el-table-column prop="MODEL" label="车型" align="center">
			</el-table-column>
			<el-table-column prop="QUERYMILE" label="行驶里程(KM)" align="center" :formatter="saveNum1" width="100">
			</el-table-column>
			<el-table-column prop="TOTALMILE" label="总里程(KM)" align="center" :formatter="saveNum2" width="100">
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
.el-form-item.small {width: 10%;}
</style>

<script>
	import util from '../../../common/js/util.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				filters: {
					searchKey:'',
					startDate: '',
					CORPNAME:'',
					calend_time:['WORK','HOLIDAY','WEEKEND'],
				},
				corpname:'',
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				corpOptions:[],//所属公司
				corploading:false,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				calend_timeOptions:[
					{
						label:'工作日',
						value:'WORK',
					},
					{
						label:'法定节假日',
						value:'HOLIDAY',
					},
					{
						label:'周末',
						value:'WEEKEND',
					}
				],
				props: {
				          value: 'corpname',
				          label: 'corpname',
				          children: 'children'
				}
			}
		},
		methods: {
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biAfterSale/exportTo?_viewName=VW_RPT_TAGGROUP_GZQL_M&token=' + this.$store.getters.userInfo.token + '&showCount=' + 20000
					+ '&searchKey=' + this.filters.searchKey 
					+ '&calend_time=' + this.filters.calend_time 
					+ '&CORPNAME=' + this.corpname 
					+ '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '');
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
		                         startDate: '',
				corpname:'',
				calend_time:[],
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
					corpname:this.corpname,
					calend_time:this.filters.calend_time.join(','),
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biAfterSale/getMileTotal', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},

			// 格式转换
			dateFormatter1(row, col) {
				if(row.declaredate == undefined) return '--';
				return util.formatDate.format(new Date(row.declaredate), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.installactualdate == undefined) return '--';
				return util.formatDate.format(new Date(row.installactualdate), 'yyyy-MM-dd');
			},
			saveNum1(row, col) {//保留两位小数
				return row.QUERYMILE.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				return row.TOTALMILE.toFixed(2);
			},
			/*所属公司——下拉*/
		            corpChange() {
		                this.corploading = true;
		                axios.get('/vasms-web/api/v1/bi/biAfterSale/getCorp').then((res) => {
		                    this.corpOptions = res.data.data;
		                    this.corploading = false;
		                });
		            },
			// 级联选择器
			handleChange(value) {
			        this.corpname = value.join('-');
			},
		},
		created(){
			this.$nextTick(function(){
				this.getData();
				this.corpChange();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>