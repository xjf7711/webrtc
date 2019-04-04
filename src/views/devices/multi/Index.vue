<template>
  <div id="container">
    <h1>
      <!--<a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"-->
      <!--&gt;WebRTC samples</a-->
      <!--&gt;-->
      <span>getUserMedia: output device selection</span>
    </h1>

    <van-row>
      <van-col span="12">
        <h4>getUserMedia():</h4>
        <video
          class="gum"
          title="audio and video stream from getUserMedia()"
          @play="handleVideoPlay"
          playsinline
          autoplay
          controls
        ></video>
        <div class="outputSelector">
          <label>Select audio output: </label>
          <select></select>
        </div>
        <audio
          class="gum"
          @play="handleAudioPlay"
          title="audio stream from getUserMedia()"
          controls
        ></audio>
        <div class="outputSelector">
          <label>Select audio output: </label>
          <select></select>
        </div>
      </van-col>
      <van-col span="12">
        <h4>Local media files:</h4>
        <video
          title="local video file"
          playsinline
          controls
          loop
          poster="images/poster.jpg"
          preload="metadata"
        >
          <source src="./video/chrome.webm" type="video/webm" />
          <source src="./video/chrome.mp4" type="video/mp4" />
          <p>This browser does not support the video element.</p>
        </video>
        <div class="outputSelector">
          <label>Select audio output: </label>
          <select></select>
        </div>
        <audio title="local audio file" controls loop>
          <source src="./audio/audio.mp3" type="audio/mp3" />
          This browser does not support the audio element.
        </audio>
        <div class="outputSelector">
          <label>Select audio output: </label>
          <select></select>
        </div>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24"> </van-col>
      <van-col span="24"> </van-col>
    </van-row>
    <p>
      This demo must be run from localhost or over HTTPS Chrome 49 or later,
      Firefox is not supported yet.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  private gumAudio: any = null;
  private gumVideo: any = null;
  private created() {
    console.log("multi created . ");
  }
  private mounted() {
    console.log("multi mounted. ");
    this.gumAudio = document.querySelector("audio.gum");
    // this.gumAudio.addEventListener("play", () => {
    //   this.gumAudio.volume = 0.1;
    //   console.log("Audio lowered to reduce feedback from local gUM stream");
    // });
    this.gumVideo = document.querySelector("video.gum");
    // this.gumVideo.addEventListener("play", () => {
    //   this.gumVideo.volume = 0.1;
    //   console.log("Audio lowered to reduce feedback from local gUM stream");
    // });

    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices)
      .catch(this.handleError);

    this.start();
  }
  private handleAudioPlay() {
    this.gumAudio.volume = 0.1;
    console.log("Audio lowered to reduce feedback from local gUM stream");
  }
  private handleVideoPlay() {
    this.gumVideo.volume = 0.1;
    console.log("Video lowered to reduce feedback from local gUM stream");
  }
  private gotDevices(deviceInfos: any[]) {
    const masterOutputSelector = document.createElement("select");

    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === "audiooutput") {
        console.info("Found audio output device: ", deviceInfo.label);
        option.text =
          deviceInfo.label || `speaker ${masterOutputSelector.length + 1}`;
        masterOutputSelector.appendChild(option);
      } else {
        console.log("Found non audio output device: ", deviceInfo.label);
      }
    }

    // Clone the master outputSelector and replace outputSelector placeholders.
    const allOutputSelectors: any = document.querySelectorAll("select");
    // for (let selector: number = 0; selector < allOutputSelectors.length; selector++) {
    for (const selector of allOutputSelectors) {
      const newOutputSelector: any = masterOutputSelector.cloneNode(true);
      newOutputSelector.addEventListener("change", this.changeAudioDestination);
      // allOutputSelectors[selector].parentNode.replaceChild(
      selector.parentNode.replaceChild(
        newOutputSelector,
        selector
        // allOutputSelectors[selector]
      );
    }
  }

  // Attach audio output device to the provided media element using the deviceId.
  private attachSinkId(element: any, sinkId: number, outputSelector: any) {
    if (typeof element.sinkId !== "undefined") {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(
            `Success, audio output device attached: ${sinkId} to element with ${
              element.title
            } as source.`
          );
        })
        .catch((error: any) => {
          let errorMessage = error;
          if (error.name === "SecurityError") {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          outputSelector.selectedIndex = 0;
        });
    } else {
      console.warn("Browser does not support output device selection.");
    }
  }

  private changeAudioDestination(event: any) {
    const deviceId = event.target.value;
    const outputSelector = event.target;
    // FIXME: Make the media element lookup dynamic.
    const element = event.path[2].childNodes[1];
    this.attachSinkId(element, deviceId, outputSelector);
  }

  private gotStream(stream: any) {
    (window as any).stream = stream; // make stream available to console
    this.gumAudio.srcObject = stream;
    this.gumVideo.srcObject = stream;
  }

  private start() {
    if ((window as any).stream) {
      (window as any).stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
    const constraints = {
      audio: true,
      video: true
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(this.gotStream)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  }
}
</script>

<style scoped lang="scss">
audio {
  margin: 0 0 1.5em 0;
  width: 100%;
}

div#sources > div {
  float: left;
  margin: 0 1em 0 0;
  width: calc(50% - 0.5em);
}

div#sources > div:last-of-type {
  margin: 0;
}

select {
  margin: 0 0 0.5em 0;
}

video {
  background: black;
  height: 234px;
}
</style>
