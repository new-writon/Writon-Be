import { PrismaClient, ErrorLog } from '@prisma/client'
import prisma from '../client.js';
import affiliationDao from './affiliation.dao.js';
import { SelectLikeCount } from '../interfaces/challenge.interface.js';


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

const selectLikeCount = async(
    userTemplateId: number
): Promise<number> => {

    const likeCount = await prisma.$queryRaw<SelectLikeCount[]>
    `
    SELECT count(*) as count 
    FROM Likes AS l
    WHERE l.user_templete_id = ${userTemplateId}
    `
    return likeCount[0].count
    
}

export default {
    insertLike,
    deleteLike,
    selectLikeCount
    
  }