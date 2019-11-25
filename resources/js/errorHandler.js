const isProd = process.env.NODE_ENV === "production";

export default err => {
    if (isProd && err instanceof Promise) {
        return
    }
    console.error(isProd);
}
