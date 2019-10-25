import Vue from "vue"
import VueRouter from "vue-router"
import {i18n, languages, setLanguage} from "./i18n"
import Status from "./component/Status"
import CacheFiles from "./component/CacheFiles"
import Advanced from "./component/Advanced"

Vue.use(VueRouter);

let routes = [
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

// 把不带语言参数重定向至当前语言
routes.forEach(value => {
    routes.push({
        path: value.path,
        redirect: `/${i18n.locale}${value.path}`,
        default: true
    })
});

// 默认语言首页重定向
Object.keys(languages).forEach(value => {
    routes.push({
        path: `/${value}`,
        redirect: `/${value}/status`,
        default: true
    })
});

// 给真实路径添加语言参数
routes = routes.map(value => {
    if (value.default !== true) {
        value.meta.originalPath = value.path;
        value.path = `/:lang${value.path}`;
    }
    return value;
});

// 首页重定向
routes.push({
    path: "/",
    redirect: "/status",
    default: true,
});

const router = new VueRouter({routes});

// 路由前置钩子，负责更改语言和标题。
router.afterEach(to => {
    if (to.params.lang) {
        setLanguage(to.params.lang);
        document.title = `Opcache Panel - ${i18n.t(to.meta.title)}`;
    }
});

export default router
