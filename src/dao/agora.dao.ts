import prisma from '../client.js';
import { ChallengeDay, Comment } from '@prisma/client'


const insertAgora = async(
    challengeId:number,
    userChallengeId: number,
    agoraQuestion: string
  ): Promise<void> => {
  
    await prisma.agora.create({

        data:{
            user_challenge_id: userChallengeId,
            question: agoraQuestion,
            challenge_id: challengeId
                 
        }

    }); 
  }

  const insertAgoraComment = async(
    agoraId: number,
    affiliationId: number,
    agoraContent: string
  ): Promise<void> => {
  
    await prisma.agoraComment.create({

        data:{
            agora_id: agoraId,
            content: agoraContent,
            affiliation_id: affiliationId
             
        }

    }); 
  }

const selectAgora = async(
  userId:number,
  challengeId:number,
  date: Date
  ) => {
   
    return await prisma.$queryRaw<SelectAgora[]>
    `
    SELECT  
    ag.agora_id,
    ag.question,
    COUNT(DISTINCT agc.affiliation_id) AS participate_count,
    a.nickname,
    TIME_FORMAT(ag.created_at, '%H:%i') AS created_time,
    DATE(ag.created_at) AS created_date,
    u.profile,
    CASE WHEN u.user_id = ${userId} THEN '1' ELSE '0' END  AS myAgoraSign
    FROM Agora AS ag
    LEFT JOIN AgoraComment AS agc ON agc.agora_id = ag.agora_id
    INNER JOIN UserChallenge AS uc ON uc.user_challenge_id = ag.user_challenge_id
    INNER JOIN Affiliation AS a ON a.affiliation_id = uc.affiliation_id
    INNER JOIN User AS u ON u.user_id = a.user_id
    WHERE
        DATE(ag.created_at) = ${date}
        AND
        ag.challenge_id = ${challengeId}
    GROUP BY ag.agora_id, ag.question
    ORDER BY ag.created_at desc;

    `
  }


  const selectAgoraAndUserSign = async(
    affiliationId:number,
    challengeId:number,
    date: Date
    ) => {
     
      return await prisma.$queryRaw<SelectAgora[]>
      `
      SELECT  
      ag.agora_id,
      ag.question,
      COUNT(DISTINCT agc.affiliation_id) AS participate_count,
      a.nickname,
      TIME_FORMAT(ag.created_at, '%H:%i') AS created_time,
      DATE(ag.created_at) AS created_date,
      u.profile,
      CASE WHEN EXISTS (
          SELECT 1
          FROM AgoraComment AS agcm
          WHERE agcm.agora_id = ag.agora_id
          AND agcm.affiliation_id = ${affiliationId}
        ) THEN '1' ELSE '0' END  AS myAgoraSign
    FROM Agora AS ag
    LEFT JOIN AgoraComment AS agc ON agc.agora_id = ag.agora_id
    INNER JOIN UserChallenge AS uc ON uc.user_challenge_id = ag.user_challenge_id
    INNER JOIN Affiliation AS a ON a.affiliation_id = uc.affiliation_id
    INNER JOIN User AS u ON u.user_id = a.user_id
    WHERE
        DATE(ag.created_at) = ${date}
        AND
        ag.challenge_id = ${challengeId}
    GROUP BY ag.agora_id, ag.question
    ORDER BY ag.created_at DESC;
    `
    }




  const selectAgoraComment = async(
    userId:number,
    agoraId: number
  ) => {
    return await prisma.$queryRaw<SelectAgoraComment[]>
    `
    SELECT
    agc.agora_comment_id,
    agc.content,
    a.nickname,
    u.profile,
    TIME_FORMAT(agc.created_at, '%H:%i') AS created_time,
    CASE WHEN u.user_id = ${userId} THEN '1' ELSE '0' END  AS myCommentSign
    FROM
    AgoraComment AS agc
    INNER JOIN Affiliation AS a ON a.affiliation_id = agc.affiliation_id
    INNER JOIN User AS u ON u.user_id = a.user_id
    WHERE 
      agc.agora_id = ${agoraId}
    ORDER BY agc.created_at asc;
    
    `
  
  }

export default {
    insertAgora,
    insertAgoraComment,
    selectAgora,
    selectAgoraComment,
    selectAgoraAndUserSign 
}