import { challengeDao, challengeDayDao, userTemplateDao } from '../dao/index.js';


const calculateOverlapCount = async (
    challengeId: number
) => {

    let count = 0;

    const overlapCount = await challengeDao.selectOverlapCount(challengeId);

    for (let i = 0; i < overlapCount.length; i++) {

        if (!await challengeDao.selectPeriodDate(overlapCount[i].day)) {
            continue;
        }

        count++;
    }

    return count;

}
const signChallengeComplete = async (
    challengeId: number
) => {

    const challengeComplete = await challengeDao.signChallengeComplete(challengeId);

    let complete;

    if (!challengeComplete) {
        complete = false

    } else {
        complete = true
    }


    return {
        challengeStatus: complete
    }

}

const calculateChallengeSuccessCount = async (
    userId: number,
    challengeId: number

) => {

    const challengeSuccessCountData = await userTemplateDao.selectSuccessChallenge(userId, challengeId);
    let count = 0
    for (let i = 0; i < challengeSuccessCountData.length; i++) {

        if (!await challengeDayDao.signChallengeDay(challengeSuccessCountData[i].finished_at!)) {
            continue;
        }
        count++


    }

    return count
}

const signTodayTemplateStatusCalculation = async (
    userId: number,
    challengeId: number

) => {

    if (!await userTemplateDao.signTodayTemplate(userId, challengeId)) {

        return {
            todayTemplateStatus: false
        }

    }

    return {
        todayTemplateStatus: true

    }
}


export {
    calculateOverlapCount,
    signChallengeComplete,
    calculateChallengeSuccessCount,
    signTodayTemplateStatusCalculation
}