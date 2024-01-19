
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import { sortParticipantInformation } from '../utils/community.js';
import { affiliationDao } from '../dao/index.js';



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
    challengeId: number
) => {

    return
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




export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeCheeringPhrase

}

