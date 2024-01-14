import prisma from '../client.js';
import { PrismaClient, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay } from '../interfaces/challenge.interface.js';





const selectUserChallenge = async (
    userId: number,
    challengeId: number
): Promise<number> => {

    const overlapDeposit = await prisma.$queryRaw<UserChallenge[]>`SELECT uc.user_deposit  FROM UserChallenge as uc
    
                                                                    WHERE user_id = ${userId} 
                                                                    AND challenge_id = ${challengeId};`;



    return overlapDeposit[0].user_deposit;


}








export default {
  selectUserChallenge

}