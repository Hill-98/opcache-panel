import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n);

export function setLanguage(language) {
    if (i18n.locale === language || !languagesCode.includes(language)) {
        return;
    }
    i18n.locale = language;
    document.documentElement.lang = language;
    localStorage.setItem(localStorageKey, language);
}

const localStorageKey = "opp-lang";
const defaultLanguage = "en-US";
const messages = {};
export const languages = {};
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

export const i18n = new VueI18n({
    locale: userLanguage,
    fallbackLocale: defaultLanguage,
    silentFallbackWarn: true,
    messages,
});

export default i18n
