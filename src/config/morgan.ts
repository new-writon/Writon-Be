import { Response } from 'express';
import morgan from 'morgan';
import config from './config.js';
import { logger } from './logger.js';

morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,                   // skip 옵션은 특정 조건을 만족하는 경우에 로깅을 건너뛰도록 하는 함수를 정의합니다.
  stream: { write: (message) => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 500,
  stream: { write: (message) => logger.error(message.trim()) }
});

export default {
  successHandler,
  errorHandler
};
