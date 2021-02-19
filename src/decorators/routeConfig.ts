import { Request, Response } from 'express';

import { ErrorMessage, RouterConfigProps } from '../ts/interfaces';
import { RouteProps, TypedMethodDecorator } from '../ts/types';

export const routeConfig = <ResponseType>({
  method,
  path,
  server,
}: RouterConfigProps): TypedMethodDecorator<RouteProps<ResponseType>> => (
  _target,
  _propertyKey,
  descriptor
) => {
  const response = async (req: Request, res: Response) => {
    try {
      const original = await descriptor.value!(req, res);

      res.status(200).json(original);
    } catch (error) {
      const message: ErrorMessage =
        error instanceof Error
          ? {
              message: 'Some error occurred',
              error: error.message,
              stack: error.stack,
            }
          : { message: 'Error occurred' };

      res.status(500).json(message);
    }
  };

  server.app[method](path, response);
};
