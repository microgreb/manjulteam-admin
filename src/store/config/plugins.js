
import createPersistedState from 'vuex-persistedstate'
import Cookies from "js-cookie";

const plugins = [
    createPersistedState({
        paths: ["auth"],
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) =>
                Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: key => Cookies.remove(key)
        }
    })
];

export default plugins;
