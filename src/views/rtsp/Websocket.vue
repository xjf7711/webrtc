<template>
  <div>
    <img :src="imgSrc" class="img" alt="websocket image. " />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Websocket extends Vue {
  private imgSrc: string = "";
  private ws: any = null;
  private mounted() {
    this.startWS();
  }
  private destroyed() {
    this.ws.close();
  }
  private startWS() {
    console.log("startWS begins. ");
    const pyip = "192.168.11.47";
    this.ws = new WebSocket("ws://" + pyip + ":8124/");
    console.log("this.ws is ", this.ws);
    this.ws.onopen = (event: any) => {
      console.log("ws.onopen res is ", event);
      // console.log('websocketsend begins. ');
      // const actions = { 'test': '12345' };
      // ws.send(JSON.stringify(actions))
    };
    this.ws.onmessage = (messageEvent: any) => {
      // console.log("ws.onmessage res is ", message);
      // messageEvent
      // console.log('receive message : ' + message.data);
      // $("#img").attr("src",message.data);
      this.imgSrc = messageEvent.data;
      //var image = new Image();
      //image.onload = function () {
      //	context.clearRect(0, 0,  canvas.width, canvas.height);
      //	context.drawImage(image, 0, 0,canvas.width, canvas.height);
      //}
      //image.src =message.data;
    };
    this.ws.onerror = (error: any) => {
      // console.log("ws error: " + error.name + error.number);
      console.log("ws.onerror ", error);
      this.startWS();
    };
    this.ws.onclose = () => {
      console.log("webSocket closed");
    };
    // this.ws.send("websocket from js");
  }
}
</script>

<style scoped></style>
