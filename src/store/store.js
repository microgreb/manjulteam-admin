import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./config/modules";
import state from "./config/state";
import getters from "./config/getters";
import mutations from "./config/mutations";
import plugins from "./config/plugins";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules,
    state,
    getters,
    mutations,
    plugins,
});

export default store
