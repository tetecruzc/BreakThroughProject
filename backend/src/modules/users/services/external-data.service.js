import axios from 'axios';
import logger from '../../../utils/logger.js';

export default class ExternalUsersInfoUsecase {
     url = 'https://jsonplaceholder.typicode.com/users';

     constructor() {}

    async getInfo() {
        try {
            const response = await axios.get(this.url);
            return response.data;
        } catch (error) {
            logger.error({
                message: `Ha ocurrido un problema encontrando la información externa de los usuarios. Error: `+ error.response.status
            });
            return new Error();
        }    
    }
}