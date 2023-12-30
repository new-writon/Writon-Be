import rateLimit from 'express-rate-limit';


/**
 * 에러가 있는 요청이 20번 연속 요청이 올 시 15분동안 해당 ip 차단
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
});
