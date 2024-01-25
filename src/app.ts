import express from 'express';
import dotenv from 'dotenv';
import { errorConverter, errorHandler } from './middlewares/error.js';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routers/api/index.js';
import config from './config/config.js';
import morgan from './config/morgan.js';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError.js';
import { authLimiter } from './middlewares/rateLimiter.js';
import xss from './middlewares/xss.js';
import compression from 'compression';



dotenv.config();
const app = express();


if (config.env !== 'test') {
  app.use(morgan.successHandler);   // 성공 로그 커스텀
  app.use(morgan.errorHandler);     // 실패 로그 커스텀
}

//app.set('trust proxy', 1);

app.use(helmet());

app.use(cors({ credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

// 1. 웹 페이지의 로딩 속도 향상
// 2. 대역폭 절약
app.use(compression());

app.all('/*', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});


app.get('/healthcheck', (req, res) => {
  res.status(200).send();
});


// if (config.env === 'production') {
//   app.use('/api', authLimiter);
// }

app.use('/api', routes);

// api 요청 시 해당 경로가 없을 때
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// app.use(errorConverter);

// app.use(errorHandler);


export default app;




