import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userTemplateDao } from '../dao/index.js';

import { calculateChallengeSuccessCount, calculateOverlapCount, signChallengeComplete } from '../utils/challenge.js';

const presentSituation = async (
  userId: number,
  challengeId: number

) => {

  const [nickname, overlapPeriod, challengeOverlapCount, challengeSuccessCount, overlapDeposit] = await Promise.all([

    affiliationDao.selectNickname(challengeId, userId),
    challengeDao.selectOverlapPeriod(challengeId),
    calculateOverlapCount(challengeId),
    calculateChallengeSuccessCount(userId, challengeId),
    userChallengeDao.selectUserChallenge(userId, challengeId)

  ])


  return {
    nickname: nickname?.nickname!,
    overlapPeriod: overlapPeriod,
    challengeOverlapCount: challengeOverlapCount,
    challengeSuccessCount:  challengeSuccessCount,
    overlapDeposit: overlapDeposit
  }

}

const signChallengeStatus = async (
  challengeId: number
) => {

   return await signChallengeComplete(challengeId);
}





const selectChallenge = async (
  userId: number,
  organization: string
) => {


  const challengeId = await challengeDao.selectChallengeId(organization, userId);

  return {
    challengeId: challengeId
  }


}





export default {

  presentSituation,
  selectChallenge,
  signChallengeStatus

}

