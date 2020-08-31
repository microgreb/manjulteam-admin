<template>
    <section class="product-additional-images-upload images_products">
        <el-upload
                class="upload-demo"
                :action="productsImagesUrl"
                :on-preview="handlePreview"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="10"
                :on-exceed="handleExceed"
                :file-list="existing_images">
            <el-button round>Загрузить</el-button>
        </el-upload>
    </section>
</template>

<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";
    import ProductResource from "../../../../../api/resources/ProductResource";
    import env from '../../../../../../env';

    export default {
        name: 'ProductAdditionalImagesUpload',
        props: ['existing_images'],
        data() {
            return {
                fileList: []
            };
        },
        computed: {
            productsImagesUrl() {
                return env.API_URL + '/api/products/images';
            }
        },
        methods: {
            handleRemove(file, fileList) {
                if (file.id) {
                    ProductResource.removeProductImage(file.id).then(res => {
                        console.log('Deleted from server');
                    })
                }
            },
            handleChange: function (file, fileList) {
                console.log('@Change');
                console.log(file);
                EventBus.$emit('product-images-upload', fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            }
        }
    }
</script>
