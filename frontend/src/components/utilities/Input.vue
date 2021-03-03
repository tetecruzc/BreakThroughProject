<template>
  <div class="form-group">
        <b-icon v-if="icon" :icon="icon" class="icon-dark b-icon--input" aria-hidden="true" ></b-icon>
        <div class="form_group--input field">
            <input type="input" class="form__field" :placeholder="placeholder"  :name="label" :id='label' required v-model="vmodel"/>
            <label :for="label" class="form__label">{{label}}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop , Watch} from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class Input extends Vue {
    @Prop() label? : string;
    @Prop() placeholder? : string;
    @Prop() icon? : string;
    @Prop() keyValue? : string;
    vmodel : string = "";

    @Watch('vmodel')
    onVmodelChange(value: any){
        this.$emit('clicked', {value: value, key: this.keyValue})
    }

}
</script>
