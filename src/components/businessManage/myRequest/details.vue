<!--* 
* @description: 我的待办 
* @author: wp 
* @update: wp (2017-05-27 10:55) 
*-->
<template>
	<section class="show_new_img requestdd">
		<el-button size="small" type="primary" class="detailback" @click="closedetails" icon="el-icon-caret-left">返回</el-button>
		<el-tabs v-model="dialogActiveName">
			<el-tab-pane label="订单详情" name="1">
				<el-row class="plr40">
					<el-col :span="24">
						<span class="formTile">订单信息</span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>订单编号:</dt>
							<dd>{{ dialogFormData.orderno }}</dd>
						</dl>
						<dl class="dllist">
							<dt>订单类型:</dt>
							<dd>{{ dialogFormData.declaretype }}</dd>
						</dl>
						<dl class="dllist">
							<dt>客户名称:</dt>
							<dd v-if="dialogFormData.corporateInfo">{{ dialogFormData.corporateInfo == undefined ? '暂无' : dialogFormData.corporateInfo.corpname }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>业务员:</dt>
							<dd>{{ dialogFormData.salername }}</dd>
						</dl>
						<dl class="dllist">
							<dt>业务员联系电话:</dt>
							<dd>{{ dialogFormData.salermobile }}</dd>
						</dl>
						<dl class="dllist">
							<dt>服务期限:</dt>
							<dd v-if="dialogFormData.vehicleInfo.yearsofservice">{{ dialogFormData.vehicleInfo.yearsofservice }}年</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>责任人:</dt>
							<dd v-if="dialogFormData.declarEmployee">{{ dialogFormData.declarEmployee.employeename }}</dd>
						</dl>
						<dl class="dllist">
							<dt>责任人电话:</dt>
							<dd v-if="dialogFormData.declarEmployee">{{ dialogFormData.declarEmployee.mobile }}</dd>
						</dl>
					</el-col>
					<el-col :span="24">
						<dl class="dllist">
							<dt>订单描述:</dt>
							<dd>{{ dialogFormData.flowData.proc_new_build_desc }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="plr40">
					<el-col :span="24" v-if="dialogFormData.flowData.apply_remark">
						<dl class="dllist">
							<dt>报单备注:</dt>
							<dd>{{ dialogFormData.flowData.apply_remark }}</dd>
						</dl>
					</el-col>
					<el-col :span="24" v-if="dialogFormData.flowData.send_remark">
						<dl class="dllist">
							<dt>派单备注:</dt>
							<dd>{{ dialogFormData.flowData.send_remark }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="plr40">
					<el-col :span="24" v-if="dialogFormData.flowData.work_remark">
						<dl class="dllist">
							<dt>施工备注:</dt>
							<dd>{{ dialogFormData.flowData.work_remark }}</dd>
						</dl>
					</el-col>
					<el-col :span="24" v-if="dialogFormData.flowData.service_verify_remark">
						<dl class="dllist">
							<dt>审核备注:</dt>
							<dd>{{ dialogFormData.flowData.service_verify_remark }}</dd>
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
							<dd>{{ dialogFormData.ownerInfo.name }}</dd>
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
							<dd>{{ dialogFormData.ownerInfo.idcard }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车主电话:</dt>
							<dd>{{ dialogFormData.ownerInfo.mobile }}</dd>
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
							<dd>{{ dialogFormData.vehicleInfo.licenseplatenum }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车辆颜色:</dt>
							<dd>{{ dialogFormData.vehicleInfo.color }}</dd>
						</dl>
						<dl class="dllist">
							<dt>是否购买盗抢险:</dt>
							<dd>{{ dialogFormData.vehicleInfo.hastheftinsurance == '1' ? '已购买': '没有购买' }}</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车架号:</dt>
							<dd>{{ dialogFormData.vehicleInfo.vin }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车辆购置价:</dt>
							<dd v-if="dialogFormData.vehicleInfo.price">{{ dialogFormData.vehicleInfo.price }}元</dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist">
							<dt>车型:</dt>
							<dd>{{ dialogFormData.vehicleInfo.model }}</dd>
						</dl>
						<dl class="dllist">
							<dt>受理银行:</dt>
							<dd v-if="dialogFormData.vehicleInfo.receivingbank">{{ dialogFormData.vehicleInfo.receivingbank.corpname }}</dd>
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
							<dd>{{ dialogFormData.installapplyinsu }}台</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>常规产品数量:</dt>
							<dd>{{ dialogFormData.installapplymorn }}台</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>安装小组:</dt>
							<dd>{{ dialogFormData.installGroupInfo.groupname }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>安装人员:</dt>
							<dd>{{ dialogFormData.installEmployee.employeename }}</dd>
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
						<span class="formTile">已安装设备信息</span>
					</el-col>
					<el-col :span="8" v-for="(item,index) in dialogFormData.installDetails">
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
					</el-col>
				</el-row>
				<el-row :gutter="20" class="mt15 pmbt">
					<el-col :span="24">
						<span class="formTile">设备照片</span>
					</el-col>
					<template v-for="(items,index) in dialogFormData.installDetails">
						<el-col :span="6" class="photosh" v-for="(item,index) in items.pictures">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.piclink">
								<div class="btsty">
									<span v-if="items.packInfo">{{ item.picdesc+'('+items.packInfo.E_PRODTYPE+'设备'+items.packInfo.E_PRODMODEL+')' }}</span>
								</div>
							</el-card>
						</el-col>
					</template>
				</el-row>
				<el-row :gutter="20" class="mt15 pmbt">
					<el-col :span="24">
						<span class="formTile">车照片</span>
					</el-col>
					<el-col :span="6" class="photosh" v-if="dialogFormData.installpic1">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+dialogFormData.installpic1">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="dialogFormData.installpic2">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+dialogFormData.installpic2">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="dialogFormData.installpic3">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+dialogFormData.installpic3">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="dialogFormData.installpic4">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+dialogFormData.installpic4">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="dialogFormData.installpic5">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+dialogFormData.installpic5">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="mt15 pmbt">
					<el-col :span="24">
						<span class="formTile">订单照片</span>
					</el-col>
					<template v-for="(item,index) in dialogFormData.pictures">
						<el-col :span="6" class="photosh" v-if="item.piclink">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.piclink">
								<div class="btsty">
									<span>{{ item.picdesc }}</span>
								</div>
							</el-card>
						</el-col>
					</template>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	export default {
		props: ["dialogFormData"],
		data() {
			return {
				dialogActiveName: '1'
			}
		},
		methods: {
			closedetails() {
				this.$emit("closeDetails", 1);
			}
		},
		//初始化数据
		mounted() {
			//初始化图片查看器
			$("section.show_new_img").on("click", ".image", function(e) {
				$("section.show_new_img").viewer({
					zIndex: 999999999
				});
			});
		}
	}
</script>