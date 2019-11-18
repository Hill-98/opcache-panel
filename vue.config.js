const isProd = process.env.NODE_ENV === "production";
const fs = require("fs");
const packageJson = require("./package");
const path = require("path");
process.env.VUE_APP_TITLE = fs.readFileSync(path.resolve(__dirname, "define.php")).toString().match(/define\(["']TITLE["']\s*,\s*["'](.+)["']\);/)[1];
process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_LANGUAGES = fs.readdirSync(path.resolve(__dirname, "resources/i18n")).filter(value => value !== "index.js").join("|");

module.exports = {
    outputDir: "assets",
    productionSourceMap: false,
    filenameHashing: false,
    devServer: {
        proxy: "http://127.0.0.1:8098"
    },
    lintOnSave: !isProd,
    chainWebpack: config => {
        const appMain = path.resolve(__dirname, packageJson.main);
        config.entry("app").clear().add(appMain);
        config.performance.hints(false);
        config.resolve.alias.set("@", path.dirname(appMain));
        if (isProd) {
            config.optimization.splitChunks({});
        }
    }
};
