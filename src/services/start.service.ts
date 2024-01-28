import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao, challengeDao, userChallengeDao } from '../dao/index.js';
import { calculateDeposit, sortChallengeData } from '../modules/challengeScheduler.js';
import { makeChallengeUserDeposit } from '../utils/challenge.js';




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

    const [challengeAllData, userAffiliation, challengeData] = await Promise.all([

        challengeDao.selectUniqueChallengeInformation(challengeId),
        affiliationDao.selectAffiliation(userId, organization),
        challengeDao.selectChallenge(challengeId)

    ]);


    if (!challengeAllData[0]) {

        return await userChallengeDao.insertChallenge(
            userAffiliation.affiliation_id,
            challengeId,
            challengeData.deposit
        );

    }

    const caculateDepositResult = await makeChallengeUserDeposit(challengeAllData);

    return await userChallengeDao.insertChallenge(
        userAffiliation.affiliation_id,
        challengeId,
        caculateDepositResult!.calculatedDeposit
    );
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
