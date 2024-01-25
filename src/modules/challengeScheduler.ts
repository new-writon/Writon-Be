import schedule from 'node-schedule';

import { challengeDao } from '../dao/index.js';
import { ChallengeAllInformation, ChallengeAllInformationCustom } from '../interfaces/challenge.interface.js';


export const challengeDepositCalculateScheduler =  () => {
 
    schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

      const challegeData = await challengeDao.selectAllChallengeInformation();


      const targetCount = 2;

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
      
      console.log(transformedData['1'].deductions);

    })
}




  
//   // 데이터를 challenge_id로 그룹화
//   const groupedData = data.reduce((acc, item) => {
//     const key = item.challenge_id;
//     if (!acc[key]) {
//       acc[key] = {
//         challenge_id: item.challenge_id,
//         deposit: item.deposit,
//         challengeDayCount: item.challengeDayCount,
//         deductions: []
//       };
//     }
  
//     // count에 따라 deduction_rate 구간 나타내기
//     const deductionRange = Math.floor(item.count / 3) * 10;
//     acc[key].deductions.push({ count: item.count, deduction_rate: deductionRange });
  
//     return acc;
//   }, {});
  
//   // 결과 출력
//   const result = Object.values(groupedData);
//   console.log(result);



// const data = [
//   {
//     challenge_id: 1,
//     deposit: 25000,
//     challengeDayCount: '3',
//     deductions: [
//       { startcount: 0, endcount: 3, deduction_rate: 10 },
//       { startcount: 4, endcount: 6, deduction_rate: 20 },
//       { startcount: 7, endcount: 9, deduction_rate: 30 }
//     ]
//   },
//   // ... (다른 challenge_id에 대한 데이터)
// ];