"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Child();
}
const Child = () => "../components/Child.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello，World");
    const name = common_vendor.ref("费涛");
    const toDoList = common_vendor.ref(["react", "vue", "redux"]);
    const obj = common_vendor.reactive({
      a: 1,
      b: 2
    });
    const visible = common_vendor.ref(true);
    console.log(visible.value);
    const handleClick = () => {
      obj.a++;
    };
    const spart = common_vendor.computed(() => {
      return obj.a * obj.b;
    });
    common_vendor.onMounted(() => {
      console.log("初始化");
    });
    common_vendor.onUpdated(() => {
      console.log("更新");
    });
    common_vendor.watchEffect(() => {
      console.log(name.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(title.value),
        b: common_vendor.t(name.value),
        c: name.value,
        d: common_vendor.o(($event) => name.value = $event.detail.value),
        e: common_vendor.f(toDoList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index == 0 ? 1 : ""
          };
        }),
        f: name.value
      }, name.value ? {} : {}, {
        g: common_vendor.t(obj.a),
        h: common_vendor.t(obj.b),
        i: common_vendor.t(spart.value),
        j: common_vendor.o(handleClick),
        k: common_vendor.o((e) => console.log(e)),
        l: common_vendor.o(($event) => visible.value = $event),
        m: common_vendor.p({
          tip: "提示",
          modelValue: visible.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/feitao/code/demo/uniApp/Hello/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
