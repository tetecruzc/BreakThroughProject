export interface Column{

}

export interface UserField{
    key?: string;
    label?: string;
    selected?: boolean;
    showColumn?: boolean;
    sortable? : boolean;
}

export interface View{
    name: string;
    columns: Array<UserField>;
}