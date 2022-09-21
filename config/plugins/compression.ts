/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:14:38
 */
import viteCompression from 'vite-plugin-compression';
import { COMPRESSION } from '../index';

export const ConfigCompressPlugin = () => {
	if (COMPRESSION) {
		return viteCompression({
			ext: '.gz',
			// 记录压缩文件及其压缩率。
			verbose: true,
			//压缩文件后删除对应的源文件
			deleteOriginFile: false,
		});
	}
	return [];
};
