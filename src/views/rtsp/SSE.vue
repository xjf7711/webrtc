<template>
  <div>
    <h1>sse</h1>
    <!--<div>{{ nodeMsg }}</div>-->
    <!--<div id="get_message">{{ msg }}</div>-->
    <van-button v-for="n in 10" :key="n" @click="createSSE(n+2)">create{{n+2}}</van-button>

    <!--<van-row>-->
      <!--<van-col v-for="n in 8" :key="n" span="12">-->
        <!--<img :src="imgUrls[n + 2]" alt="sse base64" height="300px" />-->
      <!--</van-col>-->
    <!--</van-row>-->
    <!--<img :src="imgUrls[9]" alt="9...." />-->
    <canvas id="canvas" ref="canvas"></canvas>
    <!--<br/>-->
    <h1>......</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SSE extends Vue {
  // private msg: string = "message";
  private imgUrls: string[] = [];
  private canvas: any = null;
  private ctx: any = null;
  private source: any = null;
  // private nodeMsg: string = "";
  private mounted() {
    this.canvas = document.getElementById("canvas");
    // console.log("this.canvas.width is ", this.canvas.width);
    // this.canvas.width = WIDTH;
    // this.canvas.height = HEIGHT;
    this.ctx = this.canvas.getContext("2d");
    // this.sse("node");
    // this.sse("python");
    // for (let i = 3; i < 13; i++) {
    //   setTimeout(() => {
    //     this.createSSE(i);
    //   }, 1200 * i);
    // }
    // this.createSSE(13);
    // this.createSSE(12);
    // this.createSSE(11);
    // this.createSSE(10);
    this.createSSE(9);
    // this.createSSE(8);
    // this.createSSE(7);
    // this.createSSE(6);
    // this.createSSE(5);
    // this.createSSE(4);
    // this.createSSE(3);
  }
  private destroyed() {
    this.source.forEach(item => item.close())
  }
  private sse(path: string) {
    let url = "/" + path + "Sse/stream3";
    if (process.env.NODE_ENV === "production") {
      url = "http://192.168.11.47:8282/stream3";
    }
    const source = new EventSource(url);
    source.addEventListener(
      "message",
      (event: any) => {
        console.log("source get message . ");
        // const data = JSON.parse(event.data);
        const data = event.data;
        // this.msg = data;
        this.imgUrls[3] = "data:image/jpeg;base64," + data;
        // const ctx = (this.$refs.canvas as any).getContext('2d');
        // ctx.drawImage(img, 0, 0, 220,120)
      },
      false
    );
    source.addEventListener(
      "error",
      (event: any) => {
        console.log("error reconnected service!");
        console.log(event);
      },
      false
    );
  }

  // 在canvas中显示，清晰度更高，且可以放大。
  private showCanvas(data: string) {
    // console.log("showCanvas begins . ");
    // console.log(img.width);
    // ctx.drawImage(img, 0, 0, 220,120)
    // const canvas:any = document.getElementById("canvas");
    const img = new Image();
    // img.width = 400;
    // img.height = 300;
    img.src = "data:image/jpeg;base64," + data;

    // 图片加载完成后再在canvas中显示。
    img.onload = () => {
      // canvas 默认宽度是300
      if (img.width !== 0 && this.canvas.width === 300) {
        console.log("set canvas width and height . ");
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        // this.ctx = this.canvas.getContext("2d");
      }

      // const ctx: any = canvas.getContext("2d");
      this.ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }
  private createSSE(num: number) {
    console.log("createSSE begins. ");
    console.log(num);
    let url = "/pythonSse/stream?id=" + num;
    if (process.env.NODE_ENV === "production") {
      url = "http://192.168.11.47:8282/stream?id=" + num;
    }
    if (this.source[num]) {
      this.source[num].close();
    }
    this.source[num] = new EventSource(url);
    this.source[num].addEventListener(
      "message",
      (event: any) => {
        // const data = JSON.parse(event.data);
        const data = event.data;
        // console.log("event data is ", data);
        // 显示图片大小
        // const length = Number(data.length);
        // console.log(
        //   "data size is ",
        //   length - (length / 8) * 2
        // );

        this.showCanvas(data);

        this.$set(this.imgUrls, num, "data:image/jpeg;base64," + data);
      },
      false
    );
    this.source[num].addEventListener(
      "error",
      (event: any) => {
        console.log("error reconnected service!");
        console.log(event);
      },
      false
    );
  }
}
</script>

<style scoped></style>
