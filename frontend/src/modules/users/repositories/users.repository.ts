import {User} from '../interfaces/users.interface';
import { AxiosRepository } from '../../../http/axios.repository';

const RESOURCE = 'QueryUsersList';

export class UsersRepository extends AxiosRepository {
   constructor() {
        super(RESOURCE);
    } 

    public async getUsers(): Promise<User[]> {
        return super.getAll('QueryUsersList');
    }

    public async updateUser(id: number, data: {}): Promise<{message: string}> {
        return super.put('UpdateUser',id,data);
    }

}

export const usersRepository = new UsersRepository();

