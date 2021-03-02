import logger from '../../../utils/logger.js';


export default class ProfileUsecase {
    profilesRepository

    constructor(repository) {
      this.profilesRepository = repository;
    }
  
   

    async getProfiles(){
        logger.debug({
            message:  `[ProfilesUseCase]`
        });
        return  await this.profilesRepository.getProfiles();
    }

}
