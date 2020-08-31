<template>
    <div id="app">
        <header-index v-if="authenticated"></header-index>
        <transition name="el-fade-in-linear">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Sidebar from "./views/layout/sidebar/Sidebar";
    import HeaderIndex from "./views/layout/header/HeaderIndex";

    export default {
        components: {
            HeaderIndex,
            Sidebar
        },
        computed: {...mapState(['authenticated'])},
        beforeUpdate() {
            this.$store.commit('authenticated');
        },
        created() {
            if (!this.authenticated) {
                this.$router.push({name: 'login'});
            }
            this.$router.beforeEach((to, from, next) => {
                if (this.authenticated && (to.name == 'login' || from  == 'login')) {
                    this.$router.push({name: 'products'});
                }
                next()
            });
        },
    }
</script>
