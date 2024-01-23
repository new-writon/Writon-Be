import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userDao, userTemplateDao } from '../dao/index.js';

import { signChallengeComplete, signTodayTemplateStatusCalculation, sortUserTemplate } from '../utils/challenge.js';
import { sortCallendarDateBadge } from '../utils/record.js';

const presentSituation = async (
  userId: number,
  organization: string,
  challengeId: number

) => {

  const affiliation = await affiliationDao.selectAffiliation(userId, organization);

  const [nickname, userData, overlapPeriod, challengeOverlapCount, challengeSuccessCount, overlapDeposit, challengeData] = await Promise.all([

    affiliationDao.selectNickname(affiliation.affiliation_id),
    userDao.selectUser(userId),
    challengeDao.selectOverlapPeriod(challengeId),
    challengeDao.selectOverlapCount(challengeId),
    userTemplateDao.selectSuccessChallengeCount(affiliation.affiliation_id, challengeId),
    userChallengeDao.selectUserChallengeDeposit(affiliation.affiliation_id, challengeId),
    challengeDao.selectChallenge(challengeId)

  ]);

  return {
    nickname: nickname?.nickname!,
    userProfile: userData.profile,
    overlapPeriod: overlapPeriod,
    challengeOverlapCount: challengeOverlapCount,
    challengeSuccessCount: challengeSuccessCount,
    overlapDeposit: overlapDeposit,
    challengeDeposit: challengeData.deposit
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


  return myTemplateData;

}


const signChallengeDay = async (
  challengeId: number,
  date: Date
) => {

  const challengeDay = await challengeDayDao.signChallengeDay(challengeId, date);

  if (!challengeDay) {

    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Today is not the day of the challenge");

  }

  return;
}



export default {

  presentSituation,
  // selectChallenge,
  signChallengeStatus,
  signTodayTemplateStatus,
  selectCalendarSituation,
  selectMyTemplate,
  signChallengeDay


}

