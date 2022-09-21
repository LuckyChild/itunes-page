/*
 * @Descripttion:
 * @version:
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 17:13:53
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { showMessage } from './status';
import { RequestConfig, RequestOptions } from './type';
import { Toast } from 'vant';

//创建axios实例
const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.BASE_URL + '',
});
// 加载封装
let loading: any = null;
export function startLoading(message?: string) {
	loading = Toast.loading({
		message: message || '加载中...',
		forbidClick: true,
		duration: 0,
		overlay: false,
		loadingType: 'spinner',
	});
}
// 关闭加载
export function endLoading() {
	loading.clear();
}
let needLoadingRequestCount = 0;
export function showFullScreenLoading(message?: string) {
	if (needLoadingRequestCount === 0) {
		startLoading(message);
	}
	needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
}
// axios拦截请求
axiosInstance.interceptors.request.use(
	(config: any) => {
		const token = 'token';
		if (token) {
			config.headers.Authorization = token;
		}
		if (config.showLoading) {
			showFullScreenLoading(config.message);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//axios拦截响应
axiosInstance.interceptors.response.use(
	//成功
	(response: AxiosResponse) => {
		tryHideFullScreenLoading();
		if (response.status === 200) {
			return response.data;
		}
		showMessage(response.status);
		return response;
	},
	// 失败
	(error: any) => {
		const { response } = error;
		tryHideFullScreenLoading();

		if (response) {
			showMessage(response.status);
			return Promise.reject(response.data);
		}
		showMessage('服务开小差');
	}
);
//axios封装请求
const request = <T = any>(config: RequestConfig, _options?: RequestOptions): Promise<T> => {
	const conf = config;

	return new Promise((reslove) => {
		axiosInstance.request<any, AxiosResponse>(conf).then((res: any) => {
			reslove(res);
		});
	});
};

//get请求
export function get<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
	return request({ ...config, method: 'GET' }, options);
}

//post 请求
export function post<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
	return request({ ...config, method: 'POST' }, options);
}

export default request;

export type { AxiosInstance, AxiosResponse };
