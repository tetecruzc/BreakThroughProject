import 'pg-promise';
import logger from '../../../utils/logger.js';

export default class RolesPostgresRepository {
    dbClient
    tableName = "roles"

    constructor(dbClient) {
        this.dbClient = dbClient;
    }

    async getRoles(profileId){
            logger.debug({
                message:  '[RolesPostgresRepository] Obteniendo listado de roles del perfil Id: '+ profileId
            });
            const queryRes = await this.dbClient.query(`SELECT name_role from profile_role WHERE id_profile = ${profileId}`)
            if (queryRes === ''){
                throw new Error();
            }
        return queryRes.rows;  
    }
}