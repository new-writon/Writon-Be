import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao, challengeDao } from '../dao/index.js';




const enrollOrganization = async (
    userId: number,
    organization: string,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: Date,
    company: string,
    companyPublic: boolean,

): Promise<void> => {

    const organizationId = await organizationDao.selectOrganizationId(organization);

    await affiliationDao.insertAffiliation(

        userId,
        organizationId?.organization_id!,
        nickname,
        job,
        jobIntroduce,
        hireDate,
        company,
        companyPublic
    );

}


const enrollChallenge = async (
    userId: number,
    organization: string,
    challengeId: number
) => {

    const [ challengeData, userAffiliation ] = await Promise.all([

        challengeDao.selectChallenge(challengeId),
        affiliationDao.selectAffiliation(userId, organization)

    ]);

    await challengeDao.insertChallenge(userAffiliation.affiliation_id, challengeData.challenge_id, challengeData.deposit);

}


const selectOrganizationChallengeId = async(
    userId: number
) => {

    return await affiliationDao.selectOrganizationAndChallengeId(userId)

}





export default {
    enrollOrganization,
    enrollChallenge,
    selectOrganizationChallengeId 
}
