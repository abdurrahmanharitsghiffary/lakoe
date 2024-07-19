export const genInvoice = (productName: string) => {
  return `INV-${Date.now()}-${productName?.toUpperCase()}`;
};
