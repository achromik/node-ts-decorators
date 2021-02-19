import { Request, Response } from 'express';

import { Server } from './src/server';
import { METHOD } from './src/ts/enums';
import { routeConfig } from './src/decorators/routeConfig';

const server = new Server();

class Routes {
  @routeConfig<string>({ method: METHOD.GET, path: '/hello', server })
  public hello(request: Request, response: Response) {
    return 'Hello World';
  }
}

server.start();
