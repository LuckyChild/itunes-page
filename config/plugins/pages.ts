/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:15:10
 */
import Pages from 'vite-plugin-pages';

/**
 * @name ConfigPagesPlugin
 * @desc 根据菜单动态生成路由
 */
export const ConfigPagesPlugin = () => {
	return Pages({
		pagesDir: [{ dir: 'src/pages', baseRoute: '' }], //用于搜索页面组件的目录路径。
		extensions: ['vue', 'md'], //页面组件的有效文件扩展名。
		exclude: ['**/components/*.vue'],
		nuxtStyle: true, //使用 Nuxt.js 风格的路由命名  默认false
	});
};
