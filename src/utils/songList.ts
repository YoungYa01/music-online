export function randomColor(a?: number) {
  return a ? `rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()},${a})` : `rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`
}
