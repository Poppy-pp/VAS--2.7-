<!--* 
* @description: 我的待办 -维修单管理
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section>
        <el-col :span="24" class="mb10">
            <el-radio-group v-model="stepState" size="medium" @change="changeStateHandle">
                <el-radio-button :disabled="listLoading" label="0">全部:{{ fromNum.num0 }}</el-radio-button>
                <el-radio-button :disabled="listLoading" label="1">报单:{{ fromNum.num1 }}</el-radio-button>
                <el-radio-button :disabled="listLoading" label="2">文员核单/派单:{{ fromNum.num2 }}</el-radio-button>
                <el-radio-button :disabled="listLoading" label="3">施工审核/施工:{{ fromNum.num3 }}</el-radio-button>
                <el-radio-button :disabled="listLoading" label="4">审核:{{ fromNum.num4 }}</el-radio-button>
            </el-radio-group>
        </el-col>
        <!--报单中心列表 新装单子 拆除单子 售后单子  start-->
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
                        <el-form-item prop="vehicle_licenseplatenum" class="sf100">
                            <el-input v-model="filters.vehicle_licenseplatenum" @keyup.native.enter="getTodo" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="vin" class="sf100">
                            <el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="ownername" class="sf100">
                            <el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="corpid" class="sf100">
                            <el-select v-model="filters.corpid" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable remote :remote-method="corpChangeSelect">
                                <el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="apply_userid" class="sf100">
                            <el-select v-model="filters.apply_userid" clearable @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入报单人">
                                <el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="startDate" class="sf100">
                            <el-date-picker style="width:100%;" v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="报单开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="name" class="sf100">
                            <el-select v-model="filters.name" clearable filterable placeholder="请选择当前节点">
                                <el-option v-for="item in statusDataList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="assignee" class="sf100">
                            <el-select v-model="filters.assignee" @visible-change="empChange" clearable remote filterable :remote-method="empChangeSelect" :loading="empLoading" placeholder="请输入当前处理人">
                                <el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.userid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="work_user_id" class="sf100">
                            <el-select v-model="filters.work_user_id" clearable remote filterable @visible-change="leaderChange" :remote-method="leaderChangeSelect" :loading="empLoading" placeholder="请输入安装人">
                                            <el-option v-for="item in userDataList" :key="item.employeename" :label="item.employeename" :value="item.ID">
                                            </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="vehicle_hastheftinsurance" class="sf100">
                            <el-select v-model="filters.vehicle_hastheftinsurance" clearable filterable placeholder="请选择保险">
                                <el-option v-for="item in insuDataList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="faultcode" class="sf100">
                            <el-select v-model="filters.faultcode" clearable filterable placeholder="请选择维修原因" @visible-change="reasonChange" :loading="reaLoding" remote :remote-method="reasonChangeSelect">
                                <el-option v-for="item in serviceDataList" :key="item.dictdataname" :label="item.dictdatavalue" :value="item.dictdataname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
    <div class="colflex1">
        <el-form-item style="float:right;margin-right:0;">
            <el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
            <el-button @click="resetForm('filters')">重置</el-button>
        </el-form-item>
    </div>
