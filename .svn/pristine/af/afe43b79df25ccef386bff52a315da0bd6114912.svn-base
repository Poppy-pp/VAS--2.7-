<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.ipaddress" @keyup.native.enter="handleQuery" placeholder="IP地址"></el-input>
				</el-form-item>
				<el-form-item prop="timeScope" class="sf100">
					<el-date-picker style="width:350px;" v-model="filters.timeScope" type="datetimerange" placeholder="请选择时间范围">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="ipaddress" label="上线IP" align="center" width="200" >
			</el-table-column>
			<el-table-column prop="recorddatetime" label="时间" :formatter="dateFormatter" width="160" align="center" >
			</el-table-column>
			<el-table-column prop="recordcontent" label="数据" align="left" >
			</el-table-column>
			<!-- <el-table-column fixed="right" label="操作" width="120" align="center">
				<template scope="scope">
					<el-button id="button"  @click="formDetailHandle(scope.row.prodnum)" title="详情" disabled>
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑" disabled>
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)"  title="删除" disabled>
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getOnlineIpList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					ipaddress: '',
					timeScope: '',
				},
				listData: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
			}
		},
		methods: {
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.recorddatetime == "" || row.recorddatetime == undefined) return;
				return util.formatDate.format(new Date(row.recorddatetime), 'yyyy-MM-dd hh:mm:ss');
			},
			handleCurrentChange(val) {
				this.currentPage = (val - 1);
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//获取保单列表 
			handleQuery() {
				this.listData = []; //初始化
				this.listLoading = true;
				let para = {
					index: this.currentPage,
					pagesize: this.pageSize,
					condition: this.filters.ipaddress + '@' + (this.filters.timeScope ? (this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '') + '@' + (this.filters.timeScope ? (this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd hh:mm:ss') : '') : ''),
				}
				getOnlineIpList(para).then((res) => {
					this.total = res.data.total;
					eval(res.data).data.forEach((element, index) => {
						this.listData.push(element)
					});
					this.listLoading = false;
				});
			},

			selsChange(sels) {
				this.sels = sels;
			},
		},
		created() {
			this.handleQuery();
		},
	}
</script>