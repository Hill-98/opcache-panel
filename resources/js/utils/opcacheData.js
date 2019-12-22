import { LoadingProgrammatic } from "buefy"
import apiClient from "../apiClient"
import store from "@/store"

const getOpcacheData = function getOpcacheData(action, key, isLoading = true) {
    let loading;
    if (isLoading) {
        loading = LoadingProgrammatic.open({
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
                if ("close" in loading && typeof loading.close === "function") {
                    loading.close();
                }
            })
    })
};

export default {
    getConfiguration: (isLoading) => getOpcacheData("getConfiguration", "configuration", isLoading),
    getInfo: (isLoading) => getOpcacheData("getInfo", undefined, isLoading),
    getStatus: (isLoading) => getOpcacheData("getStatus", "status", isLoading)
}
