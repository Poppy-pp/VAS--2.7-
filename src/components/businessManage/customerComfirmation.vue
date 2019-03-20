<!--* 
* @description: 报单查询 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
				<el-row :gutter="10" class="colflex">
					<el-col :span="4">
						<el-form-item prop="orderno" class="sf100">
							<el-input v-model="filters.orderno" @keyup.native.enter="getTodo" placeholder="请输入订单号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="assignee" class="sf100">
							<el-select v-model="filters.assignee" clearable remote filterable :remote-method="remoteGsMethod" :loading="copsUerLoading" placeholder="请输入当前处理人">
								<el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="salername" class="sf100">
							<el-select v-model="filters.salername" clearable remote filterable :remote-method="remoteGsMethod" :loading="copsUerLoading" placeholder="请输入业务员姓名">
								<el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.employeename">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="apply_stolen_insurance" class="sf100">
							<el-select v-model="filters.apply_stolen_insurance" clearable filterable placeholder="请选择产品类型">
								<el-option v-for="item in stolen" :key="item.value" :label="item.value" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="ownername" class="sf100">
							<el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="vin" class="sf100">
							<el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="startDate" class="sf100">
							<el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="colflex4">
					<el-form-item style="float:right;margin-right:0;">
						<el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
						<el-button @click="resetForm('filters')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>

		<!--列表 -->
		<el-table border stripe :max-height="windowOutHeight-250" :data="todo" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orderno" align="center" label="订单号" width="180">
			</el-table-column>
			<el-table-column prop="orderno" align="center" label="订单来源">
				<template scope="scope">
					<template v-if="scope.row.orderno">
						{{ scope.row.orderno.indexOf("ZH") > 0 ? "车贷系统" : "VAS系统" }}
					</template>
					<template v-else>
						VAS系统
					</template>
				</template>
			</el-table-column>
			</el-table-column>
			<el-table-column prop="assignee_name" align="center" label="当前处理人" width="100">
			</el-table-column>
			<el-table-column prop="status" align="center" label="当前状态" width="100">
				<template scope="scope">
					<template v-if="scope.row.status == 1">
						<el-tag type="primary" style="font-weight:bold;">已申请</el-tag>
					</template>
					<template v-if="scope.row.status == 2">
						<el-tag type="primary" style="font-weight:bold;">已派单</el-tag>
					</template>
					<template v-if="scope.row.status == 3">
						<el-tag type="primary" style="font-weight:bold;">已接单</el-tag>
					</template>
					<template v-if="scope.row.status == 4">
						<el-tag type="primary" style="font-weight:bold;">已安装</el-tag>
					</template>
					<template v-if="scope.row.status == 5">
						<el-tag type="primary" style="font-weight:bold;">已审核</el-tag>
					</template>
					<template v-if="scope.row.status == 6">
						<el-tag type="primary" style="font-weight:bold;">保险已出单</el-tag>
					</template>
					<template v-if="scope.row.status == 7">
						<el-tag type="success" style="font-weight:bold;">订单完成</el-tag>
					</template>
					<template v-if="scope.row.status == -1">
						<el-tag style="font-weight:bold;">已申请取消</el-tag>
					</template>
					<template v-if="scope.row.status == -2">
						<el-tag type="success" style="font-weight:bold;">取消成功</el-tag>
					</template>
					<template v-if="scope.row.status == -3">
						<el-tag style="font-weight:bold;">已申请拆除</el-tag>
					</template>
					<template v-if="scope.row.status == -4">
						<el-tag type="success" style="font-weight:bold;">拆除成功</el-tag>
					</template>
					<template v-if="scope.row.status == -5">
						<el-tag type="gray" style="font-weight:bold;">安装退回</el-tag>
					</template>
					<template v-if="scope.row.status == -6">
						<el-tag type="danger" style="font-weight:bold;">订单删除</el-tag>
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="corpname" align="center" label="客户名称" width="100">
			</el-table-column>
			<el-table-column prop="vin" align="center" label="车架号" width="200">
			</el-table-column>
			<el-table-column prop="ownername" align="center" label="车主名字">
				<template scope="scope">
					{{ scope.row.ownername }}
				</template>
			</el-table-column>
			<el-table-column prop="model" align="center" label="安装目标车辆" width="200">
			</el-table-column>
			<el-table-column prop="installapplyinsu" align="center" label="申请安装保险设备数量" width="110">
				<template scope="scope">
					{{ scope.row.installapplyinsu }}台
				</template>
			</el-table-column>
			<el-table-column prop="installapplymorn" align="center" label="申请安装常规设备数量" width="110">
				<template scope="scope">
					{{ scope.row.installapplymorn?scope.row.installapplymorn:0 }}台
				</template>
			</el-table-column>
			<el-table-column prop="apply_stolen_insurance" align="center" label="产品类型">
				<template scope="scope">
					{{ scope.row.apply_stolen_insurance == 0 ? "已购买保险" : "未购买保险" }}
				</template>
			</el-table-column>
			<el-table-column prop="salername" align="center" label="业务员姓名" width="120">
			</el-table-column>
			<el-table-column prop="salermobile" align="center" label="业务员手机号" width="150">
			</el-table-column>
			<el-table-column prop="installapplydate" align="center" label="申请安装日期" :formatter="dateFormatter" width="130">
			</el-table-column>
			<el-table-column prop="installgroupname" align="center" label="安装组" width="150">
			</el-table-column>
			<el-table-column prop="installname" align="center" label="安装组员" width="100">
			</el-table-column>
			<el-table-column prop="" align="center" :formatter="installaddress" label="安装详细地址" width="150">
			</el-table-column>
			<el-table-column prop="carstatus" align="center" :formatter="carStatus" label="车辆情况" width="100">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" :disabled="scope.row.status < 0" @click="showDetail(scope.$index, scope.row)">确认订单</el-button>
					<el-button size="small" @click="formDetailHandle(scope.$index, scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15,50,80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
		</el-pagination>

		<!--  流程查看 -->
		<el-dialog title="当前进度" :modal-append-to-body="false" :visible.sync="dialogTableVisible" top="4%" size="small" :close-on-press-escape="false" class="rpShowimgDialog">
			<el-row>
				<el-col :span="24" class="cbstyle">
					<el-steps :space="150" process-status="finish" :active="active" finish-status="success" :center="center" :align-center="alignCenter" space="20%" simple>
						<el-step title="报单"></el-step>
						<el-step title="文员核单/派单">
							</div>
						</el-step>
						<el-step title="施工审核/施工"></el-step>
						<el-step title="审核"></el-step>
						<el-step title="保险出单"></el-step>
						<el-step title="完成"></el-step>
					</el-steps>
					<el-collapse v-model="activeNames" class="bdcoll mt20" id="collesace">
						<el-collapse-item title="报单信息" name="10" v-if="active >= 1" class="lefw10 wzpdt10">
							<el-row>
								<el-col :span="8">
									<dl class="dllist">
										<dt>报单类型:</dt>
										<dd>{{ ruleFormStatic.declaretype }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>客户名称:</dt>
										<dd v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</dd>
									</dl>
								</el-col>
							</el-row>

							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>业务员:</dt>
										<dd>{{ ruleFormStatic.salername }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>业务员联系电话:</dt>
										<dd>{{ ruleFormStatic.salermobile }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>责任人:</dt>
										<dd v-if="ruleFormStatic.declarEmployee">{{ ruleFormStatic.declarEmployee.employeename }}</dd>
									</dl>
								</el-col>
							</el-row>

							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>姓名:</dt>
										<dd>{{ ruleFormStatic.ownerInfo.name }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车主电话:</dt>
										<dd>{{ ruleFormStatic.ownerInfo.mobile }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>证件号码:</dt>
										<dd>{{ ruleFormStatic.ownerInfo.idcard }}</dd>
									</dl>
								</el-col>
							</el-row>
							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>车辆型号:</dt>
										<dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车辆颜色:</dt>
										<template v-if="ruleFormStatic.vehicleInfo.color">
											<dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
											<dd v-else>
												<span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
											</dd>
										</template>
										<template v-else>
											<dd>--</dd>
										</template>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车牌号:</dt>
										<dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车架号:</dt>
										<dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>受理银行:</dt>
										<dd>{{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车价:</dt>
										<dd v-if="ruleFormStatic.vehicleInfo.price">{{ ruleFormStatic.vehicleInfo.price }}元</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>是否有盗抢险:</dt>
										<dd v-if="ruleFormStatic.vehicleInfo.hastheftinsurance">{{ ruleFormStatic.vehicleInfo.hastheftinsurance == 1 ? '有':'无' }}</dd>
									</dl>
								</el-col>
							</el-row>
							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装保险产品数量:</dt>
										<dd v-if="ruleFormStatic.installapplyinsu">{{ ruleFormStatic.installapplyinsu ? ruleFormStatic.installapplyinsu : 0 }}台</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装常规产品数量:</dt>
										<dd v-if="ruleFormStatic.installapplymorn">{{ ruleFormStatic.installapplymorn ? ruleFormStatic.installapplymorn : 0 }}台</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装地址:</dt>
										<dd v-if="ruleFormStatic.installaddress">{{ ruleFormStatic.installaddress }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>预约安装日期:</dt>
										<dd>{{ ruleFormStatic.installapplydate }}</dd>
									</dl>
								</el-col>
								<el-col :span="16">
									<dl class="dllist">
										<dt>安装说明:</dt>
										<dd style="color:red;">默认安装的保险产品为有线车载终端(有源)，常规产品为无线车载终端(无源)。</dd>
									</dl>
								</el-col>

								<el-col :span="24">
									<dl class="dllist">
										<dt>报单备注:</dt>
										<dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
									</dl>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="派单信息" name="12" v-if="active >= 2" class="lefw10 wzpdt10">
							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装小组:</dt>
										<dd>{{ ruleFormStatic.installGroupInfo.groupname}}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>安装人员:</dt>
										<dd v-if="ruleFormStatic.installEmployee.employeename">{{ ruleFormStatic.installEmployee.employeename }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>车辆情况选项:</dt>
										<dd v-if="ruleFormStatic.carstatus">{{ ruleFormStatic.carstatus?"已到":"未到" }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>服务年限:</dt>
										<dd v-if="ruleFormStatic.vehicleInfo.yearsofservice">{{ ruleFormStatic.vehicleInfo.yearsofservice }}年</dd>
									</dl>
								</el-col>
								<el-col :span="16">
									<dl class="dllist">
										<dt>备注:</dt>
										<dd>{{ ruleFormStatic.flowData.send_remark }}</dd>
									</dl>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="设备安装（车信息）" name="13" class="enlargeArea lefw10" v-if="active >= 3">
							<el-row class="mt5">
								<el-col :span="24">
									<dl class="dllist lh55_mb10">
										<dt>车辆拍照信息:</dt>
										<dd>
											<img width="60" height="60" class="image" v-if="ruleFormStatic.installpic1" :src="$store.state.IMG_URL+ruleFormStatic.installpic1">
											<img width="60" height="60" class="image" v-if="ruleFormStatic.installpic2" :src="$store.state.IMG_URL+ruleFormStatic.installpic2">
											<img width="60" height="60" class="image" v-if="ruleFormStatic.installpic3" :src="$store.state.IMG_URL+ruleFormStatic.installpic3">
											<img width="60" height="60" class="image" v-if="ruleFormStatic.installpic4" :src="$store.state.IMG_URL+ruleFormStatic.installpic4">
											<img width="60" height="60" class="image" v-if="ruleFormStatic.installpic5" :src="$store.state.IMG_URL+ruleFormStatic.installpic5">
										</dd>
									</dl>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="设备地图实时位置" name="10086" class="enlargeArea" v-if="ruleFormStatic.installDetails && ruleFormStatic.installDetails.length>0">
							<template slot="title">
								<div class="fl sebei" style="margin-right:10px;">设备地图实时位置</div>
								<el-button @click.stop="realTimeRefreshPro3" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
							</template>
							<el-row class="mt5">
								<el-col :span="24">
									<gdmap3 ref="vueAmap3"></gdmap3>
								</el-col>
							</el-row>
						</el-collapse-item>
						<template v-for="(item,index) in ruleFormStatic.installDetails">
							<el-collapse-item :title="item.packInfo.E_PRODTYPE+'设备'+item.packInfo.E_PRODMODEL" :name="(++index)+''" class="enlargeArea lefw10">
								<el-row class="mt5">
									<el-col :span="8">
										<dl class="dllist">
											<dt>安装位置:</dt>
											<dd>{{ item.installpositionname }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备初始状态：</dt>
											<dd v-if="item.onlinestatus">{{ item.onlinestatus == 0 ? "未上线" : "在线" }}</dd>
											<dd v-else>未上线</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备编号:</dt>
											<dd>{{ item.packInfo.E_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备类型:</dt>
											<dd>{{ item.packInfo.E_PRODTYPE }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备型号:</dt>
											<dd>{{ item.packInfo.E_PRODMODEL }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>SIM卡号:</dt>
											<dd>{{ item.packInfo.C_PRODUNUM }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>iccid:</dt>
											<dd>{{ item.packInfo.SIMCARDID }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>卡类型:</dt>
											<dd>{{ item.packInfo.C_PRODMODEL }}</dd>
										</dl>
									</el-col>
									<el-col :span="8">
										<dl class="dllist">
											<dt>设备实时状态：</dt>
											<dd v-if="item.curonlinestatus">{{ item.curonlinestatus }}</dd>
										</dl>
									</el-col>
									<el-col :span="16">
										<dl class="dllist">
											<dt>实时位置信息：</dt>
											<dd v-if="item.curaddress">{{ item.curaddress }}</dd>
										</dl>
									</el-col>
									<el-col :span="24">
										<dl class="dllist">
											<dt>设备备注:</dt>
											<dd>{{ item.remark }}</dd>
										</dl>
									</el-col>
									<el-col :span="24">
										<dl class="dllist lh55_mb10">
											<dt>设备拍照信息:</dt>
											<dd>
												<img width="60" height="60" v-for="(item,index) in item.pictures" :title="item.picdesc" class="image" :src="$store.state.IMG_URL+item.piclink">
											</dd>
										</dl>
									</el-col>
								</el-row>
							</el-collapse-item>
						</template>
						<el-collapse-item title="审核信息" name="14" v-if="active >= 4" class="lefw10">
							<el-form label-position="left" inline label-width="110px" class="demo-table-expand">
								<el-form-item label="备注" prop="service_verify_remark">
									<span>{{ ruleFormStatic.flowData.service_verify_remark }}</span>
								</el-form-item>
							</el-form>
						</el-collapse-item>

						<el-collapse-item title="保险信息" name="15" v-if="active >= 5" class="lefw10 wzpdt10">
							<el-row class="mt5">
								<el-col :span="8">
									<dl class="dllist">
										<dt>保险公司:</dt>
										<dd>{{ ruleFormStatic.insuranceInfo.insurancecorpid}}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>保单号:</dt>
										<dd>{{ ruleFormStatic.serialnum }}</dd>
									</dl>
								</el-col>
								<el-col :span="8">
									<dl class="dllist">
										<dt>保单状态:</dt>
										<dd>{{ ruleFormStatic.insurancestatus }}</dd>
									</dl>
								</el-col>
								<el-col :span="24">
									<dl class="dllist">
										<dt>备注:</dt>
										<dd>{{ ruleFormStatic.insurance_remark }}</dd>
									</dl>
								</el-col>
							</el-row>
						</el-collapse-item>
						<el-collapse-item title="评价" name="15" v-if="active >= 5" class="lefw10 wzpdt10">
							<evaluate :corpid="ruleFormStatic.corpid" :declarationid="ruleFormStatic.id" @childKzDialogTableVisible="childKzDialogTableVisible"></evaluate>
						</el-collapse-item>
					</el-collapse>
				</el-col>
			</el-row>
		</el-dialog>

		<!-- 订单详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" top="10%" class="formdetail" :visible.sync="formDialogTableVisible" size="small">
			<el-tabs v-model="dialogActiveName">
				<el-tab-pane label="订单详情" name="1">
					<el-row class="plr40">
						<el-col :span="24">
							<span class="formTile">订单信息</span>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>订单编号:</dt>
								<dd>{{ ruleFormStatic.orderno }}</dd>
							</dl>
							<dl class="dllist">
								<dt>订单类型:</dt>
								<dd>{{ ruleFormStatic.declaretype }}</dd>
							</dl>
							<dl class="dllist">
								<dt>客户名称:</dt>
								<dd>{{ ruleFormStatic.corporateInfo.corpname }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>业务员:</dt>
								<dd>{{ ruleFormStatic.salername }}</dd>
							</dl>
							<dl class="dllist">
								<dt>业务员联系电话:</dt>
								<dd>{{ ruleFormStatic.salermobile }}</dd>
							</dl>
							<dl class="dllist">
								<dt>服务期限:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo.yearsofservice">{{ ruleFormStatic.vehicleInfo.yearsofservice }}年</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>责任人:</dt>
								<dd v-if="ruleFormStatic.declarEmployee">{{ ruleFormStatic.declarEmployee.employeename }}</dd>
							</dl>
							<dl class="dllist">
								<dt>责任人电话:</dt>
								<dd v-if="ruleFormStatic.declarEmployee">{{ ruleFormStatic.declarEmployee.mobile }}</dd>
							</dl>
						</el-col>
						<el-col :span="24">
							<dl class="dllist">
								<dt>订单描述:</dt>
								<dd>{{ ruleFormStatic.flowData.proc_new_build_desc }}</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="plr40">
						<el-col :span="24" v-if="ruleFormStatic.flowData.apply_remark">
							<dl class="dllist">
								<dt>报单备注:</dt>
								<dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="24" v-if="ruleFormStatic.flowData.send_remark">
							<dl class="dllist">
								<dt>派单备注:</dt>
								<dd>{{ ruleFormStatic.flowData.send_remark }}</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="plr40">
						<el-col :span="24" v-if="ruleFormStatic.flowData.work_remark">
							<dl class="dllist">
								<dt>施工备注:</dt>
								<dd>{{ ruleFormStatic.flowData.work_remark }}</dd>
							</dl>
						</el-col>
						<el-col :span="24" v-if="ruleFormStatic.flowData.service_verify_remark">
							<dl class="dllist">
								<dt>审核备注:</dt>
								<dd>{{ ruleFormStatic.flowData.service_verify_remark }}</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="pmbt">
						<el-col :span="24">
							<span class="formTile">车主信息</span>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>姓名:</dt>
								<dd>{{ ruleFormStatic.ownerInfo.name }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>证件类型:</dt>
								<dd>居民身份证</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>证件号码:</dt>
								<dd>{{ ruleFormStatic.ownerInfo.idcard }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车主电话:</dt>
								<dd>{{ ruleFormStatic.ownerInfo.mobile }}</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="mt15 pmbt">
						<el-col :span="24">
							<span class="formTile">车辆信息</span>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车牌号:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
							</dl>
							<dl class="dllist">
								<dt>车辆颜色:</dt>
								<template v-if="ruleFormStatic.vehicleInfo.color">
									<dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
									<dd v-else>
										<span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
									</dd>
								</template>
								<template v-else>
									<dd>--</dd>
								</template>
							</dl>
							<dl class="dllist">
								<dt>是否购买盗抢险:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.hastheftinsurance == '1' ? '已购买': '没有购买' }}</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车架号:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>
							</dl>
							<dl class="dllist">
								<dt>车辆购置价:</dt>
								<dd v-if="ruleFormStatic.vehicleInfo.price">{{ ruleFormStatic.vehicleInfo.price }}元</dd>
							</dl>
						</el-col>
						<el-col :span="8">
							<dl class="dllist">
								<dt>车型:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>
							</dl>
							<dl class="dllist">
								<dt>受理银行:</dt>
								<dd>{{ ruleFormStatic.vehicleInfo.receivingbank.corpname }}</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="mt15 pmbt">
						<el-col :span="24">
							<span class="formTile">施工信息</span>
						</el-col>
						<el-col :span="6">
							<dl class="dllist">
								<dt>保险产品数量:</dt>
								<dd>{{ ruleFormStatic.installapplyinsu }}台</dd>
							</dl>
						</el-col>
						<el-col :span="6">
							<dl class="dllist">
								<dt>常规产品数量:</dt>
								<dd>{{ ruleFormStatic.installapplymorn }}台</dd>
							</dl>
						</el-col>
						<el-col :span="6">
							<dl class="dllist">
								<dt>安装小组:</dt>
								<dd>{{ ruleFormStatic.installGroupInfo.groupname }}</dd>
							</dl>
						</el-col>
						<el-col :span="6">
							<dl class="dllist">
								<dt>安装人员:</dt>
								<dd>{{ ruleFormStatic.installEmployee.employeename }}</dd>
							</dl>
						</el-col>
						<el-col :span="24">
							<dl class="dllist">
								<dt>安装说明:</dt>
								<dd style="color:red;">默认安装的保险产品为有线车载终端(有源)，常规产品为无线车载终端(无源)。</dd>
							</dl>
						</el-col>
					</el-row>
					<el-row class="mt15 pmbt">
						<el-col :span="24">
							<span class="formTile" style="float:left;margin-right:5px;">已安装设备信息</span>
							<el-button @click="realTimeRefreshPro" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
						</el-col>
						<el-col :span="8" v-for="(item,index) in ruleFormStatic.installDetails">
							<dl class="dllist">
								<dt>设备类型：</dt>
								<dd>{{ item.packInfo.E_PRODTYPE }}</dd>
							</dl>
							<dl class="dllist">
								<dt>设备型号：</dt>
								<dd>{{ item.packInfo.E_PRODMODEL }}</dd>
							</dl>
							<dl class="dllist">
								<dt>设备号：</dt>
								<dd>{{ item.packInfo.E_PRODUNUM }}</dd>
							</dl>
							<dl class="dllist">
								<dt>卡类型：</dt>
								<dd>{{ item.packInfo.C_PRODMODEL }}</dd>
							</dl>
							<dl class="dllist">
								<dt>SIM卡号：</dt>
								<dd>{{ item.packInfo.C_PRODUNUM }}</dd>
							</dl>
							<dl class="dllist">
								<dt>安装位置：</dt>
								<dd>{{ item.installpositionname }}</dd>
							</dl>
							<dl class="dllist">
								<dt>设备初始状态：</dt>
								<dd v-if="item.onlinestatus">{{ item.onlinestatus == 0 ? "未上线" : "在线" }}</dd>
								<dd v-else>未上线</dd>
							</dl>
							<dl class="dllist">
								<dt>设备实时状态：</dt>
								<dd v-if="item.curonlinestatus">{{ item.curonlinestatus }}</dd>
							</dl>
							<dl class="dllist">
								<dt>实时位置信息：</dt>
								<dd v-if="item.curaddress">{{ item.curaddress }}</dd>
							</dl>
						</el-col>
						<el-col>
							<gdmap v-if="ruleFormStatic.installDetails && ruleFormStatic.installDetails.length>0" ref="vueAmap"></gdmap>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="历史记录" name="2">
					<el-table :data="opHistoryData" v-loading="historyListLoading" style="width: 100%">
						<el-table-column prop="name" align="center" label="操作状态">
						</el-table-column>
						<el-table-column prop="assignee_name" align="center" label="操作人">
						</el-table-column>
						<el-table-column align="center" prop="end_time" label="时间">
						</el-table-column>
						<el-table-column prop="task_vars" align="center" label="操作记录" :formatter="taskFormatter">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->
	</section>
</template>

<style scoped>
	@import 'css/customerDeclaration.css';
</style>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import gdmap from 'components/map/gdmap2';
	import gdmap3 from 'components/map/gdmap3';
	import evaluate from 'components/comment/evaluate';
	import { queryApprovalperInfo, getvariablesTaskKeyInfoList, getCorpNameList, getDeptManagerInfoList, getOnlineList, cldeviceIsOnstate, getOperationRecord } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		components: {
			gdmap,
			gdmap3,
			evaluate
		},
		data() {
			return {
				todo: [], //处理表格列表数据
				opHistoryData: [],
				historyListLoading: false,
				active: 0,
				center: true,
				realTimeRefreshLoading: false,
				alignCenter: true,
				act_status: 0,
				//公司下拉loading初始化
				copLoading: false,
				dialogTableVisible: false,
				userDataList: [],
				user: '',
				copsUerLoading: false,
				activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '10086'],
				ruleFormStatic: {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {
							corpname: ''
						}
					},
					corporateInfo: {},
					insuranceInfo: {
						insurancecorpid: ''
					},
					ownerInfo: {
						name: '',
						idcard: '',
						mobile: ''
					},
					flowData: {
						verify_result: '',
						apply_remark: ''
					},
					declarEmployee: {},
					installEmployee: {
						employeename: ''
					},
					installGroupInfo: {
						groupname: ''
					}
				},
				//搜索 筛选信息
				filters: {
					startDate: '',
					ownername: '',
					orderno: '',
					vin: '',
					apply_stolen_insurance: '',
					salername: '',
					assignee: '',
					status: '',
					corpname: ''
				},
				stolen: [{
					value: "已购买保险",
					id: 0
				}, {
					value: "未购买保险",
					id: 1
				}],
				actNode: [{
						value: "已申请",
						id: "1"
					},
					{
						value: "已派单",
						id: "2"
					},
					{
						value: "已接单",
						id: "3"
					},
					{
						value: "已安装",
						id: "4"
					},
					{
						value: "已审核",
						id: "5"
					},
					{
						value: "保险已出单",
						id: "6"
					},
					{
						value: "订单完成",
						id: "7"
					},
					{
						value: "已申请取消",
						id: "-1"
					},
					{
						value: "取消成功",
						id: "-2"
					},
					{
						value: "已申请拆除",
						id: "-3"
					},
					{
						value: "拆除成功",
						id: "-4"
					},
					{
						value: "安装退回",
						id: "-5"
					},
					{
						value: "订单删除",
						id: "-6"
					},
				],
				copName: [],
				total: 0,
				currentPage: 0,
				listLoading: false,
				pageSize: 15,
				dialogActiveName: '1',
				formDialogTableVisible: false
			}
		},
		methods: {
			//输入关键字查询员工
			remoteGsMethod: function(query) {
				if(query !== '') {
					let para = {
						employeename: query
					};
					this.loading = true;
					getDeptManagerInfoList(para).then((res) => {
						this.userDataList = res.data.data.records;
						this.copsUerLoading = false;
					});
				} else {
					let para = {
						showCount: 15
					};
					getDeptManagerInfoList(para).then((res) => {
						this.userDataList = res.data.data.records;
						this.copsUerLoading = false;
					});
				}
			},
			//操作公司下拉查询
			changeCop: function(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000
				}
				getCorpNameList(para).then((res) => {
					this.copName = res.data.data.records;
					this.copLoading = false;
				});
			},
			//操作公司下拉 点击返回value值
			changeVal: function(item) {},
			//是否有盗抢险转换
			hasinsuranceFormat: function(row, col) {
				return row.hastheftinsurance == 1 ? '有' : '无';
			},
			getOperationRecord: function(row) {
				let para = {
					orderno: row.orderno
				}
				this.historyListLoading = true;
				getOperationRecord(para).then((res) => {
					this.historyListLoading = false;
					if(res.data.result.code == 0) {
						this.opHistoryData = res.data.data;
					}
				});
			},
			taskFormatter: function(row, col) {
				let task_vars = row.task_vars;
				if(task_vars) {
					return(task_vars.result ? "通过" : "拒绝") + (task_vars.remark ? '-备注说明：' + task_vars.remark : "");
				} else {
					return "";
				}
			},
			//时间转换
			dateFormatter: function(row, col) {
				return util.formatDate.format(new Date(row.installapplydate), 'yyyy-MM-dd');
			},
			//删除字段的转换
			deleteFormat: function(row, col) {
				return row.isdelete == 1 ? '删除' : '未删除';
			},
			//审批结论
			approveStatusFormat: function(row, col) {
				return row.approvestatus == 1 ? '同意' : '拒绝';
			},
			carStatus: function(row) {
				return row.carstatus == 1 ? '已到' : '未到';
			},
			showDetail: function(index, row) {
				this.ruleFormStatic = {
					vehicleInfo: {
						model: '',
						color: '',
						licenseplatenum: '',
						vin: '',
						price: '',
						yearsofservice: '',
						receivingbank: {
							corpname: ''
						}
					},
					corporateInfo: {},
					insuranceInfo: {
						insurancecorpid: ''
					},
					ownerInfo: {
						name: '',
						idcard: '',
						mobile: ''
					},
					flowData: {
						verify_result: '',
						apply_remark: ''
					},
					declarEmployee: {},
					installEmployee: {
						employeename: ''
					},
					installGroupInfo: {
						groupname: ''
					}
				};
				//当前进行到哪一步
				if(row.status > 0) this.active = parseInt(row.status);
				//初始化图片查看器
				$("div.rpShowimgDialog").on("click", ".image", function(e) {
					$("div.rpShowimgDialog").viewer({
						zIndex: 999999999
					});
				});
				this.dialogTableVisible = true;
				this.getFormData(row);
			},
			//子类关闭打分弹窗
			childKzDialogTableVisible: function() {
				this.dialogTableVisible = false;
			},
			//报单详情查看
			formDetailHandle: function(index, row) {
				this.formDialogTableVisible = true;
				this.getOperationRecord(row);
				this.getFormData(row);
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getTodo();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTodo();
			},
			queryTodo: function() {
				this.getTodo();
			},
			//清空查询表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			installaddress: function(row, col) {
				if(row.installaddresscode) {
					return row.installaddresscode.split(" ").join("") + row.installaddress ? row.installaddress : '';
				} else {
					return row.installaddress ? row.installaddress : '';
				}
			},
			remarkFormatter: function(row, col) {},
			dismantle: function(index, row) {
				this.$store.state.item = row;
				this.$router.push("/dismantle/")
			},
			//获报单查询列表
			getTodo() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					order: "desc",
					orderno: this.filters.orderno,
					startTime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
					endTime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
					corpid: this.user.corporateInfo.id,
					ownername: this.filters.ownername,
					salername: this.filters.salername,
					apply_stolen_insurance: this.filters.apply_stolen_insurance,
					assignee: this.filters.assignee,
					status: 5,
					vin: this.filters.vin
				};
				this.listLoading = true;
				queryApprovalperInfo(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0) {
						this.total = res.data.data.totalResult;
						this.todo = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//实时获取设备位置 和 在线情况
			realTimeRefreshPro3: function() {
				let pro = this.ruleFormStatic;
				if(this.$refs.vueAmap3) this.$refs.vueAmap3.clearMap();
				if(pro.installDetails.length > 0) {
					let ind = 0,
						ind2 = 0;
					this.realTimeRefreshLoading = true;
					pro.installDetails.forEach((item, index) => {
						let para = {
							id: item.packInfo.E_PRODUNUM,
							// id:29162700777
						}
						cldeviceIsOnstate(para).then((res) => {
							let data = res.data.data;
							this.realTimeRefreshLoading = false;
							if(data) {
								if(data.online == true) {
									this.ruleFormStatic.installDetails[ind].curonlinestatus = data.statedesc;
									this.$refs.vueAmap3.getAddress([data.lng, data.lat], item.packInfo.E_PRODUNUM, (res) => {
										this.ruleFormStatic.installDetails[ind2].curaddress = res;
										ind2++;
									});
								} else {
									this.ruleFormStatic.installDetails[ind].curonlinestatus = "未上线";
									this.ruleFormStatic.installDetails[ind].curaddress = "无定位";
								}
							} else {
								this.ruleFormStatic.installDetails[ind].curaddress = "无定位";
								this.ruleFormStatic.installDetails[ind].curonlinestatus = "未在线";
							}
							ind++;
						});
					});
				}
			},
			//实时获取设备位置 和 在线情况
			realTimeRefreshPro: function() {
				let pro = this.ruleFormStatic;
				if(this.$refs.vueAmap) this.$refs.vueAmap.clearMap();
				if(pro.installDetails.length > 0) {
					let ind = 0,
						ind2 = 0;
					this.realTimeRefreshLoading = true;
					pro.installDetails.forEach((item, index) => {
						let para = {
							id: item.packInfo.E_PRODUNUM,
							// id:29162700777
						}
						cldeviceIsOnstate(para).then((res) => {
							let data = res.data.data;
							this.realTimeRefreshLoading = false;
							if(data) {
								if(data.online == true) {
									this.ruleFormStatic.installDetails[ind].curonlinestatus = data.statedesc;
									this.$refs.vueAmap.getAddress([data.lng, data.lat], item.packInfo.E_PRODUNUM, (res) => {
										this.ruleFormStatic.installDetails[ind2].curaddress = res;
										ind2++;
									});
								} else {
									this.ruleFormStatic.installDetails[ind].curonlinestatus = "未上线";
									this.ruleFormStatic.installDetails[ind].curaddress = "无定位";
								}
							} else {
								this.ruleFormStatic.installDetails[ind].curaddress = "无定位";
								this.ruleFormStatic.installDetails[ind].curonlinestatus = "未在线";
							}
							ind++;
						});
					});
				}
			},
			//根据任务id获取表单信息
			getFormData: function(obj) {
				if(!obj) return;
				//获取填写的任务变量值
				let pa = {
					taskId: obj.ID
				};
				nanobar.go(60);
				getvariablesTaskKeyInfoList(pa).then((res) => {
					let _this = this,
						data = res.data.data;
					nanobar.go(100);
					if(!data.vehicleInfo) {
						data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
					}
					if(!data.ownerInfo) {
						data.ownerInfo = _this.ruleFormStatic.ownerInfo;
					}
					if(!data.installEmployee) {
						data.installEmployee = _this.ruleFormStatic.installEmployee;
					}
					if(!data.installGroupInfo) {
						data.installGroupInfo = _this.ruleFormStatic.installGroupInfo;
					}
					if(!data.flowData) {
						data.flowData = _this.ruleFormStatic.flowData;
					}
					if(!data.vehicleInfo.receivingbank) {
						data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
					}
					if(!data.insuranceInfo) {
						data.insuranceInfo = _this.ruleFormStatic.insuranceInfo;
					}
					_this.ruleFormStatic = data;
					if(this.dialogTableVisible) {
						this.realTimeRefreshPro3();
					} else {
						this.realTimeRefreshPro();
					}
				}).catch((error) => {
					nanobar.go(100);
				});
			},
		},
		//初始化数据
		created() {
			this.user = JSON.parse(sessionStorage.getItem('user'));
			console.log(this.user)
			this.getTodo();
		}
	}
</script>