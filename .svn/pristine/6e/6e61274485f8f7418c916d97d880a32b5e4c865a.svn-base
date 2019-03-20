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
									<el-option label="车牌号" value="licenseplatenum"></el-option>
									<el-option label="车牌颜色" value=""></el-option>
									<el-option label="车架号" value="vin"></el-option>
									<el-option label="车主" value="name"></el-option>
									<el-option label="所属客户" value="corpname"></el-option>
									<el-option label="车型" value="model"></el-option>
									<el-option label="车价(元)" value="price"></el-option>
									<el-option label="用途" value="vehicleuse"></el-option>
									<el-option label="分类" value="vehiclecategory"></el-option>
									<el-option label="车牌颜色" value="licenseplatecolor"></el-option>
									<el-option label="设备数量" value="productsNum"></el-option>
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
										<el-option label="车牌号" value="licenseplatenum"></el-option>
										<el-option label="车牌颜色" value=""></el-option>
										<el-option label="车架号" value="vin"></el-option>
										<el-option label="车主" value="name"></el-option>
										<el-option label="所属客户" value="corpname"></el-option>
										<el-option label="车型" value="model"></el-option>
										<el-option label="车价(元)" value="price"></el-option>
										<el-option label="用途" value="vehicleuse"></el-option>
										<el-option label="分类" value="vehiclecategory"></el-option>
										<el-option label="车牌颜色" value="licenseplatecolor"></el-option>
										<el-option label="设备数量" value="productsNum"></el-option>
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
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="0" active-text="有效" inactive-value="1" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
				<el-form-item style="float:right;">
					<el-button type="primary" @click="vehIn" icon="el-icon-circle-check">车辆登记</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="licenseplatenum" label="车牌号" align="center" width="160" >
			</el-table-column>
			<el-table-column prop="" label="车牌颜色" align="center">
			</el-table-column>
			<el-table-column prop="vin" label="车架号" align="center" >
			</el-table-column>
			<el-table-column prop="corpname" label="所属客户" align="center" >
			</el-table-column>
			<el-table-column prop="model" label="车型" align="center" >
			</el-table-column>
			<el-table-column prop="price" label="车价(元)" width="100" align="center" >
			</el-table-column>
			<el-table-column prop="vehicleuse" label="用途" :formatter="useFormats" width="80" align="center" >
			</el-table-column>
			<el-table-column prop="vehiclecategory" label="分类" :formatter="catFormats" width="80" align="center" >
			</el-table-column>
			<el-table-column prop="licenseplatecolor" label="车牌颜色" width="80" align="center" >
			</el-table-column>
			<el-table-column prop="productsNum" label="设备数量" width="90" align="center" >
				<template scope="scope">
					<el-popover ref="popover4" width="800" @show="productsData(scope.row.ID)" trigger="click">
						<el-table border :data="productsdatas">
							<el-table-column type="index" width="20" align="center" label="#"></el-table-column>
							<el-table-column prop="prodnum" label="设备编号" align="center"></el-table-column>
							<el-table-column prop="prodmodel" label="设备型号" align="center"></el-table-column>
							<el-table-column prop="prodspec" label="设备类别" align="center"></el-table-column>
							<el-table-column prop="simnum" label="通讯号" align="center"></el-table-column>
							<el-table-column prop="storagename" label="库房" width="80" align="center"></el-table-column>
							<el-table-column prop="status" label="状态" :formatter="statusFormats" width="60" align="center"></el-table-column>
						</el-table>
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover4>
						<span class="comnum">{{scope.row.productsNum}}</span>
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="" label="车辆分组" align="center">
				<template scope="scope">
					<el-tag type="success" class="ml10" v-for="(item,index) in scope.row.corporatelevels">{{ item.tagname }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ownerid,scope.row.vin,scope.row.ID)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
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
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd>{{ oneInfo.licenseplatenum == undefined ? '暂无' : oneInfo.licenseplatenum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd>{{ oneInfo.vin }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属客户:</dt>
							<dd>{{ oneInfo.corpname == undefined ? '暂无' : oneInfo.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车型:</dt>
							<dd>{{ oneInfo.model }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车价(元):</dt>
							<dd>{{ oneInfo.price }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>用途:</dt>
							<dd>{{ oneInfo.vehicleuse == 1 ? '乘用车' : oneInfo.vehicleuse == 2 ? '商用车' : oneInfo.vehicleuse == undefined ? '暂无' : '' }}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>分类:</dt>
							<dd>{{ oneInfo.vehiclecategory == 1 ? '新车' : oneInfo.vehiclecategory == 2 ? '二手车' : oneInfo.vehiclecategory == 3 ? '资管追回' : oneInfo.vehiclecategory == undefined ? '暂无' : '' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车类型:</dt>
							<dd>{{ oneInfo.typedesc == undefined ? '暂无' : oneInfo.typedesc }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌颜色:</dt>
							<dd>{{ oneInfo.licenseplatecolor == undefined ? '暂无' : oneInfo.licenseplatecolor }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车颜色:</dt>
							<dd>{{ oneInfo.colorname == undefined ? '暂无' : oneInfo.colorname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发动机号:</dt>
							<dd>{{ oneInfo.enginenum == undefined ? '暂无' : oneInfo.enginenum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备数量:</dt>
							<dd>{{ oneInfo.productsNum }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>受理银行:</dt>
							<dd>{{ oneInfo.bankname == undefined ? '暂无' : oneInfo.bankname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>初始登记日期:</dt>
							<dd>{{ oneInfo.firstregisterdate == null ? "暂无" :fmtdata.formatDate.format(new Date(oneInfo.firstregisterdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>贷款到期日:</dt>
							<dd>{{ oneInfo.loanenddate == null ? "暂无" :fmtdata.formatDate.format(new Date(oneInfo.loanenddate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>服务期限(年):</dt>
							<dd>{{ oneInfo.yearsofservice == undefined ? '暂无' : oneInfo.yearsofservice }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>是否有盗抢险:</dt>
							<dd>{{ oneInfo.hastheftinsurance == 1 ? '是' : oneInfo.hastheftinsurance == 0 ? '否' : '' }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{ createname == undefined ? '暂无' : createname }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{oneInfo.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(oneInfo.createdate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{oneInfo.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(oneInfo.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="ownerInfo != ''">
					<el-col :span="24">
						<span class="formTile">车主信息</span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车主:</dt>
							<dd>{{ ownerInfo.name }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>性别:</dt>
							<dd>{{ ownerInfo.gender == 'M' ? '男' : ownerInfo.gender == 'F' ? '女' : '暂无' }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>身份证:</dt>
							<dd>{{ ownerInfo.idcard == undefined ? '暂无' : ownerInfo.idcard }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>手机:</dt>
							<dd>{{ ownerInfo.mobile == undefined ? '暂无' : ownerInfo.mobile }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ ownerInfo.addressHome == undefined ? '暂无' : ownerInfo.addressHome }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="130px" :rules="editFormRules" ref="editForm">
				<el-collapse v-model="activeNamesVeh" class="mt20">
					<el-collapse-item title="车辆信息" name="0">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="车牌号" prop="licenseplatenum" ref="licenseplatenum">
									<el-input v-model="editForm.licenseplatenum" auto-complete="off" @blur="checkout('licenseplatenum',editForm.licenseplatenum,0)"></el-input>
								</el-form-item>
								<el-form-item label="车架号" prop="vin" ref="vin">
									<el-input v-model="editForm.vin" auto-complete="off" @blur="checkout('vin',editForm.vin,1)"></el-input>
								</el-form-item>
								<el-form-item label="车价(元)" prop="price">
									<el-input v-model="editForm.price" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="车型" prop="model">
									<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="editForm.model" :fetch-suggestions="handleItemChange" custom-item="my-item-zh-model" placeholder="请选择车型信息" @select="handleSelectModel"></el-autocomplete>
								</el-form-item>
								<el-form-item label="颜色" prop="colorname">
									<div style="display:flex;">
										<el-select v-model="editForm.colorname || editForm.color" clearable @change="changeCarColor" style="flex:1;" placeholder="请选择车辆颜色">
											<el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item">
												<p>
													<div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',margin:'8px 5px 0 0'}"></div>{{ item.color }}</p>
											</el-option>
										</el-select>
										<el-color-picker style="width:60px;flex:0 0 60px;" v-model="editForm.color"></el-color-picker>
									</div>
								</el-form-item>
								<el-form-item label="车主" prop="name">
									<el-autocomplete class="inline-input searchInput" v-model="editForm.name" :fetch-suggestions="querySearchName" placeholder="请输入车主姓名" :trigger-on-focus="false" @select="handleSelectName" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="用途" prop="vehicleuse">
									<el-radio-group size="small" v-model="editForm.vehicleuse">
										<el-radio-button label="1">乘用车</el-radio-button>
										<el-radio-button label="2">商用车</el-radio-button>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="分类" prop="vehiclecategory">
									<el-radio-group size="small" v-model="editForm.vehiclecategory">
										<el-radio-button label="1">新车</el-radio-button>
										<el-radio-button label="2">二手车</el-radio-button>
										<el-radio-button label="3">资管追回</el-radio-button>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="发动机号" prop="enginenum">
									<el-input v-model="editForm.enginenum" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车类型" prop="vehicletype">
									<el-select v-model="editForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" filterable placeholder="请选择车类型" clearable value-key="typedesc">
										<el-option v-for="item in vehlist" :key="item.typedesc" :label="item.typedesc" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属客户" prop="corpname">
									<el-select v-model="editForm.corpname" @visible-change="corpChange" value-key="corpname" @change="corpChangeLse" remote :remote-method="corpChangeSelect" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable>
										<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="受理银行" prop="bankname">
									<el-select v-model="editForm.bankname" @visible-change="corpChangeTwo" remote :remote-method="corpChangeTwoSelect" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
										<el-option v-for="item in corptwolist" :key="item.corpname" :label="item.corpname" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<!-- <el-form-item label="车牌颜色" prop="licenseplatecolor">
									<el-radio-group size="small" v-model="editForm.licenseplatecolor">
										<el-radio-button label="蓝底白字">蓝底白字</el-radio-button>
										<el-radio-button label="黄底黑字">黄底黑字</el-radio-button>
										<el-radio-button label="黑底白字">黑底白字</el-radio-button>
										<el-radio-button label="白底黑字">白底黑字</el-radio-button>
									</el-radio-group>
								</el-form-item> -->
								<el-form-item label="是否有盗抢险" prop="hastheftinsurance">
									<el-switch v-model="editForm.hastheftinsurance" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有" inactive-value="0" inactive-text="无">
									</el-switch>
								</el-form-item>
								<div v-show="editForm.hastheftinsurance == '1'">
									<el-form-item label="服务期限(年)" prop="yearsofservice">
										<el-input v-model="editForm.yearsofservice" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="初始登记日期" prop="firstregisterdate">
										<el-date-picker v-model="editForm.firstregisterdate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="贷款到期日" prop="loanenddate">
										<el-date-picker v-model="editForm.loanenddate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
										</el-date-picker>
									</el-form-item>
								</div>
								<el-form-item label="设备数量" prop="productsNum">
									<el-input v-model="editForm.productsNum" disabled auto-complete="off"></el-input>
								</el-form-item>
								
							</el-col>
							<el-col :span="24">
								<el-form-item label="车辆分组">
									<el-cascader 
									:options="tagOptions" 
									change-on-select
									filterable
									class="tagClassLevl"
									placeholder="请选择标签"
									clearable
									separator='-'
									@change="handleItemChangeLevel" 
									v-model="tagList"
									v-loading="isLevelLoading"
								    element-loading-spinner="el-icon-loading"
								    element-loading-background="rgba(0, 0, 0, 0.6)"
									:props="propsTag">
									</el-cascader>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<div style="margin-left:120px;">
									<template v-for="(item,index) in tagListName">
										<el-tag type="success" >{{ item.tagname }}</el-tag>
										<span class="mlr51" v-if="index != tagListName.length-1">-</span>
									</template>
									
								</div>
							</el-col>
						</el-row>
					</el-collapse-item>
					<!-- 车辆绑定设备信息 -->
					<el-collapse-item title="绑定设备信息" name="1">
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item id="nomargin">
									<el-table :data="productsdatas" empty-text="暂未绑定设备" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="250">
										<el-table-column prop="prodnum" label="设备编号" align="center">
										</el-table-column>
										<el-table-column prop="prodmodel" label="设备型号" align="center">
										</el-table-column>
										<el-table-column prop="prodspec" label="设备类别" align="center">
										</el-table-column>
										<el-table-column prop="simnum" label="通讯号" align="center">
										</el-table-column>
										<el-table-column prop="storagename" label="库房" width="80" align="center">
										</el-table-column>
										<el-table-column prop="status" label="状态" :formatter="statusFormats" width="60" align="center">
										</el-table-column>
										<el-table-column label="操作" width="80" align="center">
											<template scope="scope">
												<el-button type="danger" size="small" class="mt5" @click.native.stop="cancel(scope.$index,productsdatas)" icon="el-icon-share">解绑</el-button>
											</template>
										</el-table-column>
									</el-table>
									<el-button type="primary" @click.native="addDeviceList" icon="el-icon-plus" style="margin-top:10px;">绑定设备</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
				</el-collapse>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="130px" :rules="addFormRules" ref="addForm">
				<el-collapse v-model="activeNamesVeh" class="mt20">
					<el-collapse-item title="车辆信息" name="0">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="车牌号" prop="licenseplatenum" ref="licenseplatenum">
									<el-input v-model="addForm.licenseplatenum" auto-complete="off" @blur="checkout('licenseplatenum',addForm.licenseplatenum,0)"></el-input>
								</el-form-item>
								<el-form-item label="车架号" prop="vin" ref="vin">
									<el-input v-model="addForm.vin" auto-complete="off" @blur="checkout('vin',addForm.vin,1)"></el-input>
								</el-form-item>
								<el-form-item label="车价(元)" prop="price">
									<el-input v-model="addForm.price" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="车型" prop="model">
									<el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="addForm.model" :fetch-suggestions="handleItemChange" custom-item="my-item-zh-model" placeholder="请选择车型信息" @select="handleSelectModel"></el-autocomplete>
								</el-form-item>
								<el-form-item label="颜色" prop="colorname">
									<div style="display:flex;">
										<el-select v-model="addForm.colorname || addForm.color" clearable @change="changeCarColor" style="flex:1;" placeholder="请选择车辆颜色">
											<el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item">
												<p>
													<div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',margin:'8px 5px 0 0'}"></div>{{ item.color }}</p>
											</el-option>
										</el-select>
										<el-color-picker style="width:60px;flex:0 0 60px;" v-model="addForm.color"></el-color-picker>
									</div>
								</el-form-item>
								<el-form-item label="车主" prop="name">
									<el-autocomplete class="inline-input searchInput" v-model="addForm.name" :fetch-suggestions="querySearchName" placeholder="请输入车主姓名" :trigger-on-focus="false" @select="handleSelectName" clearable></el-autocomplete>
								</el-form-item>
								<el-form-item label="用途" prop="vehicleuse">
									<el-radio-group size="small" v-model="addForm.vehicleuse">
										<el-radio-button label="1">乘用车</el-radio-button>
										<el-radio-button label="2">商用车</el-radio-button>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="分类" prop="vehiclecategory">
									<el-radio-group size="small" v-model="addForm.vehiclecategory">
										<el-radio-button label="1">新车</el-radio-button>
										<el-radio-button label="2">二手车</el-radio-button>
										<el-radio-button label="3">资管追回</el-radio-button>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="发动机号" prop="enginenum">
									<el-input v-model="addForm.enginenum" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="车类型" prop="vehicletype">
									<el-select v-model="addForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" filterable placeholder="请选择车类型" clearable value-key="typedesc">
										<el-option v-for="item in vehlist" :key="item.typedesc" :label="item.typedesc" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属客户" prop="corpname">
									<el-select v-model="addForm.corpname" @visible-change="corpChange" remote :remote-method="corpChangeSelect" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable>
										<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="受理银行" prop="bankname">
									<el-select v-model="addForm.bankname" @visible-change="corpChangeTwo" remote :remote-method="corpChangeTwoSelect" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
										<el-option v-for="item in corptwolist" :key="item.corpname" :label="item.corpname" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<!-- <el-form-item label="车牌颜色" prop="licenseplatecolor">
									<el-radio-group size="small" v-model="addForm.licenseplatecolor">
										<el-radio-button label="蓝底白字">蓝底白字</el-radio-button>
										<el-radio-button label="黄底黑字">黄底黑字</el-radio-button>
										<el-radio-button label="黑底白字">黑底白字</el-radio-button>
										<el-radio-button label="白底黑字">白底黑字</el-radio-button>
									</el-radio-group>
								</el-form-item> -->
								<el-form-item label="是否有盗抢险" prop="hastheftinsurance">
									<el-switch v-model="addForm.hastheftinsurance" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有" inactive-value="0" inactive-text="无">
									</el-switch>
								</el-form-item>
								<div v-show="addForm.hastheftinsurance == '1'">
									<el-form-item label="服务期限(年)" prop="yearsofservice">
										<el-input v-model="addForm.yearsofservice" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="初始登记日期" prop="firstregisterdate">
										<el-date-picker v-model="addForm.firstregisterdate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="贷款到期日" prop="loanenddate">
										<el-date-picker v-model="addForm.loanenddate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
										</el-date-picker>
									</el-form-item>
								</div>
							</el-col>
							<!-- <el-col :span="24">
								<el-form-item label="标签添加">
									<el-cascader :options="tagOptions" change-on-select></el-cascader>
								</el-form-item>
							</el-col> -->
						</el-row>
					</el-collapse-item>
					<!-- 车辆绑定设备信息 -->
					<el-collapse-item title="绑定设备信息" name="1">
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item id="nomargin">
									<el-table :data="productsdatas" empty-text="暂无绑定设备" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="250">
										<el-table-column prop="prodnum" label="设备编号" align="center">
										</el-table-column>
										<el-table-column prop="prodmodel" label="设备型号" align="center">
										</el-table-column>
										<el-table-column prop="prodspec" label="设备类别" align="center">
										</el-table-column>
										<el-table-column prop="simnum" label="通讯号" align="center">
										</el-table-column>
										<el-table-column prop="storagename" label="库房" width="80" align="center">
										</el-table-column>
										<el-table-column prop="status" label="状态" :formatter="statusFormats" width="60" align="center">
										</el-table-column>
										<el-table-column label="操作" width="80" align="center">
											<template scope="scope">
												<el-button type="danger" size="small" icon="el-icon-delete" class="mt5" @click.native="deleteRow(scope.$index,productsdatas)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
									<el-button type="primary" @click.native="addDeviceList" icon="el-icon-plus" style="margin-top:10px;">添加绑定设备</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>
				</el-collapse>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--设备列表选择界面-->
		<el-dialog title="设备信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" :close-on-click-modal="false" @close="clearAllThis()">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="设备编号" value="prodnum"></el-option>
										<el-option label="设备型号" value="prodmodel"></el-option>
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
											<el-option label="设备型号" value="prodmodel"></el-option>
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
			<!--选择设备列表-->
			<el-table border :data="deviceListData" :row-class-name="tableRowClassName" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @select="selsChange" style="width: 100%;">
				<el-table-column type="selection" fixed="left" width="50" align="center">
				</el-table-column>
				<el-table-column prop="prodnum" label="设备编号" align="center">
				</el-table-column>
				<el-table-column prop="prodmodel" label="设备型号" align="center">
				</el-table-column>
				<el-table-column prop="prodspec" label="设备类别" width="70" align="center">
				</el-table-column>
				<el-table-column prop="simnum" label="通讯号" align="center">
				</el-table-column>
				<el-table-column prop="storagename" label="库房" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" :formatter="statusFormat" width="60" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-button type="primary" class="mt5" @click="choseEvent" :loading="comfirLoading" :disabled="this.sels.length===0">确认绑定</el-button>
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80, 100]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>

		<!-- 解绑选择库房 -->
		<el-dialog title="选择库房" :modal-append-to-body="false" :visible.sync="deviceFormVisibleSto" top="30%" :close-on-click-modal="false" width="40%">
			<el-form :model="stoForm" label-width="100px">
				<el-form-item label="库房名称" prop="storagename">
					<el-select v-model="stoForm.storagename" @visible-change="stoNameChangeCancel" :loading="stoNameLoadingCancel" filterable placeholder="请选择库房名称" clearable remote :remote-method="stoChangeSelect">
						<el-option v-for="item in stoNamelistCancel" :key="item.storagename" :label="item.storagename" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
    <el-button @click="deviceFormVisibleSto = false">取 消</el-button>
    <el-button type="primary" @click="confirmCancel">确 定</el-button>
</span>
		</el-dialog>
	</section>
</template>

<style type="text/css" media="screen">
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
	
	#nomargin .el-form-item__content {
		margin: 0 !important;
	}
</style>

<script>
	import util from '../../common/js/util'
	import nanobar from '../../common/js/nanobar';
	import { getVehicleInfoList, addVehicleInfo, modifyVehicleInfo, removeVehicleInfo, getCustomerInfoList, getVehList, addNewOwner, getOwnerInfoList, getCorpList, getProductsInfoListOfVehicle, getOwnerIDList, getSelectList, getSelectListVeh, getVehicleProd, bandVehicleProd, unBandVehicleProd, getStoNameList, getModelListInfo, getModelListInfo1, getCheckoutOfVehicleInfo, getNamebyUserid, selectedType,getCorporatelevel_level,searchCorpNameList,getCorpNameList } from '../../api/api';

	export default {
		name:'VehicleInfo',
		props: ['windowOutHeight'],
		data() {
			//验证车架号(只能输入数字和字母)
			var checkVin = (rule, value, callback) => {
				var reg = /^[0-9a-zA-Z]*$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('车架号必须为数字和字母组成'));
				} else {
					callback();
				}
			};
			//验证车价(只能输入数字)
			var checkPrice = (rule, value, callback) => {
				var reg = /^\d+(\.\d{1,2})?$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('车价必须为数字,小数最多保留两位'));
				} else {
					callback();
				}
			};

			return {
				filters: {
					domSearch: [{
						select: ["vin"],
						content: ''
					}], //查询框
					isdelete: '0'
				},
				fmtdata: util,
				pickerOptions0: { //贷款到期日
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				carModelList: [], //车型信息
				props: { //显示车型
					value: 'value',
					label: 'label',
					children: 'children'
				},
				modelArr: [], //车型数组
				vehData: [], //当前车辆绑定的设备信息
				vehClickData: [], //点击的设备信息
				visible: false, //车辆信息显示
				pickerOptions: { //车辆初始登记日期
				},
				listData: [],
				activeNamesVeh: ['0', '1'],
				oneInfo: [], //车辆其他关联数据
				ownerInfo: [], //车主相关信息
				formDialogTableVisible: false, //是否显示订单详情弹出
				listDataOwner: [],
				customers: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				vehlist: [], //车类型列表
				vehLoading: false, //车类型
				namelist: [], //车主姓名列表
				nameLoading: false, //车主姓名
				corplist: [], //所属客户
				corpLoading: false, //
				corptwolist: [], //受理银行
				corptwoLoading: false, //
				prodDataID: [], //新增——已选绑定设备的id列表
				sels: [], //列表选中列
				deviceListData: [], //设备列表
				productsdatas: [], //当前详情车主所持的车辆信息
				vehicleidList: '', //当前行的车辆id
				packinfolist: [], //多选时选择的组
				carColor: [],
				dtotal: 0,
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				dcurrentPage: 1,
				dpageSize: 15,
				deviceFormVisible: false,
				devicelistLoading: false,
				stoNamelistCancel: [], //解绑时库房名称列表
				stoNameLoadingCancel: false, //解绑时库房名称
				deviceFormVisibleSto: false, //解绑时库房列表
				dialogVisible: false, //解绑时库房
				checkData: [], //选择绑定check
				thisInput: [], //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				createname: "",
				updatename: "",
				comfirLoading: false,
				isLevelLoading:false,
				editFormRules: {
					name: [{
						required: true,
						message: "请输入车主姓名",
						trigger: 'blur'
					}],
					vin: [{
							required: true,
							message: "请输入车架号",
							trigger: 'blur'
						},
						{
							validator: checkVin,
							trigger: 'blur'
						}
					],
					price: [{
							required: true,
							message: "请输入车价",
							trigger: 'blur'
						},
						{
							validator: checkPrice,
							trigger: 'blur'
						}
					],
					licenseplatenum: [{
						required: true,
						message: "请输入车牌号",
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'change'
					}],
					vehicletype: [{
						required: true,
						message: "请选择车类型",
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: "请选择所属客户",
						trigger: 'blur'
					}],
				},
				tagOptions: [],
				tagList:[],
				propsTag: {
					value: 'id',
		            label:'tagname',
		            children:'children'
		        },
				//编辑界面数据
				editForm: {
					id: '',
					licenseplatenum: '',
					vin: '',
					enginenum: '',
					name: '',
					price: '',
					model: '',
					color: '',
					colorname: '',
					corpid:'',
					firstregisterdate: '',
					corpname: '',
					bankname: '',
					hastheftinsurance: '',
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					productsNum: '',
					editDetails: [],
					vehicleuse: '',
					vehiclecategory: '',
					vehicletype: '',
					platecolorid:'',
					licenseplatecolor:'',
				},
				editFormId: {
					ownerid: '',
					name: '',
					corpid: '',
					corpname: '',
					bankname: '',
					receivingbankid: '',
				},
				tempdata:[],
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
						required: true,
						message: "请输入车主姓名",
						trigger: 'blur'
					}],
					vin: [{
							required: true,
							message: "请输入车架号",
							trigger: 'blur'
						},
						{
							validator: checkVin,
							trigger: 'blur'
						}
					],
					price: [{
							required: true,
							message: "请输入车价",
							trigger: 'blur'
						},
						{
							validator: checkPrice,
							trigger: 'blur'
						}
					],
					licenseplatenum: [{
						required: true,
						message: "请输入车牌号",
						trigger: 'blur'
					}],
					// model:[{required:true,message:"请输入车型",trigger: 'blur'}],
					vehicletype: [{
						required: true,
						message: "请选择车类型",
						trigger: 'blur'
					}],
					corpname: [{
						required: true,
						message: "请选择所属客户",
						trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'change'
					}],
				},
				tempModel: '',
				//新增界面数据
				addForm: {
					licenseplatenum: '',
					vin: '',
					enginenum: '',
					name: '',
					price: '',
					model: '',
					color: '',
					colorname: '',
					firstregisterdate: '',
					vehicletype: '',
					corpname: '',
					bankname: '',
					hastheftinsurance: '0',
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					ownerid: '',
					isdelete: 0,
					productsNum: '',
					vehicleuse: '',
					vehiclecategory: '',
					licenseplatecolor: '',
				},
				tempIndex:[],
				cjIndex:0,
				stoForm: {
					storagename: '',
					storageid: '',
				},
				rows: '', //移除当前行
				index: '',
				curCorpid:'',
				tagListName:[],
			}
		},
		methods: { 
			corpChangeLse(v){
				this.curCorpid = v.id;
				v.corpid = v.id;
				this.editForm.corpid = v.id;
				this.tagListName = [];
				this.inItCorporatelevel(v);
			},
			// 新增客户跳转
			vehIn() {
				this.$router.push('/vehicleRegistration');
			},
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput[index] == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfVehicleInfo(paras).then((res) => {
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
			// 引入车型车系表
			initModelBrand() {
				let para = {
					_viewName: "VW_VAS_WEB_VAS_VEHICLE_BRAND",
					showCount: 1000
				};
				getModelListInfo(para).then((res) => {
					res.data.data.records.forEach((res, index) => {
						this.carModelList.push({
							label: res.brand,
							value: {
								type: 'brand',
								value: res.brand,
								paraentIndex: 0,
								index: index
							},
							children: []
						});
					});
				});
			},
			//选择车辆颜色
			changeCarColor(v) {
				if(typeof v != "object") return;
				if(this.editFormVisible) {
					this.editForm.colorname = v.color; //存colorname汉字
					this.editForm.color = v.color_rgb; //存color码
				}
				if(this.addFormVisible) {
					this.addForm.colorname = v.color; //存colorname汉字
					this.addForm.color = v.color_rgb; //存color码
				}
			},
			//选择车型查询颜色
			handleSelectModel(v) {
				this.tempModel = v.value;
				this.editForm.model = v.value;
				this.editForm.color = '';
				this.addForm.model = v.value;
				this.addForm.color = '';
				let para = {
					_viewName: "VW_VAS_WEB_VAS_VEHICLE_COLOR",
					showCount: 1000,
					brand: v.brand,
					serious: v.serious,
					model: v.value
				};
				getModelListInfo(para).then((res) => {
					let carModelList = [];
					res.data.data.records.forEach((res, index) => {
						if(res.color) {
							res.color.split(";").forEach((color, index) => {
								carModelList.push({
									color: color,
									color_rgb: res.color_rgb.split(";")[index]
								});
							});
						}
					});
					this.carColor = carModelList;

					if(v.subSeriesId != null && v.letter != null) {

						let pram = {
							"subseriesid": v.subSeriesId,
							"letter": v.letter

						}

						selectedType(pram);
					}

				});

			},
			//车型选择
			handleItemChange(queryString, cb) {
				let para = {
						_viewName: "VW_VAS_WEB_VAS_VEHICLE_MODEL",
						showCount: 10000,
						model: queryString
					},
					ownerArray = [];
				getModelListInfo1(para).then((res) => {
					if(res.data.data != null) {
						res.data.data.records.forEach(function(item, index) {
							ownerArray.push({
								value: item.model,
								brand: item.brand,
								serious: item.serious,
								subSeriesId: item.subSeriesId,
								letter: item.letter
							});
						});
						cb(ownerArray);
					}
				});
			},

			// 选择绑定列表中 确认绑定按钮事件
			choseEvent() {
				if(this.addFormVisible) { //新增页面时
					this.comlistAdd();
				} else if(this.editFormVisible) { //编辑页面时
					this.comlist();
				}
			},
			// 多选框 选择设备时
			selsChange(sels, row) {
				this.sels = sels;
				this.checkData = row;
				this.packinfolist = this.sels;
			},
			// 新增——绑设备时删除
			deleteRow(index, rows) {
				rows.splice(index, 1); //删除一行
			},
			// 新增——绑设备时确认选择
			comlistAdd() {
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();
				this.productsdatas = this.sels; //已选择存入列表
				// 遍历已选择的设备 存id
				this.productsdatas.forEach((item, index) => {
					this.prodDataID.push({
						packid: item.ID,
						packinfo: {
							storageid: item.storageid,
							equipmentid: item.prodid,
							simcardid: item.simid
						}
					});
				});
			},
			// 选择库房后 确认
			confirmCancel() {
				if(this.stoForm.storagename == '') {
					this.$message({
						message: '请选择库房！',
						type: 'warning'
					});
				} else {
					let para = {
						id: this.rows[this.index].onlickid,
						packid: this.rows[this.index].packid,
						packinfo: {
							equipmentid: this.rows[this.index].prodid,
							simcardid: this.rows[this.index].simcardid,
							storageid: this.stoForm.storagename,
						}
					};
					unBandVehicleProd(para).then((res) => {
						this.deviceFormVisibleSto = false;
						this.rows.splice(this.index, 1); //删除一行
					});
				}
			},
			// 解绑时选择库房
			stoNameChangeCancel(r) {
				if(!r || this.stoNamelistCancel.length > 0) return;
				this.stoNameLoadingCancel = true;
				getStoNameList().then((res) => {
					this.stoNamelistCancel = res.data.data.records;
					this.stoNameLoadingCancel = false;
				});
			},
			stoChangeSelect(query) {
				let para = {
					showCount: 30,
					storagename: query,
				}
				this.stoNameLoadingCancel = true;
				getStoNameList(para).then((res) => {
					this.stoNamelistCancel = res.data.data.records;
					this.stoNameLoadingCancel = false;
				});
			},
			// 编辑——确认解绑
			cancel(index, rows) {
				this.deviceFormVisibleSto = true;
				this.rows = rows; //存行
				this.index = index; //存下标
			},
			// 编辑——确认绑定
			comlist() {
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();
				let para = {
					packid: this.checkData.ID,
					vehicleid: this.vehicleidList,
					packinfos: []
				};
				this.packinfolist.forEach((res, index) => {
					para.packinfos.push({
						ID: res.ID,
						equipmentid: res.prodid,
						simcardid: res.simid,
						storageid: res.storageid,
					});
				})
				this.comfirLoading = true;
				bandVehicleProd(para).then((res) => {
					this.comfirLoading = false;
					if(this.productsdatas.length == 0) {
						// this.productsdatas = this.sels;
						if(res.data.data.records == null) {
							this.productsdatas = []
						} else {
							this.productsdatas = res.data.data.records;
						}
					} else {
						this.productsdatas = [];
						this.productsdatas = this.productsdatas.concat(res.data.data.records); //合并数组 = 之前原有+ 现在选择
					}
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
			// 获取设备信息
			addDeviceList() {
				this.deviceFormVisible = true;
				this.filters.domSearch = [{
					select: ['prodnum'],
					content: ''
				}];
				this.getDeciceListInfo();
			},
			//获取设备信息
			getDeciceListInfo() {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					domSearch: this.filters.domSearch,
					isactive: 1,
					status: 'INSTO'
				};
				this.devicelistLoading = true;
				getVehicleProd(para).then((res) => {
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
			//绑定车辆数统计
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				sums[0] = "总共";
				sums[6] = data.length + "台 设备";
				return sums;
			},
			// 清空当前模糊查询
			clearAllThis() {
				this.filters.domSearch = [{
					select: ['vin'],
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
			// 用途显示转换
			useFormats: function(row, col) {
				return row.vehicleuse == 1 ? '乘用车' : row.vehicleuse == 2 ? '商用车' : '';
			},
			// 分类显示转换
			catFormats: function(row, col) {
				return row.vehiclecategory == 1 ? '新车' : row.vehiclecategory == 2 ? '二手车' : row.vehiclecategory == 3 ? '资管追回' : '';
			},
			//设备状态显示转换
			statusFormats: function(row, col) {
				return row.STATUS || row.status == 'INSTO' ? '在库' : row.STATUS || row.status == 'INSTALL' ? '已安装' : row.STATUS || row.status == 'LOST' ? '报失' : row.STATUS || row.status == 'REPAIR' ? '维修' : row.STATUS || row.status == 'DAMAGE' ? '报废' : row.STATUS || row.status == 'ONWAY' ? '在途' : '';
			},
			//设备状态显示转换
			statusFormat: function(row, col) {
				// 设备已选的默认打钩
				this.productsdatas.forEach((item, index) => {
					if(item.ID == row.ID) {
						this.$refs.deviceListData.toggleRowSelection(row, true);
						return false;
					}
				});
				return row.STATUS || row.status == 'INSTO' ? '在库' : row.STATUS || row.status == 'INSTALL' ? '已安装' : row.STATUS || row.status == 'LOST' ? '报失' : row.STATUS || row.status == 'REPAIR' ? '维修' : row.STATUS || row.status == 'DAMAGE' ? '报废' : row.STATUS || row.status == 'ONWAY' ? '在途' : '';
			},
			//详情查看
			formDetailHandle(ownerid, vin, id) {
				this.formDialogTableVisible = true;
				this.createname = "";
				this.updatename = "";
				let para = {
					id: ownerid,
				}
				if(para.id == undefined) {
					this.ownerInfo = '';
				} else {
					nanobar.go(70);
					//获取车主信息
					getOwnerInfoList(para).then((res) => {
						this.ownerInfo = res.data.data.records[0];
					});
				}
				let vehipara = {
					id: id,
					vin: vin,
				}
				//获取车辆信息
				getVehicleInfoList(vehipara).then((res) => {
					this.oneInfo = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.oneInfo.createby == null ? 0 : this.oneInfo.createby,
						updateby: this.oneInfo.updateby == null ? 0 : this.oneInfo.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
				});
				
			},
			// 根据车辆Id获得设备数量信息
			productsData(vehicleid) {
				let para = {
					vehicleid: vehicleid,
				}
				//获取设备信息
				getProductsInfoListOfVehicle(para).then((res) => {
					this.productsdatas = res.data.data.records;
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
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
			},
			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.handleQuery();
			},
			//有效无效转换
			isdeleteFomat(row, col) {
				return row.isdelete == 1 ? '否' : row.isdelete != undefined ? '是' : '';
			},
			//性别显示转换
			genderFormat: function(row, col) {
				return row.gender == 'M' ? '男' : row.gender == 'F' ? '女' : '';
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
					let para = {
						id: row.ID,
						isdelete: row.isdelete == 0 ? 1 : 0,
					}

					if(row.productsNum != 0 && para.isdelete == 1) { //该车已绑定设备时,并且是设备为无效时
						this.$message({
							message: '该车已绑定设备，无法进行无效操作！',
							type: 'warning'
						});
					} else { //该车未绑定设备时
						modifyVehicleInfo(para).then((res) => {
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
			// 车主姓名——搜索下拉
			querySearchName(queryString, cb) {
				let para = {
						name: queryString
					},
					ownerArray = [];
				getOwnerInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						var moreInfo = ''; //声明变量，显示手机或身份证
						if(item.mobile == null) { //当手机为空时
							moreInfo = '身份证' + item.idcard; //显示身份证
						} else { //当手机号不为空时
							moreInfo = '手机' + item.mobile; //显示手机号
						}
						ownerArray.push({
							value: item.name + '(' + moreInfo + ')',
							id: item.ID
						});
					});
					cb(ownerArray);
				});
			},
			handleSelectName(item) {
				// this.editForm.name = item.value;
				this.editFormId.ownerid = item.id;
				this.addForm.ownerid = item.id;
			},
			/*车主姓名——下拉*/
			nameChange(r) {
				if(!r || this.namelist.length > 0) return;
				this.nameLoading = true;
				getOwnerInfoList().then((res) => {
					this.namelist = res.data.data.records;
					this.nameLoading = false;
				});
			},
			/*车类型——下拉*/
			vehChange(r) {
				if(!r || this.vehlist.length > 0) return;
				this.vehLoading = true;
				getVehList().then((res) => {
					this.vehlist = res.data.data;
					this.vehLoading = false;
				});
			},
			/*客户——下拉*/
			corpChange(r) {
				this.corplist = [];
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;
				let para = {
					showCount: 1000,
				}
				getCorpNameList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			// 客户，模糊查询
			corpChangeSelect(query) {
				this.corplist = [];
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
			/*银行——下拉*/
			// corpChangeTwo(r) {
			// 	if(!r || this.corptwolist.length > 0) return;
			// 	let para = {
			// 		corptype: 'BANK',
			// 		showCount: 1000
			// 	};
			// 	this.corptwoLoading = true;
			// 	searchCorpNameList(para).then((res) => {
			// 		this.corptwoLoading = false;
			// 		if(res.data.result.code == 0) {
			// 			this.corptwolist = res.data.data.records;
			// 		}
			// 	});
			// },
			/*银行——下拉*/
			corpChangeTwo(r) {
				if(!r || this.corptwolist.length > 0) return;
				this.corptwoLoading = true;

				let para = {
					corptype: 'BANK',
				}
				getCorpList(para).then((res) => {
					this.corptwolist = res.data.data.records;
					this.corptwoLoading = false;
				});
			},
			// 银行，模糊查询
			corpChangeTwoSelect(query) {
				let para = {
					showCount: 30,
					corptype: 'BANK',
					corpname: query
				}
				this.corptwoLoading = true;
				getCorpList(para).then((res) => {
					this.corptwoLoading = false;
					if(res.data.result.code == 0) {
						this.corptwolist = res.data.data.records;
					}
				});
			},
			//时间转换
			dateFormatter: function(row, col) {
				if(row.firstregisterdate == "" || row.firstregisterdate == undefined) return;
				return util.formatDate.format(new Date(row.firstregisterdate), 'yyyy-MM-dd');
			},
			//时间转换第二
			dateFormatterSecond: function(row, col) {
				if(row.loanenddate == "" || row.loanenddate == undefined) return;
				return util.formatDate.format(new Date(row.loanenddate), 'yyyy-MM-dd');
			},
			//是否有盗抢险转换
			hasinsuranceFormat: function(row, col) {
				return row.hastheftinsurance == 1 ? '有' : '无';
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
				};
				this.listLoading = true;
				getSelectListVeh(para).then((res) => {
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
					// 搜索设置部分
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getVehicleInfoList(para).then((res) => {
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
					//NProgress.start();
					let para = {
						ids: row.ID,
						method: "delete"
					};
					removeVehicleInfo(para).then((res) => {
						this.listLoading = false;
						if(res.data.result.desc != 'success') {
							this.$message({
								message: '当前车辆绑定了有效设备！请先解绑！',
								type: 'warning'
							});
						} else {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
						this.handleQuery();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.productsData(row.ID); //查询当前车辆所绑定的设备
				this.vehicleidList = row.ID; //将车辆id存储
				this.initModelBrand(); //初始化车系数据
				this.inItCorporatelevel(row);

				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					licenseplatenum: row.licenseplatenum,
					vin: row.vin,
					enginenum: row.enginenum,
					name: row.name,
					price: row.price == undefined ||  row.price == '' ? '' : row.price,
					model: row.model,
					color: row.color,
					colorname: row.colorname,
					firstregisterdate: row.firstregisterdate,
					deptname: row.deptname,
					vehicletype: row.typedesc,
					platecolorid:'',
					licenseplatecolor:'',
					corpname: row.corpname,
					corpid: row.corpid,
					bankname: row.bankname,
					hastheftinsurance: row.hastheftinsurance,
					generalproductcount: row.generalproductcount,
					yearsofservice: row.yearsofservice,
					loanenddate: row.loanenddate,
					isdelete: parseInt(row.isdelete),
					productsNum: row.productsNum,
					vehicleuse: row.vehicleuse,
					vehiclecategory: row.vehiclecategory,
					licenseplatecolor: row.licenseplatecolor,
					tagList:[]
				}
				
				this.tagListName = row.corporatelevels;
				this.editFormId = {
					ownerid: row.ownerid,
					name: row.name,
					corpid: row.corpid,
					corpname: row.corpname,
					bankname: row.bankname,
					receivingbankid: row.receivingbankid,
				}
				this.tempModel = row.model;
				this.thisInput.push(this.editForm.licenseplatenum, this.editForm.vin); //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.productsdatas = []; //清空绑定设备数据
				this.initModelBrand(); //初始化车系数据
				
				this.addFormVisible = true;
				this.addForm = {
					licenseplatenum: '',
					vin: '',
					enginenum: '',
					name: '',
					price: '',
					model: '',
					color: '#000',
					colorname: '',
					firstregisterdate: '',
					vehicletype: '小型汽车、轻便摩托车（蓝色）',
					defaultcode:3,
					licenseplatecolor: '蓝色',
					corpname: '',
					bankname: '',
					hastheftinsurance: '1',
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					isdelete: 0,
					ownerid: '',
					productsNum: '',
					vehicleuse: '',
					vehiclecategory: '',
				}
			},
			//编辑
			editSubmit() {
				if(this.tempModel != this.editForm.model.toString()) {
					this.$message({
						message: '车型名称必须选择',
						type: 'error'
					});
					return;
				}
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							licenseplatenum: this.editForm.licenseplatenum,
							vin: this.editForm.vin,
							enginenum: this.editForm.enginenum,
							price: this.editForm.price,
							model: this.editForm.model.toString(),
							color: this.editForm.color,
							colorname: this.editForm.colorname,
							firstregisterdate: this.editForm.firstregisterdate,
							platecolorid:this.editForm.vehicletype.id,
							licenseplatecolor: this.editForm.vehicletype.platecolordesc,
							corpid: this.editForm.corpid,
							receivingbankid: this.editForm.bankname,
							hastheftinsurance: this.editForm.hastheftinsurance,
							generalproductcount: this.editForm.generalproductcount,
							yearsofservice: this.editForm.yearsofservice,
							loanenddate: this.editForm.loanenddate,
							isdelete: parseInt(this.editForm.isdelete),
							ownerid: this.editFormId.ownerid,
							productsNum: this.editForm.productsNum,
							vehicleuse: this.editForm.vehicleuse,
							vehiclecategory: this.editForm.vehiclecategory,
							corporatelevels:[]
						}
						this.tagListName.forEach((item,index)=>{
							para.corporatelevels.push({id:item.id});
						});
						if(this.editFormId.bankname == this.editForm.bankname) {
							para.receivingbankid = this.editFormId.receivingbankid;
						} else {
							para.receivingbankid = this.editForm.bankname;
						}

						modifyVehicleInfo(para).then((res) => {
							this.handleQuerySelect();
							this.editLoading = false;

							this.$message({
								message: '编辑成功',
								type: 'success'
							});

							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuery();
						}).catch((error) => {
							this.editLoading = false;
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				if(this.tempModel != this.addForm.model.toString()) {
					this.$message({
						message: '车型名称必须选择',
						type: 'error'
					});
					return;
				}
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							licenseplatenum: this.addForm.licenseplatenum,
							vin: this.addForm.vin,
							enginenum: this.addForm.enginenum,
							name: this.addForm.name,
							price: this.addForm.price,
							model: this.addForm.model.toString(),
							color: this.addForm.color,
							colorname: this.addForm.colorname,
							firstregisterdate: this.addForm.firstregisterdate,
							platecolorid:this.addForm.vehicletype.id,
							licenseplatecolor: this.addForm.vehicletype.platecolordesc,
							corpid: this.addForm.corpname,
							receivingbankid: this.addForm.bankname,
							hastheftinsurance: parseInt(this.addForm.hastheftinsurance),
							generalproductcount: this.addForm.generalproductcount,
							yearsofservice: this.addForm.yearsofservice,
							loanenddate: this.addForm.loanenddate,
							isdelete: parseInt(this.addForm.isdelete),
							ownerid: this.addForm.ownerid,
							onlineCheck: this.prodDataID,
							vehicleuse: this.addForm.vehicleuse,
							vehiclecategory: this.addForm.vehiclecategory,
						}
						if (this.addForm.vehicletype.id == undefined) {
							para.platecolorid = this.addForm.defaultcode;
							para.licenseplatecolor = this.addForm.licenseplatecolor;
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							if(para.ownerid == '') {
								this.$message({
									message: '车主不存在！',
									type: 'warning'
								});
								this.addLoading = false;
							} else {
								addVehicleInfo(para).then((res) => {
									this.addLoading = false;
									this.$message({
										message: '新增成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.handleQuery();
								}).catch((error) => {
									this.$message({
										message: error,
										type: 'error'
									});
									this.addLoading = false;
								});
							}
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeVehicleInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			},
			//递归获取当前匹配层级index
			getIndexLevel(tagOptions,pid){
				$.each(tagOptions,(index,item)=>{
					if(item.id == pid[this.cjIndex]){
						this.tempIndex.push(index);
					}
					if(item.children.length == 0){
						this.cjIndex = 0;
						if(pid.length == this.tempIndex.length){
							this.levelCallback(pid,this.tempIndex);
							return false;
						}
					}
					if(item.children.length > 0){
						this.cjIndex++;
						this.getIndexLevel(item.children,pid);
						return;
					}
				});
			},
			levelCallback(pid,indexList){
				if(pid.length == 1){
					if(indexList.length == 1){
						this.tagOptions[indexList[0]].children = this.tempdata;
					}
			
				}
				if(pid.length == 2){
					if(indexList.length == 2){
						this.tagOptions[indexList[0]].children[indexList[1]].children = this.tempdata;
					}
				}

			},
			//选择标签查询子级标签
			handleItemChangeLevel(pid){
				this.$nextTick(function() {
					this.tagListName = [];
					 $("span.tagClassLevl span.el-cascader__label").text().split('-').forEach((item,index)=>{
					 	this.tagListName.push({id:pid[index],tagname:item});
					 });
				});
				let para = {
					corpid:this.curCorpid,
					parenttagid:pid[pid.length-1]
				}
				this.tempIndex = [];
				this.cjIndex = 0;
				this.isLevelLoading = true;
				getCorporatelevel_level(para).then((res)=>{
					this.isLevelLoading = false;
					if(res.data.result.code == 0){
						this.tempdata =  res.data.data;
						this.getIndexLevel(this.tagOptions,pid);
					}
				});
			},
			//默认加载根目录标签
			inItCorporatelevel(row){
				this.curCorpid = row.corpid;
				let para = {
					corpid:row.corpid,
					parenttagid:0
				}
				this.isLevelLoading = true;
				getCorporatelevel_level(para).then((res)=>{
					this.isLevelLoading = false;
					if(res.data.result.code == 0){
						this.tagOptions = res.data.data;
					}
				});
			}
		},
		activated() {
			this.handleQuery();
		}

	}
</script>