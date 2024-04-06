import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import { redisClient } from '../config/redis.js';
import { redisDao } from '../dao/index.js';
const secret = process.env.JSONSECRET!;

const sign = (userId: number, userRole: string) => {
  const payload = {
    id: userId,
    role: userRole,
  };
  return 'Bearer ' +jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1m',
  });
}

const refresh = () => {
  return 'Bearer ' +jwt.sign({}, secret, {
    algorithm: 'HS256',
    expiresIn: '3m',
  });
}
const decode = (token: string) => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;

    return {
      message: "Ok",
      id: decoded.id,
      role: decoded.role,
    }
  }
  catch (err) {
    console.log(err);
  }

}

const verify = (token: string) => {

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload
    return {
      state: true,
      id: decoded!.id,
      role: decoded!.role,
    };
  } catch (err) {
    return {
      state: false,
    };
  }
};

const refreshVerify = async (token: string, userId: number) => {

  try {

    const data = await redisDao.getRedis(String(userId));

    console.log(data)

    if (token === data.split('Bearer ')[1]) {

      jwt.verify(token, secret);

      return { state: true, token: data };
    }
    return { state: false };

  } catch (err) {
    return { state: false };
  }
};



export default { sign, refresh, decode, refreshVerify, verify }