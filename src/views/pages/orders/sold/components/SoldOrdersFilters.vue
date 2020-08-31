<template>
    <section class="filters">
        <el-row>
            <el-col :span="3">
                <el-select class="filters-select" v-model="filters.order_type_id" placeholder="Все продажи">
                    <el-option value="1" label="Онлайн">Онлайн</el-option>
                    <el-option value="2" label="Оффлайн">Оффлайн</el-option>
                    <el-option value="" label="Все продажи">Все продажи</el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select class="filters-select" v-model="filters.month" placeholder="Все продажи">
                    <el-option value="1" label="Январь">Январь</el-option>
                    <el-option value="2" label="Февраль">Февраль</el-option>
                    <el-option value="3" label="Март">Март</el-option>
                    <el-option value="4" label="Апрель">Апрель</el-option>
                    <el-option value="5" label="Май">Май</el-option>
                    <el-option value="6" label="Июнь">Июнь</el-option>
                    <el-option value="7" label="Июль">Июль</el-option>
                    <el-option value="8" label="Август">Август</el-option>
                    <el-option value="9" label="Сентябрь">Сентябрь</el-option>
                    <el-option value="10" label="Октябрь">Октябрь</el-option>
                    <el-option value="11" label="Ноябрь">Ноябрь</el-option>
                    <el-option value="12" label="Декабрь">Декабрь</el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-date-picker
                        type="dates"
                        class="filters-select"
                        format="yyyy-MM-DD"
                        v-model="filters.dates"
                        placeholder="Один или несколько дней">
                </el-date-picker>
            </el-col>
            <el-col :span="6" class="text-right" :offset="0">
                <el-input class="filters-input b-left" placeholder="Поиск" v-model="search"></el-input>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";

    export default {
        name: 'SoldOrdersFilters',
        data: function () {
            return {
                search: null,
                filters: {
                    type: null,
                    month: null,
                    date: null,
                    period: null,
                    search: null,
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
        },

    }
</script>
