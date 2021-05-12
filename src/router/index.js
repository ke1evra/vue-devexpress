import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/orders',
        name: 'orders',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue'),
    },
    {
        path: '/monitoring',
        name: 'monitoring',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Monitoring.vue'),
    },
    {
        path: '/test',
        name: 'test',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue'),
    },
    {
        path: '/salesDynamics',
        name: 'salesDynamics',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/SalesDynamics.vue'),
    },
    {
        path: '/TextManipulate',
        name: 'TextManipulate',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/TextManipulate.vue'),
    },
    {
        path: '/calls',
        name: 'Calls',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Calls.vue'),
    },
    {
        path: '/expenses',
        name: 'Expenses',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Expenses.vue'),
    },
    {
        path: '/buyer',
        name: 'Buyer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Buyer.vue'),
    },
    {
        path: '/callsMonitoring',
        name: 'callsMonitoring',
        component: () => import('../views/CallsMonitoring.vue'),
    },
    {
        path: '/storage',
        name: 'storage',
        component: () => import('../views/Storage.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
