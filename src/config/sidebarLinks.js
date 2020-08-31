export default [
    {
        name: 'Организация',
        icon: 'el-icon-suitcase-1',
        subcategories: [

            {
                name: 'Торговые Объекты',
                redirectTo: '/management/stores',
                icon: 'el-icon-location'
            },

            {
                name: 'Сотрудники',
                redirectTo: '/management/employees',
                icon: 'el-icon-location'
            },

        ]
    },


    {
        name: 'Меню',
        icon: 'el-icon-shopping-bag-1',
        subcategories: [
            {
                name: 'Калькуляционная Карта',
                redirectTo: '/products/products',
                icon: 'el-icon-location'
            },
            {
                name: 'Категории',
                redirectTo: '/products/categories',
                icon: 'el-icon-location'
            },
            {
                name: 'Ингредиенты',
                redirectTo: '/products/ingredients',
                icon: 'el-icon-location'
            },
        ]
    },


    {
        name: 'Стастистика',
        icon: 'el-icon-shopping-bag-1',
        subcategories: [
            {
                name: 'Продажи',
                redirectTo: '/statistics/orders',
                icon: 'el-icon-money'
            },
        ]
    },

]
