import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao, challengeDao, userChallengeDao } from '../dao/index.js';




const enrollOrganization = async (
    userId: number,
    organization: string,
    nickname: string,
    job: string,
    jobIntroduce: string,
    hireDate: Date,
    company: string,
    companyPublic: boolean,

) => {

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

    const [challengeData, userAffiliation] = await Promise.all([

        challengeDao.selectChallenge(challengeId),
        affiliationDao.selectAffiliation(userId, organization)

    ]);

    await userChallengeDao.insertChallenge(userAffiliation.affiliation_id, challengeData.challenge_id, challengeData.deposit);

}


const selectOrganizationChallengeId = async (
    userId: number
) => {

    return await affiliationDao.selectOrganizationAndChallengeId(userId)

}


const checkNickname = async (
    organization: string,
    nickname: string
) => {

    const nicknameData = await affiliationDao.checkNickname(organization, nickname);

    if (!nicknameData[0]) {

        return;
    }

    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "can't use nickname");

}



export default {
    enrollOrganization,
    enrollChallenge,
    selectOrganizationChallengeId,
    checkNickname
}
