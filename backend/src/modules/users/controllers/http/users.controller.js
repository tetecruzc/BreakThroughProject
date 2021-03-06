import logger from '../../../../utils/logger.js';

export default class UsersController {
    userUsecase

    constructor(usecase) {
        this.userUsecase = usecase;
    }

    async getUsers(req, res, usecase) {
        try{
            const params = req.query;
            const tasks = await usecase.getUsers(params);
            res.status(200).json(tasks);
        }
        catch(error){
            logger.error({
                message: 'Ha ocurrido un error obteniendo el listado de usuarios'
            });
            res.status(500).send({
                error: 'Ha ocurrido un error obteniendo el listado de usuarios'
            })
        } 
    }

    async getRoles(req, res, usecase) {
        const profileId = req.params.profileId;
        try{          
            const tasks = await usecase.getRoles(profileId);
            res.status(200).json(tasks);
        }
        catch(error){
            logger.error({
                message:  `Ha ocurrido un error obteniendo los roles del perfil ${profileId}`
            });
            res.status(500).send({
                error: `Ha ocurrido un error obteniendo los roles del perfil ${profileId}`
            })
        }

    }

    async updateUser(req, res, usecase) {
        const userId = req.params.userId;
        const user = req.body;
        try{
            const updatedUser = await usecase.updateUser(user,userId);
            res.status(200).json({
                message:  `Usuario ${userId} actualizado`
            });
        }catch(error){
            logger.error({
                message:  `Ha ocurrido un error actualizando el usuario ${userId}`
            });
            res.status(500).send({
                error: `Ha ocurrido un error actualizando el usuario ${userId}`
            })
        }

    }

    registerRoutes(app, routerFactory) {
        const subRouter = routerFactory.Router();

        const getUsersController = (req, res) => this.getUsers(req, res, this.userUsecase);
        subRouter.get('/QueryUsersList', getUsersController);

        const getRolesController = (req, res) => this.getRoles(req, res, this.userUsecase);
        subRouter.get('/roles/:profileId', getRolesController);

        const updateUserController = (req, res) => this.updateUser(req, res, this.userUsecase);
        subRouter.put('/UpdateUser/:userId', updateUserController);

        return subRouter;
    } 
}