<template>
  <b-modal centered v-model="show" hide-footer>
            <template #modal-title>
                {{title}} {{col.name}}
            </template>
            <b-card no-body>
                <b-row class="vertical-tabs">
                    <b-col class="vertical-tabs__tabs pa-0">
                        <b-row  v-for="(tab,i) in primaryHeaderLocal" :key="i" :class="isCurrentTab(tab) === true ? 'tabs p-2 active' : 'tabs p-2'" @click="changeCurrentTab(tab)">
                            <p>{{tab.name}}</p>
                            <b-icon icon="chevron-right" class="icon-dark icon-small mr-2" ></b-icon>
                        </b-row>
                    </b-col>
                    <b-col class="vertical-tabs__content pa-0">
                        <b-row v-for="(content,j) in categoryChildren" :key="j">
                            <b-form-checkbox class="my-2" v-model="content.shown">{{content.name}}</b-form-checkbox>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
            <b-button class="button-primary mt-5" block @click="saveView()">Guardar Vista</b-button>
  </b-modal>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class AddColumnPopup extends Vue {
    @Prop() title?: string; 
    @Prop() currentChildren!: Array<any>; 
    @Prop() primaryHeader!: Array<any>;
    @Prop() secondaryHeader!: Array<any>;
    @Prop() col: any;
    @Prop() showModal!: boolean;
    show: boolean = false;
    currentTab: any = {}
    primaryHeaderLocal : Array<any> = []
    secondaryHeaderLocal : Array<any> = []

    mounted(){
       this.primaryHeaderLocal = this.primaryHeader;
       this.secondaryHeaderLocal = this.secondaryHeader;
    }

    @Watch('showModal')
    renderModal(){
        this.show = this.showModal
    }
    @Watch('show')
    sendToParent(newVal: boolean){
        this.$emit('changeModalStatus', newVal)
    }

    get categoryChildren() : Array<any>{
        let children : any = []
        for (let i in this.secondaryHeaderLocal){
            if (this.secondaryHeaderLocal[i].parent === this.currentTab.key) children.push(this.secondaryHeaderLocal[i])
        }
        return children
    }


    changeCurrentTab(tab: any){
        this.currentTab = tab;
    }

    isCurrentTab(tab: any): boolean{
        if (tab === this.currentTab) return true
        else return false
    }


  saveView(){
      this.show = false;
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
             this.primaryHeaderLocal[i].shown = false
          }
      }
      this.$emit('changeHeader1',this.primaryHeaderLocal)
      this.$emit('changeHeader2',this.secondaryHeaderLocal)
  }

}
</script>

<style lang="scss" scoped>

</style>