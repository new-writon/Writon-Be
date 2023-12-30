import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../config/config.js';
import {logger} from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

// 서버 내에서 나오는 에러를  커스텀
export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {   // 이미 앞에서 400 에러 일 경우 건너뜀
    const statusCode =
      error.statusCode || error instanceof  Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);          // 예상하지 못한 에러 운영적이지 않은 에러일 시 false 세팅
  } 
  next(error);
};

// errorConverter에서 커스텀된 에러를 클라이언트에게 반환
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {         // err.isOperational => 운영적인 에러
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack })      // 개발 환경일 때 stack 추가
  };
//  개발 환경에서는 디버깅과 오류 추적이 더 편리하게 이루어지도록 하기 위해 스택 트레이스를 포함하는 것이 유용
  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
