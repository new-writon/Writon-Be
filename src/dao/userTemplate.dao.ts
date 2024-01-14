import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserTemplete, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt } from '../interfaces/challenge.interface.js';




const selectSuccessChallenge = async (
    userId: number,
    challengeId: number
): Promise<UserTemplete[]> => {

    const successChallenge = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where ut.complete = true 
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.user_id = ${userId}
                    and uc.challenge_id = ${challengeId});`;

    return successChallenge

}


const signTodayTemplate = async (
    userId: number,
    challengeId: number
): Promise<UserTemplete> => {

    const todayTemplate = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where date(ut.finished_at) = curdate() 
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.user_id = ${userId}
                    and uc.challenge_id = ${challengeId});`;


                    console.log(todayTemplate)

    return todayTemplate[0]

}



export default {


    selectSuccessChallenge,
    signTodayTemplate
  
}