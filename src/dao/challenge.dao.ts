import prisma from '../client.js';
import { PrismaClient, Affiliation, Challenge, UserChallenge, } from '@prisma/client'
import { SelectPeriod, SelectChallengeId, SelectDay, SelectFinishAt } from '../interfaces/challenge.interface.js';
import { ParticipantData } from '../interfaces/community.interface.js';





const selectWholePeriod = async (
    affiliationId: number
): Promise<SelectPeriod> => {

    const wholePeriod = await prisma.$queryRaw<SelectPeriod[]>`
    SELECT 
    DATEDIFF(c.finish_at, c.start_at) AS period, 
    c.challenge_id
    FROM Challenge AS c 
    WHERE affiliations_id = ${affiliationId};`;

    return wholePeriod[0];
}


const selectOverlapPeriod = async (
    challengeId: number
): Promise<number> => {

    const overlapPeriod = await prisma.$queryRaw<SelectPeriod[]>`
    SELECT DATEDIFF(c.finish_at, NOW()) AS period
    FROM Challenge AS c 
    WHERE challenge_id = ${challengeId};`;

    return Number(overlapPeriod[0].period);
}

const selectPeriodDate = async (
    day: Date
): Promise<Challenge> => {

    const periodData = await prisma.$queryRaw<Challenge[]>`
    SELECT * 
    FROM Challenge as c 
    WHERE ${day} 
    BETWEEN c.start_at 
    AND c.finish_at;`;

    return periodData[0];
}




const signChallengeComplete = async (
    challengeId: number
): Promise<Challenge> => {
    const challengeComplete = await prisma.$queryRaw<Challenge[]>`
    SELECT *
    FROM Challenge as c
    WHERE c.challenge_id = ${challengeId}
    AND curdate() < c.finish_at ;`;

    return challengeComplete[0]
}



const selectChallengeId = async (
    organization: string,
): Promise<number> => {

    const challengeId = await prisma.$queryRaw<SelectChallengeId[]>`
    SELECT c.challenge_id 
    FROM Challenge as c 
    WHERE curdate() <= c.finish_at 
    AND c.affiliation_id = (select a.affiliation_id 
    FROM Affiliation as a 
    WHERE a.organization_id = (select o.organization_id 
    FROM Organization as o 
    WHERE o.name = ${organization}));`;


    return challengeId[0].challenge_id

}

const selectChallenge = async (
    challengeId: number

): Promise<Challenge> => {

    const challengeData = await prisma.$queryRaw<Challenge[]>`

    SELECT 
    c.* 
    FROM Challenge as c 
    WHERE curdate() <= c.finish_at 
    AND c.challenge_id = ${challengeId};`;



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


const selectChallengeInformation = async (
    challenge: string,
): Promise<Challenge>=> {

    const challengeInformation = await prisma.$queryRaw<Challenge[]>`
        SELECT c.* 
        FROM Challenge as c 
        WHERE c.name  = ${challenge};`;

    return challengeInformation[0]
  
}


const selectAllChallengeInformation = async () => {
    return await prisma.$queryRaw`

    SELECT 
    c.challenge_id,
    c.deposit,
    cd.day,
    cdd.count,
    cdd.deduction_rate
    FROM Challenge AS c
    INNER JOIN ChallengeDay AS cd ON cd.challenge_id = c.challenge_id
    INNER JOIN ChallengeDepositDeduction AS cdd ON cdd.challenge_id = c.challenge_id
    WHERE CURDATE() < c.finish_at
 
    `
}




export default {

    selectWholePeriod,
    selectOverlapPeriod,
    selectChallengeId,
    signChallengeComplete,
    selectPeriodDate,
    selectChallenge,
    signPeriodCondition,
    selectChallengeInformation,
    selectAllChallengeInformation
}