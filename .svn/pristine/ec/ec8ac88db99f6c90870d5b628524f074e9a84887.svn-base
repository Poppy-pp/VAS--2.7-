<!--* 
* @description: 技术客服部-周报及本月汇总
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
				<el-form-item prop="month">
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="filters.month" type="month" placeholder="请选择月份">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="week">
					<el-date-picker @change="changeTimeWeek" :picker-options="pickerOptions" v-model="filters.week" type="week" format="yyyy 第 WW 周" placeholder="选择周"></el-date-picker>
				</el-form-item>
				<el-button-group>
					<el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
					<el-button icon="el-icon-refresh"  @click="resetForm">重置</el-button>
				</el-button-group>
				<el-button type="warning" icon="el-icon-download" @click="handleExport" style="float:right;">导出</el-button>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" show-summary >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="REC_AREA" label="省片区" align="center">
			</el-table-column>
			<el-table-column prop="SYS_NHS" label="体系" align="center"
			      :filters="[{ text: '体系外', value: '体系外' }, { text: '集团', value: '集团' }]"
			      :filter-method="filterTagTwo"
			      filter-placement="bottom-end">
			      <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.tag === '体系外' ? 'primary' : 'success'"
			          close-transition>{{scope.row.tag}}</el-tag>
			      </template>
			</el-table-column>
			<el-table-column prop="CUST_ORDER" label="报单客户" align="center" width="120" >
			</el-table-column>
			<el-table-column :label="filters.month + ' 月' + ' ： ' + week" align="center">
				<el-table-column prop="WEEK_MONR" label="传统" align="center" ></el-table-column>
				<el-table-column prop="WEEK_INSU" label="盗抢险" align="center" ></el-table-column>
				<el-table-column prop="WEEK_VEHICLE_NUM" label="车辆数" align="center" ></el-table-column>
				<el-table-column prop="WEEK_ONE_PROD" label="单设备" align="center" ></el-table-column>
				<el-table-column prop="WEEK_DOUBLE_PROD" label="双设备" align="center" ></el-table-column>
				<el-table-column prop="WEEK_THREE_PROD" label="三设备" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column :label="filters.month + ' 月统计'" align="center">
				<el-table-column prop="MONTH_PROD_NUM" label="设备数" align="center" ></el-table-column>
				<el-table-column prop="MONTH_VEHICLE_NUM" label="车辆数" align="center" ></el-table-column>
				<el-table-column prop="MONTH_INSU" label="盗抢险" align="center" ></el-table-column>
				<el-table-column prop="MONTH_DOUBLE_PROD" label="双设备" align="center" ></el-table-column>
				<el-table-column prop="MONTH_THREE_PROD" label="三设备" align="center" ></el-table-column>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination class="fr" @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
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
				filters: {
					searchKey:'',
					month: util.formatDate.format(new Date(), 'yyyy-MM'),
					week: new Date(),
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
				}
			}
		},
		methods: {
			//选择月份
			changeTime(date) {
				if(!date) {
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					this.filters.week = new Date(date);//相应周变化
					this.week = util.getWeekScope(new Date(date));//显示周范围变化
					return;
				};
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
				this.filters.week = new Date(date);//相应周变化
				this.week = util.getWeekScope(new Date(date));//显示周范围变化
			},
			//选择周
			changeTimeWeek(date) {
				if(!date) {
					this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd'); 
					this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');
					return;
				};
				this.week = util.formatDate.format(new Date(date), 'yyyy-MM-dd') + ' ~ ' + util.formatDate.format(new Date(date.getTime() + 6 * 24 * 3600 * 1000), 'yyyy-MM-dd');
				this.filters.month = util.formatDate.format(new Date(date), 'yyyy-MM');//相应月变化
			},
			filterTagTwo(value, row) {
			        return row.tag === value;
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/exportTo?_viewName=周报及本月汇总&token=' + this.$store.getters.userInfo.token + '&BUSINESS_DATE=' + this.filters.recMonth + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
		                         month:util.formatDate.format(new Date(), 'yyyy-MM'),
				week:new Date(),
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
					week:this.filters.week,
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