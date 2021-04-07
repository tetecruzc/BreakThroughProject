.<template>
  <b-navbar sticky toggleable="lg">
    <b-icon v-b-toggle.sidebar-backdrop icon="list" class="icon-light mr-2" aria-hidden="true" font-scale="2"></b-icon>
    <!-- <b-icon icon="compass" class="icon-light mr-2" font-scale="2"></b-icon> -->
    <b-navbar-brand href="#">IntraSys</b-navbar-brand>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style>

</style>