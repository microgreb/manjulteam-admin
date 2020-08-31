<template>
    <section class="products-list-page">

        <product-filters/>

        <div class="p-l">
            <el-row>
                <el-col :span="12">
                    <h1 class="page-heading">Товары</h1>
                </el-col>
                <el-col :span="12" class="text-right ">
                    <el-button round @click="$router.push({name: 'products.create'})">Добавить товар</el-button>
                </el-col>
            </el-row>


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
                                    <p @click="$router.push('products/edit/'+product.id)">Редактировать</p>
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

            </section>
        </div>


    </section>
</template>

<script>
    import ProductFilters from "./components/ProductFilters";
    import ProductListTable from "./components/ProductListTable";
    import ProductResource from "../../../../api/resources/ProductResource";
    import hasSearchMixin from "../../../../mixins/hasSearchMixin";
    import env from '../../../../../env';
    import {EventBus} from "../../../../bootstrap/EventBus";

    export default {
        name: 'ProductsListIndexPage',
        components: {ProductListTable, ProductFilters},
        mixins: [hasSearchMixin],
        data: function () {
            return {
                products: [],
                front_url: env.FRONT_URL
            }
        },
        created: function () {
            this.fetchInitialData();
            this.registerEvents();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('filters', filters => {
                    this.fetchProducts(filters);
                })
            },
            fetchInitialData: function () {
                this.fetchProducts();
            },
            fetchProducts: function (filters = null) {
                ProductResource.getProducts(filters).then(res => {
                    this.products = res.data;
                })
            }
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
