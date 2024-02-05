import { Likes } from '@prisma/client'
import prisma from '../client.js';
import { DataCount } from '../interfaces/challenge.interface.js';



const insertLike = async(
    affiliationId: number,
    userTemplateId: number
): Promise<Likes> => {

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
): Promise<Likes> => {

    return await prisma.$queryRaw`
    
        DELETE FROM Likes 
        WHERE affiliation_id = ${affiliationId}
        AND user_templete_id = ${userTemplateId}
    `;
    
}

const selectLikeCount = async(
    userTemplateId: number
): Promise<number> => {

    const likeCount = await prisma.$queryRaw<DataCount[]>
    `
    SELECT count(*) as likeCount
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