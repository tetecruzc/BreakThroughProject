import { Module } from 'vuex';
import RequestsTypes from './methods/requests.methods';
import { RequestsStateInterface } from './interfaces/requests.state.interface';
import { REQUESTS_EMPTY_STATE } from './requests.state';
import { requestsRepository } from '@/modules/requests/repositories/requests.repository';
import { Table } from '../../modules/table/interfaces/table.interface'

// TODO ESTO SE DEBERIA TIPAR, ES DECIR, EN VEZ DE Array<any> = Requests[]
const requests: Module<RequestsStateInterface, any> = {
    namespaced: true,
    state: REQUESTS_EMPTY_STATE,
    getters: {
        [RequestsTypes.getters.GET_HEADER_PRIMARY](state): Array<any> {
            return state.tableRequests.headerPrimary;
        },
        [RequestsTypes.getters.GET_HEADER_SECONDARY](state): Array<any> {
            return state.tableRequests.headerSecondary;
        },
        [RequestsTypes.getters.GET_ITEMS](state): Array<any> {
            return state.tableRequests.items;
        },
        [RequestsTypes.getters.GET_TOTAL_REQUESTS](state): number {
            return state.totalRequests;
        }
    },
    mutations:{
        [RequestsTypes.mutations.SET_REQUESTS](state, requests: Table): void {
            state.tableRequests.headerPrimary = requests.headerPrimary
            state.tableRequests.headerSecondary = requests.headerSecondary
            state.tableRequests.items = requests.items
        },
        [RequestsTypes.mutations.SET_TOTAL_REQUESTS](state, total_requests: number): void {
            state.totalRequests = total_requests;
        }
    },
    actions:{
        async [RequestsTypes.actions.FETCH_ALL_REQUESTS]({ commit }): Promise<boolean> {
            try {
                
                const requests: any = await requestsRepository.getRequests(); 
                console.log(requests)
                commit(RequestsTypes.mutations.SET_REQUESTS, requests);
              //commit(RequestsTypes.mutations.SET_TOTAL_REQUESTS, requests.items.length);         
                return true;
            } catch (e) {
                return false;
            }
        }
    }

}

export default requests;