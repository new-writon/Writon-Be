
import prisma from '../client.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { userDao } from '../dao/index.js';
import redis from '../dao/redis.dao.js';
import bcrypt from 'bcrypt';
import random from '../utils/random.js';
import mailHandler from '../modules/mailHandler.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);






const findIdentifier = async (
  nickname: string,
  email: string,
  code: string
) => {

  const certifyCode = await redis.getRedis(email);

  if (certifyCode != code) {

    throw new ApiError(httpStatus.FORBIDDEN, "certify failed");
  }

  if (! await userDao.identifierSelect(nickname, email)) {

    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }

  return userDao.identifierSelect(nickname, email);
};


const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {

  const userPassword = await userDao.selectPassword(userId)


  if (!await bcrypt.compare(oldPassword, userPassword?.password!)) {

    throw new ApiError(httpStatus.NOT_FOUND, "can't find password");

  }

  await userDao.updatePassword(userId, await bcrypt.hash(newPassword, 10))

}

const checkIdentifier = async (
  identifier: string,
): Promise<null> => {

  const identifierData = await userDao.userInformationSelect(identifier);

  if (!identifierData) {
    return identifierData
  }

  throw new ApiError(httpStatus.NOT_ACCEPTABLE, " can't use identifier");

}

const checkEmail = async (
  email: string
) => {

  const emailData = await userDao.selectEmail(email);

  if (!emailData) {

    return emailData;

  }

  throw new ApiError(httpStatus.NOT_ACCEPTABLE, "can't use email");

}

const generateTemporaryPassword = async (
  identifier: string,
  email: string
) => {

  const user = await userDao.selectIdentifierAndEmail(identifier);

  if (!user?.identifier) {

    throw new ApiError(httpStatus.NOT_FOUND, "can't find identifier");
  }

  if (email !== user.email) {

    throw new ApiError(httpStatus.FORBIDDEN, "certify failed");
  }

  const randomPassword = random.generateRandomPassword();

  await userDao.updateRandomPassword(identifier, email, await bcrypt.hash(randomPassword, 10));

  await mailHandler.randomPasswordsmtpSender(email, randomPassword);

}


export default {
  changePassword,
  findIdentifier,
  checkIdentifier,
  checkEmail,
  generateTemporaryPassword
}


