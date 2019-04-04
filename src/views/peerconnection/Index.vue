<template>
  <van-cell-group>
    <van-cell
            is-link
            v-for="(item,index) in routes"
            :key="index"
            :title="item.meta.title"
            @click="routeTo(item.path)"
    ></van-cell>
  </van-cell-group>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { pcRouteMap } from "@/router";
  @Component
  export default class Index extends Vue {
    private routes: any[] = pcRouteMap;
    private created() {
      console.log("peerconnection created . ");
    }
    private routeTo(path: string) {
      console.log("routes is ", this.routes);
      this.$router.push({ path });
    }
  }
</script>

<style scoped lang="ts"></style>
