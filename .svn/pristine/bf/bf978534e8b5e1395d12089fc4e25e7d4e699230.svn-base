<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.suppliername" @keyup.native.enter="handleQuery" placeholder="供应商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="multHandleAdd">批量入库</el-button>
					<el-button type="primary">返厂入库</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->

		<el-table border :max-height="windowOutHeight-175" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" label="#" width="35" align="center">
			</el-table-column>
			<el-table-column prop="batchno" width="170" label="批号" align="center">
			</el-table-column>
			<el-table-column prop="storagename" label="库房" align="center">
			</el-table-column>
			<el-table-column prop="suppliername" label="供应商" align="center">
			</el-table-column>
			<el-table-column prop="prodmodel" label="设备型号" align="center">
			</el-table-column>
			<el-table-column prop="inquantity" label="入库数量" align="center">
			</el-table-column>
			<el-table-column prop="createname" label="入库人" align="center">
			</el-table-column>
			<el-table-column prop="" label="设备详情" align="center" width="100">
				<template scope="scope">
					<el-popover ref="popover4" placement="right" width="700" @show="deviceData(scope.row)" trigger="click">
						<el-table border :data="deviceInfoList" max-height="300" v-loading="devicelistLoading">
							<el-table-column prop="eprodnum" label="设备编号" align="center" width="105">
							</el-table-column>
							<el-table-column prop="eprodmodel" label="设备型号" align="center" width="150"></el-table-column>
							<el-table-column prop="eprodspec" label="设备规格" align="center" width="130"></el-table-column>
							<el-table-column prop="cprodnum" label="卡(ICCID)" align="center"></el-table-column>
							<el-table-column prop="cprodmodel" label="卡类型" align="center"></el-table-column>
							<el-table-column prop="cprodspec" label="卡规格" align="center"></el-table-column>
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
			<el-table-column prop="createdate" label="入库时间" :formatter="dateFormatter" align="center">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="设备入库" :modal-append-to-body="false" :visible.sync="addFormVisible" top="9%" :close-on-click-modal="false">
			<el-form :model="addForm" label-position="top" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="供应商名称" prop="supplierid">
					<el-select v-model="addForm.supplierid" @visible-change="getSupplier" remote :remote-method="supplierRemoteMethod" :loading="supplierLoading" filterable placeholder="请输入供应商关键字">
						<el-option v-for="item in supplierData" :key="item.suppliername" :label="item.suppliername" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="库房名称" prop="storageid">
					<el-select v-model="addForm.storageid" @visible-change="getStorageInfo" remote :remote-method="storageRemoteMethod" :loading="storageLoading" filterable placeholder="请输入库房关键字">
						<el-option v-for="item in storageData" :key="item.STORAGENAME" :label="item.STORAGENAME" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 			<el-form-item label="入库单价" prop="inprice">
                    <el-input type="text" placeholder="请输入入库单价" v-model="addForm.inprice">
                      <template slot="append">元</template>
                    </el-input>
				</el-form-item> -->
				<el-form-item label="批号" prop="batchno">
					<el-input type="text" placeholder="请点击按钮生成批号" readonly v-model="addForm.batchno">
						<el-button slot="append" @click="scTimeAndRandomOne" :disabled="zdflag">{{ zdflag ? "已生成":"自动生成" }}</el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="" prop="prodsnnum">
					<!-- 		<el-col :span="19">
						<el-radio-group v-model="addForm.prodcategory" @change="deviceTypeChange">
						    <el-radio-button label="E">设备</el-radio-button>
						    <el-radio-button label="C">卡</el-radio-button>
						    <el-radio-button label="3">组装</el-radio-button>
						</el-radio-group>
					</el-col> -->
					<el-col :span="24">
						<el-button type="primary" @click.native="addDevice('3')" icon="el-icon-plus" style="float:right;">组装</el-button>
						<el-button type="primary" @click.native="addDevice('C')" icon="el-icon-plus" style="float:right;margin-right:10px;">卡</el-button>
						<el-button type="primary" @click.native="addDevice('E')" icon="el-icon-plus" style="float:right;">设备</el-button>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-table :data="deviceInfo" show-summary :summary-method="getSummaries" empty-text="没有设备信息" border style="width: 100%" max-height="250">
						<el-table-column type="relateproductinfo1.prodnum" width="150" label="设备编号" align="center">
							<template scope="scope">
								<el-input type="text" v-model="scope.row.relateproductinfo1.prodnum" :disabled="scope.row.relateproductinfo.prodcategory == 'C' || !scope.row.relateproductinfo.prodcategory == '3'" placeholder="请输入设备编号" @blur="checkReg"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="relateproductinfo1.prodmodelid" label="设备型号" align="center">
							<template scope="scope">
								<el-select v-model="scope.row.relateproductinfo1.prodmodelid" :disabled="scope.row.relateproductinfo.prodcategory == 'C' || !scope.row.relateproductinfo.prodcategory == '3'" @visible-change="deviceTypeChange" placeholder="请选择设备型号">
									<el-option v-for="item in deviceVersionData1" :label="item.prodmodel" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>

						<el-table-column type="relateproductinfo.prodnum" width="150" label="卡编号" align="center">
							<template scope="scope">
								<el-input type="text" v-model="scope.row.relateproductinfo.prodnum" :disabled="scope.row.relateproductinfo1.prodcategory == 'E' || !scope.row.relateproductinfo1.prodcategory == '3'" placeholder="请输入卡编号" @blur="checkReg"></el-input>
							</template>
						</el-table-column>

						<el-table-column prop="relateproductinfo.prodmodelid" label="卡类型" align="center">
							<template scope="scope">
								<el-select v-model="scope.row.relateproductinfo.prodmodelid" :disabled="scope.row.relateproductinfo1.prodcategory == 'E' || !scope.row.relateproductinfo1.prodcategory == '3'" @visible-change="deviceKTypeChange" placeholder="请选择卡类型">
									<el-option v-for="item in deviceVersionData2" :label="item.prodmodel" :value="item.id">
									</el-option>
								</el-select>
							</template>
						</el-table-column>

						<el-table-column label="操作" fixed="left" width="60" align="center">
							<template scope="scope">
								<el-button @click.native.prevent="deleteRow(scope.$index, deviceInfo)" type="text" size="small">
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>

				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="addForm.remark" autosize placeholder="请输入备注" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addSubmit('addForm')" :loading="addLoading">提交</el-button>
				<el-button @click.native="addFormVisible = false">取消</el-button>
			</div>
		</el-dialog>

		<!--批量入库-->
		<el-dialog title="批量入库" :modal-append-to-body="false" :visible.sync="multAddFormVisible" :close-on-click-modal="false">
			<el-form :model="ruleForm" label-width="100px" :rules="addFormRuless" ref="ruleForm">
				<el-form-item label="供应商名称" prop="supplierid">
					<el-select v-model="ruleForm.supplierid" @visible-change="getSupplier" remote :remote-method="supplierRemoteMethod" :loading="supplierLoading" filterable placeholder="请输入供应商关键字">
						<el-option v-for="item in supplierData" :key="item.suppliername" :label="item.suppliername" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="库房名称" prop="storageid">
					<el-select v-model="ruleForm.storageid" @visible-change="getStorageInfo" remote :remote-method="storageRemoteMethod" :loading="storageLoading" filterable placeholder="请输入库房关键字">
						<el-option v-for="item in storageData" :key="item.STORAGENAME" :label="item.STORAGENAME" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="批号" prop="batchno">
					<el-input type="text" placeholder="请点击按钮生成批号" readonly v-model="ruleForm.batchno">
						<el-button slot="append" @click="scTimeAndRandom" :disabled="zdflag">{{ zdflag ? "已生成":"自动生成" }}</el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="">
					<el-upload class="upload-demo" accept=".xls" ref="upload" :headers="headers" action="/vasms-web/api/v1/sto/stoIn/batch/add" name="mediaFile" :data="{supplierid:ruleForm.supplierid,storageid:ruleForm.storageid,batchno:ruleForm.batchno}" :on-success="submitSuccess" :on-error="submitError" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
						<el-button size="small" @click="downloadModel" type="primary" style="margin-right: 14px;float: left;margin-top: 5px;">下载模板</el-button>
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('ruleForm')">上传到服务器</el-button>
						<div slot="tip" class="el-upload__tip">只能上传.xml模板文件，且不超过1M</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="" prop="" v-for="(item,index) in showData">
					<div>卡类型：{{ item.prodmodel }}</div>
					<div>卡数量：{{ item.count }}</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="stoinSubmit('ruleForm')" :loading="addLoading">提交入库</el-button>
				<el-button @click.native="multAddFormVisible = false" @click="stoinSubmitCancel">取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<style type="text/css">
	.alertError {
		width: 40%;
		position: fixed;
		z-index: 1111111;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
	}
	.red{border-color: red;}
