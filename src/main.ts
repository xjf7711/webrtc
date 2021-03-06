import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css";

import Vant from "vant";
import "vant/lib/index.css";
// Icon 组件默认引用 yzcdn.cn 域名下的字体文件，
// 如果想要使用本地字体文件，请引入下面的 css 文件
import "vant/lib/icon/local.css";
Vue.use(Vant);


import "./styles/index";
import "./icons/index";

// 因为vConsole并不需要调用，
import VConsole from "vconsole";
// 打包后使用。
// if (process.env.NODE_ENV === "production") {
  // 所以前面加“tslint:disable”规避掉tslint语法检查
  /*tslint:disable*/
  new VConsole();
// }

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
