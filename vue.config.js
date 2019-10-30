const isProd = process.env.NODE_ENV === "production";
process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
    outputDir: "assets",
    productionSourceMap: false,
    filenameHashing: false,
    devServer: {
        proxy: "http://127.0.0.1:8098"
    },
    lintOnSave: !isProd,
    chainWebpack: config => {
        config.entry("app").clear().add("./resources/app.js");
        if (isProd) {
            config.optimization.splitChunks({});
        }
    }
};
