<template>
    <div>
        <template v-if="scriptsNum || searchValue">
            <!-- 缓存文件操作按钮 -->
            <div class="level">
                <div class="level-left">
                    <p v-t="{ path: 'page.cache_files.script_num', args: { num: scriptsNum } }"/>
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
                                <b-icon icon="sync-alt"/>
                            </b-button>
                        </div>
                    </b-field>
                </div>
            </div>
            <!-- 缓存文件操作按钮 END -->
            <b-field :label="$t('page.cache_files.search_file')" label-position="on-border">
                <b-input v-model="searchInput"/>
            </b-field>
            <!-- 缓存文件表格 -->
            <b-table :data="scripts" narrowed checkable sort-icon="sort" paginated :per-page="100"
                     :checked-rows.sync="checkedRows" custom-row-key="file" :loading="!isShow"
                     @page-change="pageChange">
                <b-table-column
                    :label="$t('page.cache_files.file_path')"
                    v-slot="{ row }"
                >
                    <span v-text="row.full_path"/>
                </b-table-column>
                <b-table-column
                    field="hits"
                    :label="$t('page.cache_files.hits')"
                    sortable
                    v-slot="{ row }"
                >
                    <span v-text="row.hits"/>
                </b-table-column>
                <b-table-column
                    field="last_used_timestamp"
                    :label="$t('page.cache_files.last_used_time')"
                    sortable
                    v-slot="{ row }"
                >
                    <span v-text="row.last_used_timestamp_string"/>
                </b-table-column>
                <b-table-column
                    field="memory_consumption"
                    :label="$t('page.cache_files.memory_consumption')"
                    sortable
                    v-slot="{ row }"
                >
                    <span v-text="row.memory_consumption_string"/>
                </b-table-column>
                <b-table-column
                    field="timestamp"
                    :label="$t('page.cache_files.timestamp')"
                    sortable
                    v-slot="{ row }"
                >
                    <span v-text="row.timestamp ? row.timestamp_string : 'Null'"/>
                </b-table-column>
                <b-table-column
                    custom-key="invalidate-cache"
                    v-slot="{ row }"
                >
                    <b-button size="is-small" icon-left="trash" type="is-danger"
                              :title="$t('page.cache_files.invalidate_cache')"
                              @click="invalidateCache(row)"/>
                </b-table-column>
            </b-table>
            <!-- 缓存文件表格 END -->
        </template>
        <template v-else>
            <p class="subtitle has-text-centered" v-t="'page.cache_files.no_cache_files'"/>
        </template>
    </div>
</template>

<script>
    import apiClient from "@/js/apiClient";
    import opcacheData from "@/js/opcacheData";

    export default {
        name: "CacheFiles",
        data: () => ({
            checkedRows: [],
            ignoreVendor: false,
            isShow: false,
            searchInput: "",
            searchValue: "",
            timer: null,
        }),
        computed: {
            originalScripts() {
                /** @type {array} */
                const scripts = this.$store.state.scripts;
                return this.ignoreVendor ?
                    scripts.filter(value => value.full_path.search(/([/\\])vendor[/\\]/) === -1) :
                    scripts;
            },
            scripts() {
                if (!this.isShow) return [];
                return this.searchValue ?
                    this.originalScripts.filter(value => value.full_path.includes(this.searchValue)) :
                    this.originalScripts;
            },
            scriptsNum() {
                return this.originalScripts.length;
            },
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
            },
        },
        created() {
            // setTimeout: 使页面可以在假死之前显示
            setTimeout(() => this.isShow = true);
        },
        methods: {
            async invalidateCache(value) {
                const items = [];
                if (!value) {
                    if (this.checkedRows.length === 0) {
                        return;
                    }
                    this.checkedRows.forEach(item => items.push(item.file));
                } else {
                    items.push(value.file)
                }
                await apiClient("invalidate", items);
                await opcacheData.getStatus(false);
            },
            async refreshData() {
                await opcacheData.getStatus();
            },
            pageChange() {
                // setTimeout: 使 IE 达到预期行为
                setTimeout(() => scrollTo(0, 0));
            },
        },
    };
</script>
