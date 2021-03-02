.<template>
  <b-card class="filter-card" :header="title">
      <slot></slot>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Box extends Vue {
    @Prop() title? : string;
}
</script>

<style scoped>

</style>