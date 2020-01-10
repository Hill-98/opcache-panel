import has from "./utils/has"

const isProd = Boolean(process.env.VUE_APP_PRODUCTION);
const ignoredError = {
    attr: [
        "isApiError",
        "isAxiosError"
    ]
};

export default (err) => {
    if (isProd) {
        if (ignoredError.attr.some(value => has(err, value))) {
            return;
        }
    } else {
        console.dir(err);
    }
    console.error(err);
}
