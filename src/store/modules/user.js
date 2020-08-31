import ApiSettings from './../../api/ApiSettings'
import axios from 'axios'

export default {
    state: {
        user: null,
    },
    getters: {
        authUser(state) {
            return state.user
        },
        userRole(state) {
            return (state.user) ? state.user.role.name : null
        },
        isAuthenticated(state) {
            return (state.user) ? !!state.user.access_token : false
        },
        accessToken(state) {
            return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiMjMyYTc3NGZjMjMyMzc2YWEzYTU3MjZlMTI2ZDcwZmJmNGJjMTQwNjVmZDlmNmQ1ZGY4OGU3MmZiZjQ4YTIzNjBiN2RjMDg4MGIxMzQwIn0.eyJhdWQiOiIyIiwianRpIjoiN2IyMzJhNzc0ZmMyMzIzNzZhYTNhNTcyNmUxMjZkNzBmYmY0YmMxNDA2NWZkOWY2ZDVkZjg4ZTcyZmJmNDhhMjM2MGI3ZGMwODgwYjEzNDAiLCJpYXQiOjE1NzQyMTk3OTIsIm5iZiI6MTU3NDIxOTc5MiwiZXhwIjoxNTc1NTE1NzkyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.aMUzqcK1_XKzD-xID_AHtfeZv6flxlnT-ioPnuh7n3OeXcB-ILYRVi4YuxHF3uhKm8dUWJsI3nKYhdfiuGjAAxRfwosk1fnJgirGm7kGqIUlw641Oejke0S6fd3aO1u6Gs6JvebxKBfHWToXY-fz_9MCbwcG4ITHLioIEg0su54vPRN0sYBNZkSCq-eB0KXINZs-jdgpNBq3TNBXikPvLZSlcKQKMS72ZaEJ39hgAia4UMU01etcFPN2pvdT7Mi8SC4UCSFVXTQJMH25CTZGWJlH0c9VpAllD9UmhV7O7HeiKPqM91TwzxljP7dOnwesEhDMNjtXybQfYL_meCGEtgARXu4_kKY5CJD7eG24ZEoMN5wCZe79_RL5ItkEEZUq6AvOUuYUufAch22nsOEEy1cEosEqGzasQRk0aicr4tmmiK_DFElsoxtVLWM4wOGVLhdlu6u1DOj8Wb3hbrsfCRqGTEmlx-Y9pW0DgOjRWa7pfWahvXDYXDKOxMFmK7QwczwA7-UckMBQPnJehd53BY9qtH9DLM3_SDIxMMV_2JV5RqXSoxCpo_EZBkFba8v5q0C7bwnr6ofkLjY0KDgUUWbC493RjkOUdN6YD5rciQOVYe1QUk27FSUkAKpRLfcJ4T0S02lOy7Q0dtHTJeOsIEKCqv2NRoJXhaxM-CrqLnQ';
            return (state.user) ? state.user.access_token : null
        },
    },
    mutations: {
        setUser(state, payload) {
            console.log('setUser Mutation');
            state.userAccessToken = Object.assign({}, {token: payload.access_token})
            ApiSettings.updateAccessToken(payload.access_token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload.access_token}`
            state.user = Object.assign({}, payload)
        },
        setUserDetails(state, payload) {
            console.log('setUserDetails Mutation');
            state.user = Object.assign({}, payload)
        },
        logout(state) {
            state.user = null;
        },
    },
    actions: {
        onUserLogin(context, data) {
            context.commit('setUser', data)
        },
        onUserLogout(context) {
            context.commit('logout')
        },
        setUserDetails(context, data) {
            context.commit('setUserDetails', data)
        },
        setUserLocale(context, data) {
            context.commit('setLocale', data)
        }
    }
}
