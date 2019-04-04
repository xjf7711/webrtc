import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Layout from "./views/layout/Index.vue";
Vue.use(Router);

export const gumRouteMap = [
  {
    path: "sse",
    name: "SSE",
    meta: { index: 0, title: "SSE" },
    component: () => import("./views/rtsp/SSE.vue")
  },
  {
    path: "websocket",
    name: "Websocket",
    meta: { index: 0, title: "websocket" },
    component: () => import("./views/rtsp/Websocket.vue")
  },
  {
    path: "gum",
    name: "GUM",
    meta: { index: 0, title: "gum" },
    component: () => import("./views/getusermedia/gum/Index.vue")
  }
];
export const pcRouteMap = [
  {
    path: "constraints",
    name: "Constraints",
    meta: { index: 1, title: "Constraints" },
    component: () => import("./views/peerconnection/constraints/Index.vue")
  },
  {
    path: "multiple",
    name: "Multiple",
    meta: { index: 1, title: "Multiple" },
    component: () => import("./views/peerconnection/multiple/Index.vue")
  }
];
export const captureRouteMap = [
  {
    path: "video-video",
    name: "Video-Video",
    meta: { index: 2, title: "video-video" },
    component: () => import("./views/capture/video-video/Index.vue")
  }
];
export const deviceRouteMap = [
  {
    path: "input-output",
    name: "InputOutput",
    meta: { index: 3, title: "input-output" },
    component: () => import("./views/devices/input-output/Index.vue")
  },
  {
    path: "multi",
    name: "Multi",
    meta: { index: 3, title: "device-multi" },
    component: () => import("./views/devices/multi/Index.vue")
  }
];

export const constantRouteMap = [
  // {
  //   path: "/home",
  //   name: "home",
  //   component: Layout,
  //   redirect: "/home/index",
  //   meta: { index: 0, title: "首页", icon: "home" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "homeIndex",
  //       component: Home,
  //       meta: { title: "home" }
  //     }
  //   ]
  // },
  {
    path: "/getUserMedia",
    name: "GetUserMedia",
    component: Layout,
    redirect: "/getUserMedia/index",
    meta: { index: 0, title: "GetUserMedia", icon: "home" },
    children: [
      {
        path: "index",
        name: "GUMIndex",
        meta: { index: 0, title: "GetUserMedia", icon: "user" },
        component: () => import("./views/getusermedia/Index.vue")
      },
      ...gumRouteMap
    ]
  },
  {
    path: "/peerconnection",
    name: "PeerConnection",
    meta: { index: 1, title: "PeerConnection", icon: "international" },
    redirect: "/peerconnection/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "PeerConnectionIndex",
        meta: { index: 1, title: "PeerConnection" },
        component: () => import("./views/peerconnection/Index.vue")
      },
      ...pcRouteMap
    ]
  },
  {
    path: "/capture",
    name: "Capture",
    meta: { index: 2, title: "Capture", icon: "gateway" },
    redirect: "/capture/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "CaptureIndex",
        meta: { index: 2, title: "Capture" },
        component: () => import("./views/capture/Index.vue")
      },
      ...captureRouteMap
    ]
  },
  {
    path: "/devices",
    name: "Devices",
    meta: { index: 3, title: "Devices", icon: "device-config" },
    redirect: "/devices/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "DeviceIndex",
        meta: { index: 3, title: "Devices" },
        component: () => import("./views/devices/Index.vue")
      },
      ...deviceRouteMap
    ]
  }
];
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/getUserMedia"
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    ...constantRouteMap
  ]
});
