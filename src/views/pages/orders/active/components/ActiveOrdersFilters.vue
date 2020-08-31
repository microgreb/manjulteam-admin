<template>
    <section class="filters">
        <el-row>
            <el-col :span="24">
                <div class="tab" v-for="status in statuses"
                     :class="{activeTab: filters.status_id === status.id}"
                     @click="filters.status_id = status.id">{{status.name}}
                </div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {EventBus} from "../../../../../bootstrap/EventBus";
    import OrderResource from "../../../../../api/resources/OrderResource";

    export default {
        name: 'SoldOrdersFilters',
        data: function () {
            return {
                search: null,
                statuses: [],
                filters: {
                    status_id: null
                }
            }
        },
        created: function () {
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                OrderResource.getOrderStatuses().then(res => {
                    this.statuses = res.data;
                })
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
