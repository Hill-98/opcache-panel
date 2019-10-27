const isProd = process.env.NODE_ENV === "production";
process.env.VUE_APP_VERSION = require("./package.json").version;

let vue_config = {
    devServer: {
        proxy: "http://127.0.0.1:8098"
    },
    lintOnSave: !isProd,
    chainWebpack: config => {
        if (isProd) {
            config.plugins.delete('html');
            config.plugins.delete('preload');
            config.plugins.delete('prefetch');
        }
    },
    configureWebpack: config => {
        config.entry.app = ['./resources/app.js'];
        if (isProd) {
            config.optimization.splitChunks = {};
        }
    }
};
if (isProd) {
    vue_config = {
        ...vue_config,
        filenameHashing: false,
        publicPath: './assets',
        outputDir: 'assets',
        productionSourceMap: false,
    }
}

module.exports = vue_config;
