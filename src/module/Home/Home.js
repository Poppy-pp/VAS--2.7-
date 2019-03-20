import 'babel-polyfill';
import Vue from 'vue';
import VueAMap from 'vue-amap';
import App from './App';
import '../../../theme/index.css';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import store from '../../vuex/store';
import routes from '../../router/routes';
import echarts from 'echarts';
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI, {
	size: 'medium'
});
Vue.use(VueRouter);
Vue.use(VueAMap);
Vue.prototype.$echarts = echarts;//修改原型链,全局使用
// 初始化vue-amap
VueAMap.initAMapApiLoader({
	// 高德的key
	key: '8120b756a0a5a0cc9a543412fc5b2613',
	// 插件集合
	plugin: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
	uiVersion: '1.0' // 版本号
});

const router = new VueRouter({
	routes: routes
});

router.beforeEach((to, from, next) => {
	document.title = to.name;
	let user = JSON.parse(sessionStorage.getItem('user')),
		nomenu = JSON.parse(sessionStorage.getItem('noMenu')),
		routes = JSON.parse(sessionStorage.getItem('routes'));
	if(nomenu){
		/*判断用户是否值登录GIS*/
		if(nomenu == 1 && to.path == "/HomePage") {
			next("/GisVehicleMonitoring");
		}
		/*判断用户是否值登录工作台*/
		if(nomenu == 2 && to.path == "/HomePage") {
			next("/personnelDesk");
		}
	}
	if(routes){
		//如果用户没有权限查看首页就跳转到工作台
		if(routes[0].id == 10330 && to.path == '/') {
			next("/HomePage");
		}
		if(routes[0].id != 10330 && to.path == '/') {
			next("/personnelDesk");
		}
	}
	if(!user) {
		location.href = "/module/login.html";
	} else {
		next();
	}
	//记录当前所在页面地址信息
	store.state.curpath = to;
	//记录tab切换记录
	if(to.path != "/" && to.path != "/HomePage") {
		let flag = true;
		if(from.path == "/formProcess") store.state.isApply = false;
		if(store.state.paths.length == 0) {
			store.state.paths.push(to);
		}
		store.state.paths.forEach(function(val) {
			if(to.name == val.name) {
				flag = false
			}
		});
		if(flag) store.state.paths.push(to);
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')