<template>
    <div class="tile is-parent">
        <div class="tile is-child box">
            <p class="title is-5">{{ title }}</p>
            <b-progress type="is-info" :max="max_progress" :value="progress" :show-value="show_value">
                <span v-if="progressText !== undefined">{{ progressText }}</span>
            </b-progress>
            <p v-for="(value, name) in data"
               :key="`${name}${value}`">
                {{ `${$t(`page.status.${name}`)}:
                ${conversion(dataType[name], value)}` }}
            </p>
        </div>
    </div>
</template>

<script>
    import conversion from "../js/utils/conversion"

    export default {
        name: "status-tile-box",
        computed: {
            max_progress() {
                return this.maxProgress ? this.maxProgress : 100
            },
            show_value() {
                return this.showValue || this.progressText !== undefined;
            }
        },
        props: {
            data: Object,
            dataType: Object,
            maxProgress: Number,
            progress: Number,
            progressText: String,
            showValue: Boolean,
            title: String,
        },
        methods: {
            conversion(name, value) {
                if (name !== null) {
                    return conversion[`${name}Conversion`](value);
                }
                return value;
            }
        }
    }
</script>
