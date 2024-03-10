export function characterLimit(str: string, limit: number) {
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  } else {
    return str;
  }
}
