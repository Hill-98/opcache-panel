<template>
    <div>
        <template v-if="scriptsNum || searchValue">
            <!-- 缓存文件操作按钮 -->
            <div class="level">
                <div class="level-left">
                    <p v-t="{path: 'page.cache_files.script_num', args: {num: scriptsNum} }"></p>
                </div>
                <div class="level-right">
                    <b-field grouped>
                        <div class="control">
                            <b-checkbox-button v-model="ignoreVendor">
                                {{ $t("page.cache_files.exclude_vendor") }}
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
                                      @click="refreshData">
                                <b-icon icon="sync-alt"></b-icon>
                            </b-button>
                        </div>
                    </b-field>
                </div>
            </div>
            <!-- 缓存文件操作按钮 END -->
            <b-field :label="$t('page.cache_files.search_file')" label-position="on-border">
                <b-input v-model="searchInput"></b-input>
            </b-field>
            <!-- 缓存文件表格 -->
            <b-table :data="scripts" narrowed checkable sort-icon="sort" paginated :per-page="100"
                     :checked-rows.sync="checkedRows" custom-row-key="file">
                <template v-slot="props">
                    <b-table-column :label="$t('page.cache_files.file_path')" v-text="props.row.full_path">
                    </b-table-column>
                    <b-table-column field="hits" :label="$t('page.cache_files.hits')" sortable v-text="props.row.hits">
                    </b-table-column>
                    <b-table-column field="last_used_timestamp" :label="$t('page.cache_files.last_used_time')" sortable
                                    v-text="props.row.last_used_timestamp_string">
                    </b-table-column>
                    <b-table-column field="memory_consumption" :label="$t('page.cache_files.memory_consumption')"
                                    sortable v-text="props.row.memory_consumption_string">
                    </b-table-column>
                    <b-table-column field="timestamp" :label="$t('page.cache_files.timestamp')" sortable
                                    v-if="props.row.timestamp" v-text="props.row.timestamp_string">
                    </b-table-column>
                    <b-table-column>
                        <b-button size="is-small" icon-left="trash" type="is-danger"
                                  :title="$t('page.cache_files.invalidate_cache')"
                                  @click="invalidateCache(props.row)">
                        </b-button>
                    </b-table-column>
                </template>
            </b-table>
            <!-- 缓存文件表格 END -->
        </template>
        <template v-else>
            <p class="subtitle has-text-centered" v-t="'page.cache_files.no_cache_files'"></p>
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
            searchInput: "",
            searchValue: "",
            timer: null
        }),
        computed: {
            originalScripts() {
                return this.ignoreVendor ?
                    this.$store.state.scripts.filter(value => value.full_path.search(/([/\\])vendor[/\\]/) === -1) :
                    this.$store.state.scripts;
            },
            scripts() {
                return this.searchValue ?
                    this.originalScripts.filter(value => value.full_path.includes(this.searchValue)) :
                    this.originalScripts;
            },
            scriptsNum() {
                return this.originalScripts.length;
            }
        },
        watch: {
            scripts() {
                this.checkedRows = [];
            },
            searchInput(newValue) {
                if (newValue === this.searchValue) {
                    return;
                }
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => [this.searchValue, this.timer] = [newValue, null], 1000)
            }
        },
        methods: {
            async invalidateCache(value) {
                const items = [];
                if (!value) {
                    if (this.checkedRows.length === 0) {
                        return;
                    }
                    for (const item of this.checkedRows) {
                        items.push(item.file)
                    }
                } else {
                    items.push(value.file)
                }
                await apiClient("invalidate", items);
                await opcacheData.getStatus(false);
            },
            async refreshData() {
                await opcacheData.getStatus();
            }
        }
    }
</script>
