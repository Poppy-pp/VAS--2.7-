<!--* 
* @description: 人寿保险保单
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
    <section>
        <section id="rs_print" class="bxd_rsbx zgrs_sty">
            <div class="bxd_header no-print">中国人寿保险凭证</div>
            <div class="bxd_center">
               <div class="bcFl">
                   <p class="no-print">1.投保人及被保险人：四川万网鑫成信息科技有限公司（以下简称万网）</p>
                   <p class="no-print">2.保单号码：815152017440370000001</p>
                   <p class="no-print">3.保险范围：凡在中华人民共和国境内（不含港、澳、台），购买四川万网车辆盗抢保障服务系统，并安装该公司车载智能终端的合法机动车。</p>
                   <p class="no-print">4.保险责任：（1）在保单约定销售期限内，安装四川万网车辆盗抢保障服务系统终端的合法车辆，在约定服务期限内，发生全车被盗窃、抢劫、抢夺的，经出险地当地的县级公安部门立案证明，满60天未查明下落的下落的车辆损失，由保险人在约定的赔偿限额内按照车辆实际价值的100%进行赔偿；（2）早保险车辆全车被盗窃、抢劫、抢夺期间内，被盗车辆遭受破坏需要修复的合理费用，由保险人在约定的赔偿限额内按照车辆修复金额进行赔偿。</p>
                   <p class="no-print">5.主要除外责任：</p>
                   <p class="no-print">被保险人及实际使用客户的故意行为；用户违反本产品使用说明书中规定的操作规程，或者擅自对产品进行拆装、移机；移动通讯费或定位服务费欠费、停机导致设备无法正常工作的；对于定位设备处于未上线状态的车辆在经投保人通知后，车主未按投保人要求配合售后服务的；租赁车辆与承租人同时失踪的；被他人诈骗造成全车或部分损失的；非全车遭受盗抢，仅车上零部件或车上设备被盗，被破坏的；被保险人因违反政府相关法律、法规、被国家相关单位罚没、扣押的；车主因与他人在民事、经济纠纷而被抢夺的；保险责任外的其他一切责任。</p>
                   <p class="no-print">6.保险期限：本凭证的有效期限为：</p>
                   <p><input type="text" v-model="ruleForm.yxqDate" class="yxqDate" readonly></p>
                   <p class="no-print">；有效期限为保险期限；在保险期限内如发生车辆转让，保险期限终止；车辆所有人或管理人，应及时通知四川万网办理变更手续，手续变更次日起零时保险责任恢复，否则中国人寿财产保险股份有限公司</p>
               </div>
               <div class="bcFr">
                    <p class="no-print">深圳市分公司（以下简称“保险人”）不承担保险责任。</p>
                    <p class="no-print">7.赔偿标准：</p>
                    <p class="no-print">在遵照保险责任及主要除外责任的前提下，赔付标准如下：</p>
                    <p><span class="no-print">(1)发生全车盗抢事故，满60天未能追回，车辆未购买机动车商业盗抢险的，按被盗车辆实际价值的100%确定损失，最高不超过投保时确定的赔付限额，最高赔偿限额：</span><input type="text" v-model="ruleForm.yxqDate1" class="yxqDate yxqDate1" readonly></p>
                    <p class="no-print">(2)发生全车盗抢事故，如果保险车辆已购机动车商业保盗抢险的，则先从机动车商业盗抢险的项下进行赔付，剩余差额部分再向本保单索赔。</p>
                    <p class="no-print">（3）保险人收齐完整有效的索赔资料后，由四川万网先行向车主赔付，由车主签署赔付确认书，保险人收到赔付确认书后，依据保单约定承担赔偿责任。</p>
                    <p class="no-print">8.理赔须知：</p>
                    <p class="no-print">(1)全车被盗抢后，车主应立即向出险当地的公安刑侦部门报案，并同时向万网客户服务中心（028-85315109）报案，由四川万网在24小时内通过0755-95519向保险公司报案，车主应向四川万网提出索赔，待赔付完成后，由四川万网向保险人索赔，保险人不接受车主的直接索赔；索赔时，必须提供本保险凭证、购买及安装车载定位产品的相关凭证，被盗车辆的机动车登记证书、行驶证原件、驾驶证复印件、购车发票原件（车辆来历证明）、车辆购置税完税证明或者车辆购置附加费缴费证明、全套钥匙；县级以上公安部门出具的盗抢案件证明（报案回执及车辆未寻回证明）；车主的有效身份证明，第一受益人与车主的关系证明；机动车辆商业险保险单、权益转让书；车辆维修发票；保险人要求的其他资料。</p>
                    <p class="no-print">(2)用户递交完整的索赔资料后20个工作日内予以理赔。</p>
               </div>
            </div>   
            <div class="bxd_djb_header"></div>
            <div class="bxd_djb">
                <ul>
                    <li style="left:0;">
                        <label class="label_w no-print">车主姓名</label>
                        <span><input type="text" v-model="ruleForm.yxqDate2" class="yxqDate yxqDate2" readonly></span>
                    </li>
                    <li>
                        <label class="label_w no-print">身份证</label>
                        <span><input type="text" v-model="ruleForm.yxqDate3" class="yxqDate yxqDate3" readonly></span>
                    </li>
                     <li>
                        <label class="label_w no-print">手机</label>
                        <span><input type="text" v-model="ruleForm.yxqDate4" class="yxqDate yxqDate4" readonly></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label class="label_w no-print">车牌号码</label>
                        <span><input type="text" v-model="ruleForm.yxqDate5" class="yxqDate yxqDate5" readonly></span>
                    </li>
                    <li>
                        <label class="label_w no-print">厂牌型号</label>
                        <span><input type="text" v-model="ruleForm.yxqDate6" class="yxqDate yxqDate6" readonly></span>
                    </li>
                     <li>
                        <label class="label_w no-print">初登日期</label>
                        <span><input type="text" v-model="ruleForm.yxqDate7" class="yxqDate yxqDate7" readonly></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label class="label_w no-print">发动机号</label>
                        <span><input type="text" v-model="ruleForm.yxqDate8" class="yxqDate yxqDate8" readonly></span>
                    </li>
                    <li>
                        <label class="label_w no-print">车架号</label>
                        <span><input type="text" v-model="ruleForm.yxqDate9" class="yxqDate yxqDate9" readonly></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label class="label_w no-print">设备编号</label>
                        <span><input type="text" v-model="ruleForm.yxqDate10" class="yxqDate yxqDate10" readonly></span>
                    </li>
                    <li>
                        <label class="label_w no-print">安装时间</label>
                        <span><input type="text" v-model="ruleForm.yxqDate11" class="yxqDate yxqDate11" readonly></span>
                    </li>
                    <li>
                        <label class="label_w no-print">新车购置价</label>
                        <span><input type="text" v-model="ruleForm.yxqDate12" class="yxqDate yxqDate12" readonly></span>
                    </li>
                </ul>
                 <ul>
                    <li>
                        <label class="label_w label_w1 no-print">四川万网车辆盗抢保障服务费</label>
                        <span><input type="text" v-model="ruleForm.yxqDate13" class="yxqDate yxqDate13" readonly></span>
                    </li>
                    <li>
                        <label class="no-print"></label>
                        <span><input type="text" v-model="ruleForm.yxqDate14" class="yxqDate yxqDate14" readonly></span>
                    </li>
                </ul>
                <p>
                    <span class="no-print">1.如保险车辆涉及贷款业务，车主同意以占位占位</span>
                    <input type="text" class="yxqDate yxqDate15" v-model="ruleForm.yxqDate15" readonly>
                    <span class="no-print">(放款银行或者金融公司）作为第一受益人收取保险赔款；第一受益人允许其他受益人作为保险金收款人的，应出具赔款承诺书。</span>
                </p>
                 <p>
                    <span class="no-print">2.四川万网车辆防盗报账服务终端在保险有限期内享受免费保修服务，车主应积极配合维护工作。</span>
                </p>
            </div>
        </section>
        <el-col :span="24">
            <el-button type="primary" @click="printRs" style="margin-left:5px;float:right;">确认打印</el-button>
            <el-button style="margin-left:5px;float:right;" @click="printSuccess">打印完成</el-button>
        </el-col>
    </section>
</template>
<style type="text/css">
    .bxd_rsbx{
        width: 794px;
        margin: 0 auto;
        padding: 20px 20px 0 20px;
    }
    .bxd_rsbx input{
        color:#000;
        font-size: 16px;
        text-align: center;
    }
    .zgrs_sty .bxd_header{
        height: 110px;
        font-size: 40px;
        text-align: center;
    }
    .zgrs_sty .bxd_center{
        font-size: 12px;
        line-height: 20px;
        overflow: hidden;
    }
    .zgrs_sty .bcFl,.zgrs_sty .bcFr{
        width: 360px;
        height: 570px;
        overflow: hidden;
    }
    .zgrs_sty .bxd_djb_header{
        height: 50px;
    }
    .zgrs_sty .bxd_djb{
        height: 250px;
    }
    .zgrs_sty .bcFl{
        float: left;
    }
    .zgrs_sty .bcFr{
        float: right;
    }
    .zgrs_sty .yxqDate{
        width: 200px;
        border:0;
        border-bottom: 1px solid #555;
        margin-top: 2px;
    }
    .zgrs_sty .bxd_djb ul{
        line-height: 32px;
    }
    .zgrs_sty .bxd_djb ul li{
        display: inline-block;
        position: relative;
        left: -30px;
    }
    .zgrs_sty .yxqDate1{
        width: 100px;
        text-align: left;
    }
    .zgrs_sty .yxqDate2{
        position: absolute;
        bottom: 20px;
        width: 600px;
        text-align: left;
        font-size: 12px;
    }
    .zgrs_sty .yxqDate3{
        width: 340px;
        text-align: center;
        position: relative;
        top: 3px;
    }
    .zgrs_sty .yxqDate4{
        width: 120px;
        text-align: left;
    }
    .zgrs_sty .yxqDate5{
        width: 94px;
    }
    .zgrs_sty .yxqDate6{
        width: 245px;
        text-align: left;
        font-size: 12px;
    }
    .zgrs_sty .yxqDate7{
        width: 130px;
        text-align: left;
    }
    .zgrs_sty .yxqDate8{
        width: 266px;
        text-align: left;
    }
    .zgrs_sty .yxqDate9{
        width: 316px;
        text-align: left;
    }
    .zgrs_sty .yxqDate10{
        width: 230px;
        text-align: left;
    }
    .zgrs_sty .yxqDate11{
        width: 124px;
        text-align: left;
    }
    .zgrs_sty .yxqDate12{
        width: 124px;
        text-align: left;
    }
    .zgrs_sty .yxqDate13{
        width:350px;
    }
    .zgrs_sty .yxqDate14{
        width:150px;
    }
    .zgrs_sty input.yxqDate15{
        width: 350px;
        font-size: 14px;
    }
    .zgrs_sty .label_w {
        width: 80px;
        text-align: center;
        display: inline-block;
    }
    .zgrs_sty .label_w1{
        width: 207px;
    }
    @media print{  
        .zgrs_sty .yxqDate{
            border:0;
            background-color: transparent;
        }
    }
</style>
<script>
    import '../../../../static/js/Print';
    import util from '../../../common/js/util';
    export default {
        // props:['flowData'],
        data() {
            return {
              ruleForm:{
                yxqDate:'',
                yxqDate1:'',
                yxqDate2:'',
                yxqDate3:'',
                yxqDate4:'',
                yxqDate5:'',
                yxqDate6:'',
                yxqDate7:'',
                yxqDate8:'',
                yxqDate9:'',
                yxqDate10:'',
                yxqDate11:'',
                yxqDate12:'',
                yxqDate13:'',
                yxqDate14:'',
                yxqDate15:''
              },
              flowData:null,//父级传来数据
            }
        },
        watch: {  
                flowData: {  
            　　　　handler(newValue, oldValue) {
                                this.getData(newValue);
            　　　　},  
            　　　　deep: true  
            　　}  
        },
        methods: {
            //确认打印
            printRs(){
                Print('#rs_print');
            },
            //打印完成
            printSuccess(){
                this.$emit('closeDialog');
            },
            // 得到数据
            getData(res){
                if(res.flowData.effectivedate && res.flowData.expiredate)
                this.ruleForm.yxqDate = util.formatDate.format(new Date(res.flowData.effectivedate), 'yyyy-MM-dd').replace(/-/g,"/")+'-'+util.formatDate.format(new Date(res.flowData.expiredate), 'yyyy-MM-dd').replace(/-/g,"/") ;
                this.ruleForm.yxqDate1 = res.flowData.indemnitylimit/10000;
                this.ruleForm.yxqDate2 = res.flowData.owner_name;
                this.ruleForm.yxqDate3 = res.flowData.owner_idcard;
                this.ruleForm.yxqDate4 = res.flowData.owner_mobile;
                this.ruleForm.yxqDate5 = res.flowData.VehicleInfo_licenseplatenum;
                this.ruleForm.yxqDate6 = res.flowData.VehicleInfo_model_number || res.flowData.VehicleInfo_modle;
                if(res.flowData.registration_date)
                this.ruleForm.yxqDate7 = res.flowData.registration_date;
                this.ruleForm.yxqDate8 = res.flowData.VehicleInfo_enginenum;
                this.ruleForm.yxqDate9 = res.flowData.VehicleInfo_vin;
                this.ruleForm.yxqDate10 = res.flowData.install_num;
                if(res.flowData.install_date)
                this.ruleForm.yxqDate11 = util.formatDate.format(new Date(res.flowData.install_date), 'yyyy-MM-dd').replace(/-/g,"/");
                this.ruleForm.yxqDate12 = res.flowData.indemnitylimit;
                this.ruleForm.yxqDate13 = util.changeMoneyToChinese(res.flowData.price);
                this.ruleForm.yxqDate14 = res.flowData.price;
                this.ruleForm.yxqDate15 = res.flowData.bankid || res.flowData.bank_name;
            },
        }
    }
</script>