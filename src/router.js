import {
	createRouter,
	createWebHashHistory
} from "vue-router"
const routes = [{
		path: '/',
		name: 'main',
		component: () => import('./views/Main.vue')
	},
	{
		path: '/b/:id',
		component: () => import('./views/Book.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		redirect: to => '/'
	},
]


const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router