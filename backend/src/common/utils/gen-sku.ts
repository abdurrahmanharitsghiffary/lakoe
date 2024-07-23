import { randomBytes } from 'crypto';

export const genSku = (productName: string) => {
  const cleanedName = productName.replace(/[aeiou]/gi, '');
  return `${cleanedName.slice(0, 3).toUpperCase()}${randomBytes(3).toString('hex').toUpperCase()}`;
};
