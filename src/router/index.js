import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home.vue'
import firebaseInstance from '../drivers/firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {authNotRequired:false}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {authNotRequired:false}

    },
    {
        path: '/folder/:id',
        name: 'Folder',
        meta: {authNotRequired:true},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Folder.vue')
    },
    {
        path: '/addFileId/:folderId/:fileId',
        name: 'AddFileId',
        meta: {authNotRequired:false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AddFileId.vue')
    },
    {
        path: '/addFolder/:type',
        name: 'AddFolder',
        meta: {authNotRequired:false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AddFolder.vue')
    },

]

const router = new VueRouter({
    routes
})



export default router


