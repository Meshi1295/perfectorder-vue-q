import Vue from 'vue'
import VueRouter from 'vue-router'
import firebaseInstance from '../drivers/firebase'
import routes from './routes'


Vue.use(VueRouter)


const router = new VueRouter({
    routes
})

/**
 * handle user redirections
 */
//eslint-disable-next-line consistent-return
//router-guard - שליטה בכניסה לדפים בצורה בטוחה יותר
// router.beforeEach((to,from,next) =>{
//     const user = firebaseInstance.firebase.auth().currentUser
//     if(user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
//         const path = !user ? '/' : '/home';
//         return next(path)
//     }
//     next()
// //    ברגע שרואים את הפקודה נקסט- נבין שזהו קוד מידלוואר כלומר באמצע של בין תהליכים
// })

export default router


