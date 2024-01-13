import prisma from '../client.js';
import { PrismaClient, Affiliation } from '@prisma/client'


const selectNickname = async <Key extends keyof Affiliation>(
  affiliationsId: number,
  userId: number,
  keys: Key[] = [
    'nickname',
  ] as Key[]
): Promise<Pick<Affiliation, Key> | null> => {

  return (await prisma.affiliation.findMany({
    where: {
      affiliations_id: affiliationsId,
      user_id: userId
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
  keys: Key[] = ['affiliations_id'] as Key[]
): Promise<Pick<Affiliation, Key> | null> => {
  
  return await prisma.affiliation.findFirst({
    where: {
      organization_id: organizationId,
      user_id: userId
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Pick<Affiliation, Key> | null;
};




export default {

  selectNickname,
  insertAffiliation,
  selectAffiliationId
}