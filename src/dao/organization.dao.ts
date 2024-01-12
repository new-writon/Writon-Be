import prisma from '../client.js';
import { Affiliation, Organization } from '@prisma/client'




const  selectOrganizationId = async <Key extends keyof Organization >(
    organization : string,
    keys: Key[] = ['organization_id'] as Key[]
  ): Promise<Pick<Organization , Key> | null> => {
  
    return (await prisma.organization.findMany({
      where: { name: organization },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }))[0] as Pick<Organization , Key> | null;
  }


  const selectAffiliation = async <Key extends keyof Organization >(
    organization: string,
    userId: number,
   // keys: Key[] = ['organization_id'] as Key[]
  ): Promise<Pick<Organization , Key> | null> => {
    return (await prisma.organization.findMany({
      where: {
        name: organization,
      },
      include:{
        affiliations: {
          where:{
            user_id: userId
          }
        }
      }
     }))[0] as Pick<Organization , Key> | null;
  };



export default {

    selectOrganizationId,
    selectAffiliation
  }