import prisma from '../client.js';
import { Affiliation, Challenge } from '@prisma/client'


const selectNickname = async <Key extends keyof Affiliation>(
  affiliationId: number,
  keys: Key[] = [
    'nickname',
  ] as Key[]
): Promise<Pick<Affiliation, Key> | null> => {

  return (await prisma.affiliation.findMany({
    where: {
      affiliation_id: affiliationId
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }))[0] as Pick<Affiliation, Key> | null;
}


const insertAffiliation = async <Key extends keyof Affiliation>(
  userId: number,
  organizationId: number,
  nickname: string,
  job: string,
  jobIntroduce: string,
  hireDate: Date,
  company: string,
  companyPublic: boolean,
): Promise<Pick<Affiliation, Key> | null> => {
  return await prisma.affiliation.create({

    data: {
      user_id: userId,
      organization_id: organizationId,
      nickname: nickname,
      job: job,
      job_introduce: jobIntroduce,
      hire_date: new Date(hireDate),
      company: company,
      company_public: companyPublic
    }

  })
};


const selectAffiliationId = async <Key extends keyof Affiliation>(
  userId: number,
  organizationId: number,
  keys: Key[] = ['affiliation_id'] as Key[]
): Promise<Pick<Affiliation, Key> | null> => {
  
  return await prisma.affiliation.findFirst({
    where: {
      organization_id: organizationId,
      user_id: userId
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Pick<Affiliation, Key> | null;
};

const selectAffiliation = async (
  userId: number,
  organization: string
): Promise<Affiliation> => {

  const affiliationData = await prisma.$queryRaw<Affiliation[]>`
  SELECT 
  a.* 
  FROM Affiliation as a
  WHERE a.user_id = ${userId} 
  AND a.organization_id = (
    SELECT o.organization_id FROM Organization as o
    WHERE o.name = ${organization}
  );`;

  return affiliationData[0]

}



const selectOrganizationAndChallengeId = async (
  userId: number
): Promise<Challenge[]> => {

  return await prisma.$queryRaw<Challenge[]>`

  SELECT 
  o.name, 
  uc.challenge_id 
  FROM Affiliation AS a
  INNER JOIN Organization AS o ON o.organization_id = a.organization_id
  INNER JOIN UserChallenge AS uc ON uc.affiliation_id = a.affiliation_id
  INNER JOIN Challenge AS c ON c.challenge_id = uc.challenge_id AND CURDATE() <= c.finish_at
  WHERE a.user_id = ${userId}
  ORDER BY uc.created_at desc;
  `;

}


const checkNickname = async (
  organization: string,
  nickname: string
): Promise<Affiliation[]> => {

  return await prisma.$queryRaw<Affiliation[]>`

  SELECT 
  a.* 
  FROM Affiliation as a
  WHERE 
    a.organization_id = (
    SELECT o.organization_id FROM Organization as o
    WHERE o.name = ${organization}
  )
  AND a.nickname = ${nickname};
  
  `;



}



export default {

  selectNickname,
  insertAffiliation,
  selectAffiliationId,
  selectAffiliation,
  selectOrganizationAndChallengeId,
  checkNickname
}