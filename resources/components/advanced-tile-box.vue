<template>
    <div class="tile is-parent" style="position: relative">
        <div class="tile is-child box">
            <p class="title is-5" v-text="title"/>
            <form>
                <b-field :label="label" :label-for="func">
                    <b-autocomplete v-model="currValue" :id="func" :name="func" :placeholder="placeholder" :data="autocomplete"
                                    @keyup.enter.exact.native="formSubmit">
                        <template #header>
                            <a class="has-text-primary" @click="autocomplete = []" v-t="'page.advanced.clear_history'"/>
                        </template>
                        <template v-slot="{ option }">
                            <div class="is-flex level">
                                <span v-text="option"/>
                                <b-icon icon="times"
                                        @click.native.stop="autocomplete.splice(autocomplete.indexOf(option), 1)"/>
                            </div>
                        </template>
                    </b-autocomplete>
                </b-field>
                <div class="has-text-right">
                    <b-button type="is-primary" @click="formSubmit" v-t="'page.advanced.submit'"/>
                </div>
            </form>
            <i18n path="page.advanced.use_function" tag="p">
                <a :href="funcLink" target="_blank"><code v-text="func"/></a>
            </i18n>
            <p v-text="summary"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "advanced-tile-box",
        props: {
            func: String,
            label: String,
            placeholder: String,
            summary: String,
            title: String,
            value: String,
        },
        data: () => ({
            currValue: "",
            autocomplete: [],
        }),
        computed: {
            funcLink() {
                return `https://www.php.net/manual/function.${this.func.replace(/_/g, "-")}.php`;
            },
        },
        watch: {
            currValue(newValue) {
                this.$emit("input", newValue)
            },
            value(newValue) {
                this.currValue = newValue;
            },
        },
        created() {
            const data = localStorage.getItem(`opp-autocomplete_${this.func}`);
            if (data) {
                this.autocomplete = Array.from(new Set(data.split(":")));
            }
            window.addEventListener("beforeunload", this.saveAutocomplete);
        },
        destroyed() {
            window.removeEventListener("beforeunload", this.saveAutocomplete);
            this.saveAutocomplete();
        },
        methods: {
            formSubmit() {
                this.$emit("click");
                if (!this.autocomplete.includes(this.currValue)) {
                    this.autocomplete.unshift(this.currValue);
                }
            },
            saveAutocomplete() {
                localStorage.setItem(`opp-autocomplete_${this.func}`, this.autocomplete.join(":"));
            },
        },
    };
</script>
