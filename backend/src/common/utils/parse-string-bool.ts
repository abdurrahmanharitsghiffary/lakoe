export const parseStringBool = (v: string) => {
  return v === 'true' ? true : v === 'false' ? false : undefined;
};
