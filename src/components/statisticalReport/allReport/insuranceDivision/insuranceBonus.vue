<!--* 
* @description: 保险部-提成
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">保险月报</el-radio-button>
		                <el-radio-button label="2">保险周报</el-radio-button>
		            </el-radio-group>
		</el-col>

		<div v-show="stepState == '1'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item prop="startDate" label="查询日期">
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
					<el-button type="warning" icon="el-icon-download" @click="handleExport1" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" show-summary >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="MONTH_INFO" label="体系" align="center">
				</el-table-column>
				<el-table-column prop="INSURANCE_COMPANY" label="地区" align="center">
				</el-table-column>
				<el-table-column prop="REC_AREA" label="出单核保数量" align="center">
				</el-table-column>
				<el-table-column prop="MONTH_ISSUE" label="提成标准(元/单)" align="center" >
				</el-table-column>
				<el-table-column prop="MONTH_PREMIUM" label="数量合计" align="center" :formatter="saveNum" >
				</el-table-column>
				<el-table-column prop="MONTH_PRICE" label="提成(元)" align="center" >
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
				</el-pagination>
			</el-col>
		</div>

		<div v-show="stepState == '2'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filtersTwo">
					<el-form-item prop="startDate" label="查询日期">
					            <el-date-picker
						            v-model="filtersTwo.startDate"
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
					<el-button type="warning" icon="el-icon-download" @click="handleExport2" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" show-summary >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="INSURANCE_COMPANY" label="提成类型" align="center">
				</el-table-column>
				<el-table-column prop="" label="区域" align="center">
				</el-table-column>
				<el-table-column prop="" label="区域" align="center">
				</el-table-column>
				<el-table-column prop="" label="区域" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
				</el-pagination>
			</el-col>
		</div>


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
				stepState:'1',
				filters: {
					startDate: '',
					corpid:'',
				},
				filtersTwo:{
					startDate: '',
					corpid:'',
				},
				week:util.getWeekScope(new Date()),
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				corpOptions:[],//所属公司
				corploading:false,
			}
		},
		methods: {
			handleClick(val){},
			//选择时间
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
			},
			changeTimeTwo(date) {
				if(!date) {
					this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
					return;
				};
				this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
			},
			filterTagTwo(value, row) {
			        return row.tag === value;
			},
			/*导出*/
			handleExport1() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=保险部月报&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '') + '&showCount=' + 20000;
			},
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=保险部周报&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         startDate: '',
		                         corpid:'',
		                },
		                this.filtersTwo = {
		                	startDate: '',
		                	corpid:'',
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
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMMdd') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMMdd') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biInstallDetail/getList', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			// 保留两位小数
			saveNum(row, col) {//保留两位小数
				if (row.NORMPRICE == undefined || row.INSUPRICE == undefined || row.TOTALPRICE == undefined)return;
				return row.NORMPRICE.toFixed(2) || row.INSUPRICE.toFixed(2) || row.TOTALPRICE.toFixed(2);
			},
			
		},
		created(){
			this.$nextTick(function(){
				// this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>