import { Request, Response } from 'express';

import { RouterConfigProps } from '../ts/interfaces';
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
  const response = (req: Request, res: Response) => {
    const original = descriptor.value!(req, res);
    res.status(200).json(original);
  };

  server.app[method](path, response);
};
