<template>
        <b-modal centered v-model="show" hide-footer>        
                <template #modal-title>
                    Crear una vista personalizada
                </template>
                <div class="form-group">
                    <div class="form_group--input field">
                      <input type="input" class="form__field" placeholder="Nombre de la vista" name="view" id='view' required v-model="view.name" />
                      <label for="view" class="form__label">Nombre de la vista</label>
                    </div>
                </div>
                <b-row>
                    <b-col >
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(0)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                    <b-col>
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(1)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                    <b-col>
                           <b-form-checkbox  v-for="(field,i) in getLabelsLenght(2)" :key="i" v-model="field.selected">{{field.label}}</b-form-checkbox>
                    </b-col>
                </b-row>             
                <b-button class="button-primary mt-5" block @click="createView()">Crear vista</b-button>
        </b-modal>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { UserField, View } from '../../interfaces/views.interface';

@Component
export default class CreateUserViewModal extends Vue {
    @Prop() showModal!: boolean;
    @Prop() fields!: UserField[];
    $bvToast: any;
    view : View= {
      columns: [],
      name: ''
    }
    show = false;

    @Watch('showModal')
    renderModal(){
        this.show = this.showModal
    }

    getLabelsLenght(start: number): Object{
      let fields = Math.ceil(this.fields.length / 3);
      start = start * fields;
      let currentItems = this.fields.slice(start,start+fields);
      return currentItems;
  }

    showToast(variant: string,body: string, header: string){
        this.$bvToast.toast(header, {
            title: body,
            variant: variant,
            solid: true
        });
    }

    clearSelectedFields(){
        for (var i=0;i<this.fields.length;i++){
        this.fields[i].selected = false
        }
    }

    createView(){
            for (var i=0;i<this.fields.length;i++){
              if (this.fields[i].selected === true){
                    this.view.columns.push(this.fields[i])
              }
            }
        if (this.view.name !== '' && this.view.columns.length >0){ 
              this.$emit('createView', this.view)
              this.showToast('success',`Creación de vista`,`Se ha creado la vista ${this.view.name} exitosamente`);
              this.view.columns=[]
              this.view.name = ''
              this.clearSelectedFields();
              this.show = false;
        }
        else  this.showToast('danger',`Creación de vista`,`Ha ocurrido un error creando la vista personalizada`)
  }
}
</script>

<style>

</style>