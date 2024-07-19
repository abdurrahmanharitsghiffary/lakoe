import { isAxiosError } from "axios";

export const getAxiosErrMessage = (err: any) => {
  if (!isAxiosError(err)) return err?.message;
  return err?.response?.data?.message || "Something went wrong!";
};
