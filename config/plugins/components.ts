/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:14:33
 */
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

export const AutoRegistryComponents = () => {
	return Components({
		//用于搜索组件的目录的相对路径。
		// dirs: ['src/components'],
		//组件的有效文件扩展名。
		extensions: ['vue', 'md'],
		//搜索子目录
		deep: true,
		// 生成 `components.d.ts` 全局声明，
		// 也接受自定义文件名的路径
		dts: 'src/components.d.ts',
		// 允许子目录作为组件的命名空间前缀
		directoryAsNamespace: false,
		// 忽略命名空间前缀的子目录路径
		// 当 `directoryAsNamespace: true` 时有效
		globalNamespaces: [],
		directives: true,
		include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
		resolvers: [
			// IconsResolver({
			// 	componentPrefix: '',
			// }),
			NaiveUiResolver(),
			VueUseComponentsResolver(),
		],
	});
};
