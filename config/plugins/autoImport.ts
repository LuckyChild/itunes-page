/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:14:28
 */
import AutoImport from 'unplugin-auto-import/vite';
export const AutoImportDeps = () => {
	return AutoImport({
		dts: 'src/auto-imports.d.ts',
		imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
	});
};
