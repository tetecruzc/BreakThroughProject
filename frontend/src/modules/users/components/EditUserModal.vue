.<template>
    <b-modal centered v-model="show"  hide-footer>        
          <template #modal-title>
           Editar al usuario {{user.name}} {{user.lastname}}
          </template>
            <b-avatar class="profile-avatar " :style="getGenderColor(user.gender)" :text="getNameInitials(user.name,user.lastname)" size="4rem"></b-avatar>
            <div class="form-group">
                <b-icon icon="envelope" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
                <div class="form_group--input field">
                  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="user.email"/>
                  <label for="name" class="form__label">Email</label>
                </div>
            </div>
            <div class="form-group">
                <b-icon icon="telephone-inbound" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
                <div class="form_group--input field">
                  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="user.phone"/>
                  <label for="name" class="form__label">Phone</label>
                </div>
            </div>
            <div class="form-group">
                <b-icon icon="person-circle" class="icon-dark" aria-hidden="true" ></b-icon>
                <b-dropdown :text="getUserProfileName()" variant="outline" >
                  <b-dropdown-item  href="#" v-for="(profile,i) in profiles" :key="i" @click="changeProfileName(profile.id_profile)">{{profile.name_profile}}</b-dropdown-item>
                </b-dropdown>
            </div>
            <b-button class="button-primary mt-5" block @click="editUser()">Actualizar</b-button>
    </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {User} from '../interfaces/users.interface'
import {getGenderColor,getNameInitials} from '../../../utils/rules'
import { Profile } from '../../profiles/interface/profiles.interface';
import {users} from '../../../store/namespaces';
import UsersMethods from '../../..//store/users/methods/users.methods';

@Component
export default class EditUserModal extends Vue {
    @Prop() user!: any;
    @Prop() users!: any;
    @Prop() profiles!: Profile[];
    @Prop() showModal!: boolean
    show = false;
    $bvToast: any;

    @Watch('showModal')
    renderModal(){
        this.show = this.showModal
    }
    
  getGenderColor(gender: string){
    return getGenderColor(gender);
  }
  getNameInitials(name: string, lastname: string) : string{
    return getNameInitials(name,lastname)
  } 
  getUserProfileName() : string{  
    let profile : Partial<Profile> = {} ;
    if (this.user.profile !== 0) {
      profile = this.profiles.find(el => el.id_profile === this.user.profile)!;
    }
    return profile.name_profile!;
  }

  changeProfileName(profileId: number): void{
    this.user.profile =  profileId;
  }

  async editUser(){
    this.show = !this.show;
    let updatedUser : Partial<User> = {};
     let currentUser = this.users.find((el: { id: any; }) => el.id === this.user.id);
    if (this.user.email !== "")  {
      updatedUser.email = this.user.email
      currentUser!.email = this.user.email
    };
    if (this.user.phone !== -1)  {
      updatedUser.phone = this.user.phone.toString();
      currentUser!.phone = this.user.phone.toString();
    };
    if (this.user.profile !== 0) {
       updatedUser.id_profile = this.user.profile;
       currentUser!.id_profile = this.user.profile;
       updatedUser.name_profile = this.getUserProfileName();
       currentUser.name_profile = this.getUserProfileName();
    }
    let updated = await this.updateUser({id: this.user.id,updatedUser: updatedUser});
    if (updated) {
      this.showToast('success',`Edición de usuario ${this.user.name}`,'Usuario actualizado exitosamente')
      }
    else this.showToast('danger',`Edición de usuario ${this.user.name}`,'Ha ocurrido un error actualizando el usuario')
  }

  showToast(variant: string,body: string, header: string){
      this.$bvToast.toast(header, {
          title: body,
          variant: variant,
          solid: true
      });
  }

    @users.Action(UsersMethods.actions.UPDATE_USER)
    updateUser!: (user: any) => boolean;
}
</script>

<style>

</style>