"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Child",
  props: {
    title: {
      type: String,
      default: "默认标题"
    },
    tip: String
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    console.log(props, "???");
    const handleClick = () => {
      emit("click", "子组件事件");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.t(__props.tip),
        c: common_vendor.o(handleClick),
        d: common_vendor.t(_ctx.visible ? "隐藏" : "显示")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/feitao/code/demo/uniApp/Hello/pages/components/Child.vue"]]);
wx.createComponent(Component);
