/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 16:46:47
 */
import { createApp } from 'vue';
import { Lazyload } from 'vant';
import 'vant/lib/index.css'; // 全局引入vant样式

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

import App from './App.vue';
import piniaStore from './store';
import router from './router';

createApp(App)
	.use(Lazyload, {
		lazyComponent: true,
	})
	.use(router)
	.use(piniaStore)
	.mount('#app');
