export const genSku = (
  productName: string,
  variantName: string,
  weight: number,
) => {
  return `${productName.slice(0, 3).toUpperCase()}-${variantName.slice(0, 3).toUpperCase()}-${weight.toString().slice(0, 3)}${Date.now().toString().slice(-3)}`;
};
