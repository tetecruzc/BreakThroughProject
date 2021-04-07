export interface Table{
    headerPrimary: Array<any>,
    headerSecondary: Array<any>,
    items: Array<any>,
    standarts: Array<any>,
    views: Array<{name: string, headerSecondary: Array<any>, headerPrimary: Array<any>}>
}

