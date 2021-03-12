<template>
  <div class="hello">
        <EditUserModal :showModal="showModal"  :user="user" :profiles="getProfiles" :users="users"/>
        <CreateUserViewModal :showModal="showViewModal" :fields="fields" @createView="createView"/>
      <b-container>
          <b-row class="my-4 " align-h="around">
            <b-col  lg="4" md="4">
              <Box title="Filtros">
                    <div class="form-group">
                        <b-icon icon="filter" class="icon-dark" aria-hidden="true" ></b-icon>
                        <b-dropdown :text="perPage.toString()" variant="outline" >
                          <b-dropdown-item  href="#" v-for="(quantity,i) in [5,10,15]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div class="form-group">
                        <b-icon icon="search" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
                        <div class="form_group--input field">
                          <input type="input" class="form__field" placeholder="Type to Search" name="filter" id='filter' required v-model="filter"/>
                          <label for="name" class="form__label">Type to Search</label>
                        </div>
                    </div>
              </Box>
            </b-col>
            <b-col  lg="4" md="8">
              <Box title="Vistas personalizadas">    
                    <div class="form-group">
                        <b-dropdown :text="currentView.name" variant="outline">
                          <b-dropdown-item  href="#" v-for="(view,i) in views" :key="i" @click="changeView(view)">{{view.name}}</b-dropdown-item>
                        </b-dropdown>
                    </div>
                     <b-button class="button-primary mt-5" block @click="showViewModal = true">Crear vista</b-button>
              </Box>
            </b-col>
          </b-row>
      </b-container>

  <b-container>
      <b-table class="b-table" sort-icon-right :items="getLocalUsers" :fields="currentFields" striped responsive :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template #cell(show_gender)="data">
              <b-avatar class="profile-avatar" :style="getGenderColor(data.item.gender)" :text="getNameInitials(data.item.name,data.item.lastname)" size="2rem"></b-avatar>
      </template>
      <template #cell(show_details)="row">
            <b-icon icon="three-dots-vertical" class="icon-dark" aria-hidden="true" @click="row.toggleDetails"></b-icon>
      </template>
      <template #cell(edit)="data">  
          <b-icon @click="showEditUserModal(data.item)"  icon="pencil-fill" class="icon-dark" aria-label="Help" ></b-icon>
      </template>

      <template #row-details="row">
            <b-card>
                <b-col lg="4" class="my-2 mx-auto">
                  <b-dropdown text="Roles asignados" variant="outline" >
                      <b-dropdown-item  href="#" v-for="(role,i) in row.item.roles" :key="i" >{{role.name_role}}</b-dropdown-item>
                </b-dropdown>
                </b-col>              
                <b-table-simple hover small responsive bordered v-if="row.item.username">
                      <b-thead>
                        <b-tr>
                          <b-th colspan="1"></b-th>
                          <b-th colspan="3">Company</b-th>
                          <b-th colspan="2">Location</b-th>
                        </b-tr>
                        <b-tr>
                          <b-th>Username</b-th>
                          <b-th>Name</b-th>
                          <b-th>CatchPhrase</b-th>
                          <b-th>Bs</b-th>
                          <b-th>Latitud</b-th>
                          <b-th>Longitud</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody>
                              <b-tr v-if="row.item.username">
                                <b-td>{{row.item.username}}</b-td>
                                <b-td>{{row.item.company.name}}</b-td>
                                <b-td>{{row.item.company.catchPhrase}}</b-td>
                                <b-td>{{row.item.company.bs}}</b-td>
                                <b-td>{{row.item.geo.lat}}</b-td>
                                <b-td>{{row.item.geo.lng}}</b-td>
                              </b-tr>
                      </b-tbody>
                </b-table-simple>
            </b-card>
        </template>

      </b-table>  
      <div class="justify-content-center row my-1">
        <b-pagination size="md" :total-rows="this.users.length" :per-page="perPage" v-model="currentPage" />
      </div>
    </b-container> 

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Box from '../../../components/utilities/Box.vue'
import Input from '../../../components//utilities/Input.vue'
import EditUserModal from '../components/EditUserModal.vue';
import CreateUserViewModal from '../components/views/CreateUserViewModal.vue';
import {users,profiles} from '../../../store/namespaces';
import UsersMethods from '../../..//store/users/methods/users.methods';
import ProfilesMethods from '../../..//store/profiles/methods/profiles.methods';
import { User } from '../interfaces/users.interface';
import { View, UserField } from '../interfaces/views.interface';
import { Profile } from '../../profiles/interface/profiles.interface';
import {getGenderColor,getNameInitials} from '../../../utils/rules'

