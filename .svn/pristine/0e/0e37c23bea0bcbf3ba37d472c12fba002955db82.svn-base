<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<template v-for="(item,index) in filters.domSearch">
					<template v-if="index == 0">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
								<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
									<el-option label="ICCID" value="simprodnum"></el-option>
									<el-option label="IMEI" value="simprodsnnum"></el-option>
									<el-option label="卡型号" value="simproductmodelname"></el-option>
									<el-option label="库房" value="simstoragename"></el-option>
									<el-option label="状态" value="simstatus"></el-option>
									<el-option label="供应商" value="simsuppliername"></el-option>
								</el-select>
								<template v-if="index == filters.domSearch.length-1">
									<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
								</template>
								<template v-else>
									<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
								</template>
							</el-input>
						</div>
					</template>
					<template v-else>
						<el-col :span="24">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="ICCID" value="simprodnum"></el-option>
										<el-option label="IMEI" value="simprodsnnum"></el-option>
										<el-option label="卡型号" value="simproductmodelname"></el-option>
										<el-option label="库房" value="simstoragename"></el-option>
										<el-option label="状态" value="simstatus"></el-option>
										<el-option label="供应商" value="simsuppliername"></el-option>
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
									</template>
								</el-input>
							</div>
						</el-col>
					</template>

					<template v-if="index == 0">
						<el-form-item>
							<el-button type="primary" @click="handleQuerySelect" @keyup.native.13="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.appointtype" :width="55" active-color="#00C1DE" inactive-color="#ff4949" active-value="I" active-text="平台内" inactive-value="E" inactive-text="平台外" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="simprodnum" label="ICCID" width="170" align="center" >
			</el-table-column>
			<el-table-column prop="simprodsnnum" label="IMEI" width="170" align="center" >
			</el-table-column>
			<el-table-column prop="simproductmodelname" label="型号" align="center" width="110" >
			</el-table-column>
			<el-table-column prop="simstoragename" label="库房" align="center" >
			</el-table-column>
			<el-table-column prop="simstatus" label="状态" :formatter="statusFormat" align="center" >
			</el-table-column>
			<el-table-column prop="simprodnum" label="卡号" width="170" align="center" >
			</el-table-column>
			<el-table-column prop="simsuppliername" label="供应商" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID,scope.row)" title="详情">
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleSend(scope.$index, scope.row)" title='点击发送'>
						<i class='iconfont icon-fasongduilie operate operate-fasongduilie'></i>
					</el-button>
					<!-- <el-button size="middle" type="success" @click="handleSend(scope.$index, scope.row)">发送</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="warning" @click="batchRemove(scope.$index, scope.row)" :disabled="this.sels.length===0">批量发送</el-button>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;">
					<el-col :span="24">
						<span class="formTile">SIM卡信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>ICCID:</dt>
							<dd>{{ SIMdata.simprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>IMEI:</dt>
							<dd>{{ SIMdata.simprodsnnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>卡类型:</dt>
							<dd>{{ SIMdata.simproductmodelname }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ SIMdata.simstoragename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ SIMdata.simsuppliername }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ SIMdata.simstatus == 'INSTO' ? '在库' : SIMdata.simstatus == 'INSTALL' ? '已安装' : SIMdata.simstatus == 'LOST' ? '报失' : SIMdata.simstatus == 'REPAIR' ? '维修' : SIMdata.simstatus == 'DAMAGE' ? '报废' : SIMdata.simstatus == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ SIMdata.simprotocoltype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ SIMdata.dictdatavalue }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否组装:</dt>
							<dd>{{ SIMdata.simispack == '1' ? '是' : SIMdata.simispack == '0' ? '否' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否旧设备:</dt>
							<dd>{{ SIMdata.simisold == '1' ? '是' : SIMdata.simisold == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>有效期:</dt>
							<dd>{{ SIMdata.simexpiredate == null ? "" :fmtdata.formatDate.format(new Date(SIMdata.simexpiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ SIMdata.simremark }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row style="padding:10px 40px;margin-top:20px;border-top:1px solid #FFECEC;">
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd>{{ psData.prodprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备型号:</dt>
							<dd>{{ psData.prodproductmodelname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备类型:</dt>
							<dd>{{ psData.prodspec }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ psData.prodstoragename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ psData.prodsuppliername }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ psData.prodstatus == 'INSTO' ? '在库' : psData.prodstatus == 'INSTALL' ? '已安装' : psData.prodstatus == 'LOST' ? '报失' : psData.prodstatus == 'REPAIR' ? '维修' : psData.prodstatus == 'DAMAGE' ? '报废' : psData.prodstatus == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ psData.prodprotocoltype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ psData.dictdatavalue }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否组装:</dt>
							<dd>{{ psData.prodispack == '1' ? '是' : psData.prodispack == '0' ? '否' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否旧设备:</dt>
							<dd>{{ psData.prodisold == '1' ? '是' : psData.prodisold == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>有效期:</dt>
							<dd>{{ psData.prodexpiredate == null ? "" :fmtdata.formatDate.format(new Date(psData.prodexpiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ psData.prodremark }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--发送界面-->
		<el-dialog title="选择发送指令" :modal-append-to-body="false" :visible.sync="sendFormVisible" :close-on-click-modal="false">
			<el-form :model="sendForm" :rules="sendFormRules" ref="sendForm">
				<el-table ref="multipleTable" :data="orderList" border tooltip-effect="dark" @select="handleSelectionChange" max-height="400">
					<el-table-column type="selection" width="30" align="center"> </el-table-column>
					<el-table-column label="短信ID" width="50" prop="id" align="center">
						<template scope="scope">{{ scope.row.id }}</template>
					</el-table-column>
					<el-table-column label="短信代码" width="400" prop="code" align="center">
						<template scope="scope">{{ scope.row.code }}</template>
					</el-table-column>
					<el-table-column label="短信名称" prop="name" align="center">
						<template scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column label="短信描述" prop="alias" align="center">
						<template scope="scope">{{ scope.row.alias }}</template>
					</el-table-column>

				</el-table>

				<div style="margin-top: 20px">
					<el-button @click="toggleSelection()">取消选择</el-button>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="sendFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="sendSubmit" :loading="sendLoading">确认发送</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getProductInfoList, getOrderLogList, sendOrderLog, getOrderList, getAllProSimInfoList, getMesgSendList, getSelectMesgSendList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					Formate(value) {
						return new Date(value).toLocaleDateString().replace(/\//g, "-");
					},
					domSearch: [{
						select: [],
						content: ''
					}], //查询框
					appointtype: 'I',
				},
				fmtdata: util,
				total: 0,
				listData: [],
				formDialogTableVisible: false,
				psData: [],
				productData: [], //绑定设备数据
				orderList: [], //获取指令列表
				SIMdata: [],
				// multipleSelection: [],//指令选中列表
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				sendFormVisible: false, //编辑界面是否显示
				sendLoading: false,
				sendFormRules: {},
				//发送界面数据
				sendForm: {
					prodnum: '',
					multipleSelection: {}, //指令选中列表
					// simcardnum:'',
					// ordercode:'',
					// orderdesc:'',
					// status:'',
					// success:'',
				},

				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
			}
		},
		methods: {
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(simid, data) {
				this.formDialogTableVisible = true;
				// 获取绑定的设备信息
				this.psData = ''; //清空上条
				this.SIMdata = data;
				let para = {
					id: simid,
				}
				//获取当前设备、SIM卡信息
				getMesgSendList(para).then((res) => {
					this.psData = ''; //清空上条数据赋的值
					this.psData = res.data.data.records[0];
					console.log(res)
				});
				// 获取当前的卡信息
				let paraTwo = {
					id: simid,
				}
				getMesgSendList(paraTwo).then((res) => {
					this.psData = ''; //清空上条数据赋的值
					this.psData = res.data.data.records[0];
				});
			},
			// 开关
			showData(i) {
				this.filters.appointtype = i;
				this.GetInsurances();
			},
			// 显示关联的设备信息
			showProductTableData(id) {
				let para = {
					id: id - 1,
				}
				//获取设备信息
				getProductInfoList(para).then((res) => {
					this.productData = res.data.data.records;
				});
			},
			//设备状态显示转换
			statusFormat: function(row, col) {
				return row.simstatus == 'INSTO' ? '在库' : row.simstatus == 'INSTALL' ? '已安装' : row.simstatus == 'LOST' ? '报失' : row.simstatus == 'REPAIR' ? '维修' : row.simstatus == 'DAMAGE' ? '报废' : row.simstatus == 'ONWAY' ? '在途' : '';
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.expiredate == "" || row.expiredate == undefined) return;
				return util.formatDate.format(new Date(row.expiredate), 'yyyy-MM-dd');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.createdate == "" || row.createdate == undefined) return;
				return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd');
			},
			//时间转换3
			dateFormatterThird: function(row, col) {
				if(row.updatedate == "" || row.updatedate == undefined) return;
				return util.formatDate.format(new Date(row.updatedate), 'yyyy-MM-dd');
			},
			//是否的转换
			isFormat: function(row, col) {
				return row.ispack == 1 ? '是' : '否';
			},
			isFormatTwo: function(row, col) {
				return row.isold == 1 ? '是' : '否';
			},

			// 取消指令选择
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.dateFormatter == "" || row.dateFormatter == undefined) return;
				return util.formatDate.format(new Date(row.dateFormatter), 'yyyy-MM-dd hh:mm:ss');
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.GetInsurances();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
			},
			//显示发送界面
			handleSend(index, row) {
				this.sendFormVisible = true;
				this.sendForm = {
					prodnum: row.prodnum,
					multipleSelection: {},
				}
			},
			// 指令选择改变后
			handleSelectionChange(val, row) {
				this.$refs.multipleTable.clearSelection(); //清除其他选项框
				this.$refs.multipleTable.toggleRowSelection(row, true); //选中选项框
				this.sendForm.multipleSelection = val;
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询条件
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					appointtype: this.filters.appointtype,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectMesgSendList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取列表
			GetInsurances() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					appointtype: this.filters.appointtype,
				};
				this.listLoading = true;
				getMesgSendList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
				// 获取指令列表
				getOrderList(para).then((res) => {
					this.orderList = res.data.data.records;
				});
			},

			//发送
			sendSubmit() {
				this.$refs.sendForm.validate((valid) => {
					if(valid) {
						this.sendLoading = true;
						let para = {
							prodnum: this.sendForm.prodnum,
							// multipleSelection:{},
							id: '',
							code: '',
							alias: '',
							simcardnum: this.sendForm.prodnum,
							orderid: '',
							ordercode: '',
							orderdesc: '',
							status: '',
							flag: '',
						}
						var selectArr = new Array();
						console.log()
						this.sendForm.multipleSelection.forEach(function(item, index) {
							var selectData = {
								id: item.id,
								code: item.code,
								alias: item.alias,
								// simcardnum:item.simcardnum,
								// ordercode:item.ordercode,
								// orderdesc:item.orderdesc,
								// status:item.status,
								// flag:item.flag,
							}
							selectArr.push(selectData);
						});
						// para.multipleSelection = selectArr;
						para.id = selectArr[0].id;
						para.orderid = selectArr[0].id;
						para.code = selectArr[0].code;
						para.ordercode = selectArr[0].code;
						para.alias = selectArr[0].alias;
						para.orderdesc = selectArr[0].alias;

						sendOrderLog(para).then((res) => {
							this.sendLoading = false;
							this.$message({
								message: '发送成功',
								type: 'success'
							});
							this.$refs['sendForm'].resetFields();
							this.sendFormVisible = false;
							this.GetInsurances();
						}).catch((error) => {
							this.sendLoading = false;
						});
					}
				});
			},

			selsChange(sels) {
				this.sels = sels;
			},
			//批量发送
			batchRemove(index, row) {
				this.sendFormVisible = true;
				// this.editForm = Object.assign({}, row);
				this.sendForm = {
					prodnum: row.prodnum,
					multipleSelection: {},
				}
			},

		},
		created() {
			this.GetInsurances();
		}
	}
</script>