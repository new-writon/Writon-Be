
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDayDao, commentDao, likeDao, userChallengeDao, userTemplateDao } from '../dao/index.js';



const signReviewStatus = async (
    userId: number,
    organization: string,
    challengeId: number
) => {

    const userChallengeData = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);

    return {
        review : userChallengeData.review
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
    
    
    }

export default {

    signReviewStatus, 
    editReviewStatus,
    selectChallengeReivewData

}


