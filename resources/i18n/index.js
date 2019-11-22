import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n);

class _VueI18n extends VueI18n {
    constructor(options) {
        super(options);
        Object.defineProperties(this.__proto__, {
            languages: {
                value: options.languages,
            },
            languagesCode: {
                value: options.languagesCode
            },
            locale: {
                get: () => super.locale,
                set: value => {
                    if (super.locale === value || !options.languagesCode.includes(value)) {
                        return;
                    }
                    super.locale = value;
                    document.documentElement.lang = value;
                    localStorage.setItem(localStorageKey, value);
                }
            }
        });
    }
}

const localStorageKey = "opp-lang";
const defaultLanguage = "en-US";
const messages = {};
const languages = {};

// 动态导入所有语言模块
const languagesCode = require.context(".", true, /\/.+\/$/).keys().map(value => value.match(/\/(.+)\/$/)[1]);
languagesCode.forEach(value => {
    const languageModule = require(`./${value}`);
    [messages[value], languages[value]] = [languageModule.default, languageModule.meta.name];
});

// 获取用户语言
let userLanguage = localStorage.getItem(localStorageKey) || document.documentElement.lang;
if (!languagesCode.includes(userLanguage)) {
    const browserLanguages = navigator.languages || [navigator.browserLanguage, navigator.systemLanguage, navigator.userLanguage];
    userLanguage = browserLanguages.find(value => languagesCode.includes(value)) || defaultLanguage;
}

export default new _VueI18n({
    languages,
    languagesCode,
    messages,
    locale: userLanguage,
    fallbackLocale: defaultLanguage,
    silentFallbackWarn: true
});
