import prisma from '../client.js';
import { Prisma, PrismaClient, QuestionContent, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, WriteTemplete, InsertUserTemplateContent } from '../interfaces/challenge.interface.js';




const insertUserTemplateContent = async(
    templateContent: Array<InsertUserTemplateContent>
): Promise<Prisma.BatchPayload> => {

    return await prisma.questionContent.createMany({
        data: templateContent
      });
    
}



export default {
    insertUserTemplateContent 

}