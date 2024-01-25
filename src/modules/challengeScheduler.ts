import schedule from 'node-schedule';

import { challengeDao } from '../dao/index.js';
import { ChallengeAllInformation } from '../interfaces/challenge.interface.js';


export const challengeDepositCalculateScheduler =  () => {
 
    schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

      const challegeData = await challengeDao.selectAllChallengeInformation();

      console.log(challegeData)


      const targetCount = 2;

  // 데이터를 challenge_id로 그룹화
  // const groupedData: Record<number, ChallengeAllInformation[]>  = challegeData.reduce((acc:{}, item) => {
  //   const key = item.challenge_id;
  //   if (!acc[key]) {
  //     acc[key] = {
  //       challenge_id: item.challenge_id,
  //       deposit: item.deposit,
  //       challengeDayCount: item.challengeDayCount,
  //       deductions: []
  //     } 
  //   }
  
 
  //   return acc;
  // }, {});


  // console.log(groupedData)
  







      // 특정 count에 해당하는 deduction_rate 추출
    //   const result = challegeData.map(item => {
    //     if (item.deductions && Array.isArray(item.deductions)) {
    //         const targetDeduction = item.deductions.find(({ startcount, endcount }) => targetCount >= startcount && targetCount <= endcount);
         
    //       if (targetDeduction) {
    //         const calculatedDeduction = targetDeduction.deduction_rate;

    //         // deposit와 곱하기
    //         const calculatedResult = item.deposit * (calculatedDeduction / 100); // percentage로 변환
    //         return {
    //           challenge_id: item.challenge_id,
    //           deduction_rate: calculatedDeduction,
    //           calculatedResult: calculatedResult
    //         };
    //       }
    //     }
    //     return null;
    //   }).filter(Boolean);
      
    //   console.log(result);
    })
}



// const data = [
//     {
//       challenge_id: 1,
//       deposit: 25000,
//       challengeDayCount: '3',
//       count: 3,
//       deduction_rate: 10
//     },
//     {
//       challenge_id: 1,
//       deposit: 25000,
//       challengeDayCount: '3',
//       count: 6,
//       deduction_rate: 20
//     },
//     {
//       challenge_id: 1,
//       deposit: 25000,
//       challengeDayCount: '3',
//       count: 9,
//       deduction_rate: 30
//     }
//   ];
  
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