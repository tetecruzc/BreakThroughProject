import {User} from '../interfaces/users.interface';
import {Route} from '../../routes/interfaces/routes.interface';
import { AxiosRepository } from '../../../http/axios.repository';

const RESOURCE = 'QueryUsersList';

export class UsersRepository extends AxiosRepository {
   constructor() {
        super(RESOURCE);
    } 

    public async getUsers(): Promise<User[]> {
        return super.getAll('QueryUsersList');
    }

    public async getUserRoutes(id: number): Promise<Route[]> {
        return super.get('users/routes',id);
    }

    public async getUserActivitiesRoutes(id: number): Promise<Route>{
        return super.get('users/routes/activities',id)
    }

    public async getUserActivitiesSubRoutes(id: string): Promise<Route>{
        return super.getByMultiplesIds('users/routes/activities',id)
    }

    public async updateUser(id: number, data: {}): Promise<{message: string}> {
        return super.put('UpdateUser',id,data);
    }

}

export const usersRepository = new UsersRepository();

