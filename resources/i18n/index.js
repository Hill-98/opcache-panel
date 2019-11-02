import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n);

export function setLanguage(language) {
    if (i18n.locale === language || !languagesCode.includes(language)) {
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
const languagesCode = Object.keys(messages);

const defaultLanguage = "en-US";
// 获取用户语言
let userLanguage = localStorage.getItem("opp-lang") || document.documentElement.lang;
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
