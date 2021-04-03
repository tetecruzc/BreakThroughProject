<template >
  <div class="home">
    <b-row class="my-4 " align-h="around">
            <b-col>
                <Box title="Filtros">
                        <b-row>
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                <p class="label">Rows per Page:</p>
                                <div class="form-group">
                                    <b-dropdown :text="perPage.toString()" variant="outline" >
                                    <b-dropdown-item  href="#" v-for="(quantity,i) in [20,50,100]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </b-col>
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                    <p class="label">Filter by name:</p>
                                    <div class="form-group">
                                        <b-dropdown :text="currentFilter.name" variant="outline" id="dropdown-left">
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
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                 <p class="label">Order by field:</p>
                                 <FormTag :options="headerFilters" @setTags="setOrderFilters"/> 
                            </b-col>
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                    <p class="label">Your views:</p>
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
    <TableTest :addColumnButton="true" :standarts="getStandarts" :header1="getHeaderPrimary" :header2="getHeaderSeconday" :items="getItems" :perPage="perPage" :currentFilter="currentFilter" :currentOrderFilter="currentOrderFilter" :textFilter="textFilter" @sendHeaders="getHeaderFilters"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue'; // @ is an alias to /src
import TableTest from '../components/TableTest.vue'
import Box from '../components/utilities/Box.vue'
import FormTag from '../components/utilities/FormTag.vue'
import {requests} from '../store/namespaces'
import RequestsMethods from '../store/requests/methods/requests.methods';
@Component({
  components: {
    UsersTable,
    TableTest,
    Box,
    FormTag
  },
})
export default class TableViewExample extends Vue {
    perPage : number = 10;
    textFilter : string = ''
    currentFilter : any = {}
    views =[
        {name: 'Vista 1'},
        {name: 'Vista 2'}
    ]
    currentOrderFilter : Array<any> = []
    currentView : any = this.views[0]
    headerFilters: Array<any> = []

    async created(){
       await this.fetchRequests();
        if (this.headerFilters){ 
            this.currentFilter = this.headerFilters[0]
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
    @requests.Action(RequestsMethods.actions.FETCH_ALL_REQUESTS)
    fetchRequests!: () => boolean; 
    @requests.Getter(RequestsMethods.getters.GET_HEADER_PRIMARY)
     getHeaderPrimary!: Array<any>;    
    @requests.Getter(RequestsMethods.getters.GET_HEADER_SECONDARY)
     getHeaderSeconday!: Array<any>; 
    @requests.Getter(RequestsMethods.getters.GET_ITEMS)
     getItems!: Array<any>;
    @requests.Getter(RequestsMethods.getters.GET_STANDARTS)
     getStandarts!: Array<any>;
}

</script>


