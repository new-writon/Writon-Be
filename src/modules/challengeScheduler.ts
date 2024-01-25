import schedule from 'node-schedule';

import { challengeDao } from '../dao/index.js';
import { ChallengeAllInformation, ChallengeAllInformationCustom } from '../interfaces/challenge.interface.js';


export const challengeDepositCalculateScheduler = () => {

  schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

    const challegeData = await challengeDao.selectAllChallengeInformation();


    const targetCount = 7;

    const transformedData: ChallengeAllInformationCustom = challegeData.reduce((acc, item) => {
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

  
    const targetDeduction = transformedData['1'].deductions.find(({ start_count, end_count }) => targetCount >= start_count && targetCount <= end_count);

    if (targetDeduction) {
      const { start_count, end_count, deduction_rate } = targetDeduction;
      console.log(`Target Count: ${targetCount}, Deduction Rate: ${deduction_rate}, Range: ${start_count} ~ ${end_count}`);
    } else {
      console.log(`No matching range for Target Count: ${targetCount}`);
    }




  })
}





