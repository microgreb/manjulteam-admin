<template>
    <section class="auth-login text-center">
        <form @submit.prevent="login">
            <el-row class="h144"></el-row>
            <el-row class="h56 t42">
                Manjulteam
            </el-row>
            <el-row class="h56"></el-row>

            <el-row class="h56 text-center">
                <el-input class="w620 h42 t22" :class="{'animated shake fast': shake}" min-length="5" required placeholder="Введите email" size="100%" type="email" v-model="email"/>
            </el-row>
            <el-row class="h14"></el-row>
            <el-row class="h56 text-center">
                <el-input class="w620 h42 t22" :class="{'animated shake fast': shake}" required placeholder="Введите пароль" size="100%" type="password" v-model="password"/>
            </el-row>

            <el-row class="h56"></el-row>
            <el-row class="text-center h56">
                <button type="submit" class="el-button w288 btn-black">
                    <span> Войти </span>
                </button>
            </el-row>
        </form>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    import api from '../../../api/ApiSettings'

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                shake: false
            }
        },
        computed: {...mapState(['authenticated'])},
        created() {
            if (this.authenticated) {
                this.$router.push({name: 'products'});
            }
        },
        methods: {
            login() {
                let params = {
                    email: this.email,
                    password: this.password
                };
                api
                    .post('login', params)
                    .then(function(response) {
                        api.refreshToken(
                            response.data,
                            function() {
                                this.$router.replace('/')
                            }.bind(this)
                        )}.bind(this)
                    ).catch(function(e) {
                        this.shake = true;
                        setTimeout(function() { this.shake = false; }.bind(this), 1000);
                    }.bind(this))
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/scss/index";
    @import "../../../assets/scss/pages/auth/login";
</style>