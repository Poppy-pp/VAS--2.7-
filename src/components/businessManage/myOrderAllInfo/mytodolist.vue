<!--* 
* @description: 所有待办 新装单管理
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section>
        <el-col :span="24" class="mb10">
            <el-radio-group size="medium" v-model="stepState" @change="changeStateHandle">
                <el-radio-button label="0" :disabled="listLoading">全部:{{ fromNum.num0 }}</el-radio-button>
                <el-radio-button label="1" :disabled="listLoading">报单:{{ fromNum.num1 }}</el-radio-button>
                <el-radio-button label="2" :disabled="listLoading">文员核单/派单:{{ fromNum.num2 }}</el-radio-button>
                <el-radio-button label="6" :disabled="listLoading">施工接单:{{ fromNum.num6 }}</el-radio-button>
                <el-radio-button label="3" :disabled="listLoading">施工审核/施工:{{ fromNum.num3 }}</el-radio-button>
                <el-radio-button label="4" :disabled="listLoading">审核:{{ fromNum.num4 }}</el-radio-button>
                <el-radio-button label="5" :disabled="listLoading">保险出单:{{ fromNum.num5 }}</el-radio-button>
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
                        <el-form-item prop="corpname" class="sf100">
                            <el-select v-model="filters.corpname" clearable value-key="corpname" @visible-change="changeCop" @change="changeVal" filterable :loading="copLoading" placeholder="请选择操作公司">
                                <el-option
                                v-for="item in copName"
                                :key="item.corpname"
                                :label="item.corpname"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="assignee" class="sf100">
                        <el-select v-model="filters.assignee" clearable remote filterable :remote-method="remoteGsMethod" :loading="copsUerLoading" placeholder="请输入当前处理人">
                            <el-option
                            v-for="item in userDataList"
                            :key="item.employeename"
                            :label="item.employeename"
                            :value="item.userid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="apply_user_id" class="sf100">
                    <el-select v-model="filters.apply_user_id" clearable remote filterable :remote-method="remoteGsMethod" :loading="copsUerLoading" placeholder="请输入业务员姓名">
                        <el-option
                        v-for="item in userDataList"
                        :key="item.employeename"
                        :label="item.employeename"
                        :value="item.userid">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item prop="apply_stolen_insurance" class="sf100">
                <el-select v-model="filters.apply_stolen_insurance" clearable filterable placeholder="请选择产品类型">
                    <el-option
                    v-for="item in stolen"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id">
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
            <el-date-picker
            style="width:100%;"
            v-model="filters.startDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
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

