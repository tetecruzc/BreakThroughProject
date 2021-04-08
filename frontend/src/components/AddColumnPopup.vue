<template>
  <b-modal centered v-model="show" hide-footer>
            <template #modal-title style="display: flex;">
                <p v-if="!col">{{title}}</p> 
                <p v-else >{{title}} {{col.name}}</p>
            </template>
            <b-card no-body>
                <b-row class="vertical-tabs">
                    <b-col class="vertical-tabs__tabs pa-0">
                        <b-row  v-if="col" class="tabs p-2 pl-3 active" >
                            <p>{{col.name === null ? 'Otras columnas' : col.name}}</p>
                            <b-icon icon="chevron-right" class="icon-dark icon-small mr-2" ></b-icon>
                        </b-row>
                        <b-row v-else  v-for="(tab,i) in primaryHeaderLocal" :key="i" :class="isCurrentTab(tab) === true ? 'tabs p-2 pl-3 active' : 'tabs p-2 pl-3'" @click="changeCurrentTab(tab)">
                            <p>{{tab.name === null ? 'Otras columnas' : tab.name}}</p>
                            <b-icon icon="chevron-right" class="icon-dark icon-small mr-2" ></b-icon>
                        </b-row>          
                    </b-col>
                    <b-col class="vertical-tabs__content pa-0">
                        <b-row v-for="(content,j) in currentChildren" :key="j" class="px-2">
                            <b-form-checkbox class="my-2" v-model="content.shown">{{content.name}}</b-form-checkbox>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
            <b-button class="button-primary mt-5" block @click="saveView()">Guardar Columnas</b-button>
  </b-modal>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import {orderHeaderSecondary} from '../utils/table-functions'
@Component({})
export default class AddColumnPopup extends Vue {
    @Prop() title?: string; 
    @Prop() primaryHeader!: Array<any>;
    @Prop() secondaryHeader!: Array<any>;
    @Prop() showModal!: boolean;
    @Prop() col? : any;
    @Prop() originalSecondaryHeader!: Array<any>;
    show: boolean = false;
    currentTab: any = {}
    primaryHeaderLocal : Array<any> = []
    secondaryHeaderLocal : Array<any> = []
    currentChildren: Array<any> =[]

    mounted(){
       this.primaryHeaderLocal = this.primaryHeader;
       this.secondaryHeaderLocal = this.secondaryHeader;  
       if (this.primaryHeader) this.currentTab = this.primaryHeader[0]!
       if (this.col) this.currentTab = this.col
        this.currentChildren = this.categoryChildren;   
        
    }

     get categoryChildren() : Array<any>{ /* Retorna los hijos del tab seleccionado  */
        let children : any = []
        for (let i in this.secondaryHeaderLocal){
            if (this.secondaryHeaderLocal[i].parent === this.currentTab.key) children.push(this.secondaryHeaderLocal[i])
        }
        return children
    }

    @Watch('primaryHeader')
    changePrimaryHeader(){
        this.primaryHeaderLocal = this.primaryHeader
    }

    @Watch('secondaryHeader')
    changeSecondaryHeader(){
        this.secondaryHeaderLocal = this.secondaryHeader;
    }

/* MODAL */
    @Watch('showModal')
    renderModal(){
        this.primaryHeaderLocal = this.primaryHeader;
        if (this.col) this.currentTab = this.col 
        this.currentChildren = this.categoryChildren;
        this.show = this.showModal;
    }
    @Watch('show')
    sendToParent(newVal: boolean){
        this.$emit('changeModalStatus', newVal)
    }
/* END MODAL */

   

    changeCurrentTab(tab: any){
        this.currentTab = tab;
        this.currentChildren = this.categoryChildren
    }

    isCurrentTab(tab: any): boolean{
        if (tab === this.currentTab) return true
        else return false
    }


  saveView(){
      
      this.show = false;
      this.secondaryHeaderLocal = orderHeaderSecondary(this.primaryHeaderLocal,this.secondaryHeaderLocal);
      for (let i in this.primaryHeaderLocal){ 
          let children = this.secondaryHeaderLocal.filter(el => el.parent === this.primaryHeader[i].key && el.shown === true)
          if (children.length > 0){
              this.primaryHeaderLocal[i].children= []
              for (let j in children){
                 this.primaryHeaderLocal[i].children.push({key: children[j].key})
              }
              this.primaryHeaderLocal[i].shown = true
          }else{
             delete this.primaryHeaderLocal[i].children
             if (this.primaryHeaderLocal[i].key !== 'pin') this.primaryHeaderLocal[i].shown = false
          }
      }
      if (!this.col){
      this.$emit('changeHeader1',this.primaryHeaderLocal)
      this.$emit('changeHeader2',this.secondaryHeaderLocal)}
      else{
          this.$emit('changeHeaders',this.secondaryHeaderLocal,this.primaryHeaderLocal)
      }
  }


}
</script>

<style lang="scss" scoped>

</style>