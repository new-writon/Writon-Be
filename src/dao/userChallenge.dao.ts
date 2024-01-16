import prisma from '../client.js';
import { PrismaClient, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay } from '../interfaces/challenge.interface.js';




// 문제 생김
const selectUserChallenge = async (
  affiliationId: number,
  challengeId: number
): Promise<number> => {

  console.log(challengeId);
  console.log(affiliationId);

  const overlapDeposit = await prisma.$queryRaw<UserChallenge[]>`
                SELECT uc.user_deposit  FROM UserChallenge as uc
                WHERE uc.affiliation_id = ${affiliationId}      
                AND uc.challenge_id = ${challengeId};
                `;



  return overlapDeposit[0].user_deposit;


}








export default {
  selectUserChallenge

}