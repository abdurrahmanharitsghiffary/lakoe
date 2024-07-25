import { useMemo } from "react";

export const useWatchImage = (
  value: File | string | FileList | string[] | File[]
): string | string[] => {
  return useMemo(() => {
    if (typeof value === "string") return value as string;
    if (value instanceof File) return URL.createObjectURL(value) as string;
    if (value instanceof Array)
      return value.map((v) => {
        if (v instanceof File) return URL.createObjectURL(v);
        return v;
      }) as string[];
    return "";
  }, [value]);
};
