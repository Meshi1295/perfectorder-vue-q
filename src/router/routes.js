
const routes = [
    {
        path: '/', component: () => import('../layouts/MainLayout.vue'), meta: {authNotRequired: true},
        children: [
            {path: '/login', component: () => import('../views/Login'), meta: {authNotRequired: true}},
            {path: '/SummaryPage', component: () => import('../views/SummaryPage'), meta: {authNotRequired: false}},
            {path: '/home', component: () => import('../views/Home'), meta: {authNotRequired: false}},
            {path: '/folder/:id', component: () => import( '../views/Folder.vue'), meta: {authNotRequired: false}},
            {
                path: '/addFileId/:folderId/:fileId',
                component: () => import('../views/AddFileId.vue'),
                meta: {authNotRequired: false}
            },
            {
                path: '/addFolder/:type',
                component: () => import('../views/AddFolder.vue'),
                meta: {authNotRequired: false}
            },

        ],
    },
]

export default routes




