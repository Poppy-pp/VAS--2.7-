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
									<el-option label="车主" value="name"></el-option>
									<el-option label="性别" value="gender"></el-option>
									<el-option label="身份证" value="idcard"></el-option>
									<el-option label="电话" value="mobile"></el-option>
									<el-option label="婚姻状况" value="maritalstatus"></el-option>
									<el-option label="地址" value="addresshome"></el-option>
									<el-option label="邮箱" value="email"></el-option>
									<el-option label="邮编" value="postcodeoffice"></el-option>
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
										<el-option label="车主" value="name"></el-option>
										<el-option label="性别" value="gender"></el-option>
										<el-option label="身份证" value="idcard"></el-option>
										<el-option label="电话" value="mobile"></el-option>
										<el-option label="婚姻状况" value="maritalstatus"></el-option>
										<el-option label="地址" value="addresshome"></el-option>
										<el-option label="邮箱" value="email"></el-option>
										<el-option label="邮编" value="postcodeoffice"></el-option>
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
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="owners" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="name" label="车主" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="gender" label="性别" :formatter="genderFormat" align="center" width="65" >
			</el-table-column>
			<el-table-column prop="idcard" label="身份证" align="center" width="190" >
			</el-table-column>
			<el-table-column prop="mobile" label="电话" align="center" width="130" >
			</el-table-column>
			<el-table-column prop="maritalstatus" label="婚姻状况" :formatter="maritalstatusFormat" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="addresshome" label="地址" align="center" >
			</el-table-column>
			<el-table-column prop="email" label="邮箱" align="center" width="180" >
			</el-table-column>
			<el-table-column prop="postcodeoffice" label="邮编" align="center" width="90" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情" :disabled="scope.row.isdelete == '1' ? true : false">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isdelete == '1' ? true : false" title="编辑">
						<i :class="scope.row.isdelete == '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isdelete == "1" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isdelete == "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<!--  <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.isdelete == '1' ? true : false">
                        <i :class="scope.row.isdelete == '1' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
                    </el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination class="fr" @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
			</el-pagination>
		</el-col>
		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">车主信息</span>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车主:</dt>
							<dd>{{ ownerList.name }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>性别:</dt>
							<dd>{{ ownerList.gender == 'M' ? '男' : ownerList.gender == 'F' ? '女' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>证件号:</dt>
							<dd>{{ ownerList.idcard == undefined ? '暂无' : ownerList.idcard }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>手机:</dt>
							<dd>{{ ownerList.mobile }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>婚姻状况:</dt>
							<dd>{{ ownerList.maritalstatus == 'M' ? '已婚' : ownerList.maritalstatus == 'S' ? '未婚' : '暂无' }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>地址:</dt>
							<dd>{{ ownerList.addresshome == undefined ? '暂无' : ownerList.addresshome }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>邮箱:</dt>
							<dd>{{ ownerList.email == undefined ? '暂无' : ownerList.email }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>邮编:</dt>
							<dd>{{ ownerList.postcodeoffice == undefined ? '暂无' : ownerList.postcodeoffice }}</dd>
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
							<dd>{{createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{ownerList.createdate == null ? "暂无" : fmtdata.formatDate.format(new Date(ownerList.createdate), 'yyyy-MM-dd') }}</dd>
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
							<dd>{{ownerList.updatedate == null ? "暂无" : fmtdata.formatDate.format(new Date(ownerList.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="vehDataInfo != ''">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<template v-for="(item,index) in vehDataInfo">
						<el-col :span="9" style="margin-top:10px">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车辆&nbsp; </dt>
								<dd>{{ index+1 }}</dd>
							</dl>

							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车牌号:</dt>
								<dd>{{item.licenseplatenum}}</dd>
							</dl>

							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车架号:</dt>
								<dd>{{item.vin}}</dd>
							</dl>

						</el-col>
						<el-col :span="10" style="margin-top:10px">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>厂牌型号:</dt>
								<dd>{{item.model}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>发动机号:</dt>
								<dd>{{item.enginenum == undefined ? '暂无' : item.enginenum }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车类型:</dt>
								<dd>{{item.vehicletypename == undefined ? '暂无' : item.vehicletypename}}</dd>
							</dl>
						</el-col>
						<el-col :span="5" style="margin-top:10px">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车价:</dt>
								<dd>{{item.price}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>登记日期:</dt>
								<dd>{{ item.createdate == null ? "" :fmtdata.formatDate.format(new Date(item.createdate), 'yyyy-MM-dd') }}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>车辆颜色:</dt>
								<dd>{{item.colorname == undefined ? '暂无' : item.colorname}}</dd>
							</dl>
						</el-col>
					</template>
				</el-row>
				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="prodData.length != 0">
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
					<template v-for="(item,index) in prodData">
						<el-col :span="10" style="margin-top:10px;">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>设备</dt>
								<dd>{{index+1}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>编号:</dt>
								<dd>{{item.prodnum}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>类别:</dt>
								<dd>{{item.prodspec}}</dd>
							</dl>
						</el-col>
						<el-col :span="9" style="margin-top:10px;">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>型号:</dt>
								<dd>{{item.prodmodel}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>通讯号:</dt>
								<dd>{{item.simnum}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>库房:</dt>
								<dd>{{item.storagename}}</dd>
							</dl>
						</el-col>
						<el-col :span="5" style="margin-top:10px;">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>状态:</dt>
								<dd>{{item.status == 'INSTO' ? '在库' : item.status == 'INSTALL' ? '已安装' : item.status == 'LOST' ? '报失' : item.status == 'REPAIR' ? '维修' : item.status == 'DAMAGE' ? '报废' : item.status == 'ONWAY' ? '在途' : '暂无' }}</dd>
							</dl>
						</el-col>
					</template>
				</el-row>
				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;" v-show="insData.policyno != undefined">
					<el-col :span="24">
						<span class="formTile">保单信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>保单号:</dt>
							<dd>{{insData.policyno == undefined ? '暂无' : insData.policyno}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>金额(元):</dt>
							<dd>{{insData.price == undefined ? '暂无' : insData.price}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>赔偿限额(元):</dt>
							<dd>{{insData.indemnitylimit == undefined ? '暂无' : insData.indemnitylimit}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>受益人:</dt>
							<dd>{{insData.beneficiary == undefined ? '暂无' : insData.beneficiary}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>报单公司:</dt>
							<dd>{{insData.declarationcorp == undefined ? '暂无' : insData.declarationcorp}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>出单单位:</dt>
							<dd>{{insData.insurancecorp == undefined ? '暂无' : insData.insurancecorp}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>保险项目:</dt>
							<dd>{{insData.insurancetype == undefined ? '暂无' : insData.insurancetype}}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-collapse v-model="activeNamesVeh" class="mt20">
					<el-collapse-item title="车主信息" name="0">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="姓名" prop="name">
									<el-input v-model="editForm.name" auto-complete="off" placeholder="请输入车主姓名"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="gender">
									<el-radio-group v-model="editForm.gender">
										<el-radio class="radio" label="M">男</el-radio>
										<el-radio class="radio" label="F">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="身份证号码" prop="idcard" style="margin-bottom:20px;" ref="idcard">
									<el-input v-model="editForm.idcard" placeholder="请输入有效身份证号" @blur="checkout('idcard',editForm.idcard,0)"></el-input>
								</el-form-item>
								<el-form-item label="电话号码" prop="mobile" ref="mobile">
									<el-input v-model="editForm.mobile" placeholder="请输入电话号码" @blur="checkout('mobile',editForm.mobile,1)"></el-input>
								</el-form-item>
								<el-form-item label="邮编" prop="postcodeoffice">
									<el-input v-model="editForm.postcodeoffice" placeholder="请输入邮编"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="婚姻状况" prop="maritalstatus">
									<el-radio-group v-model="editForm.maritalstatus">
										<el-radio class="radio" label="M">已婚</el-radio>
										<el-radio class="radio" label="S">未婚</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="地址" prop="addressHome">
									<el-cascader placeholder="请选择省/市/区" v-model="editForm.addressHome" :options="prOptions" filterable clearable change-on-select></el-cascader>
								</el-form-item>
								<el-form-item label="详细地址" prop="installaddress">
									<el-input v-model="editForm.installaddress" auto-complete="off" placeholder="请输入详细地址"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" prop="email">
									<el-input v-model="editForm.email" auto-complete="off" placeholder="请输入常用邮箱"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<!-- 绑定车辆信息页面 -->
					<el-collapse-item title="绑定车辆信息" name="1">
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item id="nomargin">
									<el-table :data="vehDataInfo" empty-text="暂未绑定车辆" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="250">
										<el-table-column prop="licenseplatenum" label="车牌号" align="center">
										</el-table-column>
										<el-table-column prop="vin" label="车架号" align="center">
										</el-table-column>
										<el-table-column prop="price" label="车价(元)" width="80" align="center">
										</el-table-column>
										<el-table-column prop="model" label="车型" align="center">
										</el-table-column>
										<el-table-column prop="color" label="颜色" width="60" align="center">
										</el-table-column>
										<el-table-column label="操作" width="80" align="center">
											<template scope="scope">
												<el-button type="danger" size="small" class="mt5" @click.native="cancel(scope.$index,vehDataInfo)">解绑</el-button>
											</template>
										</el-table-column>
									</el-table>
									<el-button type="primary" @click.native="addDeviceList" icon="el-icon-plus" style="margin-top:10px;">绑定车辆</el-button>
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
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-collapse v-model="activeNamesVeh" class="mt20">
					<el-collapse-item title="车主信息" name="0">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="名字" prop="name">
									<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入车主姓名"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="gender">
									<el-radio-group v-model="addForm.gender">
										<el-radio class="radio" label="M">男</el-radio>
										<el-radio class="radio" label="F">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="身份证号码" prop="idcard" ref="idcard">
									<el-input v-model="addForm.idcard" placeholder="请输入车主有效身份证号" @blur="checkout('idcard',addForm.idcard,0)"></el-input>
								</el-form-item>
								<el-form-item label="电话号码" prop="mobile" ref="mobile">
									<el-input v-model="addForm.mobile" placeholder="请输入车主电话号码" @blur="checkout('mobile',addForm.mobile,1)"></el-input>
								</el-form-item>
								<el-form-item label="邮编" prop="postcodeoffice">
									<el-input v-model="addForm.postcodeoffice" placeholder="请输入邮编"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="婚姻状况" prop="maritalstatus">
									<el-radio-group v-model="addForm.maritalstatus">
										<el-radio class="radio" label="M">已婚</el-radio>
										<el-radio class="radio" label="S">未婚</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="地址" prop="addressHome">
									<el-cascader placeholder="请选择省/市/区" v-model="addForm.addressHome" :options="prOptions" filterable clearable change-on-select></el-cascader>
								</el-form-item>
								<el-form-item label="详细地址" prop="installaddress">
									<el-input v-model="addForm.installaddress" auto-complete="off" placeholder="请输入详细地址"></el-input>
								</el-form-item>
								<el-form-item label="邮箱" prop="email">
									<el-input v-model="addForm.email" auto-complete="off" placeholder="请输入车主邮箱"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-collapse-item>

					<!-- 绑定车辆信息页面 -->
					<el-collapse-item title="绑定车辆信息" name="1">
						<el-row :gutter="20">
							<el-col :span="24">
								<el-form-item id="nomargin">
									<el-table :data="vehDataInfo" empty-text="暂无绑定车辆" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="250">
										<el-table-column prop="licenseplatenum" label="车牌号" align="center">
										</el-table-column>
										<el-table-column prop="vin" label="车架号" align="center">
										</el-table-column>
										<el-table-column prop="price" label="车价(元)" width="80" align="center">
										</el-table-column>
										<el-table-column prop="model" label="车型" align="center">
										</el-table-column>
										<el-table-column prop="color" label="颜色" width="60" align="center">
										</el-table-column>
										<el-table-column label="操作" width="80" align="center">
											<template scope="scope">
												<el-button type="danger" size="small" icon="el-icon-delete" class="mt5" @click.native="deleteRow(scope.$index,vehDataInfo)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
									<el-button type="primary" @click.native="addDeviceList" icon="el-icon-plus" style="margin-top:10px;">添加绑定车辆</el-button>
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

		<!--车辆列表选择界面-->
		<el-dialog title="车辆信息" :modal-append-to-body="false" :visible.sync="deviceFormVisible" top="3%" :close-on-click-modal="false" @close="clearAllThis()">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="车牌号" value="licenseplatenum"></el-option>
										<el-option label="车架号" value="vin"></el-option>
										<el-option label="车价(元)" value="price"></el-option>
										<el-option label="车型" value="model"></el-option>
										<el-option label="颜色" value="color"></el-option>
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
											<el-option label="车牌号" value="licenseplatenum"></el-option>
											<el-option label="车架号" value="vin"></el-option>
											<el-option label="车价(元)" value="price"></el-option>
											<el-option label="车型" value="model"></el-option>
											<el-option label="颜色" value="color"></el-option>
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
			<!--选择车辆列表-->
			<el-table border :data="deviceListData" :row-class-name="tableRowClassName" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @select="selsChange" style="width: 100%;">
				<el-table-column type="selection" fixed="left" width="50" align="center">
				</el-table-column>
				<el-table-column prop="licenseplatenum" label="车牌号" align="center">
				</el-table-column>
				<el-table-column prop="vin" label="车架号" align="center">
				</el-table-column>
				<el-table-column prop="price" label="车价(元)" width="80" align="center">
				</el-table-column>
				<el-table-column prop="model" label="车型" align="center">
				</el-table-column>
				<el-table-column prop="color" label="颜色" width="60" align="center">
				</el-table-column>
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-button type="primary" class="mt5" @click="choseEvent" :disabled="this.sels.length===0">确认绑定</el-button>
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80, 100]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>
	</section>
</template>

<style scoped>
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
	
	#nomargin .el-form-item__content {
		margin: 0 !important;
	}
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getOwnerInfoList, addOwnerInfo, modifyOwnerInfo, removeOwnerInfo, getVehicleSearchInfoList, getVehicleInfoList, getSelectListOwner, getVehInfoList, modifyVehicleInfo, getNamebyUserid, getCheckoutOfOwner, getMoreInfoList } from '../../api/api';
	export default {
		name:'OwnerInfo',
		props: ["windowOutHeight"],
		data() {
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
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入10个以内的汉字和字母'));
				} else {
					callback();
				}
			};
			//验证邮箱
			var checkEmail = (rule, value, callback) => {
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('邮箱格式不正确'));
				} else {
					callback();
				}
			};
			//验证车主身份证号(只能输入11位数字)
			var checkIdcard = (rule, value, callback) => {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					callback();
					return;
				}
				if(!flag) {
					return callback(new Error('身份证格式不合法'));
				} else {
					callback();
				}
			};
			return {
				fmtdata: util,
				filters: {
					domSearch: [{
						select: ['name'],
						content: ''
					}], //查询框
					isdelete: '0'
				},
				owners: [],
				ownerList: [],
				vehDataInfo: [], //当前详情车主所持的车辆信息
				vehDataID: [], //洗澡能 存放已选择的车辆ID
				activeNamesVeh: ['0', '1'],
				prOptions: util.initProvince(),
				formDialogTableVisible: false,
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				carslist: [],
				carsLoading: false,
				radio: '1',
				sels: [], //列表选中列
				prodData: [], //详情设备数据
				insData: [], //详情保险数据
				deviceListData: [], //车辆列表
				dtotal: 0,
				dcurrentPage: 1,
				dpageSize: 15,
				deviceFormVisible: false,
				devicelistLoading: false,
				prodDataInfo: [], //车主所有车辆绑定设备信息
				checkData: [], //选择绑定check
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //
				thisInput: [], //编辑时存入row验证的值
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				createname: "",
				updatename: "",
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
					mobile: [{
							required: true,
							message: "请输入车主手机号码",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					// email:[{required:true,message:"请输入邮箱",trigger: 'blur'},
					// {validator: checkEmail,trigger: 'blur'}
					// ],
					idcard: [{
							required: true,
							message: "请输入身份证号码",
							trigger: 'blur'
						},
						{
							validator: checkIdcard,
							trigger: 'blur'
						}
					],
				},
				//编辑界面数据
				editForm: {
					id: '',
					ownerid: '',
					name: '',
					gender: '',
					idcard: '',
					mobile: '',
					email: '',
					installaddress: '',
					postcodeoffice: '',
					maritalstatus: '',
					addressHome: '',
					addresshome: '',
					licenseplatenum: '',
					vin: '',
					model: '',
					color: ''
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
					mobile: [{
							required: true,
							message: "请输入车主手机号码",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					// email:[{required:true,message:"请输入邮箱",trigger: 'blur'},
					// {validator: checkEmail,trigger: 'blur'}
					// ],
					idcard: [{
							required: true,
							message: "请输入身份证号码",
							trigger: 'blur'
						},
						{
							validator: checkIdcard,
							trigger: 'blur'
						}
					],
				},
				//新增界面数据
				addForm: {
					name: '',
					gender: '',
					idcard: '',
					mobile: '',
					email: '',
					installaddress: '',
					postcodeoffice: '',
					maritalstatus: '',
					addressHome: ["四川", "成都", "高新区"],
					addresshome: '',
					isdelete: 0,
					licenseplatenum: '',
					vin: '',
					model: '',
					color: '',
					vehicleinfo: [{
						ID: ''
					}]
				}
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput[index] == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfOwner(paras).then((res) => {
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
			// 选择绑定列表中 确认绑定按钮事件
			choseEvent() {
				if(this.addFormVisible) { //新增页面时
					this.comlistAdd();
				} else if(this.editFormVisible) { //编辑页面时
					this.comlist();
				}
			},
			// 多选框 选择车辆时
			selsChange(sels, row) {
				this.sels = sels;
				this.checkData = row;
			},
			// 新增——绑车辆时删除
			deleteRow(index, rows) {
				rows.splice(index, 1); //删除一行
			},
			// 新增——绑车辆时确认选择
			comlistAdd() {
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();

				this.vehDataInfo = this.sels; //已选择存入列表

				// 遍历已选择的车辆 存id
				this.sels.forEach((item, index) => {
					this.vehDataID.push({
						id: item.ID
					});
				});
			},
			// 编辑——确认解绑
			cancel(index, rows) {
				let row = rows[index];
				this.$confirm('确认解除该车辆的绑定关系吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.ID,
						unBandOwner: 'y'
					};
					modifyVehicleInfo(para).then((res) => {
						rows.splice(index, 1); //删除一行
					});
				}).catch(() => {});
			},
			//编辑—— 确认绑定
			comlist() {
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();

				let para = {
					id: this.checkData.ID,
					ownerid: this.editForm.ownerid,
				};
				modifyVehicleInfo(para).then((res) => {
					if(this.vehDataInfo.length == 0) {
						this.vehDataInfo = this.sels;
					} else {
						this.vehDataInfo = this.vehDataInfo.concat(this.sels); //合并数组 = 之前原有+ 现在选择
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
			// 获取车辆信息
			addDeviceList() {
				this.deviceFormVisible = true;
				this.filters.domSearch = [{
					select: ['licenseplatenum'],
					content: ''
				}];
				this.getDeciceListInfo();
			},
			//获取车辆信息
			getDeciceListInfo() {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					domSearch: this.filters.domSearch,
					forBandOwner: 'y',
					isdelete: 0,
				};
				this.devicelistLoading = true;
				getVehInfoList(para).then((res) => {
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
				sums[5] = data.length + "辆 车";
				return sums;
			},
			// 清空当前模糊查询
			clearAllThis() {
				this.filters.domSearch = [{
					select: ['name'],
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
			formDetailHandle(ownerid) {
				this.formDialogTableVisible = true;
				this.vehDataInfo = []; //清空上条数据
				this.ownerList = [];
				this.createname = "";
				this.updatename = "";
				nanobar.go(70);
				// 获取当前车主信息
				let paraTwo = {
					id: ownerid
				}

				getOwnerInfoList(paraTwo).then((res) => {
					this.ownerList = res.data.data.records[0];

					let paraThree = {
						createby: this.ownerList.createby == null ? 0 : this.ownerList.createby,
						updateby: this.ownerList.updateby == null ? 0 : this.ownerList.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
				});
				//获取当前车辆信息
				let para = {
					ownerid: ownerid,
				}
				//获取车辆
				getVehicleInfoList(para).then((res) => {
					if(res.data.data.records.length == 0) {
						// this.$message({
						//                     message: '该车主暂未拥有车辆！',
						//                     type: 'warning'
						//                    });
					} else {
						this.vehDataInfo = res.data.data.records;
						this.vehID = this.vehDataInfo.ID;
					}
				});
				// 全部详情信息
				let paraThree = {
					ownerid: ownerid,
				}
				getMoreInfoList(paraThree).then((res) => {
					if(res.data.data.records[0] == undefined) { //当没有保单信息时
						nanobar.go(100);
						return;
					} else if(res.data.data.records[0].products == undefined) { //当没有设备信息时
						nanobar.go(100);
						return;
					} else {
						this.insData = res.data.data.records[0]; //全部详情--保单信息
						this.prodData = res.data.data.records[0].products; //设备信息
						nanobar.go(100);
					}
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
				// getSortList(para).then((res) => {});
			},
			// 有效无效开关
			showData(i) {
				this.filters.isdelete = i;
				this.getOwner();
			},
			// 匹配车牌号列表
			carsChange(r) {
				if(!r || this.carslist.length > 0) return;
				this.carsLoading = true;
				getVehicleSearchInfoList().then((res) => {
					this.carslist = res.data.data.records;
					this.carsLoading = false;
				});
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isdelete == 1) {
					return 'warning-row';
				}
				return '';
			},
			//性别显示转换
			genderFormat: function(row, col) {
				return row.gender == 'M' ? '男' : row.gender == 'F' ? '女' : '';
			},
			//婚姻显示转换
			maritalstatusFormat(row, column) {
				return row.maritalstatus == 'M' ? '已婚' : row.maritalstatus == 'S' ? '未婚' : '';
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				// this.getOwner();
				this.handleQuerySelect();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getOwner();
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
				getSelectListOwner(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.owners = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取用户列表
			getOwner() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isdelete: this.filters.isdelete,
				};
				this.listLoading = true;
				getOwnerInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.owners = res.data.data.records;
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
						id: row.ID,
						isdelete: 1,
					};
					modifyOwnerInfo(para).then((res) => {
						this.listLoading = false;
						if(res.data.result.desc != 'success') {
							this.$message({
								message: '当前车主绑定了有效车辆！请先解绑！',
								type: 'warning'
							});
						} else {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
						this.handleQuerySelect();
					});
				}).catch(() => {
					this.listLoading = false;
				});
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
					modifyOwnerInfo(para).then((res) => {
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
			//显示编辑界面
			handleEdit(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.formDetailHandle(row.ID); //调用详情方法，查出当前车辆所绑定设备信息
				this.formDialogTableVisible = false; //关闭详情页面
				this.editFormVisible = true;

				// 地址
				var addrVal = row.addresshome,
					addrArr, detailAdress;
				if(addrVal != null) {
					if(addrVal.split(" ").length > 0) {
						addrArr = addrVal.split(" ")[0].split(",");
						detailAdress = addrVal.split(" ")[1];
					} else {
						addrArr = addrVal.split(",");
					}
				} else {
					addrArr = ["四川", "成都", "高新区"];
				}

				this.editForm = {
					id: row.id || row.ID,
					ownerid: row.ID,
					name: row.name,
					installaddress: detailAdress,
					gender: row.gender,
					idcard: row.idcard,
					mobile: row.mobile,
					email: row.email,
					postcodeoffice: row.postcodeoffice,
					maritalstatus: row.maritalstatus,
					addressHome: addrArr,
				}

				this.thisInput.push(this.editForm.idcard, this.editForm.mobile); //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.vehDataInfo = [];
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					gender: 'M',
					idcard: '',
					mobile: '',
					email: '',
					postcodeoffice: '',
					maritalstatus: 'M',
					addressHome: ["四川", "成都", "高新区"],
					isdelete: 0,
				};
			},
			//编辑
			editSubmit() {
				this.$refs['editForm'].validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							name: this.editForm.name,
							gender: this.editForm.gender,
							idcard: this.editForm.idcard,
							mobile: this.editForm.mobile,
							email: this.editForm.email,
							postcodeoffice: this.editForm.postcodeoffice,
							maritalstatus: this.editForm.maritalstatus,
							addresshome: this.editForm.addressHome.toString() + ' ' + this.editForm.installaddress,
						}
						modifyOwnerInfo(para).then((res) => {
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
				this.checkoutDataF.forEach((item, index) => {
					this.checkoutDataT = item && this.checkoutDataT;
				});
				this.$refs['addForm'].validate((valid) => {
					if(valid) {
						this.addLoading = true;
						// let para = Object.assign({}, this.addForm);
						let para = {
							name: this.addForm.name,
							gender: this.addForm.gender,
							idcard: this.addForm.idcard,
							mobile: this.addForm.mobile,
							email: this.addForm.email,
							postcodeoffice: this.addForm.postcodeoffice,
							maritalstatus: this.addForm.maritalstatus,
							isdelete: this.addForm.isdelete,
							addresshome: this.addForm.addressHome.toString() + ' ' + (this.addForm.installaddress == undefined ? '' : this.addForm.installaddress),
							vehicleinfo: this.vehDataID
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							addOwnerInfo(para).then((res) => {
								this.addLoading = false;
								if (res.data.result.code == 0) {
									this.addFormVisible = false;
									this.$message({
										message: '新增成功！',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.handleQuerySelect();
								}
							}).catch((error) => {
								this.addLoading = false;
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeownerInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getOwner();
					});
				}).catch(() => {

				});
			}
		},
		activated() {
			this.getOwner();
		}
	}
</script>