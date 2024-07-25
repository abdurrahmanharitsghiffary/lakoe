export const emptyArrayAndUndefined = <T extends Array<any>>(arr: T) => {
  return arr?.length === 0 ? undefined : arr;
};
