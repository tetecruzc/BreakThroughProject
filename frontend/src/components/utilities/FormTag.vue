<template>  
    <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus >
        <template v-slot="{ tags, disabled, addTag, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block ">
            <li v-for="(tag,i) in tags" :key="i" class="list-inline-item">
              <b-row class="my-1">
                  <b-col class="mr-auto">
                      <b-form-tag
                    @remove="remove(removeTag, tag)"
                    :title="tag"
                    :disabled="disabled"
                    variant="info"     
                >{{ tag }}</b-form-tag>
                  </b-col>
                <b-col class="ml-auto">
                     <b-form-radio-group 
                      v-model="currentTags[i].sorto"
                      @change="changeOrderStatus()"
                      :options="switches"
                      class="mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
                    ></b-form-radio-group>
                </b-col>
              </b-row>
            </li>
          </ul>
          <b-dropdown v-if="tags.length < 3" block variant="outline">
            <template #button-content>
              <!-- <b-icon icon="tag-fill"></b-icon>-->
               Seleccione una columna 
            </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
                <b-form-group
                  label="Buscar columna"
                  label-for="tag-search-input"
                  label-cols-md="auto"
                  class="mb-0"  
                  :disabled="disabled"
                >
                </b-form-group>
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"    
                  autocomplete="off"
                 ></b-form-input>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptions"
              :key="option.key"
              @click="onOptionClick( option, addTag, tags )">
              {{option.name}}
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptions.length === 0" class="pa-2">
              No hay columnas disponibles para seleccionar
            </b-dropdown-text>
          </b-dropdown>
        </template>
    </b-form-tags>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';


@Component({
    components:{
    }
})
export default class FormTag extends Vue {
    @Prop() options! : Array<any>
    optionStrings : Array<any> = []
    value: Array<any> = []
    addTag: any
    inputAttrs: any;
    search =''
    currentTags : Array<any> = []
    switches= [
          { item: 'Asc', name: 'Asc' },
          { item: 'Desc', name: 'Desc' }
    ]

    @Watch('options')
    watchOptions(){
        this.options.forEach(el =>{
            this.optionStrings.push(el.name)
        })
    }

    changeOrderStatus(){
      this.$emit('setTags', this.getSortoObject())
    }

     get criteria() {
        // Compute the search criteria
        return this.search.trim().toLowerCase()
      }

      get availableOptions() {
        const criteria = this.criteria
        // Filter out already selected options
        const options = this.options.filter(el => this.value.indexOf(el) === -1)
        if (criteria) {
          // Show only options that match criteria
          return options.filter(el => el.name.toLowerCase().indexOf(criteria) > -1);
        }
        // Show all options available 
        let newOptions : Array<any> = []  
        options.forEach(el =>{
           if (!this.currentTags.find(e => e.key === el.key))
            newOptions.push(el)
        })
        return newOptions
      }

      onOptionClick( option: any, addTag: any , tags: any) {
        addTag(option.name)
        this.search = ''
        //this.tags = tags
        option.sorto = 'Asc'
        this.currentTags.push(option)
        this.$emit('setTags',this.getSortoObject())
      }

      remove(removeTag : any, tag: any){
        removeTag(tag)
        this.currentTags = this.currentTags.filter(el =>el.name !== tag)
        this.$emit('setTags',this.getSortoObject())
      }

      getSortoObject(){
         let object : any = {}
         this.currentTags.forEach(el =>{
            object[el.key] = el.sorto.toLowerCase();
            console.log(el.sorto.toLowerCase())
         })
         return object
       }

      
}
</script>