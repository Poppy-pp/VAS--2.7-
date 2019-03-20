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
									<el-option label="库房" value="storagename"></el-option>
									<el-option label="状态" value="status"></el-option>
									<el-option label="供应商" value="suppliername"></el-option>
									<el-option label="协议" value="protoclotype"></el-option>
									<el-option label="安装位置" value="dictdatavalue"></el-option>
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
										<el-option label="库房" value="storagename"></el-option>
										<el-option label="状态" value="status"></el-option>
										<el-option label="供应商" value="suppliername"></el-option>
										<el-option label="协议" value="protoclotype"></el-option>
										<el-option label="安装位置" value="dictdatavalue"></el-option>
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
							<el-select v-model="filters.groupid" @visible-change="groupChange" :loading="groupLoading" filterable placeholder="请选择分组" clearable @change="handleQuerySelect">
								<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="prodnum" label="编号" width="165" align="center" >
			</el-table-column>
			<el-table-column prop="productmodelname" label="型号" align="center" >
			</el-table-column>
			<el-table-column prop="prodspec" label="类别" align="center" >
			</el-table-column>
			<el-table-column prop="storagename" label="库房" align="center" >
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="statusFormat" width="70" align="center" >
			</el-table-column>
			<el-table-column prop="suppliername" label="供应商" align="center" >
			</el-table-column>
			<el-table-column prop="protoclotype" label="协议" align="center" >
			</el-table-column>
			<el-table-column prop="dictdatavalue" label="安装位置" align="center" >
			</el-table-column>
			<el-table-column prop="ispack" label="组装" :formatter="isFormat" width="70" align="center" >
			</el-table-column>
			<el-table-column prop="isold" label="旧设备" :formatter="isFormatTwo" width="70" align="center" >
			</el-table-column>
			<el-table-column prop="platid" label="接入平台" :formatter="isFormatThree" width="80" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="40" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id,scope.row)" title="详情">
						<i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
					<el-col :span="9">
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
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ psData.prodstoragename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ psData.prodsuppliername }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ psData.prodstatus == 'INSTO' ? '在库' : psData.prodstatus == 'INSTALL' ? '已安装' : psData.prodstatus == 'LOST' ? '报失' : psData.prodstatus == 'REPAIR' ? '维修' : psData.prodstatus == 'DAMAGE' ? '报废' : psData.prodstatus == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ psData.prodprotoclotype }}</dd>
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
							<dt>是否接入平台:</dt>
							<dd>{{ psData.platid == null ? '否' : '是' }}</dd>
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
					<!-- <el-col :span="24" style="margin-bottom:10px;">
							<el-button type="primary" v-show="this.psData.simID == undefined" @click.native="addDeviceList" icon="el-icon-plus">点击绑卡</el-button>
						</el-col> -->
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{moreData.createdate == null ? "" :fmtdata.formatDate.format(new Date(moreData.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{moreData.updatedate == null ? "" :fmtdata.formatDate.format(new Date(moreData.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="this.psData.simID != undefined">
					<el-col :span="24">
						<span class="formTile">SIM卡信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>ICCID:</dt>
							<dd>{{ psData.simprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>IMEI:</dt>
							<dd>{{ psData.simprodsnnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>卡类型:</dt>
							<dd>{{ psData.simproductmodelname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ psData.storagename }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>供应商:</dt>
							<dd>{{ psData.suppliername }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ psData.simstatus == 'INSTO' ? '在库' : psData.simstatus == 'INSTALL' ? '已安装' : psData.simstatus == 'LOST' ? '报失' : psData.simstatus == 'REPAIR' ? '维修' : psData.simstatus == 'DAMAGE' ? '报废' : psData.simstatus == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ psData.simprotoclotype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ psData.dictdatavalue }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否组装:</dt>
							<dd>{{ psData.simispack == '1' ? '是' : psData.simispack == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否旧设备:</dt>
							<dd>{{ psData.simisold == '1' ? '是' : psData.simisold == '0' ? '否' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>有效期:</dt>
							<dd>{{ psData.simexpiredate == null ? "" :fmtdata.formatDate.format(new Date(psData.simexpiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ psData.simremark }}</dd>
						</dl>
					</el-col>
					<!-- 	<el-col :span="24">
								<el-button type="danger" @click.native="cancel" icon="share">解绑</el-button>
						</el-col> -->
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="vehInfo != ''">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车主:</dt>
							<dd>{{vehInfo.NAME}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd>{{vehInfo.licenseplatenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd>{{vehInfo.vin}}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>厂牌型号:</dt>
							<dd>{{vehInfo.model}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发动机号:</dt>
							<dd>{{vehInfo.enginenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车类型:</dt>
							<dd>{{vehInfo.vehicletypename}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>初始登记日期:</dt>
							<dd>{{ vehInfo.createdate == null ? "" :fmtdata.formatDate.format(new Date(vehInfo.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆颜色:</dt>
							<dd>{{vehInfo.colorname}}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="psData.platid != null">
					<el-col :span="24">
						<span class="formTile">平台信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台名称:</dt>
							<dd>{{psData.platname}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台IP:</dt>
							<dd>{{psData.platid}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>时间:</dt>
							<dd>{{psData.platcreatedate}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{psData.platcreateby}}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

	</section>
</template>

<style type="text/css" media="screen">
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getProductInfoList, getSortList, getProductOwnerList, getSelectListProd, getAllProSimInfoList, getEmpGroupInfoList,getNamebyUserid } from '../../api/api';
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
					isdelete: 0,
					groupid: '',
				},
				listData: [],
				moreData: [], //创建信息
				psData: [], //绑定设备SIM卡数据
				vehInfo: [], //绑定车辆信息
				formDialogTableVisible: false, //是否显示订单详情弹出
				createname:'',
				updatename:'',
				grouplist: [], //所属分组
				groupLoading: false, //
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false
			}
		},
		methods: {
			/*分组查询——下拉*/
			groupChange(r) {
				if(!r || this.grouplist.length > 0) return;
				this.groupLoading = true;
				getEmpGroupInfoList().then((res) => {
					this.grouplist = res.data.data.records;
					this.groupLoading = false;
				});
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
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			//详情查看
			formDetailHandle(prodid, data) {
				this.moreData = data;
				this.formDialogTableVisible = true;
				this.createname = '';
				this.updatename = '';
				let para = {
					prodID: prodid,
				}
				console.log(data)
				nanobar.go(70);
				//获取当前设备、SIM卡信息
				getAllProSimInfoList(para).then((res) => {
					this.psData = ''; //清空上条数据赋的值
					if(res.data.result.code == 0){
						if(res.data.data.records.length == 0) {
							this.$message({
								message: '该设备暂未绑定SIM卡！',
								type: 'warning'
							});
						} else {
							this.psData = res.data.data.records[0];
							let paraThree = {
								createby: data.createby,
								updateby: data.updateby
							}
							getNamebyUserid(paraThree).then((res) => {
								this.createname = res.data.data[0];
								this.updatename = res.data.data[1];
							});
						}
					}
				});
				let paraTwo = {
					PRODID: prodid,
				}
				// 获取设备绑定车辆信息
				getProductOwnerList(paraTwo).then((res) => {
					this.vehInfo = ''; //清空上条数据赋的值
					if(res.data.data.records.length == 0) {
						// this.$message({
						//                     message: '该设备暂未绑定车辆！',
						//                     type: 'warning'
						//                    });
					} else {
						this.vehInfo = res.data.data.records[0];
						console.log(this.vehInfo)
					}
					nanobar.go(100);
				});
			},
			//设备状态显示转换
			statusFormat: function(row, col) {
				return row.status == 'INSTO' ? '在库' : row.status == 'INSTALL' ? '已安装' : row.status == 'LOST' ? '报失' : row.status == 'REPAIR' ? '维修' : row.status == 'DAMAGE' ? '报废' : row.status == 'ONWAY' ? '在途' : '';
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.isdelete == 1 ? '否' : row.isdelete != undefined ? '是' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isdelete == 1) {
					return 'warning-row';
				}
				return '';
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
					prodcategory: "E",
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch,
					groupid: this.filters.groupid,
				};
				this.listLoading = true;
				getSelectListProd(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					prodcategory: 'E',
					// 搜索设置部分
					isdelete: this.filters.isdelete,
					groupid: this.filters.groupid,
				};
				this.listLoading = true;
				//获取设备
				getProductInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			}
		},
		created() {
			this.handleQuery();
		},

	}
</script>