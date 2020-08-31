<template>
    <section class="product-create-page">
        <div class="product-create-form">
            <h1 class="page-heading text-center">Добавление Товара</h1>


            <div class="default-form">
                <el-form>
                    <el-row :gutter="21">
                        <el-col :span="12" :xs="24">
                            <product-main-image-upload title="Обложка" event="product-main-image-upload"/>
                        </el-col>
                        <el-col :span="12" :xs="24">
                            <product-main-image-upload title="Наведение" event="product-hover-image-upload"/>
                        </el-col>
                    </el-row>


                    <div class="separator"></div>

                    <h2>Фотографии товара</h2>
                    <p>Дополнительные фотографии не должны повторять обложку или эфект
                        наведения. Если нет дополнительных фотографий
                        товара - пропустите это поле.</p>

                    <product-additional-images-upload/>


                    <div class="separator"></div>

                    <h2>О товаре</h2>

                    <el-form-item label="Название">
                        <el-input placeholder="Название" v-model="product.name"/>
                    </el-form-item>

                    <el-form-item>
                        <el-radio-group v-model="product.gender">
                            <el-radio label="1">Мужской</el-radio>
                            <el-radio label="2">Женский</el-radio>
                            <el-radio label="3">Унисекс</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item label="Артикул">
                        <el-input placeholder="Артикул" v-model="product.code"/>
                    </el-form-item>


                    <el-form-item label="Цена, UAH">
                        <el-input placeholder="Цена" v-model="product.price"/>
                    </el-form-item>


                    <el-form-item label="Описание">
                        <el-input type="textarea" v-model="product.description" :rows="7" placeholder="Описание"/>
                    </el-form-item>


                    <el-checkbox label="Отображать на главной" v-model="product.featured"></el-checkbox>

                    <div class="separator"></div>

                    <el-button type="success" class="pull-right" @click="submitProductForm">Сохранить</el-button>
                </el-form>
            </div>
        </div>


    </section>
</template>

<script>
    import ProductMainImageUpload from "./components/ProductMainImageUpload";
    import ProductAdditionalImagesUpload from "./components/ProductAdditionalImagesUpload";
    import ProductResource from "../../../../api/resources/ProductResource";
    import {EventBus} from "../../../../bootstrap/EventBus";

    export default {
        name: 'ProductsCreateIndexPage',
        components: {ProductAdditionalImagesUpload, ProductMainImageUpload},
        data: function () {
            return {
                product: {
                    name: '',
                    code: '',
                    gender: '',
                    price: '',
                    description: '',
                    featured: false,
                    images: [],
                }
            }
        },
        created: function () {
            this.registerEvents();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('product-main-image-upload', image => {
                    this.product.main_image = image ? image[0] : null;
                });
                EventBus.$on('product-main-image-remove', image => {
                    this.product.main_image = null
                });
                EventBus.$on('product-hover-image-upload', image => {
                    this.product.hover_image = image ? image[0] : null;
                });
                EventBus.$on('product-hover-image-remove', image => {
                    this.product.hover_image = null;
                });
                EventBus.$on('product-images-upload', images => {
                    this.product.images = images;
                })
            },
            submitProductForm: function () {
                ProductResource.storeProduct(this.product).then(res => {

                    if( res.data.error ) {
                      this.$notify({
                        title: 'Ошибка',
                        message: 'Необходимо загрузить изображение.',
                        type: 'warning'
                      });
                    }
                    else {
                      this.$notify({
                        title: 'Готово',
                        message: 'Товар успешно добавлен',
                        type: 'success'
                      });
                      this.$router.push('/products');
                    }
                }).catch(e => {
                    this.$notify({
                        title: 'Ошибка',
                        message: 'Все поля должны быть заполнены.',
                        type: 'warning'
                    });
                })
            }
        }
    }
</script>
