export default {
    mutations: {
        SET_REQUESTS: 'SET_REQUESTS',
        SET_REQUESTS_VIEWS: 'SET_REQUESTS_VIEWS',
        SET_TOTAL_REQUESTS: 'SET_TOTAL_REQUESTS',
    },
    getters: {
        GET_HEADER_PRIMARY: 'GET_HEADER_PRIMARY',
        GET_HEADER_SECONDARY: 'GET_HEADER_SECONDARY',
        GET_ITEMS: 'GET_ITEMS',
        GET_VIEWS: 'GET_VIEWS',
        GET_STANDARTS: 'GET_STANDARTS',
        GET_TOTAL_REQUESTS: 'GET_TOTAL_REQUESTS',
    },
    actions: {
        FETCH_ALL_REQUESTS: 'FETCH_ALL_REQUESTS',
        SAVE_REQUEST_VIEW: 'SAVE_REQUEST_VIEW',
        FETCH_REQUEST_VIEWS: 'FETCH_REQUEST_VIEWS'
    },
};
