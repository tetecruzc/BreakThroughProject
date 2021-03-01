export interface RepositoryInterface {
    get(resource: string,id: number): Promise<any>;
    getAll(resource: string): Promise<any>;
    post(resource: string,data: {}): Promise<any>;
    put(resource: string,id: number, data: {}): Promise<any>;
    delete(resource: string,id: number): Promise<any>;
}