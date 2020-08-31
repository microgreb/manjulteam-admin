<template>
    <section class="storage-index-page">
        <storage-filters/>

        <div class="p-l">
            <h1 class="page-heading">Склад</h1>

            <storage-tiled-grid :products="products"/>
        </div>

    </section>

</template>

<script>
    import StorageFilters from "./components/StrorageFilters";
    import StorageTiledGrid from "./components/StorageTiledGrid";
    import ProductResource from "../../../api/resources/ProductResource";
    import {EventBus} from "../../../bootstrap/EventBus";

    export default {
        name: 'StorageIndexPage',
        components: {StorageTiledGrid, StorageFilters},
        data: function () {
            return {
                products: []
            }
        },
        created: function () {
            this.fetchInitialData();
            this.registerEvents();
        },
        methods: {
            fetchInitialData: function () {
                this.fetchProducts();
            },
            fetchProducts: function (filters) {
                ProductResource.getProducts(filters).then(res => {
                    this.products = res.data;
                });
            },
            registerEvents: function () {
                EventBus.$on('filters', filters => {
                    this.fetchProducts(filters);
                });

                EventBus.$on('variation-quantity-update', () => {
                    this.fetchProducts();
                })
            }
        }
    }
</script>
