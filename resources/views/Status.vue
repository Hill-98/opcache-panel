<template>
    <div>
        <!-- 运行状态 -->
        <div>
            <!-- 运行状态标题以及标签-->
            <div class="level">
                <div class="level-left">
                    <p class="title" style="margin-bottom: 0" v-t="'page.status.running_status'"></p>
                    <!-- 运行状态标签-->
                    <b-field style="margin-left: 0.75rem; margin-top: 0.5rem" grouped>
                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">
                                    {{ version.opcache_product_name }}
                                </b-tag>
                                <b-tag type="is-info">
                                    {{ version.version }}
                                </b-tag>
                            </b-taglist>
                        </div>
                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">
                                    Enable
                                </b-tag>
                                <b-tag :type="opcache_enabled ? 'is-success' : 'is-warning'">
                                    {{ opcache_enabled ? 'True' : 'False' }}
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
            <div class="tile" style="margin-bottom: 0.75rem; margin-top: -0.75rem">
                <!-- 内存使用卡片 -->
                <status-tile-box :max-progress="opcache_memory_consumption" :progress="memory_usage.used_memory"
                                 :data="memory_usage" :data-type="format.memory_usage"
                                 :title="$t('page.status.memory_usage')">
                </status-tile-box>
                <!-- 内存使用卡片 END -->
                <!-- 统计信息卡片 -->
                <status-tile-box :progress="opcache_statistics.opcache_hit_rate" :data-type="format.opcache_statistics"
                                 :title="$t('page.status.opcache_statistics')" :data="opcache_statistics"
                                 :progress-text="$t('page.status.opcache_hit_rate')">
                </status-tile-box>
                <!-- 统计信息卡片 END -->
                <!-- 保留字符串卡片 -->
                <status-tile-box :max-progress="opcache_interned_strings_buffer" :data="interned_strings_usage"
                                 :progress="interned_strings_usage.used_memory" :data-type="format.interned_strings_usage"
                                 :title="$t('page.status.interned_strings')">
                </status-tile-box>
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
                <template v-slot="props">
                    <b-table-column field="key" :label="$t('page.status.key')">
                        <a :href="configLink(props.row.key)" target="_blank">
                            {{ props.row.key }}
                        </a>
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
                <template v-slot="props">
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
    import statusTileBox from "../components/status-tile-box.vue"
    import conversion from "../js/utils/conversion"
    import opcacheDataUtils from "../js/utils/opcacheData"

    export default {
        name: "Status",
        components: {
            statusTileBox
        },
        data: () => ({
            format: {
                memory_usage: {
                    current_wasted_percentage: conversion.TYPE.PERCENTAGE,
                    free_memory: conversion.TYPE.SIZE,
                    used_memory: conversion.TYPE.SIZE,
                    wasted_memory: conversion.TYPE.SIZE
                },
                interned_strings_usage: {
                    buffer_size: conversion.TYPE.SIZE,
                    free_memory: conversion.TYPE.SIZE,
                    number_of_strings: null,
                    used_memory: conversion.TYPE.SIZE,
                },
                opcache_statistics: {
                    blacklist_miss_ratio: conversion.TYPE.PERCENTAGE,
                    blacklist_misses: null,
                    hash_restarts: null,
                    hits: null,
                    last_restart_time: conversion.TYPE.TIME,
                    manual_restarts: null,
                    max_cached_keys: null,
                    misses: null,
                    num_cached_keys: null,
                    num_cached_scripts: null,
                    oom_restarts: null,
                    opcache_hit_rate: conversion.TYPE.PERCENTAGE,
                    start_time: conversion.TYPE.TIME
                }
            }
        }),
        computed: {
            blacklist() {
                const _blacklist = this.$store.state.configuration.blacklist;
                const blacklist = [];
                for (const file of _blacklist) {
                    blacklist.push({file})
                }
                return blacklist;
            },
            directives() {
                const _directives = this.$store.state.configuration.directives;
                const directives = [];
                for (const key of Object.keys(_directives)) {
                    directives.push({
                        key,
                        value: _directives[key]
                    })
                }
                return directives;
            },
            interned_strings_usage() {
                return this.$store.state.status.interned_strings_usage;
            },
            memory_usage() {
                return this.$store.state.status.memory_usage;
            },
            opcache_enabled() {
                return this.$store.state.status.opcache_enabled;
            },
            opcache_interned_strings_buffer() {
                return this.$store.state.configuration.directives["opcache.interned_strings_buffer"] * 1024 * 1024;
            },
            opcache_memory_consumption() {
                return this.$store.state.configuration.directives["opcache.memory_consumption"];
            },
            opcache_statistics() {
                return this.$store.state.status.opcache_statistics;
            },
            version() {
                return this.$store.state.configuration.version;
            }
        },
        methods: {
            configLink: value => `https://www.php.net/manual/opcache.configuration.php#ini.${value.replace(/_/g, '-')}`,
            async refreshData(name) {
                try {
                    await opcacheDataUtils[name]()
                } catch {
                    //
                }
            }
        }
    }
</script>
