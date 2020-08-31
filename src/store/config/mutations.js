const mutations = {
    authenticated(state) {
        state.authenticated = JSON.parse(localStorage.getItem('authenticated') || JSON.stringify(false));
    },
};

export default mutations;