<template>
  <van-row>
    <van-col :span="7">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in routes"
          :key="index"
          :title="item.meta.title"
          center
          is-link
          :class="{ 'cell-active': $route.path.split('/')[2] === item.path }"
          @click="routeTo(item.path)"
        >
          <svg-icon
            :name="item.meta.icon"
            :class="{ 'svg-active': $route.path.split('/')[2] === item.path }"
            class="tab-icon"
            slot="icon"
          ></svg-icon>
        </van-cell>
      </van-cell-group>
    </van-col>
    <van-col :span="17">
      <router-view></router-view>
    </van-col>
  </van-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { constantRouteMap } from "@/router";

@Component
export default class Config extends Vue {
  private routes = constantRouteMap;
  private cellActive: any = {
    backgroundColor: "#ddd"
  };
  private svgActive: any = {
    fill: "#26a2ff"
  };
  private routeTo(path: string) {
    this.$router.push({
      path: "/webRTC/" + path
    });
  }
  private mounted() {
    console.log("this.$route.path is ", this.$route.path);
  }
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
.tab-icon {
  /*width: 18px;*/
  padding: 0 8px 0 0;
}
.cell-active {
  background-color: #ddd;
  color: #26a2ff;
}
.svg-active {
  fill: #26a2ff;
}
</style>
