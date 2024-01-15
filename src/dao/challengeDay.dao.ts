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


const selectChallengeDay = async <Key extends keyof ChallengeDay>(
    challengeId: number,
    keys: Key[] = ['day'] as Key[]
  ): Promise<Pick<ChallengeDay, Key>[] | null> => {
  
    return await prisma.challengeDay.findMany({
      where: { challenge_id: challengeId},
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Pick<ChallengeDay, Key>[] | null;
  }




export default {

    signChallengeDay,
    selectChallengeDay
}