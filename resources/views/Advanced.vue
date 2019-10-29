<template>
    <div>
        <div class="tile">
            <advanced-tile-box :label="$t('page.advanced.file_path')" :placeholder="$t('page.advanced.multi_path')"
                               :summary="$t('page.advanced.pre_cache_summary')" :title="$t('page.advanced.pre_cache')"
                               :func="func.ocf" :value.sync="path.pre_cache" @click="compileFile">
            </advanced-tile-box>
            <advanced-tile-box :label="$t('page.advanced.dir_path')" :placeholder="$t('page.advanced.multi_path')"
                               :summary="$t('page.advanced.invalidate_cache_dir_summary')" :func="func.oi"
                               :value.sync="path.invalidate" @click="invalidateDir"
                               :title="$t('page.advanced.invalidate_cache_dir')">
            </advanced-tile-box>
        </div>
        <div class="tile">
            <advanced-tile-box :label="$t('page.advanced.file_path')" :summary="$t('page.advanced.check_cache_summary')"
                               :func="func.oisc" @click="isScriptCached" :title="$t('page.advanced.check_cache')"
                               :value.sync="path.is_cached" class="is-6" id="is-cached">
            </advanced-tile-box>
        </div>
    </div>
</template>

<script>
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"
    import advancedTileBox from "../components/advanced-tile-box"

    export default {
        name: "Advanced",
        data: () => ({
            func: {
                ocf: "opcache_compile_file",
                oi: "opcache_invalidate",
                oisc: "opcache_is_script_cached"
            },
            path: {
                pre_cache: "",
                invalidate: "",
                is_cached: ""
            }
        }),
        components: {
            advancedTileBox
        },
        methods: {
            api(action, value, callback, refresh = true) {
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
                apiClient(action, value)
                    .then(data => {
                        if (typeof callback === "function") {
                            callback(data);
                        }
                        if (refresh === true) {
                            opcacheData.getStatus();
                        }
                    })
                    .catch(window.EMPTY_FUNC);
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
                this.api("isScriptCached", this.path.is_cached, data => {
                    let message = "";
                    if (data.hasOwnProperty("success") && data.success) {
                        message = this.$t("page.advanced.cached");
                    } else {
                        message = this.$t("page.advanced.uncached");
                    }
                    this.$buefy.toast.open({
                        container: "#is-cached",
                        message,
                        type: "is-info"
                    });
                }, false);
            }
        }
    }
</script>
