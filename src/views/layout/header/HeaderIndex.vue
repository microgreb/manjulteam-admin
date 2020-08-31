<template>
    <section class="header">
        <el-row>
            <el-col :span="6" class="p-d-l bold">MANJULTEAM</el-col>
            <el-col :span="12" class="text-center">
                <ul class="nav">
                    <li @click="goTo(link)" v-for="link in links" :class="{active: activeLink === link}">{{link.name}}
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="text-right p-d-r">

            </el-col>
        </el-row>
    </section>
</template>


<script>
    export default {
        name: 'HeaderIndex',
        data: function () {
            return {
                activeLink: null,
                links: [
                    {name: 'Заказы', route: '/orders/active'},
                    {name: 'Продажи', route: '/orders/sold'},
                    {name: 'Товары', route: '/products'},
                    {name: 'Лукбуки', route: '/lookbooks'},
                    {name: 'Склад', route: '/storage'},
                ]
            }
        },
        methods: {
            goTo: function (link) {
                this.activeLink = link;
                this.$router.push(link.route);
            },
        }
    }
</script>
