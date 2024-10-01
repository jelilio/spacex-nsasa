import { Request, Response, NextFunction } from "express";

export const mockRequest = {} as Request;

export const mockResponse = {
  send: jest.fn(),
  status: jest.fn(),
  json: jest.fn(),
} as unknown as Response;

export const mockNextFunction = {} as NextFunction;
