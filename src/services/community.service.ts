
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import { sortCompanyPublic, sortParticipantInformation } from '../utils/community.js';
import { affiliationDao, challengeDayDao, commentDao, userChallengeDao, userTemplateDao } from '../dao/index.js';
import { sortDateUserTemplate, sortUserTemplate } from '../utils/challenge.js';



const selectParticipantInformation = async (
    userId: number,
    challengeId: number
) => {

    const [participantData, challengeParticipantCount, challengeOverlapPeriod] = await Promise.all([

        challengeDao.selectParticipantInformation(userId, challengeId),
        challengeDao.challengeParticipantCount(challengeId),
        challengeDao.selectOverlapPeriod(challengeId)
    ])

    return {
        challengeOverlapPeriod: challengeOverlapPeriod,
        challengeParticipantCount: Number(challengeParticipantCount),
        participantData: sortParticipantInformation(participantData)
    }
}

const selectMyParticipantInformation = async (
    userId: number,
    challengeId: number
) => {

    const myParticipantData = await challengeDao.selectMyParticipantInformation(userId, challengeId);

    return (sortParticipantInformation(myParticipantData))[0]
}


const selectDateTemplate = async (
    userId: number,
    challengeId: number,
    date: string,
    organization: string
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    console.log(affiliation)


    const [challengeCompleteCount, challengeDateTemplateData] = await Promise.all([
        userTemplateDao.selectUserCompleteCount(challengeId, date),
        userChallengeDao.selectDateTemplateContent(affiliation.affiliation_id, challengeId, date)
    ])

    const templateData = sortDateUserTemplate(
        sortCompanyPublic(challengeDateTemplateData)
    );

    return {
        challengeCompleteCount: Number(challengeCompleteCount),
        templateData: templateData
    }
}



const writeCheeringPhrase = async (
    userId: number,
    organization: string,
    challengeId: number,
    content: string
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    await challengeDao.updateCheeringPhrase(affiliation.affiliation_id, challengeId, content);

}


const selectChallengeDate = async (
    challengeId: number,
  
) => {

    const challengeDateData = await challengeDayDao.selectChallengeDate(challengeId)

    return challengeDateData.map(data => data.day);


}

const selectComment = async (
    userId: number,
    userTemplateId: number,
  
) => {

    console.log(await commentDao.selectComment(userId, userTemplateId))

    return 
}




export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeCheeringPhrase,
    selectChallengeDate,
    selectComment

}

