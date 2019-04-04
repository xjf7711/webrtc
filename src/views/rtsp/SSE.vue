<template>
  <div>
    <h1>sse</h1>
    <!--<div>{{ nodeMsg }}</div>-->
    <!--<div id="get_message">{{ msg }}</div>-->
    <img :src="imgUrl" alt="sse base64"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class SSE extends Vue {
  // private msg: string = "message";
  private imgUrl: string = "";
  // private nodeMsg: string = "";
  private mounted() {
    // this.sse("node");
    this.sse("python");
  }
  private sse(path: string) {
    let url = "/" + path + "Sse/stream";
    if (process.env.NODE_ENV === "production") {
      url = "http://192.168.11.47:8282/stream";
    }
    const source = new EventSource(url);
    source.addEventListener(
      "message",
      (event: any) => {
        // const data = JSON.parse(event.data);
        const data = event.data;
        // $("#get_message").append(data.message + "&nbsp;&nbsp;&nbsp;&nbsp;");
        // this.msg = data;
        this.imgUrl = "data:image/jpeg;base64," + data;
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
  // pythonServe() {
  //   //只接收channel为channel_bob的消息
  //   const pythonSource = new EventSource("/pythonSse/stream");
  //   pythonSource.addEventListener(
  //           "message",
  //           (event: any) => {
  //             // const data = JSON.parse(event.data);
  //             const data = event.data;
  //             // $("#get_message").append(data.message + "&nbsp;&nbsp;&nbsp;&nbsp;");
  //             this.nodeMsg = data;
  //           },
  //           false
  //   );
  //   pythonSource.addEventListener(
  //           "error",
  //           (event: any) => {
  //             console.log("reconnected service!");
  //             console.log(event);
  //           },
  //           false
  //   );
  // }
}
</script>

<style scoped></style>
