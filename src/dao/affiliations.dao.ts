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





export default {

  selectNickname
}