import {Profile} from '../interface/profiles.interface';
import { AxiosRepository } from '../../../http/axios.repository';

const RESOURCE = 'profiles';

export class ProfilesRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    public async getProfiles(): Promise<Profile[]> {
        return super.getAll(RESOURCE);
    }

}

export const profilesRepository = new ProfilesRepository();

