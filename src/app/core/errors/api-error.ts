export class ApiError extends Error {
  data: Object | null;

  constructor(message: string, data?: object) {
    super(message);
    this.data = data;
  }
}
