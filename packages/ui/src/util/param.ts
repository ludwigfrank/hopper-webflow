export function getUrlParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function bindQueryPramTexts() {
  const attribute = 'data-bind-query-param';
  const textElements = <NodeListOf<HTMLElement>>(
    document.querySelectorAll(`[${attribute}]`)
  );

  textElements.forEach((el) => {
    const text = getUrlParam(el.getAttribute(attribute) as string);
    if (!text)
      throw Error(`Url query parameter for "${attribute}" is not set.`);
    el.innerHTML = text;
  });
}
