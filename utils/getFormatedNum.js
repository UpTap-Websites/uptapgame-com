export default function getFormatedNum(num) {
  if (num >= 1000000) {
    return `${(num / 1000000 + 0.1).toFixed(1)}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000 + 0.1).toFixed(1)}k`;
  }
  return Math.floor(num);
}
