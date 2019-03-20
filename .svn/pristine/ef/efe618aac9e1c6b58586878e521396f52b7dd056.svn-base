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
									<el-option label="设备编号" value="prodprodnum"></el-option>
									<el-option label="卡号" value="simprodnum"></el-option>
									<el-option label="车架号" value="vin"></el-option>
									<el-option label="车牌号" value="licenseplatenum"></el-option>
									<el-option label="客户" value="corpname"></el-option>
									<el-option label="平台名称" value="platname"></el-option>
									<el-option label="平台IP" value="platip"></el-option>
									<el-option label="指定类型" value="appointtype"></el-option>
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
										<el-option label="设备编号" value="prodprodnum"></el-option>
										<el-option label="卡号" value="simprodnum"></el-option>
										<el-option label="车架号" value="vin"></el-option>
										<el-option label="车牌号" value="licenseplatenum"></el-option>
										<el-option label="客户" value="corpname"></el-option>
										<el-option label="平台名称" value="platname"></el-option>
										<el-option label="平台IP" value="platip"></el-option>
										<el-option label="指定类型" value="appointtype"></el-option>
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
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.isactive" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="prodprodnum" label="设备编号" align="center" >
			</el-table-column>
			<el-table-column prop="simprodnum" label="卡号" align="center" >
			</el-table-column>
			<el-table-column prop="vin" label="车架号" align="center" >
			</el-table-column>
			<el-table-column prop="licenseplatenum" label="车牌号" :formatter="licenseplatenumFormat" align="center" >
			</el-table-column>
			<el-table-column prop="defaultflag" label="主设备" :formatter="defaultflagFormat" align="center" >
			</el-table-column>
			<el-table-column prop="appointsource" label="设备来源" :formatter="fromFormat" align="center" >
			</el-table-column>
			<el-table-column prop="corpname" label="客户" :formatter="corpFormat" align="center" >
			</el-table-column>
			<el-table-column prop="platname" label="平台名称" align="center" >
			</el-table-column>
			<el-table-column prop="platip" label="平台IP" align="center" >
			</el-table-column>
			<el-table-column prop="appointtype" label="指定类型" :formatter="typeFormat" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情">
						<i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除">
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;">
					<el-col :span="24">
						<span class="formTile">平台设备信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd>{{ platProdList.prodprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>卡号:</dt>
							<dd>{{ platProdList.simprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议类型:</dt>
							<dd>{{ platProdList.prodprotoclotype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd>{{ platProdList.vin}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd>{{ platProdList.licenseplatenum == undefined ? platProdList.orlicenseplatenum : platProdList .licenseplatenum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>主设备:</dt>
							<dd>{{ platProdList.defaultflag == 'Y' ? '是' : platProdList.defaultflag == 'N' ? '否' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>客户:</dt>
							<dd>{{ platProdList.corpname == undefined ? platProdList.orcorpname : platProdList.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台名称:</dt>
							<dd>{{ platProdList.platname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>平台IP:</dt>
							<dd>{{ platProdList.platip }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指定类型:</dt>
							<dd>{{ platProdList.appointtype == 'I' ? '系统内' : platProdList.appointtype == 'E' ? '系统外' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指定时间:</dt>
							<dd>{{ platProdList.appointdate == null ? "" :fmtdata.formatDate.format(new Date(platProdList.appointdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>指定人:</dt>
							<dd>{{ platProdList.appointby }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="设备编号" prop="prodprodnum">
					<el-input v-model="editForm.prodprodnum" auto-complete="off" placeholder="请输入设备编号"></el-input>
				</el-form-item>
				<el-form-item label="平台名称" prop="platname">
					<el-select v-model="editForm.platname" @visible-change="platChange" :loading="platLoading" filterable placeholder="请选择平台名称" clearable>
						<el-option v-for="item in platlist" :key="item.platname" :label="item.platname" :value="item.ID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="平台IP" prop="platip">
					<el-input v-model="editForm.platip" auto-complete="off" disabled></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">

			<el-form :model="addForm" label-width="100px" :rules="addForm.hasParent == '1' ? addFormRules : null" ref="addForm">
				<el-tabs type="border-card" @tab-click="tabclick">
					<el-tab-pane label="自主平台" v-model="addForm.appointtype">
						<el-collapse v-model="activeNames" @change="">
							<el-collapse-item title="设备信息" name="1">
								<el-row :gutter="20">
									<el-col :span="12">
										<el-form-item label="设备型号" prop="productmodelname">
											<el-select v-model="addForm.productInfo[0].productmodelname" @visible-change="moNameChange" @change="getNameAdd" :loading="moNameLoading" filterable placeholder="请选择设备型号" clearable>
												<el-option v-for="item in moNamelist" :key="item.prodmodel" :label="item.prodmodel" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="设备类别" prop="prodspec">
											<el-input v-model="addForm.productInfo[0].prodspec" disabled auto-complete="off" placeholder="自动匹配设备分类"></el-input>
										</el-form-item>
										<el-form-item label="设备编号" prop="prodnum">
											<el-autocomplete class="inline-input searchInput" v-model="addForm.productInfo[0].prodnum" :fetch-suggestions="querySearchName" placeholder="请输入设备编号" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>
											<!-- <el-select v-model="addForm.productInfo[0].prodnum" @visible-change="prodnumChange" :loading="prodnumLoading" filterable placeholder="请选择设备编号" clearable>
								    <el-option
								      v-for="item in prodnumlist"
								      :key="item.prodnum"
								      :label="item.prodnum"
								      :value="item.id">
								    </el-option>
							  </el-select> -->
										</el-form-item>
										<el-form-item label="协议名称" prop="protocoltype">
											<!-- <el-input v-model="addForm.productInfo[0].protocoltype" disabled auto-complete="off" placeholder="自动匹配协议"></el-input> -->
											<el-select v-model="addForm.productInfo[0].protocoltype" @visible-change="protocolChange" :loading="protocolLoading" filterable placeholder="自动匹配协议" clearable>
												<el-option v-for="item in protocollist" :key="item.protocolname" :label="item.protocolname" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="备注" prop="remark">
											<el-input v-model="addForm.productInfo[0].remark" auto-complete="off"></el-input>
										</el-form-item>

									</el-col>
									<el-col :span="12">
										<!-- 判断是否绑定车辆 -->
										<!-- <el-form-item label="是否绑定车辆" prop="hasParent">
			 				<el-switch
								    v-model="addForm.hasParent"
								    on-color="#13ce66"
								    off-color="#ff4949"
								    on-value="1"
								    on-text="是"
								    off-value="0"
								    off-text="否"
								   >
							</el-switch>
						</el-form-item> -->
										<el-form-item label="设备来源" prop="appointsource">
											<el-select v-model="addForm.appointsource" filterable placeholder="请选择设备来源" clearable>
												<el-option v-for="item in appointsourceOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="所属客户" prop="corpname">
											<el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable remote :remote-method="corpChangeSelect">
												<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="车架号" prop="vin" ref="vines">
											<!-- <el-input v-model="addForm.productInfo[0].vin" auto-complete="off" @blur="checkCars"></el-input> -->
											<el-autocomplete class="inline-input searchInput" v-model="addForm.vin" :fetch-suggestions="querySearchVin" placeholder="请输入车架号" :trigger-on-focus="false" @select="handleSelectVin" clearable></el-autocomplete>
										</el-form-item>
										<el-form-item label="车牌号" prop="licenseplatenum" ref="licenseplatenumes">
											<el-input v-model="addForm.licenseplatenum" @blur="checkCars" auto-complete="off" placeholder="自动匹配车牌号"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="绑定平台" name="2">
								<el-row :gutter="20">
									<el-col :span="24">
										<el-form-item label="平台名称" prop="platnameId">
											<el-select v-model="addForm.platnameId" @visible-change="platChange" @change="getIpAdd" :loading="platLoading" filterable placeholder="请选择平台名称" clearable>
												<el-option v-for="item in platlist" :key="item.platname" :label="item.platname" :value="item.ID">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="平台IP" prop="platip">
											<el-input v-model="addForm.platip" disabled auto-complete="off" placeholder="自动匹配平台IP"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-tab-pane>
					<el-tab-pane label="其他平台">
						<!-- <el-collapse v-model="activeNames" @change="">
  				<el-collapse-item title="设备信息" name="1">
			    	<el-row :gutter="20">
			    		<el-col :span="12">
		 				<el-form-item label="设备型号" prop="productmodelname">
							<el-select v-model="addForm.productInfo[0].productmodelname" @visible-change="moNameChange" @change="getNameAdd" :loading="moNameLoading" filterable placeholder="请选择设备型号" clearable>
								    <el-option
								      v-for="item in moNamelist"
								      :key="item.prodmodel"
								      :label="item.prodmodel"
								      :value="item.id">
								    </el-option>
							  </el-select>
						</el-form-item>
		 				<el-form-item label="设备类别" prop="prodspec">
							<el-input v-model="addForm.productInfo[0].prodspec" disabled auto-complete="off" placeholder="自动匹配设备分类"></el-input>
						</el-form-item>
						<el-form-item label="设备编号" prop="prodnum">
							<el-input v-model="addForm.productInfo[0].prodnum" auto-complete="off"></el-input>
						</el-form-item>
		 				<el-form-item label="库房名称" prop="storagename">
							<el-select v-model="addForm.productInfo[0].storagename" @visible-change="stoNameChange" :loading="stoNameLoading" filterable placeholder="请选择库房名" clearable>
								    <el-option
								      v-for="item in stoNamelist"
								      :key="item.storagename"
								      :label="item.storagename"
								      :value="item.id">
								    </el-option>
							</el-select>
						</el-form-item>
		 				<el-form-item label="设备状态" prop="status">
							<el-radio-group size="small" v-model="addForm.productInfo[0].status">
							    <el-radio-button label="INSTO">在库</el-radio-button>
							    <el-radio-button label="INSTALL">已安装</el-radio-button>
							    <el-radio-button label="LOST">报失</el-radio-button>
							    <el-radio-button label="REPAIR">维修</el-radio-button>
							    <el-radio-button label="DAMAGE">报废</el-radio-button>
							    <el-radio-button label="ONWAY">在途</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="供应商" prop="suppliername">
							<el-input v-model="addForm.productInfo[0].suppliername" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="协议" prop="protoclotype">
							<el-input v-model="addForm.productInfo[0].protoclotype" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="安装位置" prop="dictdatavalue">
							<el-input v-model="addForm.productInfo[0].dictdatavalue" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="是否组装" prop="ispack">
		 					<el-radio-group v-model="addForm.productInfo[0].ispack">
						                    <el-radio class="radio" :label="1">是</el-radio>
						                    <el-radio class="radio" :label="0">否</el-radio>
			               			</el-radio-group>
						</el-form-item>
		 				<el-form-item label="是否旧设备" prop="isold">
		 					<el-radio-group v-model="addForm.productInfo[0].isold">
						                    <el-radio class="radio" :label="1">是</el-radio>
						                    <el-radio class="radio" :label="0">否</el-radio>
			               			</el-radio-group>
						</el-form-item>
		 				<el-form-item label="设备有效期" prop="expiredate">
		 					<el-date-picker
							      v-model="addForm.productInfo[0].expiredate"
							      type="date"
							      placeholder="选择日期"
							      :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
		 				<el-form-item label="备注" prop="remark">
							<el-input v-model="addForm.productInfo[0].remark" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否绑定车辆" prop="hasParent">
			 				<el-switch
								    v-model="addForm.hasParent"
								    on-color="#13ce66"
								    off-color="#ff4949"
								    on-value="1"
								    on-text="是"
								    off-value="0"
								    off-text="否"
								   >
							</el-switch>
						</el-form-item>
						<div v-show="addForm.hasParent == 1">
								<el-form-item  label="所属客户" prop="corpname">
									 <el-select v-model="addForm.productInfo[0].corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable>
									    <el-option
									      v-for="item in corplist"
									      :key="item.corpname"
									      :label="item.corpname"
									      :value="item.id">
									    </el-option>
								  	</el-select>
								</el-form-item>
								<el-form-item label="车架号" prop="vin">
									<el-input v-model="addForm.productInfo[0].vin" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="车牌号" prop="licenseplatenum">
									<el-input v-model="addForm.productInfo[0].licenseplatenum" auto-complete="off"></el-input>
								</el-form-item>
						</div>
						<el-form-item label="是否绑定SIM卡" prop="hasParentTwo">
			 				<el-switch
								    v-model="addForm.hasParentTwo"
								    on-color="#13ce66"
								    off-color="#ff4949"
								    on-value="1"
								    on-text="是"
								    off-value="0"
								    off-text="否"
								   >
							</el-switch>
						</el-form-item>
						<div v-show="addForm.hasParentTwo == 1">
								<el-form-item  label="ICCID" prop="prodnum">
									 <el-input v-model="addForm.productInfo[0].vin" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="IMEI" prop="prodsnnum ">
									<el-input v-model="addForm.productInfo[0].vin" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="卡类型" prop="productmodelname">
									<el-input v-model="addForm.productInfo[0].licenseplatenum" auto-complete="off"></el-input>
								</el-form-item>
						</div>
					</el-col>
				</el-row>	
			     </el-collapse-item>
			     <el-collapse-item title="绑定平台" name="2">
			     	<el-row :gutter="20">
			    	     <el-col :span="12">
					<el-form-item label="平台名称" prop="platnameId">
						<el-select v-model="addForm.platnameId" @visible-change="platChange"  @change="getIpAdd" :loading="platLoading" filterable placeholder="请选择平台名称" clearable>
								    <el-option
								      v-for="item in platlist"
								      :key="item.platname"
								      :label="item.platname"
								      :value="item.ID">
								    </el-option>
							  </el-select>
					</el-form-item>
					<el-form-item label="平台IP" prop="platip">
						<el-input v-model="addForm.platip"  auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="端口" prop="">
						<el-input v-model="addForm.platip"  auto-complete="off"  ></el-input>
					</el-form-item>
				     </el-col>
				     <el-col :span="12">
					<el-form-item label="网络" prop="">
						<el-input v-model="addForm.platip"  auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="来源方" prop="">
						<el-input v-model="addForm.platip"  auto-complete="off" ></el-input>
					</el-form-item>
				    </el-col>
				  </el-row>
			     </el-collapse-item>
			</el-collapse> -->
					</el-tab-pane>
				</el-tabs>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getPlatProdList, addPlatProd, modifyPlatProd, removePlatProd, getSelectPlatProdList, getMoNameList, getStoNameList, getCorpList, getPlatList, getProdList, getVehicleInfoList, getProtocolList, getProductOwnerList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['prodprodnum'],
						content: ''
					}], //查询框
					isactive: '1',
				},
				listData: [],
				platProdList: [],
				appointsourceOptions: [{
					value: 'A',
					label: '人工添加'
				}, {
					value: 'B',
					label: '订单添加'
				}, {
					value: 'C',
					label: '批量导入'
				}, {
					value: 'D',
					label: '平台对接'
				}, {
					value: 'E',
					label: '其他'
				}],
				value: '',
				formDialogTableVisible: false,
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				moNamelist: [], //设备型号列表
				moNameLoading: false, //设备型号
				stoNamelist: [], //库房名称列表
				stoNameLoading: false, //库房名称
				corplist: [], //所属公司
				corpLoading: false, //
				platlist: [], //绑定平台
				platLoading: false, //
				prodnumlist: [], //设备编号
				prodnumLoading: false, //
				vehlist: [], //车辆是否存在
				vehID: '', //通过车架号查出当前已选择车辆的id
				protocollist: [], //协议列表
				protocolLoading: false, //协议
				pickerOptions: { //日期
				},
				activeNames: ['1', '2'],
				modelSendNum: '', //存储当前设备型号id，查出该型号下的设备编号
				prodid: '', //存储当前prodid，查出该设备编号下的车辆
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: '',
					prodID: '',
					prodprodnum: '',
					platid: '',
					platname: '',
					platip: '',
				},
				editFormId: {
					platid: '',
					platname: '',
				},
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					// corpname: [
					// 	{ required: true, message: '请选择所属客户', trigger: 'blur' }
					// ],
					// vin: [
					// 	{ required: true, message: '请输入车架号', trigger: 'blur' }
					// ],
				},
				//新增界面数据
				addForm: {
					vehicleid: '',
					platname: '',
					platip: '',
					platid: '',
					appointtype: '',
					appointdate: '',
					appointby: '',
					hasParent: 1,
					hasParentTwo: 1,
					platnameId: '',
					licenseplatenum: '',
					vin: '',
					corporateid: '',
					corpname: '',
					appointsource: 'A',
					defaultflag: '',
					productid: '',
					protocolid: '',
					productInfo: [{
						prodnum: '',
						prodspec: '',
						protocoltype: '',
						prodcategory: '',
						prodmodelid: '',
						productmodelname: '',
						storageid: '',
						storagename: '',
						status: 1,
						suppliername: '',
						dictdatavalue: '',
						ispack: 1,
						isold: 1,
						expiredate: '',
						remark: '',
					}],
				}
			}
		},
		methods: {
			//协议——搜索下拉
			protocolChange(r) {
				if(!r || this.protocollist.length > 0) return;
				this.protocolLoading = true;
				getProtocolList().then((res) => {
					this.protocollist = res.data.data.records;
					this.protocolLoading = false;
				});
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			// 验证是否是平台内现有的车辆
			checkCars(val) {
				let para = {
					licenseplatenum: $.trim(val.target.value)
				}
				// this.addForm.vin='';//清空对应型号的车架号
				if(para.licenseplatenum == "") return;
				getVehicleInfoList(para).then((res) => {
					this.vehlist = res.data.data.records;
					if(this.vehlist.length == 0) {
						this.$message({
							message: '平台暂无该车辆！',
							type: 'warning'
						});
						this.$refs.licenseplatenumes.$el.className = "el-form-item is-error"; //输入框标红
					} else {
						this.$refs.licenseplatenumes.$el.className = "el-form-item";
					}
				});
			},
			/*平台——下拉*/
			platChange(r) {
				if(!r || this.platlist.length > 0) return;
				this.platLoading = true;
				getPlatList().then((res) => {
					this.platlist = res.data.data.records;
					this.platLoading = false;
				});
			},
			// 设备编号——下拉
			querySearchName(queryString, cb) {
				let para = {
						prodnum: queryString,
						prodmodelid: this.modelSendNum,
						// status:'INSTO',
					},
					prodnumArray = [];
				getProdList(para).then((res) => {
					console.log(res)
					res.data.data.records.forEach(function(item, index) {
						prodnumArray.push({
							value: item.prodnum,
							id: item.id,
							prodid: item.id,
							protocoltype: item.protocoltype,
							protocolid: item.protocolid
						});
					});
					cb(prodnumArray);
				});
			},
			handleSelectName(item) {
				this.addForm.productInfo[0].prodnum = item.value;
				this.addForm.productInfo[0].id = item.id;
				this.addForm.productInfo[0].protocoltype = item.protocoltype;
				this.addForm.protocolid = item.protocolid;
				this.prodid = item.prodid; //存储packid，查出车辆
			},
			// 车架号——下拉
			querySearchVin(queryString, cb) {
				let para = {
						vin: queryString,
						isdelete: 0,
						showCount: 1000,
						PRODID: this.prodid,
				},
				vinArray = [];
				getProductOwnerList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						vinArray.push({
							value: item.vin,
							licenseplatenum: item.licenseplatenum,
							id: item.ID
						});
					});
					cb(vinArray);
				});
			},
			handleSelectVin(item) {
				this.vehID = item.id;
				this.addForm.vin = item.value;
				this.addForm.licenseplatenum = item.licenseplatenum;
			},

			/*设备编号——下拉*/
			// prodnumChange(r){
			// 	if(!r || this.prodnumlist.length > 0) return;
			// 	this.prodnumLoading = true;
			// 	getProdList().then((res) => {
			// 		this.prodnumlist = res.data.data.records;
			// 		this.prodnumLoading = false;
			// 	});
			// },

			/*设备型号——下拉*/
			moNameChange(r) {
				if(!r || this.moNamelist.length > 0) return;
				this.moNameLoading = true;
				getMoNameList().then((res) => {
					this.moNamelist = res.data.data.records;
					this.moNameLoading = false;
				});
			},
			//新增—— 设备型号选中时自动获取设备分类，匹配相应的设备编号
			getNameAdd(val) {
				for(var i = 0; i < this.moNamelist.length; i++) {
					if(this.moNamelist[i].id == this.addForm.productInfo[0].productmodelname) {
						this.addForm.productInfo[0].prodspec = this.moNamelist[i].prodspec;
						this.addForm.productInfo[0].prodcategory = this.moNamelist[i].prodcategory;
					}
				}

				this.addForm.productInfo[0].prodnum = ''; //清空对应型号的设备编号
				this.modelSendNum = val;

				// 选设备型号匹配设备编号
				let para = {
					prodmodelid: val,
					showCount: 100,
					// status:'INSTO',
				}
				getProdList(para).then((res) => {
					this.prodnumlist = res.data.data.records;
				});

				// 选设备型号匹配协议
				// let para ={
				// 		prodmodelid:val,
				// 	}

			},
			//新增—— 平台名称选中时自动获取平台ip
			getIpAdd() {
				for(var i = 0; i < this.platlist.length; i++) {
					if(this.platlist[i].ID == this.addForm.platnameId) {
						this.addForm.platip = this.platlist[i].platip;
					}
				}
			},
			/*库房名称——下拉*/
			stoNameChange(r) {
				if(!r || this.stoNamelist.length > 0) return;
				this.stoNameLoading = true;
				getStoNameList().then((res) => {
					this.stoNamelist = res.data.data.records;
					this.stoNameLoading = false;
				});
			},
			/*所属客户——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;

				let para = {
					flag: '万网公司',
				}
				getCorpList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			// 客户，模糊查询
			corpChangeSelect(query) {
				let para = {
					showCount: 30,
					corpname: query,
				}
				this.corpLoading = true;
				getCorpList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
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
			//类型显示转换
			typeFormat: function(row, col) {
				return row.appointtype == 'I' ? '系统内' : row.appointtype == 'E' ? '系统外' : '';
			},
			// 设备来源
			fromFormat: function(row, col) {
				return row.appointsource == 'A' ? '人工添加' : row.appointsource == 'B' ? '订单添加' : row.appointsource == 'C' ? '批量导入' : row.appointsource == 'D' ? '平台对接' : row.appointsource == 'E' ? '其他' : '';
			},
			// 所属客户显示判断
			corpFormat: function(row, col) {
				return row.corpname == undefined ? row.orcorpname : row.corpname;
			},
			// 车牌号显示判断
			licenseplatenumFormat: function(row, col) {
				return row.licenseplatenum == undefined ? row.orlicenseplatenum : row.licenseplatenum;
			},
			// 主设备显示判断
			defaultflagFormat: function(row, col) {
				return row.defaultflag == 'Y' ? '是' : row.defaultflag == 'N' ? '否' : '';
			},
			//详情查看
			formDetailHandle(ID) {
				this.formDialogTableVisible = true;
				this.platProdList = '';
				let para = {
					id: ID,
				}
				getPlatProdList(para).then((res) => {
					this.platProdList = res.data.data.records[0];
				});
			},
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
				console.log(para);
				// getSortList(para).then((res) => {});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isactive = i;
				this.getPlat();
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isactive == 0) {
					return 'warning-row';
				}
				return '';
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				// this.getPlat();
				this.handleQuerySelect();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getPlat();
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
					isactive: this.filters.isactive,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectPlatProdList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取用户列表
			getPlat() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isactive: this.filters.isactive,
				};
				this.listLoading = true;
				getPlatProdList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: row.ID,
						method: "delete",
					};
					removePlatProd(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuerySelect();
					});
				}).catch(() => {
					this.listLoading = false;
				});
			},

			// 新增切换两个tab时
			tabclick(item) {
				if(item.label == "自主平台") {
					this.addForm.appointtype = 'I';
				} else {
					this.addForm.appointtype = 'E';
				}
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					prodID: row.prodID,
					prodprodnum: row.prodprodnum,
					platid: row.platid,
					platname: row.platname,
					platip: row.platip,
				}
				this.editFormId = {
					platid: row.platid,
					platname: row.platname,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					vehicleid: '',
					platname: '',
					platip: '',
					appointdate: '',
					appointby: '',
					appointtype: 'I',
					hasParent: '1',
					hasParentTwo: '1',
					platnameId: '',
					licenseplatenum: '',
					vin: '',
					corporateid: '',
					corpname: '',
					appointsource: 'A',
					platid: '',
					defaultflag: '',
					productid: '',
					protocolid: '',
					productInfo: [{
						id: '',
						prodnum: '',
						prodspec: '',
						prodcategory: '',
						prodmodelid: '',
						productmodelname: '',
						storageid: '',
						storagename: '',
						status: 1,
						suppliername: '',
						protocoltype: '',
						dictdatavalue: '',
						ispack: 1,
						isold: 1,
						expiredate: '',
						remark: '',
					}],
				};
			},
			//编辑
			editSubmit() {
				this.$refs['editForm'].validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.prodID,
							// prodid:this.editForm.prodID,
							prodnum: this.editForm.prodprodnum,
							platid: this.editForm.platname,
						}
						console.log(para)
						if(this.editFormId.platname == this.editForm.platname) {
							para.platid = this.editFormId.platid;
						} else {
							para.platid = this.editForm.platname;
						}
						modifyPlatProd(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuerySelect();
						}).catch((error) => {
							this.editLoading = false;
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs['addForm'].validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							vehicleid: this.vehID,
							platip: this.addForm.platip,
							appointtype: this.addForm.appointtype,
							appointdate: this.addForm.appointdate,
							appointby: this.addForm.appointby,
							platnameId: this.addForm.platnameId,
							platid: this.addForm.platnameId,
							corporateid: this.addForm.corpname,
							licenseplatenum: this.addForm.licenseplatenum,
							appointsource: this.addForm.appointsource,
							defaultflag: this.addForm.defaultflag,
							vin: this.addForm.vin,
							productid: this.addForm.productInfo[0].id,
							protocolid: this.addForm.protocolid,
							productInfo: [{
								id: this.addForm.productInfo[0].id,
								prodnum: this.addForm.productInfo[0].prodnum,
								prodspec: this.addForm.productInfo[0].prodspec,
								prodcategory: this.addForm.productInfo[0].prodcategory,
								productmodelname: this.addForm.productInfo[0].productmodelname,
								status: this.addForm.productInfo[0].status,
								suppliername: this.addForm.productInfo[0].suppliername,
								protocoltype: this.addForm.productInfo[0].protocoltype,
								dictdatavalue: this.addForm.productInfo[0].dictdatavalue,
								ispack: parseInt(this.addForm.productInfo[0].ispack),
								isold: parseInt(this.addForm.productInfo[0].isold),
								expiredate: this.addForm.productInfo[0].expiredate,
								remark: this.addForm.productInfo[0].remark,
								prodmodelid: this.addForm.productInfo[0].productmodelname,
								storageid: this.addForm.productInfo[0].storagename,
							}],
						}
						if (this.addForm.platnameId == '') {
							this.$message({
								message: '请选择平台！',
								type: 'warning'
							});
							this.addLoading = false;
							return;
						}
						addPlatProd(para).then((res) => {
							this.addLoading = false;

							if(res.data.result.code == 4001) {
								this.$message.warning.message(res.data.result.desc);
							} else {
								this.$message({
									message: '新增成功！',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getPlat();
							}
						}).catch((error) => {
							this.addLoading = false;
						});
					}
				});
			},
			selsChange(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove() {
				// var ids = this.sels.map(item => item.id).toString();
				// this.$confirm('确认删除选中记录吗？', '提示', {
				// 	type: 'warning'
				// }).then(() => {
				// 	this.listLoading = true;
				// 	let para = { ids: ids,method:"delete" };
				// 	removePlatProd(para).then((res) => {
				// 		this.listLoading = false;
				// 		this.$message ({
				// 			message : '删除成功',
				// 			type: 'success'
				// 		});
				// 		this.getPlat();
				// 	});
				// }).catch(() => {
				// });
			}
		},
		created() {
			this.getPlat();
		},
	}
</script>