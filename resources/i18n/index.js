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
                get: () => {
                    return super.locale;
                },
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
const languagesCode = process.env.VUE_APP_LANGUAGES.split("|");

languagesCode.forEach(value => {
    const langPack = require(`./${value}/index.js`).default;
    [messages[value], languages[value]] = [langPack, langPack._meta.name];
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
    locale: userLanguage,
    fallbackLocale: defaultLanguage,
    silentFallbackWarn: true,
    messages,
});
