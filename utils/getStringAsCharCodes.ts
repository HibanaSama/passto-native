export const getStringAsCharCodes = (str: string) =>
  Number(
    str
      .split('')
      .reduce((acc, v) => acc.concat(v.charCodeAt(0)), <number[]>[])
      .join(''),
  );
