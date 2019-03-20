<!--* 
* @description: 我的保险流程
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
                <el-row :gutter="10" class="colflex">
                    <el-col :span="3">
                        <el-form-item prop="orderno" class="sf100">
                            <el-select v-model="filters.curInsuranceStatus" clearable value-key="corpname" filterable :loading="insuranceLoading" placeholder="请选择保险状态">
                                <el-option
                                v-for="item in insuranceStatus"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="ownername" class="sf100">
                            <el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="vin" class="sf100">
                            <el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="licenseplatenum" class="sf100">
                            <el-input v-model="filters.licenseplatenum" @keyup.native.enter="getTodo" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="colflex1">
                    <el-form-item style="float:right;margin-right:0;">
                        <el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>

        <el-table :max-height="windowOutHeight-170" stripe :data="todo" border ref="todeTable" highlight-current-row @row-dblclick="dblShowDetail" v-loading="listLoading" style="width: 100%;">
            <el-table-columntype="index" align="center" label="业务号" width="30">
            </el-table-column>
            <el-table-column prop="name" align="center" label="保险状态">
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="申请时间" :formatter="dateFormatter">
            </el-table-column>
            <el-table-column prop="flowData.corpname" align="center" label="客户">
            </el-table-column>
            <el-table-column prop="flowData.VehicleInfo_licenseplatenum" align="center" label="车牌号">
            </el-table-column>
            <el-table-column prop="flowData.owner_name" align="center" label="车主">
            </el-table-column>
            <el-table-column prop="flowData.VehicleInfo_modle" align="center" label="车型">
            </el-table-column>
            <el-table-column prop="flowData.VehicleInfo_vin" align="center" label="车架号">
            </el-table-column>
            <el-table-column label="操作" width="100" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" v-if="scope.row.name == '打印'" @click="print(scope.$index, scope.row)">打印保单</el-button>
                    <el-button size="mini" type="primary" v-else @click="showDetail(scope.$index, scope.row)">出单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 报单分页标码 start-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" background :page-size="pageSize" layout="total,sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
        </el-pagination>
        <!-- 报单分页标码 end-->

        <!-- 打印保单 -->
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="bxDialogVisible" size="small" @close="closeHandel " :close-on-click-modal="false">
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
<script>
    import util from '../../../common/js/util';
     //组件引入——这里引入 【所有代办】中的打印模板
    import chinaLife from 'components/businessManage/myOrderAllInfo/chinaLife';
    import chinaPeopleIns from 'components/businessManage/myOrderAllInfo/chinaPeopleIns';
    import { getTodoInfoList,addExamine,addInsuranceComplete } from '../../../api/api';
    export default {
        props: ['windowOutHeight'],
        components:{
            chinaLife,
            chinaPeopleIns
        },
        data() {
            return {
                bxDialogVisible:false,
                editFormdialogActiveName:'1',
                //搜索 筛选信息
                filters: {
                    orderno: '',
                    ownername: '',
                    vin: '',
                    startDate: '',
                    licenseplatenum: '',
                    curInsuranceStatus:''
                },
                flowData:'',
                insuranceLoading:false,
                insuranceStatus:[{id:1,value:'全部'},{id:2,value:'出单'},{id:3,value:'打印'}],
                remarks:'',
                listLoading:false,
                //处理表格列表数据
                todo: [],
                total: 0,
                pageSize: 15
            }
        },
        methods: {
            //关闭弹窗 质问 用户 是否打印了 保单  如果打印了  结束流程  否则继续
            closeHandel(){
                this.$confirm('如果保单打印成功，将结束当前流程', '提示', {
                    confirmButtonText: '打印完成',
                    cancelButtonText: '继续打印',
                    closeOnClickModal: false,
                    loseOnPressEscape: false,
                    center: true,
                    type: 'warning'
                }).then(() => {
                    let addformpara = {
                        taskId: this.$refs.chinaLife.flowData.id
                    };
                    addInsuranceComplete(addformpara).then((res) => {
                        if(res.data.result.code == 0) {
                            this.$message({
                                message: '成功！',
                                type: 'success'
                            });
                            this.getTodo();
                            //初始化待办数量
                            this.$store.dispatch('initFormNum');
                        }
                    });
                }).catch(() => {
                });
            },
            //关闭当前页面弹窗
            closeDialog(){
                this.bxDialogVisible = false;
                this.getTodo();
            },
            //显示 保险模板打印
            print(index,row){
                this.bxDialogVisible = true;
                this.$nextTick(function(){//向子级传参
                    this.$refs.chinaLife.flowData = row;
                    this.$refs.chinaPeopleIns.flowData = row;
                })
            },
            //格式化后台传来的时间戳
            dateFormatter(row,col){
                return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss');
            },
            //处理流程节点进度
            passHandle(index,row,type){
                let para = {
                    taskId:row.id,
                    other:{
                        handoverstatus:'A',
                        remarks:this.remarks
                    }
                };
                if(type == 1) para.other.handoverstatus = 'A';
                if(type == 2) para.other.handoverstatus = 'R';
                addExamine(para).then((res) => {
                }).catch((error) => {
                });
            },
            //查看交接流程详情
            showDetail(index,row){
                row.type = 5;
                this.$store.state.formObj = row;
                this.$router.push('/formProcess/4');
            },
            //查看交接流程详情
            dblShowDetail(row,e,col){
                if(row.name == '打印') return;
                row.type = 5;
                this.$store.state.formObj = row;
                this.$router.push('/formProcess/4');
            },
            //获取我的待办列表列表
            getTodo() {
                let para = {
                    currentPage: this.currentPage,
                    showCount: this.pageSize,
                    taskDefinitionKey: this.filters.curInsuranceStatus == '出单' ? 'node_work' : this.filters.curInsuranceStatus == '打印' ? 'sid-71506EF2-8A37-4FA4-B84C-B361F686EFC7' : '',
                    owner_name: this.filters.ownername,
                    VehicleInfo_licenseplatenum:this.filters.licenseplatenum,
                    VehicleInfo_vin: this.filters.vin,
                    type:5
                };
                this.listLoading = true;
                getTodoInfoList(para).then((res) => {
                    this.listLoading = false;
                    if(res.data.result.code == 0) {
                        this.total = res.data.data.totalResult
                        this.todo = res.data.data.records;
                    }
                }).catch((error) => {
                    this.listLoading = false;
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
            handleEditRow(row, e, col) {

            },
            resetForm(){
                this.filters = {
                    orderno: '',
                    ownername: '',
                    vin: '',
                    startDate: '',
                    licenseplatenum: '',
                    curInsuranceStatus:'出单'
                }
            }
        },
        //初始化数据
        created() {
             // this.$router.push('/insuranceDetail')
            this.getTodo();
        }
    }
</script>