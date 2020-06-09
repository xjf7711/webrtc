<template>
  <div>
    <van-row>
      <h2>Hello OpenCV.js</h2>
      <p>{{ status }}</p>
      <van-col span="12">
        <img id="imageSrc" alt="No Image" />
        <div class="caption">
          imageSrc <input type="file" id="fileInput" name="file" />
        </div>
      </van-col>
      <van-col span="12">
        <canvas id="canvasOutput"></canvas>
        <div class="caption">canvasOutput</div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import * as cv from "opencv.js";
@Component
export default class Index extends Vue {
  private status: string = "OpenCV.js is loading...";

  // private mounted() {
  //   const imgElement: any = document.getElementById("imageSrc");
  //   const inputElement: any = document.getElementById("fileInput");
  //   inputElement.addEventListener(
  //     "change",
  //     (e: any) => {
  //       imgElement.src = URL.createObjectURL(e.target.files[0]);
  //     },
  //     false
  //   );
  //
  //   (imgElement as any).onload = () => {
  //     let mat = cv.imread(imgElement);
  //     mat = this.face2(mat, 4, 3);
  //     cv.imshow("canvasOutput", mat);
  //     mat.delete();
  //   };
  //   this.status = "OpenCV.js is ready.";
  //   // function onOpenCvReady() {
  //   //   // document.getElementById("status").innerHTML = "OpenCV.js is ready.";
  //   // }
  //   this.rtsp();
  // }
  private rtsp() {
    // camera1 = None
    // frame = cv2.imread("1.jpg", cv2.IMREAD_COLOR)
    const rtspPath: string = "rtsp://admin:abc12345@192.168.1.9:554/h264/ch1/main/";
    // const camera1 = cv.capture(rtspPath);
    // console.log("camera1 is ", camera1);
    // while (true) {
    //     {_, img_bgr} = camera1.read()
    //     if (!img_bgr) {
    //         camera1 = cv.VideoCapture(rtspPath)
    //         print('丢失帧')
    //     }else{
    //         frame = img_bgr
    //     }
    // }
  }

  // private face2(image: any, value1: any, value2: any) {
  //   console.log("face2 begins. ");
  //   const dst = new cv.Mat();
  //   if (value1 === null || value1 === undefined) {
  //     value1 = 3;
  //   } //磨皮系数
  //   if (value2 === null || value2 === undefined) {
  //     value2 = 1;
  //   } //细节系数 0.5 - 2
  //
  //   const dx = value1 * 5; //双边滤波参数
  //   const fc = value1 * 12.5; //参数
  //   const p = 0.1; //透明度
  //
  //   const temp1 = new cv.Mat();
  //   const temp2 = new cv.Mat();
  //   const temp3 = new cv.Mat();
  //   const temp4 = new cv.Mat();
  //
  //   cv.cvtColor(image, image, cv.COLOR_RGBA2RGB, 0);
  //
  //   cv.bilateralFilter(image, temp1, dx, fc, fc); //bilateralFilter(Src)
  //
  //   const temp22 = new cv.Mat();
  //   cv.subtract(temp1, image, temp22); //bilateralFilter(Src) - Src
  //
  //   cv.add(
  //     temp22,
  //     new cv.Mat(
  //       image.rows,
  //       image.cols,
  //       image.type(),
  //       new cv.Scalar(128, 128, 128, 128)
  //     ),
  //     temp2
  //   ); //bilateralFilter(Src) - Src + 128
  //
  //   cv.GaussianBlur(
  //     temp2,
  //     temp3,
  //     new cv.Size(2 * value2 - 1, 2 * value2 - 1),
  //     0,
  //     0
  //   );
  //   //2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 1
  //
  //   const temp44 = new cv.Mat();
  //   temp3.convertTo(temp44, temp3.type(), 2, -255);
  //   //2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 256
  //
  //   cv.add(image, temp44, temp4);
  //   cv.addWeighted(image, p, temp4, 1 - p, 0.0, dst);
  //   //Src * (100 - Opacity)
  //
  //   cv.add(
  //     dst,
  //     new cv.Mat(
  //       image.rows,
  //       image.cols,
  //       image.type(),
  //       new cv.Scalar(10, 10, 10, 0)
  //     ),
  //     dst
  //   );
  //   //(Src * (100 - Opacity) + (Src + 2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 256) * Opacity) /100
  //
  //   return dst;
  // }
}
</script>

<style scoped lang="scss">
.inputoutput {
  float: left;
  margin: 10px;
}
</style>
