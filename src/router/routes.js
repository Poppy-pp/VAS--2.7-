/* 
 * @description: vas平台路由管理控制中心，组件关系配置 
 * @author: 蒲琳
 * @update: 2018-08-30
 */
//懒加载主页
const Home = resolve => require(['components/Home'], resolve);
//默认主页 右侧内容页
import HomePage from 'components/HomePage/HomePage'
//地图监控
import VehicleMonitoring from 'components/vehiclemonitoring/VehicleMonitoring'
import GisVehicleMonitoring from 'components/vehiclemonitoring/GisVehicleMonitoring'
//流程管理
import completeProcess from 'components/process/completeProcess'
import DefinitionModel from 'components/process/DefinitionModel'
import DifinitionProcess from 'components/process/DifinitionProcess'
import RunProcess from 'components/process/RunProcess'

//基础管理
import VehicleInfo from 'components/basemanage/VehicleInfo'
import OwnerInfo from 'components/basemanage/OwnerInfo'
import InsuranceInfo from 'components/basemanage/InsuranceInfo'
import GroupInfo from 'components/basemanage/GroupInfo'
import EmployeeInfo from 'components/basemanage/EmployeeInfo'
import PositionInfo from 'components/basemanage/PositionInfo'
import DepartmentInfo from 'components/basemanage/DepartmentInfo'
import CorporateInfo from 'components/basemanage/CorporateInfo'
import ProductInfo from 'components/basemanage/ProductInfo'
import SIMInfo from 'components/basemanage/SIMInfo'
import StorageInfo from 'components/basemanage/StorageInfo'
import DeliveryAddress from 'components/basemanage/DeliveryAddress'
import VehicleType from 'components/basemanage/VehicleType'

/* 业务管理 */
import orderSupplement from 'components/businessManage/orderSupplement'
import formProcess from 'components/businessManage/formProcess'
import afterSale from 'components/businessManage/afterSale'
import insurance from 'components/businessManage/insurance'
import customerDeclaration from 'components/businessManage/declarationFormProcess/customerDeclaration'
import formMain from 'components/businessManage/formMain'
import clerkOrder from 'components/businessManage/declarationFormProcess/clerkOrder'
import reportMain from 'components/businessManage/reportMain'
import orderManger from 'components/businessManage/orderManger'
import completionAudit from 'components/businessManage/declarationFormProcess/completionAudit'
import success from 'components/businessManage/declarationFormProcess/success'
import afterSaleAuditHd from 'components/businessManage/declarationFormProcess/afterSaleAuditHd'
//报单查询维修详情
import serviceDetail from 'components/businessManage/formOrderInfo/serviceDetail'
//报单查询拆除详情
import dismDetail from 'components/businessManage/formOrderInfo/dismDetail'
//查询保险流程详情
import insuranceDetail from 'components/businessManage/myOrderAllInfo/insuranceDetail'

//拆除详情页
import disDetails from 'components/businessManage/dismantleFormProcess/detail'
//维修详情页
import serviceDetails from 'components/businessManage/customerService/detail'
//所有待办
import formMainAll from 'components/businessManage/formMainAll'
//我的已办
import myHandle from 'components/businessManage/myHandle'
//我的请求
import myRequest from 'components/businessManage/myRequest'
//设备管理
import busProductInfo from 'components/businessManage/ProductInfo'
//sim卡管理
import busSIMInfo from 'components/businessManage/SIMInfo'
//拆除组件
import dismantle from 'components/businessManage/dismantle'
import dismantleCustomerDeclaration from 'components/businessManage/dismantleFormProcess/customerDismantle'
//售后组件
import service from 'components/businessManage/service'
import serviceCustomerDeclaration from 'components/businessManage/customerService/customerService'
// 黑名单管理
import BlacklistInfo from 'components/businessManage/BlacklistInfo'
// 代理设置
import AgentSettings from 'components/businessManage/AgentSettings'
// 易盗车型管理
import EasyStealCars from 'components/businessManage/EasyStealCars'

// 客户确认管理
import customerComfirmation from 'components/businessManage/customerComfirmation'
// 客户确认管理
import myOrderSupplement from 'components/businessManage/myOrderSupplement'

/* 库存管理 */
import StoIn from 'components/stockManger/StoIn'
import StoOut from 'components/stockManger/StoOut'
import StockCheck from 'components/stockManger/StockCheck'
import deliveryManage from 'components/stockManger/deliveryManage'
import floesManage from 'components/stockManger/floesManage'
import myStockCheck from 'components/stockManger/myStockCheck'
import delivFloesManage from 'components/stockManger/delivFloesManage'
import inventoryDetails from 'components/stockManger/inventoryDetails'
import SupplierInfo from 'components/stockManger/SupplierInfo'
import ProdModelInfo from 'components/stockManger/ProdModelInfo'
import equipmentReturnFactory from 'components/stockManger/equipmentReturnFactory'
import equipmentReturnFactoryManger from 'components/stockManger/equipmentReturnFactoryManger'
import abEquipmentReturnFactoryManger from 'components/stockManger/abEquipmentReturnFactoryManger'
import equipmentMaintenance from 'components/stockManger/equipmentMaintenance'
// 绑定关系
import BindRelationship from 'components/stockManger/BindRelationship'

/* 平台管理 */
import messageSend from 'components/orderManger/messageSend'
import OrderLog from 'components/orderManger/OrderLog'
import Order from 'components/orderManger/Order'
import CommunicationPlat from 'components/orderManger/CommunicationPlat'
import DeviceAccess from 'components/orderManger/DeviceAccess'
import OnlineProd from 'components/orderManger/OnlineProd'
import IOCP from 'components/orderManger/IOCP'
import OnlineProdVAS from 'components/orderManger/OnlineProdVAS'
import customLabel from 'components/orderManger/customLabel'
import groupingCar from 'components/orderManger/groupingCar'

/* 财务管理 */
import financialStatement from 'components/financialManag/financialStatement'

