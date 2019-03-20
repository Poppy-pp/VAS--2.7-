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
									<el-option label="协议" value="protocoltype"></el-option>
									<el-option label="安装位置" value="dictdatavalue"></el-option>
									<el-option label="是否组装" value="ispack"></el-option>
									<el-option label="是否旧设备" value="isold"></el-option>
									<el-option label="是否接入平台" value="platid"></el-option>
								</el-select>
								<template v-if="index == filters.domSearch.length-1">
									<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
								</template>
								<template v-else>
									<el-button slot="append" @click="removeSelect(index)" icon="minus" title="移除查询条件"></el-button>
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
										<el-option label="协议" value="protocoltype"></el-option>
										<el-option label="安装位置" value="dictdatavalue"></el-option>
										<el-option label="是否组装" value="ispack"></el-option>
										<el-option label="是否旧设备" value="isold"></el-option>
										<el-option label="是否接入平台" value="platid"></el-option>
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="minus" title="移除查询条件"></el-button>
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
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
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
			<el-table-column prop="protocoltype" label="协议" align="center" >
			</el-table-column>
			<el-table-column prop="dictdatavalue" label="安装位置" align="center" >
			</el-table-column>
			<el-table-column prop="ispack" label="组装" :formatter="isFormat" width="70" align="center" >
			</el-table-column>
			<el-table-column prop="isold" label="旧设备" :formatter="isFormatTwo" width="70" align="center" >
			</el-table-column>
			<el-table-column prop="platid" label="接入平台" :formatter="isFormatThree" width="80" align="center" >
			</el-table-column>
			<el-table-column label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.id,scope.row)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" disabled>批量删除</el-button> -->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs v-loading="fdtLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
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
							<dd>{{ psData.prodsuppliername == undefined ? '暂无' : psData.prodsuppliername }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ psData.prodstatus == 'INSTO' ? '在库' : psData.prodstatus == 'INSTALL' ? '已安装' : psData.prodstatus == 'LOST' ? '报失' : psData.prodstatus == 'REPAIR' ? '维修' : psData.prodstatus == 'DAMAGE' ? '报废' : psData.prodstatus == 'ONWAY' ? '在途' : psData.prodstatus == 'REMOVING' ? '拆除中' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ psData.prodprotocoltype == undefined ? '暂无' : psData.prodprotocoltype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ psData.dictdatavalue == undefined ? '暂无' : psData.dictdatavalue }}</dd>
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
							<dd>{{ psData.prodexpiredate == null ? "暂无" :fmtdata.formatDate.format(new Date(psData.prodexpiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ psData.prodremark == undefined ? '暂无' : psData.prodremark }}</dd>
						</dl>
					</el-col>
					<el-col :span="24" style="margin-bottom:10px;">
						<el-button type="primary" v-if="psData.simID == undefined && psData.prodstatus == 'INSTO'" @click.native="addDeviceList" icon="el-icon-plus">点击绑卡</el-button>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{moreData.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(moreData.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{moreData.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(moreData.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="psData.simID != undefined">
					<el-col :span="24">
						<span class="formTile">SIM卡信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>通讯号:</dt>
							<dd>{{ psData.simprodnum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>ICCID:</dt>
							<dd>{{ psData.simprodsnnum == undefined ? '暂无' : psData.simprodsnnum }}</dd>
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
							<dd>{{ psData.suppliername == undefined ? '暂无' : psData.suppliername }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>状态:</dt>
							<dd>{{ psData.simstatus == 'INSTO' ? '在库' : psData.simstatus == 'INSTALL' ? '已安装' : psData.simstatus == 'LOST' ? '报失' : psData.simstatus == 'REPAIR' ? '维修' : psData.simstatus == 'DAMAGE' ? '报废' : psData.simstatus == 'ONWAY' ? '在途' : psData.simstatus == 'REMOVING' ? '拆除中' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>协议:</dt>
							<dd>{{ psData.simprotocoltype == undefined ? '暂无' : psData.simprotocoltype }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>安装位置:</dt>
							<dd>{{ psData.dictdatavalue == undefined ? '暂无' : psData.dictdatavalue }}</dd>
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
							<dd>{{ psData.simexpiredate == null ? "暂无" :fmtdata.formatDate.format(new Date(psData.simexpiredate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>备注:</dt>
							<dd>{{ psData.simremark == undefined ? '暂无' : psData.simremark }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<el-button type="danger" v-if="psData.simstatus == 'INSTO'" @click.native="cancel">解绑</el-button>
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
							<dd>{{vehInfo.licenseplatenum == undefined ? '暂无' : vehInfo.licenseplatenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd>{{vehInfo.vin == undefined ? '暂无' : vehInfo.vin}}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>厂牌型号:</dt>
							<dd>{{vehInfo.model == undefined ? '暂无' : vehInfo.model}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发动机号:</dt>
							<dd>{{vehInfo.enginenum == undefined ? '暂无' : vehInfo.enginenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车类型:</dt>
							<dd>{{vehInfo.vehicletypename == undefined ? '暂无' : vehInfo.vehicletypename}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>初始登记日期:</dt>
							<dd>{{ vehInfo.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(vehInfo.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆颜色:</dt>
							<dd>{{vehInfo.colorname == undefined ? '暂无' : vehInfo.colorname}}</dd>
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
							<dd>{{psData.platip}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>时间:</dt>
							<dd>{{psData.platcreatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(psData.platcreatedate), 'yyyy-MM-dd')}}</dd>
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

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" v-loading="editLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
				<el-row :gutter="20">
					<el-col :span="14">
						<el-form-item label="设备编号" prop="prodnum" ref="prodnum">
							<el-input v-model="editForm.prodnum" auto-complete="off" @blur="checkout('prodnum',editForm.prodnum,0)"></el-input>
						</el-form-item>
						<el-form-item label="设备型号" prop="productmodelname">
							<el-select v-model="editForm.productmodelname" @visible-change="moNameChange" @change="getNameEdit" :loading="moNameLoading" filterable placeholder="请选择设备型号" clearable>
								<el-option v-for="item in moNamelist" :key="item.prodmodel" :label="item.prodmodel" :value="item.id+''">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备类别" prop="prodspec">
							<el-input v-model="editForm.prodspec" disabled auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="库房名称" prop="storagename">
							<el-select v-model="editForm.storagename" @visible-change="stoNameChange" :loading="stoNameLoading" filterable placeholder="请选择库房名" clearable remote :remote-method="stoChangeSelect">
								<el-option v-for="item in stoNamelist" :key="item.storagename" :label="item.storagename" :value="item.id+''">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备状态" prop="status">
							<el-radio-group disabled size="small" v-model="editForm.status">
								<el-radio-button label="INSTO">在库</el-radio-button>
								<el-radio-button label="INSTALL">已安装</el-radio-button>
								<el-radio-button label="LOST">报失</el-radio-button>
								<el-radio-button label="REPAIR">维修</el-radio-button>
								<el-radio-button label="DAMAGE">报废</el-radio-button>
								<el-radio-button label="ONWAY">在途</el-radio-button>
								<el-radio-button label="REMOVING">拆除中</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<!-- <el-form-item label="协议" prop="protocoltype">
                            <el-input v-model="editForm.protocoltype" auto-complete="off"></el-input>
                        </el-form-item> -->
						<el-form-item label="安装位置" prop="dictdatavalue" v-show="editForm.status == 'INSTALL'">
							<el-input v-model="editForm.dictdatavalue" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="是否组装" prop="ispack">
							<el-radio-group v-model="editForm.ispack" disabled>
								<el-radio class="radio" :label="1">是</el-radio>
								<el-radio class="radio" :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否旧设备" prop="isold">
							<el-radio-group v-model="editForm.isold">
								<el-radio class="radio" :label="1">是</el-radio>
								<el-radio class="radio" :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="有效期" prop="expiredate">
							<el-date-picker v-model="editForm.expiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input v-model="editForm.remark" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="14">
						<el-form-item label="设备编号" prop="prodnum" ref="prodnum">
							<el-input v-model="addForm.prodnum" auto-complete="off" @blur="checkout('prodnum',addForm.prodnum,0)"></el-input>
						</el-form-item>
						<el-form-item label="设备型号" prop="productmodelname">
							<el-select v-model="addForm.productmodelname" @visible-change="moNameChange" @change="getNameAdd" :loading="moNameLoading" filterable placeholder="请选择设备型号" clearable>
								<el-option v-for="item in moNamelist" :key="item.prodmodel" :label="item.prodmodel" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备类别" prop="prodspec">
							<el-input v-model="addForm.prodspec" disabled auto-complete="off" placeholder="选择设备型号自动匹配该设备分类"></el-input>
						</el-form-item>
						<el-form-item label="库房名称" prop="storagename">
							<el-select v-model="addForm.storagename" @visible-change="stoNameChange" :loading="stoNameLoading" filterable placeholder="请选择库房名" clearable remote :remote-method="stoChangeSelect">
								<el-option v-for="item in stoNamelist" :key="item.storagename" :label="item.storagename" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备状态" prop="status">
							<el-radio-group size="small" v-model="addForm.status">
								<el-radio-button label="INSTO">在库</el-radio-button>
								<el-radio-button label="INSTALL">已安装</el-radio-button>
								<el-radio-button label="LOST">报失</el-radio-button>
								<el-radio-button label="REPAIR">维修</el-radio-button>
								<el-radio-button label="DAMAGE">报废</el-radio-button>
								<el-radio-button label="ONWAY">在途</el-radio-button>
								<el-radio-button label="REMOVING">拆除中</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="供应商" prop="suppliername">
							<el-input v-model="addForm.suppliername" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="协议" prop="protocoltype">
							<el-input v-model="addForm.protocoltype" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="安装位置" prop="dictdatavalue">
							<el-input v-model="addForm.dictdatavalue" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="是否组装" prop="ispack">
							<el-radio-group v-model="addForm.ispack">
								<el-radio class="radio" :label="1">是</el-radio>
								<el-radio class="radio" :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否旧设备" prop="isold">
							<el-radio-group v-model="addForm.isold">
								<el-radio class="radio" :label="1">是</el-radio>
								<el-radio class="radio" :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="设备有效期" prop="expiredate">
							<el-date-picker v-model="addForm.expiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input v-model="addForm.remark" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--SIM列表选择界面-->
		<el-dialog title="SIM卡信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" @close="clearAll()" :close-on-click-modal="false">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="通讯号" value="prodnum"></el-option>
										<el-option label="卡类型" value="productmodelname"></el-option>
										<!-- <el-option label="设备类别" value="prodspec"></el-option> -->
										<el-option label="库房" value="storagename"></el-option>
										<el-option label="ICCID" value="prodsnnum"></el-option>
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
											<el-option label="通讯号" value="prodnum"></el-option>
											<el-option label="卡类型" value="productmodelname"></el-option>
											<!-- <el-option label="设备类别" value="prodspec"></el-option> -->
											<el-option label="库房" value="storagename"></el-option>
											<el-option label="ICCID" value="prodsnnum"></el-option>
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
			<el-table border :data="deviceListData" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @row-dblclick="comlist" style="width: 100%;">
				<el-table-column prop="prodnum" label="通讯号" align="center">
				</el-table-column>
				<el-table-column prop="productmodelname" label="卡类型" align="center">
				</el-table-column>
				<el-table-column prop="prodsnnum" label="ICCID" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="statusFormat" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="dhandleSizeChange" @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next, jumper" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

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

	import { getProductInfoList, addProductInfo, modifyProductInfo, removeProductInfo, getMoNameList, getStoNameList, getSIMInfoList, getSortList, getProductOwnerList, getSelectListProd, getAllProSimInfoList, addUnbundleSIM, cancelUnbundleSIM, getCheckoutOfProdInfo, getNamebyUserid } from '../../api/api';

	export default {
		name:'ProductInfo',
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
				}, {
					value: 'REMOVING',
					label: '拆除中'
				}],
				pickerOptions: { //日期
				},
				sels1: [],
				comfirLoading: false,
				radio: '',
				listData: [],
				moreData: [], //创建信息
				resID: [], //绑卡后返回的设备id和卡id
				checkData: [], //选择绑卡check
				deviceListData: [], //绑卡
				deviceFormVisible: false,
				devicelistLoading: false,
				dtotal: 0,
				dcurrentPage: 1,
				dpageSize: 15,
				prodList: [], //设备
				psData: [], //绑定设备SIM卡数据
				vehInfo: [], //绑定车辆信息
				formDialogTableVisible: false, //是否显示订单详情弹出
				fdtLoading: false,
				customers: [],
				moNamelist: [], //设备型号列表
				moNameLoading: false, //设备型号
				stoNamelist: [], //库房名称列表
				stoNameLoading: false, //库房名称
				createname: "",
				updatename: "",
				total: 0,
				currentPage: 1,
				pageSize: 15,
				showCount: '',
				listLoading: false,
				sels: [], //列表选中列
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: '', //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					prodnum: [{
						required: true,
						message: "请输入设备编号",
						trigger: 'blur'
					}],
					productmodelname: [{
						required: true,
						message: "请选择设备型号",
						trigger: 'blur'
					}],
					// storagename:[{required:true,message:"请输入库房名",trigger: 'blur'}],
				},
				//编辑界面数据
				editForm: {
					id: '',
					prodnum: '',
					prodspec: '',
					prodcategory: '',
					productmodelname: '',
					storagename: '',
					status: '',
					suppliername: '',
					protocoltype: '',
					dictdatavalue: '',
					ispack: '',
					isold: '',
					expiredate: '',
					remark: '',
					isdelete: '',
				},
				editFormId: {
					storageid: '',
					prodmodelid: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					// act_id:'',
					// act_status:'',
					prodnum: '',
					prodspec: '',
					prodcategory: '',
					prodmodelid: '',
					productmodelname: '',
					storageid: '',
					storagename: '',
					protocoltype: '',
					dictdatavalue: '',
					status: '',
					suppliername: '',
					ispack: 1,
					isold: 1,
					expiredate: '',
					remark: '',
					isdelete: 0,
				},
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return; //输入框没输数据
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfProdInfo(paras).then((res) => {
					let errorInput = res.data.data.param; //保存验证失败的字段
					if(!res.data.data.result) {
						this.$message({
							message: '信息输入重复！',
							type: 'warning'
						});
						this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
						this.checkoutDataF[index] = false
					} else {
						this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
						this.checkoutDataF[index] = true
					}
				});
			},
			selsChange(sels, row) {
				this.sels = sels;
				this.checkData = row;
			},
			// 确认解绑
			cancel() {
				if(this.vehInfo.length != 0) { //该设备已有绑定车辆
					this.$message({
						message: '该设备已绑定车辆，无法解绑！',
						type: 'warning'
					});
				} else { //该设备未绑定车辆
					let para = {
						packID: this.psData.packID
					};
					cancelUnbundleSIM(para).then((res) => {
						if(res.data.data) {
							this.$message({
								message: '解绑成功！',
								type: 'success'
							});
							this.psData.simID = undefined; //清空绑定的卡信息
							this.deviceFormVisibleSto = false;
						} else {
							this.$message({
								message: '解绑失败！只有在库设备可以解绑！',
								type: 'warning'
							});
						}
					});
				}
			},
			// 确认绑卡
			comlist(checkData, event) {
				this.deviceFormVisible = false;
				let para = {
					equipmentid: this.psData.prodID,
					simcardid: checkData.id,
					storageid: this.psData.storageid
				};
				this.comfirLoading = true;
				addUnbundleSIM(para).then((res) => {
					this.comfirLoading = false;
					this.$message({
						message: '该设备绑卡成功！',
						type: 'success'
					});
					this.resID = res.data.data;
					let paraTwo = {
						prodID: this.resID.equipmentid,
					};
					getAllProSimInfoList(paraTwo).then((res) => {
						this.psData = ''; //清空上条数据赋的值
						this.psData = res.data.data.records[0];
						console.log(res)
					});
				});

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
			// 查询SIM卡信息
			addDeviceList() {
				this.clearAll(); //打开dialog清空查询框
				this.deviceFormVisible = true;
				this.filters = {
					isdelete: this.filters.isdelete,
					domSearch: this.filters.domSearch, //查询框
				};
				this.getDeciceListInfo();
			},
			//获取SIM信息
			getDeciceListInfo() {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					// 搜索设置部分
					domSearch: this.filters.domSearch, //查询框
					ispack: 0,
					isdelete: 0,
					storageid: this.psData.storageid,
					prodcategory: 'C',
					status: 'INSTO'
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
				this.createname = "";
				this.updatename = "";
				this.moreData = data;
				this.formDialogTableVisible = true;
				this.fdtLoading = true;
				let para = {
					prodID: prodid,
				}
				nanobar.go(70);
				this.editLoading = true;
				//获取当前设备、SIM卡信息
				getAllProSimInfoList(para).then((res) => {
					this.psData = ''; //清空上条数据赋的值
					if(res.data.data.records.length == 0) {
						this.$message({
							message: '该设备暂未绑定SIM卡！',
							type: 'warning'
						});
					} else {
						this.psData = res.data.data.records[0];
					}

					let paraThree = {
						createby: this.moreData.createby == null ? 0 : this.moreData.createby,
						updateby: this.moreData.updateby == null ? 0 : this.moreData.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
						let paraTwo = {
							PRODID: prodid,
						}
						// 获取设备绑定车辆信息
						getProductOwnerList(paraTwo).then((res) => {
							this.vehInfo = ''; //清空上条数据赋的值
							if(res.data.data.records.length != 0) {
								this.vehInfo = res.data.data.records[0];
							}
							nanobar.go(100);
							this.fdtLoading = false;
							this.editLoading = false;
						});
					});
				});
			},
			// 有效 鼠标移入
			mouseoverChange(e) {
				if($(e.target).hasClass('icon-duigou')) {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				} else {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				}
			},
			// 有效 鼠标移除
			mouseoutChange(e) {
				if($(e.target).hasClass('icon-cha')) {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				} else {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				}
			},

			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.handleQuery();
			},
			//设备状态显示转换
			statusFormat: function(row, col) {
				return row.status == 'INSTO' ? '在库' : row.status == 'INSTALL' ? '已安装' : row.status == 'LOST' ? '报失' : row.status == 'REPAIR' ? '维修' : row.status == 'DAMAGE' ? '报废' : row.status == 'ONWAY' ? '在途' : row.status == 'REMOVING' ? '拆除中'  : row.status == 'RETROFIT' ? '返厂' : row.status == 'BREAKGE' ? '报损' : row.status == 'DIRECTOUT' ? '直接出库' : '';
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
			// 有效按钮切换状态
			handleChange: function(index, row) {
				this.$confirm('确认设置该条记录的状态吗？', '提示', {
					type: 'warning'
				}).then(() => {
					if(row.status == 'INSTALL') { //该设备是已安装状态
						this.$message({
							message: '该设备已安装，无法修改状态！如需修改请先解绑！',
							type: 'warning'
						});
					} else { //该设备不是已安装状态时
						let para = {
							id: row.id,
							isdelete: row.isdelete == 0 ? 1 : 0,
						}
						modifyProductInfo(para).then((res) => {
							this.$message({
								message: '设置成功',
								type: 'success'
							});
							row.isdelete = para.isdelete;
						}).catch(() => {
							this.listLoading = false;
						});
					}
				});
			},
			/*设备型号——下拉*/
			moNameChange(r) {
				if(!r || this.moNamelist.length > 0) return;
				this.moNameLoading = true;
				getMoNameList().then((res) => {
					this.moNamelist = res.data.data.records;
					this.moNameLoading = false;
				});
			},
			//新增—— 设备型号选中时自动获取设备分类
			getNameAdd() {
				for(var i = 0; i < this.moNamelist.length; i++) {
					if(this.moNamelist[i].id == this.addForm.productmodelname) {
						this.addForm.prodspec = this.moNamelist[i].prodspec;
						this.addForm.prodcategory = this.moNamelist[i].prodcategory;
					}
				}
			},
			//编辑—— 设备型号选中时自动获取设备分类
			getNameEdit() {
				for(var i = 0; i < this.moNamelist.length; i++) {
					if(this.moNamelist[i].id == this.editForm.productmodelname) {
						this.editForm.prodspec = this.moNamelist[i].prodspec;
						this.editForm.prodcategory = this.moNamelist[i].prodcategory;
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
			/*库房名称——搜索下拉*/
			stoChangeSelect(query) {
				let para = {
					showCount: 30,
					storagename: query,
				}
				this.stoNameLoading = true;
				getStoNameList(para).then((res) => {
					this.stoNamelist = res.data.data.records;
					this.stoNameLoading = false;
				});
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
			// 显示关联的SIM卡信息
			//            showRelateproductinfoTableData(id){
			//                let para = {
			//                    id:id,
			//                }
			//                //获取SIM信息
			// getSIMInfoList(para).then((res) => {
			//     this.psData = res.data.data.records;
			// });
			//            },
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
				};
				this.listLoading = true;
				//获取设备
				getProductInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
					//NProgress.done();
				}).catch((error) => {
					this.listLoading = false;
				});
			},

			//删除
			handleDel(index, row) {
				this.$confirm(' 确认删除选中记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeProductInfo(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuerySelect();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.formDetailHandle(row.id, row); //调用详情，获取车辆信息
				this.formDialogTableVisible = false; //详情页面不显示

				this.editFormVisible = true;
				this.editForm = {
					id: row.id,
					prodnum: row.prodnum,
					prodspec: row.prodspec,
					prodcategory: row.prodcategory,
					productmodelname: row.productmodelname,
					storagename: row.storagename,
					status: row.status,
					suppliername: row.suppliername,
					protocoltype: row.protocoltype,
					dictdatavalue: row.dictdatavalue,
					ispack: parseInt(row.ispack),
					isold: parseInt(row.isold),
					expiredate: row.expiredate,
					remark: row.remark,
					isdelete: parseInt(row.isdelete),
				}
				this.editFormId = {
					prodmodelid: row.prodmodelid,
					storageid: row.storageid,
					productmodelname: row.productmodelname,
					storagename: row.storagename
				}
				this.thisInput = this.editForm.prodnum; //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					// act_id:'',
					// act_status:'',
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
					isdelete: 0,
				};
			},
			//编辑
			editSubmit() {
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							prodnum: this.editForm.prodnum,
							// prodspec:this.editForm.prodspec,
							productmodelname: this.editForm.productmodelname,
							storagename: this.editForm.storagename,
							status: this.editForm.status,
							suppliername: this.editForm.suppliername,
							protocoltype: this.editForm.protocoltype,
							dictdatavalue: this.editForm.dictdatavalue,
							ispack: parseInt(this.editForm.ispack),
							isold: parseInt(this.editForm.isold),
							expiredate: this.editForm.expiredate,
							remark: this.editForm.remark,
							isdelete: parseInt(this.editForm.isdelete),
							prodcategory: this.editForm.prodcategory
						}
						if(this.vehInfo.length != 0) { //该设备已有绑定车辆
							if(para.status == 'INSTO' || para.status == 'ONWAY') {
								this.$message({
									message: '该设备已绑定车辆，无法修改状态！如需修改请先解绑！',
									type: 'warning'
								});
								this.editLoading = false; //提交按钮不加载
								return; //终止执行
							}
						} else { //该设备未绑定车辆
							console.log('无绑定车辆')
						}
						if(this.editFormId.productmodelname == this.editForm.productmodelname) {
							para.prodmodelid = this.editFormId.prodmodelid;
						} else {
							para.prodmodelid = this.editForm.productmodelname;
						}
						if(this.editFormId.storagename == this.editForm.storagename) {
							para.storageid = this.editFormId.storageid;
						} else {
							para.storageid = this.editForm.storagename;
						}

						if(this.checkoutDataT) { //验证通过时(无重复时)
							modifyProductInfo(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							});
						} else {
							this.editLoading = false;
							this.$message({
								message: '标红信息已存在！',
								type: 'warning'
							});
						}
					}
				});
			},
			//新增
			addSubmit() {
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						//NProgress.start();
						// let para = Object.assign({}, this.addForm);
						let para = {
							prodnum: this.addForm.prodnum,
							prodspec: this.addForm.prodspec,
							prodcategory: this.addForm.prodcategory,
							productmodelname: this.addForm.productmodelname,
							storagename: this.addForm.storagename,
							status: this.addForm.status,
							suppliername: this.addForm.suppliername,
							protocoltype: this.addForm.protocoltype,
							dictdatavalue: this.addForm.dictdatavalue,
							ispack: parseInt(this.addForm.ispack),
							isold: parseInt(this.addForm.isold),
							expiredate: this.addForm.expiredate,
							remark: this.addForm.remark,
							isdelete: parseInt(this.addForm.isdelete),
							prodmodelid: this.addForm.productmodelname,
							storageid: this.addForm.storagename,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addProductInfo(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
								console.log(para);
							});
						} else {
							this.addLoading = false;
							this.$message({
								message: '标红信息已存在！',
								type: 'warning'
							});
						}

					}
				});
			},

			//批量删除
			batchRemove() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {
						ids: ids,
						method: "delete"
					};
					removeProductInfo(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			}
		},
		activated() {
			this.handleQuery();
		}

	}
</script>