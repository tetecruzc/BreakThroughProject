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
        let headerSecondary = []
        if (val === 'left'){
            if (primary && (index !==0)){
               headerSecondary = this.moveHeaderPrimary(this.col, 'left'); 
               if (index !== 0 ) headers.splice(index - 1, 0, item);
            }
            else if (this.findColumnParent(this.col, 'left') && (index !== 0))
                headers.splice(index - 1, 0, item);
            else headers = header
        }
        else if ( val === 'right') {
            if (primary && (index !== header.length)){
                this.moveHeaderPrimary(this.col, 'right')
            }
            else if ((this.findColumnParent(this.col, 'right')) && (index !== header.length)) {
                headers.splice(index + 1, 0, item);
            }else headers = header
        }
        else if (val === 'remove'){
            if (item.children){
            }
        }
        else headers = header;
        return {headers, headerSecondary};
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
                lastColumn.children.forEach(element => {
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
                       console.log(col.children[j].key)
                       headerPrimary = headerPrimary.filter(el => el.key !== columnFind.key)
                       headerPrimary.splice(lastIndex,0,columnFind);
                       lastIndex++;
                    }
                }
            }
            return headerPrimary
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

