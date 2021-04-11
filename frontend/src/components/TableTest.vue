<template>
    <b-container>
        <b-row v-if="addColumnButton">
            <b-button class="button-primary my-3 ml-auto" @click="openModal()">Add column</b-button>
            <AddColumnPopup title="Añadir columnas" :showModal="showAddColumnModal" :currentChildren="itemsWithoutParent"  @changeModalStatus="changeModalStatus" :primaryHeader="primaryHeader" :secondaryHeader="header2" @changeHeader2="changeHeader2" @changeHeader1="changeHeader1"/>
        </b-row>
        <b-row>
            <b-table-simple responsive bordered>
                <b-thead>
                    <b-tr>
                        <b-th v-for="(header,i) in shownPrimaryHeader"  :key="i" :colspan="header.key === 'pin' ? 1 : header.children.length" :sticky-column="i === 0 && existingColumn() ? true : false" :class="i === 0 && existingColumn() ? 'pined' : ''"> 
                            <b-row class="m-0 flex-nowrap justify-content-center align-items-center">
                                <p style="margin:0;">{{header.name === 'Pined' ? '' : header.name}}</p>
                                <TableColumnPopup :id="'table-popover-1'+i" :items="orderedItems" :originalHeaderSecondary="header2" :headers1="primaryHeader" :headers2="secondaryHeader"  :col="header"  @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" /> 
                            </b-row>
                        </b-th>
                    </b-tr>
                    <b-tr>
                        <b-th v-for="(header,i) in shownSecondaryHeader" :key="i"  :sticky-column="i === 0 && existingColumn() ? true : false" :class="i === 0 && existingColumn() ? 'pined' : ''"> 
                            <b-row class="m-0 flex-nowrap justify-content-center align-items-center">
                                <p>{{header.name}}</p>
                                <TableColumnPopup :id="'table-popover-2'+i" :items="orderedItems" :originalHeaderSecondary="header2" :headers1="primaryHeader" :headers2="secondaryHeader" :col="header" @changeHeader1="changeHeader1" @changeHeader2="changeHeader2" />
                            </b-row>
                        </b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(item,i) in getItemsPerPage" :key="i" > 
                        <b-td v-for="(it,j) in getItemsKeys(item)" :key="j" :sticky-column="j === 0 && existingColumn() ? true : false" :class="j === 0 && existingColumn() ? 'pined' : ''">
                            <div v-if="!isStatusField(getItemsKeys(item)[j])">{{item[getItemsKeys(item)[j]]}}</div>
                            <b-badge v-else pill :class="checkBadgeStatus(item[getItemsKeys(item)[j]],getItemsKeys(item)[j])">{{item[getItemsKeys(item)[j]]}}</b-badge>
                        </b-td> 
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </b-row>
        <div class="justify-content-center row mb-2 mt-4">
            <b-pagination size="md" :total-rows="this.orderedItems.length" :per-page="perPageLocal" v-model="currentPage" />
        </div>
    </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TableColumnPopup from './TableColumnPopup.vue'
import Box from './utilities/Box.vue'
import AddColumnPopup from './AddColumnPopup.vue';
import {keySort} from '../utils/global-functions'
import {orderHeaderSecondary} from '../utils/table-functions'
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
    @Prop() standarts!: Array<any>;
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
        if (this.perPage) this.perPageLocal = this.perPage;
        this.$emit('sendHeaders',this.secondaryHeader);
    }

    getItemsKeys(items: any){
        return Object.keys(items)
    }

    get header1WithPined(){
       let pined = this.primaryHeader.find(el => el.key === 'pin');
       let header = this.header1;
       if (pined) header.unshift(pined)
       return header
    }

    checkBadgeStatus(value: any, key: any){
        let keyFound = this.standarts.find(el => el.key === key);
        if (keyFound) {
            for (let i in this.getItemsKeys(keyFound.colors)){
                if (this.getItemsKeys(keyFound.colors)[i] === value){
                    return 'badge-'+ keyFound.colors[this.getItemsKeys(keyFound.colors)[i]]
                }
            }
        }
    }


    isStatusField(key: any){
        let found = this.standarts.find(el => el.key === key)
        if (found) return true
        else return false
    }

    get shownSecondaryHeader() : Array<any>{ 
        if (this.secondaryHeader.length === 0){
            this.secondaryHeader = this.header2.filter(el => el.shown === true)
            this.filteredItems = this.items;
            this.secondaryHeader = orderHeaderSecondary(this.shownPrimaryHeader,this.secondaryHeader);
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

    @Watch('header1')
    changedViewHeader1(){
        this.primaryHeader = this.header1; 
    }

    @Watch('header2')
    changedViewHeader2(){
        this.secondaryHeader = this.header2; 
        this.orderItems();
    }

    existingColumn(): boolean{
        let found = this.secondaryHeader.find((el: { pined: boolean;}) => el.pined === true)
        if (found) return true
        else return false
    }



/* FILTERS */

    @Watch('currentOrderFilter')
    changeOrderFilter(newVal: any){
        // cuando se reinician los filtros del sort, no se reinician los items de la table 
       this.filteredItems = keySort(newVal,this.filteredItems);
        this.orderItems(); 
    }

    @Watch('textFilter')
    filterByString(){
        this.filteredItems = this.items.filter( el => el[this.currentFilter.key].toString().toLowerCase().includes(this.textFilter.toLowerCase()));
        this.orderItems();
    }

/* END FILTERS */


/* PAGINATION */

    @Watch('perPage')
    changeItemsPerPage(){
        this.perPageLocal = this.perPage
    }

    get getItemsPerPage(): any {
       if (this.orderedItems.length === 0) {this.filteredItems = this.items; this.orderItems()} // carga inicial, arreglar
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
       // this.primaryHeader = newVal
        this.primaryHeader = newVal.filter((el: { shown: boolean; }) => el.shown === true);
        this.header1.forEach(el => {
            let found = this.primaryHeader.find(ele => ele.key === el.key);    
            if (found === undefined) el.shown = false;
            else el.shown = true
        });
    }

    changeHeader2(newVal : any){ 
        this.secondaryHeader = newVal.filter((el: { shown: boolean; }) => el.shown === true);
        this.orderItems();
        this.header2.forEach(el => {
            let found = this.secondaryHeader.find(ele => ele.key === el.key);    
            if (found === undefined) {
                el.shown = false;}
            else el.shown = true
        });
    }

    orderItems(){
        let newItemsOrder : any = []         
        for (var j=0;j<this.filteredItems.length;j++){
            let obj : any[] = []; 
            let value : any = null
            for (var i=0;i<this.secondaryHeader.length;i++){
                let key : any = this.secondaryHeader[i]['key']
                value = this.filteredItems[j][key]; 
                obj[i] = value
            }   
            newItemsOrder[j] = obj
        }
        this.orderedItems = newItemsOrder
    }

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
/* END MODAL */

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
    .table-responsive{
        width: 90vw !important;
        margin: 0 auto !important;
    }

</style>