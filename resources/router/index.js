import Vue from "vue"
import VueRouter from "vue-router"
import i18n from "../i18n"
import Status from "../views/Status.vue"
import CacheFiles from "../views/CacheFiles.vue"
import Advanced from "../views/Advanced.vue"

Vue.use(VueRouter);

const routes = [
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

routes.forEach((value, index) => {
    // 没有语言参数的路径重定向至当前语言
    routes.push({
        path: value.path,
        redirect: `/${i18n.locale}${value.path}`,
    });
    // 添加语言参数到真实路径
    routes[index].meta.originalPath = value.path;
    routes[index].path = `/:lang${value.path}`;
});

// 默认语言首页重定向
Object.keys(i18n.messages).forEach(value => {
    routes.unshift({
        path: `/${value}`,
        redirect: `/${value}/status`,
    })
});

// 首页重定向
routes.unshift({
    path: "/",
    redirect: `/${i18n.locale}/status`,
});

const router = new VueRouter({routes});

// 路由前置钩子，负责更改语言和标题。
router.afterEach(to => {
    if (to.params.lang) {
        i18n.setLocale(to.params.lang);
    }
    document.title = `Opcache Panel - ${i18n.t(to.meta.title)}`;
});

export default router
