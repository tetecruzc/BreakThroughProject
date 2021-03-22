<template>
    <b-container>
        <b-row class="my-4 " align-h="around">
            <b-col  lg="4" md="4">
                <Box title="Filtros">
                            <div class="form-group">
                                <b-icon icon="filter" class="icon-dark" aria-hidden="true" ></b-icon>
                                <b-dropdown :text="perPage.toString()" variant="outline" >
                                <b-dropdown-item  href="#" v-for="(quantity,i) in [2,3,4]" :key="i" @click="perPage = quantity">{{quantity}}</b-dropdown-item>
                                </b-dropdown>
                            </div>
                </Box>
            </b-col>
        </b-row>
        <b-button class="button-primary my-3 ml-auto" @click="openModal()">Add column</b-button>
        <AddColumnPopup title="Añadir columnas" :showModal="showAddColumnModal" :currentChildren="itemsWithoutParent" :col="parentNull" @changeModalStatus="changeModalStatus" :primaryHeader="header1" :secondaryHeader="header2" @changeHeader2="changeHeader2" @changeHeader1="changeHeader1"/>
        <b-table-simple responsive bordered>
            <b-thead>
                <b-tr>
                    <b-th v-for="(header,i) in primaryHeader" :key="i" :colspan="header.children.length">
                        <b-row>
                            <p style="margin:0;">{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-1'+i" :items="orderedItems" :headers1="primaryHeader" :headers2="secondaryHeader" :allHeaderSecondary="header2" :col="header"  @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" /> 
                        </b-row>
                    </b-th>
                </b-tr>
                <b-tr>
                    <b-th v-for="(header,i) in secondaryHeader" :key="i">
                        <b-row>
                            <p>{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-2'+i" :items="orderedItems" :headers1="primaryHeader" :headers2="secondaryHeader" :col="header" @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" />
                        </b-row>
                    </b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(item,i) in getItemsPerPage" :key="i">
                    <b-td v-for="(it,j) in item" :key="j">{{it}}</b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <div class="justify-content-center row my-2">
            <b-pagination size="md" :total-rows="this.items.length" :per-page="perPage" v-model="currentPage" />
        </div>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TableColumnPopup from './TableColumnPopup.vue'
import Box from './utilities/Box.vue'
import AddColumnPopup from './AddColumnPopup.vue';

@Component({
    components:{
        TableColumnPopup,
        AddColumnPopup,
        Box
    }
})
export default class TableTest extends Vue {
    header1= [{name:'Region',key:'region',children:[{key: 'country'},{key: 'city'}], shown: true},
            {name:'Clothes',key:'clothes', children:[{key:'trousers'}, {key:'skirts'}, {key: 'dresses'}], shown: true},
            {name:'Accesories',key:'accesories', children:[{key:'bracelets'}, {key: 'rings'}], shown: true},
            {name:'Categoria1',key:'prueba', children:[{key:'prueba1'}], shown: true},
            {name:'Categoria2',key:'categoria', shown: false},
            {name: 'Otras columnas', key:null, shown: false}];
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
    items= [{country: 'Antwerp', city: 'Ddsaf', trousers: 22, skirts: 43, dresses: 54, bracelets: 23, rings:33,prueba1:22,prueba2:54},
            {country: 'Antwerp2', city: 'ewrew', trousers: 23, skirts: 44, dresses: 55, bracelets: 24, rings:34,prueba1:22,prueba2:54},
            {country: 'Antwerp3', city: 'feverg', trousers: 24, skirts: 45, dresses: 56, bracelets: 25, rings:35,prueba1:22,prueba2:54},
            {country: 'Antwerp4', city: 'ewtj', trousers: 25, skirts: 46, dresses: 57, bracelets: 26, rings:36,prueba1:22,prueba2:54},
            {country: 'Antwerp5', city: 'sdcsg', trousers: 26, skirts: 47, dresses: 58, bracelets: 27, rings:37,prueba1:22,prueba2:54},
            {country: 'Antwerp6', city: 'oiu', trousers: 27, skirts: 48, dresses: 59, bracelets: 28, rings:38,prueba1:22,prueba2:54}]
    currentPage= 1;
    perPage = 2;
    orderedItems : any[] = [];
    secondaryHeader : any[] = [];
    primaryHeader : any[] = [];
    showAddColumnModal: boolean = false;

    mounted(){
        this.secondaryHeader = this.header2.filter(el => el.shown === true)
        this.primaryHeader = this.header1.filter(el => el.shown === true)
        this.orderItems();
    }


    openModal(){
        this.showAddColumnModal = true
    }

    get getItemsPerPage(): any {
        let start = this.currentPage === 1 ? 0 : this.currentPage * this.perPage - this.perPage;
        let end = start + this.perPage;
        return this.orderedItems.slice(start,end)
    }

    @Watch('currentPage')
        getPage(val: number){
            this.currentPage = val;
    }

    changeHeader1(newVal : any){ 
        this.primaryHeader = newVal.filter((el: { shown: boolean; }) => el.shown === true);
    }
    
    changeHeader2(newVal : any){ 
        this.secondaryHeader = newVal.filter((el: { shown: boolean; }) => el.shown === true);
        this.orderItems();
        this.header2.forEach(el => {
            let found = this.secondaryHeader.find(ele => ele.key === el.key);
            if (found) el.shown = true;
            else el.shown = false
        })
    }

    orderItems(){
        let newItemsOrder : any = []         
        for (var j=0;j<this.items.length;j++){
            let obj : any[] = []; 
            let value : any = null
            for (var i=0;i<this.secondaryHeader.length;i++){
                let key : any = this.secondaryHeader[i]['key']
                value = this.items[j][key];
                obj[i] = value
            }   
            newItemsOrder[j] = obj
        }
        this.orderedItems = newItemsOrder
    }
        // creo que seria mas facil para orderitems
            // for (var i=0;i<this.items.length;i++){
        //     let values : any = Object.values(this.items[i]);
        //     console.log(values)
        //     this.orderedItems.push(values)
        // }
    get itemsWithoutParent() : Array<any>{
        return this.header2.filter(el => el.parent === null)
    }

    get parentNull(): any {
        return this.header1.find(el => el.key === null)
    }

    changeModalStatus(newVal: boolean){
        this.showAddColumnModal = newVal;
    }

}
</script>

<style lang="scss">

    .list-group-item{
        border: none !important;
        cursor: pointer;
        transition: all .3s;
        &:hover{
            background-color: rgb(243, 243, 243);
        }
    }
    .b-table{
        background-color: #fff;
    }

</style>