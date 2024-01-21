import prisma from '../client.js';
import { ChallengeDay  } from '@prisma/client'



const selectComment = async (
    userId: number,
    userTemplateId: number

) => {

    return await prisma.$queryRaw`
    
       SELECT  a.job, a.company, a.company_public, u.profile, c.comment_id, a.nickname,
       c.comment_group, c.user_templete_id, c.content, c.comment_id, DATEDIFF(c.created_at, CURDATE()) AS daysAgo,
       CASE WHEN u.user_id = ${userId} THEN true ELSE false END AS myCommentSign
       FROM Comment AS c
       INNER JOIN Affiliation AS a ON a.affiliation_id = c.affiliation_id
       INNER JOIN User AS u ON u.user_id = a.user_id
       WHERE c.user_templete_id = ${userTemplateId}
       ORDER BY c.comment_group, c.comment_id
  
    
    `

}




export default {
    selectComment
  
}