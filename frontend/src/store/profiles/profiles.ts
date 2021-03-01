import { Module } from 'vuex';
import ProfilesTypes from './methods/profiles.methods';
import { ProfilesStateInterface } from './interfaces/profiles.state.interface';
import { PROFILES_EMPTY_STATE } from './profiles.state';
import { Profile } from '@/modules/profiles/interface/profiles.interface';
import { profilesRepository } from '@/modules/profiles/repositories/profiles.repository';


const users: Module<ProfilesStateInterface, any> = {
    namespaced: true,
    state: PROFILES_EMPTY_STATE,
    getters: {
        [ProfilesTypes.getters.GET_ALL_PROFILES](state): Profile[] {
            return state.profiles;
        },
        [ProfilesTypes.getters.GET_TOTAL_PROFILES](state): number {
            return state.totalProfiles;
        },
    },
    mutations:{
        [ProfilesTypes.mutations.SET_PROFILES](state, profiles: Profile[]): void {
            state.profiles = profiles;
        },
        [ProfilesTypes.mutations.SET_TOTAL_PROFILES](state, total: number): void {
            state.totalProfiles = total;
        },
    },
    actions:{
        async [ProfilesTypes.actions.FETCH_ALL_PROFILES]({ commit }): Promise<boolean> {
            try {
               // const filter: Filter = new Filter(data);
                const profiles: Profile[] = await profilesRepository.getProfiles(); // le paso filter
                // if profiles.error
                    commit(ProfilesTypes.mutations.SET_PROFILES, profiles);
                    commit(ProfilesTypes.mutations.SET_TOTAL_PROFILES, profiles.length);         
                return true;
            } catch (e) {
                return false;
            }
        },
    }

}

export default users;