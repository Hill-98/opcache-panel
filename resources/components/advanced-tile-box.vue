<template>
    <div class="tile is-parent" style="position: relative">
        <div class="tile is-child box">
            <p class="title is-5">{{ title }}</p>
            <b-field :label="label">
                <b-input v-model="currValue" :placeholder="placeholder"></b-input>
            </b-field>
            <div class="level-right">
                <b-button type="is-primary" v-t="'page.advanced.submit'" @click="$emit('click')"></b-button>
            </div>
            <i18n path="page.advanced.use_function" tag="p">
                <a :href="functionLink(func)" target="_blank"><code>{{ func }}</code></a>
            </i18n>
            <p>{{ summary }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "advanced-tile-box",
        data: () => ({
            currValue: ""
        }),
        watch: {
            currValue(newValue) {
                this.$emit("update:value", newValue);
            },
            value(newValue) {
                this.currValue = newValue;
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            functionLink(func) {
                return `https://www.php.net/manual/function.${func.replace(/_/g, "-")}.php`
            },
        },
        props: {
            func: String,
            label: String,
            placeholder: String,
            summary: String,
            title: String,
            value: String
        },
    }
</script>
