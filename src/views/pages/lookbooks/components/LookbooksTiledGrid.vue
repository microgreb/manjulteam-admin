<template>
    <section class="tiled-grid">
        <div class="tile-wrapper">
            <div class="tile" v-for="(lookbook, index) in ordersSearch(lookbooks)">
                    <div class="tile-left-top-corner product-description-block">
                        <h3>{{lookbook.name}}</h3>
                    </div>
                    <div class="tile-right-top-corner">
                        <el-popover placement="left"
                                    width="200"
                                    trigger="hover">
                            <p @click="$router.push('lookbooks/edit/'+lookbook.id)">Редактировать</p>
                            <p slot="reference">...</p>
                        </el-popover>
                    </div>
            </div>

        </div>
    </section>
</template>

<script>


    import hasSearchMixin from "../../../../mixins/hasSearchMixin";

    export default {
        name: 'LookbooksTiledGrid',
        props: ['lookbooks'],
        mixins: [hasSearchMixin],
        components: {},
        data: function () {
            return {}
        },
        computed: {},
    }
</script>
