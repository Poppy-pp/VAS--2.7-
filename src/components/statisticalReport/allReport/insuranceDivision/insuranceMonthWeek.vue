<!--* 
* @description: 保险部-月报
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
					<el-form-item prop="searchKey">
						<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
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
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport1" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listData" highlight-current-row style="width: 100%;">
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="ISSUEMONTH" label="日期" align="center">
				</el-table-column>
				<el-table-column prop="INSURANCECORP" label="保险公司" align="center">
				</el-table-column>
				<el-table-column prop="CORPPROVINCE" label="地区" align="center">
				</el-table-column>
				<el-table-column prop="INSU_COUNT" label="累计出单数量" align="center" >
				</el-table-column>
				<el-table-column prop="INSU_PRICE" label="累计保费" align="center" :formatter="saveNum" >
				</el-table-column>
				<el-table-column prop="INSU_VEHICLEPRICE" label="累计车价" align="center" >
				</el-table-column>
				<el-table-column prop="AVG_PRICE" label="平均车价(万元)" align="center" :formatter="saveNum" >
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
					<el-form-item prop="searchKey">
						<el-input v-model="filtersTwo.searchKey" @keyup.enter.native="getDataTwo" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="week">
						<el-date-picker @change="changeTimeTwo" :picker-options="pickerOptions" v-model="filtersTwo.week" type="week" format="yyyy 第 WW 周" placeholder="选择周"></el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getDataTwo">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport2" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listDataTwo" highlight-current-row style="width: 100%;" >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="CORPPROVINCE" label="区域" align="center">
				</el-table-column>
				<el-table-column prop="INSURANCE_COMPANY" label="保险公司" align="center">
				</el-table-column>
				<el-table-column :label="week ? week : '周'" align="center" >
					<el-table-column label="周一" align="center">
						<el-table-column prop="COUNT_WK1" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK1" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周二" align="center">
						<el-table-column prop="COUNT_WK2" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK2" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周三" align="center">
						<el-table-column prop="COUNT_WK3" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK3" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周四" align="center">
						<el-table-column prop="COUNT_WK4" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK4" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周五" align="center">
						<el-table-column prop="COUNT_WK5" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK5" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周六" align="center">
						<el-table-column prop="COUNT_WK6" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK6" label="保费" align="center"></el-table-column>
					</el-table-column>
					<el-table-column label="周日" align="center">
						<el-table-column prop="COUNT_WK7" label="已出单" align="center"></el-table-column>
						<el-table-column prop="PRICE_WK7" label="保费" align="center"></el-table-column>
					</el-table-column>
				</el-table-column>
				<el-table-column label="本周出单统计" align="center">
					<el-table-column prop="TOTAL_COUNT" label="已出单" align="center"></el-table-column>
					<el-table-column prop="TOTAL_PRICE" label="保费" align="center"></el-table-column>
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChangeTwo" background @current-change="handleCurrentChangeTwo" :current-page="currentPageTwo" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="totalTwo">
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
					searchKey:'',
				},
				filtersTwo:{
					week:new Date(),
					searchKey:'',
				},
				week:util.getWeekScope(new Date()),
				total: 0,
				currentPage: 1,
				totalTwo: 0,
				currentPageTwo: 1,
				pageSize: 15,
				listData:[],//表格数据
				listDataTwo:[],
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
			handleClick(val){
				if (val == 2) {
					this.getDataTwo();
				}else{
					this.getData();
				}
			},
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
				window.location.href = '/vasms-web/api/v1/bi/biInsurance/export_insuMonth?_viewName=VW_BI_INSURANCE_MONTH&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMM') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMM') : '') : '') + '&showCount=' + 20000;
			},
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biInsurance/export_insuWeek?_viewName=VW_BI_INSURANCE_WEEK&token=' + this.$store.getters.userInfo.token  + '&searchKey=' + this.filtersTwo.searchKey 
					+ '&starttime=' + (this.filtersTwo.week == null ? '' : (util.formatDate.format(new Date(util.getWeekScope(new Date(this.filtersTwo.week)).split(' ~ ')[0]), 'yyyyMMdd')))
					+ '&endtime=' + (this.filtersTwo.week == null ? '' : (util.formatDate.format(new Date(util.getWeekScope(new Date(this.filtersTwo.week)).split(' ~ ')[1]), 'yyyyMMdd'))) + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         startDate: '',
		                         searchKey:'',
		                },
		                this.filtersTwo = {
		                	week:new Date(),
		                	searchKey:'',
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
			//切换当前页
			handleCurrentChangeTwo(val) {
				this.currentPageTwo = val;
				this.getDataTwo();
			},
			//切换每页显示数量
			handleSizeChangeTwo(val) {
				this.pageSize = val;
				this.getDataTwo();
			},
			//获取用户列表
			getData() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMM') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMM') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biInsurance/getInsuMonth', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			//获取用户列表
			getDataTwo() {
				let para = {
					currentPage: this.currentPageTwo,
					showCount: this.pageSize,
					searchKey: this.filtersTwo.searchKey,
					starttime     : this.filtersTwo.week == null ? '' : util.formatDate.format(new Date(util.getWeekScope(new Date(this.filtersTwo.week)).split(' ~ ')[0]), 'yyyyMMdd'),
					endtime        : this.filtersTwo.week == null ? '' : util.formatDate.format(new Date(util.getWeekScope(new Date(this.filtersTwo.week)).split(' ~ ')[1]), 'yyyyMMdd'),
				};
				let totalLoading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biInsurance/getInsuWeek', {params: para}).then((res) => {
					this.listDataTwo = res.data.data.records;
					this.totalTwo = res.data.data.totalResult;
					totalLoading.close();//关闭加载
				}).catch((error) => {
					totalLoading.close();//关闭加载
				});
			},
			/*所属公司——下拉*/
		            corpChange(r) {
		                if(!r || this.corpOptions.length > 0) return;
		                let para = {
		                    showCount: 30
		                }
		                this.corploading = true;
		                axios.get('/vasms-web/api/v1/org/corporateInfo/getAllCorpName', {params: para}).then((res) => {
		                    this.corpOptions = res.data.data.records;
		                    this.corploading = false;
		                });
		            },
			// 所属公司-远程搜索
			corpRemoteMethod(query) {
			        	let para = {
					showCount: 30,
					corpname: query,
				}
				this.corploading = true;
				axios.get('/vasms-web/api/v1/org/corporateInfo/getAllCorpName', {params: para}).then((res) => {
					this.corpOptions = res.data.data.records;
					this.corploading = false;
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
				this.getData();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>