<template>
    <section>
        <div class="product-description product-description-block">
            <h1>Сформировать Продажу</h1>
        </div>

        <div class="products-list">
            <div class="product-description product-description-block bgc-white"
                 v-for="orderProduct in entries">
                <div class="image-container">
                    <img :src="orderProduct.product.main_image.url">
                </div>
                <div>
                    <h3>{{orderProduct.product.code}}</h3>
                    <p>{{orderProduct.product.name}}</p>
                    <p>{{getProductSizeName(orderProduct)}} - {{orderProduct.quantity}} шт.</p>
                    <p>{{orderProduct.price}} UAH</p>
                </div>
            </div>
        </div>

        <div class="product-description product-description-block b-b">
            <p class="text-right">Итого: {{total}} грн</p>
        </div>


    </section>
</template>

<script>
    export default {
        props: ['entries'],
        name: 'CreateManualProductsList',
        computed: {
            total: function () {
                let total = 0;

                this.entries.forEach((entry) => {
                    return total += entry.product.price * entry.quantity;
                });

                return total;
            }
        },
        methods: {
            getProductSizeName: function (entry) {
                if (entry.useStorage) {
                    return entry.product.variations[entry.selectedVariation].size_name;
                }
                return this.getProductSize(entry).name;

            },
            getProductSize: function (entry) {
                let found = entry.sizes.filter(data => {
                    console.log(data.id, entry.selectedSize);
                    return data.id === entry.selectedSize
                });
                return found.length > 0 ? found[0] : {};
            }
        }
    }
</script>
