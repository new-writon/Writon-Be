
import prisma from '../client.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import questionDao from '../dao/question.dao.js';
import { WriteTemplete } from '../interfaces/challenge.interface.js';
import affiliationDao from '../dao/affiliation.dao.js';
import userChallengeDao from '../dao/userChallenge.dao.js';
import { changeUserTemplateType, signUserChallengeComplete } from '../utils/challenge.js';
import userTemplateDao from '../dao/userTemplate.dao.js';
import questionContentDao from '../dao/questionContent.dao.js';
import { performTransactionInsertTemplateContent } from '../utils/transaction.js';
import transactionDao from '../dao/transaction.dao.js';


const selectBasicQuestion = async (
    challengeId: number
) => {

    return await questionDao.selectBasicQuestion(challengeId);

}


const selectSpecialQuestion = async (
    challengeId: number
) => {

    return await questionDao.selectSpecialQuestion(challengeId);

}


const insertTemplateContent = async (
    userId: number,
    challengeId: number,
    organization: string,
    date: string,
    templateContent: Array<WriteTemplete>
) => {


    const [userChallengeData, userTemplateComplete] = await Promise.all([
        userChallengeDao.selectUserChallenge(userId, organization, challengeId),
        signUserChallengeComplete(challengeId, date)

    ]);

    // const userTemplateData = await userTemplateDao.insertUserTemplate(userChallengeData.user_challenge_id, new Date(date), userTemplateComplete);

    // const changedTemplate = changeUserTemplateType(templateContent, userTemplateData.user_templete_id);

    // await questionContentDao.insertUserTemplateContent(changedTemplate);


    await transactionDao.insertUserTemplateContent(userChallengeData.user_challenge_id, new Date(date), userTemplateComplete, templateContent);
  
}


export default {
    selectBasicQuestion,
    selectSpecialQuestion,
    insertTemplateContent
}


