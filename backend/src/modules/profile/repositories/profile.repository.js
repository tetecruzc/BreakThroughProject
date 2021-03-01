import 'pg-promise';
import logger from '../../../utils/logger.js';

export default class ProfilesPostgresRepository {
    dbClient
    tableName = "profiles"

    constructor(dbClient) {
        this.dbClient = dbClient;
    }

    async getProfiles(){
            logger.debug({
                message:  '[ProfilesPostgresRepository] Obteniendo listado de perfiles'
            });
            const queryRes = await this.dbClient.query(`select * from lnk_profile`)
            if (queryRes === ''){
                throw new Error();
            }
        return queryRes.rows;  
    }
}