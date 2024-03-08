
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { userService } from '../services/index.js'



/**
 * 아이디 찾기 함수
 * @param req  email, 인증 코드
 * @param res 
 * @param next 
 * @returns 1. 아이디를 찾을 수 없을 경우(404)
 *          2. 해당 유저의 아이디 반환(200)
 *          3. service 함수 에러 (502)
 *          4. 메일 인증 실패 (400)
 *          5. 서버 에러(500)
 */
const findIdentifier = catchAsync(async (req, res) => {

    const {  email, code } = req.query;

    res.status(httpStatus.OK).send(await userService.findIdentifier(email as string, code as string));
});



const changePassword = catchAsync(async (req, res) => {


    const { oldPassword, newPassword} = req.body;

    res.status(httpStatus.OK).send(await userService.changePassword(req.decoded!.id, oldPassword, newPassword));

});

/**
 * 
 * @param req 유저 아이디
 * @param res 중복 확인 결과
 * @returns 
 *          1. 서버 오류
 *          2. 아이디 사용 가능
 *          3. 아이디 중복
 */
const checkIdentifier = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await userService.checkIdentifier(req.query.identifier as string));

});

/**
 * 
 * @param req 유저 이메일
 * @param res 중복 확인 결과
 * @returns 
 *          1. 서버 오류
 *          2. 이메일 사용 가능
 *          3. 이메일 중복
 */
const checkEmail = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await userService.checkEmail(req.query.email as string));

});

/**
 * 
 * @param req 유저 이메일
 * @param res 중복 확인 결과
 * @returns 
 *          1. 서버 오류
 *          2. 이메일 사용 가능
 *          3. 이메일 중복
 */
const generateTemporaryPassword = catchAsync(async (req, res) => {

    const { identifier, email } = req.body;

    res.status(httpStatus.OK).send(await userService.generateTemporaryPassword(identifier, email));

});

const selectUserMyPage = catchAsync(async (req, res) => {


    res.status(httpStatus.OK).send(await userService.selectUserMyPage(req.decoded?.id, req.params.organization));

});

const updateUserMyPage = catchAsync(async (req, res) => {


    const { nickname, company, hireDate, job, jobIntroduce, companyPublic } = req.body


    res.status(httpStatus.OK).send(await userService.updateUserMyPage(
        req.decoded?.id, 
        req.params.organization,
        nickname,  
        company, 
        hireDate, 
        job, 
        jobIntroduce,
        companyPublic
        ));

});


const updateAccountInformation = catchAsync(async (req, res) => {


    const { accountNumber, bank } = req.body


    res.status(httpStatus.OK).send(await userService.updateAccountInformation(
        req.decoded?.id, 
        accountNumber,
        bank
        ));

});



const selectCommentInformation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await userService.selectCommentInformation(
        req.decoded?.id, 
        req.params.organization,
        req.params.challengeId
     
        ));
});

const updateMyPosting = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await userService.updateMyPosting(
        req.body.userTemplateId,
        req.body.templateContent   
        ));
});



export default {
    findIdentifier,
    checkIdentifier,
    changePassword,
    checkEmail,
    generateTemporaryPassword,
    selectUserMyPage,
    updateUserMyPage,
    updateAccountInformation,
    selectCommentInformation,
    updateMyPosting
}


















