<!--
 * @Descripttion: 
 * @version: 
 * @Author: daiwolong
 * @Date: 2022-09-20 17:56:59
 * @LastEditors: daiwolong
 * @LastEditTime: 2022-09-21 10:54:14
-->
<template>
	<div>
		<router-view />
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less">
@import './common/style/base.less';

body,
html {
	padding: 0;
	margin: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #000;
	font-size: 14px;
}
</style>
