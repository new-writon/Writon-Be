import prisma from '../client.js';
import { ChallengeDay  } from '@prisma/client'






const signChallengeDay = async (
    date: Date
): Promise<ChallengeDay> => {

    const challengeDayData = await prisma.$queryRaw<ChallengeDay[]>`SELECT  cd.*  
                                                                FROM ChallengeDay as cd
                                                                WHERE cd.day = ${date};`;

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



export default {

    signChallengeDay,
    selectChallengeDay
}