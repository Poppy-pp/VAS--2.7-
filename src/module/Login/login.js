import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import '../../../theme/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
new Vue({
	render: h => h(App)
}).$mount('#app')