/**统计报表 start**/
//主结构
import reportAll from 'components/statisticalReport/reportAll'
// 报表
import technicalServiceAll from 'components/statisticalReport/allReport/technicalServiceAll'
import insuranceAll from 'components/statisticalReport/allReport/insuranceAll'
import afterServiceAll from 'components/statisticalReport/allReport/afterServiceAll'
import storageRoomAll from 'components/statisticalReport/allReport/storageRoomAll'
import financialDeptAll from 'components/statisticalReport/allReport/financialDeptAll'
import businessDeptAll from 'components/statisticalReport/allReport/businessDeptAll'
import empAdministrationAll from 'components/statisticalReport/allReport/empAdministrationAll'
import mileageNewStatistics from 'components/statisticalReport/allReport/mileageNewStatistics'

// 图表
import stoEcharts from 'components/statisticalReport/allEcharts/stoEcharts'





//行政人事
import attendanceStatistics from 'components/statisticalReport/administrativePersonnel/attendanceStatistics'
//售后监控
import abnormalEquipmentList from 'components/statisticalReport/afterSaleSupervision/abnormalEquipmentList'
import abnormalVehStatistics from 'components/statisticalReport/afterSaleSupervision/abnormalVehStatistics'
import afterSalesList from 'components/statisticalReport/afterSaleSupervision/afterSalesList'
import customerRenewalsStatistics from 'components/statisticalReport/afterSaleSupervision/customerRenewalsStatistics'
import salesSuccessStatistics from 'components/statisticalReport/afterSaleSupervision/salesSuccessStatistics'
import technicalDetailsAndTravelStatistics from 'components/statisticalReport/afterSaleSupervision/technicalDetailsAndTravelStatistics'
import vehicleAlarmHistoryList from 'components/statisticalReport/afterSaleSupervision/vehicleAlarmHistoryList'
import vehicleAlarmList from 'components/statisticalReport/afterSaleSupervision/vehicleAlarmList'
import vehicleAll from 'components/statisticalReport/afterSaleSupervision/vehicleAll'
import alarmVehAll from 'components/statisticalReport/afterSaleSupervision/alarmVehAll'
import expirationRenewtStatistics from 'components/statisticalReport/afterSaleSupervision/expirationRenewtStatistics'
import mileageStatistics from 'components/statisticalReport/afterSaleSupervision/mileageStatistics'
import transcendZGIS from 'components/statisticalReport/afterSaleSupervision/transcendZGIS'
import bridgeStatistics from 'components/statisticalReport/afterSaleSupervision/bridgeStatistics'


//基础管理报表
import addressStatistics from 'components/statisticalReport/basicManagementReports/addressStatistics'
import corpStatistics from 'components/statisticalReport/basicManagementReports/corpStatistics'
import deptStatistics from 'components/statisticalReport/basicManagementReports/deptStatistics'
import employeeStatistics from 'components/statisticalReport/basicManagementReports/employeeStatistics'
import groupStatistics from 'components/statisticalReport/basicManagementReports/groupStatistics'
import insuranceStatistics from 'components/statisticalReport/basicManagementReports/insuranceStatistics'
import ownerStatistics from 'components/statisticalReport/basicManagementReports/ownerStatistics'
import positionStatistics from 'components/statisticalReport/basicManagementReports/positionStatistics'
import prodStatistics from 'components/statisticalReport/basicManagementReports/prodStatistics'
import vehicleStatistics from 'components/statisticalReport/basicManagementReports/vehicleStatistics'
//Gis报表
import dailyPlatVehiMileage from 'components/statisticalReport/GISReport/dailyPlatVehiMileage'
import dailyOnlineVehicle from 'components/statisticalReport/GISReport/dailyOnlineVehicle'
import dailyAddVehicle from 'components/statisticalReport/GISReport/dailyAddVehicle'
import dailyAddVehicleCorp from 'components/statisticalReport/GISReport/dailyAddVehicleCorp'
import dailyAddVehicleProd from 'components/statisticalReport/GISReport/dailyAddVehicleProd'
import vehOnlineStatistics from 'components/statisticalReport/GISReport/vehOnlineStatistics'
import vehLeavelineStatistics from 'components/statisticalReport/GISReport/vehLeavelineStatistics'
import historyStatistics from 'components/statisticalReport/GISReport/historyStatistics'
//报表设计
import reportConfig from 'components/statisticalReport/reportManager/reportConfig'
import reportDesign from 'components/statisticalReport/reportManager/reportDesign'
//库房
import technicalGroupStatistics from 'components/statisticalReport/storageRoom/technicalGroupStatistics'
import personnelStatistics from 'components/statisticalReport/storageRoom/personnelStatistics'
import equipmentStorageStatistics from 'components/statisticalReport/storageRoom/equipmentStorageStatistics'
import equipmentStorageOutStatistics from 'components/statisticalReport/storageRoom/equipmentStorageOutStatistics'
import equipmentCancelStorage from 'components/statisticalReport/storageRoom/equipmentCancelStorage'
import equipmentAllocationStorage from 'components/statisticalReport/storageRoom/equipmentAllocationStorage'
import equipmentLossStatistics from 'components/statisticalReport/storageRoom/equipmentLossStatistics'
import equipmentReturnStatistics from 'components/statisticalReport/storageRoom/equipmentReturnStatistics'
import storeBill from 'components/statisticalReport/storageRoom/storeBill'
import inventoryReport from 'components/statisticalReport/storageRoom/inventoryReport'
import batchStorageStatistics from 'components/statisticalReport/storageRoom/batchStorageStatistics'
import ownerStorageStatistics from 'components/statisticalReport/storageRoom/ownerStorageStatistics'
import ownerStorageCount from 'components/statisticalReport/storageRoom/ownerStorageCount'
import stockOutStatistics from 'components/statisticalReport/storageRoom/stockOutStatistics'
import groupInventoryList from 'components/statisticalReport/storageRoom/groupInventoryList'
import groupInventoryStatistics from 'components/statisticalReport/storageRoom/groupInventoryStatistics'
import shippingList from 'components/statisticalReport/storageRoom/shippingList'
//技术服务
import clerkBill from 'components/statisticalReport/technicalService/clerkBill'
import leshanMonthStatement from 'components/statisticalReport/technicalService/leshanMonthStatement'
import equipmentStatistics from 'components/statisticalReport/technicalService/equipmentStatistics'
import monthStatement from 'components/statisticalReport/technicalService/monthStatement'
import technicalInstall from 'components/statisticalReport/technicalService/technicalInstall'
import monthReconciliationReport from 'components/statisticalReport/technicalService/monthReconciliationReport'
/**统计报表 end**/

