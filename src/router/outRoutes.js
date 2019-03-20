/* 
 * @description: 外部路由
 * @author: wp 
 * @update: 2017-05-2
 */
import orderInfo from 'components/viewOrderInfo/orderInfo';
import orderInfos from 'components/viewOrderInfo/orderInfos';
import gatewayPage from 'components/viewOrderInfo/gatewayPage';
import logistics from 'components/viewOrderInfo/logistics';
const routes = [{
		path: '/orderInfo',
		component: orderInfo,
		name: '外部订单信息详情'
	},
	{
		path: '/orderInfos',
		component: orderInfos,
		name: '车贷订单信息详情'
	},
	{
		path: '/gatewayPage',
		component: gatewayPage,
		name: '手机门户单页'
	},
	{
		path: '/logistics',
		component: logistics,
		name: '物流信息'
	}
];
export default routes;