import schedule from 'node-schedule';

import { challengeDao } from '../dao/index.js';


export const challengeDepositCalculateScheduler =  () => {
 
    schedule.scheduleJob('*/10 * * * * *', async function () {       // UTC시간 기준 9시간 차이로 새벽 12시 의미

        console.log(await challengeDao.selectAllChallengeInformation())
        

    })
}




// const groupedData = data.reduce((acc, item) => {
//     const key = item.challenge_id;
  
//     // 이미 해당 challenge_id가 있는지 확인
//     if (!acc[key]) {
//       acc[key] = [];
//     }
  
//     // 데이터 추가
//     acc[key].push(item);
  
//     return acc;
//   }, {});


// {
//     1: [
//       {
//         challenge_id: 1,
//         deposit: 25000,
//         day: '2024-01-12T00:00:00.000Z',
//         count: 3,
//         deduction_rate: 10
//       },
//       {
//         challenge_id: 1,
//         deposit: 25000,
//         day: '2024-01-12T00:00:00.000Z',
//         count: 6,
//         deduction_rate: 20
//       },
//       // ... (같은 challenge_id에 해당하는 다른 데이터들)
//     ],
//     // 다른 challenge_id에 해당하는 데이터들도 동일한 방식으로 저장됨
//     // 예를 들어, 2: [ { ... }, { ... }, ... ]
//   }





// const groupedData = data.reduce((acc, item) => {
//     const challengeId = item.challenge_id;
//     const day = item.day;
//     const count = item.count;
  
//     // challenge_id 그룹이 없다면 생성
//     if (!acc[challengeId]) {
//       acc[challengeId] = {};
//     }
  
//     // day 그룹이 없다면 생성
//     if (!acc[challengeId][day]) {
//       acc[challengeId][day] = {};
//     }
  
//     // count 그룹이 없다면 생성
//     if (!acc[challengeId][day][count]) {
//       acc[challengeId][day][count] = [];
//     }
  
//     // 데이터 추가
//     acc[challengeId][day][count].push(item);
  
//     return acc;
//   }, {});



// {
//     1: {
//       '2024-01-12T00:00:00.000Z': {
//         3: [
//           {
//             challenge_id: 1,
//             deposit: 25000,
//             day: '2024-01-12T00:00:00.000Z',
//             count: 3,
//             deduction_rate: 10
//           }
//           // ... (같은 day와 count에 해당하는 다른 데이터들)
//         ],
//         6: [
//           {
//             challenge_id: 1,
//             deposit: 25000,
//             day: '2024-01-12T00:00:00.000Z',
//             count: 6,
//             deduction_rate: 20
//           }
//           // ... (같은 day와 count에 해당하는 다른 데이터들)
//         ]
//       },
//       '2024-01-15T00:00:00.000Z': {
//         // ... (같은 방식으로 그룹화)
//       },
//       '2024-01-03T00:00:00.000Z': {
//         // ... (같은 방식으로 그룹화)
//       },
//       '2024-01-19T00:00:00.000Z': {
//         // ... (같은 방식으로 그룹화)
//       }
//     },
//     // 다른 challenge_id에 해당하는 데이터들도 동일한 방식으로 저장됨
//     // 예를 들어, 2: { ... }, 3: { ... }, ...
//   }