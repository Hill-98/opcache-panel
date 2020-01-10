<template>
    <div id="app">
        <opp-header/>
        <main>
            <router-view v-if="$store.state.isReady" :key="$route.name" class="container" style="padding-top: 1rem"/>
        </main>
        <opp-footer/>
    </div>
</template>

<script>
    import oppHeader from "@/components/opp-header.vue"
    import oppFooter from "@/components/opp-footer.vue"
    import opcacheData from "@/js/opcacheData"

    export default {
        name: "app",
        components: {
            oppHeader,
            oppFooter
        },
        async created() {
            await opcacheData.getInfo();
        }
    }
</script>
