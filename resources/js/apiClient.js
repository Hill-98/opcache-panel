import axios from "axios"
import i18n from "../i18n"
import {ToastProgrammatic as Toast} from "buefy"

const ignoreFunc = [
    "isScriptCached"
];

const apiClient = axios.create();
apiClient.interceptors.request.use(undefined, error => {
    Toast.open({
        type: "is-danger",
        message: i18n.t("api_client.request.error"),
        queue: false
    });
    return Promise.reject(error);
});
apiClient.interceptors.response.use(response => {
    if (typeof response.data !== "object") {
        Toast.open({
            type: "is-danger",
            message: i18n.t("api_client.response.data_error"),
            queue: false
        });
        return Promise.reject(response.data);
    }

    let action;
    try {
        const requestData = JSON.parse(response.config.data);
        action = requestData.action;
    } catch {
        action = "error";
    }

    if (!ignoreFunc.includes(action) && Object.prototype.hasOwnProperty.call(response.data, "success")) {
        if (response.data.success === true) {
            Toast.open({
                type: "is-success",
                message: i18n.t("api_client.response.success"),
                queue: false
            });
            return Promise.resolve(response.data);
        } else {
            Toast.open({
                type: "is-danger",
                message: i18n.t("api_client.response.not_success"),
                queue: false
            });
            return Promise.reject(response.data);
        }
    }
    return Promise.resolve(response.data);
}, error => {
    const errorCode = error.response.status;
    let errorMsg = "";
    switch (errorCode) {
        case 400:
        case 401:
        case 500:
            if (error.response.data.error) {
                errorMsg = error.response.data.error;
            } else {
                errorMsg = i18n.t(`api_client.response.error.${errorCode}`);
            }
            break;
        default:
            errorMsg = i18n.t(`api_client.response.error.unknown`);
    }
    Toast.open({
        type: "is-danger",
        message: `${errorMsg} (${errorCode})`,
        queue: false
    });
    return Promise.reject(error);
});

export default (action, param) => {
    return new Promise((resolve, reject) => {
        apiClient.post("index.php", JSON.stringify({
            action,
            param
        }))
            .then(resolve)
            .catch(reject);
    })
}
