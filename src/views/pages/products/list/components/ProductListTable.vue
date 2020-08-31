<template>
    <section class="product-list-table p-l-sides">
        <el-table class="page-table-default"
                  :data="products">
            <el-table-column
                    prop="date"
                    label="Артикул"
                    sortable>
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="Название"
                    sortable>
            </el-table-column>

            <el-table-column
                    prop="price"
                    label="Цена"
                    sortable>
            </el-table-column>


            <el-table-column
                    width="50"
                    prop="other"
                    label="">
            </el-table-column>
        </el-table>
    </section>

</template>

<script>
    export default {
        props: ['products'],
        name: 'ProductListTable',
        data: function () {
            return {}
        }
    }
</script>
