import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userDao, userTemplateDao } from '../dao/index.js';

import { signChallengeComplete, signTodayTemplateStatusCalculation, sortUserTemplate } from '../utils/challenge.js';
import { sortCallendarDateBadge } from '../utils/record.js';
import { challengeDepositCalculateScheduler } from '../modules/challengeScheduler.js';



const scheduleChallenge = async ( ) => {

  return await challengeDepositCalculateScheduler()
}



export default {

    scheduleChallenge

}

