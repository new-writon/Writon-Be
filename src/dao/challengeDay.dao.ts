import prisma from '../client.js';
import { ChallengeDay  } from '@prisma/client'
import { DataCount } from '../interfaces/challenge.interface.js';







const signChallengeDay = async (
    challengeId: number,
    date: Date
): Promise<ChallengeDay> => {

    const challengeDayData = await prisma.$queryRaw<ChallengeDay[]>`
    SELECT  cd.*  
    FROM ChallengeDay as cd
    WHERE cd.day = ${date}
    AND cd.challenge_id = ${challengeId}
                                                                
                                                                ;`;

    return challengeDayData[0];
}



  const selectChallengeDay = async (
    challengeId: number
): Promise<ChallengeDay[]> => {

    const challengeDayData = await prisma.$queryRaw<ChallengeDay[]>`
          SELECT cd.day FROM ChallengeDay as cd 
          WHERE cd.challenge_id = ${challengeId}
          AND cd.day BETWEEN (SELECT c.start_at 
            FROM Challenge as c WHERE challenge_id = ${challengeId})
            AND CURDATE()
   
   
    ;`;

    return challengeDayData;
}


const selectChallengeDate = async (
    challengeId: number
): Promise<ChallengeDay[]> => {

    return await prisma.$queryRaw<ChallengeDay[]>`
    
       SELECT 
       cd.* 
       FROM ChallengeDay AS cd
       WHERE cd.challenge_id = ${challengeId}
       AND cd.day <= CURDATE()
       ORDER BY cd.day
    `
}


const selectOverlapCount = async (
    challengeId: number
): Promise<number> => {

    const overlapCount = await prisma.$queryRaw<DataCount[]>`
    SELECT 
    count(*) as count 
    FROM ChallengeDay as cd 
    WHERE cd.challenge_id = ${challengeId} 
    ;`;


    return Number(overlapCount[0].count);
}




export default {

    signChallengeDay,
    selectChallengeDay,
    selectChallengeDate,
    selectOverlapCount,
    
}