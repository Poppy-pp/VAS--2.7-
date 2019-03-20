<!--* 
* @description: 设备返厂 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<section class="tab_content-wrapper">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.sendperson" @keyup.native.enter="handleQuery" placeholder="发货人"></el-input>
				</el-form-item>
				<el-form-item prop="deliverystatus">
					<el-select v-model="filters.deliverystatus" clearable filterable placeholder="请选择状态">
						<el-option v-for="item in wlstate" :key="item.value" :label="item.value" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="startDate">
					<el-date-picker v-model="filters.startDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->

		<el-table border :max-height="windowOutHeight-175" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="#" width="25" align="center">
			</el-table-column>
			<el-table-column prop="SENDPERSON" width="80" label="发货人" align="center">
			</el-table-column>
			<el-table-column prop="SENDMOBILE" label="发货人电话" align="center" width="100">
			</el-table-column>
			<el-table-column prop="SENDADDRESS" label="发货地址" align="center" width="200">
			</el-table-column>
			<el-table-column prop="DELIVERYDATE" label="发货时间" :formatter="dateFormatter1" align="center" width="100">
			</el-table-column>
			<el-table-column prop="DELIVERYTYPE" label="发货方式" align="center" width="80">
			</el-table-column>
			<el-table-column prop="DELIVERYNO" label="单号" align="center" width="80">
			</el-table-column>
			<el-table-column prop="DELIVERYFEE" label="发生费用" align="center" :formatter="dateFormatterDepuee" width="80">
			</el-table-column>
			<el-table-column prop="RECEIVPERSON" label="收货人" align="center" width="80">
			</el-table-column>
			<el-table-column prop="RECEIVMOBILE" label="收货人电话" align="center" width="100">
			</el-table-column>
			<el-table-column prop="RECEIVADDRESS" width="200" label="到货地址" align="center">
			</el-table-column>
			<el-table-column prop="ESTRECEIVEDATE" width="100" label="到货时间" :formatter="dateFormatter2" align="center">
			</el-table-column>
			<el-table-column prop="REMARKS" label="描述" align="center" width="100">
			</el-table-column>
			<el-table-column prop="PRODUCT" label="发货明细" align="center" width="80">
				<template scope="scope">
					<!--列表-->
					<el-popover ref="popover4" placement="right" width="700" @hide="hideprodData" @show="showprodData(scope.row.ID)" trigger="click">
						<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
							<el-form :inline="true" :model="profilters">
								<el-form-item>
									<el-input v-model="profilters.eprodnum" @keyup.native.enter="showprodData(scope.row.ID)" placeholder="设备编号"></el-input>
								</el-form-item>
								<el-form-item prop="deliverystatus">
									<el-input v-model="profilters.cprodnum" @keyup.native.enter="showprodData(scope.row.ID)" placeholder="卡编号"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="showprodData(scope.row.ID)" icon="el-icon-search">查询</el-button>
								</el-form-item>
							</el-form>
						</el-col>
						<el-table max-height="400" border :data="prodData" v-loading="plistLoading">
							<el-table-column type="index" label="#" width="25" align="center">
							</el-table-column>
							<el-table-column prop="PRODSPEC" label="类型" align="center"></el-table-column>
							<el-table-column prop="PRODMODEL" label="型号" align="center"></el-table-column>
							<el-table-column prop="EPRODNUM" label="设备编号" align="center"></el-table-column>
							<el-table-column prop="CPRODNUM" label="卡编号" align="center"></el-table-column>
							<el-table-column prop="CPRODMODEL" label="卡类型" align="center"></el-table-column>
							<el-table-column prop="STATUS" label="状态" align="center" :formatter="dataFormatterStatus"></el-table-column>
							<el-table-column prop="REMARK" label="描述" align="center"></el-table-column>
						</el-table>
						<!--工具条-->
						<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover4>
						<span class="iconcomnum"><i class="el-icon-search"></i>查看</span>
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="CREATENAME" label="记录人" align="center">
			</el-table-column>
			<el-table-column prop="CREATEDATE" label="记录时间" :formatter="dateFormatter3" align="center" width="150">
			</el-table-column>
			<el-table-column prop="DELIVERYSTATUS" width="100" label="物流状态" align="center" :formatter="deliverstatusHandel">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160" align="center">
				<template scope="scope">
					<el-button size="small" type="primary" @click="comfirmDeliver(scope.$index, scope.row)" :disabled="scope.row.DELIVERYSTATUS == '3' || scope.row.DELIVERYSTATUS == '7' && scope.row.DELIVERYSTATUS !=undefined">确认收货</el-button>
					<el-button size="small" @click="backDeliver(scope.$index, scope.row)" :disabled="(scope.row.DELIVERYSTATUS == '3' && scope.row.DELIVERYSTATUS != undefined) || scope.row.DELIVERYSTATUS == '4' || scope.row.DELIVERYSTATUS == '7'">退回</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>
		<!-- 拒绝处理备注 弹窗  start-->
		<el-dialog title="退回原因" :modal-append-to-body="false" :visible.sync="rejectDialogVisible" size="small" :close-on-click-modal="false">
			<el-form label-position="left" label-width="80px">
				<el-form-item label="退回原因">
					<el-input type="textarea" autosize placeholder="请输入退回原因" v-model="deliveryreason"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" autosize placeholder="请输入备注" v-model="remarks"></el-input>
				</el-form-item>
			</el-form>
			<el-col class="footer_but_bd" :span="24">
				<el-button type="primary" @click="addRefuseHandling" :loading="addLoading" style="margin-left:5px;float:right;">确定</el-button>
				<el-button @click="rejectDialogVisible = false" style="margin-left:5px;float:right;">取消</el-button>
			</el-col>
		</el-dialog>
		<!-- 拒绝处理备注 弹窗  end-->
	</section>
