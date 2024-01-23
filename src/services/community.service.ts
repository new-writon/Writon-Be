
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import { sortCompanyPublic, sortParticipantInformation } from '../utils/community.js';
import { affiliationDao, challengeDayDao, commentDao, likeDao, userChallengeDao, userTemplateDao } from '../dao/index.js';
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

    return sortCompanyPublic(await commentDao.selectComment(userId, userTemplateId))
}


const addLike = async (
    userId: number,
    userTemplateId: number,
    organization: string
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    await likeDao.insertLike(affiliation.affiliation_id, userTemplateId);

    return {

        likeCount: Number(await likeDao.selectLikeCount(userTemplateId))

    }
}


const cancelLike = async (
    userId: number,
    userTemplateId: number,
    organization: string
  
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    await likeDao.deleteLike(affiliation.affiliation_id, userTemplateId);

    return {

        likeCount: Number(await likeDao.selectLikeCount(userTemplateId))

    }
}


const selectUserTemplateLikeCount = async (
    userTemplateId: number
) => {

    return {

        likeCount: Number(await likeDao.selectLikeCount(userTemplateId))

    }
}


const addComment = async (
    userId: number,
    organization: string,
    userTemplateId: number,
    content: string,
    commentGroup: number
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    await commentDao.insertComment(affiliation.affiliation_id, content, userTemplateId, commentGroup);

    return  sortCompanyPublic(await commentDao.selectComment(userId, userTemplateId))

}


const updateComment = async (
    userId: number,
    organization: string,
    content: string,
    commentId: number,
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    const updateCommentData = await commentDao.updateComment(affiliation.affiliation_id, content, commentId);

    return sortCompanyPublic(await commentDao.selectComment(userId, updateCommentData.user_templete_id))
}


const deleteComment = async (
    userId: number,
    organization: string,
    commentId: number,
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    const deleteCommentData = await commentDao.deleteComment(affiliation.affiliation_id, commentId);

    console.log(deleteCommentData)


    return sortCompanyPublic(await commentDao.selectComment(userId, deleteCommentData.user_templete_id))
}



export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeCheeringPhrase,
    selectChallengeDate,
    selectComment,
    addLike,
    cancelLike,
    selectUserTemplateLikeCount,
    addComment,
    updateComment,
    deleteComment

}

