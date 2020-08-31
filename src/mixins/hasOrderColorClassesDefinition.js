export default {
    methods: {
        getOrderStatusColorClass: function (order) {
            switch (order.status_id) {
                case 1:
                    return 'order-text-new';
                case 2:
                    return 'order-text-delivery';
                case 3:
                    return 'order-text-done';
                case 50:
                    return 'order-text-draft';
            }
        },
        getOrderTypeColorClass: function (order) {
            switch (order.order_type_id) {
                case 1:
                    return 'order-text-online';
                case 2:
                    return 'order-text-offline';
            }
        },
        getOrderBgStatusColorClass: function (order, status) {
            if (status.id !== order.status_id) {
                return 'order-bg-default';
            }

            switch (order.status_id) {
                case 1:
                    return 'order-bg-new';
                case 2:
                    return 'order-bg-delivery';
                case 3:
                    return 'order-bg-done';
                case 50:
                    return 'order-bg-draft';
            }
        },
    }
}
