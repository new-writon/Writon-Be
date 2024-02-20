
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, commentDao, likeDao, userChallengeDao, userDao, userTemplateDao } from '../dao/index.js';



const signReviewStatus = async (
    userId: number,
    organization: string,
    challengeId: number
) => {

    const userChallengeData = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);

    return {
        review: userChallengeData.review
    }

}


const editReviewStatus = async (
    userId: number,
    organization: string,
    challengeId: number

) => {

    return await userChallengeDao.updateUserChallengeReview(userId, organization, challengeId)

}


const selectChallengeReivewData = async (
    userId: number,
    organization: string,
    challengeId: number
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    const [ nickname, challengeOverlapCount, challengeSuccessCount, overlapDeposit, challengeData ] = await Promise.all([

        affiliationDao.selectNickname(affiliation.affiliation_id),
        challengeDayDao.selectOverlapCount(challengeId),
        userTemplateDao.selectSuccessChallengeCount(affiliation.affiliation_id, challengeId),
        userChallengeDao.selectUserChallengeDeposit(affiliation.affiliation_id, challengeId),
        challengeDao.selectChallenge(challengeId)

    ]);


    return {

        nickname: nickname?.nickname!,
        organization: organization,
        challenge: challengeData.name,
        challengeOverlapCount: challengeOverlapCount,
        challengeSuccessCount: challengeSuccessCount,
        overlapDeposit: overlapDeposit,
        challengeDeposit: challengeData.deposit,
        reviewUrl: challengeData.review_url
    }


}

export default {

    signReviewStatus,
    editReviewStatus,
    selectChallengeReivewData

}


