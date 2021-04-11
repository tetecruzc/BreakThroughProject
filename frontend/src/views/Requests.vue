<template>
  <div>
    <b-row v-if="getItems.length > 0" >
            <b-col>
                <Box title="Filtros">
                        <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="4">
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                <p class="label">Registros por página:</p>
                                <div class="form-group">
                                    <b-dropdown :text="perPage.toString()" variant="outline" >
                                    <b-dropdown-item  href="#" v-for="(quantity,i) in [20,50,100]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </b-col>
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                    <p class="label">Filtrar por nombre:</p>
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
                                 <p class="label">Ordenar por columnas:</p>
                                 <FormTag :options="headerFilters" @setTags="setOrderFilters"/> 
                            </b-col>
                            <b-col class="d-flex flex-column justify-content-start align-self-stretch">
                                    <p class="label">Mis vistas:</p>
                                    <div class="form-group">
                                        <b-dropdown :text="currentView.name" variant="outline" >
                                            <b-dropdown-item  href="#" v-for="(view,i) in views" :key="i" @click="changeView(view)">{{view.name}}</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <b-button class="button-primary my-3 " block @click="saveView()">Añadir vista actual</b-button>
                            </b-col>
                        </b-row>
                </Box>
            </b-col>
    </b-row> 
    <b-row  v-if="getItems.length > 0">
        <TableTest :addColumnButton="true" :standarts="getStandarts"  :header1="currentView.headerPrimary" :header2="currentView.headerSecondary" :items="getItems" :perPage="perPage" :currentFilter="currentFilter" :currentOrderFilter="currentOrderFilter" :textFilter="textFilter" @sendHeaders="getHeaderFilters"/>
    </b-row>
    <b-spinner v-else class="my-4"></b-spinner>  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UsersTable from '../modules/users/components/UsersTable.vue';
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
    currentOrderFilter : Array<any> = []
    currentView : any = []
    headerFilters: Array<any> = []

    async created(){
       await this.fetchRequests();
        if (this.headerFilters){ 
            this.currentFilter = this.headerFilters[0];
        }
    }

    beforeMount(){
        this.currentView = this.views[0];
    }

    async saveView(){
        let userId : number = 1;
        await this.saveRequestView(userId,this.headerFilters)
    }

    get views(){
        return this.getViews;
    }

    changeFilter(header: any){
        this.currentFilter = header;
    }

    changeView(view : any){
        this.currentView = view
        this.headerFilters = view.headerSecondary;
        console.log(this.currentView)
    }

    getHeaderFilters(newVal: any){
        this.headerFilters = newVal;
    }
    
    setOrderFilters(newVal: any){
       this.currentOrderFilter = newVal;
    }

    @requests.Action(RequestsMethods.actions.FETCH_ALL_REQUESTS)
        fetchRequests!: () => boolean;
    @requests.Action(RequestsMethods.actions.FETCH_REQUEST_VIEWS)
        fetchRequestsViews!: (userId: number) => boolean;
    @requests.Action(RequestsMethods.actions.SAVE_REQUEST_VIEW)
        saveRequestView!: (userId: number,header: any) => boolean;   // Requests Type 
    // @requests.Getter(RequestsMethods.getters.GET_HEADER_PRIMARY)
    //     getHeaderPrimary!: Array<any>;     
    @requests.Getter(RequestsMethods.getters.GET_ITEMS)
        getItems!: Array<any>;
    @requests.Getter(RequestsMethods.getters.GET_STANDARTS)
        getStandarts!: Array<any>;
    @requests.Getter(RequestsMethods.getters.GET_VIEWS)
        getViews!: Array<any>;
}

</script>



