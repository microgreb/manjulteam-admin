<template>
    <section class="storage-product-quantity-edit-popup" v-if="order">
        <div class="edit-popup" v-click-outside="hideWindow">
            <div class="product-description product-description-block">
                <div>
                    <h3>№{{order.id}}</h3>
                    <p>{{order.created_at_formatted}}</p>
                    <p>{{order.created_day}}</p>
                    <p :class="getOrderStatusColorClass(order)">{{order.status.name}}</p>
                </div>

                <div class="tile-right-bottom-corner">
                    <p class="bold">Итого: {{order.total_amount}} UAH</p>
                </div>
            </div>

            <div class="products-list">
                <div class="product-description product-description-block bgc-white"
                     v-for="orderProduct in order.order_products">
                    <div class="image-container">
                        <img :src="orderProduct.product.main_image.url">
                    </div>
                    <div>
                        <h3>{{orderProduct.product.code}}</h3>
                        <p>{{orderProduct.product.name}}</p>
                        <p>{{orderProduct.size.name}} – {{orderProduct.quantity}} шт</p>
                        <p>{{orderProduct.price}} UAH</p>
                    </div>
                </div>

            </div>

            <div class="product-description product-description-block bgc-white">
                <div v-if="order.delivery_detail">
                    <h3>Доставка</h3>
                    <p>{{order.delivery_detail.city}}</p>
                    <p>{{order.delivery_detail.full_name}}</p>
                    <p>{{order.delivery_detail.phone}}</p>
                    <p>{{order.delivery_detail.np_department}}</p>
                    <p class="m-d-t">
                        {{order.delivery_detail.comment}}
                    </p>
                </div>
            </div>

            <div class="product-description product-description-block" v-if="!smallVersion">
                <div>
                    <h3>Статус Заказа</h3>
                    <el-button round v-for="status in statuses"
                               :key="status.id"
                               @click="changeOrderStatus(order, status)"
                               :class="getOrderBgStatusColorClass(order, status)">
                        {{status.name}}
                    </el-button>
                </div>
            </div>

            <div class="product-description product-description-block" v-if="!smallVersion">
                <el-form>
                    <el-input placeholder="Номер транспортной накладной"
                              v-model="order.delivery_detail.np_delivery_number">
                        <template slot="append">
                            <el-button @click="setDeliveryNumber">Сохранить</el-button>
                        </template>
                    </el-input>
                </el-form>
            </div>
        </div>
    </section>
</template>
<script>
    import OrderResource from "../../../../api/resources/OrderResource";
    import {EventBus} from "../../../../bootstrap/EventBus";
    import hasOrderColorClassesDefinition from "../../../../mixins/hasOrderColorClassesDefinition";

    export default {
        name: 'OrderPreviewPopup',
        props: ['order', 'smallVersion'],
        mixins: [hasOrderColorClassesDefinition],
        data: function () {
            return {
                statuses: [],
            }
        },
        created: function () {
            console.log(this.order);
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                this.fetchOrderStatuses();
            },
            fetchOrderStatuses: function () {
                OrderResource.getOrderStatuses().then(res => {
                    this.statuses = res.data;
                });
            },
            changeOrderStatus: function (order, status) {
                OrderResource.setOrderStatus(order, status).then(res => {
                    EventBus.$emit('orders-re-fetch');

                    this.$notify({
                        title: 'Успешно',
                        message: 'Статус товара обновлен.',
                        type: 'success'
                    });
                });
            },
            setDeliveryNumber: function () {
                OrderResource.setDeliveryNumber(this.order.delivery_detail, this.order.delivery_detail.np_delivery_number).then(res => {
                    EventBus.$emit('orders-re-fetch');

                    this.$notify({
                        title: 'Успешно',
                        message: 'Товарная накладная добавлена.',
                        type: 'success'
                    });
                })
            },
            hideWindow: function () {
                this.$parent.previewedOrderIndex = false;
            }
        }
    }
</script>
