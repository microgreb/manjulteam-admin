<template>
    <section class="filters">
        <el-row>
            <el-col :span="3">

            </el-col>

            <el-col :span="6" class="text-right" :offset="18">
                <el-input class="filters-input b-left" placeholder="Поиск" v-model="search"></el-input>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {EventBus} from "../../../../bootstrap/EventBus";

    export default {
        name: 'LookbookFilters',
        data: function () {
            return {
                search: null,
                filters: {
                    category: null,
                }
            }
        },
        watch: {
            search: function () {
                EventBus.$emit('search', this.search);
            },
            filters: {
                handler: function () {
                    EventBus.$emit('filters', this.filters);
                },
                deep: true
            }
        }
    }
</script>
