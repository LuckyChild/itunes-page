<!--
 * @Descripttion: 
 * @version: 
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 18:07:14
-->
<template>
	<div class="container">
		<van-search @update:model-value="handleUpdateSearch" v-model="state.searchValue" placeholder="Search..." />
		<div class="content">
			<div class="recommend" v-if="state.recommendList.length > 0">
				<h4>Recommend</h4>
				<div class="recommend-container">
					<div class="recommend-wrapper">
						<div
							class="recommend-item"
							v-for="item in state.recommendList"
							:key="item.id.attributes['im:id']"
							@click="goToItunes(item.id.attributes.scheme)"
						>
							<img :src="item['im:image'][1].label" alt="" />
							<h5 class="limit">{{ item['im:name'].label }}</h5>
							<p class="type">{{ item.category.attributes.label }}</p>
						</div>
					</div>
				</div>
			</div>

			<ul class="app-list" v-if="state.freeList.length > 0">
				<li class="app-item" v-for="(item, index) in state.freeList" :key="item.trackId" @click="goToItunes(item.trackViewUrl)">
					<span class="rank">
						{{ index + 1 }}
					</span>
					<van-image class="image" lazy-load :src="item.artworkUrl60" />
					<div class="app-content">
						<h6 class="title">{{ item.trackName }}</h6>
						<p class="type">{{ item.genres.join(',') }}</p>
						<div class="rate">
							<van-rate color="#ffd21e" :size="14" readonly v-model="item.averageUserRating" />
							({{ item.userRatingCount }})
						</div>
					</div>
				</li>
			</ul>
			<van-empty description="暂无内容" v-else />
		</div>
	</div>
</template>
<script setup lang="ts">
import '@vant/touch-emulator';

import { Search as VanSearch, Rate as VanRate, Empty as VanEmpty, Image as VanImage } from 'vant';
import { ApiGetTopGrossingApp, ApiGetTopFreeApp, ApiGetLookup } from '@/apis';
const state = reactive({
	searchValue: '',
	recommendList: [] as any,
	freeList: [] as any,
	freeIds: [],
});

let localData: Array<object> = [];
/**
 * 获取app详情
 */
const getAppDetail = async () => {
	const res = await ApiGetLookup(state.freeIds.join(','));
	state.freeList = res.results;
	localData = res.results;
};
/**
 * 获取推荐列表
 */
const getTopGrossingApp = async () => {
	const res = await ApiGetTopGrossingApp({ limit: 10 });
	state.recommendList = res.feed.entry;
};

/**
 * 获取免费app列表 id
 */
const getTopFreeApp = async () => {
	const res = await ApiGetTopFreeApp({ limit: 100 });
	const attributes = res.feed.entry.map((item: any) => item.id);
	state.freeIds = attributes.map((item: any) => item.attributes['im:id']);
	getAppDetail();
};

/**
 * 搜索
 * @param val
 */
const handleUpdateSearch = (val: string) => {
	if (val) {
		const newArr = localData.filter((value: any) => {
			return value.trackName.includes(val.trim()) || value.artistName.includes(val.trim()) || value.description.includes(val.trim());
		});
		state.freeList = newArr;
	} else {
		state.freeList = localData;
	}
};
/**
 * 跳转外部应用
 * @param url
 */
const goToItunes = (url: string) => {
	location.href = url;
};
getTopGrossingApp();
getTopFreeApp();
</script>
<style lang="less" scoped>
@import './index.module.less';
</style>
