<template>
    <div class="tile is-parent" style="position: relative">
        <div class="tile is-child box">
            <p class="title is-5">{{ title }}</p>
            <form ref="form" @submit="formSubmit">
                <b-field :label="label">
                    <b-input v-model="currValue" :placeholder="placeholder" :name="func"></b-input>
                </b-field>
                <b-field class="has-text-right">
                    <b-button tag="input" type="is-primary" native-type="submit" :value="$t('page.advanced.submit')">
                    </b-button>
                </b-field>
            </form>
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
        methods: {
            formSubmit(e) {
                this.$emit("click");
                e.preventDefault();
            },
            functionLink(func) {
                return `https://www.php.net/manual/function.${func.replace(/_/g, "-")}.php`;
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