</template>

<style type="text/css">
	.formdetail .el-dialog__body {
		padding-top: 10px;
	}
	
	.formdetail .el-form-item {
		margin-bottom: 10px;
	}
	
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
	
	.el-table .warning-row .el-checkbox__inner {
		background-color: #eee;
	}
</style>
<script>
	import Vue from 'vue';
	import util from '../../common/js/util';
	import { adddelivery, getdeliveryListAll, modifyCurUserDeviceInfo, getsfhProList, backDelivery } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				profilters: {
					eprodnum: '',
					cprodnum: ''
				},
				filters: {
					startDate: '',
					sendperson: '',
					deliverystatus: ''
				},
				deliveryreason: '',
				remarks: '',
				rejectDialogVisible: false,
				addLoading: false,
				rowid: '',
				wlstate: [{
					value: "发货(未签收)",
					id: 1
				},{
					value: "已收货(签收)",
					id: 3
				},{
					value: "退回",
					id: 4
				},{
					value: "退回签收",
					id: 7
				}],
				listData: [],
				prodData: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				plistLoading: false,
				dtotal: 0,
				dcurrentPage: 0,
				dpageSize: 15,
				ddeliveryid: ''
			}
		},
		methods: {
			addRefuseHandling() {
				let para = {
					id: this.rowid,
					remarks: this.remarks,
					deliveryreason: this.deliveryreason
				};
				this.addLoading = true;
				backDelivery(para).then((res) => {
					this.addLoading = false;
					if(res.data.result.code == 0) {
						this.handleQuery();
						this.$message({
							message: "确认退回成功！",
							type: 'success'
						});
						this.rejectDialogVisible = false;
					}
				});
			},
			//退回
			backDeliver(index, row) {
				this.rejectDialogVisible = true;
				this.remarks = '';
				this.deliveryreason = '';
				this.rowid = row.ID;
			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.currentPage = val;
				this.showprodData(this.ddeliveryid);
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.pageSize = val;
				this.showprodData(this.ddeliveryid);
			},
			hideprodData() {
				this.profilters.eprodnum = '';
				this.profilters.cprodnum = '';
			},
			showprodData(id) {
				this.ddeliveryid = id;
				var para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					deliveryid: id,
					eprodnum: this.profilters.eprodnum,
					cprodnum: this.profilters.cprodnum
				}
				this.plistLoading = false;
				getsfhProList(para).then((res) => {
					this.dtotal = res.data.data.totalResult;
					this.prodData = res.data.data.records;
					this.plistLoading = false;
				}).catch((error) => {
					this.plistLoading = false;
				});
			},
			//确认收货
			comfirmDeliver(index, row) {
				this.$confirm('是否确认收货?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.ID,
						deliverystatus: '3'
					};
					modifyCurUserDeviceInfo(para).then((res) => {
						if(res.data.result.code == 0) {
							this.handleQuery();
							this.$message({
								message: "确认收货成功！",
								type: 'success'
							});
						}
					});
				}).catch(() => {});
			},
			//格式化发生费用
			dateFormatterDepuee(row, col) {
				return(row.DELIVERYFEE ? row.DELIVERYFEE : 0) + "元";
			},
			//格式化发货状态
			deliverstatusHandel(v) {
				if(v.DELIVERYSTATUS == 1) return '发货';
				if(v.DELIVERYSTATUS == 2) return '到达';
				if(v.DELIVERYSTATUS == 3) return '签收';
				if(v.DELIVERYSTATUS == 4) return '退回';
				if(v.DELIVERYSTATUS == 5) return '损坏';
				if(v.DELIVERYSTATUS == 6) return '丢失';
				if(v.DELIVERYSTATUS == 7) return '退回签收';
			},
			dateFormatter1(row, col) {
				if(row.DELIVERYDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.DELIVERYDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.ESTRECEIVEDATE == undefined) return '--';
				return util.formatDate.format(new Date(row.ESTRECEIVEDATE), 'yyyy-MM-dd');
			},
			dateFormatter3(row, col) {
				return util.formatDate.format(new Date(row.CREATEDATE), 'yyyy-MM-dd');
			},
			dataFormatterStatus(row, col) {
				if(row.STATUS == "INSTO") {
					return "在库";
				}
				if(row.STATUS == "INSTALL") {
					return "已安装";
				}
				if(row.STATUS == "LOST") {
					return "报失";
				}
				if(row.STATUS == "REPAIR") {
					return "维修";
				}
				if(row.STATUS == "DAMAGE") {
					return "报废";
				}
				if(row.STATUS == "ONWAY") {
					return "在途";
				}
			},
			//获取发货列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					starttime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd') : '') : '',
					endtime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd') : '') : '',
					deliverystatus: this.filters.deliverystatus,
					// 搜索设置部分
					sendperson: this.filters.sendperson,
					deliverycategory: 5
				};
				this.listLoading = true;
				getdeliveryListAll(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			}
		},
		created() {
			this.handleQuery();
		}
	}
</script>