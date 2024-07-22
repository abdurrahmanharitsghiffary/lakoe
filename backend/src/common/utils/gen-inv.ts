import { randomBytes } from 'crypto';

export const genInvoice = () => {
  const now = new Date(Date.now());
  const date = now.toISOString().split('T')?.[0];
  return `INV/${date?.split('-')}/${randomBytes(12)}`;
};
