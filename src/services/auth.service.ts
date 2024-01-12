
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcrypt';
import { userDao, authDao, redisDao, organizationDao} from '../dao/index.js';
import socialLogin from '../utils/socialLogin.js';
import mailHandler from '../modules/mailHandler.js';
import random from '../utils/random.js';
import jwt from '../utils/jwtModules.js';


/**
 * 
 * @param userIdentifier 유저 아이디
 * @returns 1. 유저에 대한 아이디, 권한, 비밀번호
 *          2. 오류 시 false반환
 */
const localLogin = async (
  identifier: string,
  password: string,
  organization: string
) => {

  const userData= await userDao.userInformationSelect(identifier)

  let affiliatedConfirmation;
  
  
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Identifier is not correct");
  }

  if (!await bcrypt.compare(password, userData.password!)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is not correct");
  }


  const accessToken = jwt.sign(userData!.user_id, userData!.role);
  const refreshToken = jwt.refresh()

  await redisDao.setRedis(String(userData!.user_id), refreshToken!);

  if(! await organizationDao.selectAffiliation(organization, userData!.user_id)){
    affiliatedConfirmation = false;
  }
  
  affiliatedConfirmation = true;



  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    role: userData!.role,
    affiliatedConfirmation
  };
}


const kakaoLogin = async (
  kakaoAccessToken: string,
) => {

  const userKakaoData = await socialLogin.getKakaoData(kakaoAccessToken);

  const userCheck = await userDao.userInformationSelect(userKakaoData.data.id);

  if (!userCheck) {

    await authDao.kakaoSignUp(userKakaoData.data.kakao_account.email, userKakaoData.data.id, userKakaoData.data.properties.profile_image);

  }

  const userData = await userDao.userInformationSelect(userKakaoData.data.id);

  const accessToken = jwt.sign(userData!.user_id, userData!.role);
  const refreshToken = jwt.refresh()

  await redisDao.setRedis(String(userData!.user_id), refreshToken!);




  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    role: userData!.role
  };

}

const logout = async (
  userId: string
) => {

  await redisDao.deleteRedis(userId);

}

const signUp = async (
  identifier: string,
  password: string,
  email: string,
) => {

  const encryptedPassword = await bcrypt.hash(password, 10);

  await authDao.localSignUp(
    identifier,
    encryptedPassword,
    email
  );


}


const generateAuthCode = async (
  email: string
) => {

  const verificationCode = random.generateRandom(100000, 999999);

  await redisDao.setTimeoutRedis(email, String(verificationCode), 'EX', 60 * 3);

  await mailHandler.sendCodeEmail(email, verificationCode);

  return verificationCode;

}



const verifyAuthCode = async (
  email: string,
  code: string
) => {

  const redisCode = await redisDao.getRedis(email);

  if (redisCode !== code) {

    throw new ApiError(httpStatus.FORBIDDEN, "Authentication code is incorrect.");
  }

}


const reissueToken = async (
  accessToken: string,
  refreshToken: string
) => {

  const authResult = jwt.verify(accessToken.split('Bearer ')[1]);
  const decoded = jwt.decode(accessToken.split('Bearer ')[1]);

  const refreshResult = await jwt.refreshVerify(refreshToken.split('Bearer ')[1], decoded?.id);

  if (authResult.state === false) {

    if (refreshResult?.state === false) {

      throw new ApiError(httpStatus.UNAUTHORIZED, "login again");
    }

    return {
      accessToken: jwt.sign(decoded?.id, decoded?.role),
      refreshToken: refreshResult.token
    }
  }

  throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, "access token is not expired");

}





export default {

  localLogin,
  kakaoLogin,
  logout,
  signUp,
  generateAuthCode,
  verifyAuthCode,
  reissueToken
}

