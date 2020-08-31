<template>
    <section class="product-main-image-upload images_lookbook">

        <div class="product-main-image" slot="file">
            <img :src="existing_image ? existing_image.url : ''"
                 v-if="!fileList.length"
                 alt=""
                 class="el-upload-list__item-thumbnail">
            <div class="upload-button">
                <el-upload
                        :action="lookbooksImagesUrl"
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

    </section>
</template>

<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";
    import env from '../../../../../../env';

    export default {
        name: 'LookbookMainImageUpload',
        props: ['title', 'event', 'existing_image'],
        data: function () {
            return {
                file: null,
                fileList: [],
            }
        },
        computed: {
            lookbooksImagesUrl() {
                return env.API_URL + '/api/lookbooks/images';
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
