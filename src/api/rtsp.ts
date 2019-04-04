import request from "./request";
export function fetchRtsp() {
  return request({
    url: "/rtsp",
    method: "get"
  });
}