<el-table :max-height="windowOutHeight-250" stripe :data="todo" border ref="todeTable" highlight-current-row @row-dblclick="handleEditRow" @expand-change="expandHandle" v-loading="listLoading" style="width: 100%;">
    <el-table-column type="expand">
        <template slot-scope="props">
            <el-tabs v-model="activeName" 
            v-loading="expandLoading"
            element-loading-text="订单信息加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.7)">
            <el-tab-pane label="操作摘要" name="1">
                <el-row>
                    <el-col :span="8">
                        <dl class="dllist">
                            <dt>车主姓名:</dt>
                            <dd>{{ expandRuleFormStatic.ownerInfo.name }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车主身份证号:</dt>
                            <dd>{{ expandRuleFormStatic.ownerInfo.idcard }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车主电话:</dt>
                            <dd>{{ expandRuleFormStatic.ownerInfo.mobile }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装联系人:</dt>
                            <dd>{{ expandRuleFormStatic.contactperson }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装联系电话:</dt>
                            <dd>{{ expandRuleFormStatic.contactmobile }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>报单类型:</dt>
                            <dd>{{ expandRuleFormStatic.declaretype }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>受理银行:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.receivingbank.corpname }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="8">
                        <dl class="dllist">
                            <dt>车架号:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.vin }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车辆型号:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.model }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车牌号:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.licenseplatenum }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车牌颜色:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.licenseplatecolor ? expandRuleFormStatic.vehicleInfo.licenseplatecolor : '暂无' }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车辆类型:</dt>
                            <dd>{{ expandRuleFormStatic.vehicleInfo.vehiclePlateColor ? expandRuleFormStatic.vehicleInfo.vehiclePlateColor.typedesc : '暂无' }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>车辆颜色:</dt>
                            <template v-if="expandRuleFormStatic.vehicleInfo.color">
                                <dd v-if="expandRuleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ expandRuleFormStatic.vehicleInfo.color }}</dd>
                                <dd v-else>
                                    <span class="color_rgba" :style="{background:expandRuleFormStatic.vehicleInfo.color}"></span>
                                </dd>
                            </template>
                        </dl>
                        <dl class="dllist">
                            <dt>车价:</dt>
                            <dd v-if="expandRuleFormStatic.vehicleInfo.price">{{ expandRuleFormStatic.vehicleInfo.price }}元</dd>
                        </dl>
                    </el-col>
                    <el-col :span="8">
                        <dl class="dllist">
                            <dt>安装小组:</dt>
                            <dd v-if="expandRuleFormStatic.installGroupInfo">{{ expandRuleFormStatic.installGroupInfo.groupname }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装人员:</dt>
                            <dd v-if="expandRuleFormStatic.installEmployee">{{ expandRuleFormStatic.installEmployee.employeename }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装保险产品数量:</dt>
                            <dd>{{ expandRuleFormStatic.installapplyinsu }}台</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装常规产品数量:</dt>
                            <dd>{{ expandRuleFormStatic.installapplymorn }}台</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>安装地址:</dt>
                            <dd v-if="expandRuleFormStatic.installaddress">{{ expandRuleFormStatic.installaddress }}</dd>
                        </dl>
                        <dl class="dllist">
                            <dt>预约安装时间:</dt>
                            <dd>{{ expandRuleFormStatic.installapplydate }}</dd>
                        </dl>
                    </el-col>
                </el-row>
                <el-row style="margin-top:5px;">
                    <el-col :span="12" v-if="expandRuleFormStatic.flowData.apply_remark">
                        <dl class="dllist">
                            <dt>报单备注:</dt>
                            <dd>{{ expandRuleFormStatic.flowData.apply_remark }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="12" v-if="expandRuleFormStatic.flowData.send_remark">
                        <dl class="dllist">
                            <dt>派单备注:</dt>
                            <dd>{{ expandRuleFormStatic.flowData.send_remark }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="12" v-if="expandRuleFormStatic.flowData.work_remark">
                        <dl class="dllist">
                            <dt>施工备注:</dt>
                            <dd>{{ expandRuleFormStatic.flowData.work_remark }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="12" v-if="expandRuleFormStatic.flowData.service_verify_remark">
                        <dl class="dllist">
                            <dt>审核备注:</dt>
                            <dd>{{ expandRuleFormStatic.flowData.service_verify_remark }}</dd>
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
    prop=""
    align="center"
    label="操作记录" :formatter="taskFormatter">
</el-table-column>
</el-table>
</el-tab-pane>
</el-tabs>
</template>
</el-table-column>
<el-table-column prop="orderno" align="center" label="新装单号" width="180">
    <template slot-scope="props">
        <span v-if="props.row.flowData.orderno">{{ props.row.flowData.orderno }}</span>
    </template>
</el-table-column>

<el-table-column prop="orderno" align="center" label="订单来源">
    <template slot-scope="scope">
        <template v-if="scope.row.flowData.orderno">
            {{ scope.row.flowData.orderno.indexOf("ZH") > 0 ? "车贷系统" : "VAS系统" }}
        </template>
        <template v-else>
            VAS系统
        </template>
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="创建人单位">
    <template slot-scope="props">
        <span v-if="props.row.flowData.corpname">{{ props.row.flowData.corpname }}</span>
    </template>
</el-table-column>
<el-table-column prop="assignee" align="center" label="当前处理人">
</el-table-column>
<el-table-column prop="name" align="center" label="当前状态">
    <template slot-scope="props">
        <el-tag type="primary" style="font-weight:bold;">{{ props.row.name }}</el-tag>
    </template>
</el-table-column>
<el-table-column prop="candidateUsers" align="center" label="任务候选人" width="150">
</el-table-column>
<el-table-column prop="apply_stolen_insurance" align="center" label="产品类型">
    <template slot-scope="scope">
        {{ scope.row.flowData.apply_stolen_insurance ? "已购买保险" : "未购买保险" }}
    </template>
</el-table-column>
<el-table-column prop="" align="center" label="车主">
    <template slot-scope="props">
        <span v-if="props.row.flowData.ownername">{{ props.row.flowData.ownername }}</span>
    </template>
</el-table-column>
<el-table-column prop="vin" align="center" width="170" label="车架号">
    <template slot-scope="props">
        {{ props.row.flowData.vin }}
    </template>
</el-table-column>
<el-table-column prop="createTime" align="center" label="申请时间" :formatter="dateFormatter">
</el-table-column>
<el-table-column prop="description" align="center"  width="220" label="描述">
    <template slot-scope="scope">
        <template v-if="scope.row.description">
            <template v-if="scope.row.description.indexOf('#') != -1">
               {{ scope.row.description.split('#')[0] }}<i class="iconfont icon-car carFont" :style="{color:scope.row.description.substr(scope.row.description.indexOf('#'),7)}"></i>
            </template>
            <template v-else>
                {{ scope.row.description }}
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
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_apply') != -1">
                    <el-dropdown-item @click.native="editCuserForm(scope.$index, scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteOrder(scope.$index, scope.row)">废除订单</el-dropdown-item>
                </template>
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_send') != -1">
                    <el-dropdown-item @click.native="successSendForm(scope.$index, scope.row)">完成派单</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,1)">拒绝处理</el-dropdown-item>
                </template>
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_work_receive') != -1">
                    <el-dropdown-item @click.native="passConstructionOrder(scope.$index, scope.row,0)">通过</el-dropdown-item>
                    <el-dropdown-item @click.native="passConstructionOrder(scope.$index, scope.row,1)">退回</el-dropdown-item>
                </template>
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_work') != -1 && scope.row.taskDefinitionKey.indexOf('node_work_receive') == -1">
                    <el-dropdown-item @click.native="successWorkForm(scope.$index, scope.row)">完成安装</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,2)">拒绝处理</el-dropdown-item>
                </template>
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_service_verify') != -1">
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,4)">通过</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,5)">拒绝处理</el-dropdown-item>
                    <el-dropdown-item @click.native="showInstallImg(scope.$index, scope.row)">查看安装信息</el-dropdown-item>
                    <el-dropdown-item @click.native="editWorkForm(scope.$index, scope.row)">修改安装设备</el-dropdown-item>
                    <el-dropdown-item @click.native="showDraw(scope.$index, scope.row)">查看安装轨迹</el-dropdown-item>
                </template>
                <template v-if="scope.row.taskDefinitionKey.indexOf('node_insurance') != -1">
                    <el-dropdown-item @click.native="successFornm(scope.$index, scope.row)">完成保险出单</el-dropdown-item>
                    <el-dropdown-item @click.native="refuseHandling(scope.$index, scope.row,6)">拒绝处理</el-dropdown-item>
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
:page-sizes="[15, 50, 80, 99]"
background
:page-size="pageSize"
layout="total,sizes, prev, pager, next"
:total="total" style="float:right;margin-top:10px;">
</el-pagination>
<!-- 报单分页标码 end-->

<!-- 派单 弹窗  start-->
<el-dialog title="派单" 
:modal-append-to-body="false" 
class="formdetail mw810" 
:visible.sync="clerkOrderDialogTableVisible" 
:close-on-click-modal="false">
<clerkOrder ref="dialogChild" v-if="clerkOrderDialogTableVisible" :curTaskId="curTaskId" @closeDialog = "closeDialog"></clerkOrder>
</el-dialog>
<!-- 派单 弹窗  end-->

<!-- 设备安装 弹窗  start-->
<el-dialog class="formdetail mw580"
@close="closeDialogEquipmentInstall" 
:modal-append-to-body="false"
title="施工" 
:visible.sync="equipmentDialogTableVisible" 
:close-on-click-modal="false">
<dialogEquipmentInstall 
v-if="equipmentDialogTableVisible"
ref="dialogChild" 
:curTaskId="curTaskId" 
@closeDialog = "closeDialog" 
@changeDialogImg="changeDialogImg" 
@showDeviceXzReplace="showDeviceXzReplace">
</dialogEquipmentInstall>
</el-dialog>
<!-- 图片查看 start-->
<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!-- 图片查看 end-->
<!-- 设备安装 弹窗  end-->


<!-- 完成保险出单 弹窗  start-->
<el-dialog class="formdetail mw630" :modal-append-to-body="false" title="保险出单" :visible.sync="successDialogTableVisible" :close-on-click-modal="false">
    <dialogSuccess ref="dialogChild" :curTaskId="curTaskId" @closeDialog = "closeDialog" @changeDialogImg="changeDialogImg"></dialogSuccess>
</el-dialog>
<!-- 完成保险出单 弹窗  end-->

<!-- 拒绝处理备注 弹窗  start-->
<el-dialog :title="rejectTitle" :modal-append-to-body="false" :visible.sync="rejectDialogVisible" :close-on-click-modal="false">
    <el-form label-position="left" label-width="50px">
        <el-input type="textarea" autosize placeholder="请输入备注" v-model="rejectRemarks"></el-input>
    </el-form>
    <el-col class="footer_but_bd" :span="24">
        <el-button type="primary"@click="addRefuseHandling" :loading="addLoading" style="margin-left:5px;float:right;">确定</el-button>
        <el-button @click="rejectDialogVisible = false" style="margin-left:5px;float:right;">取消</el-button>
    </el-col>
</el-dialog>
<!-- 拒绝处理备注 弹窗  end-->

<!-- 废除订单 弹窗  start-->
<el-dialog title="废除订单原因" :modal-append-to-body="false" :visible.sync="delorder.orderReasonDialogVisible" :close-on-click-modal="false">
    <el-form label-position="left" label-width="50px">
        <el-form-item label="原因">
            <el-input type="textarea" autosize placeholder="请输入原因" v-model="delorder.reson"></el-input>
        </el-form-item>
    </el-form>
    <el-col class="footer_but_bd" :span="24">
        <el-button type="primary"@click="comfirDelOrder" :loading="delorder.delOrderLoading" style="margin-left:5px;float:right;">确定</el-button>
        <el-button @click="delorder.orderReasonDialogVisible = false" style="margin-left:5px;float:right;">取消</el-button>
    </el-col>
</el-dialog>
<!-- 废除订单 弹窗  end-->

<!-- 安装信息 弹窗  start-->
<el-dialog title="安装信息" :modal-append-to-body="false" width="80%" :close-on-press-escape="false" @close="showDialogVisibleImgClose" :visible.sync="showDialogVisibleImg" class="formdetail showimgDialog">
    <el-row>
        <el-col :span="5" style="padding:0 20px;">
            <el-col tag="p" class="simgtitle ckpbefor">
                安装单信息<el-button @click="realTimeRefreshPro('vueAmap3')" :loading="realTimeRefreshLoading" size="mini"><i class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新</el-button>
            </el-col>
            <el-col :span="24">
                <dl class="dllist">
                    <dt>现场处理时间：</dt>
                    <dd>{{ ruleFormStatic.installapplydate }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>现场处理地点：</dt>
                    <dd>{{ ruleFormStatic.installaddress }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>安装小组：</dt>
                    <dd v-if="ruleFormStatic.installGroupInfo">{{ ruleFormStatic.installGroupInfo.groupname }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>安装工程师：</dt>
                    <dd v-if="ruleFormStatic.installEmployee">{{ ruleFormStatic.installEmployee.employeename }}</dd>
                </dl>
                <br />
                <dl class="dllist">
                    <dt>车架号：</dt>
                    <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.vin }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>车型：</dt>
                    <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.model }}</dd>
                </dl>
                <dl class="dllist">
                    <dt>车牌号：</dt>
                    <dd v-if="ruleFormStatic.vehicleInfo">{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>
                </dl>
                <br />
                <template v-for="(item,index) in ruleFormStatic.installDetails">
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
                        <dt>安装时状态：</dt>
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
                    <dl class="dllist">
                        <dt>最后一次通讯时间：</dt>
                        <dd v-if="item.recvtime">{{ item.recvtime }}</dd>
                    </dl>
                    <br />
                </template>
                <br />
                <dl class="dllist">
                    <dt>备注：</dt>
                    <dd v-if="ruleFormStatic.flowData">{{ ruleFormStatic.flowData.work_remark }}</dd>
                </dl>
            </el-col>
        </el-col>
        <el-col :span="19">
            <div class="myt_sel">
                <div class="myt_carflset fl">
                    <el-select v-model="deviceLinkIndex" v-show="dialogActiveNameImg == 1" @change="chageDeviceSect" clearable filterable placeholder="请选择设备">
                        <el-option
                        v-for="(item,index) in deviceSectList"
                        :key="item.packInfo.E_PRODUNUM"
                        :label="item.packInfo.E_PRODUNUM"
                        :value="item.id+','+index">
                    </el-option>
                </el-select>
                <el-select class="fr" @visible-change="changeCarPicLac" filterable v-loading="carPicLoading" v-model="carPicValue" clearable placeholder="请选择照片位置">
                    <el-option
                    v-for="item in carPicList"
                    :key="item.dictdatavalue"
                    :label="item.dictdatavalue"
                    :value="item.dictdatavalue">
                </el-option>
            </el-select>
        </div>
        <el-upload
        action="/vasms-web/atta/upload"
        list-type="picture"
        ref="orderUpload"
        name="mediaFile"
        :show-file-list="false"
        :accept="accept"
        :before-upload="beforeUpload"
        :on-success="carHandleSuccess"
        :on-remove="carHandleRemove">
        <el-button size="medium" type="primary">点击上传</el-button>
    </el-upload>
</div>
<el-tabs v-model="dialogActiveNameImg">
    <el-tab-pane label="设备照片" name="1" class="deviceclas">
        <el-row :gutter="20">
            <template v-for="(item,index) in ruleFormStatic.installDetails">
                <el-col :span="24">
                    <span class="formTile ml10">{{ item.packInfo.E_PRODTYPE+item.packInfo.E_PRODUNUM }}
                    </span>
                    <el-col :span="6" class="photosh" v-for="(itemPic,ind) in item.pictures">
                        <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                            <img class="image" :src="$store.state.IMG_URL+itemPic.piclink">
                            <div class="btsty">
                                <span class="fl mt5">{{ itemPic.picdesc }}</span>
                                <div class="bottom clearfix text_al fr">
                                    <i class="iconfont icon-p-delet operate operate-p-delet" @click="removeBusiPicture(itemPic.id,index,ind)" title="删除照片"></i>
                                </div>
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
                        <div class="bottom clearfix text_al fr">
                            <i class="iconfont icon-p-delet operate operate-p-delet" @click="removeBusiPicture(itemPic.id,-1,index)" title="删除照片"></i>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-tab-pane>
</el-tabs>
</el-col>
</el-row>
</el-dialog>
<!-- 安装信息 弹窗  end-->

<!-- 修改订单 弹窗  start-->
<el-dialog title="" class="formdetail" :modal-append-to-body="false" :visible.sync="editFormDialogTableVisible">
    <el-tabs v-model="editFormdialogActiveName">
        <el-tab-pane label="订单信息" name="1">
            <el-form ref="editFormData" :model="editFormData" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="订单编号">
                            <span>{{ editFormData.flowData.orderno }}</span>
                        </el-form-item>
                        <el-form-item label="产品类型">
                            <span>--</span>
                        </el-form-item>
                    <!--             <el-form-item label="车辆盗抢保障费用">
                                    <el-input type="text" placeholder="请输入车辆盗抢保障费用" v-model="editFormData.price">
                                      <template slot="append">元</template>
                                    </el-input>
                                </el-form-item> -->
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
                                    <span>{{  editFormData.declaredate }}</span>
                                </el-form-item>
                                <el-form-item label="报单类型">
                                    <span>{{ editFormData.declaretype }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span v-if="editFormData.declarEmployee">{{ editFormData.declarEmployee.employeename }}</span>
                                </el-form-item>
                                <!-- <el-form-item label="收款金额（POS机刷卡金额）">
                                   <el-input type="text" placeholder="请输入收款金额" v-model="editFormData.price">
                                      <template slot="append">元</template>
                                    </el-input>
                                </el-form-item> -->
                            </el-col>
                        </el-row>
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
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="车辆信息" name="3">
                    <el-form ref="vehicleEditFormInfos" :model="vehicleEditFormInfos" label-width="130px">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="车型">
                                    <el-input v-model="vehicleEditFormInfos.model" readonly placeholder="请输入车型"></el-input>
                                </el-form-item>
                                <el-form-item label="车辆颜色">
                                    <el-autocomplete
                                    disabled
                                    class="inline-input searchInput"
                                    v-model="vehicleEditFormInfos.color"
                                    :fetch-suggestions="querySearchColor"
                                    placeholder="请输入车辆颜色"
                                    ></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="车架号">
                                    <el-input v-model="vehicleEditFormInfos.vin" readonly placeholder="请输入车架号"></el-input>
                                </el-form-item>
                                <el-form-item label="车牌号">
                                    <el-input v-model="vehicleEditFormInfos.licenseplatenum" placeholder="请输入车牌号"></el-input>
                                </el-form-item>
                                <el-form-item label="车牌颜色">
                                        <!-- <el-select v-model="vehicleEditFormInfos.carPcolor" filterable placeholder="请选择">
                                          <el-option
                                            v-for="item in carPsalerData"
                                            :label="item.name"
                                            :key="item.name"
                                            :value="item.name">
                                          </el-option>
                                        </el-select> -->
                                        <span>{{ vehicleEditFormInfos.carPcolor }}</span>
                                        <!-- <el-input v-model="vehicleEditFormInfos.carPcolor" readonly placeholder="车牌颜色"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="车辆初次登记日期">
                                        <span>{{ util.formatDate.format(new Date(vehicleEditFormInfos.createdate), 'yyyy-MM-dd') }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="车辆状态">
                                        <el-radio-group v-model="vehicleEditFormInfos.cartype" disabled>
                                            <el-radio :label="1">新车</el-radio>
                                            <el-radio :label="2">旧车</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="购买日期">
                                        <el-date-picker type="date" placeholder="选择日期" disabled v-model="vehicleEditFormInfos.updatedate"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="车辆购置价">
                                        <el-input type="text" placeholder="请输入车辆购置价" readonly v-model="vehicleEditFormInfos.price">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="商业盗抢险购买">
                                        <el-radio-group v-model="vehicleEditFormInfos.hastheftinsurance" disabled>
                                            <el-radio :label="1">已购买</el-radio>
                                            <el-radio :label="2">未购买</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="购车款支付">
                                        <el-radio-group v-model="vehicleEditFormInfos.buycarmanprice" disabled>
                                            <el-radio :label="1">贷款</el-radio>
                                            <el-radio :label="2">全款</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="受理银行">
                                        <el-select v-model="vehicleEditFormInfos.receivingbankid" disabled @visible-change="receivinList" :loading="receLoading" filterable placeholder="请选择">
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
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="editFormAddLoading" @click="comfirEditFormInfo">修改</el-button>
                <el-button @click="editFormDialogTableVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog
        title="设备选择"
        :modal-append-to-body="false" 
        :visible.sync="deviceDialogVisible"
        >
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="profilters">
                <el-form-item>
                    <el-input v-model="profilters.search_key" @keyup.native.enter="replaceDevceinfo" placeholder="例如:设备编号,卡编号,卡号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="replaceDevceinfo" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="replaceDeviceData" max-height="300" v-loading="cvlistLoading" @row-dblclick="deviceClickHandle">
            <el-table-column align="center" prop="PRODSPEC" label="设备种类"></el-table-column>
            <el-table-column align="center" prop="PACKSELFID" label="自编号"></el-table-column>
            <el-table-column align="center" prop="E_PRODMODEL" label="设备类型"></el-table-column>
            <el-table-column align="center" prop="E_PRODUNUM" label="设备ID"></el-table-column>
            <el-table-column align="center" prop="E_STATUS" label="设备状态"></el-table-column>
            <el-table-column align="center" prop="C_PRODMODEL" label="卡类型"></el-table-column>
            <el-table-column align="center" prop="C_PRODUNUM" label="SIM卡号"></el-table-column>
            <el-table-column align="center" prop="E_INSURANCEFLAG" label="保险设备">
                <template slot-scope="props">
                    {{ props.row.E_INSURANCEFLAG == "Y"?"是":"否" }}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="E_NORMALFLAG" label="常规设备">
                <template slot-scope="props">
                    {{ props.row.E_NORMALFLAG == "Y"?"是":"否" }}
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
            @size-change="dhandleSizeChange"
            @current-change="dhandleCurrentChange"
            :page-sizes="[15, 50,80,99]"
            background
            :page-size="dpageSize"
            layout="total, sizes, prev, pager, next"
            :total="cdtotal" style="float:right;margin-top:10px;">
        </el-pagination>
    </el-col>
</el-dialog>
<!-- 修改订单 弹窗  end-->
<gdmap3 v-show="false" ref="vueAmap3"></gdmap3>
</section>
</template>
<script>
    import util from '../../../common/js/util';
    import async from 'async';
    import nanobar from '../../../common/js/nanobar';
    import gdmap3 from 'components/map/gdmap3';
    import clerkOrder from 'components/businessManage/declarationFormProcess/dialogClerkOrder';
    import dialogEquipmentInstall from 'components/businessManage/declarationFormProcess/dialogEquipmentInstall';
    import dialogSuccess from 'components/businessManage/declarationFormProcess/dialogSuccess';
    import {getTodoInfoList,getvariablesTaskInfoList,getCorpNameList,getFormCount,addApprovaperSend,addApprovaperWork,addApprovaperServiceVerify,searchCorpNameList,busiPicture,editVehicleInfo,editDeclarationInfo,editOwnerInfo,modifyBusiPicture,removeBusiPicture,getDeptManagerInfoList,editAzPromodify,deleteProcess,cldeviceIsOnstate,getOperationRecord,getMyDeviceInfo,getCarPicLocation,addApprovaperWorkReceiveCl,addApprovaperInsurance} from '../../../api/api';
    export default {
        props:['windowOutHeight'],
        components:{clerkOrder,dialogEquipmentInstall,dialogSuccess,gdmap3},
        data() {
            return {
                //搜索 筛选信息
                filters: {
                    orderno:'',
                    startDate: '',
                    assignee: '',
                    ownername:'',
                    vehicle_modle:'',
                    apply_user_id:'',
                    vin:'',
                    apply_stolen_insurance:'',
                    assignee:'',
                    corpname:''
                },
                realTimeRefreshLoading:false,
                util:util, 
                //车辆信息修改表单
                vehicleEditFormInfos:{
                    receivingbankid:'',
                    carPcolor:'蓝色',
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
                expandLoading:false,
                copsUerLoading:false,
                userDataList:[],
                stolen:[{value:"已购买保险",id:0},{value:"未购买保险",id:1}],
                //编辑订单
                editFormAddLoading:false,
                //补传照片是否显示弹窗
                uploadDialogVisibleImg:false,
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
                //安装信息
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
                indDe:0,
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
                        receivingbank:{}
                    },
                    installDetails:'',
                    corporateInfo:{},
                    declarEmployee:{},
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    flowData:{
                        verify_result:'',
                        apply_remark:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    }
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
                        receivingbank:{}
                    },
                    installDetails:'',
                    corporateInfo:{},
                    declarEmployee:{},
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    flowData:{
                        verify_result:'',
                        apply_remark:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    }
                },
                isExpandeds:true,
                //拒绝备注
                rejectRemarks:'',
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
                        receivingbank:{}
                    },
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    flowData:{
                        verify_result:'',
                        apply_remark:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    },
                    pictures:[]
                },
                expandRuleFormStatic:{
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:'',
                        receivingbank:{}
                    },
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    flowData:{
                        verify_result:'',
                        apply_remark:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    },
                    pictures:[]
                },
                //受理银行数组
                salerData:[],
                //loading受理银行下拉
                receLoading:false,
                //当前流程任务id
                curTaskId:'',
                viewer:'',
                total: 0,
                currentPage: 0,
                //拒绝理由提交加载
                addLoading:false,
                curLinkid:'',
                //是否是弹窗详情 不是为1 是为2
                clickState:1,
                delorder:{
                    orderReasonDialogVisible:false,
                    reson:'',
                    delOrderLoading:false,
                    processInstanceId:'',
                },
                listLoading: false,
                cvlistLoading:false,
                accept:"jpg,png,jpeg",
                pageSize:15,
                editPiceForm:{
                    id:'',
                    type:'edit'
                },
                profilters: {
                    search_key  : ''
                },
                replaceDeviceData:[],
                deviceDialogVisible:false,
                dpageSize:10,
                dcurrentPage:0,
                cdtotal:0,
                installUserId:'',
                citem:'',
                cindex:'',
                carPicLoading:false,
                carPicList:[],
                carPicValue:'',
                deviceSectList:[],
                deviceLinkIndex:'',
                deviceLinkid:'',
                deviceIndex:0

            }    
        },
        methods: {
            //改变设备记录当前设备位置
            chageDeviceSect(item){
                this.deviceLinkid = item.split(",")[0];
                this.deviceIndex = item.split(",")[1];
            },
            //获取车辆上传照片位置
            changeCarPicLac(r){
                if(!r || this.carPicList.length > 0) return;
                this.carPicLoading = true;
                let para = {
                    showCount:1000
                }
                getCarPicLocation(para).then((res) => {
                    this.carPicLoading = false;
                    if(res.data.result.code == 0){
                        this.carPicList = res.data.data.records;
                    }
                });
            },
            deviceClickHandle(row, event, column){
                this.$refs.dialogChild.rdeviceClickHandle(row, event, column,this.citem,this.cindex);
                this.deviceDialogVisible = false;
            },
            showDeviceXzReplace(installUserId,olditem,index){
                this.installUserId = installUserId;
                this.citem = olditem;
                this.cindex = index;
                this.deviceDialogVisible = true;
                this.replaceDevceinfo();
            },
            //切换当前页
            dhandleCurrentChange(val) {
                this.dcurrentPage = val;
                this.replaceDevceinfo();
            },
              //切换每页显示数量
              dhandleSizeChange(val) {
                  this.dpageSize = val;
                  this.replaceDevceinfo();
              },
            //替换设备查询
            replaceDevceinfo(){
                if(!this.installUserId){
                    this.$message({
                        showClose: true,
                        message: '未找到安装人员信息！',
                        type: 'error'
                    });
                    return;
                }
                let para = {
                    userid:this.installUserId,
                    showCount:this.dpageSize,
                    E_STATUS:"在库",
                    search_key:this.profilters.search_key,
                    E_INSURANCEFLAG:this.citem.E_INSURANCEFLAG == 'N'?'':this.citem.E_INSURANCEFLAG,
                    E_NORMALFLAG:this.citem.E_NORMALFLAG == 'N'?'':this.citem.E_NORMALFLAG
                };
                this.cvlistLoading = true;
                getMyDeviceInfo(para).then((res) => {
                    this.cvlistLoading = false;
                    if(res.data.result.code == 0){
                        this.replaceDeviceData = res.data.data.records;
                        this.cdtotal = res.data.data.totalResult;
                    }else{
                        this.replaceDeviceData = [];
                        this.cdtotal = 0;
                    }
                }).catch((error) => {
                    this.cvlistLoading = false;
                });
            },
            //关闭子类窗体 清空子类数据
            closeDialogEquipmentInstall(){
                this.$refs.dialogChild.resetForm();
            },
            comfirDelOrder(){
                let para = {
                    id:this.delorder.processInstanceId,
                    reson:this.delorder.reson
                }
                this.delorder.delOrderLoading = true;
                deleteProcess(para).then((res) => {
                    this.delorder.delOrderLoading = false;
                    this.delorder.orderReasonDialogVisible = false;
                    this.getTodo();
                });
            },
            //废除订单
            deleteOrder(index,row){
                this.delorder.processInstanceId = row.processInstanceId;
                this.delorder.orderReasonDialogVisible = true;
            },
            //补传 订单传照片删除
            carHandleRemove(file, fileList) {
              // this.installPic(fileList,1);
            },
            //删除订单图片
            removeBusiPicture(id,pindex,cindex){
                this.$confirm('确认删除当前订单图片吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let para = {
                        ids:id,
                        method:"delete"
                    };
                    removeBusiPicture(para).then((res) => {
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '删除照片成功！',
                                type: 'success'
                            });
                            if(this.dialogActiveNameImg == '1'){
                                this.ruleFormStatic.installDetails[pindex].pictures.splice(cindex,1);
                            }
                            if(this.dialogActiveNameImg == '2'){
                                this.ruleFormStatic.pictures.splice(cindex,1);
                            }
                        }

                    });
                });
            },
             //修改订单图片
             modifyBusiPicture(id){
                //启动选择文件界面
                $(this.$refs.orderUpload.$children[0].$el).click();
                this.editPiceForm.id = id;
                this.editPiceForm.type = 2;
            },
            //
            beforeUpload(file){
                if(!this.deviceLinkid && this.dialogActiveNameImg == '1'){
                    this.$message({
                        showClose: true,
                        message: '请选择设备',
                        type: 'error'
                    });
                    return false
                }
                if(!this.carPicValue){
                    this.$message({
                        showClose: true,
                        message: '请选择照片位置',
                        type: 'error'
                    });
                    return false;
                }else{
                    nanobar.go(70);
                }
            },
            //补传 订单传照片成功
            carHandleSuccess(response, file, fileList){
                let para = {
                    pictype:this.dialogActiveNameImg == '1'?'NBI':'NB',
                    linkid:this.dialogActiveNameImg == '1'?this.deviceLinkid:this.curLinkid,
                    piclink:response,
                    picdesc:this.carPicValue
                }
                busiPicture(para).then((res) => {
                    let picRes = res.data.data;
                    nanobar.go(100);
                    if(res.data.result.code == 0){
                        if(this.dialogActiveNameImg == '1'){
                            this.ruleFormStatic.installDetails[this.deviceIndex].pictures.push(picRes);
                        }
                        if(this.dialogActiveNameImg == '2'){
                            this.ruleFormStatic.pictures.push(picRes);
                        }
                    }
                });
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
            //修改安装信息
            editWorkForm(index,row){
                this.equipmentDialogTableVisible = true;
                this.clickState = 3;
                this.getFormData(row);
            },
            // 查看安装人员轨迹
            showDraw(index,row){
                window.open('http://mqtt.wwvas.com:9201/Map/UserHistoryRoute?id=' + row.flowData.work_user_id);
            },
            //修改订单信息
            editFormInfo(index,row){
                this.editFormDialogTableVisible = true;
                this.clickState = 4;
                this.getFormData(row);
            },
            comfirEditFormInfo(){
                this.editFormAddLoading = true;
                if(this.editFormdialogActiveName == '1'){
                    let para = {
                        id:this.editFormData.id,
                        salername:this.editFormData.salername,
                        salermobile:this.editFormData.salermobile
                    }
                    editDeclarationInfo(para).then((res) => {
                        this.editFormAddLoading = false;
                        this.editFormDialogTableVisible = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '订单信息修改成功！',
                                type: 'success'
                            });
                        }
                    });
                    return;
                }
                if(this.editFormdialogActiveName == '2'){
                    let para = {
                        id:this.ownEditFormInfos.id,
                        idcard:this.ownEditFormInfos.idcard,
                        name:this.ownEditFormInfos.name,
                        mobile:this.ownEditFormInfos.mobile
                    }
                    editOwnerInfo(para).then((res) => {
                        this.editFormAddLoading = false;
                        this.editFormDialogTableVisible = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '车主信息修改成功！',
                                type: 'success'
                            });
                        }
                    });
                    return;
                }
                if(this.editFormdialogActiveName == '3'){
                    let para = {
                        id:this.vehicleEditFormInfos.id,
                        licenseplatenum:this.vehicleEditFormInfos.licenseplatenum
                    }
                    editVehicleInfo(para).then((res) => {
                        this.editFormAddLoading = false;
                        this.editFormDialogTableVisible = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '车辆信息修改成功！',
                                type: 'success'
                            });
                        }
                    });
                    return;
                }
            },
            //初始化修改订单信息
            initEditFormInfo(data){
                //所有订单信息
                this.editFormData = data;
                this.editFormData.id = data.id;
                //车主信息
                this.ownEditFormInfos = data.ownerInfo;
                this.ownEditFormInfos.carmantype = 1;
                this.ownEditFormInfos.id = data.ownerInfo.id;
                /*车辆颜色*/
                if(data.vehicleInfo){
                    this.vehicleEditFormInfos = data.vehicleInfo;
                    this.vehicleEditFormInfos.id = data.vehicleInfo.id;
                    this.vehicleEditFormInfos.carPcolor = '蓝色';
                    this.vehicleEditFormInfos.hastheftinsurance = parseInt(data.vehicleInfo.hastheftinsurance) == 1 ? 1 : 2;;
                    if(data.vehicleInfo.receivingbank){
                        this.vehicleEditFormInfos.receivingbankid = data.vehicleInfo.receivingbank.corpname;
                        this.vehicleEditFormInfos.corpname = data.vehicleInfo.receivingbank.id;
                    }
                    this.vehicleEditFormInfos.cartype = 1;
                    this.vehicleEditFormInfos.buycarmanprice = 1;
                }
            },
            //操作显示子类弹窗
            changeDialogImg(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
            //业务员下拉查询
            changeUserCop(r){
                if(!r || this.userDataList.length > 0) return;
                this.copsUerLoading = true;
                let para = {
                    showCount:10000
                };
                getDeptManagerInfoList(para).then((res) => {
                    this.userDataList = res.data.data.records;
                    this.copsUerLoading = false;
                });
            },
            //操作公司下拉查询
            changeCop(r){
                if(!r || this.copName.length > 0) return;
                this.copLoading = true;
                let para = {
                    showCount:1000
                }
                getCorpNameList(para).then((res) => {
                    this.copName = res.data.data.records;
                    this.copLoading = false;
                });
            },
            //实时获取设备位置 和 在线情况
            realTimeRefreshPro(gmapname){
                let _this = this,
                pro = _this.ruleFormStatic,
                len = pro.installDetails.length;
                console.log(pro)
                if(_this.$refs[gmapname]) _this.$refs[gmapname].clearMap();
                if(len > 0){
                    let i = _this.indDe,
                    para = {id:pro.installDetails[i].packInfo.E_PRODUNUM};
                    _this.realTimeRefreshLoading = true;
                    async.waterfall([
                        function(callback) {
                            cldeviceIsOnstate(para).then((res) => {
                                let data = res.data.data.realdata;
                               
                                callback(null, data);
                            });
                            
                        },
                        function(data, callback) {
                            if(data){
                                if(data.lng == 0 || data.lat == 0){
                                    _this.ruleFormStatic.installDetails[i].curaddress = "无定位";
                                    callback(null, data);
                                }else{
                                    _this.$refs[gmapname].getAddress(util.transformWGStoGCJ(data.lng,data.lat),para.id,(res)=>{
                                        _this.ruleFormStatic.installDetails[i].curaddress = res;
                                        callback(null, data);
                                    });
                                }
                            }else{
                                _this.ruleFormStatic.installDetails[i].curaddress = "无定位";
                                callback(null, data);
                            }
                        },
                    ], function (err, data) {
                        console.log(data)
                        if(data){
                            switch(data.istate){
                                case 0:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "行驶";
                                break;
                                case 1:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "离线";
                                break;
                                case 2:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "停车";
                                break;
                                case 3:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "报警";
                                break;
                                case 4:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "无效定位";
                                break;
                                case 5:
                                    _this.ruleFormStatic.installDetails[i].curonlinestatus = "未定位";
                                break;
                            }
                            _this.ruleFormStatic.installDetails[i].recvtime = data.recvtime;
                        }else{
                            _this.ruleFormStatic.installDetails[i].curaddress = "无定位";
                            _this.ruleFormStatic.installDetails[i].curonlinestatus ="未在线";
                        }
                         _this.realTimeRefreshLoading = false;
                        _this.indDe++;
                        if(_this.indDe < len) _this.realTimeRefreshPro(gmapname);
                        if(_this.indDe == len) _this.indDe = 0;
                    });
                }
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
                        taskDefinitionKey:"node_apply"
                    };
                }
                if(v == 2){
                    this.curStateData = {
                        taskDefinitionKey:"node_send"
                    };
                }
                if(v == 3){
                    this.curStateData = {
                        taskDefinitionKey:"node_work"
                    };
                }
                if(v == 4){
                    this.curStateData = {
                        taskDefinitionKey:"node_service_verify"
                    };
                }
                if(v == 5){
                    this.curStateData = {
                        taskDefinitionKey:"node_insurance"
                    };
                }
                if(v == 6){
                    this.curStateData = {
                        taskDefinitionKey:"node_work_receive"
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
                    this.clickState = 5;
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
            taskFormatter(row,col){
                let task_vars = row.task_vars;
                if(task_vars){
                    return (task_vars.result?"通过":"拒绝")+(task_vars.remark?'-备注说明：'+task_vars.remark:"");
                } else {
                    return "";
                }
            },
            //格式化后台传来的时间戳
            dateFormatter(row,col){
                return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss');
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
                    result:false,
                    remark:this.rejectRemarks
                }
                if(this.sumbitType == 1){
                    this.addLoading = true;
                    //提交审核结果
                    addApprovaperSend(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '拒绝成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                if(this.sumbitType == 2){
                    this.addLoading = true;
                    //提交审核结果
                    addApprovaperWork(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                if(this.sumbitType == 3){
                    this.addLoading = true;
                    //提交审核结果
                    addApprovaperServiceVerify(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                if(this.sumbitType == 4){
                    this.addLoading = true;
                    addformpara.properties.result = true;
                    //提交审核结果
                    addApprovaperServiceVerify(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                if(this.sumbitType == 5){
                    this.addLoading = true;
                    addformpara.properties.result = false;
                    //提交审核退回
                    addApprovaperServiceVerify(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '退回成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                if(this.sumbitType == 6){
                    this.addLoading = true;
                    addformpara.properties.result = false;
                    //提交审核退回
                    addApprovaperInsurance(addformpara).then((res) => {
                        this.addLoading = false;
                        if(res.data.result.code == 0){
                            this.$message({
                                message: '退回成功！',
                                type: 'success'
                            });
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    }).catch((error) => {
                        this.addLoading = false;
                    });
                }
                this.rejectRemarks = '';
                this.rejectDialogVisible = false;
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
                    addApprovaperWorkReceiveCl(addformpara).then((res) => {
                        if(res.data.result.code == 0){
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    });
                }
                if(type == 1){
                    addformpara.properties.result = false;
                    addApprovaperWorkReceiveCl(addformpara).then((res) => {
                        if(res.data.result.code == 0){
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                            this.getTodo();
                        }
                    });
                }
            },
            //拒绝理由弹窗显示 并且记录相关信息
            refuseHandling(index,row,type){
                this.sumbitType = type;
                this.curTaskId = row.id;
                this.rejectTitle = "拒绝理由";
                if(type == 4) this.rejectTitle = "通过备注";
                if(type == 5) this.rejectTitle = "拒绝理由";
                this.rejectDialogVisible = true;
            },
            //获取我的待办列表列表
            getTodo() {
                let para = {
                    currentPage   : this.currentPage,
                    showCount    : this.pageSize,
                    orderno       : this.filters.orderno,
                    startTime     : this.filters.startDate?(this.filters.startDate[0]?util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss'):''):'',
                    endTime       : this.filters.startDate?(this.filters.startDate[1]?util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss'):''):'',
                    corpname      : this.filters.corpname.corpname,
                    ownername     : this.filters.ownername,
                    vehicle_modle : this.filters.vehicle_modle,
                    apply_user_id : this.filters.apply_user_id,
                    apply_stolen_insurance : this.filters.apply_stolen_insurance,
                    assignee      :    this.filters.assignee,
                    vin      :    this.filters.vin,
                    type          : 1,
                    all           :true
                };
                para = Object.assign(para,this.curStateData);
                this.listLoading = true;
                getTodoInfoList(para).then((res) => {
                    this.listLoading = false;
                    if(res.data.result.code == 0){
                        this.total       = res.data.data.totalResult;
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
                  getvariablesTaskInfoList(pa).then((res) => {
                      let _this = this,data = res.data.data;
                      nanobar.go(100);
                      this.expandLoading = false;
                      if(!data.vehicleInfo){
                          data.vehicleInfo = _this.ruleFormStatic.vehicleInfo;
                      }
                      if(!data.ownerInfo){
                          data.ownerInfo = _this.ruleFormStatic.ownerInfo;
                      }
                      if(!data.installEmployee){
                          data.installEmployee = _this.ruleFormStatic.installEmployee;
                      }
                      if(!data.installGroupInfo){
                          data.installGroupInfo = _this.ruleFormStatic.installGroupInfo;
                      }
                      if(!data.flowData){
                          data.flowData = _this.ruleFormStatic.flowData;
                      }
                      if(!data.vehicleInfo.receivingbank){
                          data.vehicleInfo.receivingbank = _this.ruleFormStatic.vehicleInfo.receivingbank;
                      }
                      if(this.clickState == 1) {
                          this.ruleFormStatic = data;
                          this.realTimeRefreshPro('vueAmap3');
                          this.deviceSectList = this.ruleFormStatic.installDetails;
                          this.curLinkid = this.ruleFormStatic.id;
                      }
                      if(this.clickState == 2) this.dialogFormData = data;
                      if(this.clickState == 3) this.$refs.dialogChild.getCustoHistoryInfo(data,obj);
                      if(this.clickState == 4) this.initEditFormInfo(data);
                      if(this.clickState == 5) this.expandRuleFormStatic = data;
                  }).catch((error) => {
                      nanobar.go(100);
                      this.expandLoading = false;
                  });
                },
            //查看图片窗口关闭
            showDialogVisibleImgClose(){
                this.resetFieldsRuleForm();
            },
            //查看设备安装照片
            showInstallImg(index,row){
                this.showDialogVisibleImg = true;
                this.clickState = 1;
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
            editCuserForm(index,row){
                this.$store.state.formObj = row;
                this.$store.state.isApply = true;
                this.$router.push('/formProcess');
            },
            //显示审核该报单界面
            handleEdit(index, row) {
                this.$store.state.formObj = row;
                if(row.taskDefinitionKey == 'proc_new_build_node_apply' || row.taskDefinitionKey == 'node_apply'){
                    this.$store.state.isApply = true;
                    this.$router.push('/formProcess');
                    return;
                }
                this.$store.state.isApply = false;
                if(row.taskDefinitionKey == 'proc_new_build_node_send' || row.taskDefinitionKey == 'node_send'){
                    this.$router.push('/formProcess/1');
                }
                if(row.taskDefinitionKey == 'proc_new_build_node_work' || row.taskDefinitionKey == 'node_work'){
                    this.equipmentDialogTableVisible = true;
                    this.dialogLoading = true;
                    this.clickState = 3;
                    this.getFormData(row);
                }
                if(row.taskDefinitionKey == 'proc_new_build_node_service_verify' || row.taskDefinitionKey == 'node_service_verify'){
                    this.$router.push('/formProcess/3');
                }
                if(row.taskDefinitionKey == 'proc_new_build_node_insurance' || row.taskDefinitionKey == 'node_insurance'){
                    this.$router.push('/formProcess/4');
                }
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
                    this.dialogLoading = false;
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
                    type:1
                };
                getFormCount(para).then((res) => {
                    let node = res.data.data;
                    if(node == null) return;
                    this.fromNum.num1 = (node.proc_new_build_node_apply + node.node_apply) ? (node.proc_new_build_node_apply + node.node_apply) : 
                        node.proc_new_build_node_apply ? node.proc_new_build_node_apply : 
                        node.node_apply ? node.node_apply : 0;
                    this.fromNum.num2 =  (node.proc_new_build_node_send + node.node_send) ? (node.proc_new_build_node_send + node.node_send) : 
                        node.proc_new_build_node_send ? node.proc_new_build_node_send : 
                        node.node_send ? node.node_send : 0;
                    this.fromNum.num3 = (node.proc_new_build_node_work + node.node_work) ? (node.proc_new_build_node_work + node.node_work) :
                        node.proc_new_build_node_work ? node.proc_new_build_node_work : 
                        node.node_work ? node.node_work : 0;
                    this.fromNum.num4 = (node.proc_new_build_node_service_verify + node.node_service_verify) ? (node.proc_new_build_node_service_verify + node.node_service_verify) : 
                        node.proc_new_build_node_service_verify ? node.proc_new_build_node_service_verify : 
                        node.node_service_verify ? node.node_service_verify : 0;
                    this.fromNum.num5 = (node.proc_new_build_node_insurance + node.node_insurance) ? (node.proc_new_build_node_insurance + node.node_insurance) :
                        node.proc_new_build_node_insurance ? node.proc_new_build_node_insurance : 
                        node.node_insurance ? node.node_insurance : 0;
                   this.fromNum.num6 = (node.proc_new_build_node_work_receive + node.node_work_receive) ? (node.proc_new_build_node_work_receive + node.node_work_receive) :
                        node.proc_new_build_node_work_receive ? node.proc_new_build_node_work_receive : 
                        node.node_work_receive ? node.node_work_receive : 0;

                    // this.fromNum.num1 = (node.proc_new_build_node_apply + node.node_apply)?(node.proc_new_build_node_apply + node.node_apply):0;
                    // this.fromNum.num2 = (node.proc_new_build_node_send  + node.node_send)?(node.proc_new_build_node_send +  node.node_send):0;
                    // this.fromNum.num3 = (node.proc_new_build_node_work +  node.node_work)?(node.proc_new_build_node_work + node.node_work):0;
                    // this.fromNum.num4 = (node.proc_new_build_node_service_verify + node.node_service_verify)?(node.proc_new_build_node_service_verify + node.node_service_verify):0;
                    // this.fromNum.num5 = (node.proc_new_build_node_insurance + node.node_insurance)?(node.proc_new_build_node_insurance + node.node_insurance):0;
                    // this.fromNum.num0 = (this.fromNum.num1+this.fromNum.num2+this.fromNum.num3+this.fromNum.num4+this.fromNum.num5)?(this.fromNum.num1+this.fromNum.num2+this.fromNum.num3+this.fromNum.num4+this.fromNum.num5):0;
                });
            },
            //初始化ruleFormStatic
            resetFieldsRuleForm(){
                this.deviceSectList = [];
                this.deviceLinkIndex = '';
                this.deviceLinkid = '';
                this.deviceIndex = 0;
                this.carPicList = [];
                this.carPicValue = '';
                this.ruleFormStatic = {
                    vehicleInfo:{
                        model:'',
                        color:'',
                        licenseplatenum:'',
                        vin:'',
                        price:'',
                        yearsofservice:'',
                        receivingbank:{}
                    },
                    ownerInfo:{
                        name:'',
                        idcard:'',
                        mobile:''
                    },
                    flowData:{
                        verify_result:'',
                        apply_remark:''
                    },
                    installEmployee:{
                        employeename:''
                    },
                    installGroupInfo:{
                        groupname:''
                    },
                    pictures:[]
                }
            }
        },
        //初始化数据
        created(){
            this.getTodo();
        }
    }
</script>