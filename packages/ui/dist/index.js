"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  bindQueryPramTexts: () => bindQueryPramTexts,
  getUrlParam: () => getUrlParam,
  hello: () => hello,
  testing: () => testing
});
module.exports = __toCommonJS(src_exports);

// src/util/param.ts
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
function bindQueryPramTexts() {
  const attribute = "data-bind-query-param";
  const textElements = document.querySelectorAll(`[${attribute}]`);
  textElements.forEach((el) => {
    const text = getUrlParam(el.getAttribute(attribute));
    if (!text)
      throw Error(`Url query parameter for "${attribute}" is not set.`);
    el.innerHTML = text;
  });
}

// src/index.ts
function hello() {
  console.log("hello");
}
function testing() {
  console.log("testing");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bindQueryPramTexts,
  getUrlParam,
  hello,
  testing
});
