import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config();
import * as jwt from '../utils/jwtModules.js';
import { logger } from '../config/logger.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { authService } from '../services/index.js'


/**
 * 유저 로그인 함수
 * @param req 유저 아이디, 유저 비밀번호 받기
 * @param res 
 * @param next 
 * @returns 1. 404 유저 아이디, 비밀번호 옳지 않음
 *          2. 200 accessToken, refreshToken 발급
 *          3. 서버 오류
 */
const localLogin = catchAsync(async (req, res) => {

    const { identifier, password, organization } = req.body;

    res.status(httpStatus.OK).send(await authService.localLogin(identifier, password, organization));
});


/**
 * 
 * @param req 카카오 accessToken
 * @param res access, refresh 토큰
 * @returns 1. 서버 오류
 *          2. 정상 반응
 */
const kakaoLogin = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await authService.kakaoLogin(req.headers.authentication as string, req.body.organization));

});


/**
 * 
 * @param req  header로 accessToken을 받아옴
 * @param res 
 * @param next 
 * @returns  
 *  1. 로그아웃 완료
 *  2. accessToken 오류
 */
const logout = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await authService.logout(req.decoded!.id));

});


/**
 * 
 * @param req 이메일, 비밀번호, 닉네임, 아이디, 핸드폰 번호
 * @param res  1. 완료(200)
 *             2. 서버오류(500)
 * @returns 
 */
const signup = catchAsync(async (req, res) => {


    const { email, password, identifier } = req.body;


    res.status(httpStatus.OK).send(await authService.signUp(
        identifier,
        password,
        email
    ));
});





/**
 * 유저 토큰 재발급 함수
 * @param req  header로부터 accessToken, refreshToken 모두 받거나 accessToken 하나만 받는다.
 * @param res  
 * @param next 
 * @returns  1. 재로그인 요청
 *           2.  accessToken 토큰 만료
 *           3. accessToken, refreshToken 재발급
 *           4. 서버 오류
 */
const reissueToken = catchAsync(async (req, res) => {


    const accessToken = req.headers.authentication;
    const refreshToken = req.headers.refresh;


    //      const reae = await authService.reissueToken(accessToken as string , refreshToken as string);

    res.status(httpStatus.OK).send(await authService.reissueToken(accessToken as string, refreshToken as string));


});


/**
 * @route Method /Route
 * @desc Function Description
 * @access Public
 */
//회원 가입용 이메일 코드 요청
const generateAuthCode = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send({ code: await authService.generateAuthCode(req.body.email) });

});


/**
 * @route Method /Route
 * @desc Function Description
 * @access Public
 */
const verifyAuthCode = catchAsync(async (req, res) => {


    const { email, code } = req.body;

    res.status(httpStatus.OK).send(await authService.verifyAuthCode(email, code));

});




export default {
    logout,
    reissueToken,
    localLogin,
    kakaoLogin,
    signup,
    verifyAuthCode,
    generateAuthCode
}














