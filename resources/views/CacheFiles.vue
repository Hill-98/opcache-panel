<template>
    <div v-if="$root.$data.opcacheData.status">
        <template v-if="scripts.length !==  0 || search_path !== ''">
            <!-- 缓存文件操作按钮 -->
            <div class="level">
                <div class="level-left">
                    <p v-t="{path: 'page.cache_files.script_num', args: {num: scriptsNum} }"></p>
                </div>
                <div class="level-right">
                    <b-field grouped>
                        <div class="control">
                            <b-button icon-left="trash" type="is-danger" :disabled="checkedRows.length === 0"
                                      @click="invalidateCache()">
                                {{ $t("page.cache_files.invalidate_cache") }}
                            </b-button>
                        </div>
                        <div class="control">
                            <b-button type="is-text" rounded :title="$t('common.refresh')"
                                      @click="refreshData('getStatus')">
                                <b-icon icon="sync-alt"></b-icon>
                            </b-button>
                        </div>
                    </b-field>
                </div>
            </div>
            <!-- 缓存文件操作按钮 END -->
            <b-field label="搜索文件" label-position="on-border">
                <b-input v-model="searchPath"></b-input>
            </b-field>
            <!-- 缓存文件表格 -->
            <b-table :data="scripts" narrowed checkable sort-icon="sort" default-sort="timestamp"
                     :checked-rows.sync="checkedRows" custom-row-key="file_path">
                <template slot-scope="props">
                    <b-table-column field="fullPath" :label="$t('page.cache_files.file_path')">
                        {{ props.row.full_path }}
                    </b-table-column>
                    <b-table-column field="hits" :label="$t('page.cache_files.hits')" sortable>
                        {{ props.row.hits }}
                    </b-table-column>
                    <b-table-column field="last_used_timestamp" :label="$t('page.cache_files.last_used_time')" sortable>
                        {{ conversion("timeConversion", props.row.last_used_timestamp) }}
                    </b-table-column>
                    <b-table-column field="memory_consumption" :label="$t('page.cache_files.memory_consumption')"
                                    sortable>
                        {{ conversion("sizeConversion", props.row.memory_consumption) }}
                    </b-table-column>
                    <b-table-column field="timestamp" :label="$t('page.cache_files.timestamp')" sortable>
                        {{ conversion("timeConversion", props.row.timestamp) }}
                    </b-table-column>
                    <b-table-column>
                        <b-button size="is-small" icon-left="trash" type="is-danger" @click="invalidateCache(props.row)"
                                  :title="$t('page.cache_files.invalidate_cache')">
                        </b-button>
                    </b-table-column>
                </template>
            </b-table>
            <!-- 缓存文件表格 END -->
        </template>
        <template v-else>
            <p class="subtitle" style="text-align: center" v-t="'page.cache_files.no_cache_files'"></p>
        </template>
    </div>
</template>

<script>
    import conversion from "../js/utils/conversion"
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "CacheFiles",
        data: () => ({
            checkedRows: [],
            searchPath: "",
            search_path: "",
            timer: null
        }),
        computed: {
            scripts() {
                if (typeof this.$root.$data.opcacheData.status !== "object" ||
                    typeof this.$root.$data.opcacheData.status.scripts !== "object" ||
                    Object.keys(this.$root.$data.opcacheData.status.scripts).length === 0) {
                    return [];
                }
                const _scripts = this.$root.$data.opcacheData.status.scripts;
                const scripts = [];
                for (const file of Object.keys(_scripts)) {
                    if (this.search_path !== "" && _scripts[file].full_path.indexOf(this.search_path) === -1) {
                        continue;
                    }
                    scripts.push({
                        file,
                        ..._scripts[file]
                    })
                }
                return scripts;
            },
            scriptsNum() {
                return Object.keys(this.$root.$data.opcacheData.status.scripts).length;
            }
        },
        watch: {
            scripts() {
                this.checkedRows = [];
            },
            searchPath(newValue) {
                if (newValue === this.search_path) {
                    return;
                }
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.search_path = newValue;
                    this.timer = null;
                }, 1000)
            }
        },
        methods: {
            conversion(name, value) {
                if (name !== null && conversion.hasOwnProperty(name) && typeof conversion[name] === "function") {
                    return conversion[name](value);
                }
                return value;
            },
            invalidateCache(value) {
                const items = [];
                if (value === undefined) {
                    if (this.checkedRows.length === 0) {
                        return;
                    }
                    for (const item of this.checkedRows) {
                        items.push(item.file)
                    }
                } else {
                    items.push(value.file)
                }
                apiClient("invalidate", items)
                    .then(() => {
                        opcacheData.getStatus(false);
                    })
                    .catch(window.EMPTY_FUNC)
            },
            refreshData(name) {
                if (opcacheData.hasOwnProperty(name) && typeof opcacheData[name] === "function") {
                    return opcacheData[name]();
                }
                return null;
            },
        }
    }
</script>
