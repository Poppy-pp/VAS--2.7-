import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import VueAMap from 'vue-amap';
import '../../../theme/index.css';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import store from '../../vuex/store';
import routes from '../../router/outRoutes';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAMap);
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
new Vue({
	router,
    store,
	render: h => h(App)
}).$mount('#app')