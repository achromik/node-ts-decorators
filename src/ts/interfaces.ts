import { Server } from '../server';
import { METHOD } from './enums';

export interface RouterConfigProps {
  method: METHOD;
  path: string;
  server: Server;
}
