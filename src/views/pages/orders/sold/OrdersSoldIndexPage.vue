<template>
    <section class="storage-index-page">
        <sold-orders-filters/>

        <div class="p-l">
            <el-row>
                <el-col :span="12">
                    <h1 class="page-heading">Продажи</h1>
                </el-col>
                <el-col :span="12" class="text-right ">
                    <el-button round @click="createPopup = true">Добавить</el-button>
                </el-col>
            </el-row>
            <sold-orders-tiled-grid :orders="orders"/>
        </div>

        <create-manual-order v-if="createPopup"/>
    </section>

</template>

<script>
    import SoldOrdersTiledGrid from "./components/SoldOrdersTiledGrid";
    import SoldOrdersFilters from "./components/SoldOrdersFilters";
    import OrderResource from "../../../../api/resources/OrderResource";
    import {EventBus} from "../../../../bootstrap/EventBus";
    import CreateManualOrder from "./components/CreateManualOrder";

    export default {
        name: 'StorageIndexPage',
        components: {CreateManualOrder, SoldOrdersFilters, SoldOrdersTiledGrid},
        data: function () {
            return {
                createPopup: false,
                orders: []
            }
        },
        created: function () {
            this.registerEvents();
            this.fetchInitialData();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('orders-re-fetch', () => {
                    this.fetchInitialData()
                });

                EventBus.$on('filters', filters => {
                    this.fetchOrders(filters);
                })
            },
            fetchInitialData: function () {
                this.fetchOrders();
            },
            fetchOrders: function (filters = null) {
                OrderResource.getFinishedOrders(filters).then(res => {
                    this.orders = res.data;
                });
            },
        }
    }
</script>
