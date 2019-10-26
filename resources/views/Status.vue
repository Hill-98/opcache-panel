<template>
    <div v-if="$root.$data.opcacheData.configuration">
        <!-- 运行状态 -->
        <div>
            <!-- 运行状态标题以及标签-->
            <div class="level">
                <div class="level-left">
                    <p class="title" style="margin-bottom: 0" v-t="'page.status.running_status'"></p>
                    <!-- 运行状态标签-->
                    <b-field style="margin-left: 0.75rem" grouped>
                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">
                                    {{ $root.$data.opcacheData.configuration.version.opcache_product_name }}
                                </b-tag>
                                <b-tag type="is-info">
                                    {{ $root.$data.opcacheData.configuration.version.version }}
                                </b-tag>
                            </b-taglist>
                        </div>
                        <div class="control">
                            <b-taglist attached v-if="$root.$data.opcacheData.status">
                                <b-tag type="is-dark">
                                    Enable
                                </b-tag>
                                <b-tag type="is-success" v-if="$root.$data.opcacheData.status.opcache_enabled">
                                    True
                                </b-tag>
                                <b-tag type="is-warning" v-else>
                                    False
                                </b-tag>
                            </b-taglist>
                        </div>
                    </b-field>
                    <!-- 运行状态标签 END-->
                </div>
                <!-- 运行状态标题以及标签 END-->
                <!-- 运行状态刷新按钮 -->
                <div class="level-right">
                    <b-button type="is-text" rounded :title="$t('common.refresh')" @click="refreshData('getStatus')">
                        <b-icon icon="sync-alt"></b-icon>
                    </b-button>
                </div>
                <!-- 运行状态刷新按钮 END -->
            </div>
            <!-- 运行状态卡片组 -->
            <div class="tile" style="margin-bottom: 0.75rem; margin-top: -0.75rem"
                 v-if="$root.$data.opcacheData.status">
                <!-- 内存使用卡片 -->
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title is-5" v-t="'page.status.memory_usage'"></p>
                        <b-progress type="is-info"
                                    :max="$root.$data.opcacheData.configuration.directives['opcache.memory_consumption']"
                                    :value="$root.$data.opcacheData.status.memory_usage.used_memory">
                        </b-progress>
                        <p v-for="(value, name) in $root.$data.opcacheData.status.memory_usage"
                           :key="`${name}${value}`">
                            {{ `${$t(`page.status.${name}`)}:
                            ${conversion(memory_usage[name], value)}` }}
                        </p>
                    </div>
                </div>
                <!-- 内存使用卡片 END -->
                <!-- 统计信息卡片 -->
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title is-5" v-t="'page.status.opcache_statistics'"></p>
                        <b-progress type="is-info" show-value
                                    :value="$root.$data.opcacheData.status.opcache_statistics.opcache_hit_rate">
                            {{ $t("page.status.opcache_hit_rate") }}
                        </b-progress>
                        <p v-for="(value, name) in $root.$data.opcacheData.status.opcache_statistics"
                           :key="`${name}${value}`">
                            {{ `${$t(`page.status.${name}`)}:
                            ${conversion(opcache_statistics[name], value)}` }}
                        </p>
                    </div>
                </div>
                <!-- 统计信息卡片 END -->
                <!-- 保留字符串卡片 -->
                <div class="tile is-parent">
                    <div class="tile is-child box">
                        <p class="title is-5" v-t="'page.status.interned_strings'"></p>
                        <b-progress type="is-info"
                                    :max="$root.$data.opcacheData.configuration.directives['opcache.interned_strings_buffer'] * 1024 * 1024"
                                    :value="$root.$data.opcacheData.status.interned_strings_usage.used_memory">
                        </b-progress>
                        <p v-for="(value, name) in $root.$data.opcacheData.status.interned_strings_usage"
                           :key="`${name}${value}`">
                            {{ `${$t(`page.status.${name}`)}:
                            ${conversion(interned_strings_usage[name], value)}` }}
                        </p>
                    </div>
                </div>
                <!-- 保留字符串卡片 END -->
            </div>
            <!-- 运行状态卡片组 END -->
        </div>
        <!-- 运行状态 END -->
        <!-- 配置信息 -->
        <div>
            <!-- 配置信息标题 -->
            <div class="level">
                <div class="level-left">
                    <h1 class="title" v-t="'page.status.config_info'"></h1>
                </div>
                <div class="level-right">
                    <b-button type="is-text" rounded :title="$t('common.refresh')"
                              @click="refreshData('getConfiguration')">
                        <b-icon icon="sync-alt"></b-icon>
                    </b-button>
                </div>
            </div>
            <!-- 配置信息标题 END -->
            <!-- 配置信息表格 -->
            <b-table :data="directives" narrowed>
                <template slot-scope="props">
                    <b-table-column field="key" :label="$t('page.status.key')">
                        <a :href="`https://www.php.net/manual/opcache.configuration.php#ini.${props.row.key.replace(/_/, '-')}`"
                            target="_blank">
                            {{ props.row.key }}</a>
                    </b-table-column>
                    <b-table-column field="value" :label="$t('page.status.value')">
                        {{ props.row.value }}
                    </b-table-column>
                </template>
            </b-table>
            <!-- 配置信息表格 END -->
        </div>
        <!-- 配置信息 END -->
        <!-- 黑名单 -->
        <div style="margin-top: 1rem" v-if="blacklist.length !== 0">
            <!-- 黑名单标题 -->
            <div class="level">
                <div class="level-left">
                    <h1 class="title" v-t="'page.status.blacklist'"></h1>
                </div>
                <div class="level-right">
                    <b-button type="is-text" rounded :title="$t('common.refresh')"
                              @click="refreshData('getConfiguration')">
                        <b-icon icon="sync-alt"></b-icon>
                    </b-button>
                </div>
            </div>
            <!-- 黑名单标题 END -->
            <!-- 黑名单表格 -->
            <b-table :data="blacklist" narrowed>
                <template slot-scope="props">
                    <b-table-column field="file" :label="$t('page.status.filepath')">
                        {{ props.row.file }}
                    </b-table-column>
                </template>
            </b-table>
            <!-- 黑名单表格 END -->
        </div>
        <!-- 黑名单 END -->
    </div>
