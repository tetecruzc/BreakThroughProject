import { UsersStateInterface } from './interfaces/users.state.interface';


export const USERS_EMPTY_STATE: UsersStateInterface = {
    users: [],
    totalUsers: 0,
    routes: [],
    activitiesRoutes: {
        url_route:'',
        name_route: '',
        component: ''
    },
    activitiesSubRoutes: {
        url_route:'',
        name_route: '',
        component: ''
    }
};
