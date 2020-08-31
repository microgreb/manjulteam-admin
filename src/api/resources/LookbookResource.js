import ApiSettings from '../ApiSettings'

/**
 *  API Resource
 */
export default {
    /**
     * Get Areas
     * @returns {*}
     */
    getLookbooks: function (filters = null) {
        return ApiSettings.get('lookbooks', filters)
    },

    getLookbook: function (lookbook_id) {
        return ApiSettings.get('lookbooks/' + lookbook_id)
    },

    updateLookbook: function (lookbook_id, data) {
        return ApiSettings.patch('lookbooks/' + lookbook_id, data)
    },

    storeLookbook: function (data) {
        return ApiSettings.post('lookbooks', data)
    },

    removeLookbookImage: function (image_id) {
        return ApiSettings.delete('lookbook-images/' + image_id);
    },

    deleteLookbook: function(lookbook_id) {
        return ApiSettings.delete('lookbooks/' + lookbook_id);
    },
}
