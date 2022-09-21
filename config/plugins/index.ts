/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 16:07:04
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { APP_MOCK } from '../index';
import configMockPlugin from './mock';
import { ConfigPagesPlugin } from './pages';
import { AutoRegistryComponents } from './components';
import { AutoImportDeps } from './autoImport';
import { ConfigCompressPlugin } from './compression';
export function createVitePlugins(isBuild: boolean) {
	const vitePlugins: (Plugin | Plugin[])[] = [
		//支持vue
		vue(),
		//根据pages目录自动生成菜单
		ConfigPagesPlugin(),
		//自动按需引入组件
		AutoRegistryComponents(),
		//自动按需引入依赖
		AutoImportDeps(),
		//开启.gz压缩
		ConfigCompressPlugin(),
	];

	// vite-plugin-mock
	APP_MOCK && vitePlugins.push(configMockPlugin(isBuild));

	return vitePlugins;
}
