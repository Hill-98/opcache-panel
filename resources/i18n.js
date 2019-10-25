import Vue from "vue"
import VueI18n from "vue-i18n"
import en_US from "./i18n/en-US/index"
import zh_CN from "./i18n/zh-CN/index"

Vue.use(VueI18n);

export function setLanguage(language) {
    if (!languages.hasOwnProperty(language) || i18n.locale === language) {
        return;
    }
    i18n.locale = language;
    document.documentElement.lang = language;
    localStorage.setItem("opp-lang", language);
}

const messages = {
    "en-US": en_US,
    "zh-CN": zh_CN
};

export const languages = {
    "en-US": "English",
    "zh-CN": "简体中文"
};
const languagesCode = Object.keys(languages);

const defaultLanguage = "en-US";
// 获取用户语言
let userLanguage = localStorage.getItem("opp-lang") || document.documentElement.lang;
if (languagesCode.indexOf(userLanguage) === -1) {
    userLanguage = defaultLanguage;
    let browserLanguages = navigator.languages;
    if (!browserLanguages) {
        // IE 11
        browserLanguages = [
            navigator.browserLanguage,
            navigator.systemLanguage,
            navigator.userLanguage
        ]
    }
    for (const language of browserLanguages) {
        if (language !== undefined && languagesCode.indexOf(language) !== -1) {
            userLanguage = language;
            break;
        }
    }
}

export const i18n = new VueI18n({
    locale: userLanguage,
    fallbackLocale: defaultLanguage,
    silentFallbackWarn: true,
    messages,
});

export default i18n
