import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userTemplateDao } from '../dao/index.js';

import { calculateChallengeSuccessCount, calculateOverlapCount, signChallengeComplete, signTodayTemplateStatusCalculation } from '../utils/challenge.js';
import { sortCallendarDateBadge } from '../utils/record.js';

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
    challengeSuccessCount: challengeSuccessCount,
    overlapDeposit: overlapDeposit
  }

}

const signChallengeStatus = async (
  challengeId: number
) => {

  return await signChallengeComplete(challengeId);
}


const signTodayTemplateStatus = async (
  userId: number,
  challengeId: number
) => {

  return await signTodayTemplateStatusCalculation(userId, challengeId);
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

const selectCalendarSituation = async (
  userId: number,
  challengeId: number,
  yearAndMonth: Date
) => {

  const challengeDay = await challengeDayDao.selectChallengeDay(challengeId);

  const userTemplateDay = await userTemplateDao.selectUserTemplateDay(userId, challengeId, yearAndMonth);

  return  sortCallendarDateBadge(challengeDay, userTemplateDay)

}




export default {

  presentSituation,
  selectChallenge,
  signChallengeStatus,
  signTodayTemplateStatus,
  selectCalendarSituation


}

