export class ApiResponse<T> {
  success: boolean = true;

  constructor(
    private readonly statusCode: number,
    private readonly data: T,
  ) {
    this.success = statusCode < 400;
  }
}
