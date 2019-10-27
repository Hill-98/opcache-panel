export default {
    api_client: {
        request: {
            error: "糟糕，请求出错了！"
        },
        response: {
            success: "操作成功！",
            not_success: "糟糕，操作没有成功！",
            error: {
                unknown: "遇到了未知错误",
                400: "请求参数似乎不正确",
                401: "你好像没有通过身份验证，可以尝试重新登录。",
                500: "服务器看起来出错了"
            }
        }
    },
    common: {
        refresh: "刷新",
    },
    navbar: {
        status: "状态",
        cache_files: "缓存文件",
        advanced: "高级",
        reset: "重置缓存",
        update: "实时更新",
        logout: "注销",
        language: "语言"
    },
    page: {
        status: {
            running_status: "Opcache 运行状态",
            config_info: "Opcache 配置信息",
            memory_usage: "内存使用情况",
            interned_strings: "保留字符串",
            opcache_statistics: "统计信息",
            current_wasted_percentage: "当前浪费内存百分比",
            free_memory: "可用内存",
            used_memory: "已用内存",
            wasted_memory: "浪费内存",
            buffer_size: "缓冲区大小",
            number_of_strings: "字符串数量",
            blacklist_miss_ratio: "黑名单未命中率",
            blacklist_misses: "黑名单未命中",
            hash_restarts: "Hash 重新启动",
            hits: "命中",
            last_restart_time: "上次重新启动时间",
            manual_restarts: "手动重新启动",
            max_cached_keys: "最大缓存密钥数",
            misses: "未命中",
            num_cached_keys: "缓存密钥数",
            num_cached_scripts: "缓存脚本数",
            oom_restarts: "OOM 重新启动",
            opcache_hit_rate: "命中率",
            start_time: "开始时间",
            blacklist: "黑名单",
            key: "键",
            value: "值",
            filepath: "文件路径"
        },
        cache_files: {
            script_num: "文件个数: {num}",
            ignore_vendor: "忽略 vendor 目录",
            invalidate_cache: "废除缓存",
            search_file: "搜索文件",
            file_path: "文件路径",
            hits: "命中率",
            last_used_time: "最后使用时间",
            memory_consumption: "内存消耗",
            timestamp: "修改时间",
            no_cache_files: "没有缓存文件"
        },
        advanced: {
            file_path: "文件路径",
            dir_path: "目录路径",
            multi_path: "多个路径用 | 分割",
            submit: "提交",
            pre_cache: "预缓存文件",
            pre_cache_summary: "将指定文件编译为字节码缓存，如果路径指向目录，则编译整个目录下的文件。",
            invalidate_cache_dir: "废除缓存 (目录)",
            invalidate_cache_dir_summary: "使指定目录下所有文件的缓存无效",
            check_cache: "检查文件缓存",
            check_cache_summary: "检查指定文件是否已被缓存",
            use_function: "此功能使用{0}函数",
            empty_path: "路径为空",
            not_multi_path: "此功能不支持多个路径",
            uncached: "未缓存",
            cached: "已缓存"
        }
    }
}
