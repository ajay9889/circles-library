export function getDeviceID() {
  // const userAgent = window.navigator.userAgent;
  // const platform = window.navigator.platform;
  const randomString =
    Math.random().toString(20).substring(2, 14) +
    Math.random().toString(20).substring(2, 14);

  return `${randomString}`;
}

export function formatNumber(
  numberString: string,
  separatorIndices: number[]
): string {
  let formattedStringArray = numberString.split('');
  let offset = 0;

  for (let index of separatorIndices) {
    formattedStringArray.splice(index + offset, 0, '-');
    offset += 1;
  }

  return formattedStringArray.join('');
}
