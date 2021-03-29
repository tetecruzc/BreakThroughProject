import { Module } from 'vuex';
import UsersTypes from './methods/users.methods';
import { UsersStateInterface } from './interfaces/users.state.interface';
import { USERS_EMPTY_STATE } from './users.state';
import { User } from '@/modules/users/interfaces/users.interface';
import { Route } from '@/modules/routes/interfaces/routes.interface'
import { usersRepository } from '@/modules/users/repositories/users.repository';


const users: Module<UsersStateInterface, any> = {
    namespaced: true,
    state: USERS_EMPTY_STATE,
    getters: {
        [UsersTypes.getters.GET_ALL_USERS](state): User[] {
            return state.users;
        },
        [UsersTypes.getters.GET_TOTAL_USERS](state): number {
            return state.totalUsers;
        },
        [UsersTypes.getters.GET_USER_ROUTES](state): Route[] {
            return state.routes;
        },
        [UsersTypes.getters.GET_ACTIVITIES_USER_ROUTES](state): Route{
            return state.activitiesRoutes;
        },
        [UsersTypes.getters.GET_ACTIVITIES_USER_SUBROUTES](state): Route{
            return state.activitiesSubRoutes;
        }
    },
    mutations:{
        [UsersTypes.mutations.SET_USERS](state, users: User[]): void {
            state.users = users;
        },
        [UsersTypes.mutations.SET_TOTAL_USERS](state, total: number): void {
            state.totalUsers = total;
        },
        [UsersTypes.mutations.SET_USER_ROUTES](state, routes: Route[]): void {
            state.routes = routes;
        },
        [UsersTypes.mutations.SET_ACTIVITIES_USER_ROUTES](state,routes: Route): void {
            state.activitiesRoutes= routes
        },
        [UsersTypes.mutations.SET_ACTIVITIES_USER_SUBROUTES](state,routes: Route): void {
            state.activitiesSubRoutes= routes
        }
    },
    actions:{
        async [UsersTypes.actions.FETCH_ALL_USERS]({ commit }): Promise<boolean> {
            try {
               // const filter: Filter = new Filter(data);
                const users: User[] = await usersRepository.getUsers(); // le paso filter
                // if users.error
                    commit(UsersTypes.mutations.SET_USERS, users);
                    commit(UsersTypes.mutations.SET_TOTAL_USERS, users.length);         
                return true;
            } catch (e) {
                return false;
            }
        },
        async [UsersTypes.actions.UPDATE_USER]({ commit }, user : any): Promise<boolean> {
            try {
               // const filter: Filter = new Filter(data);
                const success = await usersRepository.updateUser(user.id, user.updatedUser); 
                if (success.message){
                    return true;
                }       
                return false;
            } catch (e) {
                return false;
            }
        },
        async [UsersTypes.actions.FETCH_USER_ROUTES]({ commit }, id : number): Promise<boolean> {
            try {
                const response : Route[] = await usersRepository.getUserRoutes(id);  
                commit(UsersTypes.mutations.SET_USER_ROUTES,response);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [UsersTypes.actions.FETCH_ACTIVITIES_USER_ROUTES]({ commit }, id : number): Promise<boolean> {
            try {
                const response : Route = await usersRepository.getUserActivitiesRoutes(id); 
                commit(UsersTypes.mutations.SET_ACTIVITIES_USER_ROUTES,response);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [UsersTypes.actions.FETCH_ACTIVITIES_USER_SUBROUTES]({ commit }, id : string): Promise<boolean> {
            try {
                const response : Route = await usersRepository.getUserActivitiesSubRoutes(id); 
                commit(UsersTypes.mutations.SET_ACTIVITIES_USER_SUBROUTES,response);
                return false;
            } catch (e) {
                return false;
            }
        },
        async [UsersTypes.actions.SAVE_VIEW]({ commit }, id : string): Promise<boolean> {
            try {
                //const response : Route = await usersRepository.getUserActivitiesSubRoutes(id); 
                //commit(UsersTypes.mutations.SET_ACTIVITIES_USER_SUBROUTES,response);
                return false;
            } catch (e) {
                return false;
            }
        }
    }

}

export default users;