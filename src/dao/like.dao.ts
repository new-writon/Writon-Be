import { PrismaClient, ErrorLog } from '@prisma/client'
import prisma from '../client.js';
import affiliationDao from './affiliation.dao.js';


const insertLike = async(
    affiliationId: number,
    userTemplateId: number
) => {

    return await prisma.likes.create({
        data: {

            affiliation_id: affiliationId,
            user_templete_id: userTemplateId       
        }
      });

}

const deleteLike = async(
    affiliationId: number,
    userTemplateId: number
) => {

    return await prisma.$queryRaw`
    
        DELETE FROM Likes 
        WHERE affiliation_id = ${affiliationId}
        AND user_templete_id = ${userTemplateId}
    `;
    
}



export default {
    insertLike,
    deleteLike
    
  }