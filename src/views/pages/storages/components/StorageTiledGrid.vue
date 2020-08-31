<template>
    <section class="tiled-grid">
        <div class="tile-wrapper">
            <div class="tile" @click="previewedProductIndex = index"
                 v-for="(product, index) in productSearch(products)">

                <div class="image-container">
                    <img :src="product.main_image.url">
                </div>

                <div class="description">
                    <div class="tile-left-top-corner product-description-block">
                        <h3>{{product.code}}</h3>
                        <p>{{product.name}}</p>
                    </div>
                    <div class="tile-right-top-corner">
                        <el-popover placement="left"
                                    width="200"
                                    trigger="hover">
                            <a :href="front_url + '/product/'+product.id" target="_blank">
                                <p>Карточка товара</p>
                            </a>
                            <p @click="previewedProductIndex = index">Редактировать</p>
                            <p slot="reference">...</p>
                        </el-popover>
                    </div>
                    <div class="tile-left-bottom-corner">
                        <p>{{product.category_name}}</p>
                    </div>
                    <div class="tile-right-bottom-corner">
                        <p>{{product.stock_total_quantity}} шт.</p>
                    </div>
                </div>
            </div>
        </div>


        <storage-product-quantity-edit-popup v-if="previewedProduct" :product="previewedProduct"/>


    </section>
</template>

<script>
    import StorageProductQuantityEditPopup from "./StorageProductQuantityEditPopup";
    import hasSearchMixin from "../../../../mixins/hasSearchMixin";
    import env from '../../../../../env';

    export default {
        name: 'StorageTiledGrid',
        props: ['products'],
        mixins: [hasSearchMixin],
        components: {StorageProductQuantityEditPopup},
        data: function () {
            return {
                previewedProductIndex: false,
                front_url : env.FRONT_URL
            }
        },
        created: function () {

        },
        methods: {},
        computed: {
            previewedProduct: function () {
                if (this.previewedProductIndex !== null) {
                    return this.products[this.previewedProductIndex];
                }
            }
        },
    }
</script>
