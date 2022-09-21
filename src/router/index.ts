import { createRouter, createWebHashHistory } from 'vue-router';
import routes from 'virtual:generated-pages'; //生成的动态路由
const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior: (to, from, savePosition) => {
		if (savePosition) {
			return savePosition;
		} else {
			return {
				top: 0,
			};
		}
	},
	routes,
});

router.beforeEach(() => {});
router.afterEach(() => {});
export default router;
