<template>
  <div class="home">
    <b-row class="my-4 " align-h="around">
            <b-col >
                <Box title="Filtros">
                        <b-row>
                            <b-col>
                                <div class="form-group">
                                    <b-dropdown :text="perPage.toString()" variant="outline" >
                                    <b-dropdown-item  href="#" v-for="(quantity,i) in [2,3,4]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </b-col>
                            <b-col>
                                    <div class="form-group">
                                        <b-dropdown :text="currentFilter.name" variant="outline" >
                                        <b-dropdown-item  href="#" v-for="(header,i) in headerFilters" :key="i" @click="changeFilter(header)">{{header.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <div class="form-group">
                                        <b-icon icon="search" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
                                        <div class="form_group--input field">
                                            <input type="input" class="form__field" placeholder="Ingrese filtro" name="filter" id='filter' required v-model="textFilter"/>
                                            <label for="name" class="form__label">Ingrese filtro</label>
                                        </div>
                                    </div>
                            </b-col>
                            <b-col>
                                <!--
                                    <div class="form-group">
                                        <b-dropdown :text="currentOrderFilter.name" variant="outline" >
                                            <b-dropdown-item  href="#" v-for="(header,i) in headerFilters" :key="i" @click="changeOrderFilter(header)">{{header.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                -->
                                 <FormTag :options="headerFilters" @setTags="setOrderFilters"/>
                            </b-col>
                            <b-col>
                                    <div class="form-group">
                                        <b-dropdown :text="currentView.name" variant="outline" >
                                            <b-dropdown-item  href="#" v-for="(view,i) in views" :key="i" @click="changeView(view)">{{view.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <b-button class="button-primary my-3 " block @click="saveView">Añadir vista actual</b-button>
                            </b-col>
                        </b-row>
                </Box>
            </b-col>
        </b-row> 
    <TableTest :addColumnButton="true" :header1="header1" :header2="header2" :items="items" :perPage="perPage" :currentFilter="currentFilter" :currentOrderFilter="currentOrderFilter" :textFilter="textFilter" @sendHeaders="getHeaderFilters"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch,Prop } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue'; // @ is an alias to /src
import TableTest from '../components/TableTest.vue'
import Box from '../components/utilities/Box.vue'
import FormTag from '../components/utilities/FormTag.vue'
import {users,profiles} from '../store/namespaces';
import UsersMethods from '../store/users/methods/users.methods';
import ProfilesMethods from '../store/profiles/methods/profiles.methods';
import { User } from '../modules/users/interfaces/users.interface';
@Component({
  components: {
    UsersTable,
    TableTest,
    Box,
    FormTag
  },
})
export default class TableViewExample extends Vue {
    perPage : number = 3;
    textFilter : string = ''
    currentFilter : any = {}
        views =[
        {name: 'Vista 1'},
        {name: 'Vista 2'}
    ]
    currentOrderFilter : Array<any> = []
    currentView : any = this.views[0]
    headerFilters: Array<any> = []


  header1= [{name:'Region',key:'region',sticky: true,children:[{key: 'country'},{key: 'city'}], shown: true},
            {name:'Clothes',key:'clothes',sticky:true, children:[{key:'trousers'}, {key:'skirts'}, {key: 'dresses'}], shown: true},
            {name:'Accesories',key:'accesories', children:[{key:'bracelets'}, {key: 'rings'}], shown: true},
            {name:'Categoria1',key:'prueba', children:[{key:'prueba1'}], shown: true},
            {name:'Categoria2',key:'categoria', shown: false},
            {name: null, key:null, shown: false}];
   header2= [{name: 'Country', key: 'country', parent: 'region', shown: true},
            {name: 'City',key:'city', parent: 'region', shown: true},
            {name: 'Trousers', key:'trousers', parent: 'clothes', shown: true},
            {name: 'Skirts', key:'skirts', parent:'clothes', shown: true},
            {name: 'Dresses', key:'dresses', parent: 'clothes', shown: true},
            {name: 'Bracelets', key:'bracelets', parent: 'accesories', shown: true},
            {name: 'Rings', key: 'rings', parent: 'accesories', shown: true},
            {name: 'Prueba1', key: 'prueba1', parent: 'prueba', shown: true},
            {name: 'Prueba2', key: 'prueba2', parent: 'prueba', shown: false},
            {name: 'Primerhijo', key: 'firstchild', parent: 'ctagoria', shown: false},
            {name: 'Segundohijo', key: 'secondchild', parent: 'ctagoria', shown: false},
            {name: 'Sin padre 1', key: 'sinpadre1', parent: null, shown: false}]
    items= [{country: 'Antwerp', city: 'Ddsaf', trousers: 24, skirts: 43, dresses: 54, bracelets: 23, rings:33,prueba1:22,prueba2:54},
            {country: 'Antwerp2', city: 'ewrew', trousers: 23, skirts: 44, dresses: 55, bracelets: 24, rings:34,prueba1:22,prueba2:54},
            {country: 'Antwerp3', city: 'feverg', trousers: 22, skirts: 45, dresses: 56, bracelets: 25, rings:35,prueba1:22,prueba2:54},
            {country: 'Antwerp4', city: 'ewtj', trousers: 25, skirts: 46, dresses: 57, bracelets: 26, rings:36,prueba1:22,prueba2:54},
            {country: 'Antwerp5', city: 'sdcsg', trousers: 26, skirts: 47, dresses: 58, bracelets: 27, rings:37,prueba1:22,prueba2:54},
            {country: 'Antwerp6', city: 'oiu', trousers: 27, skirts: 48, dresses: 59, bracelets: 28, rings:38,prueba1:22,prueba2:54}]
    
    mounted(){
        if (this.headerFilters){ 
            this.currentFilter = this.headerFilters[0]
           // this.currentOrderFilter = this.headerFilters[0]
        }
    }

    saveView(){
        /* ENVIAMOS VISTA AL BACK */
    }

    changeFilter(header: any){
        this.currentFilter = header;
    }

    changeView(view : any){
        this.currentView = view
    }

    getHeaderFilters(newVal: any){
        this.headerFilters = newVal;
    }
/*
    changeOrderFilter(header: any){
        this.currentOrderFilter = header;
    }
    */
    setOrderFilters(newVal: any){
       this.currentOrderFilter = newVal;
    }
   /* @users.Action(UsersMethods.actions.FETCH_ALL_USERS)
    fetchUsers!: () => boolean; */
}

</script>


