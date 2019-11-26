import apiClient from "../apiClient"
import {LoadingProgrammatic as Loading} from "buefy"
import store from "@/store"

const getOpcacheData = function getOpcacheData(action, key, isLoading = true) {
    let loading;
    if (isLoading) {
        loading = Loading.open({
            container: null
        });
    }
    return new Promise((resolve, reject) => {
        apiClient(action)
            .then(data => {
                if (key === undefined) {
                    store.dispatch("opcacheData", data);
                } else {
                    store.commit(key, data);
                }
                resolve(data);
            })
            .catch(reject)
            .finally(() => {
                if (loading !== undefined) {
                    loading.close();
                }
            })
    })
}

export default {
    getConfiguratio: (isLoading) => getOpcacheData("getConfiguration", "configuration", isLoading),
    getInfo: (isLoading) => getOpcacheData("getInfo", undefined, isLoading),
    getStatus: (isLoading) => getOpcacheData("getStatus", "status", isLoading)
}
