<template>
    <section class="filters">
        <el-row>
            <el-col :span="3">
                <el-select class="filters-select" v-model="filters.category" placeholder="Категория">
                    <el-option value="1" label="Мужские">Мужские</el-option>
                    <el-option value="2" label="Женские">Женские</el-option>
                    <el-option value="3" label="Юнисекс">Унисекс</el-option>
                    <el-option value="" label="Категория">Все</el-option>
                </el-select>
            </el-col>

            <el-col :span="6" class="text-right" :offset="15">
                <el-input class="filters-input b-left" placeholder="Поиск" v-model="search"></el-input>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";

    export default {
        name: 'ProductFilters',
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
