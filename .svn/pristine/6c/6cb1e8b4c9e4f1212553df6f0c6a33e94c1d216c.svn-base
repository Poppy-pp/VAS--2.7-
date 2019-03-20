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
									<el-option label="万网保单编号" value="POLICYNO"></el-option>
									<el-option label="保单类型" value="INSURANCESTATUS"></el-option>
									<el-option label="报单公司" value="BUSICORPNAME"></el-option>
									<el-option label="车主" value="OWNERNAME"></el-option>
									<el-option label="金额(元)" value="PRICE"></el-option>
									<el-option label="赔偿限额(元)" value="INDEMNITYLIMIT"></el-option>
									<el-option label="受理银行" value="RECEIVINGBANKNAME"></el-option>
									<el-option label="车价(元)" value="VEHICLEIDPRICE"></el-option>
									<el-option label="出单单位" value="INSUCORPNAME"></el-option>
									<el-option label="保险项目" value="INSURANCETYPE"></el-option>
									<el-option label="设备编号" value="PRODNUM"></el-option>
									<el-option label="设备自编号" value="PRODSNNUM"></el-option>
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
										<el-option label="万网保单编号" value="POLICYNO"></el-option>
										<el-option label="保单类型" value="INSURANCESTATUS"></el-option>
										<el-option label="报单公司" value="BUSICORPNAME"></el-option>
										<el-option label="车主" value="OWNERNAME"></el-option>
										<el-option label="金额(元)" value="PRICE"></el-option>
										<el-option label="赔偿限额(元)" value="INDEMNITYLIMIT"></el-option>
										<el-option label="受理银行" value="RECEIVINGBANKNAME"></el-option>
										<el-option label="车价(元)" value="VEHICLEIDPRICE"></el-option>
										<el-option label="出单单位" value="INSUCORPNAME"></el-option>
										<el-option label="保险项目" value="INSURANCETYPE"></el-option>
										<el-option label="设备编号" value="PRODNUM"></el-option>
										<el-option label="设备自编号" value="PRODSNNUM"></el-option>
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
							<el-switch v-model="filters.ISACTIVE" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="insurances" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="POLICYNO" label="万网保单编号" width="120" align="center" >
			</el-table-column>
			<el-table-column prop="INSURANCESTATUS" label="保单类型" align="center" >
			</el-table-column>
			<el-table-column prop="STATUS" label="保险状态" align="center" >
				<template slot-scope="scope">
					<el-tag :type="scope.row.STATUS === 'NORMAL' ? 'primary' : scope.row.STATUS === 'INVALID' ? 'danger' : ''">{{ scope.row.STATUS == 'INVALID' ? '作废' : scope.row.STATUS == 'NORMAL' ? '正常' : '暂无' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="BUSICORPNAME" label="报单公司" align="center" >
			</el-table-column>
			<el-table-column prop="OWNERNAME" label="车主" align="center" >
			</el-table-column>
			<el-table-column prop="PRICE" label="金额(元)" align="center" >
			</el-table-column>
			<el-table-column prop="INDEMNITYLIMIT" label="赔偿限额(元)" align="center" width="120" >
			</el-table-column>
			<el-table-column prop="EFFECTIVEDATE" label="生效日" :formatter="dateFormatterSecond" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="EXPIREDATE" label="到期日" :formatter="dateFormatterThird" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="RECEIVINGBANKNAME" label="受理银行" align="center" width="300">
			</el-table-column>
			<el-table-column prop="ISSUEDATE" label="出单日" :formatter="dateFormatter" align="center" width="100" >
			</el-table-column>
			<el-table-column prop="VEHICLEIDPRICE" label="车价(元)" width="90" align="center" >
			</el-table-column>
			<el-table-column prop="INSUCORPNAME" label="出单单位" width="200" align="center" >
			</el-table-column>
			<el-table-column prop="INSURANCETYPE" label="保险项目" align="center" >
			</el-table-column>
			<el-table-column prop="LINKPOLICYNO" label="关联保单" align="center" >
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row,scope.row.VEHICLEID)" title="详情" :disabled="scope.row.ISACTIVE == '0' ? true : false">
						<i :class="scope.row.ISACTIVE == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.ISACTIVE == '0' ? true : false" title="编辑">
						<i :class="scope.row.ISACTIVE == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.ISACTIVE == "0" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.ISACTIVE == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
					<el-button id="button" @click="handleAbate(scope.$index, scope.row)" title='废除保单' :disabled="scope.row.ISACTIVE == '0' ? true : false" v-if="scope.row.STATUS != 'INVALID'">
						<i :class='scope.row.ISACTIVE == "0" ? "iconfont icon-shanchu operate operate-shanchu" : "iconfont icon-shanchu operate operate-shanchu"'></i>
					</el-button>
					<el-button id="button" @click="handleAgain(scope.$index, scope.row)" title='重新出单' :disabled="scope.row.ISACTIVE == '0' ? true : false" v-if="scope.row.STATUS == 'INVALID'">
						<i :class='scope.row.ISACTIVE == "0" ? "iconfont icon-tianjia operate operate-tianjia" : "iconfont icon-tianjia operate operate-tianjia"'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			</el-pagination>
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 订单详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;">
					<el-col :span="24">
						<span class="formTile">保单信息</span>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>万网保单编号:</dt>
							<dd>{{oneinsurance.POLICYNO == undefined ? '暂无' : oneinsurance.POLICYNO}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>保单类型:</dt>
							<dd>{{oneinsurance.INSURANCESTATUS == undefined ? '暂无' : oneinsurance.INSURANCESTATUS}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>金额(元):</dt>
							<dd>{{oneinsurance.PRICE == undefined ? '暂无' : oneinsurance.PRICE}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>赔偿限额(元):</dt>
							<dd>{{oneinsurance.INDEMNITYLIMIT == undefined ? '暂无' : oneinsurance.INDEMNITYLIMIT}}</dd>
						</dl>
						<dl class="dllist" :formatter="dateFormatterSecond" style="margin-bottom:10px;">
							<dt>生效日:</dt>
							<dd>{{ oneinsurance.EFFECTIVEDATE == null ? "暂无" :fmtdata.formatDate.format(new Date(oneinsurance.EFFECTIVEDATE), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>到期日:</dt>
							<dd>{{oneinsurance.EXPIREDATE == null ? "暂无" :fmtdata.formatDate.format(new Date(oneinsurance.EXPIREDATE), 'yyyy-MM-dd')}}</dd>
						</dl>
					</el-col>
					<el-col :span="12">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>受理银行:</dt>
							<dd>{{oneinsurance.RECEIVINGBANKNAME == undefined ? '暂无' : oneinsurance.RECEIVINGBANKNAME}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>报单公司:</dt>
							<dd>{{oneinsurance.BUSICORPNAME == undefined ? '暂无' : oneinsurance.BUSICORPNAME}}</dd>
						</dl>
						<dl class="dllist" :formatter="dateFormatter" style="margin-bottom:10px;">
							<dt>出单日:</dt>
							<dd>{{ oneinsurance.ISSUEDATE == null ? "暂无" :fmtdata.formatDate.format(new Date(oneinsurance.ISSUEDATE), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车价(元):</dt>
							<dd>{{oneinsurance.VEHICLEIDPRICE == undefined ? '暂无' : oneinsurance.VEHICLEIDPRICE}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>出单单位:</dt>
							<dd>{{oneinsurance.INSUCORPNAME == undefined ? '暂无' : oneinsurance.INSUCORPNAME}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>保险项目:</dt>
							<dd>{{oneinsurance.INSURANCETYPE == undefined ? '暂无' : oneinsurance.INSURANCETYPE}}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row style="padding:10px 40px;margin-bottom:20px;border-top:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd v-if="somedata">{{somedata.licenseplatenum == undefined ? '暂无' : somedata.licenseplatenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>厂牌型号:</dt>
							<dd v-if="somedata">{{somedata.model == undefined ? '暂无' : somedata.model}}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>发动机号:</dt>
							<dd v-if="somedata">{{somedata.enginenum == undefined ? '暂无' : somedata.enginenum}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd v-if="somedata">{{somedata.vin == undefined ? '暂无' : somedata.vin}}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>初始登记日期:</dt>
							<dd v-if="somedata">{{ somedata.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(somedata.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆颜色:</dt>
							<dd v-if="somedata">{{somedata.colorname == undefined ? '暂无' : somedata.colorname}}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row style="padding:10px 40px;margin-bottom:20px;border-top:1px solid #C4E8D6" v-show="somedata.NAME != undefined">
					<el-col :span="24">
						<span class="formTile">车主信息</span>
					</el-col>
					<el-col :span="10">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>姓名:</dt>
							<dd v-if="somedata">{{somedata.NAME}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>详细地址:</dt>
							<dd v-if="somedata">{{somedata.ADDRESSHOME == undefined ? '暂无' : somedata.ADDRESSHOME}}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>证件号码:</dt>
							<dd v-if="somedata">{{somedata.IDCARD == undefined ? '暂无' : somedata.IDCARD}}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>电话:</dt>
							<dd v-if="somedata">{{somedata.MOBILE}}</dd>
						</dl>
					</el-col>
					<el-col :span="5">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>性别:</dt>
							<dd v-if="somedata">{{somedata.GENDER == 'M' ? '男' : somedata.GENDER == 'F' ? '女' : '暂无'}}</dd>
						</dl>
					</el-col>
				</el-row>

				<div v-show="otherinfoData.PRODNUM != undefined">
					<el-col :span="24">
						<span class="formTile" style="margin-top:12px;padding-top: 10px;padding-left: 40px;border-top:1px solid #CDF4F5">设备信息</span>
					</el-col>
					<el-row style='padding-left: 40px;' v-for="(item,index) in otherinfoData">
						<el-col :span="10">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>设备</dt>
								<dd>{{index+1}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>类别:</dt>
								<dd>{{item.PRODSPEC}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>型号:</dt>
								<dd>{{item.PRODMODEL}}</dd>
							</dl>
						</el-col>
						<el-col :span="9">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>编号:</dt>
								<dd>{{item.PRODNUM}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>SIM卡号:</dt>
								<dd>{{item.PRODSNNUM}}</dd>
							</dl>
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>安装时间:</dt>
								<dd>{{item.INSTALLACTUALDATE}}</dd>
							</dl>
						</el-col>
						<el-col :span="5">
							<dl class="dllist" style="margin-bottom:10px;">
								<dt>状态:</dt>
								<dd>{{item.STATUS}}</dd>
							</dl>
						</el-col>
					</el-row>
				</div>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-form-item label="万网保单编号" prop="POLICYNO" ref="POLICYNO">
							<el-input v-model="editForm.POLICYNO" auto-complete="off" @blur="checkout('POLICYNO',editForm.POLICYNO,0)" @input="checkout('POLICYNO',editForm.POLICYNO,0)"></el-input>
						</el-form-item>
						<el-form-item label="金额(元)" prop="PRICE">
							<el-input v-model="editForm.PRICE"></el-input>
						</el-form-item>
						<el-form-item label="赔偿限额(元)" prop="INDEMNITYLIMIT">
							<el-input v-model="editForm.INDEMNITYLIMIT" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出单日" prop="ISSUEDATE">
							<el-date-picker v-model="editForm.ISSUEDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="issuedateChange">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="生效日" prop="EFFECTIVEDATE">
							<el-date-picker v-model="editForm.EFFECTIVEDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDate">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="到期日" prop="EXPIREDATE">
							<el-date-picker v-model="editForm.EXPIREDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDateTwo">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="保单类型" prop="INSURANCESTATUS">
							<el-select disabled v-model="editForm.INSURANCESTATUS" clearable placeholder="请选择保单类型">
								<el-option v-for="item in insurancestatusOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="受理银行" prop="RECEIVINGBANKNAME">
							<el-select v-model="editForm.RECEIVINGBANKNAME" remote :remote-method="corpChangeTwoSelect" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
								<el-option v-for="item in corptwolist" :key="item.id" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						

						<el-form-item label="出单单位" prop="INSUCORPNAME">
							<el-select v-model="editForm.INSUCORPNAME" @visible-change="incorpChange" :loading="incorpLoading" filterable placeholder="请选择保单公司" clearable>
								<el-option v-for="item in incorplist" :key="item.corpname" :label="item.corpname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="保险项目" prop="INSURANCETYPE">
							<el-select v-model="editForm.INSURANCETYPE" @visible-change="insuranceChange" :loading="insuranceLoading" filterable placeholder="请选择保险项目" clearable>
								<el-option v-for="item in insurancelist" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				<el-button type="primary" @click.native="print(editForm)" :loading="editLoading">提交并打印</el-button>
			</div>
		</el-dialog>


		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="万网保单编号" prop="POLICYNO">
					<el-input v-model="addForm.POLICYNO" auto-complete="off"></el-input>
				</el-form-item>
				</el-form-item> -->
				<el-form-item label="车辆ID" prop="VEHICLEID">
					<el-input v-model="addForm.VEHICLEID"></el-input>
				</el-form-item>
				<el-form-item label="保险项目" prop="INSURANCETYPE">
					<el-input v-model="addForm.INSURANCETYPE"></el-input>
				</el-form-item>
				<el-form-item label="出单日" prop="ISSUEDATE">
					<el-date-picker v-model="addForm.ISSUEDATE" @change="issuedateChange" type="date" placeholder="选择日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="生效日" prop="EFFECTIVEDATE">
					<el-date-picker v-model="addForm.EFFECTIVEDATE" @change="matchDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="到期日" prop="EXPIREDATE">
					<el-date-picker v-model="addForm.EXPIREDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="保单价格" prop="PRICE">
					<el-input v-model="addForm.PRICE"></el-input>
				</el-form-item>
				<el-form-item label="保单赔偿限额" prop="INDEMNITYLIMIT">
					<el-input v-model="addForm.INDEMNITYLIMIT" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="第一受理银行" prop="RECEIVINGBANKNAME">
					<el-input v-model="addForm.RECEIVINGBANKNAME"></el-input>
				</el-form-item>
				<el-form-item label="车架号" class="mt10" prop="VIN">
					<el-autocomplete class="inline-input searchInput" v-model="addForm.VIN" :fetch-suggestions="querySearchVin" placeholder="请输入车架号" :trigger-on-focus="false" @select="handleSelectVin"></el-autocomplete>
				</el-form-item>
				<el-form-item label="设备编号" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="ID号" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备SIM卡号" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="安装时间" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证号码" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系地址" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="车牌号码" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="厂牌型号" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发动机号" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="初次登记日期" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新车购置价" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="万网车辆盗抢保障费用" prop="policyno">
					<el-input v-model="addForm.policyno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="保险期限" prop="beneficiary">
					<el-input v-model="addForm.beneficiary"></el-input>
				</el-form-item>
				<el-form-item label="保险函编号" prop="beneficiary">
					<el-input v-model="addForm.beneficiary"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="beneficiary">
					<el-input v-model="addForm.beneficiary"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>


		<!--重新出单界面-->
		<el-dialog title="重新出单" :modal-append-to-body="false" :visible.sync="editFormVisibleAgain" :close-on-click-modal="false">
			<el-form :model="editFormAgain" label-width="120px" :rules="editFormRules" ref="editFormAgain">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-form-item label="保险公司" prop="INSUCORPNAME">
							<el-select v-model="editFormAgain.INSUCORPNAME" @visible-change="incorpChange" :loading="incorpLoading" filterable placeholder="请选择保险公司" clearable>
								<el-option v-for="item in incorplist" :key="item.corpname" :label="item.corpname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="保单编号" prop="SERIALNUM">
							<el-input v-model="editFormAgain.SERIALNUM" auto-complete="off" ></el-input>
						</el-form-item>
						<el-form-item label="万网保单编号" prop="POLICYNO" ref="POLICYNO">
							<el-input v-model="editFormAgain.POLICYNO" auto-complete="off" @blur="checkout('POLICYNO',editFormAgain.POLICYNO,0)" @input="checkout('POLICYNO',editFormAgain.POLICYNO,0)"></el-input>
						</el-form-item>
						<el-form-item label="出单日期" prop="ISSUEDATE">
							<el-date-picker v-model="editFormAgain.ISSUEDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions"  @change="issuedateChange">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="生效日期" prop="EFFECTIVEDATE">
							<el-date-picker v-model="editFormAgain.EFFECTIVEDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDate">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="失效日期" prop="EXPIREDATE">
							<el-date-picker v-model="editFormAgain.EXPIREDATE" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDateTwo">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="初次登记日期" prop="CREATEDATE">
							<el-date-picker v-model="editFormAgain.CREATEDATE" type="date" placeholder="选择初次登记日期" :picker-options="pickerOptions">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="保险价格(元)" prop="PRICE">
							<el-input v-model="editFormAgain.PRICE"></el-input>
						</el-form-item>
						<el-form-item label="赔偿限额(元)" prop="INDEMNITYLIMIT">
							<el-input v-model="editFormAgain.INDEMNITYLIMIT" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label="出单客户身份证" prop="IDCARD">
							<el-input v-model="editFormAgain.IDCARD" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="出单客户手机号" prop="MOBILE">
							<el-input v-model="editFormAgain.MOBILE" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="发动机号" prop="VEHICLEENGINENUM">
							<el-input v-model="editFormAgain.VEHICLEENGINENUM" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="厂牌型号" prop="MODEL">
							<el-input v-model="editFormAgain.MODEL" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="车牌号" prop="LICENSEPLATENUM">
							<el-input v-model="editFormAgain.LICENSEPLATENUM" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="受理银行" prop="RECEIVINGBANKNAME">
							<el-select v-model="editFormAgain.RECEIVINGBANKNAME" remote :remote-method="corpChangeTwoSelect" :loading="corptwoLoading" filterable placeholder="请选择受理银行" clearable>
								<el-option v-for="item in corptwolist" :key="item.id" :label="item.corpname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="保单类型" prop="INSURANCESTATUS">
							<el-select disabled v-model="editFormAgain.INSURANCESTATUS" clearable placeholder="请选择保单类型">
								<el-option v-for="item in insurancestatusOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="保险项目" prop="INSURANCETYPE">
							<el-select v-model="editFormAgain.INSURANCETYPE" @visible-change="insuranceChange" :loading="insuranceLoading" filterable placeholder="请选择保险项目" clearable>
								<el-option v-for="item in insurancelist" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注" prop="REMARK">
							<el-input v-model="editFormAgain.REMARK" auto-complete="off" type="textarea"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisibleAgain = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmitAgain" :loading="editLoading">重新出单</el-button>
			</div>
		</el-dialog>



		<!-- 打印 -->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="bxDialogVisible" size="small" :close-on-click-modal="false">
		            <el-tabs v-model="editFormdialogActiveName">
		                <el-tab-pane label="中国人寿保险打印模板" name="1">
		                    <chinaLife @closeDialog="closeDialog" ref="chinaLife" :flowData="flowData" v-show="editFormdialogActiveName == 1"></chinaLife>
		                </el-tab-pane>
		                <el-tab-pane label="中国人民财产保险单打印模板" name="2">
		                    <chinaPeopleIns @closeDialog="closeDialog" ref="chinaPeopleIns" :flowData="flowData" v-show="editFormdialogActiveName == 2"></chinaPeopleIns>
		                </el-tab-pane>
	            		</el-tabs>
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
	import nanobar from '../../common/js/nanobar';
	import { getInsuranceInfoList, addInsuranceInfo, modifyInsuranceInfo, getMoreInfoofVehicle, removeInsuranceInfo, getProdInfoList, getVehicleSearchInfoList, getMoNameList, getSortList, getInCorpInfoList, getSelectListInsu, getCheckoutOfIns,getCorpList,delInsuranceInfoList,againInsuranceInfo,printInsuranceInfo } from '../../api/api';
	//组件引入
	import chinaLife from '../businessManage/myOrderAllInfo/chinaLife.vue';
	import chinaPeopleIns from '../businessManage/myOrderAllInfo/chinaPeopleIns';
	export default {
		name:'InsuranceInfo',
		props: ["windowOutHeight"],
		components:{
		            chinaLife,
		            chinaPeopleIns
		},
		data() {
			//验证车价、赔偿限额(只能输入数字)
			var checkPrice = (rule, value, callback) => {
				var reg = /^\d+(\.\d{2})?$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('必须为数字,小数最多保留两位'));
				} else {
					callback();
				}
			};
			//验证特殊字符
			var checkWord = (rule, value, callback) => {
				var reg = /^[a-zA-Z\d]+$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('格式为数字或字母'));
				} else {
					callback();
				}
			};
			
			return {
				fmtdata: util,
				filters: {
					Formate(value) {
						return new Date(value).toLocaleDateString().replace(/\//g, "-");
					},
					domSearch: [{
						select: ['POLICYNO'],
						content: ''
					}], //查询框
					ISACTIVE: '1'
				},
				bxDialogVisible:false,//打印保单
				editFormdialogActiveName:'1',
				// flowData:{
				// 	flowData:'',
				// },//保单信息
				flowData:'',
				moNamelist: [], //设备型号列表
				moNameLoading: false, //设备型号
				pickerOptions: { //日期
				},
				prOptions: util.initProvince(),
				activeNames: '',
				insurancestatusOptions: [{
					value: 1,
					label: '预投保'
				}, {
					value: 2,
					label: '已出单'
				}, {
					value: 3,
					label: '已拒绝'
				}],
				insurances: [],
				otherinfoData: [], //其他详情
				somedata: [],
				oneinsurance: [],
				customers: [],
				insurancelist: [{
					label: '盗抢险',
					value: 'THEFT',
				}], //保险类型列表
				insuranceLoading: false, //保险类型
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				corptwolist: [], //受理银行
				corptwoLoading: false, //
				// inStatuslist:[],//保单类型列表
				// inStatusLoading:false,
				// bcorplist:[],//报单公司列表
				// bcorpLoading:false,
				incorplist: [], //保单公司列表
				incorpLoading: false,
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //
				thisInput: [], //编辑时存入row验证的值
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editFormVisibleAgain:false,
				formDialogTableVisible: false, //是否显示订单详情弹出
				editLoading: false,
				editFormRules: {
					POLICYNO: [{required: true,message: "请输入保险函编号",trigger: 'blur'},{validator: checkWord,trigger: 'blur'}],
					PRICE:[
						{required:true,message:"请输入车价",trigger: 'blur'},
					            {validator: checkPrice,trigger: 'blur'}
					],
					INDEMNITYLIMIT:[
					         {required:true,message:"请输入赔偿限额",trigger: 'blur'},
					         {validator: checkPrice,trigger: 'blur'}
					],
				},
				//编辑界面数据
				editForm: {
					ID: '',
					POLICYNO: '',
					INSURANCECORPID: '',
					VEHICLEID: '',
					ITYPE: '',
					INSURANCETYPE: '',
					INSURANCESTATUS: '',
					LICENSEPLATENUM: '',
					ISSUEDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					EFFECTIVEDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					EXPIREDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					PRICE: '',
					INDEMNITYLIMIT: '',
					RECEIVINGBANKNAME: '',
					ISACTIVE: '',
					VIN: '',
					MODEL: '',
					COLOR: '',
					NAME: '',
					GENDER: '',
					MOBILE: '',
					ADDRESSHOME: '',
					IDCARD: '',
					PRODSPEC: '',
					PRODMODEL: '',
					PRODNUM: '',
					PRODSNNUM: '',
					INDEMNITYLIMIT: '',
				},
				editFormId: {
					insurancecorpid: '',
					insucorpname: '',
					itype: 'THEFT',
					insurancetype: '',
				},
				//重新出单界面数据
				editFormAgain: {
					ID: '',
					OWNERID:'',
					POLICYNO: '',
					INSURANCECORPID: '',
					VEHICLEID: '',
					ITYPE: '',
					INSURANCETYPE: '',
					INSURANCESTATUS: '',
					LICENSEPLATENUM: '',
					ISSUEDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					EFFECTIVEDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					EXPIREDATE: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					PRICE: '',
					INDEMNITYLIMIT: '',
					RECEIVINGBANKNAME: '',
					ISACTIVE: '',
					VIN: '',
					MODEL: '',
					COLOR: '',
					NAME: '',
					GENDER: '',
					MOBILE: '',
					ADDRESSHOME: '',
					IDCARD: '',
					PRODSPEC: '',
					PRODMODEL: '',
					PRODNUM: '',
					PRODSNNUM: '',
					VEHICLEENGINENUM:'',
					CREATEDATE:util.formatDate.format(new Date(), 'yyyy-MM-dd'),
					REMARK:'',
					SERIALNUM:'',
				},
				editFormAgainId: {
					insurancecorpid: '',
					insucorpname: '',
					itype: 'THEFT',
					insurancetype: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {

				},
				//新增界面数据
				addForm: {
					POLICYNO: '',
					// insurancecorpid:'',
					VEHICLEID: '',
					INSURANCETYPE: '',
					ISSUEDATE: '',
					EFFECTIVEDATE: '',
					EXPIREDATE: '',
					PRICE: '',
					INDEMNITYLIMIT: '',
					RECEIVINGBANKNAME: '',
					ISACTIVE: 1,
					VIN: '',
					MODEL: '',
					COLOR: '',
					NAME: '',
					GENDER: '',
					MOBILE: '',
					ADDRESSHOME: '',
					IDCARD: '',
					PRODSPEC: '',
					PRODMODEL: '',
					PRODNUM: '',
					PRODSNNUM: '',
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
			}
		},
		methods: {
			// 数据重复验证
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckoutOfIns(paras).then((res) => {
					let errorInput = res.data.data.param; //保存验证失败的字段
					if(!res.data.data.result) {
						this.$message({
							message: '信息输入重复！',
							type: 'warning'
						});
						this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
						this.checkoutDataF[index] = false;
					} else {
						this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
						this.checkoutDataF[index] = true
					}
				});
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
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
			//改变出单日期 联动 生效日期、失效日期 
			issuedateChange(val) {
				this.editForm.EFFECTIVEDATE = util.addReduceDate(new Date(val), +1);//生效日期
				var dayjian = util.addReduceDate(new Date(val),0);
				this.editForm.EXPIREDATE = util.getDateThreeYers(dayjian, 3);//失效日期

				this.editFormAgain.EFFECTIVEDATE = util.addReduceDate(new Date(val), +1);//生效日期
				this.editFormAgain.EXPIREDATE = util.getDateThreeYers(dayjian, 3);//失效日期
			},
			//改变生效日期 同步 失效日期 有效期3年
			matchDate(val) {
				var dayjian = util.addReduceDate(new Date(val), -1);
				this.editForm.ISSUEDATE = dayjian;//出单日期
				this.editForm.EXPIREDATE = util.getDateThreeYers(dayjian, 3);//失效日期

				this.editFormAgain.ISSUEDATE = dayjian;//出单日期
				this.editFormAgain.EXPIREDATE = util.getDateThreeYers(dayjian, 3);//失效日期
			},
			// 选择到期日自动匹配生效日
			matchDateTwo(val) {
				var dayjian = util.addReduceDate(new Date(val), +1);
				this.editForm.EFFECTIVEDATE = util.getDateThreeYers(dayjian, -3);
				this.editFormAgain.EFFECTIVEDATE = util.getDateThreeYers(dayjian, -3);
			},

			// 保单公司（出单单位）——搜索下拉
			incorpChange(r) {
				if(!r || this.incorplist.length > 0) return;
				this.incorpLoading = true;
				getInCorpInfoList().then((res) => {
					this.incorplist = res.data.data.records;
					this.incorpLoading = false;
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
			/*设备型号——下拉*/
			moNameChange(r) {
				if(!r || this.moNamelist.length > 0) return;
				this.moNameLoading = true;
				getMoNameList().then((res) => {
					this.moNamelist = res.data.data.records;
					this.moNameLoading = false;
				});
			},
			//编辑—— 设备型号选中时自动获取设备分类
			getNameEdit() {
				for(var i = 0; i < this.moNamelist.length; i++) {
					if(this.moNamelist[i].id == this.editForm.PRODMODEL) {
						this.editForm.PRODSPEC = this.moNamelist[i].prodspec;
						this.editForm.PRODCATEGORY = this.moNamelist[i].prodcategory;
					}
				}
			},
			// 有效无效开关
			showData(i) {
				this.filters.ISACTIVE = i;
				this.GetInsurances();
			},
			/*保险类型——下拉*/
			insuranceChange(r) {
				if(!r || this.insurancelist.length > 0) return;
				this.insuranceLoading = true;
				getInsuranceInfoList().then((res) => {
					this.insurancelist = res.data.data.records;
					this.insuranceLoading = false;
				});
			},

			//关闭当前页面弹窗
		            closeDialog(){
		                this.bxDialogVisible = false;
		            },
		            //显示 保险模板打印
		            print(data){
		            		// this.flowData.flowData = '';
		            		if ($(".is-error").hasClass('is-error')) return;//如果保单号重复
		            		this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: data.ID,
							policyno: this.editForm.POLICYNO,
							vehicleid: this.editForm.VEHICLEID,
							licenseplatenum: this.editForm.LICENSEPLATENUM,
							issuedate: util.formatDate.format(new Date(this.editForm.ISSUEDATE), 'yyyy-MM-dd'),
							effectivedate: util.formatDate.format(new Date(this.editForm.EFFECTIVEDATE), 'yyyy-MM-dd'),
							expiredate: this.editForm.EXPIREDATE,
							price: this.editForm.PRICE,
							indemnitylimit: this.editForm.INDEMNITYLIMIT,
							beneficiary: this.editForm.BENEFICIARY,
							// receivingbankname:this.editForm.RECEIVINGBANKNAME,
							receivingbankid:this.editForm.RECEIVINGBANKNAME,
							vin: this.editForm.VIN,
							model: this.editForm.MODEL,
							color: this.editForm.COLOR,
							name: this.editForm.NAME,
							gender: this.editForm.GENDER,
							mobile: this.editForm.MOBILE,
							addressHome: this.editForm.ADDRESSHOME,
							idcard: this.editForm.IDCARD,
							prodspec: this.editForm.PRODSPEC,
							prodmodel: this.editForm.PRODMODEL,
							prodnum: this.editForm.PRODNUM,
							prodsnnum: this.editForm.PRODSNNUM,
							insurancestatus: this.editForm.INSURANCESTATUS,
							INDEMNITYLIMIT: this.editForm.INDEMNITYLIMIT,
							insurancecorpid: this.editForm.INSUCORPNAME,
							itype: this.editForm.ITYPE,
							insurancetype: this.editForm.INSURANCETYPE,
						}
						if(this.editFormId.insucorpname == this.editForm.INSUCORPNAME) {
							para.insurancecorpid = this.editFormId.insurancecorpid;
						} else {
							para.insurancecorpid = this.editForm.INSUCORPNAME;
						}
						if(this.editFormId.receivingbankname == this.editForm.RECEIVINGBANKNAME) {
							para.receivingbankid = this.editFormId.receivingbankid;
						} else {
							para.receivingbankid = this.editForm.RECEIVINGBANKNAME;
						}
						if(this.editFormId.insurancetype == this.editForm.INSURANCETYPE) {
							para.insurancetype = this.editFormId.itype;
						} else {
							para.itype = this.editForm.INSURANCETYPE;
						}
						printInsuranceInfo(para).then((res) => {
							this.editLoading = false;
							if(res.data.result.code == 0){
								// this.flowData.flowData = res.data.data.flowData;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								// 请求成功跳转打印页面，传参
								this.bxDialogVisible = true;
							             this.$nextTick(function(){//向子级传参
							                    this.$refs.chinaLife.flowData = res.data.data;
							                    this.$refs.chinaPeopleIns.flowData = res.data.data;
							             })
							             console.log(res.data.data)
							}
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.GetInsurances();
						});
					}
				});
		            },
			//详情查看
			formDetailHandle(message, vehicleid) {
				this.formDialogTableVisible = true;
				let para = {
					vehicleid: vehicleid,
					// vehicleid:10000020,
				}
				nanobar.go(70);
				this.oneinsurance = message;
				getMoreInfoofVehicle(para).then((res) => {
					nanobar.go(100);
					if(res.data.result.code == 0){
						this.otherinfoData = res.data.data.records;
						this.somedata = this.otherinfoData[0];
					}
				});
			},
			// 车架号关联
			querySearchVin(queryString, cb) {
				let para = {
						VIN: queryString,
					},
					vinNameArray = [];
				getVehicleSearchInfoList(para).then((res) => {
					res.data.data.records.forEach(function(item, index) {
						vinNameArray.push({
							value: item.VIN,
						});
					});
					cb(vinNameArray);
				});
			},
			handleSelectVin(item) {
				this.editForm.VIN = item.value;
				this.addForm.VIN = item.value;
			},
			//有效无效转换
			isactiveFomat(row, col) {
				return row.ISACTIVE == 1 ? '是' : row.ISACTIVE != undefined ? '否' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.ISACTIVE == 0) {
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
						isactive: row.ISACTIVE == 0 ? 1 : 0,
					}
					modifyInsuranceInfo(para).then((res) => {
						if (res.data.result.code ==0 ) {
							this.$message({
								message: '设置成功',
								type: 'success'
							});
						}
						row.ISACTIVE = para.isactive;
					}).catch(() => {
						this.listLoading = false;
					});
				});
			},
			// 废除保单
			handleAbate: function(index, row) {
				this.$prompt('请输入废除保单备注', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
				        }).then(({ value }) => {
				        		let para = {
				        			id: row.ID,
				        			remark:value,
				        		}
				        		delInsuranceInfoList(para).then((res) => {
				        			if (res.data.result.code ==0 ) {
								this.$message({
									message: '废除成功',
									type: 'success'
								});
								this.GetInsurances();
							}
						}).catch(() => {
							this.listLoading = false;
						});
				        }).catch(() => {
					          this.$message({
					            type: 'info',
					            message: '取消输入'
					          });       
				        });
			},
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.ISSUEDATE == "" || row.ISSUEDATE == undefined) return;
				return util.formatDate.format(new Date(row.ISSUEDATE), 'yyyy-MM-dd');
			},
			//时间转换2
			dateFormatterSecond: function(row, col) {
				if(row.EFFECTIVEDATE == "" || row.EFFECTIVEDATE == undefined) return;
				return util.formatDate.format(new Date(row.EFFECTIVEDATE), 'yyyy-MM-dd');
			},
			//时间转换3
			dateFormatterThird: function(row, col) {
				if(row.EXPIREDATE == "" || row.EXPIREDATE == undefined) return;
				return util.formatDate.format(new Date(row.EXPIREDATE), 'yyyy-MM-dd');
			},
			// 保险状态转换
			statusFormatter: function(row, col) {
				return row.STATUS == 'INVALID' ? '作废' : row.STATUS == 'NORMAL' ? '正常' : '暂无';
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
				this.GetInsurances();
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
					ISACTIVE: this.filters.ISACTIVE,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectListInsu(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.insurances = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			GetInsurances() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					// 搜索设置部分
					beneficiary: this.filters.BENEFICIARY,
					policyno: this.filters.POLICYNO,
					licenseplatenum: this.filters.LICENSEPLATENUM,
					vin: this.filters.VIN,
					isactive: this.filters.ISACTIVE,
				};
				this.listLoading = true;
				getInsuranceInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.insurances = res.data.data.records;
					this.insurances.dateString = '';
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

					// let para = new FormData();
					// para.append('ids',row.id);
					// para.append('method','delete');

					removeInsuranceInfo(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						if (res.data.result.code ==0 ) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.GetInsurances();
						}
					});
				}).catch(() => {

				});
			},

			// 重新出单
			handleAgain: function(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisibleAgain = true;
				this.editFormAgain = {
					ID: row.ID,
					OWNERID:row.OWNERID,
					POLICYNO: '',
					VEHICLEID: row.VEHICLEID,
					LICENSEPLATENUM: row.LICENSEPLATENUM,
					ITYPE: 'THEFT',
					INSURANCETYPE: row.INSURANCETYPE,
					ISSUEDATE: util.formatDate.format(new Date(row.ISSUEDATE), 'yyyy-MM-dd'),
					EFFECTIVEDATE: util.formatDate.format(new Date(row.EFFECTIVEDATE), 'yyyy-MM-dd'),
					EXPIREDATE: row.EXPIREDATE == undefined ? null : util.formatDate.format(new Date(row.EXPIREDATE), 'yyyy-MM-dd'),
					PRICE: row.PRICE,
					INDEMNITYLIMIT: row.INDEMNITYLIMIT,
					RECEIVINGBANKNAME: row.RECEIVINGBANKNAME,
					VIN: row.VIN,
					MODEL: row.MODEL,
					COLOR: row.COLOR,
					NAME: row.NAME,
					GENDER: row.GENDER,
					MOBILE: row.MOBILE,
					ADDRESSHOME: row.ADDRESSHOME,
					IDCARD: row.IDCARD,
					PRODSPEC: row.PRODSPEC,
					PRODMODEL: row.PRODMODEL,
					PRODNUM: row.PRODNUM,
					PRODSNNUM: row.PRODSNNUM,
					INSUCORPNAME: row.INSUCORPNAME,
					INSURANCESTATUS: row.INSURANCESTATUS,
					INSURANCECORPID: row.INSURANCECORPID,
					RECEIVINGBANKID: row.RECEIVINGBANKID,
					INDEMNITYLIMIT: row.INDEMNITYLIMIT,
					VEHICLEENGINENUM:row.VEHICLEENGINENUM,
					CREATEDATE:util.formatDate.format(new Date(row.CREATEDATE), 'yyyy-MM-dd'),
					REMARK:row.REMARK,
					SERIALNUM:row.SERIALNUM,
				}
				this.editFormAgainId = {
					insurancecorpid: row.INSURANCECORPID,
					insucorpname: row.INSUCORPNAME,
					receivingbankid: row.RECEIVINGBANKID,
					receivingbankname: row.RECEIVINGBANKNAME,
					itype: 'THEFT',
					insurancetype: '盗抢险',
				}
				this.thisInput = this.editFormAgain.POLICYNO; //将当前验证的字段 已获得的值存入
			},
			editSubmitAgain() {
				if ($(".is-error").hasClass('is-error')) return;//如果保单号重复
				this.$refs.editFormAgain.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							linkid: this.editFormAgain.ID,
							ownerid:this.editFormAgain.OWNERID,
							policyno: this.editFormAgain.POLICYNO,
							vehicleid: this.editFormAgain.VEHICLEID,
							licenseplatenum: this.editFormAgain.LICENSEPLATENUM,
							issuedate: util.formatDate.format(new Date(this.editFormAgain.ISSUEDATE), 'yyyy-MM-dd'),
							effectivedate: util.formatDate.format(new Date(this.editFormAgain.EFFECTIVEDATE), 'yyyy-MM-dd'),
							expiredate: this.editFormAgain.EXPIREDATE,
							price: this.editFormAgain.PRICE,
							indemnitylimit: this.editFormAgain.INDEMNITYLIMIT,
							beneficiary: this.editFormAgain.BENEFICIARY,
							receivingbankid:this.editFormAgain.RECEIVINGBANKNAME,
							vin: this.editFormAgain.VIN,
							model: this.editFormAgain.MODEL,
							color: this.editFormAgain.COLOR,
							name: this.editFormAgain.NAME,
							gender: this.editFormAgain.GENDER,
							mobile: this.editFormAgain.MOBILE,
							addressHome: this.editFormAgain.ADDRESSHOME,
							idcard: this.editFormAgain.IDCARD,
							prodspec: this.editFormAgain.PRODSPEC,
							prodmodel: this.editFormAgain.PRODMODEL,
							prodnum: this.editFormAgain.PRODNUM,
							prodsnnum: this.editFormAgain.PRODSNNUM,
							insurancestatus: this.editFormAgain.INSURANCESTATUS,
							indemnitylimit: this.editFormAgain.INDEMNITYLIMIT,
							insurancecorpid: this.editFormAgain.INSUCORPNAME,
							itype: this.editFormAgain.ITYPE,
							insurancetype: this.editFormAgain.INSURANCETYPE,
							vehicleenginenum:this.editFormAgain.VEHICLEENGINENUM,
							createdate:util.formatDate.format(new Date(this.editFormAgain.CREATEDATE), 'yyyy-MM-dd'),
							remark:this.editFormAgain.REMARK,
							serialnum:this.editFormAgain.SERIALNUM,
						}
						if(this.editFormAgainId.insucorpname == this.editFormAgain.INSUCORPNAME) {
							para.insurancecorpid = this.editFormAgainId.insurancecorpid;
						} else {
							para.insurancecorpid = this.editFormAgain.INSUCORPNAME;
						}
						if(this.editFormAgainId.receivingbankname == this.editFormAgain.RECEIVINGBANKNAME) {
							para.receivingbankid = this.editFormAgainId.receivingbankid;
						} else {
							para.receivingbankid = this.editFormAgain.RECEIVINGBANKNAME;
						}
						if(this.editFormAgainId.insurancetype == this.editFormAgain.INSURANCETYPE) {
							para.insurancetype = this.editFormAgainId.itype;
						} else {
							para.itype = this.editFormAgain.INSURANCETYPE;
						}
						againInsuranceInfo(para).then((res) => {
							this.editLoading = false;
							if (res.data.result.code ==0 ) {
								this.$message({
									message: '重新出单成功',
									type: 'success'
								});
							}
							this.$refs['editFormAgain'].resetFields();
							this.editFormVisibleAgain = false;
							this.GetInsurances();
						});
					}
				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisible = true;
				this.editForm = {
					ID: row.ID,
					POLICYNO: row.POLICYNO,
					VEHICLEID: row.VEHICLEID,
					LICENSEPLATENUM: row.LICENSEPLATENUM,
					ITYPE: 'THEFT',
					INSURANCETYPE: row.INSURANCETYPE,
					ISSUEDATE: util.formatDate.format(new Date(row.ISSUEDATE), 'yyyy-MM-dd'),
					EFFECTIVEDATE: util.formatDate.format(new Date(row.EFFECTIVEDATE), 'yyyy-MM-dd'),
					EXPIREDATE: row.EXPIREDATE == undefined ? null : util.formatDate.format(new Date(row.EXPIREDATE), 'yyyy-MM-dd'),
					PRICE: row.PRICE,
					INDEMNITYLIMIT: row.INDEMNITYLIMIT,
					RECEIVINGBANKNAME: row.RECEIVINGBANKNAME,
					VIN: row.VIN,
					MODEL: row.MODEL,
					COLOR: row.COLOR,
					NAME: row.NAME,
					GENDER: row.GENDER,
					MOBILE: row.MOBILE,
					ADDRESSHOME: row.ADDRESSHOME,
					IDCARD: row.IDCARD,
					PRODSPEC: row.PRODSPEC,
					PRODMODEL: row.PRODMODEL,
					PRODNUM: row.PRODNUM,
					PRODSNNUM: row.PRODSNNUM,
					INSUCORPNAME: row.INSUCORPNAME,
					INSURANCESTATUS: row.INSURANCESTATUS,
					INSURANCECORPID: row.INSURANCECORPID,
					RECEIVINGBANKID: row.RECEIVINGBANKID,
					INDEMNITYLIMIT: row.INDEMNITYLIMIT,
				}
				this.editFormId = {
					insurancecorpid: row.INSURANCECORPID,
					insucorpname: row.INSUCORPNAME,
					receivingbankid: row.RECEIVINGBANKID,
					receivingbankname: row.RECEIVINGBANKNAME,
					itype: 'THEFT',
					insurancetype: '盗抢险',
				}
				this.thisInput = this.editForm.POLICYNO; //将当前验证的字段 已获得的值存入
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					policyno: '',
					// insurancecorpid:'',
					vehicleid: '',
					vin: '',
					insurancetype: '',
					issuedate: '',
					effectivedate: '',
					expiredate: '',
					price: '',
					indemnitylimit: '',
					beneficiary: '',
					isactive: 1,
					receivingbankname:'',
				};

			},
			//编辑
			editSubmit() {
				if ($(".is-error").hasClass('is-error')) return;//如果保单号重复
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.ID,
							policyno: this.editForm.POLICYNO,
							vehicleid: this.editForm.VEHICLEID,
							licenseplatenum: this.editForm.LICENSEPLATENUM,
							issuedate: util.formatDate.format(new Date(this.editForm.ISSUEDATE), 'yyyy-MM-dd'),
							effectivedate: util.formatDate.format(new Date(this.editForm.EFFECTIVEDATE), 'yyyy-MM-dd'),
							expiredate: this.editForm.EXPIREDATE,
							price: this.editForm.PRICE,
							indemnitylimit: this.editForm.INDEMNITYLIMIT,
							beneficiary: this.editForm.BENEFICIARY,
							// receivingbankname:this.editForm.RECEIVINGBANKNAME,
							receivingbankid:this.editForm.RECEIVINGBANKNAME,
							vin: this.editForm.VIN,
							model: this.editForm.MODEL,
							color: this.editForm.COLOR,
							name: this.editForm.NAME,
							gender: this.editForm.GENDER,
							mobile: this.editForm.MOBILE,
							addressHome: this.editForm.ADDRESSHOME,
							idcard: this.editForm.IDCARD,
							prodspec: this.editForm.PRODSPEC,
							prodmodel: this.editForm.PRODMODEL,
							prodnum: this.editForm.PRODNUM,
							prodsnnum: this.editForm.PRODSNNUM,
							insurancestatus: this.editForm.INSURANCESTATUS,
							INDEMNITYLIMIT: this.editForm.INDEMNITYLIMIT,
							insurancecorpid: this.editForm.INSUCORPNAME,
							itype: this.editForm.ITYPE,
							insurancetype: this.editForm.INSURANCETYPE,
						}
						if(this.editFormId.insucorpname == this.editForm.INSUCORPNAME) {
							para.insurancecorpid = this.editFormId.insurancecorpid;
						} else {
							para.insurancecorpid = this.editForm.INSUCORPNAME;
						}
						if(this.editFormId.receivingbankname == this.editForm.RECEIVINGBANKNAME) {
							para.receivingbankid = this.editFormId.receivingbankid;
						} else {
							para.receivingbankid = this.editForm.RECEIVINGBANKNAME;
						}
						if(this.editFormId.insurancetype == this.editForm.INSURANCETYPE) {
							para.insurancetype = this.editFormId.itype;
						} else {
							para.itype = this.editForm.INSURANCETYPE;
						}
						modifyInsuranceInfo(para).then((res) => {
							this.editLoading = false;
							if (res.data.result.code ==0 ) {
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
							}
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.GetInsurances();
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = {
								id: this.addForm.ID,
								policyno: this.addForm.POLICYNO,
								vehicleid: this.addForm.VEHICLEID,
								vin: this.addForm.VIN,
								insurancetype: this.addForm.INSURANCETYPE,
								issuedate: this.addForm.ISSUEDATE,
								effectivedate: this.addForm.EFFECTIVEDATE,
								expiredate: this.addForm.EXPIREDATE,
								price: this.addForm.PRICE,
								indemnitylimit: this.addForm.INDEMNITYLIMIT,
								beneficiary: this.addForm.BENEFICIARY,
								receivingbankname:this.addForm.RECEIVINGBANKNAME,
								isactive: this.addForm.ISACTIVE,
							}
							addInsuranceInfo(para).then((res) => {
								this.addLoading = false;
								if (res.data.result.code ==0 ) {
									this.$message({
										message: '新增成功',
										type: 'success'
									});
								}
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.GetInsurances();
							});
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
					let para = {
						ids: ids,
						method: "delete"
					};
					removeInsuranceInfo(para).then((res) => {
						this.listLoading = false;
						if (res.data.result.code ==0 ) {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
						this.GetInsurances();
					});
				}).catch(() => {

				});
			}
		},
		activated() {
			this.GetInsurances();
		}

	}
</script>