import logger from '../../../utils/logger.js';

export default class RolesController {
    roleUsecase

    constructor(usecase) {
        this.roleUsecase = usecase;
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

    registerRoutes(app, routerFactory) {
        const subRouter = routerFactory.Router();

        const getRolesController = (req, res) => this.getRoles(req, res, this.userUsecase);
        subRouter.get('/roles/:profileId', getRolesController);

        return subRouter;
    } 

}