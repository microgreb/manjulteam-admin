<template>
    <section class="product-main-image-upload images_products">

        <div class="product-main-image" slot="file">
            <img :src="existing_image ? existing_image.url : ''"
                 v-if="!fileList.length"
                 alt=""
                 class="el-upload-list__item-thumbnail">
            <div class="upload-button">
                <el-upload
                        :action="productsImagesUrl"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :limit="1"
                        :multiple="false"
                        list-type="picture-card">
                    <span slot="default"></span>
                    <el-button round class="custom-upload-button">{{title}}</el-button>
                </el-upload>
            </div>
        </div>
        <p class="text-center m-d-t">1920 x 1272 px</p>

    </section>
</template>

<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";
    import env from '../../../../../../env';

    export default {
        name: 'ProductMainImageUpload',
        props: ['title', 'event', 'existing_image'],
        data: function () {
            return {
                file: null,
                fileList: [],
            }
        },
        computed: {
            productsImagesUrl() {
                return env.API_URL + '/api/products/images';
            }
        },
        methods: {
            handleChange: function (file, fileList) {
                this.file = file;
                this.fileList = fileList;

                EventBus.$emit(this.event, fileList);
            },
            handleRemove: function () {
                EventBus.$emit(this.event, null);
            },
        }
    }
</script>
