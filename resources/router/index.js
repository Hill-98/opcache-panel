import Vue from "vue"
import VueRouter from "vue-router"
import i18n from "@/i18n"
import Status from "@/views/Status.vue"
import CacheFiles from "@/views/CacheFiles.vue"
import Advanced from "@/views/Advanced.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        beforeEnter: (to, from, next) => next(`/${i18n.locale}/status`)
    },
    {
        path: "/status",
        component: Status,
        name: "status",
        meta: {
            title: "navbar.status"
        },
    },
    {
        path: "/cache-files",
        component: CacheFiles,
        name: "cache-files",
        meta: {
            title: "navbar.cache_files"
        },
    },
    {
        path: "/advanced",
        component: Advanced,
        name: "advanced",
        meta: {
            title: "navbar.advanced"
        },
    },
];

const langMatch = `/:lang(${i18n.availableLocales.join("|")})`;

routes.forEach((value, index) => {
    if (!value.name) {
        return;
    }
    // 没有语言参数的路径重定向至当前语言
    routes.push({
        path: value.path,
        beforeEnter: ({path}, from, next) => next(`/${i18n.locale}${path}`)
    });
    // 添加语言参数到真实路径
    [routes[index].path, routes[index].meta.originalPath] = [langMatch.concat(value.path), value.path];
});

// 语言首页重定向
routes.push({
    path: langMatch,
    beforeEnter: (to, from, next) => next("/")
});
// 捕获未知路由，不允许跳转至未知路由。
routes.push({
    path: "*",
    beforeEnter: (to, from, next) => next(from.name ? from.path : "/")
});

const router = new VueRouter({routes});

// 路由前置钩子：更改语言和标题。
router.beforeEach((to, from, next) => {
    if (to.params.lang) {
        i18n.locale = to.params.lang;
    }
    document.title = process.env.VUE_APP_TITLE;
    if (to.meta.title) {
        document.title += ` - ${i18n.t(to.meta.title)}`;
    }
    next();
});

export default router
