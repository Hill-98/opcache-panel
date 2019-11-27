import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n);

class _VueI18n extends VueI18n {
    get locale() {
        return super.locale;
    }

    set locale(value) {
        if (super.locale === value || !super.availableLocales.includes(value)) {
            return;
        }
        super.locale = value;
        document.documentElement.lang = value;
        localStorage.setItem(localStorageKey, value);
    }
}

const localStorageKey = "opp-lang";
const defaultLanguage = "en-US";
const messages = {};

// 动态导入所有语言模块
const availableLocales = require.context(".", true, /\/.+\/$/).keys().map(value => value.match(/\/(.+)\/$/)[1]);
availableLocales.forEach(value => {
    const languageModule = require(`./${value}`);
    messages[value] = languageModule.default;
});

// 获取用户语言
let userLanguage = localStorage.getItem(localStorageKey) || document.documentElement.lang;
if (!availableLocales.includes(userLanguage)) {
    const browserLanguages = navigator.languages || [navigator.browserLanguage, navigator.systemLanguage, navigator.userLanguage];
    userLanguage = browserLanguages.find(value => availableLocales.includes(value)) || defaultLanguage;
}

export default new _VueI18n({
    messages,
    availableLocales,
    locale: userLanguage,
    fallbackLocale: defaultLanguage,
    silentFallbackWarn: true
});
