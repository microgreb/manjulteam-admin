<template>
    <section class="tiled-grid">
        <div class="tile-wrapper">
            <div class="tile" @click="previewedOrderIndex = index" v-for="(order, index) in ordersSearch(orders)">

                <div class="tile-left-top-corner product-description-block">
                    <h3>№ {{order.name}}</h3>
                    <p>{{order.created_at_formatted}}</p>
                    <p>{{order.created_day}}</p>
                    <p>{{order.total_quantity}} шт.</p>
                </div>
                <div class="tile-left-bottom-corner">
                    <p :class="getOrderStatusColorClass(order)">{{order.status.name}}</p>
                </div>
                <div class="tile-right-bottom-corner">
                    <p>{{order.total_amount}} UAH</p>
                </div>
            </div>

        </div>


        <order-preview-popup v-if="previewedOrder" :order="previewedOrder"/>
    </section>
</template>

<script>


    import OrderPreviewPopup from "../../components/OrderPreviewPopup";
    import hasOrderColorClassesDefinition from "../../../../../mixins/hasOrderColorClassesDefinition";
    import hasSearchMixin from "../../../../../mixins/hasSearchMixin";

    export default {
        name: 'ActiveOrdersTiledGrid',
        props: ['orders'],
        mixins: [hasOrderColorClassesDefinition, hasSearchMixin],
        components: {OrderPreviewPopup},
        data: function () {
            return {
                previewedOrderIndex: null
            }
        },
        computed: {
            previewedOrder: function () {
                return this.orders[this.previewedOrderIndex];
            }
        },
    }
</script>
