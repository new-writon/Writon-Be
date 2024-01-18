import prisma from '../client.js';
import { PrismaClient, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, WriteTemplete, InsertUserTemplateContent } from '../interfaces/challenge.interface.js';




const insertUserTemplateContent = async(
    templateContent: Array<InsertUserTemplateContent>
) => {

    return await prisma.questionContent.createMany({
        data: templateContent
      });
    
}






export default {
    insertUserTemplateContent 

}