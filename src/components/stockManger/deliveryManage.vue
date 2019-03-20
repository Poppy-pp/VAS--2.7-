<!--* 
* @description: 发货管理 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.receivperson" @keyup.native.enter="handleQuery" placeholder="收货人"></el-input>
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
					<el-button type="primary" @click="handleQuery" @keyup.native.enter="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="listLoading" @click="handleAdd" icon="el-icon-plus">新增发货</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table border :max-height="windowOutHeight-180" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
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
			<el-table-column prop="DELIVERYBY" label="物流公司" align="center" width="80">
				<template scope="scope">
					{{ scope.row.DELIVERYBY }}
				</template>
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
				<template slot-scope="scope">
					<el-popover placement="right" width="700" @hide="hideprodData" @show="showprodData(scope.row.ID)" trigger="click">
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
							<el-table-column prop="PRODSPEC" label="类型" align="center" width="60"></el-table-column>
							<el-table-column prop="PRODMODEL" label="型号" align="center"></el-table-column>
							<el-table-column prop="EPRODNUM" label="自编号" align="center" width="130"></el-table-column>
							<el-table-column prop="CPRODNUM" label="卡编号" align="center" width="120"></el-table-column>
							<el-table-column prop="CPRODMODEL" label="卡类型" align="center" width="110"></el-table-column>
							<el-table-column prop="STATUS" label="状态" align="center" :formatter="dataFormatterStatus" width="60"></el-table-column>
							<el-table-column prop="REMARK" label="描述" align="center"></el-table-column>
						</el-table>

						<div slot="reference" class="name-wrapper">
						            <el-tag size="medium" style="cursor:pointer;"><i class="el-icon-search"></i>查看</el-tag>
						</div>
					</el-popover>
					<!-- <a href="javascript:void(0);" v-popover:popover4><span class="iconcomnum"><i class="el-icon-search"></i>查看</span></a> -->
				</template>
			</el-table-column>
			<el-table-column prop="CREATENAME" label="记录人" align="center">
			</el-table-column>
			<el-table-column prop="CREATEDATE" label="记录时间" :formatter="dateFormatter3" align="center" width="150">
			</el-table-column>
			<el-table-column prop="DELIVERYCATEGORY" width="100" label="发货类型" align="center" :formatter="deliverycategoryHandel">
			</el-table-column>
			<el-table-column prop="DELIVERYSTATUS" width="100" label="物流状态" align="center" :formatter="deliverstatusHandel">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="90" align="center">
				<template scope="scope">
					<el-button size="small" type="primary" @click="showLogistics(scope.$index, scope.row)">查看物流</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="发货" :modal-append-to-body="false" class="formdetail" :visible.sync="addFormVisible" top="3%" :close-on-click-modal="false">
			<el-form label-position="top" :model="addForm" ref="addForm" :rules="addFormRules" label-width="100px" v-loading="expandLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="发货人" prop="fromname">
							<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="addForm.fromname" :fetch-suggestions="querySearchConsignor" custom-item="my-item-zh1" placeholder="请输入发货人名字" @select="handleSelectConsignor"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发货人电话" prop="fhmobile">
							<el-input v-model="addForm.fhmobile" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮编" prop="fhpostcode">
							<el-input v-model="addForm.fhpostcode" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="发货地址" prop="fromaddress">
							<el-select v-model="addForm.fromaddress" popper-class="dzaddress" @change="fromaddressChange" placeholder="请选择">
								<el-option v-for="item in fromaddressData" :label="item.value" :value="item">
									<p>地址：{{ item.value }}</p>
									<p>姓名：{{ item.contactperson }}</p>
									<p>电话：{{ item.mobile }}</p>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货人" prop="toname" class="pt10">
							<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="addForm.toname" :fetch-suggestions="querySearchConsignee" placeholder="请输入收货人名字" custom-item="my-item-zh1" @select="handleSelectConsignee"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收货人电话" prop="shmobile" class="pt10">
							<el-input v-model="addForm.shmobile" readonly auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮编" prop="shpostcode" class="pt10">
							<el-input v-model="addForm.shpostcode" readonly auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="收货地址" prop="toaddress">
							<el-select v-model="addForm.toaddress" popper-class="dzaddress" @change="toaddressChange" placeholder="请选择">
								<el-option v-for="item in toaddressData" :label="item.value" :value="item">
									<p>地址：{{ item.value }}</p>
									<p>姓名：{{ item.contactperson }}</p>
									<p>电话：{{ item.mobile }}</p>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="发货类型" prop="deliverycategory" class="pt10">
							<el-checkbox-group v-model="checkboxGroup1" @change="changeCategory">
								<el-checkbox-button v-for="(city,index) in cities" :label="index">{{city}}</el-checkbox-button>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="发货方式" prop="company" class="pt10">
							<el-radio-group v-model="addForm.company" @change="radioChange">
								<el-radio-button label="1">物流快递</el-radio-button>
								<el-radio-button label="3">专车配送</el-radio-button>
								<el-radio-button label="2">自行派送</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="发货时间" prop="deliverydate">
							<el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="addForm.deliverydate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="addForm.company == 1">
						<el-form-item label="快递公司" prop="deliveryby">
							<el-select v-model="addForm.deliveryby" clearable value-key="corpname" @visible-change="changeDeliveryCop" filterable :loading="copLoading" placeholder="请选择物流公司">
								<el-option v-for="item in copName" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdatavalue">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="addForm.company == 1">
						<el-form-item label="单号" prop="deliveryno">
							<el-input v-model="addForm.deliveryno" placeholder="请输入单号" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="addForm.company == 3">
						<el-form-item label="车牌号" prop="deliveryby">
							<el-input v-model="addForm.deliveryby" placeholder="请输入车牌号" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="addForm.company == 3">
						<el-form-item label="电话" prop="contactno">
							<el-input v-model="addForm.contactno" auto-complete="off" placeholder="请输入电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="addForm.company == 3 || addForm.company == 2">
						<el-form-item label="预计到货时间" prop="estreceivedate">
							<el-date-picker type="datetime" :picker-options="pickerOptions" placeholder="选择时间" v-model="addForm.estreceivedate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发生费用" prop="deliveryfee">
							<el-input type="text" placeholder="请输入发生费用" v-model="addForm.deliveryfee">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<br>
					</el-col>
					
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click.native="addDeviceList" icon="el-icon-plus" style="margin-bottom:10px;">添加设备</el-button>
							<el-button type="primary" @click.native="scanningDeviceList" icon="iconfont icon-saomiao mr5" style="margin-bottom:10px;">扫描添加设备</el-button>
							<el-button type="primary" @click.native="addMoreDeviceList" icon="iconfont icon-piliang mr5" style="margin-bottom:10px;">批量添加设备</el-button>
							<el-table :data="deviceInfo" empty-text="没有设备信息" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="250">
								<el-table-column prop="prodnum" label="设备编号" width="165" align="center">
								</el-table-column>
								<el-table-column prop="productmodelname" label="型号" align="center">
								</el-table-column>
								<el-table-column prop="prodspec" label="类别" align="center">
								</el-table-column>
								<el-table-column prop="storagename" label="库房" align="center">
								</el-table-column>
								<el-table-column prop="status" label="设备状态" :formatter="formatterStatus" align="center">
								</el-table-column>
								<el-table-column prop="relateproductinfo.prodnum" label="SIM卡号" align="center">
								</el-table-column>
								<el-table-column prop="relateproductinfo.productmodelname" label="卡类型" align="center">
								</el-table-column>
								<el-table-column fixed="right" label="操作" width="80" align="center">
									<template scope="scope">
										<el-button @click.native.prevent="deleteRow(scope.$index, deviceInfo)" type="text" size="small">
											删除
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="备注" prop="remarks">
							<el-input type="textarea" v-model="addForm.remarks" autosize placeholder="请输入备注" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" :disabled="expandLoading" @click.native="addSubmit('addForm')" :loading="addLoading">提交</el-button>
				<el-button @click.native="addFormVisible = false">取消</el-button>
			</div>
		</el-dialog>

		<!--设备列表选择界面-->
		<el-dialog title="设备信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" :close-on-click-modal="false">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="设备编号" value="prodnum"></el-option>
										<el-option label="SIM卡号" value="prodnumb"></el-option>
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
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
										<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
											<el-option label="设备编号" value="prodnum"></el-option>
											<el-option label="SIM卡号" value="prodnumb"></el-option>
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
								<el-button type="primary" @click="getDeciceListInfo" icon="el-icon-search">查询</el-button>
							</el-form-item>
						</template>
					</template>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border v-show="deviceFormVisible" :data="deviceListData" :row-class-name="tableRowClassName" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @row-click="selectionRow" @select="selsChange" :row-style="defaultSelectable" @select-all="handleSelectionAllChange" style="width: 100%;">
				<el-table-column type="selection" fixed="left" width="50" align="center">
				</el-table-column>
				<el-table-column prop="prodnum" label="编号" width="165" align="center">
				</el-table-column>
				<el-table-column prop="productmodelname" label="型号" align="center">
				</el-table-column>
				<el-table-column prop="prodspec" label="类别" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="formatterStatus" align="center">
				</el-table-column>
				<el-table-column prop="relateproductinfo.prodnum" label="SIM卡号" align="center">
				</el-table-column>
				<el-table-column prop="relateproductinfo.productmodelname" label="卡类型" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<!--设备列表选择界面-->
		<el-dialog title="设备信息" :modal-append-to-body="false" :visible.sync="moreDeviceFormVisible" top="3%" :close-on-click-modal="false">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
					<el-row :gutter="10" class="colflex">
						<el-col :span="24">
							<el-form-item prop="searchKey" class="sf100">
								<el-input @keyup.native.enter="getDeciceListInfo" placeholder="请输入关键字查询" v-model="filters.searchKey"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="colflex3">
						<el-form-item style="float:right;margin-right:0;">
							<el-button type="primary" @click="getDeciceListInfo" icon="el-icon-search">查询</el-button>
							<el-button @click="resetFormSearch('filters')">重置</el-button>
						</el-form-item>
					</div>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table v-show="moreDeviceFormVisible" border :data="deviceListData" :row-class-name="tableRowClassName" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @row-click="selectionRow" @select="selsChange" :row-style="defaultSelectable" @select-all="handleSelectionAllChange" style="width: 100%;" >
				<el-table-column type="selection" fixed="left" width="50" align="center">
				</el-table-column>
				<el-table-column prop="prodnum" label="编号" width="165" align="center">
				</el-table-column>
				<el-table-column prop="productmodelname" label="型号" align="center">
				</el-table-column>
				<el-table-column prop="prodspec" label="类别" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="formatterStatus" align="center">
				</el-table-column>
				<el-table-column prop="relateproductinfo.prodnum" label="SIM卡号" align="center">
				</el-table-column>
				<el-table-column prop="relateproductinfo.productmodelname" label="卡类型" align="center">
				</el-table-column>
			</el-table>

			<!-- 工具条 -->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<el-dialog title="物流信息" :modal-append-to-body="false" :visible.sync="logisticsVisible" top="3%" :close-on-click-modal="false">
			<logistics :logisticsID="logisticsID" v-if="logisticsVisible"></logistics>
		</el-dialog>

		<el-dialog title="扫描添加设备" width="30%" :visible.sync="scanningDevVisible">
			<div class="ft_red">*扫描枪录入设备号会自动去除前缀,手动录入请输入去除前缀后的设备号。</div>
			<el-input prefix-icon="iconfont icon-saomiao mr5" @keyup.13.native="searchDeviceNum" @keyup.native="keyUpDevice" v-model="devNum" placeholder="扫描/输入设备号按回车"></el-input>
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
			<div slot="footer" class="dialog-footer">
				<el-button @click="scanningDevVisible = false">取 消</el-button>
				<el-button type="primary" @click="comfirDnum">确认</el-button>
			</div>
		</el-dialog>
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
	
	.dzaddress .el-select-dropdown__item {
		height: 73px;
	}
	
	.pt10 {
		padding-top: 10px !important;
	}
