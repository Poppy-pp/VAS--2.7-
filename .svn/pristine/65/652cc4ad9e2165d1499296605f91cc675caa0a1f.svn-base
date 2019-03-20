<!--* 
* @description: 技术客服部-提成表
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">业务内勤组</el-radio-button>
		                <el-radio-button label="2">正式技术组</el-radio-button>
		                <el-radio-button label="3">兼职技术组</el-radio-button>
		            </el-radio-group>
		</el-col>

		<div v-show="stepState == '1'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item prop="month">
						<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择月份">
						</el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getDataOne">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport1" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table stripe border :data="listDataOne" highlight-current-row style="width: 100%;" >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="ASSIGNBY" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="VEHICLECOUNT" label="车数" align="center" width="120" >
				</el-table-column>
				<el-table-column prop="" label="提供安装派单(车数)" align="center">
				</el-table-column>
				<el-table-column prop="" label="上传货运平台(车数)" align="center" >
				</el-table-column>
				<el-table-column prop="COMMISSION_PERS_STANDARD" label="提成标准(元/车)" align="center"  :formatter="saveNum1"s>
				</el-table-column>
				<el-table-column prop="COMMISSION_PERS" label="个人提成(元)" align="center"  :formatter="saveNum2">
				</el-table-column>
				<el-table-column prop="VEHICLECOUNT_MGT" label="管理提成(车数)" align="center" >
				</el-table-column>
				<el-table-column prop="COMMISSION_MGT_STANDARD" label="管理提成标准(元/车)" align="center"  :formatter="saveNum3">
				</el-table-column>
				<el-table-column prop="COMMISSION_MGT" label="管理提成(元)" align="center"  :formatter="saveNum4">
				</el-table-column>
				<el-table-column prop="COMMISSION_TOTAL" label="提成合计(元)" align="center" :formatter="saveNum5">
				</el-table-column>
				<el-table-column prop="REMARK" label="明细备注" align="center"width="300" >
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="totalOne">
				</el-pagination>
			</el-col>
		</div>

		<div v-show="stepState == '2'">
		    	<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filtersTwo">
					<el-form-item prop="month">
						<el-date-picker @change="changeTimeTwo" :picker-options="pickerOptions" v-model="monthTwo" type="month" placeholder="请选择月份">
						</el-date-picker>
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
				<el-table-column prop="" label="地区" align="center">
				</el-table-column>
				<el-table-column  prop="EMPNAME" label="姓名" align="center">
				</el-table-column>
				<el-table-column  prop="POSITION" label="岗位" align="center">
				</el-table-column>
				<el-table-column prop="EMPSTATUS" label="状态" align="center">
				</el-table-column>
				<el-table-column  label="安装提成基数" align="center">
					<el-table-column  prop="BASE_WIRE_COUNT" label="有线" align="center"></el-table-column>
					<el-table-column  prop="BASE_WIRELESS_COUNT" label="无线" align="center"></el-table-column>
					<el-table-column  prop="BASE_WIRELESSONLY_COUNT" label="独立无线" align="center"></el-table-column>
					<el-table-column  prop="BASE_AFTERSALE_COUNT" label="售后" align="center"></el-table-column>
					<el-table-column  prop="BASE_INSTALLREMOVE_COUNT" label="新装退单拆除" align="center"></el-table-column>
				</el-table-column>
				<el-table-column  label="提成标准" align="center">
					<el-table-column  prop="COMMISSION_STD_WIRE" label="有线设备" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_WIRELESS" label="无线设备" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_WIRELESSONLY" label="独立无线" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_INSTALLREMOVE" label="新装退单拆除(新装加拆除)" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_AFTERSALE" label="售后提成" align="center"></el-table-column>
				</el-table-column>
				<el-table-column  prop="" label="售后汇总车数" align="center">
				</el-table-column>
				<el-table-column  label="管理提成基数" align="center">
					<el-table-column  prop="COMMISSION_MGT_CONTRACT" label="正式工安装台数" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_MGT_PARTTIME" label="兼职人员安装台数" align="center"></el-table-column>
					<el-table-column  prop="TOTAL" label="总计" align="center"></el-table-column>
				</el-table-column>
				<el-table-column prop="BASE_SALARY" label="底薪" align="center">
				</el-table-column>
				<el-table-column label="技术提成" align="center">
					<el-table-column  prop="COMMISSION_TOTAL_INSTALL" label="安装提成" align="center"></el-table-column>
					<el-table-column  prop="" label="补发" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_TOTAL_MGT" label="管理提成" align="center"></el-table-column>
					<el-table-column  prop="INSTMGT" label="提成合计" align="center"></el-table-column>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChangeTwo" background @current-change="handleCurrentChangeTwo" :current-page="currentPageTwo" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="totalTwo">
				</el-pagination>
			</el-col>
		</div>
		<div v-show="stepState == '3'">
		    	<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filtersThree">
					<el-form-item prop="month">
						<el-date-picker @change="changeTimeThree" :picker-options="pickerOptions" v-model="monthThree" type="month" placeholder="请选择月份">
						</el-date-picker>
					</el-form-item>
					<el-button-group>
						<el-button type="primary" icon="el-icon-search" @click="getDataThree">查询</el-button>
						<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
					</el-button-group>
					<el-button type="warning" icon="el-icon-download" @click="handleExport3" style="float:right;">导出</el-button>
				</el-form>
			</el-col>
		
			<!--列表-->
			<el-table stripe border :data="listDataThree" highlight-current-row style="width: 100%;">
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="" label="地区" align="center">
				</el-table-column>
				<el-table-column  prop="EMPNAME" label="姓名" align="center">
				</el-table-column>
				<el-table-column  prop="" label="工资卡号姓名" align="center">
				</el-table-column>
				<el-table-column prop="" label="工资卡号" align="center">
				</el-table-column>
				<el-table-column label="数量(台)" align="center">
					<el-table-column  prop="BASE_WIRE_COUNT" label="有线" align="center"></el-table-column>
					<el-table-column  prop="BASE_WIRELESS_COUNT" label="无线" align="center"></el-table-column>
					<el-table-column  prop="BASE_WIRELESSONLY_COUNT" label="独立无线" align="center"></el-table-column>
					<el-table-column  prop="BASE_AFTERSALE_COUNT" label="售后" align="center"></el-table-column>
					<el-table-column  prop="BASE_INSTALLREMOVE_COUNT" label="新装退单拆除" align="center"></el-table-column>
				</el-table-column>
				<el-table-column label="计算标准" align="center">
					<el-table-column  prop="COMMISSION_STD_WIRE" label="有线" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_WIRELESS" label="无线" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_WIRELESSONLY" label="独立无线" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_INSTALLREMOVE" label="新装退单拆除" align="center"></el-table-column>
					<el-table-column  prop="COMMISSION_STD_AFTERSALE" label="售后提成" align="center"></el-table-column>
					<el-table-column  prop="" label="新装(费用)" align="center"></el-table-column>
					<el-table-column  prop="" label="售后(费用)" align="center"></el-table-column>
					<el-table-column  prop="" label="补发" align="center"></el-table-column>
				</el-table-column>
				<el-table-column  prop="" label="个人提成" align="center">
				</el-table-column>
				<el-table-column  prop="" label="合计金额" align="center">
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination class="fr" @size-change="handleSizeChangeThree" background @current-change="handleCurrentChangeThree" :current-page="currentPageThree" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="totalThree">
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
				month:'',
				monthTwo:'',
				monthThree:'',
				filters: {
					recMonth: util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
				filtersTwo: {
					recMonth: util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
				filtersThree: {
					recMonth:util.formatDate.format(new Date(), 'yyyyMM'),//传参格式
				},
				totalOne: 0,
				currentPage: 1,
				pageSize: 15,
				totalTwo: 0,
				currentPageTwo: 1,
				totalThree: 0,
				currentPageThree: 1,
				listDataOne:[],//表格数据
				listDataTwo:[],//表格数据
				listDataThree:[],//表格数据
				listLoading: false,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				}
			}
		},
		methods: {
			// 点击tab切换事件
			handleClick(val) {
			        if (val == 2) {
					this.getDataTwo();
				}else if (val == 3) {
					this.getDataThree();
				}else{
					this.getDataOne();
				}
			},
			//选择时间
			changeTime(date) {
				if(!date) {
					this.month = '';
					this.filters.recMonth = '';
					return;
				};
				this.month = util.formatDate.format(new Date(date), 'yyyy-MM'),
				this.filters.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			changeTimeTwo(date) {
				if(!date) {
					this.monthTwo = '';
					this.filtersTwo.recMonth = '';
					return;
				};
				this.monthTwo = util.formatDate.format(new Date(date), 'yyyy-MM'),
				this.filtersTwo.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			changeTimeThree(date) {
				if(!date) {
					this.monthThree = '';
					this.filtersThree.recMonth = '';
					return;
				};
				this.monthThree = util.formatDate.format(new Date(date), 'yyyy-MM'),
				this.filtersThree.recMonth = util.formatDate.format(new Date(date), 'yyyyMM');
			},
			/*导出*/
			handleExport1() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export?_viewName=RPT_SVC_COMMISSION_1&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			/*导出*/
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export_commissionC?_viewName=BI_COMMISSION_C&token=' + this.$store.getters.userInfo.token + '&month=' + this.filtersTwo.recMonth + '&showCount=' + 20000;
			},
			/*导出*/
			handleExport3() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export_commissionP?_viewName=BI_COMMISSION_P&token=' + this.$store.getters.userInfo.token + '&month=' + this.filtersThree.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                	this.month = '',//页面显示格式
		                	this.monthTwo = '',//页面显示格式
		                	this.monthThree = '',//页面显示格式
		                this.filters = {
		                	recMonth:util.formatDate.format(new Date(), 'yyyyMM'),
		                } 
		                this.filtersTwo = {
		                	recMonth:util.formatDate.format(new Date(), 'yyyyMM'),
		                } 
		                this.filtersThree = {
		                	recMonth:util.formatDate.format(new Date(), 'yyyyMM'),
		                } 
		            },
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getDataOne();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getDataOne();
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
			//切换当前页
			handleCurrentChangeThree(val) {
				this.currentPageThree = val;
				this.getDataThree();
			},
			//切换每页显示数量
			handleSizeChangeThree(val) {
				this.pageSize = val;
				this.getDataThree();
			},
			//获取用户列表
			getDataOne() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical?_viewName=RPT_SVC_COMMISSION_1', {params: para}).then((res) => {
					this.totalOne = res.data.data.totalResult;
					this.listDataOne = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			getDataTwo() {
				let para = {
					currentPage: this.currentPageTwo,
					showCount: this.pageSize,
					searchKey: this.filtersTwo.searchKey,
					month     : this.filtersTwo.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical/getCommissionC', {params: para}).then((res) => {
					this.totalTwo = res.data.data.totalResult;
					this.listDataTwo = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			getDataThree() {
				let para = {
					currentPage: this.currentPageThree,
					showCount: this.pageSize,
					searchKey: this.filtersThree.searchKey,
					month     : this.filtersThree.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical/getCommissionP', {params: para}).then((res) => {
					this.totalThree = res.data.data.totalResult;
					this.listDataThree = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			// 格式转换
			dateFormatter1(row, col) {
				if(row.declaredate == undefined) return '--';
				return util.formatDate.format(new Date(row.declaredate), 'yyyy/MM/dd');
			},
			saveNum1(row, col) {//保留两位小数
				if (row.COMMISSION_PERS_STANDARD == undefined)return '--';
				return row.COMMISSION_PERS_STANDARD.toFixed(2);
			},
			saveNum2(row, col) {//保留两位小数
				if (row.COMMISSION_PERS == undefined)return '--';
				return row.COMMISSION_PERS.toFixed(2);
			},
			saveNum3(row, col) {//保留两位小数
				if (row.COMMISSION_MGT_STANDARD == undefined)return '--';
				return row.COMMISSION_MGT_STANDARD.toFixed(2);
			},
			saveNum4(row, col) {//保留两位小数
				if (row.COMMISSION_MGT == undefined)return '--';
				return row.COMMISSION_MGT.toFixed(2);
			},
			saveNum5(row, col) {//保留两位小数
				if (row.COMMISSION_TOTAL == undefined)return '--';
				return row.COMMISSION_TOTAL.toFixed(2);
			},
		},
		created(){
			// 默认筛选日期
			this.month = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filters.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');
			this.monthTwo = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filtersTwo.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');
			this.monthThree = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filtersThree.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');

			this.$nextTick(function(){
				this.getDataOne();
			});
			this.windowOutHeight = $(window).height();//初始化列表高度
		},
		activated() {
			this.getData();
		}
	}
</script>