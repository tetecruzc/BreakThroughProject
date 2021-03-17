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
        <b-table-simple responsive bordered>
            <b-thead>
                <b-tr>
                    <b-th v-for="(header,i) in header1" :key="i" :colspan="header.children.length">
                        <b-row>
                            <p style="margin:0;">{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-1'+i" :items="orderedItems" :headers1="header1" :headers2="header2" :col="header" :primaryHeader="true" @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" /> 
                        </b-row>
                    </b-th>
                </b-tr>
                <b-tr>
                    <b-th v-for="(header,i) in header2" :key="i">
                        <b-row>
                            <p>{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-2'+i" :items="orderedItems" :headers1="header1" :headers2="header2" :col="header" @changeHeader2="changeHeader2" />
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
@Component({
    components:{
        TableColumnPopup,
        Box
    }
})
export default class TableTest extends Vue {
    header1= [{name:'Region',key:'region',children:[{key: 'country'}, {key: 'city'}]},{name:'Clothes',key:'clothes', children:[{key:'trousers'}, {key:'skirts'}, {key: 'dresses'}]}, {name:'Accesories',key:'accesories', children:[{key:'bracelets'}, {key: 'rings'}]},{name:'Prueba',key:'prueba', children:[{key:'prueba1'}, {key: 'prueba2'}]}];
    header2= [{name: 'Country', key: 'country', parent: 'region'},{name: 'City',key:'city', parent: 'region'},{name: 'Trousers', key:'trousers', parent: 'clothes'},{name: 'Skirts', key:'skirts', parent:'clothes'},{name: 'Dresses', key:'dresses', parent: 'clothes'},{name: 'Bracelets', key:'bracelets', parent: 'accesories'},{name: 'Rings', key: 'rings', parent: 'accesories'},{name: 'Prueba1', key: 'prueba1', parent: 'prueba'},{name: 'Prueba2', key: 'prueba2', parent: 'prueba'}]
    items= [{country: 'Antwerp', city: 'Ddsaf', trousers: 22, skirts: 43, dresses: 54, bracelets: 23, rings:33,prueba1:22,prueba2:54},
            {country: 'Antwerp2', city: 'ewrew', trousers: 23, skirts: 44, dresses: 55, bracelets: 24, rings:34,prueba1:22,prueba2:54},
            {country: 'Antwerp3', city: 'feverg', trousers: 24, skirts: 45, dresses: 56, bracelets: 25, rings:35,prueba1:22,prueba2:54},
            {country: 'Antwerp4', city: 'ewtj', trousers: 25, skirts: 46, dresses: 57, bracelets: 26, rings:36,prueba1:22,prueba2:54},
            {country: 'Antwerp5', city: 'sdcsg', trousers: 26, skirts: 47, dresses: 58, bracelets: 27, rings:37,prueba1:22,prueba2:54},
            {country: 'Antwerp6', city: 'oiu', trousers: 27, skirts: 48, dresses: 59, bracelets: 28, rings:38,prueba1:22,prueba2:54}]
    currentPage= 1;
    perPage = 2;
    orderedItems : any[] = [];
    mounted(){
        for (var i=0;i<this.items.length;i++){
            let values : any = Object.values(this.items[i])
            this.orderedItems.push(values)
        }
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

    changeHeader1(newVal : any){ // cambiar tipo
        this.header1 = newVal;
    }
    changeHeader2(newVal : any){ // cambiar tipo
        this.header2 = newVal;
        this.orderItems();
    }

    orderItems(){
        let newItemsOrder : any = []         
        for (var j=0;j<this.items.length;j++){
            let obj : any[] = []; 
            let value : any = null
            for (var i=0;i<this.header2.length;i++){
                let key : any = this.header2[i]['key']
                value = this.items[j][key];
                obj[i] = value
            }   
            newItemsOrder[j] = obj
        }
        this.orderedItems = newItemsOrder
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