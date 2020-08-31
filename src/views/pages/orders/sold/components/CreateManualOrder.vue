<template>
    <section class="storage-product-quantity-edit-popup">
        <div class="edit-popup">

            <create-manual-products-list :entries="orderEntries" v-if="orderEntries.length"/>

            <section v-if="!selectedEntry">
                <div class="product-description product-description-block">
                    <section>
                        <h1>Добавить Товар</h1>

                        <el-row>
                            <el-col :span="24">
                                <el-input placeholder="Артикул"
                                          class="m-d-t"
                                          v-model="product_code">
                                    <template slot="append">
                                        <el-button @click="addProduct">Подтвердить</el-button>
                                    </template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </section>
                </div>
            </section>

            <create-manual-select-quantity v-if="selectedEntry"
                                           :sizes="sizes"
                                           :entry="selectedEntry"/>

            <div class="product-description product-description-block" v-if="orderEntries.length && !selectedEntry">
                <section class="buttons-section m-d-t text-right">
                    <el-button @click="hideWindow()" type="danger">Отменить</el-button>
                    <el-button type="success" @click="submitOrder">Создать заказ</el-button>
                </section>
            </div>

            <div class="product-description product-description-block" v-if="!selectedEntry && !orderEntries.length">
                <section class="buttons-section text-right">
                    <el-button @click="hideWindow()">Закрыть</el-button>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
    import CreateManualSelectQuantity from "./CreateManualSelectQuantity";
    import ProductResource from "../../../../../api/resources/ProductResource";
    import CreateManualProductsList from "./CreateManualProductsList";
    import OrderResource from "../../../../../api/resources/OrderResource";

    export default {
        name: 'CreateManualOrder',
        components: {CreateManualProductsList, CreateManualSelectQuantity},
        data: function () {
            return {
                product_code: null,
                orderEntries: [],
                selectedEntry: null,
                sizes: [],
            }
        },
        created: function () {
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                ProductResource.getSizes().then(res => {
                    this.sizes = res.data;
                })
            },
            hideWindow: function () {
                if (!this.selectedEntry && !this.orderEntries.length) {
                    this.$parent.createPopup = null;
                }
            },
            addEntryToOrder: function () {
                this.orderEntries.push(this.selectedEntry);
                this.selectedEntry = null;
            },
            submitOrder: function () {
                OrderResource.createOfflineOrder(this.orderEntries).then(res => {
                    this.$notify({
                        title: 'Успешно',
                        message: 'Заказ создан.',
                        type: 'success'
                    });
                    this.$parent.fetchInitialData();
                    this.$parent.createPopup = null;
                }).catch(e => {
                    this.$notify({
                        title: 'Ошибка',
                        message: 'Ошибка записи.',
                        type: 'warning'
                    });
                })
            },
            addProduct: function () {
                ProductResource.getProductByCode(this.product_code).then(res => {
                        this.product_code = null;
                        this.selectedEntry = {
                            product: res.data,
                            price: res.data.price,
                            quantity: 1,
                            sizes: res.data.sizes,
                            fulfilled: false,
                            selectedSize: null,
                            selectedVariation: null,
                            useStorage: true,
                        }
                    }
                ).catch(e => {
                    this.$notify({
                        title: 'Ошибка',
                        message: 'Товар не найден.',
                        type: 'warning'
                    });
                })
            }
        }
    }
</script>
