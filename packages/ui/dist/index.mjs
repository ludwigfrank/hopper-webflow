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
export {
  bindQueryPramTexts,
  getUrlParam,
  hello,
  testing
};
