<template>
  <div class="hello">
        <b-modal centered v-model="showModal" hide-footer>        
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
                  <b-dropdown-item  href="#" v-for="(profile,i) in getProfiles" :key="i" @click="changeProfileName(profile.id_profile)">{{profile.name_profile}}</b-dropdown-item>
                </b-dropdown>
            </div>
            <b-button class="button-primary mt-5" block @click="editUser()">Actualizar</b-button>
        </b-modal>
        <b-modal centered v-model="showViewModal" hide-footer>        
                <template #modal-title>
                    Crear una vista personalizada
                </template>
                <div class="form-group">
                    <div class="form_group--input field">
                      <input type="input" class="form__field" placeholder="Nombre de la vista" name="view" id='view' required v-model="view.name" />
                      <label for="view" class="form__label">Nombre de la vista</label>
                    </div>
                </div>
                <b-row>
                    <b-col >
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(0)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                    <b-col>
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(1)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                    <b-col>
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(2)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                </b-row>             
                <b-button class="button-primary mt-5" block @click="createView()">Crear vista</b-button>
        </b-modal>
      <b-container>
          <b-row class="my-4 " align-h="around">
            <b-col  lg="4" md="4">
              <b-card class=" filter-card" header="Filters">
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
              </b-card>
            </b-col>
            <b-col  lg="4" md="8">
              <b-card class=" filter-card" header="Views">    
                    <div class="form-group">
                        <b-dropdown :text="currentView.name" variant="outline">
                          <b-dropdown-item  href="#" v-for="(view,i) in views" :key="i" @click="changeView(view)">{{view.name}}</b-dropdown-item>
                        </b-dropdown>
                    </div>
                     <b-button class="button-primary mt-5" block @click="showViewModal = true">Crear vista</b-button>
              </b-card>
            </b-col>
          </b-row>
      </b-container>

  <b-container>
        <b-table class="b-table" sort-icon-left  :items="getLocalUsers" :fields="currentFields" striped responsive :current-page="currentPage" :per-page="perPage" :filter="filter">
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
              <b-table-simple hover small  responsive bordered>
                    <b-thead >
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
import {users,profiles} from '../store/namespaces';
import UsersMethods from '../store/users/methods/users.methods';
import ProfilesMethods from '../store/profiles/methods/profiles.methods';
import { User } from '../modules/users/interfaces/users.interface';
import { View, UserField } from '../modules/users/interfaces/views.interface';
import { Profile } from '../modules/profiles/interface/profiles.interface';
import {GENDER} from '../utils/rules'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  users: User[] =[];
  fields : UserField[]= [{key:'show_gender', label: 'Genero',selected: false, showColumn: true},{key:'name', label: 'Nombre',sortable: true,selected: false}, {key:'lastname', label: 'Apellido',sortable: true,selected: false},{key:'email', label: 'Email',sortable: true,selected: false},{key:'phone', label: 'Phone',sortable: true,selected: false},{key:'name_profile', label: 'Perfil',sortable: true,selected: false},{key:'show_details', label: 'Más',selected: false},{ key: 'edit', label: 'Editar',selected:false}];
  currentFields : UserField[] = []
  start=0;
  userEditModalId = 'user-edit-modal'
  showModal = false;
  showViewModal = false;
  sortBy = 'name';
  
  user ={
      id: -1,
      gender: "",
      name: "",
      email: "",
      lastname: "",
      phone: -1,
      profile: 0
  }
    $bvToast: any;
    view : View= {
      columns: [],
      name: ''
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

  changeView(view: View){
    this.currentView = view;
    this.showTableColumns();
  }

  clearSelectedFields(){
    for (var i=0;i<this.fields.length;i++){
      this.fields[i].selected = false
    }
  }

  createView(){
            for (var i=0;i<this.fields.length;i++){
              if (this.fields[i].selected === true){
                    this.view.columns.push(this.fields[i])
              }
            }
        if (this.view.name !== '' && this.view.columns.length >0){  
              this.views.push({name:this.view.name, columns: this.view.columns});  
              this.showToast('success',`Creación de vista`,`Se ha creado la vista ${this.view.name} exitosamente`);
              this.view.columns=[]
              this.view.name = ''
              this.clearSelectedFields();
              this.showViewModal = false;
        }
        else  this.showToast('danger',`Creación de vista`,`Ha ocurrido un error creando la vista personalizada`)
  }

  getLabelsLenght(start: number): Object{
      let fields = Math.ceil(this.fields.length / 3);
      start = start * fields;
      let currentItems = this.fields.slice(start,start+fields);
      return currentItems;
  }

  async mounted(): Promise<void>{
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

  async editUser(){
    this.showModal = !this.showModal;
    let updatedUser : Partial<User> = {};
     let currentUser = this.users.find(el => el.id === this.user.id);
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
    }
    this.$root.$emit('bv::refresh::table', 'table-edit-user');
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

  getUserProfileName() : string{  
    let profile : Partial<Profile> = {} ;
    if (this.user.profile !== 0) {
      profile = this.getProfiles.find(el => el.id_profile === this.user.profile)!;
    }
    return profile.name_profile!;
  }

  changeProfileName(profileId: number): void{
    this.user.profile =  profileId;
  }

  getGenderColor(gender: string): string {
   return gender === GENDER.FEMALE ? 'background-color:#e83e8c;' : 'background-color:#007bff;'
  }

  getNameInitials(name: string, lastname: string) : string{
    return name[0] + lastname[0];
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

<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.icon-dark{
  fill: #243b55;//#000046;
  cursor: pointer;
}

.b-table{
  background-color:  #fff;
}

$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #243b55;



.button-primary{
  background-color: $gray !important;
}
.profile-avatar{
  margin-left: auto !important;
  margin-right: auto !important;
  display: flex !important;
}
.dropdown{
  width: 100%;
  border-bottom: 2px solid $gray;
  margin: 0 !important;
  padding-top: 15px;
}

  .dropdown-toggle{
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    &:focus{
    outline:none !important;
    outline-width: 0 !important;
    box-shadow: none !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
  }
  }
  .dropdown-menu{
    width: 100% !important;
    li{
        width: 100%;
        margin: 0 !important;
    }
  }

.form-group{
  display: flex;
  align-items: center;
  justify-content: center;

  .b-icon{
    margin-top: 20px;
    margin-right: 10px;
  }

}

.form_group--input {
  position: relative;
  padding: 15px 0 0;
 // margin-top: 10px;
  width: 100%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 16px;
  color: $gray;
  padding: 7px 0;
  background: transparent;
  transition: border-color .4s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 16px;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 12px;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
   // color: $primary;   
  }
  padding-bottom: 6px;  
 // font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary,$secondary);
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}

/* PAGINATION */

.page-item{
  margin: 0 !important;
  button{
    color: $gray;
    &:focus{
      outline:none !important;
      outline-width: 0 !important;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
    }
  }
  &.active {
    .page-link {
      background-color: $gray !important;
      border-color: $gray !important;
    }
  }
  &.disable span{
    color: $gray;
  }
  
}

.custom-select{
  outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.b-table-sort-icon-left:focus{
outline:none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}

.filter-card{
  min-height: 200px;
  border: none !important;
}

.card-header{
  background-color: $gray !important;
  color: #fff;
  border-color: $gray !important;
}
</style>
