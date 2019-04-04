<template>
  <van-nav-bar :title="headerTitle">
    <router-link :to="backPath" slot="left" v-if="back">
      <van-icon name="arrow-left" size="22px" color="#ffffff"></van-icon>
    </router-link>
  </van-nav-bar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
  private created() {
    console.log("Header.vue created begins. ");
  }
  //根据路由设置头部显示的title
  get headerTitle() {
    // console.log("this.$route is ", this.$route);
    return this.$route.meta.title;
  }
  get back() {
    console.log("this.$route.path is ", this.$route.path);
    return !this.$route.path.includes("/index");
  }
  get backPath() {
    if (!this.$route.path.includes("/index")) {
      console.log(
        "this.$route.path.split('/') is ",
        this.$route.path.split("/")
      );
      return "/" + this.$route.path.split("/")[1];
    }
  }
}
</script>
