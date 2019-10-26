<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="container" style="padding-top: 1rem">
            <router-view :key="$route.name"></router-view>
        </div>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <span style="font-weight: bold">
                        <a href="https://github.com/Hill-98/opcache-panel" target="_blank">Opcache Panel</a>
                    </span>
                    &nbsp;by&nbsp;
                    <a href="https://github.com/Hill-98" target="_blank">Zhong Lufan</a>.
                    The source code is licensed&nbsp;
                    <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
                </p>
                <p>Version: {{ version }}</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue"
    import opcacheData from "./js/utils/opcacheData"

    export default {
        name: "app",
        data: () => ({
            version: process.env.VUE_APP_VERSION
        }),
        components: {
            Navbar
        },
        mounted() {
            opcacheData.getInfo();
        }
    }
</script>
