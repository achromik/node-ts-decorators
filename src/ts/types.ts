import { Request, Response } from 'express';

export type TypedMethodDecorator<T> = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

export type RouteProps<ResponseType> = (
  request: Request,
  response: Response
) => ResponseType;
