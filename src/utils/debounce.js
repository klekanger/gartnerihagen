/** Debounce function.
 *
 * Used in useEffect to prevent functions running on every render.
 * (For increased performance)
 *
 * @param {*} fn
 * @param {*} ms
 */

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default debounce;
