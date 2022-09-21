/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:15:05
 */
import { viteMockServe } from 'vite-plugin-mock';

export default function configMockPlugin(isBuild: boolean) {
	console.log('isBuild', isBuild);
	return viteMockServe({
		ignore: /^_/,
		mockPath: 'mock',
		localEnabled: !isBuild,
		prodEnabled: isBuild,
		injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';

        setupProdMockServer();`,
	});
}
