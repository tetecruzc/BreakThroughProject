export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    gender: string;
    phone: string;
    id_profile: number;
    name_profile: string;
    roles: Array<Object>; //cambiar
    username: string;
    company: Object; // cambiar
    geo: Object; //cambiar
    error: string;
};
