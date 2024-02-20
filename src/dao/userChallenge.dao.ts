import prisma from '../client.js';
import { Prisma, PrismaClient, UserChallenge } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, DataCount} from '../interfaces/challenge.interface.js';
import { SelectTemplateContent, SelectDateTemplateContent, UserChallengeId, UserChallengeDeposit } from '../interfaces/userChallenge.interface.js';
import { ParticipantData } from '../interfaces/community.interface.js';





const selectUserChallengeDeposit = async (
  affiliationId: number,
  challengeId: number
): Promise<number> => {

  const overlapDeposit = await prisma.$queryRaw<UserChallenge[]>`
                SELECT 
                uc.user_deposit  
                FROM UserChallenge as uc
                WHERE uc.affiliation_id = ${affiliationId}      
                AND uc.challenge_id = ${challengeId};
                `;



  return overlapDeposit[0].user_deposit;


}



const selectUserChallenge = async (
  userId: number,
  organization: string,
  challengeId: number
): Promise<UserChallenge> => {

  const userChallengeData = await prisma.$queryRaw<UserChallenge[]>`
    SELECT uc.*  FROM UserChallenge as uc
    WHERE uc.affiliation_id = ( SELECT a.affiliation_id FROM Affiliation as a
    WHERE a.user_id = ${userId} 
    AND a.organization_id = (
    SELECT o.organization_id FROM Organization as o
    WHERE o.name = ${organization} ) )
    AND uc.challenge_id = ${challengeId};
    `;

  return userChallengeData[0];


}




const selectTemplateContent = async (
  affiliationId: number,
  challengeId: number,
): Promise<SelectTemplateContent[]> => {

  const userTemplateData = await prisma.$queryRaw<SelectTemplateContent[]>`

     SELECT  
      qc.question_id,
      qc.user_templete_id, 
      qc.question_content_id, 
      qc.content,
      ut.finished_at AS created_at, 
      q.category, 
      q.question,
      a.job,
      a.company,
      a.company_public,
      a.nickname,
      u.profile,
      l.affiliation_id,
      CAST(COUNT(DISTINCT l.like_id) AS CHAR) AS likeCount,
      CAST(COUNT(DISTINCT cm.comment_id) AS CHAR) AS commentCount,
      CASE WHEN MAX(CAST(l.affiliation_id AS SIGNED) = ${affiliationId}) THEN '1' ELSE '0' END AS myLikeSign

     FROM  UserChallenge as uc
      INNER JOIN UserTemplete as ut ON uc.user_challenge_id = ut.user_challenge_id
      INNER JOIN QuestionContent as qc ON ut.user_templete_id = qc.user_templete_id
      INNER JOIN Question as q ON q.question_id = qc.question_id
      INNER JOIN Affiliation AS a ON a.affiliation_id = uc.affiliation_id
      INNER JOIN User AS u ON u.user_id = a.user_id
      LEFT JOIN Likes AS l ON l.user_templete_id = ut.user_templete_id 
      LEFT JOIN Comment AS cm ON cm.user_templete_id = ut.user_templete_id

      WHERE uc.affiliation_id = ${affiliationId}  
      AND uc.challenge_id = ${challengeId} 
      GROUP BY
        qc.question_id,
        qc.user_templete_id,
        qc.question_content_id,
        qc.content,
        q.category,
        q.question,
        created_at,
        a.job,
        a.company,
        a.company_public,
        a.nickname,
        u.profile  

      ORDER BY ut.finished_at, qc.created_at, q.created_at
  ;`;

  return userTemplateData

}



const selectDateTemplateContent = async (
  affiliationId: number,
  challengeId: number,
  date: string
): Promise<SelectDateTemplateContent[]> => {

  return await prisma.$queryRaw`
  SELECT
    qc.question_id,
    qc.user_templete_id,
    qc.question_content_id,
    qc.content,
    q.category,
    q.question,
    DATE(ut.created_at) AS created_at,
    a.job,
    a.company,
    a.company_public,
    a.nickname,
    u.profile,
    l.affiliation_id,
    CAST(COUNT(DISTINCT l.like_id) AS CHAR) AS likeCount,
    CAST(COUNT(DISTINCT cm.comment_id) AS CHAR) AS commentCount,
    CASE WHEN MAX(CAST(l.affiliation_id AS SIGNED) = ${affiliationId}) THEN '1' ELSE '0' END AS myLikeSign

FROM
  UserChallenge AS uc
  INNER JOIN UserTemplete AS ut ON uc.user_challenge_id = ut.user_challenge_id AND ut.finished_at = ${date}
  INNER JOIN QuestionContent AS qc ON ut.user_templete_id = qc.user_templete_id AND qc.visibility = 1
  INNER JOIN Question AS q ON q.question_id = qc.question_id
  INNER JOIN Affiliation AS a ON a.affiliation_id = uc.affiliation_id
  INNER JOIN User AS u ON u.user_id = a.user_id
  LEFT JOIN Likes AS l ON l.user_templete_id = ut.user_templete_id 
  LEFT JOIN Comment AS cm ON cm.user_templete_id = ut.user_templete_id
WHERE
  uc.challenge_id = ${challengeId}
GROUP BY
  qc.question_id,
  qc.user_templete_id,
  qc.question_content_id,
  qc.content,
  q.category,
  q.question,
  created_at,
  a.job,
  a.company,
  a.company_public,
  a.nickname,
  u.profile
ORDER BY
  ut.created_at, qc.created_at, q.created_at;

  ;`;
}



