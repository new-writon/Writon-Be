import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, organizationDao, challengeDao, userChallengeDao } from '../dao/index.js';
import { calculateDeposit, sortChallengeData } from '../modules/challengeScheduler.js';
import { checkChallenge, makeChallengeUserDeposit } from '../utils/challenge.js';
import { checkOrganization } from '../utils/organization.js';




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

    const [challengeAllData, userAffiliation] = await Promise.all([

        challengeDao.selectUniqueChallengeInformation(challengeId),
        affiliationDao.selectAffiliation(userId, organization),
     //   challengeDao.selectChallenge(challengeId)

    ]);

    const caculateDepositResult = await makeChallengeUserDeposit(challengeAllData);

    // if (!challengeAllData[0]) {

    //     return await userChallengeDao.insertChallenge(
    //         userAffiliation.affiliation_id,
    //         challengeId,
    //         caculateDepositResult!.calculatedDeposit
    //     );

    // }


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



const signUserOrganizationAndChallenge = async (
    userId: number,
    organization: string,
    challengeId: number
) => {

    let [affiliatedConfirmation, challengedConfirmation] = await Promise.all([

        checkOrganization(organization, userId),
        checkChallenge(organization, userId, challengeId)

    ]);

    return {

        affiliatedConfirmation: affiliatedConfirmation,
        challengedConfirmation: challengedConfirmation

    };




}



export default {
    enrollOrganization,
    enrollChallenge,
    selectOrganizationChallengeId,
    checkNickname,
    signUserOrganizationAndChallenge
}
