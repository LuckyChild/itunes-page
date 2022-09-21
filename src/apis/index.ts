import { get } from '../utils/axios';

export interface TopGrossingAppData {
	limit: number;
}

/**
 * 获取推荐app列表
 * @param data
 * @returns
 */
export const ApiGetTopGrossingApp = async (data: TopGrossingAppData) =>
	get<any>({ url: `/api/hk/rss/topgrossingapplications/limit=${data.limit}/json`, showLoading: true });

/**
 * 获取免费app列表
 * @param data
 * @returns
 */
export const ApiGetTopFreeApp = async (data: TopGrossingAppData) =>
	get<any>({ url: `/api/hk/rss/topfreeapplications/limit=${data.limit}/json` });

/**
 * 获取app详情
 * @param data
 * @returns
 */
export const ApiGetLookup = async (data: string) => get<any>({ url: `/api/hk/lookup?id=${data}` });
