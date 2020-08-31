import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {
    /**
     * Get Areas
     * @returns {*}
     */
    getOrders: function () {
        return ApiSettings.get('orders')
    },

    getFinishedOrders: function (filters) {
        return ApiSettings.get('orders/finished', filters)
    },

    getOfflineOrders: function () {
        return ApiSettings.get('orders/offline')
    },

    getActiveOrders: function (filters) {
        return ApiSettings.get('orders/active', filters)
    },

    getOrderStatuses: function () {
        return ApiSettings.get('orders/statuses')
    },

    setOrderStatus: function (order, status) {
        return ApiSettings.patch('orders/' + order.id + '/statuses/' + status.id)
    },

    setDeliveryNumber: function (orderDelivery, number) {
        return ApiSettings.patch('order-deliveries/' + orderDelivery.id + '/number/', {np_delivery_number: number});
    },

    createOfflineOrder: function (data) {
        return ApiSettings.post('orders/offline', {order_items: data})
    },
}
