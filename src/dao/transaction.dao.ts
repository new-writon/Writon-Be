import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserChallenge, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt, InsertUserTemplateContent, WriteTemplete } from '../interfaces/challenge.interface.js';
import { ParticipantData } from '../interfaces/community.interface.js';
import { changeUserTemplateType } from '../utils/challenge.js';
import { questionContentDao, userTemplateDao } from './index.js';




const insertUserTemplateContent = async (
    userChallnegeId: number,
    date: Date,
    complete: boolean,
    templateContent: Array<WriteTemplete>
) => {

    await prisma.$transaction(async () => {

    const userTemplateData = await userTemplateDao.insertUserTemplate(userChallnegeId, new Date(date), complete);

    const changedTemplate = changeUserTemplateType(templateContent, userTemplateData.user_templete_id);

    await questionContentDao.insertUserTemplateContent(changedTemplate);
    });

}




export default {
    insertUserTemplateContent

}