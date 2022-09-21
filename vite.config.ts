import { UserConfig, ConfigEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './config/plugins';
import proxy from './config/proxy';
import { VITE_PORT, VITE_DROP_CONSOLE } from './config/index';
export default ({ command, mode }: ConfigEnv): UserConfig => {
	const isBuild = command === 'build';
	console.log(command, mode);

	return {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		plugins: createVitePlugins(isBuild),
		server: {
			hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
			port: VITE_PORT, //指定服务器端口
			open: false, //指定自动在浏览器中打开应用程序
			host: '0.0.0.0', // IP配置，支持从IP启动
			proxy,
		},
		// build
		build: {
			target: 'es2015',
			terserOptions: {
				compress: {
					keep_infinity: true,
					drop_console: VITE_DROP_CONSOLE,
				},
			},
			rollupOptions: {
				external: [], // 确保外部化处理那些你不想打包进库的依赖
				// https://rollupjs.org/guide/en/#big-list-of-options
			},
			watch: {
				// https://rollupjs.org/guide/en/#watch-options
			},
			// Turning off brotliSize display can slightly reduce packaging time
			brotliSize: false,
			chunkSizeWarningLimit: 2000,
		},
	};
};
