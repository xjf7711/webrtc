<template>
  <div class="layout">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "./Footer.vue";
import Header from "./Header.vue";

@Component({
  components: {
    VFooter: Footer,
    VHeader: Header
  }
})
export default class Index extends Vue {
  private created() {
    console.log("layout/index.vue begins.  ");
  }
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
