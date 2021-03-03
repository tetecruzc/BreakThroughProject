.<template>
  <b-col cols="2"  class="side-bar" align-self="stretch" sticky>
        <b-row  v-for="(link,i) in links" :key="i" :class=" link.active === true ? 'link-active p-3 link' : 'p-3 link'">
          <b-icon :icon="link.icon" class="icon-dark"></b-icon>
           <div class="ml-3 hide-on-tab-port">{{link.name}}</div> 
        </b-row>
 </b-col>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SideNav extends Vue {
    @Prop() links! : Array<Object>;
}
</script>

<style>

</style>