</style>
<script>
	import Vue from 'vue';
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import logistics from 'components/viewOrderInfo/logistics';
	import { getProductInfoList, adddelivery, getdeliveryList, getDeptManagerInfoList, getDeliveryAddressListInfo, getCurUserDeviceInfo, modifyCurUserDeviceInfo, getSearchCurUserDeviceInfo, queryEmpIs, getsfhProList, groupClass, getLogistics, getMoreDeciceListInfo } from '../../api/api';
	//自定义搜索组件模板样式
	Vue.component('my-item-zh1', {
		functional: true,
		render(h, ctx) {
			var item = ctx.props.item;
			return h('li', ctx.data, [
				h('div', {
					attrs: {
						class: 'model'
					}
				}, [item.value]),
				h('span', {
					attrs: {
						class: 'vin'
					}
				}, ["电话号码:", item.mobile]),
			]);
		},
		props: {
			item: {
				type: Object,
				required: true
			}
		}
	});
	export default {
		props: ['windowOutHeight'],
		components: {
			logistics
		},
		data() {
			//自定义验证安装地址表单
			var checkAddress = (rule, value, callback) => {
				if(this.addForm[rule.field].length <= 0) {
					return callback(new Error('地址没有,请到地址管理完善地址信息！'));
				} else {
					callback();
				}
			};
			//自定义验证单号
			var checkDeliveryno = (rule, value, callback) => {
				if(this.addForm.company == 1) {
					if(!this.addForm[rule.field]) {
						return callback(new Error('请填写单号！'));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			//只能输入数字
			var checkNum = (rule, value, callback) => {
				var reg = /^[0-9]*$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('必须为数字，不能有特殊字符'));
				} else {
					callback();
				}
			};
			// 验证手机
			var checkMobile = (rule, value, callback) => {
				var reg = /^1\d{10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('请输入11位的手机号码'));
				} else {
					callback();
				}
			};
			//验证车牌号
			var checkVehicleNumber = (rule, value, callback) => {
				if ($.trim(value).length == 8){//新能源汽车
					// var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
					var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{6}$/;
				}else{//普通汽车
					var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
				}

				var flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('车牌号格式不规范'));
				} else {
					callback();
				}
			};
			return {
				cities: ['调拨', '退库', '维修', '其它', '返厂','报损','直接销售'],
				checkboxGroup1: [0],
				devNum: '',
				filters: {
					status: 'INSTO',
					startDate: '',
					receivperson: '',
					deliverystatus: '',
					searchKey: '',
					domSearch: [{
						select: ['prodnum'],
						content: ''
					}], //查询框
				},
				scanningDevVisible: false,
				logisticsID: '',
				logisticsVisible: false,
				copName: [],
				copLoading: false,
				flag: true,
				wlstate: [{
					value: "发货(未签收)",
					id: 1
				}, {
					value: "已收货(签收)",
					id: 3
				}, {
					value: "退回",
					id: 4
				},{
					value: "退回签收",
					id: 7
				}],
				deviceInfo: [],
				listData: [],
				sels: [],
				fromaddressData: [],
				toaddressData: [],
				deviceListData: [],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
				moreDeviceFormVisible: false,
				total: 0,
				currentPage: 0,
				pageSize: 15,
				listLoading: false,
				addFormVisible: false, //新增界面是否显示
				expandLoading: false,
				addLoading: false,
				devicelistLoading: false,
				prOptions: util.initProvince(),
				//新增界面数据
				addForm: {
					fromid: '',
					fromname: '',
					fromaddress: '',
					fhmobile: '',
					fhpostcode: '',
					toid: '',
					deliverycategory: 1 ,
					toname: '',
					toaddress: '',
					shmobile: '',
					shpostcode: '',
					deliverydate: new Date(),
					deliveryfee: '',
					deliveryby: '',
					deliveryno: '',
					deliverytype: '',
					storagename: '',
					estreceivedate: '',
					remarks: '',
					contactno: '',
					company: 1
				},
				addFormRules: {
					deliveryno: [{required: true,message: '请输入单号',trigger: 'blur'},{validator: checkNum,trigger: 'blur'}],
					deliveryfee: [{required: true,message: '请输入发生费用',trigger: 'blur'},{validator: checkNum,trigger: 'blur'}],
					deliveryby: [{required: true,message: '请输入',trigger: 'blur'}],
					contactno: [{required: true,message: '请输入电话',trigger: 'blur'},{validator: checkMobile,trigger: 'blur'}],
					fromaddress: [{
						required: true,
						validator: checkAddress,
						trigger: 'blur'
					}],
					toaddress: [{
						required: true,
						validator: checkAddress,
						trigger: 'blur'
					}]
				},
				dtotal: 0,
				dcurrentPage: 1,
				dpageSize: 15,
				deviceFormVisible: false,
				profilters: {
					eprodnum: '',
					cprodnum: ''
				},
				iskeyup: false,
				prodData: [],
				plistLoading: false,
				dcurrentPages: 1,
				dpageSizes: 15,
				ddeliveryid: '',
				dtotals: 0,
				savDeviceNum: [],
			}
		},
		watch: {
			//检测设备号输入或扫描
			devNum(curval, oval) {
				if(curval == '') {
					this.iskeyup = false;
				}
				if(this.iskeyup) return;
				this.searchDeviceNum();
			}
		},
		methods: {
			//确认扫描的所有设备
			comfirDnum() {
				this.scanningDevVisible = false;
				if(this.savDeviceNum.length != 0) {
					if(this.deviceInfo.length == 0){
						this.deviceInfo = this.savDeviceNum;
						return;
					}		
					this.savDeviceNum.forEach((item,index)=>{
						let flag = false;
						this.deviceInfo.forEach((item1,index)=>{
							if(item.id == item1.id){
								flag = true;
							}
						});
						if(!flag)
						this.deviceInfo.push(item);
					});
				}
			},
			//删除检测的设备
			deleteSavDeviceNum(index) {
				this.savDeviceNum.splice(index, 1);
			},
			//关闭清空选择信息
			closeSearchDeviceNum() {
				this.iskeyup = false;
				this.devNum = '';
				this.savDeviceNum = [];
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
							for(var i=0;i<this.savDeviceNum.length;i++){
								if (this.savDeviceNum[i].prodnum == this.savDeviceNum[i+1].prodnum){
									this.savDeviceNum.splice(i, 1);
									return;
								}
							}
						}

					}
				});
			},
			//手动输入不触发扫描
			keyUpDevice() {
				this.iskeyup = true;
			},
			//清空批量查询框
			resetFormSearch() {
				this.filters = {
					status: 'INSTO',
					startDate: '',
					receivperson: '',
					deliverystatus: '',
					searchKey: '',
					domSearch: [{
						select: ['prodnum'],
						content: ''
					}], //查询框
				}
			},
			//扫描添加设备
			scanningDeviceList() {
				this.closeSearchDeviceNum();
				this.scanningDevVisible = true;
			},
			//显示批量设备
			addMoreDeviceList() {
				this.moreDeviceFormVisible = true;
			},
			//获取物流信息
			showLogistics(index, row) {
				this.logisticsVisible = true;
				this.logisticsID = row.ID;
			},
			//操作公司下拉查询
			changeDeliveryCop(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000,
					dictvalue: 'ExpressCompany'
				}
				groupClass(para).then((res) => {
					this.copName = res.data.data;
					this.copLoading = false;
				});
			},
			//切换当前页
			dhandleCurrentChanges(val) {
				this.dcurrentPages = val;
				this.showprodData(this.ddeliveryid);
			},
			//切换每页显示数量
			dhandleSizeChanges(val) {
				this.dpageSizes = val;
				this.showprodData(this.ddeliveryid);
			},
			hideprodData() {
				this.profilters.eprodnum = '';
				this.profilters.cprodnum = '';
			},
			showprodData(id) {
				this.ddeliveryid = id;
				let para = {
					currentPage: this.dcurrentPages,
					showCount: this.dpageSizes,
					deliveryid: id,
					eprodnum: this.profilters.eprodnum,
					cprodnum: this.profilters.cprodnum
				}
				this.plistLoading = false;
				getsfhProList(para).then((res) => {
					this.dtotals = res.data.data.totalResult;
					this.prodData = res.data.data.records;
					this.plistLoading = false;
				}).catch((error) => {
					this.plistLoading = false;
				});
			},
			//切换发货类型
			changeCategory(e) {
				if(e.length == 0) {
					this.addForm.deliverycategory = 1;
					return;
				}
				if(e.length > 1) {
					this.checkboxGroup1 = [e[1]];
					this.addForm.deliverycategory = e[1] + 1;
					return;
				}
				this.checkboxGroup1 = e;
				this.addForm.deliverycategory = e[0] + 1;
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询 条件
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},
			//格式化发生费用
			dateFormatterDepuee(row, col) {
				return(row.DELIVERYFEE ? row.DELIVERYFEE : 0) + "元";
			},
			//格式化发货类型
			deliverycategoryHandel(v) {
				if(v.DELIVERYCATEGORY == 1) return '调拨';
				if(v.DELIVERYCATEGORY == 2) return '退库';
				if(v.DELIVERYCATEGORY == 3) return '维修';
				if(v.DELIVERYCATEGORY == 4) return '其他';
				if(v.DELIVERYCATEGORY == 5) return '返厂';
				if(v.DELIVERYCATEGORY == 6) return '报损';
				if(v.DELIVERYCATEGORY == 7) return '直接销售';
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
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.row.status != "INSTO") {
					return 'warning-row';
				}
				return '';
			},
			querySearchConsignor(queryString, cb) {
				let para = {
						employeename: queryString
					},
					ownerArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						ownerArray.push({
							value: item.employeename,
							id: item.id,
							mobile: item.mobile
						})
					});
					cb(ownerArray);
				});
			},
			//发货人选择查询 选择
			handleSelectConsignor(item) {
				let para = {
						empid: item.id
					},
					tempArray = [];
				this.addForm.fromid = item.id;
				nanobar.go(70);
				getDeliveryAddressListInfo(para).then((res) => {
					nanobar.go(100);
					this.expandLoading = false;
					if(res.data.data.records.length == 0) {
						this.$message({
							message: "请维护该发货人地址信息",
							type: 'warning'
						});
						this.addForm.fromaddress = '';
						this.fromaddressData = [];
						return;
					}
					queryEmpIs(para).then((res) => {
						if(!res.data.data) {
							this.$message({
								message: "当前发货人没有库房",
								type: 'warning'
							});
						}
					});
					res.data.data.records.forEach(function(item, index) {
						tempArray.push({
							value: item.province + item.city + item.district + (item.detailaddress ? item.detailaddress : ''),
							id: item.id,
							mobile: item.mobile,
							postcode: item.postcode,
							contactperson: item.contactperson
						});
					});
					this.addForm.fromaddress = tempArray[0];
					this.fromaddressChange(tempArray[0]);
					this.fromaddressData = tempArray;
				});
			},
			fromaddressChange(item) {
				this.addForm.fhmobile = item.mobile;
				this.addForm.fhpostcode = item.postcode;
			},
			querySearchConsignee(queryString, cb) {
				let para = {
						employeename: queryString,
						showCount: 30,
						isenable: 1,
					},
					ownerArray = [];
				getDeptManagerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						ownerArray.push({
							value: item.employeename,
							id: item.id,
							mobile: item.mobile
						})
					});
					cb(ownerArray);
				});
			},
			handleSelectConsignee(item) {
				let para = {
						empid: item.id,
						isdelete: 0
					},
					tempArray = [];
				this.addForm.toid = item.id;
				nanobar.go(70);
				getDeliveryAddressListInfo(para).then((res) => {
					nanobar.go(100);
					if(res.data.data.records.length == 0) {
						this.$message({
							message: "请维护该收货人地址信息",
							type: 'warning'
						});
						this.addForm.toaddress = '';
						this.toaddressData = [];
						return;
					}
					res.data.data.records.forEach(function(item, index) {
						tempArray.push({
							value: item.province + item.city + item.district + (item.detailaddress ? item.detailaddress : ''),
							id: item.id,
							mobile: item.mobile,
							postcode: item.postcode,
							contactperson: item.contactperson
						})
					});
					this.addForm.toaddress = tempArray[0];
					this.toaddressChange(tempArray[0]);
					this.toaddressData = tempArray;
				});
			},
			toaddressChange(item) {
				this.addForm.shmobile = item.mobile;
				this.addForm.shpostcode = item.postcode;
			},

			radioChange(v) {
				this.addForm.deliverydate = new Date();
				this.addForm.deliveryby = '';
				this.addForm.contactno = '';
				this.addForm.estreceivedate = '';
				this.addForm.deliveryfee = '';
			},
			addDeviceList() {
				this.deviceFormVisible = true;
				this.filters.status = 'INSTO',
					this.filters.domSearch = [{
						select: ['prodnum'],
						content: ''
					}];
				this.getDeciceListInfo();
			},
			defaultSelectable(row, index) {
				this.deviceInfo.forEach((item, index) => {
					if(item.id == row.row.id) {
						this.$refs.deviceListData.toggleRowSelection(row.row, true);
						return false;
					}
				});
			},
			//格式化状态
			formatterStatus(row, col) {
				if(row.status == "INSTO") {
					return "在库";
				}
				if(row.status == "INSTALL") {
					return "已安装";
				}
				if(row.status == "LOST") {
					return "报失";
				}
				if(row.status == "REPAIR") {
					return "维修";
				}
				if(row.status == "DAMAGE") {
					return "报废";
				}
				if(row.status == "ONWAY") {
					return "在途";
				}
				return '';
			},
			comlist() {
				this.deviceInfo = this.sels;
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();
			},
			//选取所有设备
			handleSelectionAllChange(rows) {
				if(rows.length == 0) {
					this.deviceListData.forEach((row, index) => {
						this.deviceInfo.forEach((res, index) => {
							if(res.id == row.id) {
								this.deviceInfo.splice(index, 1);
								return false;
							}
						});
						this.$refs.deviceListData.toggleRowSelection(row, false);
					});
					return;
				}
				rows.forEach((row, index) => {
					let isdelete = false;
					this.deviceInfo.forEach((res, index) => {
						if(res.id == row.id) {
							isdelete = true;
							return false;
						}
					});
					if(!isdelete) this.deviceInfo.push(row);
				});
			},
			selsChange(selection, row) {
				let isdelete = false;
				if(row.status != "INSTO") {
					this.$message({
						message: "只能选择在库设备！",
						type: 'warning'
					});
					return;
				};
				this.deviceInfo.forEach((res, index) => {
					if(res.id == row.id) {
						this.deviceInfo.splice(index, 1);
						isdelete = true;
						return false;
					}
				});
				if(!isdelete) this.deviceInfo.push(row);
			},
			dateFormatter1(row, col) {
				if(row.DELIVERYDATE == undefined) return '';
				return util.formatDate.format(new Date(row.DELIVERYDATE), 'yyyy-MM-dd');
			},
			dateFormatter2(row, col) {
				if(row.ESTRECEIVEDATE == undefined) return '';
				return util.formatDate.format(new Date(row.ESTRECEIVEDATE), 'yyyy-MM-dd');
			},
			dateFormatter3(row, col) {
				return util.formatDate.format(new Date(row.CREATEDATE), 'yyyy-MM-dd');
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
			//删除字段的转换
			deleteFormat: function(row, col) {
				return row.isdelete == 1 ? '删除' : '未删除';
			},
			//是否的转换
			isFormat: function(row, col) {
				return row.ispack == 1 ? '是' : '否';
			},
			isFormatTwo: function(row, col) {
				return row.isold == 1 ? '是' : '否';
			},
			//有效转换
			isactiveFomat(row, col) {
				return row.isactive == 1 ? '是' : '否';
			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.getDeciceListInfo();
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.getDeciceListInfo();
			},
			selectionRow(row) {
				// if(row.status != "INSTO") {
				// 	this.$message({
				//             message: "只能选择在库设备！",
				//             type: 'warning'
				//         });
				//         return;
				// };
				// this.deviceInfo.push(row);
				// this.$refs.deviceListData.toggleRowSelection(row);
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
			//获取我的在库设备信息
			getDeciceListInfo() {
				let para = {};
				if(this.moreDeviceFormVisible) {
					para = {
						searchKey: this.filters.searchKey
					};
					getMoreDeciceListInfo(para).then((res) => {
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
							this.deviceListData = res.data.data;
							this.$message({
								message: res.data.result.desc,
								type: 'success'
							});
						}
					}).catch((error) => {
						this.devicelistLoading = false;
					});
				} else {
					para = {
						currentPage: this.dcurrentPage,
						showCount: this.dpageSize,
						domSearch: this.filters.domSearch
					};
					this.devicelistLoading = true;
					getCurUserDeviceInfo(para).then((res) => {
						this.devicelistLoading = false;
						if(res.data.result.code == 4001) {
							this.$message({
								message: res.data.result.desc,
								showClose: true,
								duration: 10000,
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
				}
			},
			//时间转换1
			dateFormatter: function(row, col) {},
			//设备类别的转换
			categoryFormat: function(row, col) {},
			//有效转换器
			formatIsactive(row, column) {},
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
			multHandleAdd() {
				this.multAddFormVisible = true;
			},
			//删除表格一行
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			deviceTypeChange(c) {

			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				sums[0] = "总共";
				sums[3] = data.length + "台设备";
				return sums;
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
					receivperson: this.filters.receivperson
				};
				this.listLoading = true;
				getdeliveryList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.listData = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.expandLoading = true;
				this.resetForm();
				let para = {
					id: JSON.parse(sessionStorage.getItem('user')).employeeInfo.id
				};
				this.addForm.fromname = JSON.parse(sessionStorage.getItem('user')).employeeInfo.employeename;
				this.handleSelectConsignor(para);
			},
			resetForm() {
				this.addForm = {
					fromid: '',
					fromname: '',
					fromaddress: '',
					fhmobile: '',
					fhpostcode: '',
					toid: '',
					toname: '',
					toaddress: '',
					shmobile: '',
					shpostcode: '',
					deliverydate:new Date(),
					deliveryfee: '',
					deliveryby: '',
					deliveryno: '',
					estreceivedate: '',
					deliverytype: '',
					storagename: '',
					remarks: '',
					contactno: '',
					company: 1
				}
				this.deviceInfo = [];
				this.deviceListData = [];
			},
			//新增
			addSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							fromid: this.addForm.fromid,
							fromaddressid: this.addForm.fromaddress.id,
							toid: this.addForm.toid,
							toaddressid: this.addForm.toaddress.id,
							deliverytype: this.addForm.company,
							deliverydate: util.formatDate.format(new Date(this.addForm.deliverydate), 'yyyy-MM-dd hh:mm:ss'),
							contactno: this.addForm.contactno,
							deliveryby: this.addForm.deliveryby,
							deliveryno: this.addForm.deliveryno,
							deliveryfee: this.addForm.deliveryfee,
							deliverystatus: 1,
							deliverycategory: this.addForm.deliverycategory == undefined ? 1 : this.addForm.deliverycategory,
							remarks: this.addForm.remarks,
							estreceivedate: !this.addForm.estreceivedate ? '' : util.formatDate.format(this.addForm.estreceivedate, 'yyyy-MM-dd hh:mm:ss'),
							details: []
						};
						this.deviceInfo.forEach(function(item) {
							para.details.push({
								productid: item.id
							});
						});
						// 备注限制字符
						if (util.getChinaLength(para.remarks) > 200) {
							this.$message({
								message: "备注字符只能在100字内！",
								type: 'warning'
							});
							this.addLoading = false;
							return;
						}
						// 判断时间
						if (this.addForm.deliverydate.getTime() < Date.now()) {
							this.$message({
								message: "发货时间不能在当前时间之前，请检查！",
								type: 'warning'
							});
							this.addLoading = false;
							return;
						}
						// 不能发给自己——报损、直接销售 除外
						if (this.addForm.deliverycategory != 6 && this.addForm.deliverycategory != 7 ) {
							if (this.addForm.toid == JSON.parse(sessionStorage.getItem('user')).employeeInfo.id) {
								this.$message({
									message: "不能将自己作为收货人！",
									type: 'warning'
								});
								this.addLoading = false;
								return;
							}
						}
						// 设备列表
						if(this.deviceInfo.length == 0) {
							this.$message({
								message: "请添加设备！",
								type: 'warning'
							});
							this.addLoading = false;
							return;
						}
						adddelivery(para).then((res) => {
							if(res.data.result.code == 4001) {
								this.$message({
									message: "发货失败！" + res.data.result.desc,
									type: 'error'
								});
								this.addLoading = false;
								return;
							}
							if(res.data.result.code == 0) {
								this.$message({
									message: "发货成功！",
									type: 'success'
								});
								this.addLoading = false;
								this.resetForm();
								this.handleQuery();
							}
							this.addFormVisible = false;
							this.addLoading = false;
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
		},
		created() {
			this.handleQuery();
		}
	}
</script>