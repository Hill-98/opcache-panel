<template>
    <div class="tile is-parent">
        <div class="tile is-child box">
            <p class="title is-5">{{ title }}</p>
            <b-progress type="is-info" :max="maxProgress" :value="progress" :show-value="show_value">
                <span v-if="progressText !== undefined">{{ progressText }}</span>
            </b-progress>
            <p v-for="(value, name) in data" :key="`${name}${value}`">
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
        props: {
            data: Object,
            dataType: Object,
            maxProgress: {
                type: Number,
                default: 100
            },
            progress: Number,
            progressText: String,
            showValue: Boolean,
            title: String,
        },
        computed: {
            show_value() {
                return this.showValue || this.progressText !== undefined;
            }
        },
        methods: {
            conversion(name, value) {
                return name === null ? value : conversion[`${name}Conversion`](value);
            }
        }
    }
</script>