//系统管理
import UserInfo from 'components/sysmanage/UserInfo'
import RoleInfo from 'components/sysmanage/RoleInfo'
import ResourceInfo from 'components/sysmanage/ResourceInfo'
import SysDictionary from 'components/sysmanage/SysDictionary'
import SysDictionaryData from 'components/sysmanage/SysDictionaryData'
import ActVariableMapping from 'components/sysmanage/ActVariableMapping'
import systemSetting from 'components/sysmanage/systemSetting'
import detailsInfo from 'components/sysmanage/detailsInfo'
import interfaceInfo from 'components/sysmanage/interfaceInfo'
import agreementsInfo from 'components/sysmanage/agreementsInfo'
import corpInfo from 'components/sysmanage/corpInfo'
import terminalAlarmSettings from 'components/sysmanage/terminalAlarmSettings'
import alarmTypeSettings from 'components/sysmanage/alarmTypeSettings'
import alarmParamSettings from 'components/sysmanage/alarmParamSettings'
import testParamSettings from 'components/sysmanage/testParamSettings'
import operationRecord from 'components/sysmanage/operationRecord'
import messageManage from 'components/sysmanage/messageManage/index.vue'
//vas二维码在线生成器
import qrcode from 'components/sysmanage/qrcode'
// 内容管理
import typeManagement from 'components/contentManage/typeManagement'
import articleManagement from 'components/contentManage/articleManagement'
import leaveMessage from 'components/contentManage/leaveMessage'
//年度打分
import employeeScore from 'components/contentManage/employeeScore'
import employeeScoreTB from 'components/contentManage/employeeScoreTB'
import departmentScore from 'components/contentManage/departmentScore'
import departmentScoreResult from 'components/contentManage/departmentScoreResult'

// 签到管理
import AttdRecord from 'components/signInManage/AttdRecord'
import AttdRule from 'components/signInManage/AttdRule'
import AttdCenter from 'components/signInManage/AttdCenter'
import AttdHistory from 'components/signInManage/AttdHistory'

// 指标管理
import indexSetting from 'components/indexManage/indexSetting'
import indexAllot from 'components/indexManage/indexAllot'
import indexQuery from 'components/indexManage/indexQuery'
import indexChart from 'components/indexManage/indexChart'

//工作台
import personnelDesk from 'components/desk/personnelDesk'
import corpAddProcess from 'components/desk/corpAddProcess'
import employeeInduction from 'components/desk/employeeInduction'
import employeeLeave from 'components/desk/employeeLeave'
import vehicleRegistration from 'components/desk/vehicleRegistration'
//人员定位
import personPosition from 'components/personPosition/personPosition'


