import { Affiliation } from '@prisma/client';
import { challengeDao, challengeDayDao, userChallengeDao, userTemplateDao } from '../dao/index.js';
import { ChallengeAllInformation, WriteTemplete } from '../interfaces/challenge.interface.js';
import { SelectTemplateContent, SelectDateTemplateContent } from '../interfaces/userChallenge.interface.js';
import { calculateDeposit, calculateStartUserChallengeDeposit, sortChallengeData } from '../modules/challengeScheduler.js';



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

const sortDateUserTemplate = (
    userTemplates: SelectDateTemplateContent[]
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




const makeChallengeUserDeposit = async (
    challengeData: ChallengeAllInformation[],
) => {

    const sortedChallengeData = sortChallengeData(challengeData);

    const challengeIdKeys = Object.keys(sortedChallengeData);
    
    for (const challengeIdKey of challengeIdKeys) {

        return calculateStartUserChallengeDeposit(
            sortedChallengeData,
            0,
            Number(challengeIdKey)
        );
    }

}





const checkChallenge = async (
    organization: string,
    userId: number,
    challengeId: number
): Promise<boolean | null> => {

    let challengedConfirmation;

    const checkChallenge = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);


    if (!checkChallenge) {
        challengedConfirmation = false;

    } else {
        challengedConfirmation = true;
    }

    return challengedConfirmation;
}





export {

    signChallengeComplete,
    signTodayTemplateStatusCalculation,
    sortUserTemplate,
    signUserChallengeComplete,
    changeUserTemplateType,
    sortDateUserTemplate,
    makeChallengeUserDeposit,
    checkChallenge

}