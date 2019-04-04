<template>
  <van-cell-group>
    <van-cell
      is-link
      v-for="(item, index) in routes"
      :key="index"
      :title="item.meta.title"
      @click="routeTo(item)"
    ></van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { deviceRouteMap } from "@/router";
@Component
export default class Index extends Vue {
  private routes: any[] = deviceRouteMap;
  private created() {
    console.log("device created . ");
    console.log("routes is ", this.routes);
  }
  private routeTo(item: any) {
    this.$router.push({ path: item.path });
  }
}
</script>

<style scoped></style>
