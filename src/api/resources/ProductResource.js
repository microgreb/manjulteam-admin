import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {
    /**
     * Get Areas
     * @returns {*}
     */
    getProducts: function (filters = null) {
        return ApiSettings.get('products', filters)
    },

    getProduct: function (product_id) {
        return ApiSettings.get('products/' + product_id)
    },

    deleteProduct: function (product_id) {
        return ApiSettings.delete('products/' + product_id)
    },

    updateProduct: function (product_id, data) {
        return ApiSettings.patch('products/' + product_id, data)
    },

    storeProduct: function (data) {
        return ApiSettings.post('products', data)
    },

    getSizes: function () {
        return ApiSettings.get('sizes')
    },

    getProductSizes: function (product) {
        return ApiSettings.get('products/' + product.id + '/sizes')
    },

    setProductVariationQuantity: function (product, size, data) {
        return ApiSettings.patch('products/' + product.id + '/sizes/' + size.id + '/quantity', data)
    },

    removeProductImage: function (image_id) {
        return ApiSettings.delete('product-images/' + image_id);
    },

    getProductByCode: function (code) {
        return ApiSettings.get('products/code/' + code);
    }
}
