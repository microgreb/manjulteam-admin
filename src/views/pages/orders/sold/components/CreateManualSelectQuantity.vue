<template>
    <section>
        <div class="product-description product-description-block">
            <h1>Добавить товар</h1>
        </div>

        <div class="products-list">
            <div class="product-description product-description-block bgc-white">
                <div class="image-container">
                    <img :src="entry.product.main_image.url">
                </div>
                <div>
                    <h3>{{entry.product.code}}</h3>
                    <p>{{entry.product.name}}</p>
                    <p>{{entry.price}} UAH</p>
                </div>
            </div>

            <div class="product-description product-description-block ">

                <div class="product-quantity-selector m-d-t">
                    <el-row :gutter="21">
                        <el-form label-position="top">
                            <el-col :span="6">
                                <el-form-item label="Склад">
                                    <el-checkbox label="Списывать со склада" size="large" :border="true"
                                                 v-model="entry.useStorage"></el-checkbox>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6" v-if="!entry.useStorage">
                                <el-form-item label="Размер">
                                    <el-select v-model="entry.selectedSize">
                                        <el-option v-for="size in sizes"
                                                   :label="size.name"
                                                   :value="size.id"
                                                   :key="size.id"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6" v-if="entry.useStorage">
                                <el-form-item label="Размер" :error="hasSizeError ? 'Выбери размер': ''">
                                    <el-select v-model="entry.selectedVariation" @change="resetSelectedVariation">
                                        <el-option v-for="(variation, index) in entry.product.variations"
                                                   :label="variation.size_name +' - '+ variation.quantity +' шт.'"
                                                   :value="index"
                                                   :key="variation.id"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="Цена за еденицу">
                                    <el-input v-model="entry.price"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="Количество"
                                              :error="hasQuantityError ? 'Неправильное количество' : null">
                                    <el-input-number v-model="entry.quantity"
                                                     :min="1"
                                                     :max="100">
                                    </el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                </div>

                <section class="buttons-section m-d-t text-right">
                    <el-button @click="goBack">Назад</el-button>
                    <el-button type="info" @click="submit">Добавить</el-button>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['entry', 'sizes'],
        name: 'CreateManualSelectQuantity',
        data: function () {
            return {
                validationEnabled: false,
            }
        },
        computed: {
            hasSizeError: function () {
                if (this.entry.selectedVariation !== null && this.entry.useStorage) {
                    return false;
                }
                if (this.entry.selectedSize !== null && !this.entry.useStorage) {
                    return false;
                }
                return this.validationEnabled;
            },
            hasQuantityError: function () {
                if (this.entry.useStorage && this.entry.selectedVariation !== null && this.validationEnabled) {
                    if (this.entry.quantity > this.entry.product.variations[this.entry.selectedVariation].quantity) {
                        return true;
                    }
                }
                return false;
            },
            isFormValid: function () {
                return !this.hasSizeError && !this.hasQuantityError;
            }
        },
        created: function () {

        },
        methods: {
            resetSelectedVariation: function () {
                this.entry.quantity = 1;
            },
            goBack: function () {
                this.$parent.selectedEntry = null;
            },
            submit: function () {
                this.validationEnabled = true;

                if (this.isFormValid) {
                    this.$parent.addEntryToOrder();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .product-quantity-selector {
        input {
            width: 100%;
        }
    }
</style>
