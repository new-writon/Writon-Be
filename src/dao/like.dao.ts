import { Likes } from '@prisma/client'
import prisma from '../client.js';
import { DataCount } from '../interfaces/challenge.interface.js';
import { GetLikeNotify } from '../interfaces/like.interface.js';



const insertLike = async(
    affiliationId: number,
    userTemplateId: number
): Promise<Likes> => {

    return await prisma.likes.create({
        data: {

            affiliation_id: affiliationId,
            user_templete_id: userTemplateId,
            check: false       
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

const getLikeNotify = async(
    userId: number,
    organization: string,
    challengeId: number
): Promise<GetLikeNotify[]> => {

    return await prisma.$queryRaw<GetLikeNotify[]>
    `
    SELECT 
    l.like_id AS LikeId, 
    l.created_at AS createdAt,
    l.check AS sign,
    ut.user_templete_id AS userTempleteId,
    ut.finished_at AS templateName,
    a.nickname AS nickname,
    'like' AS type
    FROM 
      Likes AS l
    INNER JOIN 
      UserTemplete AS ut ON ut.user_templete_id = l.user_templete_id
    INNER JOIN 
      UserChallenge AS uc ON uc.user_challenge_id = ut.user_challenge_id
    INNER JOIN 
      Affiliation AS a ON a.affiliation_id = l.affiliation_id
    INNER JOIN 
      Affiliation AS aFind ON aFind.user_id = ${userId} 
                          AND aFind.organization_id = (
                            SELECT 
                              o.organization_id
                            FROM 
                              Organization AS o
                            WHERE 
                              o.name = ${organization}
                          )
    WHERE
      uc.affiliation_id = aFind.affiliation_id
      AND
      uc.challenge_id = ${challengeId}
      AND
      aFind.affiliation_id != a.affiliation_id;
  

    `  
}


const updateLikeCheck = async(
    likeId: number
): Promise<void> => {

    return await prisma.$queryRaw<void>
    `
    UPDATE Likes AS l
    SET l.check = 1
    WHERE like_id = ${likeId}

    `  
}
export default {
    insertLike,
    deleteLike,
    selectLikeCount,
    updateLikeCheck,
    getLikeNotify
    
  }