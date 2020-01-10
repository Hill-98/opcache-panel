<template>
    <div class="tile is-parent">
        <div class="tile is-child box">
            <p class="title is-5" v-text="title"/>
            <b-progress type="is-info" :max="maxProgress" :value="progress" :show-value="show_value">
                {{ progressText }}
            </b-progress>
            <p v-for="(value, name) in data" :key="`${name}${value}`"
               v-text="`${$t(`page.status.${name}`)}: ${conversion(dataType[name], value)}`"/>
        </div>
    </div>
</template>

<script>
    import conversion from "@/js/utils/conversion"

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
            progressText: {
                type: String,
                default: ""
            },
            showValue: Boolean,
            title: String,
        },
        computed: {
            show_value() {
                return this.showValue || Boolean(this.progressText);
            }
        },
        methods: {
            conversion: (type, value) => type === null ? value : conversion[`${type}Conversion`](value),
        }
    }
</script>
