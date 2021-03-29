import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { EnvironmentConstants } from '../constants/enviroment.constants';
import { RepositoryInterface } from './interfaces/repository.interface';

export abstract class AxiosRepository implements RepositoryInterface {
    private URL: string;

    protected constructor(resource: string) {
        this.URL = EnvironmentConstants.HOST;
    } 

    public async getAll(resource? : string): Promise<any> {
        return (await axios.get(this.URL + resource)).data;
    }

    async put(resource: string,id: number, data: {}): Promise<any> {
        return (await axios.put(this.URL + resource + '/' + id, data)).data;
    }

    async get(resource: string,id: number): Promise<any> {
        return (await axios.get(this.URL + resource + '/' + id)).data;
    }

    async getByMultiplesIds(resource: string, id: string): Promise<any> {
        return (await axios.get(this.URL + resource + '/' + id)).data;
    }

    post(resource: string,data: {}): Promise<any> {
        throw new Error('Method not implemented.');
    }

    delete(resource: string, id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public createAuthenticationHeader(data: string): {} {
        return {};
    }
}