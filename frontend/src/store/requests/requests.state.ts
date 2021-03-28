import { RequestsStateInterface } from './interfaces/requests.state.interface';


export const REQUESTS_EMPTY_STATE: RequestsStateInterface = {
    requests: [],
    tableRequests:{headerPrimary: [], headerSecondary:[], items:[]},
    totalRequests: 0
};
