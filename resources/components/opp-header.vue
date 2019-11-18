<template>
    <header>
        <b-navbar type="is-dark" wrapper-class="container" shadow>
            <!-- 导航栏标题 -->
            <template slot="brand">
                <b-navbar-item :href="href">
                    <span class="has-text-white title is-5">Opcache Panel</span>
                </b-navbar-item>
            </template>
            <!-- 导航栏标题 END -->
            <!-- 导航栏菜单 -->
            <template slot="start">
                <template v-for="item in $router.options.routes">
                    <b-navbar-item v-if="item.meta" :key="item.name" tag="router-link"
                                   :to="`/${$i18n.locale}${item.meta.originalPath}`"
                                   :active="$route.name === item.name" v-t="item.meta.title">
                    </b-navbar-item>
                </template>
            </template>
            <!-- 导航栏菜单 END -->
            <!-- 导航栏操作按钮 -->
            <template slot="end">
                <b-navbar-item @click="resetCache">
                    <b-tooltip :label="$t('navbar.reset')" position="is-bottom" :delay="500" animated type="is-dark">
                        <b-icon icon="redo-alt"></b-icon>
                    </b-tooltip>
                </b-navbar-item>
                <b-navbar-item @click="realTimeUpdate">
                    <b-tooltip :label="$t('navbar.update')" position="is-bottom" :delay="500" animated type="is-dark">
                        <b-icon :style="updateStyle" icon="sync-alt"></b-icon>
                    </b-tooltip>
                </b-navbar-item>
                <b-navbar-item v-if="isLogin" @click="logout">
                    <b-tooltip :label="$t('navbar.logout')" position="is-bottom" :delay="500" animated type="is-dark">
                        <b-icon icon="sign-out-alt"></b-icon>
                    </b-tooltip>
                </b-navbar-item>
                <b-navbar-dropdown>
                    <template slot="label">
                        <b-tooltip :label="$t('navbar.language')" position="is-bottom" :delay="500" animated type="is-dark">
                            <b-icon icon="globe"></b-icon>
                        </b-tooltip>
                    </template>
                    <b-navbar-item v-for="(value, name) in $i18n.languages" :key="name" tag="router-link"
                                   :to="`/${name}${$route.meta.originalPath}`">
                        {{ value }}
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
            <!-- 导航栏操作按钮 END -->
        </b-navbar>
    </header>
</template>

<script>
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "opp-header",
        data: () => ({
            href: window.location.href.replace(window.location.hash, ""),
            updateStyle: {},
            timer: null
        }),
        computed: {
            isLogin() {
                return document.cookie.split("; ").some(value => value.split("=")[0] === "OPP_SESSION");
            }
        },
        methods: {
            logout() {
                const form = document.createElement("form");
                form.action = "./index.php";
                form.method = "post";
                form.style.display = "none";
                const input = document.createElement("input");
                input.name = "logout";
                input.value = "yes";
                form.appendChild(input);
                const submit = document.createElement("input");
                submit.type = "submit";
                form.appendChild(submit);
                document.body.appendChild(form);
                form.submit();
            },
            async resetCache() {
                try {
                    await apiClient("resetCache");
                    await opcacheData.getInfo();
                } catch {
                    //
                }
            },
            realTimeUpdate() {
                if (this.timer === null) {
                    this.timer = setInterval(async () => {
                        try {
                            await opcacheData.getInfo
                        } catch {
                            //
                        }
                    }, 3000, false);
                    this.$set(this.updateStyle, "color", "#167df0");
                } else {
                    clearInterval(this.timer);
                    this.$delete(this.updateStyle, "color");
                    this.timer = null;
                }
            }
        }
    }
</script>
