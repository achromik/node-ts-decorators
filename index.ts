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

  @routeConfig<Promise<string | undefined>>({
    method: METHOD.POST,
    path: '/post',
    server,
  })
  public async post(
    request: Request,
    response: Response
  ): Promise<string | undefined> {
    let timeoutId: NodeJS.Timeout | undefined;
    try {
      const result = new Promise<string>((resolve, reject) => {
        timeoutId = setTimeout(() => {
          const random = Math.random();

          if (random > 0.8) {
            reject(new Error('Error after 2 seconds'));
          }
          resolve('After 2 seconds');
        }, 2000);
      });

      return await result;
    } catch (error: unknown) {
      timeoutId && clearTimeout(timeoutId);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Some other error occurred');
    }
  }
}

server.start();
