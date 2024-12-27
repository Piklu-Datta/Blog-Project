import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleWare/globalErrorHandler';
import router from './app/router';
import notFound from './app/middleWare/notFound';

const app: Application = express();

//parse
app.use(express.json());
app.use(cors());

//application router
app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
