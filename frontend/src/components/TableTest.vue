<template>
    <b-container>
        <b-row v-if="addColumnButton">
            <b-button class="button-primary my-3 ml-auto" @click="openModal()">Add column</b-button>
            <AddColumnPopup title="Añadir columnas" :showModal="showAddColumnModal" :currentChildren="itemsWithoutParent"  @changeModalStatus="changeModalStatus" :primaryHeader="header1" :secondaryHeader="header2" @changeHeader2="changeHeader2" @changeHeader1="changeHeader1"/>
        </b-row>
        <b-row v-if="isDataLoading" class="mb-auto">
                <b-spinner class="my-4"></b-spinner>
        </b-row>
        <b-table-simple responsive bordered>
            <b-thead>
                <b-tr>
                    <b-th v-for="(header,i) in shownPrimaryHeader" :key="i" :colspan="header.children.length" :sticky-column="header.sticky === true ? true : false">
                        <b-row>
                            <p style="margin:0;">{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-1'+i" :items="orderedItems" :headers1="primaryHeader" :headers2="secondaryHeader" :allHeaderSecondary="header2" :col="header"  @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" /> 
                        </b-row>
                    </b-th>
                </b-tr>
                <b-tr>
                    <b-th v-for="(header,i) in shownSecondaryHeader" :key="i" :sticky-column="isStickyColumnChild(header)">
                        <b-row>
                            <p>{{header.name}}</p>
                            <TableColumnPopup :id="'table-popover-2'+i" :items="orderedItems" :headers1="primaryHeader" :headers2="secondaryHeader" :col="header" @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" />
                        </b-row>
                    </b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(item,i) in getItemsPerPage" :key="i"> <!--getItemsPerPage-->
                    <b-td v-for="(it,j) in item" :key="j">{{it}}</b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <div v-if="!isDataLoading" class="justify-content-center row mb-2 mt-auto">
            <b-pagination size="md" :total-rows="this.orderedItems.length" :per-page="perPageLocal" v-model="currentPage" />
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
    @Prop() header1!: Array<any>;
    @Prop() header2!: Array<any>;
    @Prop() items!: Array<any>;
    @Prop() perPage!: number;
    perPageLocal : number = 2;
    @Prop() textFilter: string = '';
    @Prop() currentFilter? : any;
    @Prop() currentOrderFilter?: any;
    @Prop() addColumnButton?: boolean;
    currentPage= 1;
    filteredItems : Array<any> = []
    orderedItems : any[] = [];
    secondaryHeader : any[] = [];
    primaryHeader : any[] = [];
    showAddColumnModal: boolean = false;

    mounted(){
       // this.secondaryHeader = this.header2.filter(el => el.shown === true)
       // this.primaryHeader = this.header1.filter(el => el.shown === true)
       // this.filteredItems = this.items;
        this.orderItems();
        if (this.perPage) this.perPageLocal = this.perPage;
        this.$emit('sendHeaders',this.secondaryHeader)
    }


    get isDataLoading(): boolean{
        if (this.secondaryHeader.length > 0) return false; 
        else return true
    }

    get shownSecondaryHeader() : Array<any>{ 
        if (this.secondaryHeader.length === 0){
            this.secondaryHeader = this.header2.filter(el => el.shown === true)
            this.filteredItems = this.items;
        }    
        return this.secondaryHeader
    }

    get shownPrimaryHeader() : Array<any>{
        if (this.primaryHeader.length === 0)
        this.primaryHeader = this.header1.filter(el => el.shown === true)
        return this.primaryHeader
    }

    @Watch('secondaryHeader')
    sendHeadersToParent(){
        this.$emit('sendHeaders',this.secondaryHeader)
    }

    isStickyColumnChild(header: any): boolean{
        let found = this.header1.find(el => el.key === header.parent && el.sticky === true);
        if (found) return true
        else return false
    }

/* FILTERS */

    @Watch('currentOrderFilter')
    changeOrderFilter(){
        /*
        this.filteredItems = this.items.sort((a: any,b: any)=>{
            if (a[this.currentOrderFilter.key] > b[this.currentOrderFilter.key]){
                return 1
            }
            else return -1
        })
        this.orderItems(); */
    }

    @Watch('textFilter')
    filterByString(){
        this.filteredItems = this.items.filter( el => el[this.currentFilter.key].toString().toLowerCase().includes(this.textFilter.toLowerCase()))     
        this.orderItems();
    }

/* END FILTERS */

/* PAGINATION */
    get getItemsPerPage(): any {
        if (this.orderedItems.length === 0) this.orderedItems = this.items
        let start = this.currentPage === 1 ? 0 : this.currentPage * this.perPageLocal - this.perPageLocal;
        let end = start + this.perPageLocal;
        return this.orderedItems.slice(start,end)
    }

    @Watch('currentPage')
        getPage(val: number){
            this.currentPage = val;
    }
/* END PAGINATION */

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
        for (var j=0;j<this.filteredItems.length;j++){
            let obj : any[] = []; 
            let value : any = null
            for (var i=0;i<this.secondaryHeader.length;i++){
                let key : any = this.secondaryHeader[i]['key']
                value = this.filteredItems[j][key]; // this.items
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

/* MODAL */
    changeModalStatus(newVal: boolean){
        this.showAddColumnModal = newVal;
    }

    openModal(){
        this.showAddColumnModal = true
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