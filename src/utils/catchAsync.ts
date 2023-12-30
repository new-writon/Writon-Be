import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export interface CustomParamsDictionary {
  [key: string]: any;
}
/**
 * 외부 함수는 fn 매개변수를 받아서 내부 함수를 반환합니다.
   내부 함수는 Express의 미들웨어 함수처럼 (req, res, next) 형태로 요청, 응답, 다음 미들웨어로 진행하기 위한 콜백을 받습니다.
   내부 함수에서는 fn(req, res, next)를 호출한 뒤, 이를 Promise.resolve()로 감싸고,
    catch 블록을 사용하여 예외가 발생하면 next(err)로 에러를 처리합니다.
 * @param fn 
 * @returns 
 */
const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>) =>
  (
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
