export class ApiResponse<T> {
  success: boolean = true;

  constructor(
    private readonly statusCode: number,
    private readonly data: T,
  ) {
    this.success = statusCode < 400;
  }
}

type Error = {
  message: string;
  code?: string;
  [key: string]: any;
};

export class ApiErrorResponse {
  constructor(private readonly errors: Error[] = []) {}
}
