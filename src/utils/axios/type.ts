/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 17:13:31
 */
import { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
	isTransformResponse?: boolean;
}

export interface RequestConfig extends AxiosRequestConfig {
	showLoading?: boolean;
}
