import express, { Application, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import routes from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import redirectRouter from './app/modules/redirect/redirect.route';
import config from './app/config';


const app: Application = express();
app.use(
  cors({
    origin: config.origin_url, 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



app.use('/api', routes);
app.use('/redirect', redirectRouter);

app.use(notFound)
app.use(globalErrorHandler);

export default app;
