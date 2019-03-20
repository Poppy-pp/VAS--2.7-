import Vue from 'vue'
import Vuex from 'vuex'
import { getFormCountDb } from '../api/api';
Vue.use(Vuex)

const now = new Date();
// 应用初始状态
const state = {
	// IMG_URL:'https://wanwangblob.blob.core.chinacloudapi.cn/image-test/',
	IMG_URL:'/img/',
	paths: [], // 登陆后tab卡切换数据记录
	curpath: null, //记录当前路由路径
	formObj: '', //记录报单单子
	orderSupplement: '', //记录当前编辑对象
	item: '', //记录拆除对象
	storeFormInfo: [],
	//系统识别码 1 2 3
	noMenu: 0,
	//我的待办数量
	amountNum: 0,
	tabbarType:{
		name:'a1',//防止多页面使用冲突
		type:'1'
	}
}

// 定义所需的 mutations
const mutations = {
	 //记录我的待办tab类型值
    TABBAR_TYPE(state,number){
        state.tabbarType = number;
    },
	//更新在线用户信息
	UPDATE_USER_INFO(state, userinfo) {
		state.currentUserInfo = userinfo;
	},
	//初始化登录系统识别码  1为gis系统页面  2为vas  3vas工作台
	INIT_NOMENU(state, noMenu) {
		state.noMenu = noMenu;
	},
	//更新我的待办数量
	INIT_FORMNUM(state) {
		getFormCountDb().then((res) => {
			if(res.data.result.code == 0) {
				state.amountNum = res.data.data;
			}
		});
	},
}

// 定义所需的 actions
const actions = {
	tabbarType({commit},number){
        commit('TABBAR_TYPE',number)
    },
	updateUserinfo({
		commit
	}) {
		let userinfo = JSON.parse(sessionStorage.getItem('user'));
		commit('UPDATE_USER_INFO', userinfo);
	},
	initNomenu({
		commit
	}) {
		let noMenu = JSON.parse(sessionStorage.getItem('noMenu'));
		commit('INIT_NOMENU', noMenu);
	},
	initFormNum({
		commit
	}) {
		commit('INIT_FORMNUM');
	},
}

//定义所需的 getters
const getters = {
	tabbarType: state => state.tabbarType,
	userInfo: state => state.currentUserInfo,
	noMenu: state => state.noMenu,
	amountNum: state => state.amountNum,
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});

// 创建 store 实例
export default store;