const insertChallenge = async (
  affiliationId: number,
  challengeId: number,
  deposit: number
): Promise<UserChallenge> => {


  return await prisma.userChallenge.create({
      data: {
          challenge_id: challengeId,
          affiliation_id: affiliationId,
          user_deposit: deposit
      }

  })
}



const selectParticipantInformation = async (
  userId: number,
  challengeId: number
): Promise<ParticipantData[]> => {

  const participantInformationData = await prisma.$queryRaw<ParticipantData[]>`


  SELECT 
  u.profile,
  a.job,
  a.job_introduce,
  a.nickname,
  a.company_public,
  a.company,
  uc.cheering_phrase,
  uc.cheering_phrase_date
  FROM UserChallenge as uc
  INNER JOIN Affiliation as a ON a.affiliation_id = uc.affiliation_id
  INNER JOIN User as u ON u.user_id = a.user_id AND u.user_id != ${userId}
  WHERE uc.challenge_id = ${challengeId}


  ;`;


  return participantInformationData
}




const selectMyParticipantInformation = async (
  userId: number,
  challengeId: number
): Promise<ParticipantData[]> => {
  const myParticipantInformationData = await prisma.$queryRaw<ParticipantData[]>`

  SELECT 
  u.profile,
  a.job, 
  a.job_introduce,
  a.nickname,
  a.company_public,
  a.company,
  u.email,
  uc.cheering_phrase,
  uc.cheering_phrase_date
  FROM UserChallenge as uc
  INNER JOIN Affiliation as a ON a.affiliation_id = uc.affiliation_id
  INNER JOIN User as u ON u.user_id = a.user_id AND u.user_id = ${userId}
  WHERE uc.challenge_id = ${challengeId}


  ;`;


  return myParticipantInformationData
}


const updateCheeringPhrase = async (
  affiliationId: number,
  challengeId: number,
  content: string
): Promise<UserChallenge> => {

  return await prisma.$queryRaw`

  UPDATE UserChallenge as uc SET cheering_phrase = ${content}, cheering_phrase_date = CURDATE() 
  WHERE uc.affiliation_id = ${affiliationId} AND uc.challenge_id = ${challengeId}
;`;

}

const challengeParticipantCount = async (
  challengeId: number,
): Promise<number>=> {

  const participantCount = await prisma.$queryRaw<DataCount[]>`

      SELECT count(*) as count FROM UserChallenge as uc 
      WHERE uc.challenge_id = ${challengeId};`;

  return participantCount[0].count

}

const selectChallengeSuccessCount = async (
  challengeId: number,
): Promise<UserChallengeId[]> => {

  const userChallengeIds = await prisma.$queryRaw<UserChallengeId[]>`

  SELECT 
  uc.user_challenge_id, 
  CAST(COUNT(ut.user_challenge_id) AS CHAR) AS count 
  FROM UserChallenge AS uc 
  LEFT JOIN UserTemplete AS ut ON ut.user_challenge_id = uc.user_challenge_id AND ut.complete = 1
  WHERE uc.challenge_id = ${challengeId}
  GROUP BY uc.user_challenge_id;  
      `;

  return userChallengeIds

}

const selectUniqueUserChallengeSuccessCount = async (
  challengeId: number,
  affiliationId: number
): Promise<UserChallengeId> => {

  const userChallengeIds = await prisma.$queryRaw<UserChallengeId[]>`

  SELECT 
  uc.user_challenge_id, 
  CAST(COUNT(ut.user_challenge_id) AS CHAR) AS count 
  FROM UserChallenge AS uc 
  LEFT JOIN UserTemplete AS ut ON ut.user_challenge_id = uc.user_challenge_id AND ut.complete = 1
  WHERE uc.challenge_id = ${challengeId}
  AND uc.affiliation_id = ${affiliationId}
  GROUP BY uc.user_challenge_id;  
      `;

  return userChallengeIds[0]

}


const userDepositUpdate = async (
  userDepositInformation: Array<UserChallengeDeposit>
):  Promise<Prisma.BatchPayload[]> => {

  const updatePromise = userDepositInformation.map(async (depositInfo) => {
    const { userChallengeId, calculatedDeposit } = depositInfo;
    
    return prisma.userChallenge.updateMany({
      where: {
        user_challenge_id: userChallengeId
      },
      data: {
        user_deposit: calculatedDeposit
    
      }
    });
  });

  return Promise.all(updatePromise);
};





export default {
  selectUserChallengeDeposit,
  selectTemplateContent,
  selectUserChallenge,
  selectDateTemplateContent,
  insertChallenge,
  selectParticipantInformation,
  selectMyParticipantInformation,
  updateCheeringPhrase,
  challengeParticipantCount,
  selectChallengeSuccessCount,
  userDepositUpdate,
  selectUniqueUserChallengeSuccessCount

}