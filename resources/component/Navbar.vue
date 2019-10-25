<template>
    <b-navbar type="is-dark" wrapper-class="container" shadow>
        <!-- 导航栏标题 -->
        <template slot="brand">
            <b-navbar-item :href="href">
                <span style="font-weight: 600; font-size: 1.25rem">Opcache Panel</span>
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
            <b-navbar-dropdown>
                <template slot="label">
                    <b-tooltip :label="$t('navbar.language')" position="is-bottom" :delay="500" animated type="is-dark">
                        <b-icon icon="globe"></b-icon>
                    </b-tooltip>
                </template>
                <b-navbar-item v-for="(value, name) in languages" :key="name" tag="router-link"
                               :to="`/${name}${$route.meta.originalPath}`">
                    {{ value }}
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <!-- 导航栏操作按钮 END -->
    </b-navbar>
</template>

<script>
    import {languages} from "../i18n"
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "Navbar",
        data: () => ({
            languages,
            href: window.location.href.replace(window.location.hash, ""),
            updateStyle: {},
            update: false,
            timer: null
        }),
        methods: {
            async resetCache() {
                await apiClient("resetCache");
                await opcacheData.getInfo();
            },
            realTimeUpdate() {
                this.update = !this.update;
                if (this.update) {
                    this.timer = setInterval(opcacheData.getInfo, 3000, false);
                    this.$set(this.updateStyle, "color", "#167df0");
                } else {
                    clearInterval(this.timer);
                    this.$delete(this.updateStyle, "color");
                }
            }
        }
    }
</script>
