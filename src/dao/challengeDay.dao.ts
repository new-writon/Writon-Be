import prisma from '../client.js';
import { ChallengeDay, } from '@prisma/client'






const signChallengeDay = async (
    date: Date
): Promise<ChallengeDay> => {

    const challengeDayData = await prisma.$queryRaw<ChallengeDay[]>`SELECT  cd.*  
                                                                FROM ChallengeDay as cd
                                                                WHERE cd.day = ${date};`;

    return challengeDayData[0];
}




export default {

    signChallengeDay
}