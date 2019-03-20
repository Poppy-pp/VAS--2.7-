<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.prodnum" @keyup.native.enter="handleQuerySelect" placeholder="设备号"></el-input>
				</el-form-item>
				<el-form-item prop="timeScope" class="sf100">
					<el-date-picker style="width:350px;" v-model="filters.timeScope" type="datetimerange" range-separator="至" start-placeholder="首次在线开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="timeScopeLast" class="sf100">
					<el-date-picker style="width:350px;" v-model="filters.timeScopeLast" type="datetimerange" range-separator="至" start-placeholder="末次在线开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-switch v-model="filters.online" active-color="#00C1DE" inactive-color="#ff4949" active-value="Y" active-text="在线" inactive-value="N" inactive-text="离线" @change="showData">
					</el-switch>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-175" stripe max-height="700" border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="prodnum" label="设备ID" width="140" align="center">
			</el-table-column>
			<el-table-column prop="firstonlinelng" label="首次在线经度" :formatter="lngFormatterFirst" align="center" width="100">
			</el-table-column>
			<el-table-column prop="firstonlinelat" label="首次在线纬度" :formatter="latFormatterFirst" align="center" width="100">
			</el-table-column>
			<el-table-column prop="firstonlinealt" label="首次在线高度" width="100" align="center">
			</el-table-column>
			<el-table-column prop="firstonlineveo" label="首次在线速度" width="100" align="center">
			</el-table-column>
			<el-table-column prop="firstonlinedirecto" label="首次在线方向" width="100" align="center">
			</el-table-column>
			<el-table-column prop="firstonlinedate" label="首次发送时间" :formatter="dateFormatterFirst" align="center" width="150">
			</el-table-column>
			<el-table-column prop="firstonlinerecdate" label="首次接收时间" :formatter="dateFormatterFirstRec" align="center" width="150">
			</el-table-column>
			<el-table-column prop="firstonlineaddress" label="首次在线地址" align="center" width="250">
			</el-table-column>
			<el-table-column prop="lastonlinelng" label="末次在线经度" :formatter="lngFormatterLast" align="center" width="100">
			</el-table-column>
			<el-table-column prop="lastonlinelat" label="末次在线纬度" :formatter="latFormatterLast" align="center" width="100">
			</el-table-column>
			<el-table-column prop="lastonlinealt" label="末次在线高度" width="100" align="center">
			</el-table-column>
			<el-table-column prop="lastonlineveo" label="末次在线速度" width="100" align="center">
			</el-table-column>
			<el-table-column prop="lastonlinedirecto" label="末次在线方向" width="100" align="center">
			</el-table-column>
			<el-table-column prop="lastonlinedate" label="末次发送时间" :formatter="dateFormatterLast" align="center" width="150">
			</el-table-column>
			<el-table-column prop="lastonlinerecdate" label="末次接收时间" :formatter="dateFormatterLastRec" align="center" width="150">
			</el-table-column>
			<el-table-column prop="lastonlineaddress" label="末次在线地址" align="center" width="250">
			</el-table-column>
			<el-table-column prop="online" label="状态" :formatter="statusFormatter" width="60" align="center">
			</el-table-column>
			<el-table-column prop="remark" label="备注" align="center" width="200">
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
	import { getOnlineListVAS, getOnlineListVASSelect } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					prodnum: '',
					timeScope: '',
					timeScopeLast: '',
					online: 'Y', //开关
				},
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
			}
		},
		methods: {
			// 经度纬度保留6位小数
			lngFormatterFirst: function(row, col) {
				return row.firstonlinelng.toFixed(6);
			},
			latFormatterFirst: function(row, col) {
				return row.firstonlinelat.toFixed(6)
			},
			lngFormatterLast: function(row, col) {
				return row.lastonlinelng.toFixed(6);
			},
			latFormatterLast: function(row, col) {
				return row.lastonlinelat.toFixed(6);
			},

			// 状态
			statusFormatter: function(row, col) {
				return row.online == 'Y' ? '在线' : row.online == 'N' ? '离线' : '';
			},
			//时间转换1
			dateFormatterFirst: function(row, col) {
				if(row.firstonlinedate == "" || row.firstonlinedate == undefined) return;
				return util.formatDate.format(new Date(row.firstonlinedate), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatterFirstRec: function(row, col) {
				if(row.firstonlinerecdate == "" || row.firstonlinerecdate == undefined) return;
				return util.formatDate.format(new Date(row.firstonlinerecdate), 'yyyy-MM-dd hh:mm:ss');
			},
			//时间转换2
			dateFormatterLast: function(row, col) {
				if(row.lastonlinedate == "" || row.lastonlinedate == undefined) return;
				return util.formatDate.format(new Date(row.lastonlinedate), 'yyyy-MM-dd hh:mm:ss');
			},
			dateFormatterLastRec: function(row, col) {
				if(row.lastonlinerecdate == "" || row.lastonlinerecdate == undefined) return;
				return util.formatDate.format(new Date(row.lastonlinerecdate), 'yyyy-MM-dd hh:mm:ss');
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
				this.handleQuerySelect();
			},
			// 显示的当前页码
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuerySelect();
			},

			handleQuerySelect() {
				this.listLoading = true;
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					prodnum: this.filters.prodnum,
					online: this.filters.online,
					starttimefirst: this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd hh:mm:ss') : '',
					endtimefirst: this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd hh:mm:ss') : '',
					starttimelast: this.filters.timeScopeLast[0] ? util.formatDate.format(new Date(this.filters.timeScopeLast[0]), 'yyyy-MM-dd hh:mm:ss') : '',
					endtimelast: this.filters.timeScopeLast[1] ? util.formatDate.format(new Date(this.filters.timeScopeLast[1]), 'yyyy-MM-dd hh:mm:ss') : '',
				}
				getOnlineListVASSelect(para).then((res) => {
					this.total = res.data.data.totalResult; //总数据作为总计
					this.listData = res.data.data.records;
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				this.listLoading = true;
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					prodnum: this.filters.prodnum,
					online: this.filters.online,
				}
				getOnlineListVAS(para).then((res) => {
					this.total = res.data.data.totalResult; //总数据作为总计
					this.listData = res.data.data.records;
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