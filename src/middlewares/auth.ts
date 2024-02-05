
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';



const auth = async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JSONSECRET!;
  const token: string = req.header("Authentication") as string;
  const organized_token = token.substr(7);

  try {
    const decodedValue = jwt.verify(organized_token, secret) as JwtPayload;
    req.decoded = decodedValue;
    return next();
  } catch (error) {
    handleTokenError(error, res);
  }
};


const handleTokenError = (error: any, res: Response) => {
  const tokenError = error;

  if (tokenError.name === 'TokenExpiredError') {

    return res.status(444).send('Please authenticate');
  } else {
    
    return res.status(445).send('Forbidden');
  }
};

export default auth;



