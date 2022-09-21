/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-20 18:09:10
 */
import { createPinia } from 'pinia';
import { useUserStore } from './user';
const pinia = createPinia();

export default pinia;

export { useUserStore };
