export default {
    api_client: {
        request: {
            error: "Oops, Request wrong!"
        },
        response: {
            success: "Successful operation",
            not_success: "Oops, operation not successful!",
            error: {
                unknown: "We encountered an unknown error",
                400: "Request parameter appears to be incorrect",
                401: "You do not seem authenticated, you can try to log in again.",
                500: "Server looks wrong"
            }
        }
    },
    common: {
        refresh: "Refresh",
    },
    navbar: {
        status: "Status",
        cache_files: "Cache Files",
        advanced: "Advanced",
        reset: "Reset Cache",
        update: "RealTime Update",
        language: "Language"
    },
    page: {
        status: {
            running_status: "Opcache Running Status",
            config_info: "Opcache Configuration Info",
            memory_usage: "Memory Usage",
            interned_strings: "Interned Strings",
            opcache_statistics: "Statistics",
            current_wasted_percentage: "Current Wasted Percentage",
            free_memory: "Free Memory",
            used_memory: "Used Memory",
            wasted_memory: "Wasted Memory",
            buffer_size: "Buffer Size",
            number_of_strings: "Number Of Strings",
            blacklist_miss_ratio: "Blacklist miss ratio",
            blacklist_misses: "Blacklist misses",
            hash_restarts: "Hash Restarts",
            hits: "Hits",
            last_restart_time: "Last Restart Time",
            manual_restarts: "Manual Restarts",
            max_cached_keys: "Max Cached Keys",
            misses: "Misses",
            num_cached_keys: "Number Of Cached Keys",
            num_cached_scripts: "Number Of Cached Scripts",
            oom_restarts: "OOM Restarts",
            opcache_hit_rate: "Hit rate",
            start_time: "Start Time",
            blacklist: "Blacklist",
            key: "Key",
            value: "Value",
            filepath: "File Path",
        },
        cache_files: {
            invalidate_cache: "Invalidate Cache",
            file_path: "File Path",
            hits: "Hits",
            last_used_time: "Last Used Time",
            memory_consumption: "Memory Consumption",
            timestamp: "Modify Time",
            no_cache_files: "No Cache Files"
        },
        advanced: {
            script_num: "Number Of Files: {num}",
            file_path: "File Path",
            dir_path: "Directory Path",
            multi_path: "Multiple paths | split",
            submit: "Submit",
            pre_cache: "Pre-cache Files",
            pre_cache_summary: "The specified file is compiled into byte code cache, if the path to the directory, the file in directory is compiled.",
            invalidate_cache_dir: "Invalidate Cache (Directory)",
            invalidate_cache_dir_summary: "Invalidates the cache of all files in the specified directory",
            check_cache: "Check File Cached",
            check_cache_summary: "Check that the specified file has been cached",
            use_function: "This feature uses the function opcache_invalidate {func}",
            empty_path: "Path is empty",
            not_multi_path: "This feature does not support multiple paths",
            uncached: "Uncached",
            cached: "Cached"
        }
    }
}
