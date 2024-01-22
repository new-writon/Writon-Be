import prisma from '../client.js';
import { ChallengeDay } from '@prisma/client'
import { SelectComment } from '../interfaces/community.interface.js';



const selectComment = async (
    userId: number,
    userTemplateId: number

): Promise<SelectComment[]> => {

    return await prisma.$queryRaw`
    
       SELECT  
        a.job, a.company,
        a.company_public,
        u.profile,
        c.comment_id,
        a.nickname,
        c.user_templete_id,
        c.content,
        DATE(c.created_at) AS created_at,
       CASE WHEN u.user_id = ${userId} THEN true ELSE false END AS myCommentSign,
       COALESCE(c.comment_group, 'F') AS comment_group
       FROM Comment AS c
       INNER JOIN Affiliation AS a ON a.affiliation_id = c.affiliation_id
       INNER JOIN User AS u ON u.user_id = a.user_id
       WHERE 
       c.user_templete_id = ${userTemplateId}
       ORDER BY 
       c.comment_group, c.comment_id desc
  
    
    `

}




export default {
    selectComment

}