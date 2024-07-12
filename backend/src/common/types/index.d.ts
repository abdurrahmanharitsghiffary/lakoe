/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
