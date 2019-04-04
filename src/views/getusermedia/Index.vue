<template>
  <van-cell-group>
    <van-cell
      is-link
      v-for="item in routes"
      :title="item.meta.title"
      @click="routeTo(item)"
    ></van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gumRouteMap } from "@/router";
@Component
export default class Index extends Vue {
  private routes: any[] = gumRouteMap;
  private created() {
    console.log("getusermedia created . ");
    console.log("routes is ", this.routes);
  }
  private routeTo(item: any) {
    this.$router.push({ path: item.path });
  }
}
</script>

<style scoped></style>
