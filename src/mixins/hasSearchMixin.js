import {EventBus} from "../bootstrap/EventBus";

export default {
    data: function () {
        return {
            search: ''
        }
    },
    created: function () {
        this.registerSearchEvent();
    },
    methods: {
        registerSearchEvent: function () {
            EventBus.$on('search', search => {
                this.search = search;
            })
        },
        productSearch: function (products) {
            return products.filter(data => !this.search || data.code.toLowerCase().includes(this.search.toLowerCase()) || data.name.toLowerCase().includes(this.search.toLowerCase()));
        },
        ordersSearch: function (orders) {
            return orders.filter(data => !this.search ||
                data.name.toLowerCase().includes(this.search.toLowerCase()) ||
                data.status.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
}