</el-form>
</el-col>
<el-table :data="todo" stripe :max-height="windowOutHeight-300" border highlight-current-row @row-dblclick="handleEditRow" @expand-change="expandHandle" ref="todeTable" v-loading="listLoading" style="width: 100%;">
    <el-table-column type="expand">
        <template slot-scope="props">
            <el-tabs v-model="activeName" 
            v-loading="expandLoading"
            element-loading-text="订单信息加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.7)">
            <el-tab-pane label="操作摘要" name="1">
                <el-row>
                    <el-col :span="4">
                        <h4>车主信息</h4>
                        <dl class="dllist">
                            <dt>姓名:</dt>
                            <dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.name }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>身份证号:</dt>
                            <dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.idcard }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>联系电话:</dt>
                            <dd v-if="ruleFormStatic.vehicleInfo.ownerInfo">{{ ruleFormStatic.vehicleInfo.ownerInfo.mobile }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="5">
                        <h4>车辆信息</h4>
                        <dl class="dllist">
                            <dt>车辆型号:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车牌号:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车牌颜色:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.licenseplatecolor ? ruleFormStatic.vehicleInfo.licenseplatecolor : '暂无' }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车辆类型:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.vehiclePlateColor ? ruleFormStatic.vehicleInfo.vehiclePlateColor.typedesc : '暂无' }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车架号:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车辆颜色:</dt>
                            <template v-if="ruleFormStatic.vehicleInfo.color">
                                <dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>
                                <dd v-else>
                                    <span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>
                                </dd>
                            </template>
                        </dl>
                        <dl class="dllist">
                            <dt>车价:</dt>
                            <dd>{{ ruleFormStatic.vehicleInfo.price }}元</dd>
                        </dl>
                    </el-col>
                    <el-col :span="15">
                        <h4>派单信息</h4>
                        <dl class="dllist">
                            <dt>安装小组:</dt>
                            <dd v-if="ruleFormStatic.assigntoGroup">{{ ruleFormStatic.assigntoGroup.groupname }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装人员:</dt>
                            <dd v-if="ruleFormStatic.assigntoEmployeeInfo">{{ ruleFormStatic.assigntoEmployeeInfo.employeename }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>维修地址:</dt>
                            <dd>{{ ruleFormStatic.aftersaleaddress }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>预约维修时间:</dt>
                            <dd>{{ ruleFormStatic.aftersaledate }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>维修联系人:</dt>
                            <dd>{{ ruleFormStatic.contactperson }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>维修联系人电话:</dt>
                            <dd>{{ ruleFormStatic.contactmobile }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="24">
                        <dl class="dllist">
                            <dt>报单备注:</dt>
                            <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.start_remark }}</dd>
                        </dl>
                    </el-col>
                     <el-col :span="24">
                        <dl class="dllist">
                            <dt>派单备注:</dt>
                            <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.send_remark }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="24">
                        <dl class="dllist">
                            <dt>施工备注:</dt>
                            <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.work_remark }}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="操作记录" name="2">
                <el-table
                :data="opHistoryData"
                v-loading="historyListLoading"
                style="width: 100%">
                <el-table-column
                prop="name"
                align="center"
                label="操作状态">
            </el-table-column>
            <el-table-column
            prop="assignee_name"
            align="center"
            label="操作人">
        </el-table-column>
        <el-table-column
        align="center"
        prop="end_time"
        label="时间">
    </el-table-column>
    <el-table-column
    prop="task_vars"
    align="center"
    label="操作记录" :formatter="taskFormatter">
</el-table-column>
</el-table>
</el-tab-pane>
</el-tabs>
</template>
</el-table-column>
<el-table-column prop="id" align="center" label="维修单号" width="180">
    <template slot-scope="props">
        <span v-if="props.row.flowData.orderno">{{ props.row.flowData.orderno }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="所属公司">
    <template slot-scope="props">
        <span v-if="props.row.flowData.corpname">{{ props.row.flowData.corpname }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="报单人">
    <template slot-scope="props">
        <span v-if="props.row.flowData.apply_username">{{ props.row.flowData.apply_username }}</span>
    </template>
</el-table-column>
<el-table-column prop="createTime" align="center" label="报单时间" :formatter="dateFormatter" width="140">
</el-table-column>
<el-table-column prop="" align="center" label="车主">
    <template slot-scope="props">
        <span v-if="props.row.flowData.ownername">{{ props.row.flowData.ownername }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="车主电话" width="120">
    <template slot-scope="props">
        <span v-if="props.row.flowData.ownermobile">{{ props.row.flowData.ownermobile }}</span>
    </template>
</el-table-column>
<el-table-column prop="assignee" align="center" label="当前处理人" width="150">
</el-table-column>
<el-table-column prop="name" align="center" label="当前状态">
</el-table-column>
<el-table-column prop="" align="center" label="维修原因">
    <template slot-scope="props">
        <span v-if="props.row.flowData.faultremark">{{ props.row.flowData.faultremark }}</span>
    </template>
</el-table-column>
<el-table-column prop="candidateUsers" align="center" label="任务候选人" width="150">
</el-table-column>
<el-table-column prop="" align="center" label="车型" width="170">
    <template slot-scope="props">
        <span v-if="props.row.flowData.vehicle_modle">{{ props.row.flowData.vehicle_modle }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="车牌">
    <template slot-scope="props">
        <span v-if="props.row.flowData.vehicle_licenseplatenum">{{ props.row.flowData.vehicle_licenseplatenum }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="车架" width="170">
    <template slot-scope="props">
        <span v-if="props.row.flowData.vin">{{ props.row.flowData.vin }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="维修联系人">
    <template slot-scope="props">
        <span v-if="props.row.flowData.contactperson">{{ props.row.flowData.contactperson }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="维修联系人电话"  width="120">
    <template slot-scope="props">
        <span v-if="props.row.flowData.contactmobile">{{ props.row.flowData.contactmobile }}</span>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="预约时间" width="140">
    <template slot-scope="props">
        <span v-if="props.row.flowData.apply_time">{{ props.row.flowData.apply_time }}</span>
    </template>
</el-table-column>
<el-table-column="createTime" align="center" label="申请时间" :formatter="dateFormatter" width="140">
</el-table-column>
<el-table-column prop="description" align="center" width="300" label="描述">
    <template slot-scope="scope">
        <template v-if="scope.row.flowData.proc_desc">
            <template v-if="scope.row.flowData.proc_desc.indexOf('#') != -1">
               {{ scope.row.flowData.proc_desc.split('#')[0] }}<i class="iconfont icon-car carFont" :style="{color:scope.row.flowData.proc_desc.substr(scope.row.flowData.proc_desc.indexOf('#'),7)}"></i>
            </template>
            <template v-else>
                {{ scope.row.flowData.proc_desc }}
            </template>
        </template>
    </template>
</el-table-column>
<el-table-column label="操作" width="100" align="center" fixed="right">
    <template slot-scope="scope">
        <el-dropdown trigger="click">
            <el-button size="mini" type="primary">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <template v-if="scope.row.name == '指ip'">
                    <el-dropdown-item @click.native="refuseHandlingIP(scope.$index, scope.row)">完成</el-dropdown-item>
                </template>
                <template v-if="scope.row.name == '确认/派单'">
                    <el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">订单详情</el-dropdown-item>
                    <el-dropdown-item @click.native="successSendForm(scope.$index, scope.row)">完成派单</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,0)">拒绝处理</el-dropdown-item>
                </template>
                <template v-if="scope.row.name == '施工接单'">
                    <el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">订单详情</el-dropdown-item>
                    <el-dropdown-item @click.native="passConstructionOrder(scope.$index, scope.row,0)">通过</el-dropdown-item>
                    <el-dropdown-item @click.native="passConstructionOrder(scope.$index, scope.row,1)">退回</el-dropdown-item>
                </template>
                <template v-if="scope.row.name == '施工'">
                    <el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">订单详情</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,0)">拒绝处理</el-dropdown-item>
                </template>
                <template v-if="scope.row.name == '审核'">
                    <el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)">订单详情</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,1)">通过</el-dropdown-item>
                    <el-dropdown-item @click.native="showInstallImg(scope.$index, scope.row)">查看照片</el-dropdown-item>
                    <el-dropdown-item @click.native="showDraw(scope.$index, scope.row)">查看安装轨迹</el-dropdown-item>
                </template>
                
            </el-dropdown-menu>
        </el-dropdown>
    </template>
</el-table-column>
</el-table>
<!-- 报单中心列表 新装单子 拆除单子 售后单子  end-->

<!-- 报单分页标码 start-->
<el-pagination
@size-change="handleSizeChange"
@current-change="handleCurrentChange"
:page-sizes="[15, 30, 45, 60]"
background
:page-size="pageSize"
layout="total,sizes, prev, pager, next"
:total="total" style="float:right;margin-top:10px;">
</el-pagination>
<!-- 报单分页标码 end-->

<!-- 派单 弹窗  start-->
<el-dialog title="派单" :modal-append-to-body="false" class="formdetail" :visible.sync="clerkOrderDialogTableVisible">
    <clerkOrder ref="dialogChild" :curTaskId="curTaskId" @closeDialog = "closeDialog"></clerkOrder>
</el-dialog>
<!-- 派单 弹窗  end-->

<!-- 设备安装 弹窗  start-->
<el-dialog class="formdetail" title="维修施工" :modal-append-to-body="false" :visible.sync="equipmentDialogTableVisible">
    <dialogEquipmentInstall ref="dialogChild" :curTaskId="curTaskId" @closeDialog = "closeDialog" @changeDialogImg="changeDialogImg"></dialogEquipmentInstall>
</el-dialog>
<!-- 图片查看 start-->
<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!-- 图片查看 end-->
<!-- 设备安装 弹窗  end-->

<!-- 拒绝处理备注 弹窗  start-->
<el-dialog :title="rejectTitle" :modal-append-to-body="false" :visible.sync="rejectDialogVisible">
    <el-form label-position="left" label-width="50px">
        <el-input type="textarea" autosize placeholder="请输入备注" v-model="rejectRemarks"></el-input>
    </el-form>
    <el-col class="footer_but_bd" :span="24">
        <el-button type="primary"@click="addRefuseHandling" :loading="addLoading" style="margin-left:5px;float:right;">确定</el-button>
        <el-button @click="rejectDialogVisible = false" style="margin-left:5px;float:right;">取消</el-button>
    </el-col>
</el-dialog>
<!-- 拒绝处理备注 弹窗  end-->

<!-- 查看照片 弹窗  start-->
<el-dialog title="查看照片" :modal-append-to-body="false" :close-on-press-escape="false" @close="showDialogVisibleImgClose" :visible.sync="showDialogVisibleImg" width="80%" class="formdetail showimgDialog">
    <el-row>
        <el-col :span="5" style="padding:0 20px;">
            <el-col tag="p" class="simgtitle ckpbefor">维修单信息</el-col>
            <el-col :span="24">
                <dl class="dllist">
                    <dt>订单号</dt>
                    <dd>{{ ruleFormStatic.orderno }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>现场处理时间：</dt>
                    <dd>{{ ruleFormStatic.aftersaledate }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>现场处理地点：</dt>
                    <dd>{{ ruleFormStatic.aftersaleaddress }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>安装小组：</dt>
                    <dd v-if="ruleFormStatic.assigntoGroup">{{ ruleFormStatic.assigntoGroup.groupname }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>安装工程师：</dt>
                    <dd v-if="ruleFormStatic.assigntoEmployeeInfo">{{ ruleFormStatic.assigntoEmployeeInfo.employeename }}</dd>
                </dl>
                <br />
                <dl class="dllist">
                    <dt>车架号：</dt>
                    <dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>车型：</dt>
                    <dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>车牌号：</dt>
                    <dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
                </dl>
                <br />
                <template v-for="(item,index) in ruleFormStatic.afterSaleDetails">
                    <dl class="dllist">
                        <dt>设备类型：</dt>
                        <dd v-if="item.installDetail">{{ item.installDetail.packInfo.E_PRODMODEL }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>设备号：</dt>
                        <dd v-if="item.installDetail">{{ item.installDetail.packInfo.E_PRODUNUM }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>卡类型：</dt>
                        <dd v-if="item.installDetail">{{ item.installDetail.packInfo.C_PRODMODEL }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>SIM卡号：</dt>
                        <dd v-if="item.installDetail">{{ item.installDetail.packInfo.C_PRODUNUM }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>安装位置：</dt>
                        <dd v-if="item.installDetail">{{ item.installDetail.installpositionname }}</dd>
                    </dl>
                    <br />
                </template>
                <br />
                <dl class="dllist">
                    <dt>备注信息：</dt>
                    <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.work_remark }}</dd>
                </dl>
            </el-col>
        </el-col>
        <el-col :span="19">
            <el-tabs v-model="dialogActiveNameImg">
                <el-tab-pane label="设备照片" name="1" class="deviceclas">
                    <el-row :gutter="20">
                        <template v-for="(item,index) in ruleFormStatic.afterSaleDetails">
                            <el-col :span="24" v-if="item.installDetail">
                                <span class="formTile ml10">{{ item.installDetail.packInfo.E_PRODTYPE+item.installDetail.packInfo.E_PRODUNUM }}
                                </span>
                                <el-col :span="6" class="photosh" v-for="(itemPic,ind) in item.installDetail.pictures">
                                    <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                        <img class="image" :src="$store.state.IMG_URL+itemPic.piclink">
                                        <div class="btsty">
                                            <span class="fl mt5">{{ itemPic.picdesc }}</span>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-col>
                        </template>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="车辆照片" name="2">
                    <el-row :gutter="20">
                        <el-col :span="6" class="photosh" v-for="(itemPic,index) in ruleFormStatic.pictures">
                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                <img class="image" :src="$store.state.IMG_URL+itemPic.piclink">
                                <div class="btsty">
                                    <span class="fl mt5">{{ itemPic.picdesc }}</span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</el-dialog>
<!-- 查看照片 弹窗  end-->

<!-- 修改订单 弹窗  start-->
<el-dialog title="" :modal-append-to-body="false" class="formdetail" :visible.sync="editFormDialogTableVisible">
    <el-tabs v-model="editFormdialogActiveName">
        <el-tab-pane label="订单信息" name="1">
            <el-form ref="editFormData" :model="editFormData" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="保险函编号">
                            <span>暂无</span>
                        </el-form-item>
                        <el-form-item label="产品类型">
                            <span>--</span>
                        </el-form-item>
                        <el-form-item label="车辆盗抢保障费用">
                            <el-input type="text" placeholder="请输入车辆盗抢保障费用" v-model="editFormData.price">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="客户名称">
                            <span>{{ editFormData.corporateInfo.corpname }}</span>
                        </el-form-item>
                        <el-form-item label="业务员">
                            <el-input v-model="editFormData.salername"></el-input>
                        </el-form-item>
                        <el-form-item label="业务员联系方式">
                            <el-input v-model="editFormData.salermobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单时间">
                            <span>--</span>
                        </el-form-item>
                        <el-form-item label="报单类型">
                            <span>{{ editFormData.declaretype }}</span>
                        </el-form-item>
                        <el-form-item label="服务期限">
                            <span>--</span>
                        </el-form-item>
                        <el-form-item label="收款金额（POS机刷卡金额）">
                            <el-input type="text" placeholder="请输入收款金额" v-model="editFormData.price">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" style="margin-left:5px;float:right;">修改</el-button>
                    <el-button style="margin-left:5px;float:right;">取消</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="车主信息" name="2">
            <el-form ref="ownEditFormInfos" :model="ownEditFormInfos" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车主姓名">
                            <el-input type="text" placeholder="请输入车主姓名" v-model="ownEditFormInfos.name"></el-input>
                        </el-form-item>
                        <el-form-item label="车主联系电话">
                            <el-input type="text" placeholder="请输入车主电话" v-model="ownEditFormInfos.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="车主">
                            <el-radio-group v-model="ownEditFormInfos.carmantype">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                                <el-radio :label="3">其它</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件类型">
                            <span>居民身份证</span>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <el-input type="text" placeholder="请输入证件号码" v-model="ownEditFormInfos.idcard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" style="margin-left:5px;float:right;">修改</el-button>
                    <el-button style="margin-left:5px;float:right;">取消</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="车辆信息" name="3">
            <el-form ref="vehicleEditFormInfos" :model="vehicleEditFormInfos" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车型">
                            <el-input v-model="vehicleEditFormInfos.model" placeholder="请输入车型"></el-input>
                        </el-form-item>
                        <el-form-item label="车辆颜色">
                            <el-autocomplete
                            class="inline-input searchInput"
                            v-model="vehicleEditFormInfos.color"
                            :fetch-suggestions="querySearchColor"
                            placeholder="请输入车辆颜色"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="车架号">
                            <el-input v-model="vehicleEditFormInfos.vin" placeholder="请输入车架号"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号">
                            <el-input v-model="vehicleEditFormInfos.licenseplatenum" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌颜色">
                            <el-select v-model="vehicleEditFormInfos.carPcolor" filterable placeholder="请选择">
                                <el-option
                                v-for="item in carPsalerData"
                                :label="item.name"
                                :key="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆初次登记日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="vehicleEditFormInfos.createdate"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车辆状态">
                        <el-radio-group v-model="vehicleEditFormInfos.cartype">
                            <el-radio :label="1">新车</el-radio>
                            <el-radio :label="2">旧车</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="购买日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="vehicleEditFormInfos.updatedate"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="车辆购置价">
                        <el-input type="text" placeholder="请输入车辆购置价" v-model="vehicleEditFormInfos.price">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商业盗抢险购买">
                        <el-radio-group v-model="vehicleEditFormInfos.hastheftinsurance">
                            <el-radio :label="1">未购买</el-radio>
                            <el-radio :label="2">已购买</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="购车款支付">
                        <el-radio-group v-model="vehicleEditFormInfos.buycarmanprice">
                            <el-radio :label="1">贷款</el-radio>
                            <el-radio :label="2">全款</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="受理银行">
                        <el-select v-model="vehicleEditFormInfos.receivingbankid" @visible-change="receivinList" :loading="receLoading" filterable placeholder="请选择">
                            <el-option
                            v-for="item in salerData"
                            :label="item.corpname"
                            :key="item.corpname"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" style="margin-left:5px;float:right;">修改</el-button>
            <el-button style="margin-left:5px;float:right;">取消</el-button>
        </el-form-item>
    </el-form>
</el-tab-pane>
</el-tabs>
</el-dialog>
<!-- 修改订单 弹窗  end-->
</section>
</template>
<script>
    import util from '../../../common/js/util';
    import nanobar from '../../../common/js/nanobar';
    import clerkOrder from 'components/businessManage/customerService/clerkOrder';
    import dialogEquipmentInstall from 'components/businessManage/customerService/dialogEquipmentInstall';
    import {getTodoInfoList,getvariablesSeaviceTaskInfoList,getCorpNameList,getFormCount,addApprovaperSendVindicate,addApprovaperWork,addApprovaperServiceVerify,searchCorpNameList,getDeptManagerInfoList,getOperationRecord,addApprovaperVindicateCl,getFaultReason,getPdInstallUserList} from '../../../api/api';
    export default {
        props:['windowOutHeight'],
        components:{clerkOrder,dialogEquipmentInstall},
        data() {
            return {
                expandLoading:false,
                util:util,
                //搜索 筛选信息
                filters: {
                    orderno:'',
                    vehicle_licenseplatenum:'',
                    vin:'',
                    ownername:'',
                    corpid:'',
                    apply_userid:'',
                    startDate:'',
                    name:'',
                    assignee:'',
                    work_user_id:'',
                    vehicle_hastheftinsurance:'',
                    faultcode:'',
                },
                corplist: [], //所属公司
                corpLoading: false, //
                userDataList: [],//当前处理人
                empLoading: false, //
                statusDataList:['确认/派单','施工接单','施工','审核','指ip','失败','无效'],//当前节点
                insuDataList:[{value:'1',label:'是'},{value:'0',label:'否'}],//保险
                serviceDataList:[],//维修原因
                reaLoding:false,
                //车辆信息修改表单
                vehicleEditFormInfos:{
                    receivingbankid:'',
                    cartype:1,
                    buycarmanprice:1
                },
                //新装数量
                fromNum:{
                    num0:0,
                    num1:0,
                    num2:0,
                    num3:0,
                    num4:0,
                    num5:0,
                },
                isExpandeds:true,
                userDataList:[],
                //车牌颜色
                carPsalerData:[{name:"黄绿双拼色"},{name:"黑色"},{name:"黄色"},{name:"蓝色"},{name:"白色"},{name:"浅变绿色色"}],
                //车主信息
                ownEditFormInfos:{},
                //修改订单tabs切换
                editFormdialogActiveName:'1',
                //修改订单弹窗
                editFormDialogTableVisible:false,
                //保险出单弹窗是否显示
                successDialogTableVisible:false,
                //查看照片 弹窗
                showDialogVisibleImg:false,
                //查看照片
                dialogActiveNameImg:'1',
                //拒绝理由弹窗备注
                rejectDialogVisible:false,
                //备注弹窗标题
                rejectTitle:"拒绝理由",
                //显示子类图片弹窗
                dialogVisible:false,
                //显示图片url
                dialogImageUrl:'',
                //是否显示派单弹窗
                clerkOrderDialogTableVisible:false,
                //是否显示安装弹窗
                equipmentDialogTableVisible:false,
                //默认显示订单详情弹出
                dialogActiveName:'1',
                //当前状态
                stepState:0,
                //公司下拉数据对象数据初始化
                copName:[],
                //公司下拉loading初始化
                copLoading:false,
                //列表详情操作默认显示那个
                activeName: '1',
                //操作记录
                opHistoryData:[],
                historyListLoading:false,
                //处理表格列表数据
                todo:[],
                //当前新装状态值
                curStateData:{},
                //新装弹窗详情显示
                dialogFormData:{
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:'',
                        receivingbank:{},
                        ownerInfo:{
                            name:'',
                            idcard:'',
                            mobile:''
                        }
                    },
                    assigntoGroup:{
                        groupname:''
                    },
                    assigntoEmployeeInfo:{
                        employeename:''
                    },
                    afterSaleDetails:[],
                    corporateInfo:{},
                    declarEmployee:{}
                },
                //新装弹窗详情显示
                editFormData:{
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:'',
                        receivingbank:{},
                        ownerInfo:{
                            name:'',
                            idcard:'',
                            mobile:''
                        }
                    },
                    assigntoGroup:{
                        groupname:''
                    },
                    assigntoEmployeeInfo:{
                        employeename:''
                    },
                    afterSaleDetails:[],
                    corporateInfo:{},
                    declarEmployee:{}
                },
                //拒绝备注
                rejectRemarks:'',
                //拒绝boolean
                rejectResult:false,
                //拒绝类型单子
                sumbitType:'',
                //静态数据详情展现
                ruleFormStatic:{
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:'',
                        receivingbank:{},
                        ownerInfo:{
                            name:'',
                            idcard:'',
                            mobile:''
                        }
                    },
                    assigntoGroup:{
                        groupname:''
                    },
                    assigntoEmployeeInfo:{
                        employeename:''
                    },
                    afterSaleDetails:[],
                    corporateInfo:{},
                    declarEmployee:{}
                },
                //受理银行数组
                salerData:[],
                //loading受理银行下拉
                receLoading:false,
                //当前流程任务id
                curTaskId:'',
                viewer:'',
                total: 0,
                copsUerLoading:false,
                currentPage: 0,
                //拒绝理由提交加载
                addLoading:false,
                //是否是弹窗详情 不是为1 是为2
                clickState:1,
                listLoading: false,
                pageSize:15
            }
        },
        methods: {
            // 查看安装人员轨迹
            showDraw(index,row){
                window.open('http://mqtt.wwvas.com:9201/Map/UserHistoryRoute?id=' + row.flowData.work_user_id);
            },
            /*所属公司——下拉*/
            corpChange(r) {
                if(!r || this.corplist.length > 0) return;
                let para = {
                    showCount: 30
                }
                this.corpLoading = true;
                getCorpNameList(para).then((res) => {
                    this.corplist = res.data.data.records;
                    this.corpLoading = false;
                });
            },
            // 所属公司，模糊查询
            corpChangeSelect(query) {
                let para = {
                    showCount: 30,
                    corpname: query,
                }
                this.corpLoading = true;
                getCorpNameList(para).then((res) => {
                    this.corplist = res.data.data.records;
                    this.corpLoading = false;
                });
            },
            /*报单人、当前处理人——下拉*/
            empChange(r) {
                if(!r || this.userDataList.length > 0) return;
                this.userDataList = [];
                let para = {
                    showCount: 30
                }
                this.empLoading = true;
                getDeptManagerInfoList(para).then((res) => {
                    this.userDataList = res.data.data.records;
                    this.empLoading = false;
                });
            },
            // 报单人，当前处理人-模糊查询
            empChangeSelect(query) {
                this.userDataList = [];
                let para = {
                    showCount: 30,
                    employeename: query,
                }
                this.empLoading = true;
                getDeptManagerInfoList(para).then((res) => {
                    this.userDataList = res.data.data.records;
                    this.empLoading = false;
                });
            },
            /*安装人——下拉*/
            leaderChange(r) {
                this.userDataList = [];
                        if(!r || this.userDataList.length > 0) return;
                        let para = {
                            showCount: 30,
                        }
                        this.empLoading = true;
                        getPdInstallUserList(para).then((res) => {
                            this.userDataList = res.data.data.records;
                                            this.empLoading = false;
                        });
            },
            // 安装人，模糊查询
            leaderChangeSelect(query) {
                this.userDataList = [];
                let para = {
                    showCount: 30,
                    employeename: query,
                }
                this.empLoading = true;
                getPdInstallUserList(para).then((res) => {
                    this.userDataList = res.data.data.records;
                    this.empLoading = false;
                });
            },
            /*维修原因——下拉*/
            reasonChange(r) {
                if(!r || this.serviceDataList.length > 0) return;
                let para = {
                    showCount: 30
                }
                this.reaLoading = true;
                getFaultReason(para).then((res) => {
                    this.serviceDataList = res.data.data.records;
                    this.reaLoading = false;
                });
            },
            // 维修原因，模糊查询
            reasonChangeSelect(query) {
                let para = {
                    showCount: 30,
                    faultcode: query,
                }
                this.reaLoading = true;
                getFaultReason(para).then((res) => {
                    this.serviceDataList = res.data.data.records;
                    this.reaLoading = false;
                });
            },
            //施工接单通过审核
            passConstructionOrder(index,row,type){
                let addformpara = {
                    taskId:row.id,
                    properties : {
                        result:true
                    }
                };
                if(type == 0){
                    addformpara.properties.result = true;
                    addApprovaperVindicateCl(addformpara).then((res) => {
                        if(res.data.result.code == 0){
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    });
                }
                if(type == 1){
                    addformpara.properties.result = false;
                    addApprovaperVindicateCl(addformpara).then((res) => {
                        if(res.data.result.code == 0){
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    });
                }
            },
            //输入关键字查询员工
            remoteGsMethod(query){
                if (query !== '') {
                    let para = {
                        employeename:query
                    };
                    this.loading = true;
                    getDeptManagerInfoList(para).then((res) => {
                        this.userDataList = res.data.data.records;
                        this.copsUerLoading = false;
                    });
                } else {
                    let para = {
                        showCount:15
                    };
                    getDeptManagerInfoList(para).then((res) => {
                        this.userDataList = res.data.data.records;
                        this.copsUerLoading = false;
                    });
                }
            },
            //完成派单操作
            successSendForm(index,row){
                this.clerkOrderDialogTableVisible = true;
                this.clickState = 3;
                this.getFormData(row);
            },
            //完成安装操作
            successWorkForm(index,row){
                this.equipmentDialogTableVisible = true;
                this.clickState = 3;
                this.getFormData(row);
            },
            //修改订单信息
            editFormInfo(index,row){
                this.editFormDialogTableVisible = true;
                this.clickState = 4;
                this.getFormData(row);
            },
            //初始化修改订单信息
            initEditFormInfo(data){
                // this.editFormData = data;
                // this.ownEditFormInfos = data.ownerInfo;
                // this.ownEditFormInfos.carmantype = 1;
                // this.vehicleEditFormInfos = data.vehicleInfo;
                // this.vehicleEditFormInfos.hastheftinsurance = parseInt(data.vehicleInfo.hastheftinsurance);
                // if(data.vehicleInfo.receivingbank){
                //     this.vehicleEditFormInfos.receivingbankid = data.vehicleInfo.receivingbank.corpname;
                // }
                // this.vehicleEditFormInfos.cartype = 1;
                // this.vehicleEditFormInfos.buycarmanprice = 1;
            },
            //操作显示子类弹窗
            changeDialogImg(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //操作公司下拉查询
            changeCop(r){
                if(!r || this.copName.length > 0) return;
                this.copLoading = true;
                let para = {
                    showCount:151
                }
                getCorpNameList(para).then((res) => {
                    this.copName = res.data.data.records;
                    this.copLoading = false;
                });
            },
            //操作公司下拉 点击返回value值
            changeVal(item){
            },
            //受理银行查询
            receivinList(r){
                if(!r || this.salerData.length > 0) return;
                let para = {
                    corptype:'BANK'
                };
                this.receLoading = true;
                searchCorpNameList(para).then((res) => {
                    this.salerData = res.data.data.records;
                    this.receLoading = false;
                });
            },
            /*提供车辆颜色选择建议*/
            querySearchColor(queryString, cb){
                let tempColor = [
                {value: "红色"},
                {value: "白色"},
                {value: "黑色"},
                {value: "蓝色"},
                {value: "银色"},
                {value: "绿色"},
                {value: "棕色"},
                {value: "珍珠白"},
                {value: "深海蓝"},
                {value: "火焰红"},
                {value: "钛空金"},
                {value: "月光银"},
                {value: "象牙白"},
                {value: "水晶紫"},
                {value: "碧玉黑"},
                ],
                restaurants = this.tempColor,
                results = queryString ? tempColor.filter(this.createFilter(queryString)) : tempColor;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //改变新装状态获取对应数据列表
            changeStateHandle(v){
                if(v == 0){
                    this.curStateData = {};
                }
                if(v == 1){
                    this.curStateData = {
                        taskDefinitionKey:"apply"
                    };
                }
                if(v == 2){
                    this.curStateData = {
                        taskDefinitionKey:"node_verify"
                    };
                }
                if(v == 3){
                    this.curStateData = {
                        taskDefinitionKey:"work"
                    };
                }
                if(v == 4){
                    this.curStateData = {
                        taskDefinitionKey:"service_verify"
                    };
                }
                if(v == 5){
                    this.curStateData = {
                        taskDefinitionKey:"insurance"
                    };
                }
                this.getTodo();
            },
            //当且列表数据展开查看详情
            expandHandle(row, expandeds){
                if(!this.isExpandeds){
                    this.isExpandeds = true;
                    return;
                }
                if(expandeds.length != 0 && this.curTaskId != row.id){
                    this.clickState = 1;
                    this.expandLoading = true;
                    this.getOperationRecord(row);
                    this.getFormData(row);
                };
                if(expandeds.length > 1) {
                    this.isExpandeds = false;
                    this.$refs.todeTable.toggleRowExpansion(expandeds[0],false);
                };
            },
            getOperationRecord(row){
                let para = {
                    id:row.executionId
                }
                this.historyListLoading = true;
                getOperationRecord(para).then((res) => {
                    this.historyListLoading = false;
                    if(res.data.result.code == 0){
                        this.opHistoryData = res.data.data;
                    }
                });
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
            //格式化后台传来的时间戳
            dateFormatter(row,col){
                return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss');
            },
            taskFormatter(row,col){
                let task_vars = row.task_vars;
                if(task_vars){
                    return (task_vars.result?"通过":"拒绝")+(task_vars.remark?'-备注说明：'+task_vars.remark:"");
                } else {
                    return "";
                }
            },
            //完成保险出单
            successFornm(index,row){
                this.successDialogTableVisible = true;
                this.clickState = 3;
                this.getFormData(row);
            },
            //提交拒绝理由
            addRefuseHandling(){
                let addformpara = {
                    taskId:this.curTaskId,
                    properties : {}
                };
                addformpara.properties = {
                    result:this.rejectResult,
                    remark:this.rejectRemarks
                }
                this.addLoading = true;
                //提交审核结果
                addApprovaperSendVindicate(addformpara).then((res) => {
                    this.addLoading = false;
                    if(res.data.result.code == 0){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        //初始化待办数量
                        this.$store.dispatch('initFormNum');
                        this.getTodo();
                    }
                }).catch((error) => {
                    this.addLoading = false;
                });
                this.rejectRemarks = '';
                this.rejectDialogVisible = false;
            },
            refuseHandlingIP(index,row){
                let addformpara = {
                    taskId:row.id,
                    properties : {}
                };
                addformpara.properties = {
                    result:true,
                    remark:''
                }
                //提交审核结果
                addApprovaperSendVindicate(addformpara).then((res) => {
                    if(res.data.result.code == 0){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        //初始化待办数量
                        this.$store.dispatch('initFormNum');
                        this.getTodo();
                    }
                }).catch((error) => {
                });
            },
            //拒绝理由弹窗显示 并且记录相关信息
            refuseHandling(index,row,type){
                this.sumbitType = type;
                this.curTaskId = row.id;
                if(type == 1) {
                    this.rejectTitle = "通过备注";
                    this.rejectResult = true;
                }else{
                    this.rejectTitle = "拒绝理由";
                    this.rejectResult = false;
                }
                this.rejectDialogVisible = true;
            },
            //获取我的待办列表列表
            getTodo() {
                let para = {
                    currentPage   : this.currentPage,
                    showCount      : this.pageSize,
                    orderno       : this.filters.orderno,
                    vehicle_licenseplatenum:this.filters.vehicle_licenseplatenum,
                    vin:this.filters.vin,
                    ownername:this.filters.ownername,
                    corpid:this.filters.corpid,
                    apply_userid:this.filters.apply_userid,
                    name:this.filters.name,
                    assignee:this.filters.assignee,
                    work_user_id:this.filters.work_user_id,
                    vehicle_hastheftinsurance:this.filters.vehicle_hastheftinsurance,
                    faultcode:this.filters.faultcode,
                    startTime     : this.filters.startDate?(this.filters.startDate[0]?util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss'):''):'',
                    endTime       : this.filters.startDate?(this.filters.startDate[1]?util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss'):''):'',
                    type          : 3
                };
                para = Object.assign(para,this.curStateData);
                this.listLoading = true;
                getTodoInfoList(para).then((res) => {
                    this.listLoading = false;
                    if(res.data.result.code == 0){
                        this.total       = res.data.data.totalResult
                        this.todo        = res.data.data.records;
                        if (para.taskDefinitionKey == '' || para.taskDefinitionKey == undefined) {
                                this.fromNum.num0 = res.data.data.totalResult;
                        }
                        this.initFormNum();
                    }
                }).catch((error) => {
                    this.listLoading = false;
                });
            },
            //根据任务id获取表单信息
            getFormData(obj) {
                if(!obj) return;
                  //获取填写的任务变量值
                  let pa = {
                      taskId:obj.id
                  };
                  this.curTaskId = obj.id;
                  nanobar.go(60);
                  getvariablesSeaviceTaskInfoList(pa).then((res) => {
                      let _this = this,data = res.data.data;
                      nanobar.go(100);
                      this.expandLoading = false;
                      if(!data.vehicleInfo){
                          data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
                      }
                      if(!data.vehicleInfo.receivingbank){
                          data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
                      }
                      if(!data.assigntoGroup){
                          data.assigntoGroup = _this.ruleFormStatic.assigntoGroup;
                      }
                      if(this.clickState == 1) this.ruleFormStatic = data;
                      if(this.clickState == 2) this.dialogFormData = data;
                      if(this.clickState == 3) this.$refs.dialogChild.getCustoHistoryInfo(data);
                      if(this.clickState == 4) this.initEditFormInfo(data);
                  }).catch((error) => {
                      nanobar.go(100);
                      this.expandLoading = false;
                  });
              },
              //查看详情关闭弹窗
              formdetailColse(){
                  nanobar.go(100);
              },
              //查看图片窗口关闭
              showDialogVisibleImgClose(){
              },
              //查看设备安装照片
              showInstallImg(index,row){
                  this.showDialogVisibleImg = true;
                  this.clickState = 1;
                  this.resetFieldsRuleForm();
                  this.getFormData(row);
                  //初始化图片查看器
                    $("div.showimgDialog").on("click",".image",function(e){
                        $("div.showimgDialog").viewer("destroy");
                        $("div.showimgDialog").viewer({zIndex:999999999});
                    });
              },
              handleEditRow(row,e,col){
                  this.handleEdit(0,row);
              },
            //显示审核该报单界面
            handleEdit(index, row) {
                if(row.taskDefinitionKey.indexOf("apply") != -1) {
                    row.step = 1;
                    this.$store.state.formObj = row;
                }
                if(row.taskDefinitionKey.indexOf("verify") != -1 && row.taskDefinitionKey.indexOf("service_verify") == -1) {
                    row.step = 2;
                    this.$store.state.formObj = row;
                }
                if(row.taskDefinitionKey.indexOf("node_work_receive") != -1) {
                    row.step = 3;
                    this.$store.state.formObj = row;
                }
                if(row.taskDefinitionKey.indexOf("node_work") != -1 && row.taskDefinitionKey.indexOf("node_work_receive") == -1) {
                    row.step = 4;
                    this.$store.state.formObj = row;
                }
                if(row.taskDefinitionKey.indexOf("service_verify") != -1) {
                    row.step = 5;
                    this.$store.state.formObj = row;
                }
                this.$router.push("/service/1");
            },
            //清空查询表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //关闭子类弹窗
            closeDialog(type,n){
                if(type == 1){
                    this.clerkOrderDialogTableVisible = false;
                }
                if(type == 2){
                    this.equipmentDialogTableVisible = false;
                }
                if(type == 3){
                    this.successDialogTableVisible = false;
                }
                if(n != 0) this.getTodo();
            },
            //初始化新装各个状态总数  待优化
            initFormNum(){
                var user = sessionStorage.getItem('user');
                user = JSON.parse(user);
                let para = {
                    type:3,
                    assignee_: user.employeeInfo.userid
                };
                getFormCount(para).then((res) => {
                    let node = res.data.data;
                     this.fromNum.num1 = (node.proc_vindicate_apply + node.apply) ? (node.proc_vindicate_apply + node.apply) : 
                        node.proc_vindicate_apply ? node.proc_vindicate_apply : 
                        node.apply ? node.apply : 0;
                    this.fromNum.num2 = node.node_verify ? node.node_verify : 0;
                    this.fromNum.num3 = (node.proc_vindicate_work + node.node_work + node.proc_vindicate_node_work) ? (node.proc_vindicate_work + node.node_work + node.proc_vindicate_node_work) :
                        node.proc_vindicate_node_work ? node.proc_vindicate_node_work : 
                        node.proc_vindicate_work ? node.proc_vindicate_work : 
                        node.node_work ? node.node_work : 0;
                    this.fromNum.num4 = node.proc_vindicate_service_verify ? node.proc_vindicate_service_verify : 0;
                    // this.fromNum.num1 = (node.proc_vindicate_apply + node.apply)?(node.proc_vindicate_apply + node.apply):0;
                    // this.fromNum.num2 = (node.proc_vindicate_verify + node.node_verify +node.proc_vindicate_service_verify)?(node.proc_vindicate_verify + node.node_verify + node.proc_vindicate_service_verify):0;
                    // this.fromNum.num3 = (node.proc_vindicate_work+node.node_work +node.proc_vindicate_node_work)?(node.proc_vindicate_work+node.node_work+node.proc_vindicate_node_work):0;
                    // this.fromNum.num4 = (node.proc_vindicate_service_verify)?(node.proc_vindicate_service_verify):0;
                    // this.fromNum.num0 = (this.fromNum.num1+this.fromNum.num2+this.fromNum.num3+this.fromNum.num4)?(this.fromNum.num1+this.fromNum.num2+this.fromNum.num3+this.fromNum.num4):0;
            });
        },
             //初始化ruleFormStatic
             resetFieldsRuleForm(){
               this.ruleFormStatic = {
                   vehicleInfo:{
                       model:'',
                       color:'',
                       licenseplatenum:'',
                       vin:'',
                       price:'',
                       yearsofservice:'',
                       receivingbank:{},
                       ownerInfo:{
                           name:'',
                           idcard:'',
                           mobile:''
                       }
                   },
                   afterSaleDetails:[],
                   corporateInfo:{},
                   declarEmployee:{}
               }
           }
       },
        //初始化数据
        created() {
            this.initFormNum();
            this.getTodo();
        }
    }
</script>