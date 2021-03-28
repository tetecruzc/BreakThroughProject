// TODO ESTO SE DEBERIA TIPAR, ES DECIR, EN VEZ DE Array<any> = Requests[]

import {Route} from '../../routes/interfaces/routes.interface';
import { AxiosRepository } from '../../../http/axios.repository';

const RESOURCE = 'requests';

export class RequestsRepository extends AxiosRepository {
   constructor() {
        super(RESOURCE);
    } 

    public async getRequests(): Promise<Array<any>> {
        return super.getAll();
    }

}

export const requestsRepository = new RequestsRepository();

