import axios from 'axios'
import store from '../store/store'
import env from '../../env'
import {EventBus} from "../bootstrap/EventBus";
import router from '../router/router'

export default {
    coreUrl: env.API_URL,
    apiUrl: env.API_URL + '/api/back-store/',
    headersDefaults: {
        content: {
            // 'Content-Type': 'application/json',
        },
        accept: {
            Accept: 'application/json'
        }
    },

    /**
     * Http Default
     */
    http: axios.create({}),

    /**
     * Get Api App route
     *
     * @param additional
     * @returns {string}
     */
    apiRoute: function (additional) {
        return this.apiUrl + additional
    },

    /**
     * Getting api token by client id & secret
     *
     * @param params
     * @param successStatusCallback
     */
    refreshToken: function(params, successStatusCallback) {
        this.post(
                'token',
                params
            )
            .then((response) => {
                if (response.data.token && response.data.token_type) {
                    localStorage.setItem('authenticated', true);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('token_type', response.data.token_type);
                }
                if (typeof successStatusCallback === 'function') {
                    successStatusCallback(response);
                }
            })
            .catch((e) => {
                switch (e.response.status) {
                    //on unsuccessfull - redirect login
                    case 401:
                        localStorage.setItem('authenticated', false);
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_type');
                        // router.push({name: 'login'});
                        break;
                }
            });
    },

    /**
     * @deprecated
     * Fetch Api Token from store
     */
    //todo check usage
    updateAccessToken: function () {
        // this.http.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.accessToken;
    },

    /**
     * @param route
     * @param params
     * @returns {Promise<any>}
     */
    get: function (route, params) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            store.dispatch('stopGlobalLoading');
            that.http.get(
                that.apiRoute(route),
                {
                    params: params,
                    headers: Object.assign(
                        {}, that.getAuthHeader(),
                        that.headersDefaults.content,
                        that.headersDefaults.accept
                    )
                })
                .then(res => {
                    resolve(res);
                }).catch(e => {
                    store.dispatch('stopGlobalLoading');
                    console.log('Api Get Request error');
                    console.log(e);
                    if (e.response) {
                        switch (e.response.status) {
                            //on unsuccessfull - redirect login
                            case 401:
                                localStorage.setItem('authenticated', false);
                                router.push({name: 'login'});
                                break;
                            default:
                                reject(e);
                        }
                    }
                })
        });
    },


    post: function (route, data) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            store.dispatch('stopGlobalLoading');
            that.http.post(
                that.apiRoute(route),
                data,
                {
                    headers: Object.assign(
                        {}, that.getAuthHeader(),
                        that.headersDefaults.content,
                        that.headersDefaults.accept
                    )
                })
                .then(res => {
                    EventBus.$emit(route + '-created', res.data);

                    resolve(res);
                }).catch(e => {
                    store.dispatch('stopGlobalLoading');
                    console.log('Api POST Request error');
                    console.log(e);
                    if (e.response) {
                        switch (e.response.status) {
                            //on unsuccessfull - redirect login
                            case 401:
                                localStorage.setItem('authenticated', false);
                                router.push({name: 'login'});
                                break;
                            default:
                                reject(e);
                        }
                    }
                })
        });
    },

    patch: function (route, data) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            store.dispatch('stopGlobalLoading');
            that.http.patch(
                that.apiRoute(route),
                data,
                {
                    headers: Object.assign(
                        {}, that.getAuthHeader(),
                        that.headersDefaults.content,
                        that.headersDefaults.accept
                    )
                }).then(res => {
                    resolve(res);
                }).catch(e => {
                    store.dispatch('stopGlobalLoading');
                    console.log('Api PATCH Request error');
                    console.log(e);
                    reject(e);
                })
        });
    },


    delete: function (route) {

        store.dispatch('startGlobalLoading');

        let that = this;

        return new Promise(function (resolve, reject) {
            store.dispatch('stopGlobalLoading');

            that.http.delete(
                that.apiRoute(route),
                {
                    headers: Object.assign(
                        {}, that.getAuthHeader(),
                        that.headersDefaults.content,
                        that.headersDefaults.accept
                    )
                })
                .then(res => {
                    resolve(res);
                }).catch(e => {
                    store.dispatch('stopGlobalLoading');
                    console.log('Api Delete Request error');
                    console.log(e);
                    if (e.response) {
                        switch (e.response.status) {
                            //on unsuccessfull - redirect login
                            case 401:
                                localStorage.setItem('authenticated', false);
                                router.push({name: 'login'});
                                break;
                            default:
                                reject(e);
                        }
                    }
                })
        });
    },

    getAuthHeader: function () {
        let token = localStorage.getItem('token') || '';
        if (!token.length) {
            return {};
        }

        let type = localStorage.getItem('token_type') || '';
        return {
            Authorization: [type, token].join(' ').trim()
        };
    }
}
