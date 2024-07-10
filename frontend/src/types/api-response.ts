export type ApiResponse<T> = {
  data: T;
  statusCode: number;
  success: boolean;
};
