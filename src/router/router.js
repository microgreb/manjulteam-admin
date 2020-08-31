import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: {name: 'products'},
    },
    {
        path: '/login',
        name: 'login',
        props: true,
        component: () => import('../views/pages/auth/Login.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/pages/products/list/ProductsListIndexPage.vue')
    },
    {
        path: '/products/create',
        name: 'products.create',
        component: () => import('../views/pages/products/create/ProductsCreateIndexPage.vue')
    },
    {
        path: '/products/edit/:product_id',
        name: 'products.edit',
        component: () => import('../views/pages/products/create/ProductsEditIndexPage.vue')
    },
    {
        path: '/storage',
        name: 'storage.index',
        component: () => import('../views/pages/storages/StorageIndexPage.vue')
    },

    {
        path: '/orders/sold',
        name: 'orders.sold.index',
        component: () => import('../views/pages/orders/sold/OrdersSoldIndexPage.vue')
    },

    {
        path: '/orders/active',
        name: 'orders.active.index',
        component: () => import('../views/pages/orders/active/OrdersActiveIndexPage.vue')
    },

    {
        path: '/lookbooks',
        name: 'lookbooks.index',
        component: () => import('../views/pages/lookbooks/LookbooksIndexPage.vue')
    },
    {
        path: '/lookbooks/edit/:lookbook_id',
        name: 'lookbooks.edit',
        component: () => import('../views/pages/lookbooks/create/LookbooksEditIndexPage.vue')
    },

    {
        path: '/lookbooks/create',
        name: 'lookbooks.create',
        component: () => import('../views/pages/lookbooks/create/LookbooksCreateIndexPage.vue')
    },



];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