</template>

<script>
    import conversion from "../js/utils/conversion"
    import opcacheData from "../js/utils/opcacheData"

    export default {
        name: "Status",
        data: () => ({
            memory_usage: {
                current_wasted_percentage: "percentageConversion",
                free_memory: "sizeConversion",
                used_memory: "sizeConversion",
                wasted_memory: "sizeConversion"
            },
            interned_strings_usage: {
                buffer_size: "sizeConversion",
                free_memory: "sizeConversion",
                number_of_strings: null,
                used_memory: "sizeConversion",
            },
            opcache_statistics: {
                blacklist_miss_ratio: "percentageConversion",
                blacklist_misses: null,
                hash_restarts: null,
                hits: null,
                last_restart_time: "timeConversion",
                manual_restarts: null,
                max_cached_keys: null,
                misses: null,
                num_cached_keys: null,
                num_cached_scripts: null,
                oom_restarts: null,
                opcache_hit_rate: "percentageConversion",
                start_time: "timeConversion"
            }
        }),
        computed: {
            directives() {
                if (typeof this.$root.$data.opcacheData.configuration !== "object" ||
                    typeof this.$root.$data.opcacheData.configuration.directives !== "object") {
                    return [];
                }
                const directives = this.$root.$data.opcacheData.configuration.directives;
                const _directives = [];
                for (const key of Object.keys(directives)) {
                    _directives.push({
                        key,
                        value: directives[key]
                    })
                }
                return _directives;
            },
            blacklist() {
                if (typeof this.$root.$data.opcacheData.configuration !== "object" ||
                    typeof this.$root.$data.opcacheData.configuration.blacklist !== "object" ||
                    this.$root.$data.opcacheData.configuration.blacklist.length === 0) {
                    return [];
                }
                const blacklist = this.$root.$data.opcacheData.configuration.blacklist;
                const _blacklist = [];
                for (const file of blacklist) {
                    _blacklist.push({file})
                }
                return _blacklist;
            }
        },
        methods: {
            conversion(name, value) {
                if (name !== null && conversion.hasOwnProperty(name) && typeof conversion[name] === "function") {
                    return conversion[name](value);
                }
                return value;
            },
            refreshData(name) {
                if (opcacheData.hasOwnProperty(name) && typeof opcacheData[name] === "function") {
                    return opcacheData[name]();
                }
                return null;
            }
        }
    }
</script>
