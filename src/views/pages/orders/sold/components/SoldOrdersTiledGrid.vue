<template>
    <section class="tiled-grid">
        <div class="tile-wrapper">
            <div class="tile" @click="previewedOrderIndex = index" v-for="(order, index) in orders">

                <div class="tile-left-top-corner product-description-block">
                    <h3>№ {{order.name}}</h3>
                    <p>{{order.created_at_formatted}}</p>
                    <p>{{order.created_day}}</p>
                    <p>{{order.total_quantity}} шт.</p>
                </div>
                <div class="tile-right-top-corner">

                </div>
                <div class="tile-left-bottom-corner">
                    <p :class="getOrderTypeColorClass(order)">{{order.type.name}}</p>
                </div>
                <div class="tile-right-bottom-corner">
                    <p>{{order.total_amount}} UAH</p>
                </div>
            </div>

        </div>

        <order-preview-popup v-if="previewedOrder" :order="previewedOrder" :small-version="true"/>

    </section>
</template>

<script>


    import OrderPreviewPopup from "../../components/OrderPreviewPopup";
    import hasOrderColorClassesDefinition from "../../../../../mixins/hasOrderColorClassesDefinition";

    export default {
        name: 'SoldOrdersTiledGrid',
        props: ['orders'],
        mixins: [hasOrderColorClassesDefinition],
        components: {OrderPreviewPopup},
        data: function () {
            return {
                previewedOrderIndex: null
            }
        },
        computed: {
            previewedOrder: function () {
                if (this.previewedOrderIndex !== null) {
                    return this.orders[this.previewedOrderIndex];
                }
            }
        },
    }
</script>
