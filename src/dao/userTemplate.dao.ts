import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserTemplete, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt, SelectUserCompleteCount, SelectSuccessChallengeCount } from '../interfaces/challenge.interface.js';
import { bool } from 'aws-sdk/clients/signer.js';



const insertUserTemplate = async (
    userChallnegeId: number,
    date: Date,
    complete: bool
) => {

    return await prisma.userTemplete.create({
        data: {

            user_challenge_id:userChallnegeId,
            finished_at:date,
            complete: complete
     
        }

    })

}


const selectSuccessChallengeCount = async (
    affiliationId: number,
    challengeId: number
): Promise<number> => {

    const successChallenge = await prisma.$queryRaw<SelectSuccessChallengeCount[]>`

        select count(*) as count from UserTemplete as ut
            where ut.complete = 1
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId});`;

    return Number(successChallenge[0].count)

}


const signTodayTemplate = async (
    affiliationId: number,
    challengeId: number
): Promise<UserTemplete> => {

    const todayTemplate = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where date(ut.finished_at) = curdate() 
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId});`;


    return todayTemplate[0]

}

const selectUserTemplateDay = async (
    affiliationId: number,
    challengeId: number,
    yearAndMonth: Date
   
  ): Promise<UserTemplete[]> => {

    const userTemplateData = await prisma.$queryRaw<UserTemplete[]>`

        select ut.* from UserTemplete as ut
            where date_format(ut.finished_at, '%Y-%m') = ${yearAndMonth}
            and
            ut.user_challenge_id = (select uc.user_challenge_id
            from UserChallenge as uc 
                where uc.affiliation_id = ${affiliationId}
                    and uc.challenge_id = ${challengeId})
                    order by date_format(ut.finished_at, '%Y-%m');`;


    return userTemplateData
  }



  const selectUserCompleteCount = async (
    challengeId: number,
    date: string
   
  ): Promise<number> => {

    const userCompleteCount = await prisma.$queryRaw<SelectUserCompleteCount[]>`

    SELECT count(*) as count FROM UserTemplete as ut
    INNER JOIN UserChallenge as uc ON uc.user_challenge_id = ut.user_challenge_id AND uc.challenge_id = ${challengeId}
    WHERE ut.finished_at = ${date} 
    AND ut.complete = 1
        ;`;


    return userCompleteCount[0].count
  }





export default {


    selectSuccessChallengeCount,
    signTodayTemplate,
    selectUserTemplateDay,
    insertUserTemplate,
    selectUserCompleteCount
  
}