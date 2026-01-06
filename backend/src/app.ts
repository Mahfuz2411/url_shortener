import express, { Application, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import routes from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';


const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', routes);

app.use(notFound)
app.use(globalErrorHandler);

export default app;
