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
        meta: { authNotRequired: true}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { authNotRequired: false}

    },
    {
        path: '/folder/:id',
        name: 'Folder',
        meta: { authNotRequired: false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Folder.vue')
    },
    {
        path: '/addFileId/:folderId/:fileId',
        name: 'AddFileId',
        meta: { authNotRequired: false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AddFileId.vue')
    },
    {
        path: '/addFolder/:type',
        name: 'AddFolder',
        meta: { authNotRequired: false},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AddFolder.vue')
    },

]

const router = new VueRouter({
    routes
})

/**
 * handle user redirections
 */
//eslint-disable-next-line consistent-return
//router-guard - שליטה בכניסה לדפים בצורה בטוחה יותר
router.beforeEach((to,from,next) =>{
    const user = firebaseInstance.firebase.auth().currentUser
    if(user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
        const path = !user ? '/' : '/home';
        return next(path)
    }
    next()
//    ברגע שרואים את הפקודה נקסט- נבין שזהו קוד מידלוואר כלומר באמצע של בין תהליכים
})

export default router


