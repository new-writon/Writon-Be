import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { affiliationDao, challengeDao, challengeDayDao, userChallengeDao, userTemplateDao } from '../dao/index.js';

import { calculateChallengeSuccessCount, calculateOverlapCount, signChallengeComplete, signTodayTemplateStatusCalculation } from '../utils/challenge.js';

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
    challengeSuccessCount:  challengeSuccessCount,
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

  // // challengeId를 통해 작성 날짜를 조회
  // const challengeDay = await challengeDayDao.selectChallengeDay(challengeId);

  // // year_month 를 통해 해당 유저의 해당 챌린지 중 진행 템플릿 조회
  // const userTemplateDay = await userTemplateDao.selectUserTemplateDay(userId, challengeId, yearAndMonth);
  // console.log(challengeDay)
  // console.log(userTemplateDay)
  // const result = [];

  
  // for (const challengeDays of challengeDay!) {
  //   const customObject : any = {
  //     date: challengeDays.day
  //  };
  //   for (const userTemplateDays of userTemplateDay!) {
 
  
  //     console.log(challengeDays.day)
  //     console.log(userTemplateDays.finished_at)
  //     console.log(userTemplateDays.complete)
      

  //     if (isSameDate(challengeDays.day, userTemplateDays.finished_at!)) {
  //       console.log(isSameDate(challengeDays.day, userTemplateDays.finished_at!))
 
  //       if(userTemplateDays.complete){
  //         customObject["button"] = "Gold"
  //         result.push(customObject);
  //         console.log(result)
  //         console.log(2)
  //       }
  //       else{
  //         customObject["button"] = "Silver"
  //         result.push(customObject);
  //       }

  //       continue;

  //     }else if(isSameDate(challengeDays.day, new Date())){

  //       console.log(3333)

  //       customObject["button"] = "JjinPurple"
  //       result.push(customObject);

  //       continue;

  //     }else{
  //       console.log(2222)
  //       customObject["button"] = "rowPurple"
  //       result.push(customObject);
  //       continue;
  //     }
  //   }
  // }

  const challengeDay = await challengeDayDao.selectChallengeDay(challengeId);
const userTemplateDay = await userTemplateDao.selectUserTemplateDay(userId, challengeId, yearAndMonth);



const result = [];
console.log(new Date())

for (const challengeDays of challengeDay!) {
  const hasMatchingDate = userTemplateDay!.some(userTemplateDays =>
    isSameDate(challengeDays.day, userTemplateDays.finished_at!)
  );

  const customObject: any = {
    date: challengeDays.day,
  };

  if (hasMatchingDate) {
    const matchingUserTemplateDays = userTemplateDay!.filter(userTemplateDays =>
      isSameDate(challengeDays.day, userTemplateDays.finished_at!)
    );

    for (const matchingUserTemplateDay of matchingUserTemplateDays) {
      console.log(challengeDays.day);
      console.log(matchingUserTemplateDay.finished_at);
  

      if (matchingUserTemplateDay.complete) {
        customObject["button"] = "Gold";
      } else {
        customObject["button"] = "Silver";
      }

      result.push({ ...customObject }); // 새로운 객체를 추가하여 참조 문제를 피합니다.
    }
  } else if (isSameDate(challengeDays.day, new Date())) {

    console.log("sdsdsd")
   
    customObject["button"] = "JjinPurple";
    result.push({ ...customObject });
  } else {
   
    customObject["button"] = "rowPurple";
    result.push({ ...customObject });
  }
}

console.log(result);








}

// const createCustomObjects = (challengeDays: [], userTemplateDays:[]) => {
//   const result = [];

//   // 예제 조건: challengeDays와 userTemplateDays를 비교하고 적절한 CustomObject를 생성하여 result 배열에 추가
//   for (const challengeDay of challengeDays) {
//     for (const userTemplateDay of userTemplateDays) {
//       // 예제 조건: 날짜 비교 로직
//       if (challengeDay.day.getTime() === userTemplateDay.someDateProperty.getTime()) {
//         // 조건에 따라 CustomObject를 생성하여 result 배열에 추가
//         const customObject = {
//           // ... properties based on conditions
//         };
//         result.push(customObject);
//       }
//     }
//   }

//   return result;
// };

function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default {

  presentSituation,
  selectChallenge,
  signChallengeStatus,
  signTodayTemplateStatus,
  selectCalendarSituation
  

}

