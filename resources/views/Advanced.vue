<template>
    <div>
        <div class="tile">
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <p class="title is-5" v-t="'page.advanced.pre_cache'"></p>
                    <b-field :label="$t('page.advanced.file_path')">
                        <b-input v-model="path.pre_cache" :placeholder="$t('page.advanced.multi_path')"></b-input>
                    </b-field>
                    <div class="level-right">
                        <b-button type="is-primary" v-t="'page.advanced.submit'" @click="compileFile"></b-button>
                    </div>
                    <p v-html="$t('page.advanced.use_function', {func: functionLink('opcache_compile_file')})"></p>
                    <p v-t="'page.advanced.pre_cache_summary'"></p>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <p class="title is-5" v-t="'page.advanced.invalidate_cache_dir'"></p>
                    <b-field :label="$t('page.advanced.dir_path')">
                        <b-input v-model="path.invalidate" :placeholder="$t('page.advanced.multi_path')"></b-input>
                    </b-field>
                    <div class="level-right">
                        <b-button type="is-primary" v-t="'page.advanced.submit'" @click="invalidateDir"></b-button>
                    </div>
                    <p v-html="$t('page.advanced.use_function', {func: functionLink('opcache_invalidate')})"></p>
                    <p v-t="'page.advanced.invalidate_cache_dir_summary'"></p>
                </div>
            </div>
        </div>
        <div class="tile">
            <div class="tile is-parent is-6">
                <div class="tile is-child box" id="is-cached" style="position: relative">
                    <p class="title is-5">检查文件是否缓存</p>
                    <b-field :label="$t('page.advanced.file_path')">
                        <b-input v-model="path.is_cached"></b-input>
                    </b-field>
                    <div class="level-right">
                        <b-button type="is-primary" v-t="'page.advanced.submit'" @click="isScriptCached"></b-button>
                    </div>
                    <p v-html="$t('page.advanced.use_function', {func: functionLink('opcache_is_script_cached')})"></p>
                    <p v-t="'page.advanced.check_cache_summary'"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "Advanced",
        data: () => ({
            path: {
                pre_cache: "",
                invalidate: "",
                is_cached: ""
            }
        }),
        methods: {
            functionLink(func) {
                return `<a href="https://www.php.net/manual/function.${func.replace(/_/g, "-")}.php" target="_blank">
                            <code>${func}</code>
                        </a>`
            },
            api(action, value, refresh = true) {
                // 分割多个路径
                if (value.indexOf("|") !== -1) {
                    value = value.split("|")
                }
                let notEmpty = true;
                // 如果是多个路径，判断路径是否全部为空。
                if (typeof value === "object") {
                    notEmpty = value.some(v => {
                        return v !== "";
                    })
                }
                if (value === "" || !notEmpty) {
                    this.$buefy.toast.open({
                        message: this.$t("page.advanced.empty_path"),
                        type: "is-warning"
                    });
                    return;
                }
                return new Promise((resolve, reject) => {
                    apiClient(action, value)
                        .then(data => {
                            resolve(data);
                            if (refresh === true) {
                                opcacheData.getStatus();
                            }
                        })
                        .catch(reject)
                });
            },
            compileFile() {
                this.api("compileFile", this.path.pre_cache);
            },
            invalidateDir() {
                this.api("invalidateDir", this.path.invalidate);
            },
            isScriptCached() {
                // 不允许多个路径
                if (this.path.is_cached.indexOf("|") !== -1) {
                    this.$buefy.toast.open({
                        message: this.$t("page.advanced.not_multi_path"),
                        type: "is-warning"
                    });
                    return;
                }
                this.api("isScriptCached", this.path.is_cached, false)
                    .then(data => {
                        let message = "";
                        if (data.hasOwnProperty("success") && data.success) {
                            message = "page.advanced.cached";
                        } else {
                            message = "page.advanced.uncached";
                        }
                        this.$buefy.toast.open({
                            container: "#is-cached",
                            message: this.$t(message),
                            type: "is-info"
                        });
                    })
                    .catch(window.EMPTY_FUNC);
            }
        }
    }
</script>
