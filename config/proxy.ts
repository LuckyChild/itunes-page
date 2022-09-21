/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 11:39:36
 */
import { API_BASE_URL, API_TARGET_URL } from './index';
import { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;
const init: ProxyTargetList = {
	// 代理地址
	[API_BASE_URL]: {
		target: API_TARGET_URL,
		changeOrigin: true,
		rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
	},
};

export default init;
