import { Module } from 'vuex';
import UsersTypes from './methods/users.methods';
import { UsersStateInterface } from './interfaces/users.state.interface';
import { USERS_EMPTY_STATE } from './users.state';
import { User } from '@/modules/users/interfaces/users.interface';
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
    },
    mutations:{
        [UsersTypes.mutations.SET_USERS](state, users: User[]): void {
            state.users = users;
        },
        [UsersTypes.mutations.SET_TOTAL_USERS](state, total: number): void {
            state.totalUsers = total;
        },
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
    }

}

export default users;