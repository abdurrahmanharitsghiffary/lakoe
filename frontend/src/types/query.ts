export type QueryConfig<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;
