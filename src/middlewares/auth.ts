
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TokenError } from '../interfaces/error';


const auth = async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JSONSECRET!;
  const token: string = req.header("Authentication") as string;
  const organized_token = token.substr(7);

  try {
    const decodedValue = jwt.verify(organized_token, secret) as JwtPayload;
    req.decoded = decodedValue;
    return next();
  } catch (error) {
    handleTokenError(error);
  }
};


const handleTokenError = (error: any) => {

    const tokenError = error as TokenError;

    if (tokenError.name === 'TokenExpiredError') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }

};

export default auth;



