import app from "../../app";
import apiClient from "../apiClient"
import {LoadingProgrammatic as Loading} from "buefy"

function getOpcacheData(action, key, isLoading = true) {
    let loading;
    if (isLoading) {
        loading = Loading.open({
            container: null
        });
    }
    return new Promise((resolve, reject) => {
        apiClient(action)
            .then(data => {
                let ob = app;
                if (key !== undefined) {
                    if (ob.opcacheData.hasOwnProperty(key)) {
                        ob = ob.opcacheData;
                    }
                } else {
                    key = "opcacheData"
                }
                app.$set(ob, key, data);
                resolve(data)
            })
            .catch(reject)
            .finally(() => {
                if (loading !== undefined) {
                    loading.close();
                }
            })
    })
}

export default class {
    static getInfo(isLoading) {
        return getOpcacheData("getInfo", undefined, isLoading);
    }

    static getConfiguration(isLoading) {
        return getOpcacheData("getConfiguration", "configuration", isLoading)
    }

    static getStatus(isLoading) {
        return getOpcacheData("getStatus", "status", isLoading);
    }
}
