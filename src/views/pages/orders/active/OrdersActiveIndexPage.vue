<template>
    <section class="storage-index-page">
        <active-orders-filters/>

        <div class="p-l">
            <h1 class="page-heading">Заказы</h1>

            <active-orders-tiled-grid :orders="orders"/>
        </div>

    </section>

</template>

<script>
    import ActiveOrdersTiledGrid from "./components/ActiveOrdersTiledGrid";
    import ActiveOrdersFilters from "./components/ActiveOrdersFilters";
    import OrderResource from "../../../../api/resources/OrderResource";
    import {EventBus} from "../../../../bootstrap/EventBus";

    export default {
        name: 'OrdersActiveIndexPage',
        components: {ActiveOrdersFilters, ActiveOrdersTiledGrid},
        data: function () {
            return {
                orders: [],
                filters: null
            }
        },
        created: function () {
            this.registerEvents();
            this.fetchInitialData();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('filters', filters => {
                    this.fetchOrders(filters);
                });
                EventBus.$on('orders-re-fetch', () => {
                    this.fetchInitialData(this.filters)
                });
            },
            fetchInitialData: function () {
                this.fetchOrders();
            },
            fetchOrders: function (filters = null) {
                OrderResource.getActiveOrders(filters).then(res => {
                    this.orders = res.data;
                });
            },
        }
    }
</script>
