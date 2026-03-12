import express, { Application, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import routes from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import config from './app/config';
import redirectControllers from './app/modules/redirect/redirect.controller';
import redirectValidations from './app/modules/redirect/redirect.validation';
import validateRequest from './app/middlewares/validateRequest';


const app: Application = express();
app.use(
  cors({
    origin: config.origin_url, 
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // SSLCommerz sends form POST
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// User-facing short link handler
app.get('/r/:shortCode', validateRequest(redirectValidations.redirectParamSchema), redirectControllers.redirectHtmlPage);

app.use('/api', routes);

app.use(notFound)
app.use(globalErrorHandler);

export default app;
