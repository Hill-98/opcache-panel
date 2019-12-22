<template>
    <header>
        <b-navbar type="is-dark" wrapper-class="container" shadow>
            <!-- 导航栏标题 -->
            <template #brand>
                <b-navbar-item :href="href">
                    <span class="has-text-white title is-5" v-text="title"/>
                </b-navbar-item>
            </template>
            <!-- 导航栏标题 END -->
            <!-- 导航栏菜单 -->
            <template #start>
                <template v-for="item in $router.options.routes">
                    <b-navbar-item v-if="item.name" :key="item.name" tag="router-link"
                                   :to="`/${$i18n.locale}${item.meta.originalPath}`"
                                   :active="$route.name === item.name" v-t="item.meta.title"/>
                </template>
            </template>
            <!-- 导航栏菜单 END -->
            <!-- 导航栏操作按钮 -->
            <template #end>
                <b-navbar-item :title="$t('navbar.reset')" @click="resetCache">
                    <b-icon icon="redo-alt"/>
                </b-navbar-item>
                <b-navbar-item :title="$t('navbar.update')" @click="realTimeUpdate">
                    <b-icon :style="updateStyle" icon="sync-alt"/>
                </b-navbar-item>
                <b-navbar-item :title="$t('navbar.logout')" @click="logout" v-if="isLogin">
                    <b-icon icon="sign-out-alt"/>
                </b-navbar-item>
                <b-navbar-dropdown :title="$t('navbar.language')">
                    <template #label>
                        <b-icon icon="globe"/>
                    </template>
                    <b-navbar-item v-for="(value, name) in $i18n.messages" :key="name" tag="router-link"
                                   :to="`/${name}${$route.meta.originalPath}`" v-text="value.$meta.name">
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
            <!-- 导航栏操作按钮 END -->
        </b-navbar>
    </header>
</template>

<script>
    import apiClient from "../js/apiClient"
    import errorHandler from "@/js/errorHandler"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "opp-header",
        data: () => ({
            href: location.href.replace(location.hash, ""),
            isLogin: document.cookie.split("; ").some(value => value.split("=")[0] === "OPP_SESSION"),
            updateStyle: {
                color: null,
            },
            timer: null,
            title: process.env.VUE_APP_TITLE
        }),
        methods: {
            logout() {
                const form = document.createElement("form");
                [form.action, form.method, form.style.display] = ["./index.php", "post", "none"];
                const logout = document.createElement("input");
                [logout.name, logout.type, logout.value] = ["logout", "hidden", "yes"];
                form.appendChild(logout);
                document.body.appendChild(form);
                form.submit();
            },
            realTimeUpdate() {
                if (this.timer === null) {
                    this.timer = setInterval(() => {
                        opcacheData.getInfo(false).catch(errorHandler);
                    }, 3000);
                    this.updateStyle.color = "#167df0";
                } else {
                    clearInterval(this.timer);
                    [this.timer, this.updateStyle.color] = [null, null];
                }
            },
            async resetCache() {
                await apiClient("resetCache");
                await opcacheData.getInfo();
            }
        }
    }
</script>

<style>
    .navbar-item.has-dropdown.is-active:hover .navbar-dropdown {
        display: block !important;
    }
</style>
