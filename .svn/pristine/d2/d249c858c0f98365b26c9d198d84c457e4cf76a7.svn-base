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
							<dd>拆除</dd>
						</dl>
						<dl class="dllist">
							<dt>操作机构:</dt>
							<dd>{{ removeDialogFormData.corporateInfo == undefined ? '暂无' : removeDialogFormData.corporateInfo.corpname }}</dd>
						</dl>
						<dl class="dllist">
							<dt>订单编号:</dt>
							<dd v-if="removeDialogFormData.orderno">{{ removeDialogFormData.orderno }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>拆除联系人:</dt>
							<dd v-if="removeDialogFormData.contactperson">{{ removeDialogFormData.contactperson }}</dd>
						</dl>
						<dl class="dllist">
							<dt>拆除小组:</dt>
							<dd v-if="removeDialogFormData.assigntoGroup">{{ removeDialogFormData.assigntoGroup.groupname }}</dd>
						</dl>
						<dl class="dllist">
							<dt>预约拆除时间:</dt>
							<dd>{{ removeDialogFormData.aftersaledate }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>拆除联系人电话:</dt>
							<dd>{{ removeDialogFormData.contactperson }}</dd>
						</dl>
						<dl class="dllist">
							<dt>拆除人员:</dt>
							<dd v-if="removeDialogFormData.assigntoEmployeeInfo">{{ removeDialogFormData.assigntoEmployeeInfo.employeename }}</dd>
						</dl>
						<dl class="dllist">
							<dt>责任人:</dt>
							<dd v-if="removeDialogFormData.afterSalerEmployeeInfo">{{ removeDialogFormData.afterSalerEmployeeInfo.employeename }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>订单状态:</dt>
							<dd>进行中</dd>
						</dl>
						<dl class="dllist">
							<dt>拆除预约地址:</dt>
							<dd>{{ removeDialogFormData.aftersaleaddress }}</dd>
						</dl>
						<dl class="dllist">
							<dt>责任人电话:</dt>
							<dd v-if="removeDialogFormData.afterSalerEmployeeInfo">{{ removeDialogFormData.afterSalerEmployeeInfo.mobile }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6" v-if="removeDialogFormData.remark">
						<dl class="dllist">
							<dt>备注:</dt>
							<dd>{{ removeDialogFormData.remark }}</dd>
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
							<dd v-if="removeDialogFormData.vehicleInfo.ownerInfo">{{ removeDialogFormData.vehicleInfo.ownerInfo.name }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车主电话:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo.ownerInfo">{{ removeDialogFormData.vehicleInfo.ownerInfo.mobile }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>身份证号码:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo.ownerInfo">{{ removeDialogFormData.vehicleInfo.ownerInfo.idcard }}</dd>
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
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.licenseplatenum }}</dd>
						</dl>
						<dl class="dllist">
							<dt>受理银行:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo.receivingbank">{{ removeDialogFormData.vehicleInfo.receivingbank.corpname }}</dd>
						</dl>
						<dl class="dllist">
							<dt>是否购买盗抢险:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.hastheftinsurance == '1' ? '已购买': '没有购买' }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车型:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.model }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车辆购置价(元):</dt>
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.price }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist">
							<dt>车辆颜色:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.color }}</dd>
						</dl>
						<dl class="dllist">
							<dt>车架号:</dt>
							<dd v-if="removeDialogFormData.vehicleInfo">{{ removeDialogFormData.vehicleInfo.vin }}</dd>
						</dl>
					</el-col>
				</el-row>
				<el-row class="pmbt">
					<el-col :span="24">
						<span class="formTile">拆除设备信息</span>
					</el-col>
					<el-col :span="6" v-for="(item,index) in removeDialogFormData.afterSaleDetails">
						<dl class="dllist">
							<dt>拆除类型：</dt>
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
					<template v-for="(item,index) in removeDialogFormData.afterSaleDetails">
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
					<el-col :span="6" class="photosh" v-if="removeDialogFormData.installpic1">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+removeDialogFormData.installpic1">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="removeDialogFormData.installpic2">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+removeDialogFormData.installpic2">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="removeDialogFormData.installpic3">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+removeDialogFormData.installpic3">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="removeDialogFormData.installpic4">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+removeDialogFormData.installpic4">
							<div class="btsty">
								<span>车辆照片</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6" class="photosh" v-if="removeDialogFormData.installpic5">
						<el-card :body-style="{ padding: '0px !important' }" class="devptosty">
							<img class="image" :src="$store.state.IMG_URL+removeDialogFormData.installpic5">
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
		props: ["removeDialogFormData"],
		data() {
			return {
				dialogActiveName: '1'
			}
		},
		methods: {
			closedetails() {
				this.$emit("closeDetails", 3);
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