// 通过canvas将图片转为base64编码
export function getBase64Image(img: any) {
  const canvas: any = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  return canvas.toDataURL("image/" + ext);
}
