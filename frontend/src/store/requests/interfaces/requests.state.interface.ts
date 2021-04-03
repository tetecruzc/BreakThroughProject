//import { Requests } from "@/modules/users/interfaces/users.interface";

import { Table } from "@/modules/table/interfaces/table.interface";

export interface RequestsStateInterface {
    requests: Array<any>;
    tableRequests: Table
    totalRequests: number;
}
