<template>
  <van-cell-group>
    <van-cell
      is-link
      v-for="(item, index) in routes"
      :key="index"
      :title="item.meta.title"
      @click="routeTo(item.path)"
    ></van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { captureRouteMap } from "@/router";
@Component
export default class Index extends Vue {
  private routes: any[] = captureRouteMap;
  private created() {
    console.log("getusermedia created . ");
    console.log("routes is ", this.routes);
  }
  private routeTo(path: string) {
    this.$router.push({ path });
  }
}
</script>

<style scoped></style>
