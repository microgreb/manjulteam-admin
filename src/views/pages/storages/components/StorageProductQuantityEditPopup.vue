<template>
    <section class="storage-product-quantity-edit-popup">
        <div class="edit-popup" v-click-outside="hideWindow">
            <div class="product-description product-description-block">
                <div class="image-container">
                    <img :src="product.main_image.url">
                </div>
                <div>
                    <h3>#{{product.code}}</h3>
                    <p>{{product.name}}</p>
                </div>

                <div class="tile-right-top-corner" @click="hideWindow">
                    <p>x</p>
                </div>

                <div class="tile-right-bottom-corner">
                    <p class="bold">{{product.stock_total_quantity}} шт.</p>
                </div>
            </div>

            <div class="product-sizes-container">
                <el-row :gutter="2">
                    <el-col :span="4" v-for="size in sizes">
                        <p @click="selectedSize = size"
                           :class="{active: selectedSize === size, available: size.specific_product_variation}">
                            {{size.name}} - {{size.specific_product_variation ? size.specific_product_variation.quantity : 0}}
                        </p>
                    </el-col>
                </el-row>
            </div>

            <product-quantity-edit-form v-if="selectedSize" :selectedSize="selectedSize" :product="product"/>
        </div>
    </section>
</template>

<script>

    import ProductQuantityEditForm from "./components/QuantityEditForm";
    import ProductResource from "../../../../api/resources/ProductResource";

    export default {
        name: 'StorageProductQuantityEditPopup',
        components: {ProductQuantityEditForm},
        props: ['product'],
        data: function () {
            return {
                selectedSize: null,
                sizes: []
            }
        },
        created: function () {
            this.fetchProductSizes();
        },
        methods: {
            fetchProductSizes: function () {
                ProductResource.getProductSizes(this.product).then(res => {
                    this.sizes = res.data;
                })
            },
            hideWindow: function () {
                this.$parent.previewedProductIndex = null;
            }
        }
    }
</script>
