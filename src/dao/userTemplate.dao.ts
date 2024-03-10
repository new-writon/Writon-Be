import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserTemplete, } from '@prisma/client'
import { DataCount } from '../interfaces/challenge.interface.js';
import { bool } from 'aws-sdk/clients/signer.js';
import { SelectDateTemplateContent } from '../interfaces/userChallenge.interface.js';



const insertUserTemplate = async (
    userChallnegeId: number,
    date: Date,
    complete: bool
): Promise<UserTemplete> => {

    return await prisma.userTemplete.create({
        data: {

            user_challenge_id:userChallnegeId,
            finished_at:date,
            complete: complete
     
        }

    })

}


const selectSuccessChallengeCount = async (
    affiliationId: number,
    challengeId: number
): Promise<number> => {

    const successChallenge = await prisma.$queryRaw<DataCount[]>`

        select count(*) as count from UserTemplete as ut
            where ut.complete = 1
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId});`;

    return Number(successChallenge[0].count)

}


const signTodayTemplate = async (
    affiliationId: number,
    challengeId: number
): Promise<UserTemplete> => {

    const todayTemplate = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where date(ut.finished_at) = curdate() 
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId});`;


    return todayTemplate[0]

}

const selectUserTemplateDay = async (
    affiliationId: number,
    challengeId: number,
   // yearAndMonth: Date
   
  ): Promise<UserTemplete[]> => {

    const userTemplateData = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where 
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId})
                    order by date_format(ut.finished_at, '%Y-%m');`;


    return userTemplateData
  }



  const selectUserCompleteCount = async (
    challengeId: number,
    date: string
   
  ): Promise<number> => {

    const userCompleteCount = await prisma.$queryRaw<DataCount[]>`

    SELECT count(*) as count FROM UserTemplete as ut
    INNER JOIN UserChallenge as uc ON uc.user_challenge_id = ut.user_challenge_id AND uc.challenge_id = ${challengeId}
    WHERE ut.finished_at = ${date} 
    AND ut.complete = 1
        ;`;


    return userCompleteCount[0].count
  }


  const selectUniqueTemplate = async (
    affiliationId: number,
    userTemplateId: number,
    visibility: boolean

  ): Promise<SelectDateTemplateContent[]> => {

    const userCompleteCount = await prisma.$queryRaw<Promise<SelectDateTemplateContent[]>>`

    SELECT 
    qc.question_id,
    qc.user_templete_id,
    qc.question_content_id,
    qc.content,
    qc.visibility,
    q.category,
    q.question,
    DATE(ut.created_at) AS created_at,
    a.job,
    a.company,
    a.company_public,
    a.nickname,
    u.profile,
    MAX(l.affiliation_id) AS affiliation_id,
    CAST(COUNT(DISTINCT l.like_id) AS CHAR) AS likeCount,
    CAST(COUNT(DISTINCT cm.comment_id) AS CHAR) AS commentCount,
    CASE WHEN MAX(CAST(l.affiliation_id AS SIGNED) = ${affiliationId}) THEN '1' ELSE '0' END AS myLikeSign

    FROM
    UserTemplete AS ut
    INNER JOIN UserChallenge AS uc ON uc.user_challenge_id = ut.user_challenge_id 
    INNER JOIN QuestionContent AS qc ON ut.user_templete_id = qc.user_templete_id AND (qc.visibility = 1 OR qc.visibility = ${visibility})
    INNER JOIN Question AS q ON q.question_id = qc.question_id
    INNER JOIN Affiliation AS a ON a.affiliation_id = uc.affiliation_id
    INNER JOIN User AS u ON u.user_id = a.user_id
    LEFT JOIN Likes AS l ON l.user_templete_id = ut.user_templete_id 
    LEFT JOIN Comment AS cm ON cm.user_templete_id = ut.user_templete_id
  WHERE
    ut.user_templete_id = ${userTemplateId}
  GROUP BY
    qc.question_id,
    qc.user_templete_id,
    qc.question_content_id,
    qc.content,
    q.category,
    q.question,
    created_at,
    a.job,
    a.company,
    a.company_public,
    a.nickname,
    u.profile
    ;`;

 

    return userCompleteCount
  }






export default {

    selectSuccessChallengeCount,
    signTodayTemplate,
    selectUserTemplateDay,
    insertUserTemplate,
    selectUserCompleteCount,
    selectUniqueTemplate 
  
}