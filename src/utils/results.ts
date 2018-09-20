export const showing = (pointer, size) => {
  const min = (value) => Math.min(value, size);
  const start = pointer * 15;

  return `${ min(start + 1) }-${ min(start + 15) } of ${ size }`;
};
