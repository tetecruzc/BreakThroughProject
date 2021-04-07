//import { Requests } from "@/modules/users/interfaces/users.interface";

import { Table } from "@/modules/table/interfaces/table.interface";

export interface RequestsStateInterface {
    requests: Array<any>;
    tableRequests: Table
    totalRequests: number;
    views: Array<{ name: string, headers: Array<any>}> // Array de vistas...
}
