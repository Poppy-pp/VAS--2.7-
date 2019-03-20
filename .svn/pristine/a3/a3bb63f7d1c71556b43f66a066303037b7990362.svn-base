<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prodnum" @keyup.native.enter="handleQuery" placeholder="设备号"></el-input>
				</el-form-item>
				<el-form-item prop="timeScope" class="sf100">
					<el-date-picker style="width:350px;" v-model="filters.timeScope" type="datetimerange" placeholder="请选择时间范围">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-switch v-model="filters.online" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="在线" inactive-value="1" inactive-text="离线" @change="showData">
					</el-switch>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe max-height="700" border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="prodnum" label="设备ID" align="center" >
			</el-table-column>
			<el-table-column prop="lng" label="经度" :formatter="lngFormatter" align="center" >
			</el-table-column>
			<el-table-column prop="lat" label="纬度" :formatter="latFormatter" align="center" >
			</el-table-column>
			<el-table-column prop="alt" label="高度" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="veo" label="速度(km/h)" align="center" width="95" >
			</el-table-column>
			<el-table-column prop="direct" label="方向角(顺时针360°)" align="center" width="150" >
			</el-table-column>
			<el-table-column prop="gpstime" label="发送时间" :formatter="dateFormatter" align="center" width="150" >
			</el-table-column>
			<el-table-column prop="recvtime" label="接收时间" :formatter="dateFormatterSecond" align="center" width="150" >
			</el-table-column>
			<el-table-column prop="online" label="状态" :formatter="statusFormatter" width="80" align="center" >
			</el-table-column>
			<!-- <el-table-column fixed="right" label="操作" width="120" align="center">
				<template scope="scope">
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
	import { getOnlineList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					prodnum: '',
					timeScope: '',
					online: '0', //开关
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
			// 经度纬度保留6位小数
			lngFormatter: function(row, col) {
				return row.lng.toFixed(6);
			},
			latFormatter: function(row, col) {
				return row.lat.toFixed(6);
			},
			// 状态
			statusFormatter: function(row, col) {
				return row.online == true ? '在线' : row.online == false ? '离线' : '';
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.gpstime == "" || row.gpstime == undefined) return;
				return util.formatDate.format(new Date(row.gpstime), 'yyyy-MM-dd hh:mm:ss');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.recvtime == "" || row.recvtime == undefined) return;
				return util.formatDate.format(new Date(row.recvtime), 'yyyy-MM-dd hh:mm:ss');
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询条件s
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},

			// 有效无效开关
			showData(i) {
				this.filters.online = i;
				this.handleQuery();
			},
			// 显示的当前页码
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			//获取保单列表
			handleQuery() {
				this.listLoading = true;
				this.listData = []; //初始化

				let para = {
					index: this.currentPage,
					pagesize: this.pageSize,
					condition: this.filters.online + '@' + this.filters.prodnum + '@' + (this.filters.timeScope ? (this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '') + '@' + (this.filters.timeScope ? (this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd hh:mm:ss') : '') : ''),
				}
				getOnlineList(para).then((res) => {
					this.total = res.data.data.totalResult; //总数据作为总计
					eval(res.data).data.forEach((element, index) => {
						this.listData.push(element);
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