/* eslint-disable import/first */
import express from 'express';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';
import cors from 'cors';

// import * as users from './modules/users';
import * as tasks from './modules/tasks';
import * as queue from './modules/queue';
import { log } from './libs/log';
import { errorHandler } from './middlewares/errorHandler';
// import { initializeAuth } from './auth';

const apiSpec = path.resolve(__dirname, '../../openapi/generated.yaml');
const swaggerDocument = yaml.load(apiSpec);
const config = { HOST: 'localhost', PORT: 4000 };

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      'https://localhost:3000',
      'https://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
  }),
);
app.use(bodyParser.json());
// app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  log.info('request', req.method, req.url);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    // validateResponses: false,
  }),
);

app.use('/tasks', tasks.makeRouter());
queue.makeRouter().then(router => {
  app.use('/queue', router);
});

app.use(errorHandler);

app.listen(config.PORT, config.HOST, () => {
  log.info(`Server running at http://${config.HOST}:${config.PORT}/`);
  log.info(`Swagger running at http://${config.HOST}:${config.PORT}/api-docs`);
});
