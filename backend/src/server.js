import express from 'express';
import cookieParser from "cookie-parser";
import http from "http";
import logger from './utils/logger.js';
import dotenv from 'dotenv';
import cors from 'cors';
import dbClient from './db_connex/db_postgres_connex.js';
dotenv.config();

import UsersPostgresRepository from "./modules/users/repository/database/users.repository.js";
import UsersUsecase from "./modules/users/services/users.service.js";
import UsersController from "./modules/users/controllers/http/users.controller.js";
import RolesPostgresRepository from "./modules/roles/repository/roles.repository.js";
import RolesUsecase from "./modules/roles/services/roles.service.js";
import RolesController from "./modules/roles/controllers/roles.controllers.js";
import ProfilesPostgresRepository from "./modules/profile/repositories/profile.repository.js";
import ProfileUsecase from "./modules/profile/services/profile.service.js";
import ProfilesController from "./modules/profile/controllers/profile.controller.js";
/** 
 * 
 * User module
 * 
**/
const usersRepository = new UsersPostgresRepository(dbClient);
const usersUsecase = new UsersUsecase(usersRepository);
const usersController = new UsersController(usersUsecase);
/** 
 * 
 * Role module
 * 
**/
const rolesRepository = new RolesPostgresRepository(dbClient);
const rolesUsecase = new RolesUsecase(rolesRepository);
const rolesController = new RolesController(rolesUsecase);
/** 
 * 
 * Profile module
 * 
**/
const profilesRepository = new ProfilesPostgresRepository(dbClient);
const profilesUsecase = new ProfileUsecase(profilesRepository);
const profilesController = new ProfilesController(profilesUsecase);


const app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.set('port', port);
app.use(cors());

/**
 * 
 * Register routes
 * 
**/
let userRouter = usersController.registerRoutes(app, express);
let roleRouter = rolesController.registerRoutes(app, express);
let profileRouter = profilesController.registerRoutes(app, express);

app.use('/stephanie/bktp',[userRouter,roleRouter,profileRouter]);

/**
 * 
 * Create HTTP server.js.
 * 
**/
var server = http.createServer(app);

/**
 * 
 * Listen on provided port
 * 
**/
app.listen(port, () => {
    try{
        logger.info({
            message: `Servidor corriendo en el puerto ${port}`
        });
    }
    catch(error){
        logger.error({
            message: `Error corriendo el servidor`
        });
    }
});


/**
 * 
 * Errors
 * 
**/
app.use((req,res,next)=>{
     const error = new Error('NOT FOUND');
     error.status = 404;
     next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    logger.error({
        message:  error.status+'- '+error.message
    });
    res.json({
        error: {
            message: error.message
        }
    })
});