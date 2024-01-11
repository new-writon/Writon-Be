import prisma from '../client.js';
import { PrismaClient, affiliations } from '@prisma/client'


const selectNickname = async <Key extends keyof affiliations>(
  affiliationsId: number,
  userId: number,
  keys: Key[] = [
    'nickname',
  ] as Key[]
): Promise<Pick<affiliations, Key> | null> => {

  return (await prisma.affiliations.findMany({
    where: {
      affiliations_id: affiliationsId,
      user_id: userId
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }))[0] as Pick<affiliations, Key> | null;

}




export default {

  selectNickname
}