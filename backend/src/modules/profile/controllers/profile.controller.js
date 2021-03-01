import logger from '../../../utils/logger.js';

export default class ProfilesController {
    profileUsecase

    constructor(usecase) {
        this.profileUsecase = usecase;
    }

    async getProfiles(req, res, usecase) {
        try{          
            logger.debug({
                message:  `[ProfilesController]`
            });
            const tasks = await usecase.getProfiles();     
            res.status(200).json(tasks);
        }
        catch(error){
            logger.error({
                message:  `Ha ocurrido un error obteniendo los perfiles`
            });
            res.status(500).send({
                error: `Ha ocurrido un error obteniendo los perfiles`
            })
        }
    }

    registerRoutes(app, routerFactory) {
        const subRouter = routerFactory.Router();

        const getProfilesController = (req, res) => this.getProfiles(req, res, this.profileUsecase);
        subRouter.get('/profiles', getProfilesController);

        return subRouter;
    } 

}