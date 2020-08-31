<template>
    <section class="sidebar">
        <el-row class="tac">
            <el-col>
                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         @open="handleOpen"
                         @close="handleClose">

                    <el-menu-item index="01" @click="$router.push('/dashboard')">
                        <i class="el-icon-trophy"></i>
                        <span>Главная</span>
                    </el-menu-item>


                    <br>

                    <el-submenu :index="index+''" v-for="(link, index) in links" :key="index">
                        <template slot="title">
                            <i :class="link.icon"></i>
                            <span>{{link.name}}</span>
                        </template>

                        <el-menu-item
                                :index="index+'-1'+subIndex"
                                @click="$router.push(subLink.redirectTo)"
                                :key="subIndex" v-for="(subLink, subIndex) in link.subcategories">
                            <i :class="link.icon"></i>
                            {{subLink.name}}
                        </el-menu-item>

                    </el-submenu>


                    <br>

                    <el-menu-item index="01">
                        <i class="el-icon-setting"></i>
                        <span>Настройки</span>
                    </el-menu-item>


                    <el-menu-item index="01" @click="logout">
                        <i class="el-icon-smoking"></i>
                        <span>Выход</span>
                    </el-menu-item>


                </el-menu>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import sidebarLinks from "../../../config/sidebarLinks";

    export default {
        name: 'Sidebar',
        data: function () {
            return {
                links: sidebarLinks
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            logout: function () {
                this.$store.dispatch('onUserLogout').then(res => {
                    this.$router.push('/login');
                });
            }
        }
    }
</script>


