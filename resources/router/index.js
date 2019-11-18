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
        meta: {
            redirect: `/%s${value.path}`,
            redirectLocale: true
        }
    });
    // 添加语言参数到真实路径
    routes[index].meta.originalPath = value.path;
    routes[index].path = `/:lang${value.path}`;
});

// 默认语言首页重定向
i18n.languagesCode.forEach(value => {
    routes.unshift({
        path: `/${value}`,
        redirect: `/${value}/status`
    })
});

// 首页重定向
routes.unshift({
    path: "/",
    redirect: "/status",
});

const router = new VueRouter({routes});

// 路由前置钩子：更改语言和标题、重定向。
router.beforeEach((to, form, next) => {
    if (to.meta.redirectLocale) {
        next(to.meta.redirect.replace("%s", i18n.locale));
        return;
    }
    document.title = "Opcache Panel";
    if (to.params.lang) {
        i18n.locale = to.params.lang;
    }
    if (to.meta.title) {
        document.title += ` - ${i18n.t(to.meta.title)}`;
    }
    next();
});

export default router
