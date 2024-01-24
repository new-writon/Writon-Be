import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserChallenge, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt, InsertUserTemplateContent, WriteTemplete } from '../interfaces/challenge.interface.js';
import { ParticipantData } from '../interfaces/community.interface.js';
import { changeUserTemplateType } from '../utils/challenge.js';




const insertUserTemplateContent = async (
    userChallnegeId: number,
    date: Date,
    complete: boolean,
    templateContent: Array<WriteTemplete>
) => {

    await prisma.$transaction(async () => {
        const userTemplateData = await prisma.userTemplete.create({
            data: {
                user_challenge_id: userChallnegeId,
                finished_at: date,
                complete: complete

            }
        })
        const changedTemplate = changeUserTemplateType(templateContent, userTemplateData.user_templete_id);

        await prisma.questionContent.createMany({
            data: changedTemplate
        });
    });

}




export default {
    insertUserTemplateContent

}