@Component({
  components:{
    Box,
    Input,
    EditUserModal,
    CreateUserViewModal
  }
})
export default class UsersTable extends Vue {
  users: User[] =[];
  fields : UserField[]= [{key:'show_gender', label: 'Genero',selected: false, showColumn: true},{key:'name', label: 'Nombre',sortable: true,selected: false}, {key:'lastname', label: 'Apellido',sortable: true,selected: false},{key:'email', label: 'Email',sortable: true,selected: false},{key:'phone', label: 'Phone',sortable: true,selected: false},{key:'name_profile', label: 'Perfil',sortable: true,selected: false},{key:'show_details', label: 'Más',selected: false},{ key: 'edit', label: 'Editar',selected:false}];
  currentFields : UserField[] = []
  start=0;
  userEditModalId = 'user-edit-modal'
  showModal = false;
  showViewModal = false;
  sortBy = 'name'; 
  user  ={
      id: -1,
      gender: "",
      name: "",
      email: "",
      lastname: "",
      phone: -1,
      profile: 0
  }
    views  : View[]= [
            {name: 'Todos los campos', columns:[{key:'show_gender'},{key:'name',}, {key:'lastname'},{key:'email'},{key:'phone'},{key:'name_profile'}, {key:'show_details'},{ key: 'edit'}]},
            {name: 'Vista sencilla', columns:[{key:'show_gender'},{key:'name',}, {key:'lastname'}]},
    ]
    currentView = this.views[0];
    currentPage= 1;
    perPage = 5;
    filter= null;

  get getLocalUsers(): User[]{
    return this.users;
  }

  showTableColumns(){
      this.currentFields = []
      for (var i=0;i<this.fields.length;i++){
         let column = this.currentView.columns.find(el => el.key === this.fields[i].key);
          if (column){           
              this.currentFields.push(this.fields[i])
          }
      } 
  }

  getGenderColor(gender: string){
    return getGenderColor(gender);
  }

  changeView(view: View){
    this.currentView = view;
    this.showTableColumns();
  }

  createView(value: any){
      this.views.push({name:value.name, columns: value.columns});
  }

  async created(): Promise<void>{
    await this.fetchUsers();
    await this.fetchProfiles();
    this.users = this.getUsers;
    this.showTableColumns();
  }

  showEditUserModal(data: any){
    this.user.profile = data.id_profile;
    this.user.gender = data.gender;
    this.user.name = data.name;
    this.user.lastname = data.lastname;
    this.user.email = data.email;
    this.user.phone = data.phone;
    this.user.id = data.id;
    this.showModal = !this.showModal;
  }

  getNameInitials(name: string, lastname: string) : string{
    return getNameInitials(name,lastname)
  } 

  @users.Getter(UsersMethods.getters.GET_ALL_USERS)
    getUsers!: User[];
  @users.Action(UsersMethods.actions.FETCH_ALL_USERS)
    fetchUsers!: () => boolean;
  @users.Action(UsersMethods.actions.UPDATE_USER)
    updateUser!: (user: any) => boolean;
  @profiles.Getter(ProfilesMethods.getters.GET_ALL_PROFILES)
    getProfiles!: Profile[];
  @profiles.Action(ProfilesMethods.actions.FETCH_ALL_PROFILES)
    fetchProfiles!: () => boolean;

}
</script>

<style lang="scss" scoped>
.b-table{
  background-color:  #fff;
}
</style>
