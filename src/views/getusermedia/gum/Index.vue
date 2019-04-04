<template>
  <div id="container">
    <h1>
      <!--<a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"-->
      <!--&gt;WebRTC samples</a-->
      <!--&gt;-->
      <span>getUserMedia</span>
    </h1>

    <video id="gum-local" autoplay playsinline></video>
    <van-row>
      <van-col span="12">
        <van-button type="danger" @click="handleOpen">Open camera</van-button>
      </van-col>
      <!--<van-col span="12">-->
      <!--<van-button type="primary" @click="fetchRtsp">fetch rtsp</van-button>-->
      <!--</van-col>-->
    </van-row>
    <div id="errorMsg">{{ errorMsg }}</div>

    <p class="warning">
      <strong>Warning:</strong> if you're not using headphones, pressing play
      will cause feedback.
    </p>

    <p>
      Display the video stream from <code>getUserMedia()</code> in a video
      element.
    </p>

    <p>
      The <code>MediaStream</code> object <code>stream</code> passed to the
      <code>getUserMedia()</code> callback is in global scope, so you can
      inspect it from the console.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fetchRtsp } from "@/api/rtsp";

@Component
export default class Index extends Vue {
  // Put variables in global scope to make them available to the browser console.
  private errorMsg: string = "";
  // 媒体请求的参数，video:true表示调用摄像头，audio:true表示调用麦克风
  private constraints: any = ((window as any).constraints = {
    audio: false,
    video: true
  });

  private mounted() {
    console.log("gum mounted. ");
    // 兼容各个浏览器
    // @ts-ignore
    // navigator.getUserMedia =
    //   navigator.getUserMedia ||
    //   // @ts-ignore
    //   navigator.webkitGetUserMedia ||
    //   // @ts-ignore
    //   navigator.mozGetUserMedia ||
    //   // @ts-ignore
    //   navigator.msGetUserMedia;
    // document.querySelector('#showVideo').addEventListener('click', e => this.init(e));
  }

  private fetchRtsp() {
    fetchRtsp().then((res: any) => {
      console.log("fechtRtsp res is ", res);
    });
  }

  private async handleOpen(event: any) {
    console.log("handleOpen begins . ");
    console.log("event is ", event);
    try {
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.handleSuccess(stream);
      event.target.disabled = true;
    } catch (e) {
      this.handleError(e);
    }
    // navigator.mediaDevices
    //   .getUserMedia(this.constraints)
    //   .then((stream: any) => {
    //     /* use the stream */
    //     console.log("stream is ", stream);
    //     this.handleSuccess(stream);
    //     event.target.disabled = true;
    //   })
    //   .catch((error: any) => {
    //     console.error("catch, ", error.message);
    //     this.handleError(error);
    //   });
  }

  private handleSuccess(stream: any) {
    console.log("handleSuccess begins. ");
    const video: any = document.querySelector("video");
    const videoTracks: any = stream.getVideoTracks();
    console.log("Got stream with constraints:", this.constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    // make variable available to browser console
    // @ts-ignore
    (window as any).stream = stream;
    video.srcObject = stream;
  }

  private handleError(error: any) {
    if (error.name === "ConstraintNotSatisfiedError") {
      const v: any = this.constraints.video;
      this.errorMsg = `The resolution ${v.width.exact}x${
        v.height.exact
      } px is not supported by your device.`;
    } else if (error.name === "PermissionDeniedError") {
      this.errorMsg =
        "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the demo to work.";
    }
    this.errorMsg = `getUserMedia error: ${error}`;
    if (typeof error !== "undefined") {
      console.error(error.message);
    }
  }

  // private errorMsg(msg: string, error: any) {
  //   const errorElement: any = document.querySelector("#errorMsg");
  //   errorElement.innerHTML += `<p>${msg}</p>`;
  //   if (typeof error !== "undefined") {
  //     console.error(error);
  //   }
  // }
}
</script>

<style scoped lang="scss"></style>
