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

    async getUserRoutes(req, res, usecase) {
        try{
            const profileId = req.params.profileId;
           // const tasks = await usecase.getUserRoutes(profileId);
           // res.status(200).json(tasks);
           res.status(200).json(
            [
                {
                    id_route: 1,
                    name_route: "Resumen Principal",
                    icon: 'bookmark-check',
                    url_route: 'resume',
                    component: 'Resume.vue'
                },
                {
                    id_route: 2,
                    name_route:"Actividades",
                    url_route: 'activities',
                    icon: 'calendar3',
                    component: 'Activities.vue',
                    submenu: [
                        {
                            id_route: 3,
                            name_route: "Actividad ATC",
                            url_route: 'atc_activity',
                            component: 'Activity',
                            pending: 40,
                        },
                        {
                            id_route: 4,
                            name_route: "Actividad 2",
                            url_route: 'activity_2',
                            component: 'Activity',
                            pending: 15
                        }
                    ]
                },
                {
                    id_route: 5,
                    name_route: "Mis métricas",
                    icon: 'clipboard-data',
                    url_route: 'prueba',
                    component: 'Sent.vue'
                },
            ]
           )
        }
        catch(error){
            logger.error({
                message: 'Ha ocurrido un error obteniendo las rutas del ususario'
            });
            res.status(500).send({
                error: 'Ha ocurrido un error obteniendo las rutas del ususario'
            })
        } 
    }

    async getActivitiesSubRoutes(req,res,usecase){
        try{
            let response = {}
            if (parseInt(req.params.subActivityId) === 7){
                response= {
                    "id_route": 7,
                    "name_route": "Mis pendientes",
                    "url_route": "pendings",
                    "component": "ActivityPendings",
                    "pending": 40,
                    "children": [
                        {
                            "id_route": 12,
                            "name_route": "ATC Chile",
                            "pendings": 15,
                            "url_route": null,
                            "component": "ActivityPendings"
                        },
                        {
                            "id_route": 13,
                            "name_route": "ATC Perú",
                            "pendings": 8,
                            "url_route": null,
                            "component": "ActivityPendings",
                        }
                    ]
                }
            }
            else if (parseInt(req.params.subActivityId) === 9){
                response = {
                    "id_route": 9,
                    "name_route": "Pool de pendientes",
                    "url_route": "pool-pendings",
                    "component": "ActivityPendings",
                    "pending": 53,
                    "children": [
                        {
                            "id_route": 12,
                            "name_route": "ATC Chile",
                            "pendings": 4,
                            "url_route": null,
                            "component": "ActivityPendings"
                        },
                        {
                            "id_route": 13,
                            "name_route": "ATC Perú",
                            "pendings": 12,
                            "url_route": null,
                            "component": "ActivityPendings",
                        }
                    ]
                }
            }
            res.status(200).json(
                response
            )
        }
        catch(error){
            logger.error({
                message: 'Ha ocurrido un error obteniendo las rutas del ususario'
            });
            res.status(500).send({
                error: 'Ha ocurrido un error obteniendo las rutas del ususario'
            })
        }
    }

    async getActivitiesRoutes(req, res, usecase) {
        try{
            let response = {}
           if (parseInt(req.params.activityId)  === 3) {
               response = {
                id_route: 3,
                name_route: "Actividad ATC",
                url_route: 'atc_activity',
                component: 'Activity',
                pending: 40,
                children:[
                    {
                        id_route: 6,
                        name_route: 'Home',
                        url_route: 'home',
                        component: 'ActivityHome',       
                    },
                    {
                        id_route: 7,
                        name_route: 'Mis pendientes',
                        url_route: 'pendings',
                        component: 'ActivityPendings',  
                        pendings: 40     
                    },
                    {
                        id_route: 8,
                        name_route: 'Pool de pendientes',
                        url_route: 'pool-pendings',
                        component: 'ActivityPoolPendings',
                        pendings: 53       
                    },
                    {
                        id_route: 9,
                        name_route: 'Realizadas',
                        url_route: 'done',
                        component: 'ActivityDone',
                        pendings: 32      
                    },
                    {
                        id_route: 10,
                        name_route: 'Por aprobación',
                        url_route: 'waiting-approval',
                        component: 'ActivityWaitingApproval',
                        pendings: 10    
                    },
                    {
                        id_route: 11,
                        name_route: 'Detenidas',
                        url_route: 'waiting-on-hold',
                        component: 'ActivityOnHold',
                        pendings: 3  
                    }                        
                ]
            }
           }
           else if (parseInt(req.params.activityId) === 4){
            response = {
                id_route: 4,
                name_route: "Actividad 2",
                url_route: 'activity_2',
                component: 'Activity',
                pending: 40,
                children:[
                    {
                        id_route: 6,
                        name_route: 'Home',
                        url_route: 'home',
                        component: 'ActivityHome',       
                    },
                    {
                        id_route: 7,
                        name_route: 'Mis pendientes',
                        url_route: 'pendings',
                        component: 'ActivityPendings',  
                        pendings: 40     
                    },
                    {
                        id_route: 8,
                        name_route: 'Pool de pendientes',
                        url_route: 'pool-pendings',
                        component: 'ActivityPoolPendings',
                        pendings: 53       
                    },
                    {
                        id_route: 9,
                        name_route: 'Realizadas',
                        url_route: 'done',
                        component: 'ActivityDone',
                        pendings: 32      
                    },
                    {
                        id_route: 10,
                        name_route: 'Por aprobación',
                        url_route: 'waiting-approval',
                        component: 'ActivityWaitingApproval',
                        pendings: 10    
                    },
                    {
                        id_route: 11,
                        name_route: 'Detenidas',
                        url_route: 'waiting-on-hold',
                        component: 'ActivityOnHold',
                        pendings: 3  
                    }                        
                ]
            }
           }
           res.status(200).json(
                    response
           )
        }
        catch(error){
            logger.error({
                message: 'Ha ocurrido un error obteniendo las rutas del ususario'
            });
            res.status(500).send({
                error: 'Ha ocurrido un error obteniendo las rutas del ususario'
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

        const updateUserController = (req, res) => this.updateUser(req, res, this.userUsecase);
        subRouter.put('/UpdateUser/:userId', updateUserController);

        const getUserRoutesController = (req, res) => this.getUserRoutes(req, res, this.userUsecase);
        subRouter.get('/users/routes/:profileId', getUserRoutesController);
        
        const getActivitiesRoutesController = (req, res) => this.getActivitiesRoutes(req, res, this.userUsecase);
        subRouter.get('/users/routes/activities/:activityId', getActivitiesRoutesController);

        const getActivitiesSubRoutesController = (req, res) => this.getActivitiesSubRoutes(req, res, this.userUsecase);
        subRouter.get('/users/routes/activities/:activityId/:subActivityId', getActivitiesSubRoutesController);

        
        return subRouter;
    } 
}