<template>
  <div id="container">
    <h1>
      <!--<a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"-->
        <!--&gt;WebRTC samples</a-->
      <!--&gt;-->
      <span>Multiple peer connections</span>
    </h1>
    <van-row class="row">
      <van-col class="col" span="8">
        <video
          ref="video1"
          id="video1"
          :srcObjec="video1SrcObject"
          playsinline
          autoplay
          muted
        ></video>
      </van-col>
      <van-col class="col" span="8">
        <video
          ref="video2"
          id="video2"
          :srcObjec="video2SrcObject"
          playsinline
          autoplay
        ></video>
      </van-col>
      <van-col class="col" span="8">
        <video
          ref="video3"
          id="video3"
          :srcObjec="video3SrcObject"
          playsinline
          autoplay
        ></video>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="8">
        <van-button
          type="primary"
          ref="startButton"
          id="startButton"
          @click="start"
          :disabled="startButtonDisabled"
        >
          Start
        </van-button>
      </van-col>
      <van-col span="8">
        <van-button
          type="warning"
          ref="callButton"
          id="callButton"
          @click="call"
          :disabled="callButtonDisabled"
        >
          Call
        </van-button>
      </van-col>
      <van-col span="8">
        <van-button
          type="danger"
          ref="hangupButton"
          id="hangupButton"
          @click="hangup"
          :disabled="hangupButtonDisabled"
        >
          Hang Up
        </van-button>
      </van-col>
    </van-row>

    <p>
      View the console to see logging and to inspect the
      <code>MediaStream</code> object <code>localStream</code>.
    </p>

    <p>
      For more information about RTCPeerConnection, see
      <a
        href="http://www.html5rocks.com/en/tutorials/webrtc/basics/"
        title="HTML5 Rocks article about WebRTC by Sam Dutton"
        >Getting Started With WebRTC</a
      >.
    </p>

    <a
      href="https://github.com/webrtc/samples/tree/gh-pages/src/content/peerconnection/multiple"
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
  private hangupButtonDisabled: boolean = true;
  private callButtonDisabled: boolean = true;
  private startButtonDisabled: boolean = false;
  private pc1Local: any = null;
  private pc1Remote: any = null;
  private pc2Local: any = null;
  private pc2Remote: any = null;
  private offerOptions: any = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };
  private video1SrcObject: any = null;
  private video2SrcObject: any = null;
  private video3SrcObject: any = null;

  private created() {
    console.log("peerconnection multiple created. ");
  }

  private mounted() {
    // const startButton = document.getElementById("startButton");
    // const callButton = document.getElementById("callButton");
    // const hangupButton = document.getElementById("hangupButton");
    // this.callButtonDisabled = true;
    // this.hangupButtonDisabled = true;
    // startButton.onclick = this.start;
    // callButton.onclick = call;
    // hangupButton.onclick = hangup;
    // const video1 = document.querySelector('video#video1');
    // const video2 = document.querySelector('video#video2');
    // const video3 = document.querySelector('video#video3');
  }
  private gotStream(stream: any) {
    console.log("Received local stream");
    this.video1SrcObject = stream;
    (window as any).localStream = stream;
    this.callButtonDisabled = false;
  }
  private start() {
    console.log("Requesting local stream");
    this.startButtonDisabled = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(this.gotStream)
      .catch((e: any) => {
        console.log("start getUserMedia() error: ", e);
      });
  }

  private call() {
    this.callButtonDisabled = true;
    this.hangupButtonDisabled = false;
    console.log("Starting calls");
    const audioTracks = (window as any).localStream.getAudioTracks();
    const videoTracks = (window as any).localStream.getVideoTracks();
    if (audioTracks.length > 0) {
      console.log(`Using audio device: ${audioTracks[0].label}`);
    }
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }
    // Create an RTCPeerConnection via the polyfill.
    const servers: any = null;
    this.pc1Local = new RTCPeerConnection(servers);
    this.pc1Remote = new RTCPeerConnection(servers);
    this.pc1Remote.ontrack = this.gotRemoteStream1;
    this.pc1Local.onicecandidate = this.iceCallback1Local;
    this.pc1Remote.onicecandidate = this.iceCallback1Remote;
    console.log("pc1: created local and remote peer connection objects");

    this.pc2Local = new RTCPeerConnection(servers);
    this.pc2Remote = new RTCPeerConnection(servers);
    this.pc2Remote.ontrack = this.gotRemoteStream2;
    this.pc2Local.onicecandidate = this.iceCallback2Local;
    this.pc2Remote.onicecandidate = this.iceCallback2Remote;
    console.log("pc2: created local and remote peer connection objects");

    (window as any).localStream.getTracks().forEach((track: any) => {
      this.pc1Local.addTrack(track, (window as any).localStream);
    });
    console.log("Adding local stream to pc1Local");
    this.pc1Local
      .createOffer(this.offerOptions)
      .then(this.gotDescription1Local, this.onCreateSessionDescriptionError);

    (window as any).localStream
      .getTracks()
      .forEach((track: any) =>
        this.pc2Local.addTrack(track, (window as any).localStream)
      );
    console.log("Adding local stream to pc2Local");
    this.pc2Local
      .createOffer(this.offerOptions)
      .then(this.gotDescription2Local, this.onCreateSessionDescriptionError);
  }

  private onCreateSessionDescriptionError(error: any) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }

  private gotDescription1Local(desc: any) {
    this.pc1Local.setLocalDescription(desc);
    console.log(`Offer from pc1Local\n${desc.sdp}`);
    this.pc1Remote.setRemoteDescription(desc);
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc1Remote
      .createAnswer()
      .then(this.gotDescription1Remote, this.onCreateSessionDescriptionError);
  }

  private gotDescription1Remote(desc: any) {
    this.pc1Remote.setLocalDescription(desc);
    console.log(`Answer from pc1Remote\n${desc.sdp}`);
    this.pc1Local.setRemoteDescription(desc);
  }

  private gotDescription2Local(desc: any) {
    this.pc2Local.setLocalDescription(desc);
    console.log(`Offer from pc2Local\n${desc.sdp}`);
    this.pc2Remote.setRemoteDescription(desc);
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2Remote
      .createAnswer()
      .then(this.gotDescription2Remote, this.onCreateSessionDescriptionError);
  }

  private gotDescription2Remote(desc: any) {
    this.pc2Remote.setLocalDescription(desc);
    console.log(`Answer from pc2Remote\n${desc.sdp}`);
    this.pc2Local.setRemoteDescription(desc);
  }

  private hangup() {
    console.log("Ending calls");
    this.pc1Local.close();
    this.pc1Remote.close();
    this.pc2Local.close();
    this.pc2Remote.close();
    this.pc1Local = this.pc1Remote = null;
    this.pc2Local = this.pc2Remote = null;
    this.hangupButtonDisabled = true;
    this.callButtonDisabled = false;
  }

  private gotRemoteStream1(e: any) {
    if (this.video2SrcObject !== e.streams[0]) {
      this.video2SrcObject = e.streams[0];
      console.log("pc1: received remote stream");
    }
  }

  private gotRemoteStream2(e: any) {
    if (this.video3SrcObject !== e.streams[0]) {
      this.video3SrcObject = e.streams[0];
      console.log("pc2: received remote stream");
    }
  }

  private iceCallback1Local(event: any) {
    this.handleCandidate(event.candidate, this.pc1Remote, "pc1: ", "local");
  }

  private iceCallback1Remote(event: any) {
    this.handleCandidate(event.candidate, this.pc1Local, "pc1: ", "remote");
  }

  private iceCallback2Local(event: any) {
    this.handleCandidate(event.candidate, this.pc2Remote, "pc2: ", "local");
  }

  private iceCallback2Remote(event: any) {
    this.handleCandidate(event.candidate, this.pc2Local, "pc2: ", "remote");
  }

  private handleCandidate(candidate: any, dest: any, prefix: any, type: any) {
    dest
      .addIceCandidate(candidate)
      .then(this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
    console.log(
      `${prefix}New ${type} ICE candidate: ${
        candidate ? candidate.candidate : "(null)"
      }`
    );
  }

  private onAddIceCandidateSuccess() {
    console.log("AddIceCandidate success.");
  }

  private onAddIceCandidateError(error: any) {
    console.log(`Failed to add ICE candidate: ${error.toString()}`);
  }
}
</script>

<style scoped lang="scss">
.row {
  padding: 1px;
  border: 1px solid #999999;
  background: #ccc;
  margin: 0 0 20px 0;
}

.col {
  border: 1px solid #6fa8dc;
}

video {
  --width: 100%;
  width: var(--width);
  height: calc(var(--width) * 0.75);
}

@media screen and (max-width: 400px) {
  video {
    height: 90px;
    margin: 0 0 10px 0;
    width: calc(100% - 8px);
  }
}
</style>
