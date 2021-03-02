import ExternalUsersInfoUsecase from './external-data.service.js';

export default class UsersUsecase {
    userRepository
    ExternalUsersInfoUsecase = new ExternalUsersInfoUsecase();

    constructor(repository) {
      this.userRepository = repository;
    }
  
    async getUsers(params) {
            let users = await this.userRepository.getUsers(params);
            for (const user of users) {
              user.roles =  await this.userRepository.getRoles(user.id_profile);
            }
            let userExternalInfo = await this.ExternalUsersInfoUsecase.getInfo();
            users.forEach(function(user){
                let userExists = userExternalInfo.filter(el => user.email === el.email)[0];
                if (userExists !== undefined){
                  user.username = userExists.username
                  user.company = userExists.company
                  user.geo = userExists.address.geo
                } 
                userExists = undefined        
            }); 
            return users;
    }

    async updateUser(userBody,userId){
      await this.userRepository.updateUser(userBody,userId);
    }

    async getRoles(profileId){
        return  await this.userRepository.getRoles(profileId);
    }

}


