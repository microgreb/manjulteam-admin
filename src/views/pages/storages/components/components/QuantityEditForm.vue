<template>
    <section class="product-quantity-edit-form">
        <h2>Редактировать количество ({{selectedSize.name}})</h2>
        <el-row :gutter="12">
            <el-col>
                <el-input-number v-model="quantity" :min="0" :max="100"></el-input-number>
                <el-button round size="large" class="m-d-l" @click="submitSelectedSizeQuantity">Сохранить</el-button>
            </el-col>
        </el-row>

    </section>
</template>
<script>
    import ProductResource from "../../../../../api/resources/ProductResource";
    import {EventBus} from "../../../../../bootstrap/EventBus";

    export default {
        name: 'ProductQuantityEditForm',
        props: ['selectedSize', 'product'],
        data: function () {
            return {
                quantity: 0
            }
        },
        created: function () {
            this.resetSelectedSize();
        },
        methods: {
            resetSelectedSize: function () {
                if (this.selectedSize.specific_product_variation) {
                    this.quantity = this.selectedSize.specific_product_variation.quantity;
                }
            },
            submitSelectedSizeQuantity: function () {
                ProductResource.setProductVariationQuantity(this.product, this.selectedSize, {quantity: this.quantity}).then(res => {
                    this.onQuantityUpdate();
                })
            },
            onQuantityUpdate: function () {
                this.$notify({
                    title: 'Готово',
                    message: 'Количество успешно обновлено.',
                    type: 'success'
                });

                this.$parent.selectedSize = null;

                this.$parent.fetchProductSizes();

                EventBus.$emit('variation-quantity-update');
            }
        },
        watch: {
            selectedSize: function () {
                this.resetSelectedSize();
            }
        }
    }
</script>
