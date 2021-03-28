export default {
    mutations: {
        SET_REQUESTS: 'SET_REQUESTS',
        SET_TOTAL_REQUESTS: 'SET_TOTAL_REQUESTS',
    },
    getters: {
        GET_HEADER_PRIMARY: 'GET_HEADER_PRIMARY',
        GET_HEADER_SECONDARY: 'GET_HEADER_SECONDARY',
        GET_ITEMS: 'GET_ITEMS',
        GET_TOTAL_REQUESTS: 'GET_TOTAL_REQUESTS',
    },
    actions: {
        FETCH_ALL_REQUESTS: 'FETCH_ALL_REQUESTS'
    },
};