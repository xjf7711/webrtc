import Vue from "vue";
// 顺序必须正确。
import SvgIcon from "vue-svgicon";

import "@/icons/components/index";

Vue.use(SvgIcon, {
    tagName: "svg-icon",
    defaultWidth: "1em",
    defaultHeight: "1em"
});
