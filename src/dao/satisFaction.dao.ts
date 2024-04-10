import prisma from '../client.js';
import { ChallengeDay  } from '@prisma/client'
import { DataCount } from '../interfaces/challenge.interface.js';


const selectChallengeSatisFactionQuestion = async(
    challengeId: number
) => {
    return await prisma.$queryRaw
    `
    SELECT 
        s.satisfaction_id,
        s.type,
        s.question
    FROM 
        SatisFaction AS s
    WHERE
        s.challenge_id = ${challengeId}

    `
}


export default {

    selectChallengeSatisFactionQuestion 
    
}