/**
 * Returns the parameter fitting the provided string.
 * Returns null if no query string with that name is present.
 *
 * @export
 * @param {string} param
 * @return {*}  {(string | null)}
 */
export function getUrlParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Binds all text elements with the 'data-bind-query-param' custom attribute to
 * the query string they refer to.
 *
 * E.g. data-bind-query-param="credit" taks the ?credit=1.99 param
 *
 * @export
 */
export function bindQueryPramTexts() {
  const attribute = "data-bind-query-param"
  const textElements = <NodeListOf<HTMLElement>>(
    document.querySelectorAll(`[${attribute}]`)
  )

  textElements.forEach((el) => {
    const text = getUrlParam(el.getAttribute(attribute) as string)
    if (!text) throw Error(`Url query parameter for "${attribute}" is not set.`)
    el.innerHTML = text
  })
}
