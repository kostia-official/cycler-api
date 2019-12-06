import serverlessExpress from 'aws-serverless-express';
import app from './app';

const server = serverlessExpress.createServer(app);

exports.handler = (event: any, context: any) => {
  if (event.source === 'aws.events') {
    return context.succeed();
  }

  return serverlessExpress.proxy(server, event, context);
};
