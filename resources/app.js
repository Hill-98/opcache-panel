import Vue from "vue"
import router from "./router"
import i18n from "./i18n"
import store from "./store"
import App from "./App.vue"
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
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

faLibrary.add(
    faAngleLeft,
    faAngleRight,
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
    store,
    render: h => h(App),
    router,
    i18n
}).$mount("#app");