</style>
<script>
	import util from '../../common/js/util'
	import { getStoInList, modifyStoIn, removeStoIn, getProductModel, addDeviceStoIn, getDeviceTypeModel, getStorageInfoList, batchUploadProduct, submitUploadSuccess, submitUploadCancel, getSupplierInfo, getDeviceList, getByUserIdName } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			//自定义选择受理银行是否选择
			var checkPara = (rule, value, callback) => {
				if(this.ruleForm[rule.field].length <= 0) {
					return callback(new Error('必选项'));
				} else {
					callback();
				}
			};
			//自定义选择受理银行是否选择
			var checkParaAddForm = (rule, value, callback) => {
				if(this.addForm[rule.field].length <= 0) {
					return callback(new Error('必选项'));
				} else {
					callback();
				}
			};
			var checkProdNum = (rule, value, callback) => {
				var reg = /^[0-9a-zA-Z]*$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入数字和字母'));
				} else {
					callback();
				}
			};
			return {
				filters: {
					suppliername: ''
				},
				//批量入库获取当前用户token
				headers: {
					token: JSON.parse(sessionStorage.getItem('user')).token
				},
				supplierData: [],
				devicelistLoading: false,
				deviceInfoList: [],
				fileList: [],
				//设备列表
				deviceInfo: [],
				//设备类型
				deviceTypeData: [],
				//设备型号信息
				deviceVersionData: [],
				//设备型号信息
				deviceVersionData1: [],
				//卡信息
				deviceVersionData2: [],
				storageData: [],
				//列表数据
				listData: [],
				total: 0,
				currentPage: 0,
				pageSize: 15,
				//表格加载
				listLoading: false,
				multAddFormVisible: false,
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				zdflag: true, //是否生成随机数
				modelflag: false, //是否生成模板
				//新增界面数据
				addForm: {
					storageid: '',
					prodnum: '',
					prodsnnum: '',
					inquantity: '',
					remark: '',
					supplierid: '',
					batchno: '',
					prodcategory: '',
					productInfos: []
				},
				ruleForm: {
					supplierid: '',
					storageid: '',
					batchno: ''
				},
				//批量入库显示 入库列表
				showData: [],
				addFormRules: {
					supplierid: [{
						required: true,
						validator: checkParaAddForm,
						trigger: 'blur'
					}],
					storageid: [{
						required: true,
						validator: checkParaAddForm,
						trigger: 'blur'
					}],
					batchno: [{
						required: true,
						message: "请生成批号",
						trigger: 'blur'
					}],
					prodnum:[{
						required: true,
						validator: checkProdNum,
						trigger: 'blur'
					}],
				},
				addFormRuless: {
					supplierid: [{
						required: true,
						validator: checkPara,
						trigger: 'blur'
					}],
					storageid: [{
						required: true,
						validator: checkPara,
						trigger: 'blur'
					}],
					batchno: [{
						required: true,
						message: "请生成批号",
						trigger: 'blur'
					}]
				},
				supplierLoading: false,
				storageLoading: false,
				dtotal: 0,
				dcurrentPage: 0,
				dpageSize: 15,
				curDeviceRow: '',
				regflag:true,//正则标志
			}
		},
		methods: {
			// 正则验证设备号
			checkReg(e){
				var reg = /^[0-9a-zA-Z]*$/g;
				this.regflag = reg.test(e.target.value);
				if(!this.regflag) {
					this.$message({
						message: "只能输入数字和字母",
						type: 'error'
					});
					e.target.className = 'el-form-item el-input__inner red';
				}else{
					e.target.className = 'el-input__inner';
				}
			},
			//下载模板
			downloadModel() {
				window.location.href = "/apk/模板.xls";
			},
			//生成批号
			scTimeAndRandom() {
				if(this.zdflag) return;
				let rnum = util.getTimeAndRandom(4);
				this.ruleForm.batchno = rnum;
			},
			//生成批号
			scTimeAndRandomOne() {
				if(this.zdflag) return;
				let rnum = util.getTimeAndRandom(4);
				this.addForm.batchno = rnum;
			},
			//格式化价格
			dateFormatterInprice(row, col) {
				return(row.inprice ? row.inprice : 0) + "元";
			},
			//表格统计
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if(index === 1) {
						sums[index] = '入库总数量';
						return;
					}
					if(index === 2) {
						sums[index] = data.length;
						this.addForm.inquantity = data.length;
						return;
					}
				});
				return sums;
			},
			//获取供应商列表
			supplierRemoteMethod(query) {
				let para1 = {
					showCount: 100,
					isactive: 1,
					suppliername: query
				};
				this.supplierLoading = true;
				getSupplierInfo(para1).then((res) => {
					this.supplierLoading = false;
					if(res.data.result.code == 0) {
						this.supplierData = res.data.data.records;
					}
				});
			},
			//获取库房列表
			storageRemoteMethod(query) {
				let para1 = {
					showCount: 10,
					isdelete: 0,
					storagename: query
				};
				this.storageLoading = true;
				getStorageInfoList(para1).then((res) => {
					this.storageLoading = false;
					if(res.data.result.code == 0) {
						this.storageData = res.data.data.records;
					}
				});
			},
			//获取供应商列表
			getSupplier(r) {
				if(!r || this.supplierData.length > 0) return;
				let para1 = {
					showCount: 10,
					isactive: 1
				};
				this.supplierLoading = true;
				getSupplierInfo(para1).then((res) => {
					this.supplierLoading = false;
					if(res.data.result.code == 0) {
						this.supplierData = res.data.data.records;
					}
				});
			},
			//获取库房名称
			getStorageInfo(r) {
				if(!r || this.storageData.length > 0) return;
				let para1 = {
					showCount: 10,
					isactive: 1
				};
				this.storageLoading = true;
				getStorageInfoList(para1).then((res) => {
					this.storageLoading = false;
					if(res.data.result.code == 0) {
						this.storageData = res.data.data.records;
					}
				});
			},
			//设备列表
			deviceData(row) {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					id: row.id
				};
				this.devicelistLoading = true;
				getDeviceList(para).then((res) => {
					this.devicelistLoading = false;
					if(res.data.result.code == 0) {
						this.dtotal = res.data.data.totalResult;
						this.deviceInfoList = res.data.data.records;
						this.curDeviceRow = row;
					}
				});
			},
			// 点击批量入库的提交时
			stoinSubmit(formName) {
				// if(!this.modelflag) {
				// 	this.$message({
				// 		message: "请检查上传模板是否正确！",
				// 		duration: "10000",
				// 		type: 'error'
				// 	});
				// 	return;
				// }
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = {
							batchno: this.ruleForm.batchno
						}
						submitUploadSuccess(para).then((res) => {
							if(res.data.result.code == 0) {
								this.multAddFormVisible = false;
								this.$message({
									message: '批量入库成功',
									type: 'success'
								});
								this.handleQuery();
							}else{
								this.$message({
									message: res.result.desc,
									type: 'error'
								});
								this.handleQuery();
							}
						});
					} else {
						return false;
					}
				});
			},
			// 点击批量入库的取消时
			stoinSubmitCancel() {
				if(this.showData.length == 0) return;
				let para = {
					batchno: this.ruleForm.batchno,
				}
				submitUploadCancel(para).then((res) => {});
			},
			//
			//上传文件之前
			handleRemove(file, fileList) {
				this.$refs.upload.$el.childNodes[0].childNodes[1].value = '';
			},
			// 上传成功后
			submitSuccess(res, file) {
				if(res.data) {
					// 页面显示返回的数据
					this.showData = res.data;
					this.modelflag = true;
				} else {
					// this.$message ({
					// 	message : "上传失败，请查看模板文件格式是否正确！[错误编码"+res.result.code+"]："+res.result.desc,
					// 	duration:"10000",
					// 	type: 'error'
					// });
					this.$message({
						message: "上传失败，请查看模板文件格式是否正确！[错误编码" + res.result.code + "]：" + res.result.desc,
						type: 'error'
					});
					return;
				}
			},
			//上传失败
			submitError(err, file, fileList) {
				this.$message({
					message: '上传失败' + err,
					type: 'error'
				});
			},
			// 上传成功后
			submitUpload(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$refs.upload.submit();
					} else {
						return false;
					}
				});
			},
			handleSelectName(item) {
				this.editForm.storagename = item.value;
				this.editForm.storageid = item.id;
				this.addForm.storagename = item.value;
				this.addForm.storageid = item.id;
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.stoindate == "" || row.stoindate == undefined) return;
				return util.formatDate.format(new Date(row.stoindate), 'yyyy-MM-dd');
			},
			//有效转换器
			formatIsactive(row, column) {
				return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
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
			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.currentPage = val;
				this.deviceData(this.curDeviceRow);
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.pageSize = val;
				this.deviceData(this.curDeviceRow);
			},
			multHandleAdd() {
				this.resetForm();
				this.multAddFormVisible = true;
				this.modelflag = false;
				let rnum = util.getTimeAndRandom(4);
				this.ruleForm.batchno = rnum;
			},
			//删除表格一行
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			//设备类型改变
			deviceTypeChange(r) {
				if(!r || this.deviceVersionData1.length > 0) return;
				let para1 = {
					showCount: 100,
					isactive: 1
				};
				para1.prodcategory = 'E';
				getProductModel(para1).then((res) => {
					if(res.data.data.records.length > 0) {
						this.deviceVersionData1 = res.data.data.records;
					}
				});
			},
			//卡类型改变
			deviceKTypeChange(r) {
				if(!r || this.deviceVersionData2.length > 0) return;
				let para1 = {
					showCount: 100,
					isactive: 1
				};
				para1.prodcategory = 'C';
				getProductModel(para1).then((res) => {
					if(res.data.data.records.length > 0) {
						this.deviceVersionData2 = res.data.data.records;
					}
				});
			},
			//添加一行数据
			addDevice(prodcategory) {
				let obj = '';
				if(prodcategory == "E") {
					obj = {
						relateproductinfo1: {//设备
							prodmodelid: '',
							prodnum: '',
							prodcategory: 'E'
						},
						relateproductinfo: {//卡
							prodmodelid: '',
							prodnum: '',
							prodcategory: ''
						},
					}
				};
				if(prodcategory == "C") {
					obj = {
						relateproductinfo1: {//设备
							prodmodelid: '',
							prodnum: '',
							prodcategory: ''
						},
						relateproductinfo: {//卡
							prodmodelid: '',
							prodnum: '',
							prodcategory: 'C'
						},
					}
				};
				if(prodcategory == "3") {
					obj = {
						relateproductinfo1: {
							prodmodelid: '',
							prodnum: '',
							prodcategory: '3'
						},
						relateproductinfo: {
							prodmodelid: '',
							prodnum: '',
							prodcategory: '3'
						},
					}
				};
				this.deviceInfo.push(obj);
			},
			//获取入库列表
			handleQuery() {
				let para = {
						currentPage: this.currentPage,
						showCount: this.pageSize,
						suppliername: this.filters.suppliername
					},
					para1 = {
						dicvalue: 'ProdCategory'
					},
					para2 = {
						showCount: 100,
						isactive: 1,
						prodcategory: 'E',
					},
					_this = this;
				this.listLoading = true;
				getStoInList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
				}).catch(function(error) {
					_this.listLoading = false;
				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addResetForm();
				let rnum = util.getTimeAndRandom(4);
				this.addForm.batchno = rnum;
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						modifyStoIn(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							}
						});
					}
				});
			},
			//新增
			addSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para1 = {
								supplierid: this.addForm.supplierid,
								storageid: this.addForm.storageid,
								inquantity: this.addForm.inquantity,
								batchno: this.addForm.batchno,
								productInfos: [],
								remark: this.remark
							},
							islock = false;

						var prodnumList = [],simnumList = [],prodarr=[],simarr=[];//设备编号组，卡号组，排序组
						this.deviceInfo.forEach((res, index) => {
							if(res.relateproductinfo.prodcategory == '' && res.relateproductinfo1.prodcategory == "E") {//设备
								if(res.relateproductinfo1.prodmodelid == '') {
									this.$message({
										message: '设备型号必须选择，不能为空！',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if(res.relateproductinfo1.prodnum == '') {
									this.$message({
										message: '设备编号不能为空',
										type: 'warning'
									});
									islock = true;
									return;
								}
								// 设备编号组
								prodnumList.push(res.relateproductinfo1.prodnum);
								prodarr = prodnumList.sort();

							}
							if(res.relateproductinfo.prodcategory == 'C' && res.relateproductinfo1.prodcategory == "") {//卡
								if(res.relateproductinfo.prodmodelid == '') {
									this.$message({
										message: '卡型号必须选择，不能为空！',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if(res.relateproductinfo.prodnum == '') {
									this.$message({
										message: '卡编号不能为空',
										type: 'warning'
									});
									islock = true;
									return;
								}
								// 卡号组
								simnumList.push(res.relateproductinfo.prodnum);
								simarr = simnumList.sort();
							}
							if(res.relateproductinfo.prodcategory == '3' && res.relateproductinfo1.prodcategory == "3") {//组装
								if(res.relateproductinfo1.prodmodelid == '') {
									this.$message({
										message: '组装设备型号必须选择，不能为空！',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if(res.relateproductinfo1.prodnum == '') {
									this.$message({
										message: '组装设备编号不能为空',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if(res.relateproductinfo.prodmodelid == '') {
									this.$message({
										message: '组装卡型号必须选择，不能为空！',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if(res.relateproductinfo.prodnum == '') {
									this.$message({
										message: '组装卡编号不能为空',
										type: 'warning'
									});
									islock = true;
									return;
								}
								if (res.relateproductinfo.prodnum == res.relateproductinfo1.prodnum) {
									this.$message({
										message: '组装设备编号和卡编号不能相同',
										type: 'warning'
									});
									islock = true;
									return;
								}
							}
							if(res.relateproductinfo.prodcategory != '' && res.relateproductinfo.prodcategory == "C") {
								para1.productInfos.push(res.relateproductinfo);
							}
							if(res.relateproductinfo1.prodcategory != '' && res.relateproductinfo1.prodcategory == "E") {
								para1.productInfos.push(res.relateproductinfo1);
							}
							if(res.relateproductinfo1.prodcategory == '3' || res.relateproductinfo.prodcategory == '3') {
								para1.productInfos.push({
									prodmodelid: res.relateproductinfo1.prodmodelid,
									prodnum: res.relateproductinfo1.prodnum,
									prodcategory: 'E',
									relateproductinfo: {
										prodmodelid: res.relateproductinfo.prodmodelid,
										prodnum: res.relateproductinfo.prodnum,
										prodcategory: 'C'
									}
								});
							}
						});
						// 判断设备编号、卡号是否重复
						for (var i = 1; i < prodarr.length; i++) {
						    if (prodarr[i] === prodarr[i - 1]) {
						        	this.$message({
								message: '设备编号不能相同！',
								type: 'warning'
							});
							islock = true;
							return;
						    }
						};
						for (var i = 1; i < simarr.length; i++) {
						    if (simarr[i] === simarr[i - 1]) {
						        	this.$message({
								message: '卡编号不能相同！',
								type: 'warning'
							});
							islock = true;
							return;
						    }
						};


						if(islock) return;
						if (!this.regflag) return;
						this.addLoading = true;
						addDeviceStoIn(para1).then((res) => {
							this.addLoading = false;
							if(res.data.result.code == 0) {
								this.$message({
									message: '物资入库成功！',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							}
						});
					}
				});
			},
			resetForm() {
				this.ruleForm = {
					supplierid: '',
					storageid: '',
					batchno: ''
				};
				this.showData = [];
				if(this.$refs.upload) {
					this.$refs.upload.clearFiles();
					//清空文件
					this.$refs.upload.$el.childNodes[0].childNodes[1].value = '';
				}
			},
			addResetForm() {
				this.addForm = {
					storageid: '',
					prodnum: '',
					prodsnnum: '',
					inquantity: '',
					remark: '',
					supplierid: '',
					batchno: '',
					prodcategory: '',
					productInfos: []
				};
				this.deviceInfo = [];
			},
		},
		created() {
			this.handleQuery();
		}
	}
</script>