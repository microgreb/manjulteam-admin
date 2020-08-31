<template>
    <section class="products-list-page">
        <lookbook-filters/>

        <div class="p-l">
            <el-row>
                <el-col :span="12">
                    <h1 class="page-heading">Лукбуки</h1>
                </el-col>
                <el-col :span="12" class="text-right ">
                    <el-button round @click="$router.push({name: 'lookbooks.create'})">Добавить</el-button>
                </el-col>
            </el-row>

            <lookbooks-tiled-grid :lookbooks="lookbooks"/>

        </div>

    </section>
</template>
<script>
    import LookbookFilters from "./components/LookbookFilters";
    import LookbooksTiledGrid from "./components/LookbooksTiledGrid";
    import LookbookResource from "../../../api/resources/LookbookResource";
    import {EventBus} from "../../../bootstrap/EventBus";

    export default {
        name: 'LookbooksIndexPage',
        components: {LookbooksTiledGrid, LookbookFilters},
        data: function () {
            return {
                lookbooks: [],
            }
        },
        created: function () {
            this.fetchInitialData();
            this.registerEvents();
        },
        methods: {
            registerEvents: function () {
                EventBus.$on('filters', filters => {
                    this.fetchLookbooks(filters);
                })
            },
            fetchInitialData: function () {
                this.fetchLookbooks();
            },
            fetchLookbooks: function (filters = null) {
                LookbookResource.getLookbooks(filters).then(res => {
                    this.lookbooks = res.data;
                })
            }
        }
    }
</script>
