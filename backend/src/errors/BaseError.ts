type Body = {
  message: string;
  context?: { [key: string]: any };
};

export default abstract class BaseError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: Body[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
