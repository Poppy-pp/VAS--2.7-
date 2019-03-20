<!--* 
* @description: 库房-库存汇总表
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
					<el-date-picker @change="changeTime" :picker-options="pickerOptions" v-model="month" type="month" placeholder="请选择月份">
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
		<el-table stripe border :data="listData" highlight-current-row style="width: 100%;" :max-height="windowOutHeight-220" ref="listTable" >
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="" label="品名" align="center">
			</el-table-column>
			<el-table-column prop="PRODMODEL" label="型号" align="center" width="120">
			</el-table-column>
			<el-table-column prop="" label="单位" align="center">
			</el-table-column>
			<el-table-column :label="filters.recMonth + ' 月入库'" align="center">
				<el-table-column prop="QUANTITY_INSTO" label="数量" align="center"></el-table-column>
				<el-table-column prop="UNITPRICE_INSTO" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_INSTO" label="金额" align="center"></el-table-column>
			</el-table-column>
			<el-table-column :label="filters.recMonth + ' 月退货'" align="center">
				<el-table-column prop="" label="数量" align="center"></el-table-column>
				<el-table-column prop="" label="单价" align="center" ></el-table-column>
				<el-table-column prop="" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column :label="filters.recMonth + ' 月报损'" align="center">
				<el-table-column prop="QUANTITY_DAMAGE" label="数量" align="center"></el-table-column>
				<el-table-column prop="UNITPRICE_DAMAGE" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_DAMAGE" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column label="直接出库" align="center">
				<el-table-column prop="QUANTITY_STOOUT" label="数量" align="center"></el-table-column>
				<el-table-column prop="UNITPRICE_STOOUT" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_STOOUT" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column label="报失" align="center">
				<el-table-column prop="QUANTITY_LOSS" label="数量" align="center"></el-table-column>
				<el-table-column prop="UNITPRICE_LOSS" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_LOSS" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column label="拆除" align="center">
				<el-table-column prop="QUANTITY_REMOVE" label="数量" align="center"></el-table-column>
				<el-table-column prop="UNITPRICE_REMOVE" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_REMOVE" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column label="返厂更换" align="center">
				<el-table-column prop="" label="数量" align="center"></el-table-column>
				<el-table-column prop="" label="单价" align="center" ></el-table-column>
				<el-table-column prop="" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column label="安装商品" align="center">
				<el-table-column  label="数量" align="center">
					<el-table-column prop="QUANTITY_INSTALL_1" label="新装" align="center"></el-table-column>
					<el-table-column prop="QUANTITY_INSTALL_2" label="售后" align="center"></el-table-column>
					<el-table-column prop="QUANTITY_REMOVE" label="拆除" align="center"></el-table-column>
				</el-table-column>
				<el-table-column prop="UNITPRICE_INSTALL" label="单价" align="center" ></el-table-column>
				<el-table-column prop="TOTALPRICE_INSTALL" label="金额" align="center" ></el-table-column>
			</el-table-column>
			<el-table-column prop="" label="账" align="center" >
			</el-table-column>
			<el-table-column label="期初数" align="center">
				<el-table-column  label="库房" align="center">
					<el-table-column prop="INIT_STORAGE_COUNT" label="数量" align="center"></el-table-column>
					<el-table-column prop="INIT_STORAGE_UNITPRICE" label="单价" align="center" ></el-table-column>
					<el-table-column prop="INIT_STORAGE_TOTALPRICE" label="金额" align="center" ></el-table-column>
				</el-table-column>
				<el-table-column  label="技术" align="center">
					<el-table-column prop="INIT_TECH_COUNT" label="数量" align="center"></el-table-column>
					<el-table-column prop="INIT_TECH_UNITPRICE" label="单价" align="center" ></el-table-column>
					<el-table-column prop="INIT_TECH_TOTALPRICE" label="金额" align="center" ></el-table-column>
				</el-table-column>
				<el-table-column  label="调整" align="center">
					<el-table-column prop="INIT_ADJ_COUNT" label="数量" align="center"></el-table-column>
					<el-table-column prop="INIT_ADJ_UNITPRICE" label="单价" align="center" ></el-table-column>
					<el-table-column prop="INIT_ADJ_TOTALPRICE" label="金额" align="center" ></el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column label="期末数" align="center">
				<el-table-column  label="库房" align="center">
					<el-table-column prop="END_STORAGE_COUNT" label="数量" align="center"></el-table-column>
					<el-table-column prop="END_STORAGE_UNITPRICE" label="单价" align="center" ></el-table-column>
					<el-table-column prop="END_STORAGE_TOTALPRICE" label="实盘金额" align="center" ></el-table-column>
				</el-table-column>
				<el-table-column prop="" label="账" align="center" :formatter="saveNum"></el-table-column>
				<el-table-column  label="技术" align="center">
					<el-table-column prop="END_TECH_COUNT" label="数量" align="center"></el-table-column>
					<el-table-column prop="END_TECH_UNITPRICE" label="单价" align="center" ></el-table-column>
					<el-table-column prop="END_TECH_TOTALPRICE" label="实盘金额" align="center" ></el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column prop="" label="备注" align="center">
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
	import util from '../../../../common/js/util.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				windowOutHeight: 700,
				month:'',
				filters: {
					searchKey:'',
					recMonth:'',
				},
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listData:[],//表格数据
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},

			}
		},
		methods: {
			//选择时间
			changeTime(date) {
				if(!date) {
					this.month = '';
					this.filters.recMonth = '';
					return;
				};
				this.month = util.formatDate.format(new Date(date), 'yyyy-MM'),
				this.filters.recMonth =  util.formatDate.format(new Date(date), 'yyyyMM');
			},
			/*导出*/
			handleExport() {
				window.location.href = '/vasms-web/api/v1/bi/biViewNameAll/export?_viewName=RPT_STO_SUMMARY&token=' + this.$store.getters.userInfo.token + '&month=' + this.filters.recMonth + '&searchKey=' + this.filters.searchKey + '&showCount=' + 20000;
			},
			// 重置
			resetForm(){
		                this.filters = {
		                         searchKey:'',
				recMonth: util.formatDate.format(new Date(), 'yyyy-MM'),
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
					month     : this.filters.recMonth,
				};
				let loading = util.startLoading(this,'.el-table__body-wrapper');//调用加载
				axios.get('/vasms-web/api/v1/bi/biViewNameAll?_viewName=RPT_STO_SUMMARY', {params: para}).then((res) => {
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
			// 保留两位小数
			saveNum(row, col) {//保留两位小数
				if (row.NORMPRICE == undefined || row.INSUPRICE == undefined || row.TOTALPRICE == undefined)return;
				return row.NORMPRICE.toFixed(2) || row.INSUPRICE.toFixed(2) || row.TOTALPRICE.toFixed(2);
			},
			
		},
		created(){
			// 默认筛选日期
			this.month = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyy-MM');
			this.filters.recMonth = util.formatDate.format(new Date(new Date().setMonth( new Date().getMonth()-1 )), 'yyyyMM');
			
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