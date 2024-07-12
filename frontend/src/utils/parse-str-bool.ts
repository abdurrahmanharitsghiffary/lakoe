export const parseStrBool = (str: string) => {
  return str === "true" ? true : str === "false" ? false : undefined;
};
