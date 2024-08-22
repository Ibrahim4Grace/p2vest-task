import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import { errorHandler, routeNotFound } from './middleware';
import { authRoute, taskRouter, commentRouter } from './routes';
import { Limiter } from './utils';

const app: Express = express();
app.options('*', cors());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Authorization',
    ],
  })
);

app.use(Limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ message: 'I am the express API responding for p2vest' });
});

app.use('/api/v1', authRoute);
app.use('/api/v1', taskRouter);
app.use('/api/v1', commentRouter);

app.use(errorHandler);
app.use(routeNotFound);

export default app;
