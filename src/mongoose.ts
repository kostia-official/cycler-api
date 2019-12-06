import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function(app: Application) {
  mongoose
    .connect(app.get('dbUrl'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
  app.set('modelOptions', {
    paginate: false
  });
}
