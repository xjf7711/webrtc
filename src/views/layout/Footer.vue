<template>
  <van-tabbar :value="selectedIndex">
    <van-tabbar-item
      v-for="(item, index) in routes"
      :key="index"
      @click="routeTo(item.path, index)"
    >
      <span>{{ item.meta.title }}</span>
      <svg-icon
        slot="icon"
        class="iconfont tabs-icon"
        :name="item.meta.icon"
        :color="item.meta.index === selectedIndex ? '#1989fa' : ''"
      ></svg-icon>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { constantRouteMap } from "@/router.ts";
@Component
export default class Footer extends Vue {
  private routes: any[] = constantRouteMap;
  get selectedIndex() {
    console.log("this.$route.meta.index", this.$route.meta.index);
    return this.$route.meta.index;
  }
  private routeTo(path: string, index: number) {
    // this.selectedIndex = index;
    console.log("routeTo path is ", path);
    this.$router.push({ path });
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 24px;
}
.tabs-icon {
  fill: #999898;
}
</style>
