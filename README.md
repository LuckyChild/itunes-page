

1、Clone project code.

```bash

git clone 'https://github.com/LuckyChild/itunes-page.git'

cd itunes-application

```

2、Start local server.

```bash

# pnpm 
$ pnpm install
$ pnpm dev

# yarn
$ yarn install
$ yarn dev

```


### 🔔代码规范

- 通过`pre-commit`实现lint检查、单元测试、代码格式化等。 
- 结合VsCode编辑器（保存时自动执行格式化：editor.formatOnSave: true）
- 配合Git hooks钩子（commit前或提交前执行：pre-commit => pnpm run eslint:lint-staged）
- IDE 配置（`.editorconfig`）、ESLint 配置（`.eslintrc.js` 和 `.eslintignore`），详细请看对应的配置文件。  

### 📇目录结构

以下是系统的目录结构

```
├── config
│   ├── plugins          // 插件配置
│   ├── index.ts         // 系统常量 
|   └── proxy.ts         // 代理配置
├── mock                 // mock数据    
├── src     
│    ├── apis            // api请求   
│    ├── assets          // 静态文件   
│    ├── components      // 通用组件   
│    ├── pages           // 业务页面 
│    ├── router          // 路由文件   
│    ├── store           // 状态管理   
│    ├── utils           // 工具类   
│    ├── App.vue         // 模板入口   
│    ├── main.ts         // 模板js
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置  
```

### ❤️UI库

[vant-ui](https://vant-ui.github.io/vant/#/zh-CN)

### 🧩Vite插件模块化

```typescript

import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { APP_MOCK } from '../index';
import configMockPlugin from './mock';
import { ConfigPagesPlugin } from './pages';
export function createVitePlugins(isBuild: boolean) {
	const vitePlugins: (Plugin | Plugin[])[] = [
		//支持vue
		vue(),
		//根据pages目录自动生成菜单
		ConfigPagesPlugin(),
	];

	// vite-plugin-mock
	APP_MOCK && vitePlugins.push(configMockPlugin(isBuild));

	return vitePlugins;
}
```

`vite.config.ts`
```typescript
import { createVitePlugins } from './config/vite/plugins'
...
return {
    // plugins
    plugins: createVitePlugins(isBuild)
}
...
```

### 🍍支持Pinia 

创建文件`src/store/index.ts`
```typescript
import { createPinia } from 'pinia';
import { useUserStore } from './user';
const pinia = createPinia();

export default pinia;

export { useUserStore };
```
创建文件`src/store/user/index.ts`
```typescript
import { defineStore } from 'pinia';

import { ApiPostLogin, LoginData } from '../../apis/index';
export const useUserStore = defineStore('user', {
	state: () => ({
		userName: undefined,
		age: undefined,
	}),
	getters: {},
	actions: {
		async login(loginForm: LoginData) {
			const result = await ApiPostLogin(loginForm);
			return result;
		},
	},
});
```

### ✨支持axios(ts版)

已封装了主流的拦截器，请求调用等方法，区分了模块`index.ts`/`status.ts`/`type.ts`
```typescript

import { get } from '../utils/axios';

export interface TopGrossingAppData {
	limit: number;
}
export const ApiGetTopGrossingApp = async (data: TopGrossingAppData) =>
	get<any>({ url: `/api/hk/rss/topgrossingapplications/limit=${data.limit}/json`, showLoading: true });
```
```typescript
//调用
import {ApiGetTopGrossingApp} from "@/apis"
// setup模式下组件可以直接引用
const res = await ApiGetTopGrossingApp()
```

###  🔥通过检索pages文件夹可自动生成路由

支持`vue-router4.0`的模块化，基于vite-plugin-pages，通过检索pages文件夹可自动生成路由，并支持动态路由

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

console.log(routes,'打印生成自动生成的路由')
//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

### 🧬支持Mock数据

使用`vite-plugin-mock`插件，支持自动区分和启停的环境配置  

```javascript
// vite config
viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: false,
    // https://github.com/anncwb/vite-plugin-mock/issues/9
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
       setupProdMockServer();
       `
    })
```

### 😄支持自动按需引入组件和依赖

使用`unplugin-auto-import` `unplugin-vue-components`插件，支持按需引入组件和依赖

```typescript
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

export const AutoRegistryComponents = () => {
	return Components({
		//用于搜索组件的目录的相对路径。
		// dirs: ['src/components'],
		//组件的有效文件扩展名。
		extensions: ['vue', 'md'],
		//搜索子目录
		deep: true,
		// 生成 `components.d.ts` 全局声明，
		// 也接受自定义文件名的路径
		dts: 'src/components.d.ts',
		// 允许子目录作为组件的命名空间前缀
		directoryAsNamespace: false,
		// 忽略命名空间前缀的子目录路径
		// 当 `directoryAsNamespace: true` 时有效
		globalNamespaces: [],
		directives: true,
		include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
		resolvers: [
			// IconsResolver({
			// 	componentPrefix: '',
			// }),
			NaiveUiResolver(),
			VueUseComponentsResolver(),
		],
	});
};
```

```typescript
import AutoImport from 'unplugin-auto-import/vite';
export const AutoImportDeps = () => {
	return AutoImport({
		dts: 'src/auto-imports.d.ts',
		imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
	});
};
```