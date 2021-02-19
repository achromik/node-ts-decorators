import * as http from 'http';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export class Server {
  readonly #app: Express;

  get app(): Express {
    return this.#app;
  }

  #server!: http.Server;

  get server(): http.Server {
    return this.#server;
  }

  constructor() {
    this.#app = express();
    this.#app.set('port', process.env.PORT || 3000);
    this.configureMiddleware();
  }

  public configureMiddleware() {
    this.#app.use(bodyParser.json());
    this.#app.use(bodyParser.urlencoded({ extended: true }));

    this.#app.use(
      cors({
        origin: '*',
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,POST,PUT',
        allowedHeaders: [
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Headers',
          'Origin',
          'Accept',
          'X-Requested-With',
          'Content-Type',
          'Access-Control-Request-Method',
          'Access-Control-Request-Headers',
          'Authorization',
        ],
      })
    );
  }

  public start() {
    this.#server = this.#app.listen(this.#app.get('port'), () => {
      console.log(`🚀 Server is running on port ${this.#app.get('port')}`);
    });
  }
}
