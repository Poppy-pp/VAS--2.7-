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
									<el-option label="设备编号" value="prodnum"></el-option>
									<el-option label="设备型号" value="productmodelname"></el-option>
									<el-option label="设备类别" value="prodspec"></el-option>
									<el-option label="批次号" value="batchno"></el-option>
									<el-option label="上线状态" value="online"></el-option>
									<el-option label="库房" value="storagename"></el-option>
									<el-option label="状态" value="status"></el-option>
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
										<el-option label="设备编号" value="prodnum"></el-option>
										<el-option label="设备型号" value="productmodelname"></el-option>
										<el-option label="设备类别" value="prodspec"></el-option>
										<el-option label="批次号" value="batchno"></el-option>
										<el-option label="上线状态" value="online"></el-option>
										<el-option label="库房" value="storagename"></el-option>
										<el-option label="状态" value="status"></el-option>
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
							<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-200" stripe border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="prodnum" label="编号" width="165" align="center" >
			</el-table-column>
			<el-table-column prop="productmodelname" label="型号" align="center" >
			</el-table-column>
			<el-table-column prop="prodspec" label="类别" align="center" width="60" >
			</el-table-column>
			<el-table-column prop="storagename" label="库房" align="center" width="60" >
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="statusFormat" width="60" align="center" >
			</el-table-column>
			<el-table-column prop="batchno" label="批次" align="center" >
			</el-table-column>
			<el-table-column prop="online" label="上线状态" :formatter="onlineFormat" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="lastonlineaddress" label="上线位置" align="center" >
			</el-table-column>
			<el-table-column prop="lastonlinedate" label="上线时间" :formatter="dateFormat" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="210" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id)" title="详情">
						<i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
					</el-button>
					<el-button type="primary" :disabled="scope.row.status != 'INSTO'" size="small" @click.native="addDeviceList(scope.row)">绑定</el-button>
					<el-button type="danger" :disabled="scope.row.status != 'INSTO'" size="small" @click="cancel(scope.row)">解绑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="this.moreDataProd.prodnum != undefined">
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd>{{ moreDataProd.prodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备型号:</dt>
							<dd>{{ moreDataProd.productmodelname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备类型:</dt>
							<dd>{{ moreDataProd.prodspec }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>批次号:</dt>
							<dd>{{ moreDataProd.batchno }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ moreDataProd.storagename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ moreDataProd.suppliername }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>上线状态:</dt>
							<dd>{{ moreDataProd.online == 'A' ? '未上线' : moreDataProd.online == 'B' ? '离线' : moreDataProd.online == 'C' ? '在线' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>上线位置:</dt>
							<dd>{{ moreDataProd.lastonlineaddress }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>上线时间:</dt>
							<dd>{{ moreDataProd.lastonlinedate == null ? "" :fmtdata.formatDate.format(new Date(moreDataProd.lastonlinedate), 'yyyy-MM-dd hh:mm:ss') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ moreDataProd.status == 'INSTO' ? '在库' : moreDataProd.status == 'INSTALL' ? '已安装' : moreDataProd.status == 'LOST' ? '报失' : moreDataProd.status == 'REPAIR' ? '维修' : moreDataProd.status == 'DAMAGE' ? '报废' : moreDataProd.status == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ moreDataProd.protoclotype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ moreDataProd.dictdatavalue }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否组装:</dt>
							<dd>{{ moreDataProd.ispack == '1' ? '是' : moreDataProd.ispack == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否旧设备:</dt>
							<dd>{{ moreDataProd.isold == '1' ? '是' : moreDataProd.isold == '0' ? '否' : '' }}</dd>
						</dl>

						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否接入平台:</dt>
							<dd>{{ moreDataProd.platid == null ? '否' : '是' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>有效期:</dt>
							<dd>{{ moreDataProd.expiredate == null ? "" :fmtdata.formatDate.format(new Date(moreDataProd.expiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ moreDataProd.remark }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="this.moreDataSim.prodnum != undefined">
					<el-col :span="24">
						<span class="formTile">SIM卡信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>ICCID:</dt>
							<dd>{{ moreDataSim.prodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>卡类型:</dt>
							<dd>{{ moreDataSim.productmodelname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ moreDataSim.storagename }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ moreDataSim.suppliername }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ moreDataSim.status == 'INSTO' ? '在库' : moreDataSim.status == 'INSTALL' ? '已安装' : moreDataSim.status == 'LOST' ? '报失' : moreDataSim.status == 'REPAIR' ? '维修' : moreDataSim.status == 'DAMAGE' ? '报废' : moreDataSim.status == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ moreDataSim.protoclotype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ moreDataSim.dictdatavalue }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否组装:</dt>
							<dd>{{ moreDataSim.ispack == '1' ? '是' : moreDataSim.ispack == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否旧设备:</dt>
							<dd>{{ moreDataSim.isold == '1' ? '是' : moreDataSim.isold == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>有效期:</dt>
							<dd>{{ moreDataSim.expiredate == null ? "" :fmtdata.formatDate.format(new Date(moreDataSim.expiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ moreDataSim.remark }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--列表选择界面-->
		<el-dialog title="绑定信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" @close="clearAllThis()" :close-on-click-modal="false">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo(rowDataList)" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="设备编号" value="prodnum"></el-option>
										<el-option label="设备型号" value="productmodelname"></el-option>
										<el-option label="设备类别" value="prodspec"></el-option>
										<el-option label="库房" value="storagename"></el-option>
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
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo(rowDataList)" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
										<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
											<el-option label="设备编号" value="prodnum"></el-option>
											<el-option label="设备型号" value="productmodelname"></el-option>
											<el-option label="设备类别" value="prodspec"></el-option>
											<el-option label="库房" value="storagename"></el-option>
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
								<el-button type="primary" @click="getDeciceListInfo(rowDataList)" @keyup.native.13="getDeciceListInfo(rowDataList)" icon="el-icon-search">查询</el-button>
							</el-form-item>
						</template>
					</template>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border :data="deviceListData" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @row-dblclick="comlist" style="width: 100%;">
				<el-table-column prop="prodnum" label="设备编号" width="165" align="center">
				</el-table-column>
				<el-table-column prop="productmodelname" label="设备型号" align="center">
				</el-table-column>
				<el-table-column prop="prodspec" label="设备类别" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<!-- <el-button type="primary" icon="share" class="mt5" @click="comlist" :disabled="this.sels.length===0">确认绑定</el-button> -->
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getProductOwnerList, getSelectListSIM, getMoreDataList, addUnbundleSIM, cancelUnbundle, getStoProductInfoList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['prodnum'],
						content: ''
					}], //查询框
					isdelete: '0'
				},
				statusOptions: [{
					value: 'INSTO',
					label: '在库'
				}, {
					value: 'INSTALL',
					label: '已安装'
				}, {
					value: 'LOST',
					label: '报失'
				}, {
					value: 'REPAIR',
					label: '维修'
				}, {
					value: 'DAMAGE',
					label: '报费'
				}, {
					value: 'ONWAY',
					label: '在途'
				}],
				pickerOptions: { //日期
				},
				radio: '',
				listData: [],
				moreDataProd: [], //设备详情数据
				moreDataSim: [], //SIM卡详情数据
				resID: [], //绑卡后返回的设备id和卡id
				checkData: [], //选择绑卡check
				deviceListData: [], //绑卡
				deviceFormVisible: false,
				devicelistLoading: false,
				rowDataList: '', //点击绑定时获取的当条数据
				dtotal: 0,
				dcurrentPage: 1,
				dpageSize: 15,
				prodList: [], //设备
				psData: [], //绑定设备SIM卡数据
				vehInfo: [], //绑定车辆信息
				formDialogTableVisible: false, //是否显示订单详情弹出
				customers: [],
				moNamelist: [], //设备型号列表
				moNameLoading: false, //设备型号
				stoNamelist: [], //库房名称列表
				stoNameLoading: false, //库房名称
				total: 0,
				currentPage: 1,
				pageSize: 15,
				showCount: '',
				listLoading: false,
				sels: [], //列表选中列
			}
		},
		methods: {
			//多选框check时
			selsChange(sels, row) {
				this.sels = sels;
			},
			// 确认解绑
			cancel(rows) {
				this.$confirm('是否确认解绑?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
			        	}).then(() => {
					if(rows.status != 'INSTO') { //当设备状态不是在库的时候
						this.$message({
							message: '抱歉！设备状态必须是在库！',
							type: 'error'
						});
					}else if (rows.packid == undefined) {
						this.$message({
							message: '暂未绑定！无法解绑！',
							type: 'warning'
						});
					} else {
						this.deviceFormVisible = false;
						let para = {
							packid: rows.packid
						};
						cancelUnbundle(para).then((res) => {
							if(res.data.result.code == 0) {
								this.$message({
									message: '解绑成功！',
									type: 'success'
								});
							}
							this.handleQuerySelect();
						});
					}
			        	})
			},
			// 确认绑定
			comlist(checkData, event) {
				this.deviceFormVisible = false;
				if(this.rowDataList.prodcategory == 'E') { //当是 【设备绑卡】 时
					var para = {
						equipmentid: this.rowDataList.id,
						simcardid: checkData.id,
						storageid: this.rowDataList.storageid,
					};
				} else if(this.rowDataList.prodcategory == 'C'){ //当是 【卡绑设备】 时
					var para = {
						simcardid: this.rowDataList.id,
						equipmentid: checkData.id,
						storageid: this.rowDataList.storageid,
					};
				}
				addUnbundleSIM(para).then((res) => {
					if(res.data.result.code == 4001) { //未成功时
						this.$message({
							message: res.data.result.desc,
							type: 'error'
						});
						this.handleQuerySelect();
					} else {
						this.$message({
							message: '绑定成功！',
							type: 'success'
						});
						this.handleQuerySelect();
					}
				});

			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.getDeciceListInfo(this.rowDataList);
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.getDeciceListInfo(this.rowDataList);
			},
			// 查询将要绑定的设备或卡信息
			addDeviceList(rowData) {
				this.rowDataList = rowData; //将点击的当条设备数据保存

				if(this.rowDataList.status != 'INSTO') { //当设备状态不是在库的时候
					this.$message({
						message: '抱歉！设备状态必须是在库！',
						type: 'error'
					});
				} else {
					this.deviceFormVisible = true;
					this.filters = {
						isdelete: this.filters.isdelete,
						domSearch: [{
							select: ['prodnum'],
							content: ''
						}],
					};
					this.getDeciceListInfo(rowData);
				}
			},
			//获取设备或者卡信息
			getDeciceListInfo(rowData) {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					// 搜索设置部分
					domSearch: this.filters.domSearch, //查询框
					ispack: 0,
					isdelete: 0,
					storageid: rowData.storageid,
					prodcategory: this.rowDataList.prodcategory == 'C' ? 'E' : 'C',
					status: 'INSTO'
				};
				this.devicelistLoading = true;
				getSelectListSIM(para).then((res) => {
					this.devicelistLoading = false;
					if(res.data.result.code == 4001) {
						this.$message({
							message: res.data.result.desc,
							type: 'error'
						});
						this.devicelistLoading = false;
						return;
					}
					if(res.data.result.code == 0) {
						this.dtotal = res.data.data.totalResult;
						this.deviceListData = res.data.data.records;
					}
				}).catch((error) => {
					this.devicelistLoading = false;
				});
			},
			// 清空当前模糊查询
			clearAllThis() {
				this.filters.domSearch = [{
					select: ['prodnum'],
					content: ''
				}] //显示页面的默认查询条件;
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(allId) {
				this.formDialogTableVisible = true;
				let para = {
					id: allId,
				}
				nanobar.go(70);
				//获取当前设备、SIM卡信息
				getMoreDataList(para).then((res) => {
					this.moreDataProd = []; //清空上条数据赋的值
					this.moreDataSim = []; //清空上条数据赋的值

					if(res.data.data[0] == null) { //当前卡暂未绑定设备时
						this.moreDataProd = []; //初始化设备列表
						this.moreDataSim = res.data.data[1]; //赋值卡列表
						this.$message({
							message: '暂未绑定设备！',
							type: 'warning'
						});
					} else if(res.data.data[1] == null) { //当前设备暂未绑定卡时
						this.moreDataSim = []; //初始化卡列表
						this.moreDataProd = res.data.data[0]; //赋值设备列表
						this.$message({
							message: '暂未绑定卡！',
							type: 'warning'
						});
					} else {
						this.moreDataProd = res.data.data[0];
						this.moreDataSim = res.data.data[1];
					}
					nanobar.go(100);
				});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.handleQuery();
			},
			// 上线状态转换
			onlineFormat: function(row, col) {
				return row.online == 'A' ? '未上线' : row.online == 'B' ? '离线' : row.online == 'C' ? '在线' : '';
			},
			// 上线时间转换
			dateFormat: function(row, col) {
				if(row.lastonlinedate == "" || row.lastonlinedate == undefined) return;
				return util.formatDate.format(new Date(row.lastonlinedate), 'yyyy-MM-dd hh:mm:ss');
			},
			//设备状态显示转换
			statusFormat: function(row, col) {
				return row.status == 'INSTO' ? '在库' : row.status == 'INSTALL' ? '已安装' : row.status == 'LOST' ? '报失' : row.status == 'REPAIR' ? '维修' : row.status == 'DAMAGE' ? '报废' : row.status == 'ONWAY' ? '在途' : '';
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.isdelete == 1 ? '否' : row.isdelete != undefined ? '是' : '未知';
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
			isFormatThree: function(row, col) {
				return row.platid == null ? '否' : '是';
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
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
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
					// storageid:this.listData[0].storageid
				};
				this.listLoading = true;
				getSelectListSIM(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				//获取当前库房的设备
				getSelectListSIM(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
		},
		created() {
			this.handleQuery();
		},

	}
</script>

<style scoped>

</style>