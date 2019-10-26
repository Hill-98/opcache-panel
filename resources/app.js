import Vue from "vue"
import VueRouter from "./router"
import VueI18n from "./i18n"
import App from "./App.vue"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core"
import {
    faArrowUp,
    faGlobe,
    faRedoAlt,
    faSignOutAlt,
    faSort,
    faSyncAlt,
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

faLibrary.add(
    faArrowUp,
    faGlobe,
    faRedoAlt,
    faSignOutAlt,
    faSort,
    faSyncAlt,
    faTrash
);
Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.use(Buefy, {
    defaultIconComponent: "vue-fontawesome",
    defaultIconPack: "fas",
});

Vue.config.productionTip = false;

window.EMPTY_FUNC = () => undefined;

export default new Vue({
    data: {
        opcacheData: {}
    },
    render: h => h(App),
    router: VueRouter,
    i18n: VueI18n
}).$mount("#app");
