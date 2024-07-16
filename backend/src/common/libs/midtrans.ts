import { Midtrans } from '@miwone/midtrans-client-typescript';

export const snap = new Midtrans.Snap({
  clientKey: process.env.MID_CLIENT_KEY,
  serverKey: process.env.MID_SERVER_KEY,
  isProduction: false,
});
