import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt } from '../interfaces/challenge.interface.js';
import { ParticipantData } from '../interfaces/community.interface.js';





const selectWholePeriod = async (
    affiliationId: number
): Promise<SelectPeriod> => {

    const wholePeriod = await prisma.$queryRaw<SelectPeriod[]>`SELECT DATEDIFF(c.finish_at, c.start_at) AS period, c.challenge_id
                                                        FROM Challenge AS c 
                                                        WHERE affiliations_id = ${affiliationId};`;

    return wholePeriod[0];
}


const selectOverlapPeriod = async (
    challengeId: number
): Promise<number> => {

    const overlapPeriod = await prisma.$queryRaw<SelectPeriod[]>`SELECT DATEDIFF(c.finish_at, NOW()) AS period
                                                        FROM Challenge AS c 
                                                        WHERE challenge_id = ${challengeId};`;

    return Number(overlapPeriod[0].period);
}

const selectPeriodDate = async (
    day: Date
): Promise<Challenge> => {

    const periodData = await prisma.$queryRaw<Challenge[]>`select * from Challenge as c 
                                                                    where ${day} 
                                                                    between c.start_at and c.finish_at;`;

    //                  console.log(periodData)
    return periodData[0];
}

const selectOverlapCount = async (
    challengeId: number
): Promise<SelectDay[]> => {

    const overlapCount = await prisma.$queryRaw<SelectDay[]>`select cd.day from ChallengeDay as cd 
                                                    where cd.challenge_id = ${challengeId} 
                                                    order by cd.day;`;


    return overlapCount;
}





const signChallengeComplete = async (
    challengeId: number
): Promise<Challenge> => {
    const challengeComplete = await prisma.$queryRaw<Challenge[]>`select * from Challenge as c
                           where c.challenge_id = ${challengeId}
                           and curdate() < c.finish_at ;`;

    return challengeComplete[0]
}



const selectChallengeId = async (
    organization: string,
    userId: number

): Promise<number> => {

    const challengeId = await prisma.$queryRaw<SelectChallengeId[]>`
                    select c.challenge_id from Challenge as c 
                    where curdate() <= c.finish_at 
                    and c.affiliation_id = (select a.affiliation_id 
                    from Affiliation as a 
                    where a.organization_id = (select o.organization_id 
                        from Organization as o 
                        where o.name = ${organization}));`;


    return challengeId[0].challenge_id

}

const selectChallenge = async (
    challengeId: number

): Promise<Challenge> => {

    const challengeData = await prisma.$queryRaw<Challenge[]>`
                    select c.* from Challenge as c 
                    where curdate() <= c.finish_at 
                    and c.challenge_id = ${challengeId};`;



    return challengeData[0]

}


const signPeriodCondition = async (
    date: Date,
    challengeId: number

): Promise<Challenge> => {


    const signCondition = await prisma.$queryRaw<Challenge[]>`
       
            SELECT *
            FROM Challenge as c
            WHERE
            c.challenge_id = ${challengeId}
            AND 
            ${date} between c.start_at AND c.finish_at;`

    return signCondition[0]

}


const insertChallenge = async (
    affiliationId: number,
    challengeId: number,
    deposit: number
) => {


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

    SELECT u.profile, a.job, a.job_introduce, a.nickname, a.company_public, a.company, uc.cheering_phrase, uc.cheering_phrase_date
    FROM UserChallenge as uc
    INNER JOIN Affiliation as a ON a.affiliation_id = uc.affiliation_id
    INNER JOIN User as u ON u.user_id = a.user_id AND u.user_id != ${userId}
    WHERE uc.challenge_id = ${challengeId}
    OR uc.cheering_phrase_date IS NULL

    ;`;


    return participantInformationData
}









export default {

    selectWholePeriod,
    selectOverlapPeriod,
    selectChallengeId,
    selectOverlapCount,
    signChallengeComplete,
    selectPeriodDate,
    selectChallenge,
    insertChallenge,
    signPeriodCondition,
    selectParticipantInformation 
}