const Package = require("./package.json");
process.env.VUE_APP_VERSION = Package.version;
let vue_config = {
    devServer: {
        proxy: "http://127.0.0.1:8098"
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.delete('html');
            config.plugins.delete('preload');
            config.plugins.delete('prefetch');
        }
    },
    configureWebpack: config => {
        config.entry.app = ['./resources/app.js'];
        if (process.env.NODE_ENV === 'production') {
            config.optimization.splitChunks = {};
        }
    }
};
if (process.env.NODE_ENV === 'production') {
    vue_config = {
        ...vue_config,
        filenameHashing: false,
        publicPath: './assets',
        outputDir: 'assets',
        productionSourceMap: false,
    }
}

module.exports = vue_config;
