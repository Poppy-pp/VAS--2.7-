<!--* 
* @description: 异常设备登记 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<section class="tab_content-wrapper">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.sendperson" @keyup.native.enter="handleQuery" placeholder="设备编号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
					<el-button type="primary" @click="addS" icon="el-icon-sort">批量复原</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->

		<el-table border :max-height="windowOutHeight-175" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="#" width="25" align="center">
			</el-table-column>
			<el-table-column prop="" label="异常类型" align="center">
			</el-table-column>
			<el-table-column prop="" label="异常登记时间" align="center">
			</el-table-column>
			<el-table-column prop="" label="供应商" align="center">
			</el-table-column>
			<el-table-column prop="" label="库存类型" :formatter="dateFormatter1" align="center">
			</el-table-column>
			<el-table-column prop="" label="申报人分组" align="center">
			</el-table-column>
			<el-table-column prop="" label="申报人" align="center">
			</el-table-column>
			<el-table-column prop="" label="责任人" align="center" :formatter="dateFormatterDepuee">
			</el-table-column>
			<el-table-column prop="" label="设备类型" align="center">
			</el-table-column>
			<el-table-column prop="" label="设备型号" align="center">
			</el-table-column>
			<el-table-column prop="" label="设备编号" align="center">
			</el-table-column>
			<el-table-column prop="" label="通讯卡类型" align="center">
			</el-table-column>
			<el-table-column prop="" label="通讯卡号" align="center">
			</el-table-column>
			<el-table-column prop="" label="ICCID" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="80" align="center">
				<template scope="scope">
					<el-button size="small" type="primary" @click="">恢复</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>
		<!-- 拒绝处理备注 弹窗  start-->
		<el-dialog title="返厂设备批量恢复" :modal-append-to-body="false" :visible.sync="rejectDialogVisible" size="small" :close-on-click-modal="false">
			<!-- <el-form label-position="left" label-width="120px">
				<el-form-item label="设备编号">
					<el-input v-model="addForm.prodnum" class="input-with-select" @keyup.13.native="searchDeviceNum" placeholder="请输入设备号并回车">
					    <el-button slot="append" @click="searchDeviceNum">添加</el-button>
					</el-input>
				</el-form-item>
				<div class="ant-row dis_newInstallTitle">
					<h3>操作记录：本次成功登记数量({{savDeviceNum.length}})</h3>
					<div style="min-height: 200px;max-height: 300px; overflow-y: scroll;">
						<ul>
							<li v-for="(item,index) in savDeviceNum">
								<span>{{ item.prodnum }}</span>
								<el-button type="text" class="ml20" @click="deleteSavDeviceNum(index)" icon="el-icon-delete"></el-button>
							</li>
						</ul>
					</div>
				</div>
			</el-form>
			<el-col class="footer_but_bd" :span="24">
				<el-button @click="rejectDialogVisible = false" style="margin-left:5px;float:right;">取 消</el-button>
				<el-button type="primary" @click="addRefuseHandling" :loading="addLoading" style="margin-left:5px;float:right;">确认恢复</el-button>
			</el-col> -->
			<el-upload
				  action="https://jsonplaceholder.typicode.com/posts/"
				  accept=".xls"
				  :on-change="handleChange"
				  :file-list="fileList"
				  class="upload"
				  >
				  <el-button icon="el-icon-upload el-icon--right" type="primary">点击上传文件</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传.xml模板文件，且不超过1M</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="stoinSubmit()" :loading="addLoading">提交恢复</el-button>
				<el-button @click.native="rejectDialogVisible = false">取消</el-button>
			</div>
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
				addForm:{
					prodnum:'',
				},
				savDeviceNum:[],//检测设备
				iskeyup: false,
				fileList:[],//上传的文件组
				deliveryreason: '',
				remarks: '',
				rejectDialogVisible: false,
				addLoading: false,
				rowid: '',
				wlstate: [{
					value: "发货(未签收)",
					id: 1
				}, {
					value: "已收货(签收)",
					id: 3
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
		watch: {
			//检测设备号输入
			prodnum(curval, oval) {
				if(curval == '') {
					this.iskeyup = false;
				}
				if(this.iskeyup) return;
				this.searchDeviceNum();
			}
		},
		methods: {
			// 选择上传文件后
			handleChange(file, fileList){
				console.log(file,fileList)
			},
			// 点击批量入库的提交时
			stoinSubmit() {
				// let para = {
				// 	batchno: this.ruleForm.batchno
				// }
				// submitUploadSuccess(para).then((res) => {
				// 	if(res.data.result.code == 0) {
				// 		this.multAddFormVisible = false;
				// 		this.$message({
				// 			message: '批量入库成功',
				// 			type: 'success'
				// 		});
				// 		this.handleQuery();
				// 	}
				// });
			},

			//查询设备号
			searchDeviceNum() {
				let para = {
					domSearch: [{
						select: ['prodnum'],
						content: this.devNum
					}]
				};
				getCurUserDeviceInfo(para).then((res) => {
					if(res.data.result.code == 0) {
						if(res.data.data.records.length == 0) {
							this.$message({
								message: "当前设备不在你的库存里",
								type: 'warning'
							});
						} else {
							let dev = res.data.data.records[0];
								this.savDeviceNum.push(dev);
						}

					}
				});
			},
			//删除检测的设备
			deleteSavDeviceNum(index) {
				this.savDeviceNum.splice(index, 1);
			},
			//批量添加
			addS(){
				this.rejectDialogVisible = true;
			},
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