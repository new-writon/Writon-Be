import schedule from 'node-schedule';

import { challengeDao, userChallengeDao } from '../dao/index.js';
import { ChallengeAllInformation, ChallengeAllInformationCustom } from '../interfaces/challenge.interface.js';


export const challengeDepositCalculateScheduler = async () => {

  // schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

  const challengeData = await challengeDao.selectAllChallengeInformation();

  const sortedChallengeData = sortChallengeData(challengeData);

  const challengeIdKeys = Object.keys(sortedChallengeData);

  for (const challengeIdKey of challengeIdKeys) {

    const userChallengeSuccessData = await userChallengeDao.selectChallengeSuccessCount(Number(challengeIdKey))

    const userDepositInformation = [];

    for (let i = 0; i < userChallengeSuccessData.length; i++) {

      const caculateDepositResult = calculateDeposit(
        sortedChallengeData,
        userChallengeSuccessData[i].count,
        userChallengeSuccessData[i].user_challenge_id,
        Number(challengeIdKey)
      );

      userDepositInformation.push(caculateDepositResult!)

    }

    await userChallengeDao.userDepositUpdate(userDepositInformation)

  }

  console.log("스케줄링 완료")
  // })


}


const calculateDeposit = (
  sortedChallengeData: ChallengeAllInformationCustom,
  successCount: number,
  userChallengeId: number,
  key: number

) => {

  const failCount = Number(sortedChallengeData[key].challengeDayCount) - successCount;

  const targetDeduction = sortedChallengeData[key].deductions.find(({ start_count, end_count }) => failCount >= start_count && failCount <= end_count);

  if (targetDeduction) {

    const { deduction_amount } = targetDeduction;

    return {

      userChallengeId: userChallengeId,
      calculatedDeposit: Math.floor(sortedChallengeData[key].deposit - deduction_amount)

    }
  } else {

    return {

      userChallengeId: userChallengeId,
      calculatedDeposit: Math.floor(sortedChallengeData[key].deposit)

    }
  }

}

const calculateStartUserChallengeDeposit = (
  sortedChallengeData: ChallengeAllInformationCustom,
  successCount: number,
  key: number

) => {

  const failCount = Number(sortedChallengeData[key].challengeDayCount) - successCount;

  const targetDeduction = sortedChallengeData[key].deductions.find(({ start_count, end_count }) => failCount >= start_count && failCount <= end_count);

  if (targetDeduction) {

    const { deduction_amount } = targetDeduction;

    return {

      calculatedDeposit: Math.floor(sortedChallengeData[key].deposit - deduction_amount)

    }
  } else {

    return {
      calculatedDeposit: Math.floor(sortedChallengeData[key].deposit)

    }
  }

}

const sortChallengeData = (
  challengeData: ChallengeAllInformation[]
) => {

  const sortedChallengeData = challengeData.reduce((acc, item) => {
    const { challenge_id, deposit, challengeDayCount } = item;

    if (!acc[challenge_id]) {
      acc[challenge_id] = {
        challenge_id,
        deposit,
        challengeDayCount,
        deductions: []
      };
    }

    acc[challenge_id].deductions.push({
      start_count: item.start_count,
      end_count: item.end_count,
      deduction_amount: item.deduction_amount
    });

    return acc;
  }, {} as ChallengeAllInformationCustom);

  return sortedChallengeData

}


export {
  sortChallengeData,
  calculateDeposit,
  calculateStartUserChallengeDeposit
}



