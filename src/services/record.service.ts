import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userTemplateDao } from '../dao/index.js';

import { calculateChallengeSuccessCount, calculateOverlapCount, signChallengeComplete, signTodayTemplateStatusCalculation, sortUserTemplate } from '../utils/challenge.js';
import { sortCallendarDateBadge } from '../utils/record.js';

const presentSituation = async (
  userId: number,
  organization: string,
  challengeId: number

) => {

  const affiliation = await affiliationDao.selectAffiliation(userId, organization);

  const [nickname, overlapPeriod, challengeOverlapCount, challengeSuccessCount, overlapDeposit] = await Promise.all([

    affiliationDao.selectNickname(affiliation.affiliation_id),
    challengeDao.selectOverlapPeriod(challengeId),
    calculateOverlapCount(challengeId),
    calculateChallengeSuccessCount(affiliation.affiliation_id, challengeId),
    userChallengeDao.selectUserChallenge(affiliation.affiliation_id, challengeId)

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
  organization: string,
  challengeId: number
) => {

  const affiliation = await affiliationDao.selectAffiliation(userId, organization);

  return await signTodayTemplateStatusCalculation(affiliation.affiliation_id, challengeId);
}

const selectCalendarSituation = async (
  userId: number,
  challengeId: number,
  organization: string,
  yearAndMonth: Date
) => {


  const [affiliation, challengeDay] = await Promise.all([

    affiliationDao.selectAffiliation(userId, organization),
    challengeDayDao.selectChallengeDay(challengeId)

  ])

  const userTemplateDay = await userTemplateDao.selectUserTemplateDay(affiliation.affiliation_id, challengeId, yearAndMonth);

  return sortCallendarDateBadge(challengeDay, userTemplateDay)

}




const selectMyTemplate = async (
  userId: number,
  challengeId: number,
  organization: string,
  yearAndMonth: Date
) => {

  const affiliation = await affiliationDao.selectAffiliation(userId, organization);

  const myTemplateData = sortUserTemplate(
    await userChallengeDao.selectTemplateContent(affiliation.affiliation_id, challengeId, yearAndMonth)
  );

  console.log(myTemplateData)


  return myTemplateData;

}


export default {

  presentSituation,
  // selectChallenge,
  signChallengeStatus,
  signTodayTemplateStatus,
  selectCalendarSituation,
  selectMyTemplate


}

