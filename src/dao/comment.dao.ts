import prisma from '../client.js';
import { ChallengeDay, Comment } from '@prisma/client'
import { SelectComment } from '../interfaces/community.interface.js';



const selectComment = async (
    userId: number,
    userTemplateId: number

): Promise<SelectComment[]> => {

    return await prisma.$queryRaw`
    
      SELECT  
      a.job, 
      a.company,
      a.company_public,
      u.profile,
      CAST(c.comment_id AS CHAR) AS comment_id,
      a.nickname,
      c.user_templete_id,
      c.content,
      DATE(c.created_at) AS created_at,
      CAST(CASE WHEN u.user_id = ${userId} THEN 1 ELSE 0 END AS UNSIGNED) AS myCommentSign
      CAST(c.comment_group AS CHAR) AS comment_group
      FROM Comment AS c
      INNER JOIN Affiliation AS a ON a.affiliation_id = c.affiliation_id
      INNER JOIN User AS u ON u.user_id = a.user_id
      WHERE 
      c.user_templete_id = ${userTemplateId}
      ORDER BY 
      c.comment_group, c.comment_id desc

    
    `

}

const insertComment = async (
    affiliationId: number,
    content: string,
    userTemplateId: number,
    commentGroup: number 
  ): Promise<Comment> => {
  
    return await prisma.comment.create({

        data:{
            affiliation_id: affiliationId,
            content: content,
            user_templete_id: userTemplateId,
            comment_group: commentGroup,
        }

    });
  }

  const updateComment = async (
    affiliationId: number,
    content: string,
    commentId: number
  ): Promise<Comment> => {
  
    return await prisma.comment.update({

        where:{
            affiliation_id: affiliationId,
            comment_id: commentId

        },
        data:{
        
            content: content,
        }
    });
  }


  const deleteComment = async (
    affiliationId: number,
    commentId: number

  ): Promise<Comment> => {
  
    return await prisma.comment.delete({

        where :{
            affiliation_id: affiliationId,
            comment_id: commentId
        }
    });
  }


export default {
    selectComment,
    insertComment,
    deleteComment,
    updateComment

}