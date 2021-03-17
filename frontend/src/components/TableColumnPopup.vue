<template>
    <div class="ml-auto">
        <b-button pill :id="id" class="table-header-menu " >
            <i class="table-header-menu__icon"></i>
        </b-button>
        <b-popover  :target="id" triggers="focus">
            <b-list-group>
                    <b-list-group-item @click="changeColumn('add')">
                        <b-icon icon="plus-circle" class="icon-dark mr-2" ></b-icon>
                        Add column
                    </b-list-group-item>
                    <b-list-group-item @click="changeColumn('remove')">
                        <b-icon icon="trash" class="icon-dark mr-2" ></b-icon>
                        Remove column
                    </b-list-group-item>
                    <b-list-group-item @click="changeColumn('left')">
                        <b-icon icon="chevron-left" class="icon-dark mr-2" ></b-icon>
                        Move column left
                    </b-list-group-item>
                    <b-list-group-item @click="changeColumn('right')">
                        <b-icon icon="chevron-right" class="icon-dark mr-2" ></b-icon>
                        Move column right
                    </b-list-group-item>
            </b-list-group>
        </b-popover>  
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class TableColumnPopup extends Vue {
    @Prop() id! : string;
    @Prop() headers1!: Array<any>; //cambiar
    @Prop() headers2!: Array<any>; //cambiar
    @Prop() items!: Array<any>; //cambiar
    @Prop() col: any; //cambiar
    @Prop() primaryHeader? : boolean;

    mounted(){
        
    }

    changeColumn(val: string){
        if (this.primaryHeader){
            let {headers, headerSecondary} = this.getIndexes(this.headers1,val, true)
            this.$emit('changeHeader1',headers)
            this.$emit('changeHeader2',headerSecondary)
        }else{
            let {headers, headerSecondary} = this.getIndexes(this.headers2,val, false)
            this.$emit('changeHeader2',headers)
        }
    }
    getIndexes(header: any, val: string, primary: boolean){
        let headers = header.filter((el: { name: any; }) => el.name !== this.col.name);
        let index = header.findIndex((el: { name: any; }) => el.name === this.col.name)
        let item = header.find((el: { name: any; }) => el.name === this.col.name);
        let headerSecondary : any = this.headers2
        if (val === 'left'){
            if (primary && index !==0){
               headerSecondary = this.moveHeaderPrimary(this.col,val); 
               if (index !== 0 ) headers.splice(index - 1, 0, item);
            }
            else if (this.findColumnParent(this.col, val) && (index !== 0))
                headers.splice(index - 1, 0, item);
            else {
                headers = header
            }
        }
        else if ( val === 'right') {
            if (primary && (index !== header.length)){
                this.moveHeaderPrimary(this.col, val)
            }
            else if ((this.findColumnParent(this.col,val)) && (index !== header.length)) {
                headers.splice(index + 1, 0, item);
            }else headers = header
        }
        else if (val === 'remove'){
            if (primary){
                headers = this.removeColumn(this.headers1,this.col);
                headerSecondary = this.headers2
                for (var column in this.col.children){
                   headerSecondary = this.removeColumn(headerSecondary,this.col.children[column]) 
                }
            } 
            else {
                headerSecondary = this.removeColumn(this.headers2,this.col);
                let currentHeaderPrimary = this.headers1.find(el => el.children.find((e: { key: any; }) => e.key === this.col.key))
                let nextHeader : any = []
                for (var cols in this.headers1){
                    nextHeader[cols] = this.headers1[cols]
                    if (this.headers1[cols] === currentHeaderPrimary){
                        nextHeader[cols].children = currentHeaderPrimary.children.filter((el: { key: any; }) => el.key !== this.col.key)
                    }
                  //  if (nextHeader[cols].children.length === 0) headers = nextHeader.filter(el => el.children.length > 0)
                }
                
            }
        }
        else headers = header;
        return {headers, headerSecondary};
    }


    removeColumn(column: any, col: any){
        let newHeader : any = []
            column.forEach((el: { key: any; }) =>{
                if (el.key !== col.key){
                    newHeader.push(el)
                }
            })
        return newHeader
    }


    moveHeaderPrimary(col: any, direction: string){
        if (direction === 'left'){
            let lastColumn = {children:[]}
            for (var i=0;i<this.headers1.length;i++){    
                if (this.headers1[i] === col) break
                lastColumn = this.headers1[i];
            }
            let lastIndex : any = undefined;
            for (var i=0;i<this.headers2.length;i++){
                lastColumn.children.forEach((element: {key: any;}) => {
                    if (element.key === this.headers2[i].key){                  
                        if (lastIndex === undefined || i < lastIndex){
                            lastIndex = i;
                        }
                    }
                });
            }
            let headerPrimary = this.headers2
            for (var j=0;j<col.children.length;j++){
                let columnFind = headerPrimary.find(el => el.key === col.children[j].key)
                if (columnFind) {
                    if (col.children[j].key === columnFind.key){   
                       headerPrimary = headerPrimary.filter(el => el.key !== columnFind.key)
                       headerPrimary.splice(lastIndex,0,columnFind);
                       lastIndex++;
                    }
                }
            }
            return headerPrimary
        }
        else if (direction === 'right'){
            
            let lastColumn = {children:[]}
            for (var i=0;i<this.headers1.length;i++){ 
                lastColumn = this.headers1[i];   
                if (this.headers1[i] === col){
                    lastColumn = this.headers1[i+1];
                    break
                }            
            }
            let headerPrimary = this.headers2;
            let newColumns = []
            for (var column in col.children){
                headerPrimary = headerPrimary.filter(el => el.key !== col.children[column].key)
                newColumns = headerPrimary.filter(el => el.key === col.children[column].key)
            }
            let lastIndex : any = undefined;
            for (var i=0;i<headerPrimary.length;i++){
                lastColumn.children.forEach((element: {key: any;}) => {
                    if (element.key === headerPrimary[i].key){                  
                        if (lastIndex === undefined || i < lastIndex){
                            lastIndex = i;
                        }
                    }
                });
            }
            lastIndex = lastIndex + col.children.length
            for (var column in newColumns){
                    headerPrimary.splice(lastIndex,0,newColumns[column])
                    lastIndex++;
            }   
        }
    }

    findColumnParent(col: any, direction: string){
        let key = col['key'];
        let childrenIndex = -1;
        let totalChildren = 0;
        let currentChildrenSize = 0;
        for (var i=0;i<this.headers1.length;i++){
            let childrenExist = this.headers1[i].children.find((el: { key: any; }) => el.key === key)
            totalChildren = totalChildren + this.headers1[i].children.length;
            if (childrenExist){  
                currentChildrenSize = this.headers1[i].children.length;            
                childrenIndex = this.headers2.findIndex(el => el.key === key);
                break
            }
        }
        if ( direction === 'right' && ((childrenIndex + 1) < totalChildren)) return true
        else if (direction === 'left' && ((totalChildren - currentChildrenSize) < childrenIndex)) return true
        else return false
    }

}
</script>

