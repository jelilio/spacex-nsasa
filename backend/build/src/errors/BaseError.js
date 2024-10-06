"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message) {
        super(message);
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
exports.default = BaseError;
