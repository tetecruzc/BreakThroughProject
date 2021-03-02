
export default class RolesUsecase {
    rolesRepository

    constructor(repository) {
      this.rolesRepository = repository;
    }
  

    async getRoles(profileId){
        return  await this.rolesRepository.getRoles(profileId);
    }

}
