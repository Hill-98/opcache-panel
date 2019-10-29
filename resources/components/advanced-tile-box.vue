<template>
    <div class="tile is-parent" style="position: relative">
        <div class="tile is-child box">
            <p class="title is-5">{{ title }}</p>
            <form ref="form" @submit.prevent="formSubmit">
                <b-field :label="label">
                    <b-autocomplete :name="func" :placeholder="placeholder" v-model="currValue" :data="autocomplete"
                                    @keyup.enter.exact.native="$refs['submit'].$el.click()">
                        <template slot="header">
                            <a class="has-text-primary" @click="autocomplete = []" v-t="'page.advanced.clear_history'">
                            </a>
                        </template>
                        <template slot-scope="props">
                            <div class="is-flex level">
                                <span>{{ props.option }}</span>
                                <b-icon icon="times"
                                        @click.native.stop="autocomplete.splice(autocomplete.indexOf(props.option), 1)">
                                </b-icon>
                            </div>
                        </template>
                    </b-autocomplete>
                </b-field>
                <b-field class="has-text-right">
                    <b-button type="is-primary" native-type="submit" v-t="'page.advanced.submit'" ref="submit">
                    </b-button>
                </b-field>
            </form>
            <i18n path="page.advanced.use_function" tag="p">
                <a :href="funcLink" target="_blank"><code>{{ func }}</code></a>
            </i18n>
            <p>{{ summary }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "advanced-tile-box",
        data: () => ({
            currValue: "",
            autocomplete: []
        }),
        computed: {
            funcLink() {
                return `https://www.php.net/manual/function.${this.func.replace(/_/g, "-")}.php`;
            }
        },
        created() {
            const data = localStorage.getItem(`opp-autocomplete_${this.func}`);
            if (data) {
                this.autocomplete = Array.from(new Set(data.split(":")));
            }
            window.addEventListener("beforeunload", this.saveAutocomplete)
        },
        destroyed() {
            this.saveAutocomplete();
            window.removeEventListener("beforeunload", this.saveAutocomplete)
        },
        watch: {
            currValue(newValue) {
                this.$emit("update:value", newValue);
            },
            value(newValue) {
                this.currValue = newValue;
            }
        },
        methods: {
            formSubmit() {
                this.$emit("click");
                if (this.autocomplete.indexOf(this.currValue) === -1) {
                    this.autocomplete.unshift(this.currValue);
                }
            },
            saveAutocomplete() {
                localStorage.setItem(`opp-autocomplete_${this.func}`, this.autocomplete.join(":"))
            }
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