const routes = [{
		path: '/',
		component: Home,
		name: '',
		iconCls: 'iconfont icon-shouye_shouye', //图标样式class
		children: [{
			path: '/HomePage',
			component: HomePage,
			name: '系统首页',
			meta: {
				routerIndex: "10330"
			}
		}]
	},
	{
		path: '/',
		component: Home,
		name: '',
		iconCls: 'iconfont icon-cheliang', //图标样式class
		children: [{
			path: '/VehicleMonitoring',
			component: VehicleMonitoring,
			name: '车辆监控',
			meta: {
				routerIndex: "10332"
			}
		}]
	},
	{
		path: '/',
		component: Home,
		name: '',
		hidden: true,
		iconCls: 'iconfont icon-cheliang', //图标样式class
		children: [{
			path: '/GisVehicleMonitoring',
			component: GisVehicleMonitoring,
			name: 'GIS',
			meta: {
				routerIndex: "103331"
			}
		}]
	},
	{
		path: '/',
		component: Home,
		name: '基础管理',
		iconCls: 'iconfont icon-jichushuju', //图标样式class
		meta: {
			routerIndex: "10334"
		},
		children: [{
				path: '/OwnerInfo',
				component: OwnerInfo,
				name: '车主管理',
				meta: {
					routerIndex: "10335"
				}
			},
			{
				path: '/VehicleInfo',
				component: VehicleInfo,
				name: '车辆管理',
				meta: {
					routerIndex: "10336"
				}
			},
			{
				path: '/InsuranceInfo',
				component: InsuranceInfo,
				name: '保单管理',
				meta: {
					routerIndex: "10337"
				}
			},
			{
				path: '/ProductInfo',
				component: ProductInfo,
				name: '设备管理',
				meta: {
					routerIndex: "10338"
				}
			},
			{
				path: '/SIMInfo',
				component: SIMInfo,
				name: 'SIM管理',
				meta: {
					routerIndex: "10339"
				}
			},
			{
				path: '/CorporateInfo',
				component: CorporateInfo,
				name: '组织管理',
				meta: {
					routerIndex: "10340"
				}
			},
			{
				path: '/DepartmentInfo',
				component: DepartmentInfo,
				name: '部门管理',
				meta: {
					routerIndex: "10341"
				}
			},
			{
				path: '/GroupInfo',
				component: GroupInfo,
				name: '分组管理',
				meta: {
					routerIndex: "10342"
				}
			},
			{
				path: '/PositionInfo',
				component: PositionInfo,
				name: '岗位管理',
				meta: {
					routerIndex: "10343"
				}
			},
			{
				path: '/EmployeeInfo',
				component: EmployeeInfo,
				name: '员工管理',
				meta: {
					routerIndex: "10344"
				}
			},
			{
				path: '/StorageInfo',
				component: StorageInfo,
				name: '库房管理',
				meta: {
					routerIndex: "10345"
				}
			},
			{
				path: '/DeliveryAddress',
				component: DeliveryAddress,
				name: '地址管理',
				meta: {
					routerIndex: "10346"
				}
			},
			{
				path: '/VehicleType',
				component: VehicleType,
				name: '车型管理',
				meta: {
					routerIndex: "10521"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '业务管理',
		iconCls: 'iconfont icon-yewu', //图标样式class
		meta: {
			routerIndex: "10349"
		},
		children: [{
				path: '/formMain',
				component: formMain,
				name: '我的待办',
				meta: {
					routerIndex: "10350"
				}
			},
			{
				path: '/formMainAll',
				component: formMainAll,
				name: '所有待办',
				meta: {
					routerIndex: "10456"
				}
			},
			{
				path: '/formProcess',
				component: formProcess,
				name: '',
				meta: {
					routerIndex: "10351"
				},
				children: [{
						path: '/',
						component: customerDeclaration,
						name: '新建安装单',
						meta: {
							routerIndex: "10351"
						},
						hidden: true
					},
					{
						path: '1',
						component: clerkOrder,
						name: '派单管理',
						meta: {
							routerIndex: "10351"
						},
						hidden: true
					},
					{
						path: '3',
						component: completionAudit,
						name: '售后审核',
						meta: {
							routerIndex: "10351"
						},
						hidden: true
					},
					{
						path: '4',
						component: success,
						name: '完成',
						meta: {
							routerIndex: "10351"
						},
						hidden: true
					}
				]
			},
			{
				path: '/afterSale',
				component: afterSale,
				name: '',
				meta: {
					routerIndex: "10351"
				},
				children: [{
					path: '1',
					component: afterSaleAuditHd,
					name: '售后审核',
					meta: {
						routerIndex: "10351"
					},
					hidden: true
				}, ]
			},
			{
				path: '/insurance',
				component: insurance,
				name: '',
				meta: {
					routerIndex: "10351"
				},
				children: [{
					path: '1',
					component: afterSaleAuditHd,
					name: '售后审核',
					meta: {
						routerIndex: "10351"
					},
					hidden: true
				}, ]
			},
			{
				path: '/service',
				component: service,
				name: '',
				meta: {
					routerIndex: "10357"
				},
				children: [{
					path: '/',
					component: serviceCustomerDeclaration,
					name: '新建维修单',
					meta: {
						routerIndex: "10357"
					}
				},{
					path: '1',
					component: serviceDetails,
					name: '维修订单审核',
					meta: {
						routerIndex: "10357"
					},
					hidden: true
				}]
			},
			{
				path: '/dismantle',
				component: dismantle,
				name: '',
				meta: {
					routerIndex: "10359"
				},
				children: [{
					path: '/',
					component: dismantleCustomerDeclaration,
					name: '新建拆除单',
					meta: {
						routerIndex: "10359"
					}
				},
				{
					path: '1',
					component: disDetails,
					name: '拆除订单审核',
					meta: {
						routerIndex: "10359"
					},
					hidden: true
				}]
			},
			{
				path: '/insuranceDetail',
				component: insuranceDetail,
				name: '保险详情',
				meta: {
					routerIndex: "10456"
				}
			},
			{
				path: '/reportMain',
				component: reportMain,
				name: '报单查询',
				meta: {
					routerIndex: "10361"
				}
			},
			{
				path: '/serviceDetail',
				component: serviceDetail,
				name: '维修详情', 
				meta: {
					routerIndex: "10361"
				}
			},
			{
				path: '/dismDetail',
				component: dismDetail,
				name: '拆除详情', 
				meta: {
					routerIndex: "10361"
				}
			},
			{
				path: '/orderManger',
				component: orderManger,
				name: '订单管理',
				meta: {
					routerIndex: "10523"
				}
			},
			{
				path: '/myHandle',
				component: myHandle,
				name: '我的已办',
				meta: {
					routerIndex: "10480"
				}
			},
			{
				path: '/myRequest',
				component: myRequest,
				name: '我的请求',
				meta: {
					routerIndex: "10500"
				}
			},
			{
				path: '/busProductInfo',
				component: busProductInfo,
				name: '设备查询',
				meta: {
					routerIndex: "10508"
				}
			},
			{
				path: '/busSIMInfo',
				component: busSIMInfo,
				name: 'SIM查询',
				meta: {
					routerIndex: "10509"
				}
			},
			{
				path: '/BlacklistInfo',
				component: BlacklistInfo,
				name: '黑名单管理',
				meta: {
					routerIndex: "10506"
				}
			},
			{
				path: '/AgentSettings',
				component: AgentSettings,
				name: '代理设置',
				meta: {
					routerIndex: "10507"
				}
			},
			{
				path: '/EasyStealCars',
				component: EasyStealCars,
				name: '易盗车型管理',
				meta: {
					routerIndex: "10512"
				}
			},
			{
				path: '/customerComfirmation',
				component: customerComfirmation,
				name: '客户确认',
				meta: {
					routerIndex: "10599"
				}
			},
			{
				path: '/orderSupplement',
				component: orderSupplement,
				name: '订单补登',
				meta: {
					routerIndex: "10614"
				}
			},
			{
				path: '/myOrderSupplement',
				component: myOrderSupplement,
				name: '我的补登',
				meta: {
					routerIndex: "10616"
				}
			},
			{
				path: '/personPosition',
				component: personPosition,
				name: '人员定位',
				meta: {
					routerIndex: "10624"
				}
			}
		]
	},
	{
		path: '/',
		component: Home,
		name: '库存管理',
		iconCls: 'iconfont icon-yunkucun', //图标样式class
		meta: {
			routerIndex: "10362"
		},
		children: [{
				path: '/deliveryManage',
				component: deliveryManage,
				name: '发货管理',
				meta: {
					routerIndex: "10363"
				}
			},
			{
				path: '/floesManage',
				component: floesManage,
				name: '收货管理',
				meta: {
					routerIndex: "363"
				}
			},
			{
				path: '/StoIn',
				component: StoIn,
				name: '物资入库',
				meta: {
					routerIndex: "10364"
				}
			},
			{
				path: '/myStockCheck',
				component: myStockCheck,
				name: '我的库存',
				meta: {
					routerIndex: "365"
				}
			},
			{
				path: '/StockCheck',
				component: StockCheck,
				name: '库存查询',
				meta: {
					routerIndex: "10365"
				}
			},
			{
				path: '/delivFloesManage',
				component: delivFloesManage,
				name: '收发货管理',
				meta: {
					routerIndex: "10424"
				}
			},
			{
				path: '/inventoryDetails',
				component: inventoryDetails,
				name: '库存明细',
				meta: {
					routerIndex: "10490"
				}
			},
			{
				path: '/SupplierInfo',
				component: SupplierInfo,
				name: '供应商管理',
				meta: {
					routerIndex: "10504"
				}
			},
			{
				path: '/equipmentReturnFactory',
				component: equipmentReturnFactory,
				name: '设备返厂',
				meta: {
					routerIndex: "10513"
				}
			},
			{
				path: '/equipmentReturnFactoryManger',
				component: equipmentReturnFactoryManger,
				name: '返厂设备管理',
				meta: {
					routerIndex: "10638"
				}
			},
			{
				path: '/abEquipmentReturnFactoryManger',
				component: abEquipmentReturnFactoryManger,
				name: '异常设备登记',
				meta: {
					routerIndex: "10639"
				}
			},
			{
				path: '/equipmentMaintenance',
				component: equipmentMaintenance,
				name: '设备检修',
				meta: {
					routerIndex: "10623"
				}
			},
			{
				path: '/ProdModelInfo',
				component: ProdModelInfo,
				name: '设备型号',
				meta: {
					routerIndex: "10520"
				}
			},
			{
				path: '/BindRelationship',
				component: BindRelationship,
				name: '绑定关系',
				meta: {
					routerIndex: "10545"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '平台管理',
		iconCls: 'iconfont icon-zhiling', //图标样式class
		meta: {
			routerIndex: "10366"
		},
		children: [{
				path: '/Order',
				component: Order,
				name: '短信设置',
				meta: {
					routerIndex: "10367"
				}
			},
			{
				path: '/messageSend',
				component: messageSend,
				name: '短信发送',
				meta: {
					routerIndex: "10368"
				}
			},
			{
				path: '/OrderLog',
				component: OrderLog,
				name: '短信记录',
				meta: {
					routerIndex: "10369"
				}
			},
			{
				path: '/CommunicationPlat',
				component: CommunicationPlat,
				name: '通讯平台',
				meta: {
					routerIndex: "1370"
				}
			},
			{
				path: '/DeviceAccess',
				component: DeviceAccess,
				name: '设备接入',
				meta: {
					routerIndex: "1371"
				}
			},
			{
				path: '/OnlineProd',
				component: OnlineProd,
				name: '上线设备',
				meta: {
					routerIndex: "10567"
				}
			},
			{
				path: '/IOCP',
				component: IOCP,
				name: 'IOCP',
				meta: {
					routerIndex: "10561"
				}
			},
			{
				path: '/OnlineProdVAS',
				component: OnlineProdVAS,
				name: '上线设备(可查)',
				meta: {
					routerIndex: "10581"
				}
			},
			{
				path: '/customLabel',
				component: customLabel,
				name: '自定义标签',
				meta: {
					routerIndex: "10630"
				}
			},
			{
				path: '/groupingCar',
				component: groupingCar,
				name: '分组车辆',
				meta: {
					routerIndex: "10631"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '财务管理',
		iconCls: 'iconfont icon-caiwuguanli', //图标样式class
		meta: {
			routerIndex: "10370"
		},
		children: [{
			path: '/financialStatement',
			component: financialStatement,
			name: '财务对账单',
			meta: {
				routerIndex: "10610"
			}
		}]
	},
	{
		path: '/',
		component: Home,
		name: '统计报表',
		iconCls: 'iconfont icon-tongjibaobiao',
		meta: {
			routerIndex: "10375"
		},
		children: [{
				path: '/reportAll',
				component: reportAll,
				name: '库房',
				meta: {
					routerIndex: "10376"
				},
				children: [{
						path: '/equipmentStorageStatistics',
						component: equipmentStorageStatistics,
						name: '设备入库统计表',
						meta: {
							routerIndex: "10377"
						}
					},
					{
						path: '/equipmentStorageOutStatistics',
						component: equipmentStorageOutStatistics,
						name: '设备出库统计表',
						meta: {
							routerIndex: "10378"
						}
					},
					// { path: '/equipmentCancelStorage',component:equipmentCancelStorage, name: '设备退库统计表',meta:{routerIndex:"10379"}},
					{
						path: '/equipmentAllocationStorage',
						component: equipmentAllocationStorage,
						name: '设备调拨统计表',
						meta: {
							routerIndex: "10380"
						}
					},
					{
						path: '/personnelStatistics',
						component: personnelStatistics,
						name: '未入库人员统计表',
						meta: {
							routerIndex: "10381"
						}
					},
					{
						path: '/equipmentLossStatistics',
						component: equipmentLossStatistics,
						name: '设备报损明细表',
						meta: {
							routerIndex: "10382"
						}
					},
					// { path: '/equipmentReturnStatistics', component:equipmentReturnStatistics, name: '设备返厂明细表',meta:{routerIndex:"10383"}},
					{
						path: '/technicalGroupStatistics',
						component: technicalGroupStatistics,
						name: '技术组入库情况统计表',
						meta: {
							routerIndex: "10384"
						}
					},
					{
						path: '/storeBill',
						component: storeBill,
						name: '库存清单',
						meta: {
							routerIndex: "10385"
						}
					},
					{
						path: '/inventoryReport',
						component: inventoryReport,
						name: '库存查询报表',
						meta: {
							routerIndex: "10472"
						}
					},
					{
						path: '/batchStorageStatistics',
						component: batchStorageStatistics,
						name: '批量入库统计表',
						meta: {
							routerIndex: "10475"
						}
					},
					{
						path: '/ownerStorageStatistics',
						component: ownerStorageStatistics,
						name: '个人库存明细表',
						meta: {
							routerIndex: "10476"
						}
					},
					{
						path: '/ownerStorageCount',
						component: ownerStorageCount,
						name: '个人库存统计表',
						meta: {
							routerIndex: "10481"
						}
					},
					{
						path: '/stockOutStatistics',
						component: stockOutStatistics,
						name: '发货统计表',
						meta: {
							routerIndex: "10485"
						}
					},
					{
						path: '/groupInventoryList',
						component: groupInventoryList,
						name: '分组库存明细表',
						meta: {
							routerIndex: "10510"
						}
					},
					{
						path: '/groupInventoryStatistics',
						component: groupInventoryStatistics,
						name: '分组库存统计表',
						meta: {
							routerIndex: "10528"
						}
					},
					{
						path: '/shippingList',
						component: shippingList,
						name: '发货明细表',
						meta: {
							routerIndex: "10593"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '技术服务',
				meta: {
					routerIndex: "10386"
				},
				children: [{
						path: '/technicalInstall',
						component: technicalInstall,
						name: '技术安装统计表',
						meta: {
							routerIndex: "10474"
						}
					},
					{
						path: '/clerkBill',
						component: clerkBill,
						name: '文员派单统计表',
						meta: {
							routerIndex: "10388"
						}
					},
					{
						path: '/monthReconciliationReport',
						component: monthReconciliationReport,
						name: '客户报单对账表',
						meta: {
							routerIndex: "10389"
						}
					},
					{
						path: '/monthStatement',
						component: monthStatement,
						name: '异动明细表',
						meta: {
							routerIndex: "10390"
						}
					},
					{
						path: '/leshanMonthStatement',
						component: leshanMonthStatement,
						name: '乐山众汇三月对账表',
						meta: {
							routerIndex: "10391"
						}
					},
					{
						path: '/equipmentStatistics',
						component: equipmentStatistics,
						name: '设备统计表(陕西新青年)',
						meta: {
							routerIndex: "10606"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '售后监控',
				meta: {
					routerIndex: "10392"
				},
				children: [{
						path: '/customerRenewalsStatistics',
						component: customerRenewalsStatistics,
						name: '客户续费统计表',
						meta: {
							routerIndex: "10393"
						}
					},
					{
						path: '/salesSuccessStatistics',
						component: salesSuccessStatistics,
						name: '售后成功统计表',
						meta: {
							routerIndex: "10394"
						}
					},
					{
						path: '/afterSalesList',
						component: afterSalesList,
						name: '售后派单统计表',
						meta: {
							routerIndex: "10395"
						}
					},
					{
						path: '/abnormalEquipmentList',
						component: abnormalEquipmentList,
						name: '异常设备统计表',
						meta: {
							routerIndex: "10396"
						}
					},
					{
						path: '/vehicleAlarmList',
						component: vehicleAlarmList,
						name: '车辆报警统计表',
						meta: {
							routerIndex: "10397"
						}
					},
					{
						path: '/vehicleAlarmHistoryList',
						component: vehicleAlarmHistoryList,
						name: '车辆历史报警统计表',
						meta: {
							routerIndex: "10398"
						}
					},
					{
						path: '/technicalDetailsAndTravelStatistics',
						component: technicalDetailsAndTravelStatistics,
						name: '售后设备明细及差旅费统计',
						meta: {
							routerIndex: "10399"
						}
					},
					{
						path: '/abnormalVehStatistics',
						component: abnormalVehStatistics,
						name: '车辆异常监控表',
						meta: {
							routerIndex: "10582"
						}
					},
					{
						path: '/vehicleAll',
						component: vehicleAll,
						name: '全部车辆',
						meta: {
							routerIndex: "10594"
						}
					},
					{
						path: '/alarmVehAll',
						component: alarmVehAll,
						name: '全部报警车辆',
						meta: {
							routerIndex: "10595"
						}
					},
					{
						path: '/expirationRenewtStatistics',
						component: expirationRenewtStatistics,
						name: '到期续费表',
						meta: {
							routerIndex: "10596"
						}
					},
					{
						path: '/mileageStatistics',
						component: mileageStatistics,
						name: '里程统计表',
						meta: {
							routerIndex: "10615"
						}
					},
					{
						path: '/transcendZGIS',
						component: transcendZGIS,
						name: '超越转GIS设备统计表',
						meta: {
							routerIndex: "10637"
						}
					},
					{
						path: '/bridgeStatistics',
						component: bridgeStatistics,
						name: '贵州桥梁统计表',
						meta: {
							routerIndex: "10642"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '行政人事',
				meta: {
					routerIndex: "10792"
				},
				children: [{
					path: '/attendanceStatistics',
					component: attendanceStatistics,
					name: '考勤统计表',
					meta: {
						routerIndex: "10459"
					}
				}]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '基础管理报表',
				meta: {
					routerIndex: "10800"
				},
				children: [{
						path: '/ownerStatistics',
						component: ownerStatistics,
						name: '车主报表',
						meta: {
							routerIndex: "10461"
						}
					},
					{
						path: '/vehicleStatistics',
						component: vehicleStatistics,
						name: '车辆报表',
						meta: {
							routerIndex: "10462"
						}
					},
					{
						path: '/insuranceStatistics',
						component: insuranceStatistics,
						name: '保单报表',
						meta: {
							routerIndex: "10463"
						}
					},
					{
						path: '/prodStatistics',
						component: prodStatistics,
						name: '设备报表',
						meta: {
							routerIndex: "10804"
						}
					},
					{
						path: '/corpStatistics',
						component: corpStatistics,
						name: '组织报表',
						meta: {
							routerIndex: "10463"
						}
					},
					{
						path: '/deptStatistics',
						component: deptStatistics,
						name: '部门报表',
						meta: {
							routerIndex: "10465"
						}
					},
					{
						path: '/groupStatistics',
						component: groupStatistics,
						name: '分组报表',
						meta: {
							routerIndex: "10467"
						}
					},
					{
						path: '/positionStatistics',
						component: positionStatistics,
						name: '岗位报表',
						meta: {
							routerIndex: "10468"
						}
					},
					{
						path: '/employeeStatistics',
						component: employeeStatistics,
						name: '员工报表',
						meta: {
							routerIndex: "10469"
						}
					},
					{
						path: '/addressStatistics',
						component: addressStatistics,
						name: '地址报表',
						meta: {
							routerIndex: "10471"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: 'GIS报表',
				meta: {
					routerIndex: "108101"
				},
				children: [{
						path: '/vehOnlineStatistics',
						component: vehOnlineStatistics,
						name: '车辆在线报表',
						meta: {
							routerIndex: "10525"
						}
					},
					{
						path: '/vehLeavelineStatistics',
						component: vehLeavelineStatistics,
						name: '车辆离线报表',
						meta: {
							routerIndex: "10526"
						}
					},
					{
						path: '/historyStatistics',
						component: historyStatistics,
						name: '历史记录',
						meta: {
							routerIndex: "10529"
						}
					},
					{
						path: '/dailyPlatVehiMileage',
						component: dailyPlatVehiMileage,
						name: '每日平台车辆运行里程',
						meta: {
							routerIndex: "10531"
						}
					},
					{
						path: '/dailyOnlineVehicle',
						component: dailyOnlineVehicle,
						name: '日上线车辆/设备明细',
						meta: {
							routerIndex: "10577"
						}
					},
					{
						path: '/dailyAddVehicle',
						component: dailyAddVehicle,
						name: '日增设备上线统计',
						meta: {
							routerIndex: "10578"
						}
					},
					{
						path: '/dailyAddVehicleCorp',
						component: dailyAddVehicleCorp,
						name: '日新装车辆上线统计',
						meta: {
							routerIndex: "10579"
						}
					},
					{
						path: '/dailyAddVehicleProd',
						component: dailyAddVehicleProd,
						name: '日新装设备上线统计',
						meta: {
							routerIndex: "10580"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '报表设计',
				meta: {
					routerIndex: "108101"
				},
				children: [{
						path: '/reportDesign',
						component: reportDesign,
						name: '报表设计',
						meta: {
							routerIndex: "10591"
						}
					},
					{
						path: '/reportConfig',
						component: reportConfig,
						name: '报表配置',
						meta: {
							routerIndex: "10592"
						}
					},
				]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '部门新表',
				meta: {
					routerIndex: "10640"
				},
				children: [{
					path: '/technicalServiceAll',
					component: technicalServiceAll,
					name: '技术服务部',
					meta: {
						routerIndex: "20410"
					}
				},
				{
					path: '/insuranceAll',
					component: insuranceAll,
					name: '保险部',
					meta: {
						routerIndex: "20411"
					}
				},
				{
					path: '/afterServiceAll',
					component: afterServiceAll,
					name: '售后监控部',
					meta: {
						routerIndex: "20412"
					}
				},
				{
					path: '/mileageNewStatistics',
					component: mileageNewStatistics,
					name: '里程统计表',
					meta: {
						routerIndex: "20420"
					}
				},
				{
					path: '/storageRoomAll',
					component: storageRoomAll,
					name: '库房',
					meta: {
						routerIndex: "20413"
					}
				},
				{
					path: '/financialDeptAll',
					component: financialDeptAll,
					name: '财务部',
					meta: {
						routerIndex: "20414"
					}
				},
				{
					path: '/businessDeptAll',
					component: businessDeptAll,
					name: '业务部',
					meta: {
						routerIndex: "20415"
					}
				},
				{
					path: '/empAdministrationAll',
					component: empAdministrationAll,
					name: '人力行政',
					meta: {
						routerIndex: "20416"
					}
				}]
			},
			{
				path: '/reportAll',
				component: reportAll,
				name: '部门图表',
				meta: {
					routerIndex: "20417"
				},
				children: [{
					path: '/stoEcharts',
					component: stoEcharts,
					name: '库房图表',
					meta: {
						routerIndex: "20418"
					}
				}]
			},

		]
	},
	{
		path: '/',
		component: Home,
		name: '系统管理',
		iconCls: 'iconfont icon-jinlingyingcaiwangtubiao100',
		meta: {
			routerIndex: "10400"
		},
		children: [{
				path: '/UserInfo',
				component: UserInfo,
				name: '用户管理',
				meta: {
					routerIndex: "10401"
				}
			},
			{
				path: '/RoleInfo',
				component: RoleInfo,
				name: '角色管理',
				meta: {
					routerIndex: "10402"
				}
			},
			{
				path: '/ResourceInfo',
				component: ResourceInfo,
				name: '资源管理',
				meta: {
					routerIndex: "10403"
				}
			},
			{
				path: '/ActVariableMapping',
				component: ActVariableMapping,
				name: '流程数据映射',
				meta: {
					routerIndex: "10404"
				}
			},
			{
				path: '/SysDictionary',
				component: SysDictionary,
				name: '字典管理',
				meta: {
					routerIndex: "10405"
				}
			},
			{
				path: '/SysDictionaryData',
				component: SysDictionaryData,
				name: '字典数据管理',
				meta: {
					routerIndex: "10406"
				}
			},
			{
				path: '/systemSetting',
				component: systemSetting,
				name: '系统设置',
				meta: {
					routerIndex: "10407"
				}
			},
			{
				path: '/RunProcess',
				component: RunProcess,
				name: '运行流程',
				meta: {
					routerIndex: "10408"
				}
			},
			{
				path: '/completeProcess',
				component: completeProcess,
				name: '结束流程',
				meta: {
					routerIndex: "10409"
				}
			},
			{
				path: '/DifinitionProcess',
				component: DifinitionProcess,
				name: '定义流程',
				meta: {
					routerIndex: "10410"
				}
			},
			{
				path: '/DefinitionModel',
				component: DefinitionModel,
				name: '流程模型',
				meta: {
					routerIndex: "10411"
				}
			},
			{
				path: '/detailsInfo',
				component: detailsInfo,
				name: '数据导入',
				meta: {
					routerIndex: "10413"
				}
			},
			{
				path: '/interfaceInfo',
				component: interfaceInfo,
				name: '接口管理',
				meta: {
					routerIndex: "10414"
				}
			},
			{
				path: '/agreementsInfo',
				component: agreementsInfo,
				name: '协议管理',
				meta: {
					routerIndex: "10530"
				}
			},
			{
				path: '/corpInfo',
				component: corpInfo,
				name: '客户管理',
				meta: {
					routerIndex: "10559"
				}
			},
			{
				path: '/terminalAlarmSettings',
				component: terminalAlarmSettings,
				name: '终端报警设置',
				meta: {
					routerIndex: "10417"
				}
			},
			{
				path: '/alarmTypeSettings',
				component: alarmTypeSettings,
				name: '报警类型设置',
				meta: {
					routerIndex: "10543"
				}
			},
			{
				path: '/alarmParamSettings',
				component: alarmParamSettings,
				name: '报警参数设置',
				meta: {
					routerIndex: "10557"
				}
			},
			{
				path: '/testParamSettings',
				component: testParamSettings,
				name: '检测参数设置',
				meta: {
					routerIndex: "10558"
				}
			},
			{
				path: '/operationRecord',
				component: operationRecord,
				name: '操作记录',
				meta: {
					routerIndex: "10620"
				}
			},
			{
				path: '/qrcode',
				component: qrcode,
				name: '二维码生成',
				meta: {
					routerIndex: "10636"
				}
			},
			{
				path: '/messageManage',
				component: messageManage,
				name: '消息群发',
				meta: {
					routerIndex: "10690"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '内容管理',
		iconCls: 'iconfont icon-wenzhang',
		meta: {
			routerIndex: "10418"
		},
		children: [{
				path: '/typeManagement',
				component: typeManagement,
				name: '分类管理',
				meta: {
					routerIndex: "10419"
				}
			},
			{
				path: '/articleManagement',
				component: articleManagement,
				name: '文章管理',
				meta: {
					routerIndex: "10420"
				}
			},
			{
				path: 'leaveMessage',
				component: leaveMessage,
				name: '留言管理',
				meta: {
					routerIndex: "10597"
				}
			},
			{
				path: 'employeeScore',
				component: employeeScore,
				name: '年度考评(结果)',
				meta: {
					routerIndex: "10632"
				}
			},
			{
				path: 'employeeScoreTB',
				component: employeeScoreTB,
				name: '年度考评(填报)',
				meta: {
					routerIndex: "10634"
				}
			},
			{
				path: 'departmentScore',
				component: departmentScore,
				name: '年度考评(跨部门)',
				meta: {
					routerIndex: "10633"
				}
			},
			{
				path: 'departmentScoreResult',
				component: departmentScoreResult,
				name: '年度考评(跨部门结果)',
				meta: {
					routerIndex: "10635"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '考勤管理',
		iconCls: 'iconfont icon-qiandao',
		meta: {
			routerIndex: "10422"
		},
		children: [{
				path: '/AttdRecord',
				component: AttdRecord,
				name: '签到管理',
				meta: {
					routerIndex: "10423"
				}
			},
			{
				path: '/AttdRule',
				component: AttdRule,
				name: '考勤规则维护',
				meta: {
					routerIndex: "10453"
				}
			},
			{
				path: '/AttdCenter',
				component: AttdCenter,
				name: '考勤区域维护',
				meta: {
					routerIndex: "10454"
				}
			},
			{
				path: '/AttdHistory',
				component: AttdHistory,
				name: '签到历史记录',
				meta: {
					routerIndex: "10483"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		name: '指标管理',
		iconCls: 'iconfont icon-zhibiao',
		meta: {
			routerIndex: "10600"
		},
		children: [{
				path: '/indexSetting',
				component: indexSetting,
				name: '指标设置',
				meta: {
					routerIndex: "10601"
				}
			},
			{
				path: '/indexAllot',
				component: indexAllot,
				name: '指标反馈',
				meta: {
					routerIndex: "10602"
				}
			},
			{
				path: '/indexQuery',
				component: indexQuery,
				name: '指标查询',
				meta: {
					routerIndex: "10603"
				}
			},
			{
				path: '/indexChart',
				component: indexChart,
				name: '指标图表',
				meta: {
					routerIndex: "10604"
				}
			},
		]
	},
	{
		path: '/',
		component: Home,
		hidden: true,
		name: '工作台',
		children: [{
				path: '/corpAddProcess',
				component: corpAddProcess,
				name: '新建客户',
				meta: {
					routerIndex: "10484"
				}
			},
			{
				path: '/employeeInduction',
				component: employeeInduction,
				name: '员工入职',
				meta: {
					routerIndex: "1048511"
				}
			},
			{
				path: '/employeeLeave',
				component: employeeLeave,
				name: '员工离职',
				meta: {
					routerIndex: "1048611"
				}
			},
			{
				path: '/vehicleRegistration',
				component: vehicleRegistration,
				name: '车辆登记',
				meta: {
					routerIndex: "1048612"
				}
			},
			{
				path: '/personnelDesk',
				component: personnelDesk,
				name: ''
			},
		]
	},
];
export default routes;