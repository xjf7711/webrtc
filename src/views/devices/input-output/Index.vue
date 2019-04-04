<template>
  <div id="container">
    <h1>
      <a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"
        >WebRTC samples</a
      ><span>Select sources &amp; outputs</span>
    </h1>

    <p>
      Get available audio, video sources and audio output devices from
      <code>mediaDevices.enumerateDevices()</code> then set the source for
      <code>getUserMedia()</code> using a <code>deviceId</code> constraint.
    </p>

    <div class="select">
      <label for="audioSource">Audio input source: </label
      ><select id="audioSource"></select>
    </div>

    <div class="select">
      <label for="audioOutput">Audio output destination: </label
      ><select id="audioOutput"></select>
    </div>

    <div class="select">
      <label for="videoSource">Video source: </label
      ><select id="videoSource"></select>
    </div>

    <video id="video" playsinline autoplay></video>

    <p class="small">
      <b>Note:</b> If you hear a reverb sound your microphone is picking up the
      output of your speakers/headset, lower the volume and/or move the
      microphone further away from your speakers/headset.
    </p>

    <a
      href="https://github.com/webrtc/samples/tree/gh-pages/src/content/devices/input-output"
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
  private videoElement: any = null;
  private audioInputSelect: any = null;
  private audioOutputSelect: any = null;
  private videoSelect: any = null;
  private selectors: any = null;

  private created() {
    console.log("multi created . ");
  }
  private mounted() {
    this.videoElement = document.querySelector("video");
    this.audioInputSelect = document.querySelector("select#audioSource");
    this.audioOutputSelect = document.querySelector("select#audioOutput");
    this.videoSelect = document.querySelector("select#videoSource");
    this.selectors = [this.audioInputSelect, this.audioOutputSelect, this.videoSelect];

    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices)
      .catch(this.handleError);

    this.audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);
    this.audioInputSelect.onchange = this.start;
    this.audioOutputSelect.onchange = this.changeAudioDestination;

    this.videoSelect.onchange = this.start;

    this.start();
  }
  private gotDevices(deviceInfos: any) {
    // Handles being called several times to update labels. Preserve values.
    const values = this.selectors.map((select: any) => select.value);
    this.selectors.forEach((select: any) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === "audioinput") {
        option.text =
          deviceInfo.label || `microphone ${this.audioInputSelect.length + 1}`;
        this.audioInputSelect.appendChild(option);
      } else if (deviceInfo.kind === "audiooutput") {
        option.text =
          deviceInfo.label || `speaker ${this.audioOutputSelect.length + 1}`;
        this.audioOutputSelect.appendChild(option);
      } else if (deviceInfo.kind === "videoinput") {
        option.text = deviceInfo.label || `camera ${this.videoSelect.length + 1}`;
        this.videoSelect.appendChild(option);
      } else {
        console.log("Some other kind of source/device: ", deviceInfo);
      }
    }
    this.selectors.forEach((select: any, selectorIndex: number) => {
      if (
        Array.prototype.slice
          .call(select.childNodes)
          .some((n: any) => n.value === values[selectorIndex])
      ) {
        select.value = values[selectorIndex];
      }
    });
  }
  // Attach audio output device to video element using device/sink ID.
  private attachSinkId(element: any, sinkId: any) {
    if (typeof element.sinkId !== "undefined") {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch((error: any) => {
          let errorMessage = error;
          if (error.name === "SecurityError") {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          this.audioOutputSelect.selectedIndex = 0;
        });
    } else {
      console.warn("Browser does not support output device selection.");
    }
  }

  private changeAudioDestination() {
    const audioDestination = this.audioOutputSelect.value;
    this.attachSinkId(this.videoElement, audioDestination);
  }

  private gotStream(stream: any) {
    (window as any).stream = stream; // make stream available to console
    this.videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  private handleError(error: any) {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  }

  private start() {
    if ((window as any).stream) {
      (window as any).stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
    const audioSource = this.audioInputSelect.value;
    const videoSource = this.videoSelect.value;
    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
      video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(this.gotStream)
      .then(this.gotDevices)
      .catch(this.handleError);
  }
}
</script>

<style scoped lang="scss">
div.select {
  display: inline-block;
  margin: 0 0 1em 0;
}

p.small {
  font-size: 0.7em;
}

label {
  width: 12em;
  display: inline-block;
}
</style>
