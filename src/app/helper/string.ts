export function convertNum2String(num: number | null) {
  if (num === null) return null;
  return num == 0 || num == 5000000 ? null : num.toString();
}
