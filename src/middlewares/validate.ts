import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick.js'
import Joi from 'joi';

/**
 * 코드로 타입을 명시한 객체와 요청으로 온 객체와 비교하여 유효성 검사를 진행
 * @param schema 
 * @returns 
 */
const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    // 주어진 스키마에서 'params', 'query', 'body'에 해당하는 부분을 선택하여 validSchema에 저장합니다.
  const validSchema = pick(schema, ['params', 'query', 'body']);
  // req 객체에서 유효성 검사에 필요한 부분만을 선택하여 새로운 객체(obj)를 생성합니다.
  const obj = pick(req, Object.keys(validSchema));

  // validSchema를 사용하여 Joi.compile로 Joi 스키마를 생성하고, 
  // 생성된 스키마를 통해 obj를 유효성 검사합니다.
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj);
    // 만약 유효성 검사에서 오류가 발생하면,
  if (error) {
     // 오류의 상세 내용을 가져와서 쉼표로 구분된 문자열로 변환합니다.
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  // 유효성 검사가 통과되면, req 객체에 value 객체를 할당하여 해당 값을 라우터에서 사용할 수 있도록 합니다.
  Object.assign(req, value);
  return next();
};

export default validate;
