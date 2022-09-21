/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-01-18 14:12:26
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-03-29 11:25:39
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import data from './data';
export function setupProdMockServer() {
	createProdMockServer([...data]);
}
