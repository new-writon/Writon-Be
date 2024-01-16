import prisma from '../client.js';
import { PrismaClient, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay } from '../interfaces/challenge.interface.js';
import { SelectTemplateContent } from '../interfaces/userChallenge.interface.js';





const selectUserChallenge = async (
  affiliationId: number,
  challengeId: number
): Promise<number> => {

  const overlapDeposit = await prisma.$queryRaw<UserChallenge[]>`
                SELECT uc.user_deposit  FROM UserChallenge as uc
                WHERE uc.affiliation_id = ${affiliationId}      
                AND uc.challenge_id = ${challengeId};
                `;



  return overlapDeposit[0].user_deposit;


}


const selectTemplateContent = async (
  affiliationId: number,
  challengeId: number,
  yearAndMonth: Date
): Promise<SelectTemplateContent[]> => {

  const userTemplateData = await prisma.$queryRaw<SelectTemplateContent[]>`

     SELECT  qc.question_id, qc.user_templete_id, qc.question_content_id, qc.content, ut.finished_at, q.category, q.question  FROM  UserChallenge as uc
      INNER JOIN UserTemplete as ut ON uc.user_challenge_id = ut.user_challenge_id
      INNER JOIN QuestionContent as qc ON ut.user_templete_id = qc.user_templete_id
      INNER JOIN Question as q ON q.question_id = qc.question_id
        WHERE uc.affiliation_id = ${affiliationId}      
          AND uc.challenge_id = ${challengeId} 
            AND date_format(ut.finished_at, '%Y-%m') = ${yearAndMonth}
              ORDER BY ut.finished_at, qc.created_at, q.created_at
  ;`;

  return userTemplateData

}






export default {
  selectUserChallenge,
  selectTemplateContent

}