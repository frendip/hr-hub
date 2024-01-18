export default class ApiError extends Error {
  private _status: number;
  private _message: string;

  public name = 'ApiError';

  constructor(status: number, message: string) {
    super(message);

    this._status = status;
    this._message = message;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}
