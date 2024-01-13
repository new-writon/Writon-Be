import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, organizationDao } from '../dao/index.js';
import { PresentSituation, SelectAffiliationsId } from '../interfaces/record.interface.js';
import { calculateOverlapCount, signChallengeComplete } from '../utils/challenge.js';

const presentSituation = async (
  challengeId: number,
  userId: number
) => {


  // 닉네임
  const nickname = await affiliationDao.selectNickname(challengeId, userId);
  console.log(nickname?.nickname)


  // 남은 기간
  const overlapPeriod = await challengeDao.selectOverlapPeriod(challengeId);
  console.log(overlapPeriod)


  // 전체 실천 횟수
  const overlapCount = await calculateOverlapCount(challengeId);
  console.log(overlapCount)



  // 성공 챌린지 횟수



  // 남은 보증금


  // 챌린지 완료 여부
  const challengeComplete = await signChallengeComplete(challengeId);
  console.log(challengeComplete);






  return {
    nickname: nickname?.nickname!



  }

}




const selectChallenge = async (
  userId: number,
  organization: string
) => {


  const challengeId = await challengeDao.selectChallengeId(organization, userId);

  console.log(challengeId)

  return {
    challengeId: challengeId
  }


}





export default {

  presentSituation,
  selectChallenge

}

