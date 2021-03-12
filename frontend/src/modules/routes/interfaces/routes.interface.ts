export interface Route {
    url_route: string,
    name_route: string,
    icon?: string,
    submenu?: Route[],
    message? : string,
    component: string,
    children? : Route[],
    pendings? : number;
    active? : boolean
}