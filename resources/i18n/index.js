import Vue from "vue"
import VueI18n from "vue-i18n"

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
    "en-US": require("./en-US").default,
    "zh-CN": require("./zh-CN").default
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
