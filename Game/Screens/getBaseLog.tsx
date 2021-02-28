export function getBaseLog(x, y) {
  const result = Math.log(y) / Math.log(x);
  if (result == -Infinity) {
    return 0;
  }
  return result;
}
