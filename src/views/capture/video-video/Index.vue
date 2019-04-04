<template>
  <div id="container">
    <h1>
      <a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"
        >WebRTC samples</a
      >
      <span>captureStream(): video to video</span>
    </h1>

    <video id="leftVideo" @play="handlePlay" playsinline controls loop muted>
      <source src="../../../assets/video/chrome.webm" type="video/webm" />
      <source src="../../../assets/video/chrome.mp4" type="video/mp4" />
      <p>This browser does not support the video element.</p>
    </video>

    <video
      id="rightVideo"
      :srcObject="rightVideoSrcObject"
      playsinline
      autoplay
    ></video>

    <p>Press play on the left video to start the demo.</p>

    <p>
      A stream is captured from the video element on the left using its
      <code>captureStream()</code> method and set as the
      <code>srcObject</code> of the video element on the right.
    </p>

    <p>
      The <code>stream</code> variable are in global scope, so you can inspect
      them from the browser console.
    </p>

    <a
      href="https://github.com/webrtc/samples/tree/gh-pages/src/content/capture/video-video"
      title="View source for this page on GitHub"
      id="viewSource"
      >View source on GitHub</a
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  // private leftVideo: any = null;
  private rightVideoSrcObject: any = null;
  private created() {
    console.log("video-video created . ");
  }
  private mounted() {
    // const leftVideo = document.getElementById("leftVideo");
    // const rightVideo = document.getElementById("rightVideo");
    //
    // this.$nextTick(() => {
    //   leftVideo.addEventListener("canplay", () => {
    //     // this.rightVideoSrcObject = this.leftVideo.captureStream();
    //     console.log(
    //       "this.leftVideo.captureStream() is ",
    //       leftVideo.captureStream()
    //     );
    //     rightVideo.srcObject = leftVideo.captureStream();
    //   });
    // });
  }
  private handlePlay() {
    console.log("handlePlay begins . ");
    const leftVideo: any = document.getElementById("leftVideo");
    const rightVideo: any = document.getElementById("rightVideo");
    console.log(
      "this.leftVideo.captureStream() is ",
      leftVideo.captureStream()
    );
    rightVideo.srcObject = leftVideo.captureStream();
    // this.$nextTick(() => {
    //   this.rightVideoSrcObject = leftVideo.captureStream();// 无效？？？？？
    // });
  }
}
</script>

<style scoped lang="scss">
video {
  margin: 0 10px 0 0;
  width: calc(50% - 7px);
}

video:last-of-type {
  margin-right: 0;
}

@media screen and (max-width: 400px) {
  video {
    margin: 0 5px 20px 0;
    width: calc(50% - 5px);
  }
}
</style>
