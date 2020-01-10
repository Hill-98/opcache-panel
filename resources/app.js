import Vue from "vue"
import router from "./router"
import i18n from "./i18n"
import store from "./store"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core"
import {
    faAngleLeft,
    faAngleRight,
    faArrowUp,
    faGlobe,
    faRedoAlt,
    faSignOutAlt,
    faSort,
    faSyncAlt,
    faTimes,
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import errorHandler from "@/js/errorHandler"

faLibrary.add(
    faAngleLeft,
    faAngleRight,
    faArrowUp,
    faGlobe,
    faRedoAlt,
    faSignOutAlt,
    faSort,
    faSyncAlt,
    faTimes,
    faTrash
);

Vue.config.productionTip = false;
Vue.config.errorHandler = errorHandler;
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
Vue.use(Buefy, {
    defaultIconComponent: FontAwesomeIcon.name,
    defaultIconPack: "fas",
});

Object.defineProperty(Vue.prototype, "errorHandler", {
    enumerable: true,
    value: errorHandler
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(require("./App.vue").default)
}).$mount("#app");
