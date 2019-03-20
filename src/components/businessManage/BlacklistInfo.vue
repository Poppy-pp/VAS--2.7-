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
									<el-option label="车架号" value="vin"></el-option>
									<el-option label="车主" value="name"></el-option>
									<el-option label="所属客户" value="corpname"></el-option>
									<el-option label="车型" value="model"></el-option>
									<el-option label="车价(元)" value="price"></el-option>
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
										<el-option label="车架号" value="vin"></el-option>
										<el-option label="车主" value="name"></el-option>
										<el-option label="所属客户" value="corpname"></el-option>
										<el-option label="车型" value="model"></el-option>
										<el-option label="车价(万元)" value="price"></el-option>
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
							<el-switch v-model="filters.isdelete" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-170" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="licenseplatenum" label="车牌号" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="vin" label="车架号" align="center" >
			</el-table-column>
			<el-table-column prop="corpname" label="所属客户" align="center" >
			</el-table-column>
			<el-table-column prop="model" label="车型" align="center" >
			</el-table-column>
			<el-table-column prop="price" label="车价(万元)" width="100" align="center" >
			</el-table-column>
			<el-table-column prop="" label="订单详情" width="100" align="center" >
			</el-table-column>
			<!-- <el-table-column fixed="right" label="操作" width="140" align="center">
                <template scope="scope">
                    <el-button id="button"  @click="formDetailHandle(scope.row.ownerid,scope.row.vin)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
                        <i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
                    </el-button>
                    <el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
                        <i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
                    </el-button>
                    <el-button id="button"  @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
                        <i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
                     </el-button>
                    <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
                        <i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
                    </el-button>
                </template>
            </el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar ipmt5">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd>{{ oneInfo.licenseplatenum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd>{{ oneInfo.vin }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属客户:</dt>
							<dd>{{ oneInfo.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车型:</dt>
							<dd>{{ oneInfo.model }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车价(万元):</dt>
							<dd>{{ oneInfo.price }}</dd>
						</dl>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备数量:</dt>
							<dd>{{ oneInfo.productsNum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车类型:</dt>
							<dd>{{ oneInfo.vehicletypename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车颜色:</dt>
							<dd>{{ oneInfo.color }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发动机号:</dt>
							<dd>{{ oneInfo.enginenum }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>受理银行:</dt>
							<dd>{{ oneInfo.bankname }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>初始登记日期:</dt>
							<dd>{{ oneInfo.firstregisterdate == null ? "" :fmtdata.formatDate.format(new Date(oneInfo.firstregisterdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>贷款到期日:</dt>
							<dd>{{ oneInfo.loanenddate == null ? "" :fmtdata.formatDate.format(new Date(oneInfo.loanenddate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>服务期限(年):</dt>
							<dd>{{ oneInfo.yearsofservice }}</dd>
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
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{oneInfo.createby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{oneInfo.createdate == null ? "" :fmtdata.formatDate.format(new Date(oneInfo.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{oneInfo.updateby}}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{oneInfo.updatedate == null ? "" :fmtdata.formatDate.format(new Date(oneInfo.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
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
							<dd>{{ ownerInfo.gender == 'M' ? '男' : ownerInfo.gender == 'F' ? '女' : '男' }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>身份证:</dt>
							<dd>{{ ownerInfo.idcard }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>手机:</dt>
							<dd>{{ ownerInfo.mobile }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ ownerInfo.addressHome }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="130px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="车牌号" prop="licenseplatenum">
							<el-input v-model="editForm.licenseplatenum" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车架号" prop="vin">
							<el-input v-model="editForm.vin" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车价(万元)" prop="price">
							<el-input v-model="editForm.price" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车型" prop="model">
							<el-input v-model="editForm.model" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="颜色" prop="color">
							<el-radio-group v-model="editForm.color">
								<el-radio-button label="红"></el-radio-button>
								<el-radio-button label="橙"></el-radio-button>
								<el-radio-button label="黄"></el-radio-button>
								<el-radio-button label="绿"></el-radio-button>
								<el-radio-button label="蓝"></el-radio-button>
								<el-radio-button label="紫" style="margin-top:10px;border-left:1px solid #B0C0CE"></el-radio-button>
								<el-radio-button label="白"></el-radio-button>
								<el-radio-button label="黑"></el-radio-button>
								<el-radio-button label="银"></el-radio-button>
								<el-radio-button label="金"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="发动机号" prop="enginenum">
							<el-input v-model="editForm.enginenum" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车类型" prop="vehicletype">
							<el-select v-model="editForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" filterable placeholder="请选择车类型" clearable>
								<el-option v-for="item in vehlist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属客户" prop="corpname">
							<el-select v-model="editForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable>
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="受理银行" prop="bankname">
							<el-select v-model="editForm.bankname" @visible-change="corpChangeTwo" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
								<el-option v-for="item in corptwolist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否有盗抢险" prop="hastheftinsurance">
							<el-radio-group v-model="editForm.hastheftinsurance">
								<el-radio class="radio" :label="1">有</el-radio>
								<el-radio class="radio" :label="0">无</el-radio>
							</el-radio-group>
						</el-form-item>
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
						<el-form-item label="车主" prop="ownerid">
							<el-select v-model="editForm.ownerid" filterable placeholder="请选择车主" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.ID"
							      :label="item.name"
							      :value="item.ID">
							    </el-option>
							  </el-select>
						</el-form-item>
						<el-form-item label="设备数量" prop="productsNum">
							<el-input v-model="editForm.productsNum" disabled auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 车辆绑定设备信息 -->
				<el-collapse v-model="activeNamesVeh" class="bdcoll mt20">
					<el-collapse-item title="车辆绑定设备信息" name="1">
						<el-row :gutter="20">
							<template v-for="(item,index) in vehClickData">
								<el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;">
									<el-col :span="6">
										<dl class="dllist">
											<dt>设备编号:</dt>
											<dd>{{ item.PRODNUM }}</dd>
										</dl>
										<dl class="dllist">
											<dt>设备自编号:</dt>
											<dd>{{ item.PRODSNNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="6">
										<dl class="dllist">
											<dt>设备型号:</dt>
											<dd>{{ item.PRODMODEL }}</dd>
										</dl>
										<dl class="dllist">
											<dt>设备类别:</dt>
											<dd>{{ item.PRODSPEC }}</dd>
										</dl>
									</el-col>
									<el-col :span="24" class="mb10">
										<el-button type="danger" @click="delDevice(item,index)" style="margin-left:5px;float:right;">取消查看当前设备</el-button>
									</el-col>
								</el-col>
							</template>
							<el-col :span="24" class="mt10">
								<el-popover ref="popover4" placement="right" width="700" v-model="visible" trigger="hover">
									<el-table border :data="vehData" max-heght="400" v-loading="listLoading" @row-dblclick="vehClickHandle">
										<el-table-column type="index" width="20" align="center" label="#"></el-table-column>
										<el-table-column align="center" prop="PRODNUM" label="设备编号"></el-table-column>
										<el-table-column align="center" prop="PRODSNNUM" label="设备自编号"></el-table-column>
										<el-table-column align="center" prop="PRODMODEL" label="设备型号"></el-table-column>
										<el-table-column align="center" prop="PRODSPEC" label="设备类别"></el-table-column>
									</el-table>
								</el-popover>
								<el-button icon="el-icon-edit" @click="searchVehinfo(editForm.id)" v-popover:popover4>查看该车辆绑定的设备</el-button>
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
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="车牌号" prop="licenseplatenum">
							<el-input v-model="addForm.licenseplatenum" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车架号" prop="vin">
							<el-input v-model="addForm.vin" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车价(万元)" prop="price">
							<el-input v-model="addForm.price" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车型" prop="model">
							<el-input v-model="addForm.model" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="颜色" prop="color">
							<el-radio-group v-model="addForm.color">
								<el-radio-button label="红"></el-radio-button>
								<el-radio-button label="橙"></el-radio-button>
								<el-radio-button label="黄"></el-radio-button>
								<el-radio-button label="绿"></el-radio-button>
								<el-radio-button label="蓝"></el-radio-button>
								<el-radio-button label="紫" style="margin-top:10px;border-left:1px solid #B0C0CE"></el-radio-button>
								<el-radio-button label="白"></el-radio-button>
								<el-radio-button label="黑"></el-radio-button>
								<el-radio-button label="银"></el-radio-button>
								<el-radio-button label="金"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="发动机号" prop="enginenum">
							<el-input v-model="addForm.enginenum" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车类型" prop="vehicletype">
							<el-select v-model="addForm.vehicletype" @visible-change="vehChange" :loading="vehLoading" filterable placeholder="请选择车类型" clearable>
								<el-option v-for="item in vehlist" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属客户" prop="corpname">
							<el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属客户" clearable>
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="受理银行" prop="bankname">
							<el-select v-model="addForm.bankname" @visible-change="corpChangeTwo" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
								<el-option v-for="item in corptwolist" :key="item.corpname" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否有盗抢险" prop="hastheftinsurance">
							<el-radio-group v-model="addForm.hastheftinsurance">
								<el-radio class="radio" :label="1">有</el-radio>
								<el-radio class="radio" :label="0">无</el-radio>
							</el-radio-group>
						</el-form-item>
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
						<el-form-item label="车主" prop="ownerid">
							<el-select v-model="addForm.ownerid" filterable placeholder="请选择车主" @visible-change="empChange" :loading="empLoading" filterable clearable>
							    <el-option
							      v-for="item in empOptions"
							      :key="item.ID"
							      :label="item.name"
							      :value="item.ID">
							    </el-option>
							  </el-select>
						</el-form-item>
						<!-- <el-form-item label="设备数量" prop="productsNum">
                        <el-input v-model="addForm.productsNum" disabled auto-complete="off"></el-input>
                    </el-form-item> -->
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

<style type="text/css" media="screen">
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
</style>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getVehicleInfoList, addVehicleInfo, modifyVehicleInfo, removeVehicleInfo, getCustomerInfoList, getVehList, addNewOwner, getOwnerInfoList, getCorpList, getProductsInfoListOfVehicle, getOwnerIDList, getSelectList, getSelectListVeh } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			//验证车架号(只能输入数字和字母)
			var checkVin = (rule, value, callback) => {
				var reg = /^[a-zA-Z][0-9a-zA-Z]*$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('车架号必须为字母和数字组成'));
				} else {
					callback();
				}
			};
			//验证车价(只能输入数字)
			var checkPrice = (rule, value, callback) => {
				var reg = /^\d+(\.\d{2})?$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('车价须大于等于0,小数保留两位'));
				} else {
					callback();
				}
			};
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入中文,不能大于四个汉字'));
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
				filters: {
					domSearch: [{
						select: ['licenseplatenum'],
						content: ''
					}], //查询框
					isdelete: '1'
				},
				fmtdata: util,
				pickerOptions0: { //贷款到期日
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				vehData: [], //当前车辆绑定的设备信息
				vehClickData: [], //点击的设备信息
				visible: false, //车辆信息显示
				activeNamesVeh: ['0'],
				pickerOptions: { //车辆初始登记日期
				},
				empLoading:false,
				empOptions:[],//员工列表
				listData: [],
				oneInfo: [], //车辆其他关联数据
				productsdatas: [], //设备信息
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
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [{
							required: true,
							message: "请输入车主姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
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
					licenseplatenum: [
						{
							required: true,
							message: "请输入车牌号",
							trigger: 'blur'
						},{
							validator: checkVehicleNumber,
							trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'blur'
					}],
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
					firstregisterdate: '',
					vehicletype: '',
					corpname: '',
					bankname: '',
					hastheftinsurance: '',
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					ownerid: '',
					productsNum: '',
					editDetails: [],
				},
				editFormId: {
					vehicletype: '',
					vehicletypename: '',
					corpid: '',
					corpname: '',
					bankname: '',
					receivingbankid: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [{
							required: true,
							message: "请输入车主姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
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
					licenseplatenum: [
						{
							required: true,
							message: "请输入车牌号",
							trigger: 'blur'
						},{
							validator: checkVehicleNumber,
							trigger: 'blur'
					}],
					model: [{
						required: true,
						message: "请输入车型",
						trigger: 'blur'
					}],
				},
				//新增界面数据
				addForm: {
					licenseplatenum: '',
					vin: '',
					enginenum: '',
					name: '',
					price: '',
					model: '',
					color: '',
					firstregisterdate: '',
					vehicletype: '',
					corpname: '',
					bankname: '',
					hastheftinsurance: '',
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					ownerid: '',
					isdelete: 0,
					productsNum: '',
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
			//点击添加设备获取当前车辆的设备信息
			searchVehinfo(vehrowid) {
				let para = {
					vehicleid: vehrowid,
				}
				//获取设备信息
				getProductsInfoListOfVehicle(para).then((res) => {
					this.vehData = res.data.data.records;
				});
			},
			//双击设备进行设备编辑
			vehClickHandle(row, event, column) {
				this.visible = false;
				this.vehClickData.push(row);
				//添加设备信息
				// this.editForm.editDetails.push({
				//   PRODNUM: null,
				//   PRODSNNUM: null,
				//   PRODMODEL: null,
				//   PRODDESC: null,
				// });
				// let para = {
				//   id : row.C_PRODUNUM
				// };
			},
			//关联设备删除
			delDevice(item, index) {
				this.vehClickData.splice(index, 1);
			},
			//详情查看
			formDetailHandle(ownerid, vin) {
				this.formDialogTableVisible = true;
				let para = {
					id: ownerid,
					vin: vin,
				}
				//获取车主信息
				getOwnerInfoList(para).then((res) => {
					this.ownerInfo = res.data.data.records[0];
					console.log(this.ownerInfo);
				});
				//获取车辆信息
				getVehicleInfoList(para).then((res) => {
					this.oneInfo = res.data.data.records[0];
					console.log(this.oneInfo);
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
				console.log(para);
				getSortList(para).then((res) => {});
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
					modifyVehicleInfo(para).then((res) => {
						this.$message({
							message: '设置成功',
							type: 'success'
						});
						row.isdelete = para.isdelete;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},
			// 车主——搜索下拉
			empChange(r) {
				if(!r || this.empOptions.length > 0) return;
				this.empLoading = true;
				getOwnerInfoList().then((res) => {
					this.empOptions = res.data.data.records;
					this.empLoading = false;
				});
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
					this.vehlist = res.data.data.records;
					this.vehLoading = false;
				});
			},
			/*客户——下拉*/
			corpChange(r) {
				if(!r || this.corplist.length > 0) return;
				this.corpLoading = true;
				let para = {
					flag: '万网公司'
				}
				getCorpList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			/*银行——下拉*/
			corpChangeTwo(r) {
				if(!r || this.corptwolist.length > 0) return;
				this.corptwoLoading = true;
				let para = {
					flag: '万网公司'
				}
				getCorpList(para).then((res) => {
					this.corptwolist = res.data.data.records;
					this.corptwoLoading = false;
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

			//获取客户列表
			// GetCustomers() {
			//     let para = {};
			//     getCustomerInfoList(para).then((res) => {
			//         this.listData = res.data.data.records;
			//     });
			// },
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

					// let para = new FormData();
					// para.append('ids',row.id);
					// para.append('method','delete');

					removeVehicleInfo(para).then((res) => {
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
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.ID,
					licenseplatenum: row.licenseplatenum,
					vin: row.vin,
					enginenum: row.enginenum,
					name: row.name,
					price: row.price + '',
					model: row.model,
					color: row.color,
					firstregisterdate: row.firstregisterdate,
					deptname: row.deptname,
					vehicletype: row.vehicletypename,
					corpname: row.corpname,
					bankname: row.bankname,
					hastheftinsurance: parseInt(row.hastheftinsurance),
					generalproductcount: row.generalproductcount,
					yearsofservice: row.yearsofservice,
					loanenddate: row.loanenddate,
					isdelete: parseInt(row.isdelete),
					ownerid: row.ownerid,
					productsNum: row.productsNum,
				}
				this.editFormId = {
					vehicletype: row.vehicletype,
					vehicletypename: row.vehicletypename,
					corpid: row.corpid,
					corpname: row.corpname,
					bankname: row.bankname,
					receivingbankid: row.receivingbankid,
				}
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					licenseplatenum: '',
					vin: '',
					enginenum: '',
					name: '',
					price: '',
					model: '',
					color: '',
					firstregisterdate: '',
					vehicletype: '',
					corpname: '',
					bankname: '',
					hastheftinsurance: 1,
					generalproductcount: '',
					yearsofservice: '',
					loanenddate: '',
					isdelete: 0,
					ownerid: '',
					productsNum: '',
				}
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						//NProgress.start();
						let para = {
							id: this.editForm.id,
							licenseplatenum: this.editForm.licenseplatenum,
							vin: this.editForm.vin,
							enginenum: this.editForm.enginenum,
							name: this.editForm.name,
							price: this.editForm.price,
							model: this.editForm.model,
							color: this.editForm.color,
							firstregisterdate: this.editForm.firstregisterdate,
							vehicletype: this.editForm.vehicletype,
							corpid: this.editForm.corpname,
							receivingbankid: this.editForm.bankname,
							hastheftinsurance: parseInt(this.editForm.hastheftinsurance),
							generalproductcount: this.editForm.generalproductcount,
							yearsofservice: this.editForm.yearsofservice,
							loanenddate: this.editForm.loanenddate,
							isdelete: parseInt(this.editForm.isdelete),
							ownerid: this.editForm.ownerid,
							productsNum: this.editForm.productsNum,
						}
						if(this.editFormId.vehicletypename == this.editForm.vehicletype) {
							para.vehicletype = this.editFormId.vehicletype;
						} else {
							para.vehicletype = this.editForm.vehicletype;
						}
						if(this.editFormId.corpname == this.editForm.corpname) {
							para.corpid = this.editFormId.corpid;
						} else {
							para.corpid = this.editForm.corpname;
						}
						if(this.editFormId.bankname == this.editForm.bankname) {
							para.receivingbankid = this.editFormId.receivingbankid;
						} else {
							para.receivingbankid = this.editForm.bankname;
						}

						// 新增车主名
						// let paraTwo = {
						//     name:para.name,
						// }
						// // 向数据库添加车主姓名（仅姓名）
						// addNewOwner(paraTwo).then((res) =>{});
						// //调用查询车主方法,获取新增的车主id
						// getOwnerInfoList(paraTwo).then((res) => {
						//     console.log(res);
						//     this.listDataOwner = res.data.data.records;
						//     if ( this.listDataOwner.length > 0 ) {
						//         // console.log(this.listDataOwner[0].id);
						//         para.ownerid = this.listDataOwner[0].id;
						//         console.log(para.ownerid);
						//     }
						// });

						modifyVehicleInfo(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.handleQuery();
						}).catch(function(error) {
							this.editLoading = false;
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						//NProgress.start();
						let para = {
							licenseplatenum: this.addForm.licenseplatenum,
							vin: this.addForm.vin,
							enginenum: this.addForm.enginenum,
							name: this.addForm.name,
							price: this.addForm.price,
							model: this.addForm.model,
							color: this.addForm.color,
							firstregisterdate: this.addForm.firstregisterdate,
							vehicletype: this.addForm.vehicletype,
							corpid: this.addForm.corpname,
							receivingbankid: this.addForm.bankname,
							hastheftinsurance: parseInt(this.addForm.hastheftinsurance),
							generalproductcount: this.addForm.generalproductcount,
							yearsofservice: this.addForm.yearsofservice,
							loanenddate: this.addForm.loanenddate,
							isdelete: 1,
							ownerid: this.addForm.ownerid,
							// productsNum:this.addForm.productsNum,
						}
						if (para.ownerid == '') {
							this.addLoading = false;
							this.$message({
								message: '请选择系统内有效的车主！',
								type: 'error'
							});
							return;
						}
						addVehicleInfo(para).then((res) => {
							this.addLoading = false;
							if (res.data.result.code == 0) {
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							}else{
								this.$message({
									message: res.data.result.desc,
									type: 'error'
								});
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
					removeVehicleInfo(para).then((res) => {
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
		created() {
			this.handleQuery();
		},

	}
</script>