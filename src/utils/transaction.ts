
import prisma from '../client.js';
import { UserChallenge, } from '@prisma/client'
import { changeUserTemplateType } from '../utils/challenge.js';
import userTemplateDao from '../dao/userTemplate.dao.js';
import questionContentDao from '../dao/questionContent.dao.js';
import { bool } from 'aws-sdk/clients/signer.js';
import { WriteTemplete } from '../interfaces/challenge.interface.js';



const performTransactionInsertTemplateContent = async (
    userChallengeData: UserChallenge,
    userTemplateComplete: bool,
    templateContent: Array<WriteTemplete>,
    date: string
) => {
    let transactionResult: bool;

    try {
   
        await prisma.$queryRaw`START TRANSACTION`;


        const userTemplateData = await userTemplateDao.insertUserTemplate(userChallengeData.user_challenge_id, new Date(date), userTemplateComplete);

        const changedTemplate = changeUserTemplateType(templateContent, userTemplateData.user_templete_id);

        await questionContentDao.insertUserTemplateContent(changedTemplate);

        await prisma.$queryRaw`COMMIT`;
        transactionResult = true;
    } catch (error) {
        await prisma.$queryRaw`ROLLBACK`;
        transactionResult = false;
        console.error(error);
    } 
    return transactionResult;
}



export {
    performTransactionInsertTemplateContent
}