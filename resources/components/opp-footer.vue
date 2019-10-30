<template>
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
            <p>Powered By&nbsp;
                <a href="https://github.com/vuejs/vue" target="_blank">Vue</a>
                &nbsp;and&nbsp;
                <a href="https://github.com/buefy/buefy" target="_blank">buefy</a>.
            </p>
            <p>Version: {{ version }}</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "opp-footer",
        data: () => ({
            version: process.env.VUE_APP_VERSION
        }),
    }
</script>
