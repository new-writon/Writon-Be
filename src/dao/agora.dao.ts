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
  challengeId:number,
  date: Date
  ) => {
   
    return await prisma.$queryRaw<SelectAgora[]>
    `
    SELECT  
    ag.agora_id,
    ag.question,
    COUNT(agc.agora_comment_id) AS comment_count
    FROM Agora AS ag
    LEFT JOIN AgoraComment AS agc ON agc.agora_id = ag.agora_id
    WHERE
        DATE(ag.created_at) = ${date}
        AND
        ag.challenge_id = ${challengeId}
    GROUP BY ag.agora_id, ag.question;

    `
  }


  const selectAgoraComment = async(
    agoraId: number
  ): Promise<void> => {
  
  
  }

export default {
    insertAgora,
    insertAgoraComment,
    selectAgora
}