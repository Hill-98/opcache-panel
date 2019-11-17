<template>
    <div id="app">
        <opp-header></opp-header>
        <main>
            <router-view v-if="$store.state.isReady" :key="$route.name" class="container" style="padding-top: 1rem">
            </router-view>
        </main>
        <opp-footer></opp-footer>
    </div>
</template>

<script>
    import oppHeader from "./components/opp-header.vue"
    import oppFooter from "./components/opp-footer";
    import opcacheData from "./js/utils/opcacheData"

    export default {
        name: "app",
        components: {
            oppHeader,
            oppFooter
        },
        async mounted() {
            try {
                await opcacheData.getInfo();
            } catch {
                //
            }
        }
    }
</script>
