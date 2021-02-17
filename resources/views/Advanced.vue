<template>
    <div>
        <div class="tile is-ancestor">
            <advanced-tile-box v-model="path.pre_cache" :label="$t('page.advanced.dir_file_path')"
                               :summary="$t('page.advanced.pre_cache_summary')" :func="func.ocf"
                               :title="$t('page.advanced.pre_cache')"
                               :placeholder="$t('page.advanced.multi_path')"
                               @click="compileFile"/>
            <advanced-tile-box v-model="path.invalidate" :label="$t('page.advanced.dir_path')"
                               :summary="$t('page.advanced.invalidate_cache_dir_summary')" :func="func.oi"
                               :title="$t('page.advanced.invalidate_cache_dir')"
                               :placeholder="$t('page.advanced.multi_path')"
                               @click="invalidateDir"/>
        </div>
        <div class="tile is-ancestor">
            <advanced-tile-box id="is-cached" v-model="path.is_cached" class="is-6"
                               :label="$t('page.advanced.file_path')"
                               :summary="$t('page.advanced.check_cache_summary')" :func="func.oisc"
                               :title="$t('page.advanced.check_cache')"
                               @click="isScriptCached"/>
        </div>
    </div>
</template>

<script>
    import advancedTileBox from "@/components/advanced-tile-box.vue"
    import apiClient from "@/js/apiClient"
    import opcacheData from "@/js/opcacheData"

    export default {
        name: "Advanced",
        components: {
            advancedTileBox
        },
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
        methods: {
            async api(action, value, callback, refresh = true) {
                if (value.includes(":")) {
                    this.$buefy.toast.open({
                        message: this.$t("page.advanced.no_symbol"),
                        type: "is-warning"
                    });
                    return;
                }
                const path = value.includes("|") ? value.split("|") : value;
                let notEmpty = Array.isArray(path) ? path.some(v => Boolean(v)) : Boolean(path);
                if (!notEmpty) {
                    this.$buefy.toast.open({
                        message: this.$t("page.advanced.empty_path"),
                        type: "is-warning"
                    });
                    return;
                }
                try {
                    const data = await apiClient(action, path);
                    if (typeof callback === "function") {
                        callback(data);
                    }
                    if (refresh === true) {
                        await opcacheData.getStatus();
                    }
                } catch(e) {
                    this.errorHandler(e);
                }
            },
            compileFile() {
                this.api("compileFile", this.path.pre_cache);
            },
            invalidateDir() {
                this.api("invalidateDir", this.path.invalidate);
            },
            isScriptCached() {
                // 不允许多个路径
                if (this.path.is_cached.includes("|")) {
                    this.$buefy.toast.open({
                        message: this.$t("page.advanced.not_multi_path"),
                        type: "is-warning"
                    });
                    return;
                }
                this.api("isScriptCached", this.path.is_cached, data => {
                    const message = data.result === true ?
                        this.$t("page.advanced.cached") :
                        this.$t("page.advanced.uncached");
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
