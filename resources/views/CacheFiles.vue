<template>
    <div>
        <template v-if="scripts.length !==  0 || search_path !== ''">
            <!-- 缓存文件操作按钮 -->
            <div class="level">
                <div class="level-left">
                    <p v-t="{path: 'page.cache_files.script_num', args: {num: scriptsNum} }"></p>
                </div>
                <div class="level-right">
                    <b-field grouped>
                        <div class="control">
                            <b-checkbox-button v-model="ignoreVendor">
                                {{ $t("page.cache_files.ignore_vendor") }}
                            </b-checkbox-button>
                        </div>
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
            <b-field :label="$t('page.cache_files.search_file')" label-position="on-border">
                <b-input v-model="searchPath"></b-input>
            </b-field>
            <!-- 缓存文件表格 -->
            <b-table :data="scripts" narrowed checkable sort-icon="sort" paginated :per-page="100"
                     :checked-rows.sync="checkedRows" custom-row-key="file">
                <template slot-scope="props">
                    <b-table-column :label="$t('page.cache_files.file_path')">
                        {{ props.row.full_path }}
                    </b-table-column>
                    <b-table-column field="hits" :label="$t('page.cache_files.hits')" sortable>
                        {{ props.row.hits }}
                    </b-table-column>
                    <b-table-column field="last_used_timestamp" :label="$t('page.cache_files.last_used_time')" sortable>
                        {{ props.row.last_used_timestamp_string }}
                    </b-table-column>
                    <b-table-column field="memory_consumption" :label="$t('page.cache_files.memory_consumption')" sortable>
                        {{ props.row.memory_consumption_string }}
                    </b-table-column>
                    <b-table-column field="timestamp" :label="$t('page.cache_files.timestamp')" sortable
                                    v-if="props.row.timestamp">
                        {{ props.row.timestamp_string }}
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
    import apiClient from "../js/apiClient"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "CacheFiles",
        data: () => ({
            checkedRows: [],
            ignoreVendor: false,
            searchPath: "",
            search_path: "",
            timer: null
        }),
        computed: {
            _scripts() {
                if (this.ignoreVendor) {
                    return this.$store.state.scripts.filter(value => {
                        return value.full_path.search(/([/\\])vendor([/\\])/) === -1
                    });
                }
                return this.$store.state.scripts;
            },
            scripts() {
                if (this.search_path === "") {
                    return this._scripts
                } else {
                    return this._scripts.filter(value => {
                        return value.full_path.indexOf(this.search_path) !== -1
                    });
                }
            },
            scriptsNum() {
                return this._scripts.length;
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
                return opcacheData[name]();
            },
        }
    }
</script>
