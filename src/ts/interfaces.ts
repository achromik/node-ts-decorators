import { Server } from '../server';
import { METHOD } from './enums';

export interface RouterConfigProps {
  method: METHOD;
  path: string;
  server: Server;
}

export interface ErrorMessage {
  message: string;
  error?: string;
  stack?: string;
}
