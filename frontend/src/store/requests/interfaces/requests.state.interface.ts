//import { Requests } from "@/modules/users/interfaces/users.interface";

export interface RequestsStateInterface {
    requests: Array<any>;
    tableRequests: {
        headerPrimary: Array<any>,
        headerSecondary: Array<any>,
        items: Array<any>
    },
    totalRequests: number;
}
