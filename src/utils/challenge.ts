import { challengeDao, challengeDayDao, userTemplateDao } from '../dao/index.js';
import { WriteTemplete } from '../interfaces/challenge.interface.js';
import { SelectTemplateContent } from '../interfaces/userChallenge.interface.js';


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
        complete = true

    } else {
        complete = false
    }


    return {
        challengeStatus: complete
    }

}

const calculateChallengeSuccessCount = async (
    affiliationId: number,
    challengeId: number

) => {

    const challengeSuccessCountData = await userTemplateDao.selectSuccessChallenge(affiliationId, challengeId);
    let count = 0
    for (let i = 0; i < challengeSuccessCountData.length; i++) {

        if (!await challengeDayDao.signChallengeDay(challengeId, challengeSuccessCountData[i].finished_at!)) {
            continue;
        }
        count++


    }

    return count
}

const signTodayTemplateStatusCalculation = async (
    affiliationId: number,
    challengeId: number

) => {

    if (!await userTemplateDao.signTodayTemplate(affiliationId, challengeId)) {

        return {
            todayTemplateStatus: false
        }
    }
    return {
        todayTemplateStatus: true

    }
}


const sortUserTemplate = (
    userTemplates: SelectTemplateContent[]
) => {
    const sortedUserTemplate = [];

    const uniqueUserTemplateIds = Array.from(new Set(userTemplates.map((q) => q.user_templete_id)));

    for (const userTemplateId of uniqueUserTemplateIds) {
        const filteredQuestions = userTemplates.filter((q) => q.user_templete_id === userTemplateId);
        sortedUserTemplate.push(filteredQuestions);
    }

    return sortedUserTemplate;
}



const signUserChallengeComplete = async (
    challengeId: number,
    date: string
) => {
   
    let complete = true;
    if (new Date(date).setHours(0, 0, 0, 0).toLocaleString() !== new Date().setHours(0, 0, 0, 0).toLocaleString()) {

        complete = false;

    }
    if (!await challengeDayDao.signChallengeDay(challengeId, new Date(date))) {

        complete = false;

    }

    return complete;

}


const changeUserTemplateType = (
    writeTempletes: WriteTemplete[], userTempleteId: number
) => {
    return writeTempletes.map(writeTemplete => ({
        question_id: writeTemplete.question_id,
        content: writeTemplete.content,
        visibility: writeTemplete.visibility,
        user_templete_id: userTempleteId,

    }));
}


export {
    calculateOverlapCount,
    signChallengeComplete,
    calculateChallengeSuccessCount,
    signTodayTemplateStatusCalculation,
    sortUserTemplate,
    signUserChallengeComplete,
    changeUserTemplateType
}