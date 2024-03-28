import prisma from '../client.js';
import { ChallengeDay, Comment } from '@prisma/client'


const insertAgora = async(
    userChallengeId: number,
    agoraQuestion: string
  ): Promise<void> => {
  
    await prisma.agora.create({

        data:{
            user_challenge_id: userChallengeId,
            question: agoraQuestion       
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
    date: Date
  ) => {
   
    return await prisma.$queryRaw
    `
    SELECT  
    ag.question
    FROM Agora AS ag
    INNER JOIN AgoraComment AS agc ON agc.agora_id = ag.agora_id
    WHERE
      Date(ag.created_at) = ${date}

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