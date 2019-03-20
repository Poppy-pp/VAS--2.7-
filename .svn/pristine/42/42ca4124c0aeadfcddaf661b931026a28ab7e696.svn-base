<!--* 
* @description: 技术客服部-月报及本年汇总
* @author: 蒲琳 
* @update: 蒲琳 
*-->
<template>
	<section>
		<el-col :span="24" class="mb10">
		            <el-radio-group v-model="stepState" @change="handleClick">
		                <el-radio-button label="1">安装量明细</el-radio-button>
		                <el-radio-button label="2">安装量汇总</el-radio-button>
		                <el-radio-button label="3">设备量统计</el-radio-button>
		            </el-radio-group>
		</el-col>
			
		<div v-show="stepState == '1'">
			<!--工具条-->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item prop="searchKey">
						<el-input v-model="filters.searchKey" @keyup.enter.native="getData" placeholder="请输入查询内容"></el-input>
					</el-form-item>
					<el-form-item prop="startDate" label="安装日期">
					            <el-date-picker
						            v-model="filters.startDate"
						            type="daterange"
						            range-separator="至"
						            start-placeholder="开始日期"
						            end-placeholder="结束日期"
						            :picker-options="pickerOptions">
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
				<el-table-column prop="BUSINESS_DATE" label="月份" align="center">
				</el-table-column>
				<el-table-column prop="CORPPROVINCE" label="省片区" align="center">
				</el-table-column>
				<el-table-column prop="CORPNAME" label="报单客户" align="center" width="200" >
				</el-table-column>
				<el-table-column prop="NORMCOUNT" label="传统" align="center" ></el-table-column>
				<el-table-column prop="INSUCOUNT" label="盗抢险" align="center" ></el-table-column>
				<el-table-column prop="VEHICLECOUNT" label="车辆数" align="center" ></el-table-column>
				<el-table-column prop="SINGLECOUNT" label="单设备" align="center" ></el-table-column>
				<el-table-column prop="DOUBLECOUNT" label="双设备" align="center" ></el-table-column>
				<el-table-column prop="TREEBLECOUNT" label="三设备" align="center" ></el-table-column>
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
					<el-form-item prop="startDate" label="安装日期">
					            <el-date-picker
						            v-model="filtersTwo.startDate"
						            type="daterange"
						            range-separator="至"
						            start-placeholder="开始日期"
						            end-placeholder="结束日期"
						            :picker-options="pickerOptions">
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
			<el-table stripe border :data="totalData" highlight-current-row style="width: 100%;" >
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="BUSINESS_DATE" label="月份" align="center">
				</el-table-column>
				<el-table-column prop="CORPPROVINCE" label="省片区" align="center">
				</el-table-column>
				<el-table-column prop="ORDERTYPE" label="体系" align="center"
				      :filters="[{ text: '体系外', value: '体系外' }, { text: '体系内', value: '体系内' }]"
				      :filter-method="filterTag"
				      filter-placement="bottom-end">
				      <template slot-scope="scope">
				        <el-tag
				          :type="scope.row.ORDERTYPE === '体系外' ? 'danger' : 'primary'"
				          close-transition>{{scope.row.ORDERTYPE}}</el-tag>
				      </template>
				</el-table-column>
				<el-table-column prop="NORMCOUNT" label="传统" align="center" ></el-table-column>
				<el-table-column prop="INSUCOUNT" label="盗抢险" align="center" ></el-table-column>
				<el-table-column prop="VEHICLECOUNT" label="车辆数" align="center" ></el-table-column>
				<el-table-column prop="SINGLECOUNT" label="单设备" align="center" ></el-table-column>
				<el-table-column prop="DOUBLECOUNT" label="双设备" align="center" ></el-table-column>
				<el-table-column prop="TREEBLECOUNT" label="三设备" align="center" ></el-table-column>
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
					<el-form-item prop="startDate" label="安装日期">
					            <el-date-picker
						            v-model="filtersThree.startDate"
						            type="daterange"
						            range-separator="至"
						            start-placeholder="开始日期"
						            end-placeholder="结束日期"
						            :picker-options="pickerOptions">
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
			<el-table stripe border :data="prodData" highlight-current-row style="width: 100%;">
				<el-table-column type="index" width="20" align="center" label="#">
				</el-table-column>
				<el-table-column prop="BUSINESSMONTH" label="月份" align="center">
				</el-table-column>
				<el-table-column prop="PRODMODEL" label="设备类型" align="center">
				</el-table-column>
				<el-table-column prop="NUM" label="设备数量" align="center">
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
				filters: {
					searchKey:'',
					startDate: '',
				},
				filtersTwo: {
					startDate: '',
				},
				filtersThree: {
					startDate: '',
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				totalTwo: 0,
				currentPageTwo: 1,
				totalThree: 0,
				currentPageThree: 1,
				listData:[],//表格数据
				prodData:[],//设备数据
				totalData:[],//汇总数据
				prodLoading: false,
				totalLoading: false,
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
					this.getData();
				}
			},
			
			filterTag(value, row) {
			        return row.ORDERTYPE === value;
			},
			/*导出*/
			handleExport1() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export_instarNum?_viewName=BI_TECHNICAL_INSTARNUM&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000
					+ '&starttime=' + (this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMM') : '') : '')
					+ '&endtime=' + (this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMM') : '') : '');
			},
			handleExport2() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export_instarTotal?_viewName=BI_TECHNICAL_INSTARTOTAL&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filtersTwo.searchKey + '&showCount=' + 20000
					+ '&starttime=' + (this.filtersTwo.startDate ? (this.filtersTwo.startDate[0] ? util.formatDate.format(new Date(this.filtersTwo.startDate[0]), 'yyyyMM') : '') : '')
					+ '&endtime=' + (this.filtersTwo.startDate ? (this.filtersTwo.startDate[1] ? util.formatDate.format(new Date(this.filtersTwo.startDate[1]), 'yyyyMM') : '') : '');
			},
			handleExport3() {
				window.location.href = '/vasms-web/api/v1/bi/biTechnical/export_prodTotal?_viewName=BI_TECHNICAL_PRODTOTAL&token=' + this.$store.getters.userInfo.token + '&searchKey=' + this.filtersThree.searchKey + '&showCount=' + 20000
					+ '&starttime=' + (this.filtersThree.startDate ? (this.filtersThree.startDate[0] ? util.formatDate.format(new Date(this.filtersThree.startDate[0]), 'yyyyMM') : '') : '')
					+ '&endtime=' + (this.filtersThree.startDate ? (this.filtersThree.startDate[1] ? util.formatDate.format(new Date(this.filtersThree.startDate[1]), 'yyyyMM') : '') : '');
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				startDate: '',
		                },
		                 this.filtersTwo.startDate = '';
		                 this.filtersThree.startDate = '';
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
			getData() {//明细
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					searchKey: this.filters.searchKey,
					starttime     : this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyyMM') : '') : '',
                    				endtime        : this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyyMM') : '') : '',
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical/getInstarNum', {params: para}).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					loading.close();//关闭加载
				}).catch((error) => {
					loading.close();//关闭加载
				});
			},
			getDataTwo() {// 汇总
				let para = {
					currentPage: this.currentPageTwo,
					showCount: this.pageSize,
					starttime     : this.filtersTwo.startDate ? (this.filtersTwo.startDate[0] ? util.formatDate.format(new Date(this.filtersTwo.startDate[0]), 'yyyyMM') : '') : '',
                    				endtime        : this.filtersTwo.startDate ? (this.filtersTwo.startDate[1] ? util.formatDate.format(new Date(this.filtersTwo.startDate[1]), 'yyyyMM') : '') : '',
				};
				let totalLoading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical/getInstarTotal', {params: para}).then((res) => {
					this.totalData = res.data.data.records;
					this.totalTwo = res.data.data.totalResult;
					totalLoading.close();//关闭加载
				}).catch((error) => {
					totalLoading.close();//关闭加载
				});
			},
			getDataThree() {// 设备量
				let para = {
					currentPage: this.currentPageThree,
					showCount: this.pageSize,
					starttime     : this.filtersThree.startDate ? (this.filtersThree.startDate[0] ? util.formatDate.format(new Date(this.filtersThree.startDate[0]), 'yyyyMM') : '') : '',
                    				endtime        : this.filtersThree.startDate ? (this.filtersThree.startDate[1] ? util.formatDate.format(new Date(this.filtersThree.startDate[1]), 'yyyyMM') : '') : '',
				};
				let prodLoading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biTechnical/getProdTotal', {params: para}).then((res) => {
					this.prodData = res.data.data.records;
					this.totalThree = res.data.data.totalResult;
					prodLoading.close();//关闭加载
				}).catch((error) => {
					prodLoading.close();//关闭加载
				});
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