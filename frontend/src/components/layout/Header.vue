.<template>
  <b-navbar sticky toggleable="lg">
    <b-icon icon="compass" class="icon-light mr-2" font-scale="2"></b-icon>
    <b-navbar-brand href="#">IntraSys</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
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