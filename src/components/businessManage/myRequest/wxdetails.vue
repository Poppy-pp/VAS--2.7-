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
					<el-col :span="6">
						<dl class="dllist">
							<dt>订单类型:</dt>
							<dd>维修</dd>
						</dl>
						<dl class="dllist">
							<dt>操作机构:</dt>
							<dd>{{ wxDialogFormData.corporateInfo == undefined ? '暂无' : wxDialogFormData.corporateInfo.corpname  }}</dd>
						</dl>
						<dl class="dllist">
							<dt>订单编号:</dt>
							<dd v-if="wxDialogFormData.orderno">{{ wxDialogFormData.orderno }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>维修联系人:</dt>
							<dd v-if="wxDialogFormData.contactperson">{{ wxDialogFormData.contactperson }}</dd>
						</dl>
						<dl class="dllist">
							<dt>维修小组:</dt>
							<dd v-if="wxDialogFormData.assigntoGroup">{{ wxDialogFormData.assigntoGroup.groupname }}</dd>
						</dl>
						<dl class="dllist">
							<dt>预约维修时间:</dt>
							<dd>{{ wxDialogFormData.aftersaledate }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>维修联系人电话:</dt>
							<dd>{{ wxDialogFormData.contactperson }}</dd>
						</dl>
						<dl class="dllist">
							<dt>维修人员:</dt>
							<dd v-if="wxDialogFormData.assigntoEmployeeInfo">{{ wxDialogFormData.assigntoEmployeeInfo.employeename }}</dd>
						</dl>
						<dl class="dllist">
							<dt>责任人:</dt>
							<dd v-if="wxDialogFormData.afterSalerEmployeeInfo">{{ wxDialogFormData.afterSalerEmployeeInfo.employeename }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>订单状态:</dt>
							<dd>进行中</dd>
						</dl>
						<dl class="dllist">
							<dt>维修预约地址:</dt>
							<dd>{{ wxDialogFormData.aftersaleaddress }}</dd>
						</dl>
						<dl class="dllist">
							<dt>责任人电话:</dt>
							<dd v-if="wxDialogFormData.afterSalerEmployeeInfo">{{ wxDialogFormData.afterSalerEmployeeInfo.mobile }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" v-if="wxDialogFormData.remark">
						<dl class="dllist">
							<dt>备注:</dt>
							<dd>{{ wxDialogFormData.remark }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="pmbt">
					<el-col :span="24">
						<span class="formTile">车主信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>姓名:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo.ownerInfo">{{ wxDialogFormData.vehicleInfo.ownerInfo.name }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车主电话:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo.ownerInfo">{{ wxDialogFormData.vehicleInfo.ownerInfo.mobile }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>身份证号码:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo.ownerInfo">{{ wxDialogFormData.vehicleInfo.ownerInfo.idcard }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="pmbt">
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车牌号:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.licenseplatenum }}</dd>
						</dl>
						<dl class="dllist">
							<dt>受理银行:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo.receivingbank">{{ wxDialogFormData.vehicleInfo.receivingbank.corpname }}</dd>
						</dl>
						<dl class="dllist">
							<dt>是否购买盗抢险:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.hastheftinsurance == '1' ? '已购买': '没有购买' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车型:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.model }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车辆购置价(元):</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.price }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车辆颜色:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.color }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车架号:</dt>
							<dd v-if="wxDialogFormData.vehicleInfo">{{ wxDialogFormData.vehicleInfo.vin }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="pmbt">
					<el-col :span="24">
						<span class="formTile">维修设备信息</span>
					</el-col>
					<el-col :span="6" v-for="(item,index) in wxDialogFormData.afterSaleDetails">
						<dl class="dllist">
							<dt>维修类型：</dt>
							<dd>{{ item.actiontype }}</dd>
						</dl>
						<dl class="dllist">
							<dt>设备类型：</dt>
							<dd v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODMODEL }}</dd>
						</dl>
						<dl class="dllist">
							<dt>设备号：</dt>
							<dd v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODUNUM }}</dd>
						</dl>
						<dl class="dllist">
							<dt>卡类型：</dt>
							<dd v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.C_PRODMODEL }}</dd>
						</dl>
						<dl class="dllist">
							<dt>SIM卡号：</dt>
							<dd v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.C_PRODUNUM }}</dd>
						</dl>
						<dl class="dllist">
							<dt>安装位置：</dt>
							<dd>{{ item.installDetail.installpositionname }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="mt15 pmbt">
					<el-col :span="24">
						<span class="formTile">设备照片</span>
					</el-col>
					<template v-for="(item,index) in wxDialogFormData.afterSaleDetails">
						<el-col :span="6" class="photosh" v-if="item.installDetail.installpic1">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.installDetail.installpic1">
								<div class="btsty">
									<span v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODTYPE+'设备'+item.installDetail.packInfo.E_PRODMODEL }}</span>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="photosh" v-if="item.installDetail.installpic2">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.installDetail.installpic2">
								<div class="btsty">
									<span v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODTYPE+'设备'+item.installDetail.packInfo.E_PRODMODEL }}</span>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="photosh" v-if="item.installDetail.installpic3">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.installDetail.installpic3">
								<div class="btsty">
									<span v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODTYPE+'设备'+item.installDetail.packInfo.E_PRODMODEL }}</span>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="photosh" v-if="item.installDetail.installpic4">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.installDetail.installpic4">
								<div class="btsty">
									<span v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODTYPE+'设备'+item.installDetail.packInfo.E_PRODMODEL }}</span>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="photosh" v-if="item.installDetail.installpic5">
							<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
								<img class="image" :src="$store.state.IMG_URL+item.installDetail.installpic5">
								<div class="btsty">
									<span v-if="item.installDetail.packInfo">{{ item.installDetail.packInfo.E_PRODTYPE+'设备'+item.installDetail.packInfo.E_PRODMODEL }}</span>
								</div>
							</el-card>
						</el-col>
					</template>
				</el-row>
				<el-row :gutter="20" class="mt15 pmbt">
					<el-col :span="24">
						<span class="formTile">车照片</span>
					</el-col>
					<el-col :span="6" class="photosh" v-if="wxDialogFormData.installpic1">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+wxDialogFormData.installpic1">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="wxDialogFormData.installpic2">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+wxDialogFormData.installpic2">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="wxDialogFormData.installpic3">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+wxDialogFormData.installpic3">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="wxDialogFormData.installpic4">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+wxDialogFormData.installpic4">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="wxDialogFormData.installpic5">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+wxDialogFormData.installpic5">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	export default {
		props: ["wxDialogFormData"],
		data() {
			return {
				dialogActiveName: '1'
			}
		},
		methods: {
			closedetails() {
				this.$emit("closeDetails", 2);
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