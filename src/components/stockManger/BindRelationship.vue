<!--* 
* @description: 绑定关系
* @author: pl 
* @update: pl (2017-08-16 14:26) 
*-->
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
									<el-option label="ICCID" value="simnum"></el-option>
									<el-option label="通讯号" value="simsnnum"></el-option>
									<el-option label="车牌号" value="licenseplatenum"></el-option>
									<el-option label="车架号" value="vin"></el-option>
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
										<el-option label="ICCID" value="simnum"></el-option>
										<el-option label="通讯号" value="simsnnum"></el-option>
										<el-option label="车牌号" value="licenseplatenum"></el-option>
										<el-option label="车架号" value="vin"></el-option>
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
					</template>
				</template>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="prodnum" label="设备编号" align="center" >
			</el-table-column>
			<el-table-column prop="simnum" label="ICCID" align="center" >
			</el-table-column>
			<el-table-column prop="simsnnum" label="通讯号" align="center" >
			</el-table-column>
			<el-table-column prop="licenseplatenum" label="车牌号" align="center" >
			</el-table-column>
			<el-table-column prop="vin" label="车架号" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.prodid)" title="详情">
						<i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
					</el-button>
					<!-- 绑定 -->
					<el-button id="button" @click.native="vehBindingProd(scope.row)" title="设备绑车">
						<i class="iconfont icon-chezuojiachepai operate operate-color"><i class="iconfont icon-fasongshibai operate-position operate-bangding"><i class="iconfont icon-bangding white"></i></i>
						</i>
					</el-button>
					<!-- 绑定 -->
					<el-button id="button" @click.native="prodBindingSim(scope.row)" title="设备绑卡">
						<i class="iconfont icon-qia operate-color"><i class="iconfont icon-fasongshibai operate-position operate-bangding"><i class="iconfont icon-bangding white"></i></i>
						</i>
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
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd>{{ prodThisList.prodprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备型号:</dt>
							<dd>{{ prodThisList.prodproductmodelname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备类别:</dt>
							<dd>{{ prodThisList.prodspec}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ prodThisList.prodstoragename}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ prodThisList.prodstatus == 'INSTO' ? '在库' : prodThisList.prodstatus == 'INSTALL' ? '已安装' : prodThisList.prodstatus == 'LOST' ? '报失' : prodThisList.prodstatus == 'REPAIR' ? '维修' : prodThisList.prodstatus == 'DAMAGE' ? '报废' : prodThisList.prodstatus == 'ONWAY' ? '在途' : '' }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="this.prodThisList.simID != undefined">
					<el-col :span="24">
						<span class="formTile">SIM卡信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>ICCID:</dt>
							<dd>{{ prodThisList.simprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>卡类型:</dt>
							<dd>{{ prodThisList.simproductmodelname }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>库房:</dt>
							<dd>{{ prodThisList.storagename}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ prodThisList.simstatus == 'INSTO' ? '在库' : prodThisList.simstatus == 'INSTALL' ? '已安装' : prodThisList.simstatus == 'LOST' ? '报失' : prodThisList.simstatus == 'REPAIR' ? '维修' : prodThisList.simstatus == 'DAMAGE' ? '报废' : prodThisList.simstatus == 'ONWAY' ? '在途' : ''}}</dd>
						</dl>
					</el-col>
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
			</el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

		<!-- 设备绑卡点击弹出页面 -->
		<el-dialog title="设备绑定SIM卡" :modal-append-to-body="false" :visible.sync="bindingSimVisible" :close-on-click-modal="false">
			<el-form>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item id="nomargin">
							<el-table :data="simdatas" empty-text="暂未绑定卡" border style="width: 100%" max-height="250">
								<el-table-column prop="prodnum" label="ICCID" align="center">
								</el-table-column>
								<el-table-column prop="productmodelname" label="卡类型" align="center">
								</el-table-column>
								<el-table-column prop="prodsnnum" label="通讯号" align="center">
								</el-table-column>
								<el-table-column prop="storagename" label="库房" align="center">
								</el-table-column>
								<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center">
								</el-table-column>
								<el-table-column label="操作" width="80" align="center">
									<template scope="scope">
										<el-button type="danger" size="small" :disabled="scope.row.status != 'INSTO'" icon="el-icon-share" class="mt5" @click.native="cancelSim(scope.$index,vehdatas)">解绑</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-button type="primary" :disabled="bindDataRow.prodstatus != 'INSTO'" @click.native="addDeviceListSim" icon="el-icon-plus" style="margin-top:10px;">绑定SIM卡</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
		<!--设备绑卡——SIM列表选择界面-->
		<el-dialog title="SIM卡信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" @close="clearAllThisOne()" :close-on-click-modal="false">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="ICCID" value="prodnum"></el-option>
										<el-option label="卡类型" value="productmodelname"></el-option>
										<!-- <el-option label="设备类别" value="prodspec"></el-option> -->
										<el-option label="库房" value="storagename"></el-option>
										<el-option label="通讯号" value="prodsnnum"></el-option>
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
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
										<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
											<el-option label="ICCID" value="prodnum"></el-option>
											<el-option label="卡类型" value="productmodelname"></el-option>
											<!-- <el-option label="设备类别" value="prodspec"></el-option> -->
											<el-option label="库房" value="storagename"></el-option>
											<el-option label="通讯号" value="prodsnnum"></el-option>
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
								<el-button type="primary" @click="getDeciceListInfo" @keyup.native.13="getDeciceListInfo" icon="el-icon-search">查询</el-button>
							</el-form-item>
						</template>
					</template>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border :data="deviceListData" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @row-dblclick="comlistProd" style="width: 100%;">
				<el-table-column prop="prodnum" label="ICCID" align="center">
				</el-table-column>
				<el-table-column prop="productmodelname" label="卡类型" align="center">
				</el-table-column>
				<el-table-column prop="prodsnnum" label="通讯号" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<!-- <el-button type="primary" icon="share" class="mt5" @click="comlistProd" :loading="comfirLoadingSIM" :disabled="this.sels.length===0">确认绑卡</el-button> -->
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<!-- 设备绑车点击弹出页面 -->
		<el-dialog title="设备绑定车辆" :modal-append-to-body="false" :visible.sync="bindingVehVisible" :close-on-click-modal="false">
			<el-form>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item id="nomargin">
							<el-table :data="vehdatas" empty-text="暂未绑定车辆" border style="width: 100%" max-height="250">
								<el-table-column prop="licenseplatenum" label="车牌号" align="center">
								</el-table-column>
								<el-table-column prop="vin" label="车架号" align="center">
								</el-table-column>
								<el-table-column prop="model" label="车型" align="center">
								</el-table-column>
								<el-table-column prop="price" label="车价(万)" width="70" align="center">
								</el-table-column>
								<el-table-column prop="name" label="车主" width="70" align="center">
								</el-table-column>
								<el-table-column label="操作" width="80" align="center">
									<template scope="scope">
										<el-button type="danger" size="small" icon="el-icon-share" class="mt5" @click.native="cancelVeh(scope.$index,vehdatas)">解绑</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-button type="primary" @click.native="addDeviceListVeh" :disabled="bindDataRow.prodstatus != 'c'" icon="el-icon-plus" style="margin-top:10px;" v-show="vehdatas.length == 0">绑定车辆</el-button>
							<el-button type="primary" @click.native="changeVeh" style="margin-top:10px;" v-show="vehdatas.length != 0"><i class="iconfont icon-shebeitihuan"></i>&nbsp;更换</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
		<!--设备绑车——车辆列表选择界面-->
		<el-dialog title="车辆信息" :modal-append-to-body="false" :visible.sync="deviceFormVisibleVeh" top="3%" :close-on-click-modal="false" @close="clearAllThisTwo()">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfoVeh" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="车牌号" value="licenseplatenum"></el-option>
										<el-option label="车架号" value="vin"></el-option>
										<el-option label="车主" value="name"></el-option>
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
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfoVeh" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
										<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
											<el-option label="车牌号" value="licenseplatenum"></el-option>
											<el-option label="车架号" value="vin"></el-option>
											<el-option label="车主" value="name"></el-option>
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
								<el-button type="primary" @click="getDeciceListInfoVeh" icon="el-icon-search">查询</el-button>
							</el-form-item>
						</template>
					</template>
				</el-form>
			</el-col>
			<!--选择车辆列表-->
			<el-table border :data="deviceListDataVeh" max-height="500" ref="deviceListDataVeh" highlight-current-row v-loading="devicelistLoadingProd" @row-dblclick="comlistVeh" style="width: 100%;">
				<el-table-column prop="licenseplatenum" label="车牌号" align="center">
				</el-table-column>
				<el-table-column prop="vin" label="车架号" align="center">
				</el-table-column>
				<el-table-column prop="model" label="车型" align="center">
				</el-table-column>
				<el-table-column prop="price" label="车价(万)" width="70" align="center">
				</el-table-column>
				<el-table-column prop="name" label="车主" width="70" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<!-- <el-button type="primary" class="mt5" @click="comlistVeh" :loading="comfirLoadingVeh" :disabled="this.sels.length===0">确认绑定</el-button> -->
				<el-pagination @size-change="dhandleSizeChangeVeh" background @current-change="dhandleCurrentChangeVeh" :page-sizes="[15, 50, 80, 100]" :page-size="dpageSizeVeh" layout="total, sizes, prev, pager, next" :total="dtotalVeh" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getRelationshipList, getSelectListRelationship, getSelectListProd, addUnbundleSIM, cancelUnbundleSIM, getVehicleInfoList, getProductInfoList, unBandVehicleProd, bandVehicleProd, getAllProSimInfoList, getProductOwnerList, getSelectListVeh } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					domSearch: [{
						select: ['prodnum'],
						content: ''
					}], //查询框
					isactive: '1'
				},
				fmtdata: util,
				listData: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				comfirLoadingSIM: false,
				comfirLoadingVeh: false,
				prodThisList: [],
				deviceListData: [], //设备绑卡
				deviceFormVisible: false,
				devicelistLoading: false,
				bindingSimVisible: false, //设备绑卡页面是否显示
				bindDataRow: '', //绑卡需要的数据,当前行信息
				simdatas: [], //该设备已绑定的卡

				deviceListDataVeh: [], //设备绑车选择车辆
				deviceFormVisibleVeh: false,
				devicelistLoadingProd: false,
				bindingVehVisible: false, //车绑设备页面是否显示
				checkDataVeh: [], //选择绑定check
				packinfolist: [], //多选设备时选择的组
				vehdatas: [], //该设备已绑定的车辆
				removeBindDataRow: '',
				dtotal: 0, //【设备绑卡】
				dcurrentPage: 1,
				dpageSize: 15,
				dtotalVeh: 0, //【车绑设备】
				dcurrentPageVeh: 1,
				dpageSizeVeh: 15,
				formDialogTableVisible: false, //详情
				vehInfo: [], //详情车辆信息
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {}
			}
		},
		methods: {
			// 点击车绑设备图标时
			vehBindingProd(row) {
				this.bindingVehVisible = true;
				this.vehdatas = []; //初始化
				this.bindDataRow = row; //绑车需要的数据

				// 得到已绑定的车辆信息
				if(row.vehicleid == null) return;
				let para = {
					id: row.vehicleid,
				}
				getVehicleInfoList(para).then((res) => {
					res.data.data.records.forEach((item, index) => {
						this.vehdatas.push(item);
					});
				});
			},

			// 确认绑定——【车绑设备】
			comlistVeh(checkDataVeh, envent) {
				this.deviceFormVisibleVeh = false;
				if(this.vehdatas.length != 0) {
					let para = {
						id: this.removeBindDataRow.onlineid,
						packid: this.removeBindDataRow.packid,
						vehicleid: this.removeBindDataRow.ID,
						packinfo: {
							equipmentid: this.removeBindDataRow.prodid,
							simcardid: this.removeBindDataRow.simid,
							storageid: this.removeBindDataRow.storageid,
						}
					};
					unBandVehicleProd(para).then((res) => {
						this.vehdatas = []; //初始化清空绑定的车辆信息
						this.deviceFormVisible = false;
						let para = {
							vehicleid: checkDataVeh.ID,
							packinfos: [{
								ID: this.bindDataRow.packid,
								equipmentid: this.bindDataRow.prodid,
								simcardid: this.bindDataRow.simid,
								storageid: this.bindDataRow.storageid,
							}]
						};
						this.comfirLoadingVeh = true;
						bandVehicleProd(para).then((res) => {
							this.comfirLoadingVeh = false;
							if(res.data.result.desc == 'success') {
								this.vehdatas = [checkDataVeh];
								this.$message({
									message: '绑定成功！',
									type: 'success'
								});
							} else {
								this.vehdatas = [];
							}
							this.GetPositions();
						});
					});
				} else {
					let para = {
						vehicleid: checkDataVeh.ID,
						packinfos: [{
							ID: this.bindDataRow.packid,
							equipmentid: this.bindDataRow.prodid,
							simcardid: this.bindDataRow.simid,
							storageid: this.bindDataRow.storageid,
						}]
					};
					this.comfirLoadingVeh = true;
					bandVehicleProd(para).then((res) => {
						this.comfirLoadingVeh = false;
						if(res.data.result.desc == 'success') {
							this.vehdatas = [checkDataVeh];
							this.$message({
								message: '绑定成功！',
								type: 'success'
							});
						} else {
							this.vehdatas = [];
						}
						this.GetPositions();
					});
				}
			},
			// 确认解绑——【车绑设备】
			cancelVeh(index, rows) {
				let para = {
					id: this.bindDataRow.onlineid,
					packid: this.bindDataRow.packid,
					vehicleid: this.vehdatas[0].ID,
					packinfo: {
						equipmentid: this.bindDataRow.prodid,
						simcardid: this.bindDataRow.simid,
						storageid: this.bindDataRow.storageid,
					}
				};
				unBandVehicleProd(para).then((res) => {
					this.$message({
						message: '解绑成功！',
						type: 'success'
					});
					this.vehdatas = []; //初始化清空绑定的车辆信息
					this.deviceFormVisible = false;
					this.GetPositions();
				});
			},
			//切换当前页【车绑设备】
			dhandleCurrentChangeVeh(val) {
				this.dcurrentPageVeh = val;
				this.getDeciceListInfoVeh();
			},
			//切换每页显示数量【车绑设备】
			dhandleSizeChangeVeh(val) {
				this.dpageSizeVeh = val;
				this.getDeciceListInfoVeh();
			},
			// 更换车辆事件
			changeVeh() {
				this.deviceFormVisibleVeh = true;
				this.removeBindDataRow = this.bindDataRow;
				this.filters.domSearch = [{
					select: ['licenseplatenum'],
					content: ''
				}];
				let para = {
					currentPage: this.dcurrentPageVeh,
					showCount: this.dpageSizeVeh,
					domSearch: this.filters.domSearch, //查询框
				};
				this.devicelistLoadingVeh = true;
				getSelectListVeh(para).then((res) => {
					this.dtotalVeh = res.data.data.totalResult;
					this.deviceListDataVeh = res.data.data.records;
					this.devicelistLoadingVeh = false;
				}).catch((error) => {
					this.devicelistLoadingVeh = false;
				});
			},
			// 获取车辆信息【车绑设备】
			addDeviceListVeh() {
				this.deviceFormVisibleVeh = true;
				this.filters.domSearch = [{
					select: ['licenseplatenum'],
					content: ''
				}];
				this.getDeciceListInfoVeh();
			},
			//获取车辆信息【车绑设备】
			getDeciceListInfoVeh() {
				// if(this.vehdatas.length != 0) { //该设备已有绑定车辆
				// 	this.deviceFormVisibleVeh = false;
				// 	this.$message({
				// 		message: '该设备已绑定车辆，请先解绑！',
				// 		type: 'error'
				// 	});
				// } else { //该设备未绑定车辆
					let para = {
						currentPage: this.dcurrentPageVeh,
						showCount: this.dpageSizeVeh,
						domSearch: this.filters.domSearch, //查询框
					};
					this.devicelistLoadingVeh = true;
					getSelectListVeh(para).then((res) => {
						this.dtotalVeh = res.data.data.totalResult;
						this.deviceListDataVeh = res.data.data.records;
						this.devicelistLoadingVeh = false;
					}).catch((error) => {
						this.devicelistLoadingVeh = false;
					});
				// }
			},

			// 点击设备绑卡图标时
			prodBindingSim(row) {
				this.bindingSimVisible = true;
				this.simdatas = []; //初始化
				this.bindDataRow = row; //绑卡需要的数据

				// 得到已绑定SIM卡信息
				if(row.simid == null) return;
				let para = {
					id: row.simid,
				}
				getProductInfoList(para).then((res) => {
					res.data.data.records.forEach((item, index) => {
						this.simdatas.push(item);
					});
				});
			},
			// 确认绑卡——【设备绑卡】
			comlistProd(checkDataProd, evnent) {
				this.deviceFormVisible = false;
				if(this.simdatas.length != 0) {
					if(this.removeBindDataRow.vehicleid != undefined) { //该设备已有绑定车辆
						this.$message({
							message: '该设备已绑定车辆，无法解绑！',
							type: 'warning'
						});
					} else { //该设备未绑定车辆
						let para = {
							packID: this.removeBindDataRow.packid
						};
						cancelUnbundleSIM(para).then((res) => {
							if(res.data.data) {
								this.$message({
									message: '解绑成功！',
									type: 'success'
								});
								this.simdatas = []; //初始化清空绑定的卡信息
								this.deviceFormVisible = false;
								let para = {
									equipmentid: this.bindDataRow.prodid,
									simcardid: checkDataProd.id,
									storageid: this.bindDataRow.storageid,
								};
								this.comfirLoadingSIM = true;
								addUnbundleSIM(para).then((res) => {
									this.comfirLoadingSIM = false;
									this.simdatas = [checkDataProd];
									this.$message({
										message: '该设备绑卡成功！',
										type: 'success'
									});
									this.GetPositions();
								});
							} else {
								this.$message({
									message: '解绑失败！只有在库状态才可以解绑！',
									type: 'warning'
								});
							}
						});
					}
				} else {
					let para = {
						equipmentid: this.bindDataRow.prodid,
						simcardid: checkDataProd.id,
						storageid: this.bindDataRow.storageid,
					};
					this.comfirLoadingSIM = true;
					addUnbundleSIM(para).then((res) => {
						this.comfirLoadingSIM = false;
						this.simdatas = [checkDataProd];
						this.$message({
							message: '该设备绑卡成功！',
							type: 'success'
						});
						this.GetPositions();
					});
				}
			},
			// 确认解绑——【设备绑卡】
			cancelSim() {
				if(this.bindDataRow.vehicleid != undefined) { //该设备已有绑定车辆
					this.$message({
						message: '该设备已绑定车辆，无法解绑！',
						type: 'warning'
					});
				} else { //该设备未绑定车辆
					let para = {
						packID: this.bindDataRow.packid
					};
					cancelUnbundleSIM(para).then((res) => {
						if(res.data.data) {
							this.$message({
								message: '解绑成功！',
								type: 'success'
							});
							this.simdatas = []; //初始化清空绑定的卡信息
							this.deviceFormVisible = false;
							this.GetPositions();
						} else {
							this.$message({
								message: '解绑失败！只有在库状态才可以解绑！',
								type: 'warning'
							});
						}
					});
				}
			},
			//切换当前页【设备绑卡】
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.getDeciceListInfo();
			},
			//切换每页显示数量【设备绑卡】
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.getDeciceListInfo();
			},
			// 查询SIM卡信息【设备绑卡】
			addDeviceListSim() {
				if(this.simdatas.length != 0) {
					this.removeBindDataRow = this.bindDataRow;
				}
				this.clearAll(); //打开dialog清空查询框
				this.deviceFormVisible = true;
				this.filters.domSearch = [{
					select: ['prodnum'],
					content: ''
				}];
				this.filters.isdelete = 0,
					this.getDeciceListInfo();
			},
			//获取SIM信息【设备绑卡】
			getDeciceListInfo() {
				if(this.bindDataRow.storageid == undefined) {
					this.deviceFormVisible = false;
					this.$message({
						message: '该设备暂无库房，不可绑定！',
						type: 'error'
					});
				} else {
					let para = {
						currentPage: this.dcurrentPage,
						showCount: this.dpageSize,
						// 搜索设置部分
						domSearch: this.filters.domSearch, //查询框
						ispack: 0,
						isdelete: 0,
						prodcategory: 'C',
						status: 'INSTO',
						storageid: this.bindDataRow.storageid,
					};
					this.devicelistLoading = true;
					getSelectListProd(para).then((res) => {
						if(res.data.result.code == 4001) {
							this.$message({
								message: res.data.result.desc,
								type: 'error'
							});
							this.devicelistLoading = false;
							return;
						}
						this.dtotal = res.data.data.totalResult;
						this.deviceListData = res.data.data.records;
						this.devicelistLoading = false;
					}).catch((error) => {
						this.devicelistLoading = false;
					});
				}
			},

			//设备状态显示转换
			statusFormat: function(row, col) {
				return row.status == 'INSTO' ? '在库' : row.status == 'INSTALL' ? '已安装' : row.status == 'LOST' ? '报失' : row.status == 'REPAIR' ? '维修' : row.status == 'DAMAGE' ? '报废' : row.status == 'ONWAY' ? '在途' : '';
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			// 清空当前模糊查询
			clearAllThisOne() {
				this.filters.domSearch = [{
					select: ['prodnum'],
					content: ''
				}] //显示页面的默认查询条件;
			},
			// 清空当前模糊查询
			clearAllThisTwo() {
				this.filters.domSearch = [{
					select: ['licenseplatenum'],
					content: ''
				}] //显示页面的默认查询条件;
			},
			//详情查看
			formDetailHandle(prodid) {
				this.formDialogTableVisible = true;
				this.prodThisList = ''; //清空设备和SIM卡
				this.vehInfo = ''; //清空车辆
				// 获取当前分组信息
				let para = {
					prodID: prodid,
				}
				nanobar.go(70);
				//获取当前设备、SIM卡信息
				getAllProSimInfoList(para).then((res) => {
					this.prodThisList = ''; //清空上条数据赋的值
					if(res.data.data.records.length == 0) {
						this.$message({
							message: '该设备暂未绑定SIM卡！',
							type: 'warning'
						});
					} else {
						this.prodThisList = res.data.data.records[0];
					}
				});
				let paraTwo = {
					PRODID: prodid,
				}
				// 获取设备绑定车辆信息
				getProductOwnerList(paraTwo).then((res) => {
					this.vehInfo = ''; //清空上条数据赋的值
					if(res.data.data.records.length != 0) { //已经绑车时
						this.vehInfo = res.data.data.records[0];
					} else {
						this.$message({
							message: '该设备暂未绑定车！',
							type: 'warning'
						});
					}
					nanobar.go(100);
				});
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
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuerySelect();
				// this.GetPositions();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.GetPositions();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getRelationshipList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			GetPositions() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				// this.listLoading = true;
				getRelationshipList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},

		},
		created() {
			this.GetPositions();
		},

	}
</script>