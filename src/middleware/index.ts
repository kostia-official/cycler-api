import { Application } from '../declarations';
import { authErrorHandler } from './authErrorHandler';
import { expressToFeathers } from './expressToFeathers';
import { configureAcl } from './configureAcl';

export default function(app: Application) {
  app.configure(configureAcl);

  app.use(expressToFeathers);
  app.use(authErrorHandler);
}
