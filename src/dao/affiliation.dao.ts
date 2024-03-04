import prisma from '../client.js';
import { Affiliation, Challenge } from '@prisma/client'
import { SelectUserMyPageData } from '../interfaces/affiliation.interface.js';
import { OrganizationChallenge } from '../interfaces/challenge.interface.js';


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
  o.name AS organization, 
  uc.challenge_id,
  c.name AS challenge,
  CASE WHEN c.finish_at < CURDATE() THEN '1' ELSE '0' END AS challengeFinishSign
  FROM Affiliation AS a
  INNER JOIN Organization AS o ON o.organization_id = a.organization_id
  INNER JOIN UserChallenge AS uc ON uc.affiliation_id = a.affiliation_id
  INNER JOIN Challenge AS c ON c.challenge_id = uc.challenge_id 
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

const selectUserMyPageData = async (
  userId: number,
  organization: string
) => {

  return (await prisma.$queryRaw<SelectUserMyPageData[]>
  `
  SELECT 
  u.email AS email,
  u.profile AS userProfile,
  u.account_number AS accountNumber,
  u.bank AS bank,
  a.nickname AS nickname,
  a.hire_date AS hiredate,
  a.company AS company,
  a.job AS job,
  a.job_introduce AS jobIntroduce,
  a.company_public AS companyPublic
FROM Affiliation as a
LEFT JOIN User AS u ON u.user_id = a.user_id
INNER JOIN Organization AS o ON o.organization_id = a.organization_id 
WHERE u.user_id = ${userId} AND o.name = ${organization}

  `)[0]
}



const updateAffiliationMyPageData = async (
  userId: number,
  organization: string,
  nickname: string, 
  company: string, 
  hireDate: Date, 
  job: string, 
  jobIntroduce: string,
  companyPublic: boolean

) => {

  return await prisma.$queryRaw
  `
  UPDATE Affiliation AS a 
  SET a.nickname = ${nickname}, 
      a.hire_date = ${hireDate}, 
      a.job = ${job}, 
      a.job_introduce = ${jobIntroduce}, 
      a.company_public = ${companyPublic}, 
      a.company = ${company}
  WHERE 
      a.organization_id = (
        SELECT o.organization_id FROM Organization AS o
        WHERE o.name = ${organization}
      )
  AND a.user_id = ${userId}


  `
}

const selectAllOragnizationAndAllChallenge = async (

) => {

  return (await prisma.$queryRaw<OrganizationChallenge[]>
    `
    SELECT 
    o.name AS organization,
    c.name AS challenge
   
    FROM Affiliation as a
    INNER JOIN Challenge AS c ON c.affiliation_id = a.affiliation_id
    INNER JOIN Organization AS o ON o.organization_id = a.organization_id 
  
  
    `)

}





export default {

  selectNickname,
  insertAffiliation,
  selectAffiliationId,
  selectAffiliation,
  selectOrganizationAndChallengeId,
  checkNickname,
  selectUserMyPageData,
  updateAffiliationMyPageData,
  selectAllOragnizationAndAllChallenge
 
}