<template>
    <section class="product-create-page">
        <div class="product-create-form">
            <h1 class="page-heading text-center">Добавление Лукбука</h1>


            <div class="default-form">
                <el-form>
                    <el-row :gutter="21">
                        <el-col :span="24" :xs="24">
                            <lookbook-main-image-upload title="Обложка" event="lookbook-main-image-upload"
                                                        :existing_image="lookbook.main_image"/>
                        </el-col>
                    </el-row>

                    <div class="separator"></div>

                    <h2>Дополнительные фотографии</h2>
                    <p>Дополнительные фотографии не должны повторять обложку или эфект
                        наведения. Если нет дополнительных фотографий
                        товара - пропустите это поле.</p>

                    <lookbook-additional-images-upload :existing_images="lookbook.additional_images"/>

                    <div class="separator"></div>

                    <h2>О Лукбуке</h2>

                    <el-form-item label="Название">
                        <el-input placeholder="Название" v-model="lookbook.name"/>
                    </el-form-item>

                    <div class="separator"></div>

                    <el-button type="danger" @click="deleteLookbook">Удалить</el-button>
                    <el-button type="success" class="pull-right" @click="submitLookbookForm">Сохранить</el-button>
                </el-form>
            </div>
        </div>


    </section>
</template>

<script>
    import LookbookResource from "../../../../api/resources/LookbookResource";
    import {EventBus} from "../../../../bootstrap/EventBus";
    import LookbookAdditionalImagesUpload from "./components/LookbookAdditionalImagesUpload";
    import LookbookMainImageUpload from "./components/LookbookMainImageUpload";

    export default {
        name: 'LookbooksEditIndexPage',
        components: {LookbookMainImageUpload, LookbookAdditionalImagesUpload},
        data: function () {
            return {
                lookbook: {
                    name: '',
                    images: [],
                }
            }
        },
        created: function () {
            this.registerEvents();
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                LookbookResource.getLookbook(this.$route.params.lookbook_id).then(res => {
                    this.lookbook = res.data;
                })
            },
            deleteLookbook: function () {
                LookbookResource.deleteLookbook(this.$route.params.lookbook_id).then(res => {
                    this.$notify({
                        title: 'Готово',
                        message: 'Лукбук успешно удален.',
                        type: 'success'
                    });

                    this.$router.push('/lookbooks');
                })
            },
            registerEvents: function () {
                EventBus.$on('lookbook-main-image-upload', image => {
                    this.lookbook.main_image = image ? image[0] : null;
                });
                EventBus.$on('lookbook-main-image-remove', image => {
                    this.lookbook.main_image = null
                });
                EventBus.$on('lookbook-hover-image-upload', image => {
                    this.lookbook.hover_image = image ? image[0] : null;
                });
                EventBus.$on('lookbook-hover-image-remove', image => {
                    this.lookbook.hover_image = null;
                });
                EventBus.$on('lookbook-images-upload', images => {
                    this.lookbook.images = images;
                })
            },
            submitLookbookForm: function () {
                LookbookResource.updateLookbook(this.lookbook.id, this.lookbook).then(res => {
                    this.$notify({
                        title: 'Готово',
                        message: 'Лукбук успешно обновлен',
                        type: 'success'
                    });

                    this.$router.push('/lookbooks');
                })
            }
        }
    }
</script>
