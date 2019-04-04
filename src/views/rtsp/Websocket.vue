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
  private mounted() {
    this.startWS();
  }
  private startWS() {
    console.log("startWS begins. ");
    const pyip = "192.168.11.47";
    const ws = new WebSocket("ws://" + pyip + ":8124/");
    console.log("ws is ", ws);
    ws.onopen = (event: any) => {
      console.log("ws.onopen res is ", event);
      // console.log('websocketsend begins. ');
      // const actions = { 'test': '12345' };
      // ws.send(JSON.stringify(actions))
    };
    ws.onmessage = (messageEvent: any) => {
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
    ws.onerror = (error: any) => {
      // console.log("ws error: " + error.name + error.number);
      console.log("ws.onerror ", error);
      this.startWS();
    };
    ws.onclose = () => {
      console.log("webSocket closed");
    };
    // ws.send("websocket from js");
  }
}
</script>

<style scoped></style>
