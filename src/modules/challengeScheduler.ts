import schedule from 'node-schedule';

import { challengeDao, userChallengeDao } from '../dao/index.js';
import { ChallengeAllInformation, ChallengeAllInformationCustom } from '../interfaces/challenge.interface.js';


export const challengeDepositCalculateScheduler = () => {

  schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

    const challengeData = await challengeDao.selectAllChallengeInformation();



    const targetCount = 7;

    const sortedChallengeData = sortChallengeData(challengeData);

    const challengeIdKeys = Object.keys(sortedChallengeData);

    for (const challengeIdKey of challengeIdKeys) {
      const value = sortedChallengeData[challengeIdKey];

      const userChallengeIds = await userChallengeDao.selectUserChallengeId(Number(challengeIdKey))



      for(let i = 0; i < userChallengeIds.length; i++){

        const caculateDepositResult = calculateDeposit(sortedChallengeData, userChallengeIds[i].user_challenge_id, Number(challengeIdKey));

        console.log(caculateDepositResult)


      }
 
    }

 





  })
}


const calculateDeposit = (
  sortedChallengeData: ChallengeAllInformationCustom,
  targetCount: number,
  key: number

) => {
  const targetDeduction = sortedChallengeData[key].deductions.find(({ start_count, end_count }) => targetCount >= start_count && targetCount <= end_count);

  if (targetDeduction) {
    const { start_count, end_count, deduction_rate } = targetDeduction;
    // console.log(`Target Count: ${targetCount}, Deduction Rate: ${deduction_rate}, Range: ${start_count} ~ ${end_count}`);
    // console.log(sortedChallengeData[key].deposit * (100 - deduction_rate)/100)

    return sortedChallengeData[key].deposit * (100 - deduction_rate)/100;
  } else {
    console.log(`No matching range for Target Count: ${targetCount}`);
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
      deduction_rate: item.deduction_rate
    });

    return acc;
  }, {} as ChallengeAllInformationCustom);

  return sortedChallengeData

}




