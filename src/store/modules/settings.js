export default {
    state: {
        loading: false,
    },
    getters: {
        isProcessingRequest(state) {
            return state.loading
        },
    },
    mutations: {
        startGlobalLoading(state) {
            state.loading = true;
        },
        stopGlobalLoading(state) {
            state.loading = false;
        }
    },
    actions: {
        startGlobalLoading(context) {
            context.commit('startGlobalLoading')
        },
        stopGlobalLoading(context) {
            context.commit('stopGlobalLoading')
        },
    }
}
