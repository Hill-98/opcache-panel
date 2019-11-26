import has from "./utils/has"

const isProd = Boolean(process.env.VUE_APP_PRODUCTION);

export default err => {
    if (isProd) {
        if (has(err, "isAxiosError") || has(err, "isApiError")) {
            return;
        }
    } else {
        console.dir(err);
    }
    console.error(err);
}
