import 'pg-promise';
import logger from '../../../../utils/logger.js';

export default class UsersPostgresRepository {
    dbClient
    tableName = "users"

    constructor(dbClient) {
        this.dbClient = dbClient;
    }

    async getUsers(params){
            logger.debug({
                message:  '[UsersPostgresRepository] Obteniendo información de los usuarios...'
            });
            let query = `SELECT users.id_user AS id, users.name_user AS name, users.lastname AS lastname, users.gender AS gender, users.email AS email, users.phone AS phone, user_profile.id_profile AS id_profile, user_profile.name_profile AS name_profile
            FROM ms_users_list AS users, lnk_profile AS user_profile
            WHERE users.id_profile = user_profile.id_profile`
            let queryRes = [];
            for(var key in params) {  
                query = query + ` AND LOWER(users.${key}) LIKE LOWER('%${params[key]}%')`
            }
            
            queryRes =  await this.dbClient.query(query);
            
            if (queryRes === ''){
                throw new Error();
            }
        return queryRes.rows;     
    }

    async getUserRoutes(profileId){
        logger.debug({
            message:  '[UsersPostgresRepository] Obteniendo listado de rutas del perfil Id: '+ profileId
        });
        const queryRes = await this.dbClient.query(`SELECT id_route,name_route,url_route,icon FROM routes WHERE id_profile = ${profileId}`)
        if (queryRes === ''){
            throw new Error();
        }
        else {
            for (var i=0;i<queryRes.rows.length;i++){  
                if (queryRes.rows[i].url_route === null)  {       
                var subQuery = await this.dbClient.query(`SELECT name_route,url_route FROM routes WHERE id_route_route = ${queryRes.rows[i].id_route}`)          
                queryRes.rows[i].submenu = subQuery.rows}
            }
        }
        return queryRes.rows;  
    }

    async getRoles(profileId){
            logger.debug({
                message:  '[UsersPostgresRepository] Obteniendo listado de roles del perfil Id: '+ profileId
            });
            const queryRes = await this.dbClient.query(`SELECT name_role from profile_role WHERE id_profile = ${profileId}`)
            if (queryRes === ''){
                throw new Error();
            }
        return queryRes.rows;  
    }

    async updateUser(userBody,userId){
            logger.debug({
                message:  '[UsersPostgresRepository] Actualizando información de usuario '+userId
            });
            let query = ''
            if (userBody.email) query = ` email = '${userBody.email}'`
            if (query !== '' && userBody.id_profile) query = query + ','
            if (userBody.id_profile) query = query +` id_profile = ${userBody.id_profile}`
            if (query !== '' && userBody.phone) query = query + ','
            if (userBody.phone) query = query + ` phone = ${userBody.phone}`
            const queryRes = await this.dbClient.query(`UPDATE ms_users_list SET ${query} where id_user=$1 RETURNING id_user`,[
                userId
            ]);
            if (!queryRes.rows[0].id_user || queryRes === ''){
                throw new Error();
            }
        return queryRes.rows;
    }

}