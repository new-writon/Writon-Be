
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import { sortCompanyPublic, sortParticipantInformation } from '../utils/community.js';
import { affiliationDao, agoraDao, challengeDayDao, commentDao, likeDao, userChallengeDao, userTemplateDao } from '../dao/index.js';
import { sortDateUserTemplate, sortUserTemplate } from '../utils/challenge.js';
import { commentDataCustom } from '../utils/dataCustom.js';
import { getKoreanDateISOString } from '../modules/koreanTime.js';



const selectParticipantInformation = async (
    userId: number,
    challengeId: number
) => {


    const [participantData, challengeParticipantCount, challengeOverlapPeriod] = await Promise.all([

        userChallengeDao.selectParticipantInformation(userId, challengeId),
        userChallengeDao.challengeParticipantCount(challengeId),
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

    const myParticipantData = await userChallengeDao.selectMyParticipantInformation(userId, challengeId);

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

    await userChallengeDao.updateCheeringPhrase(affiliation.affiliation_id, challengeId, content);

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

    const commentData = sortCompanyPublic(await commentDao.selectComment(userId, userTemplateId));

    return commentDataCustom(commentData)
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

    const commentResponse = await commentDao.insertComment(affiliation.affiliation_id, content, userTemplateId, commentGroup);

    return  {
        comment_id: commentResponse.comment_id
    }

}


const updateComment = async (
    userId: number,
    organization: string,
    content: string,
    commentId: number,
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    const updateCommentData = await commentDao.updateComment(affiliation.affiliation_id, content, commentId);

//    return sortCompanyPublic(await commentDao.selectComment(userId, updateCommentData.user_templete_id))
}


const deleteComment = async (
    userId: number,
    organization: string,
    commentId: number,
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    const deleteCommentData = await commentDao.deleteComment(affiliation.affiliation_id, commentId);
    
 //   return sortCompanyPublic(await commentDao.selectComment(userId, deleteCommentData.user_templete_id))
}


const selectUniqueTemplate = async (
    userId: number,
    userTemplateId: number,
    organization: string,
    visibility: boolean
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    return sortCompanyPublic(await userTemplateDao.selectUniqueTemplate(affiliation.affiliation_id, userTemplateId, visibility));
}


const insertAgora = async (
    userId:number,
    challengeId: number,
    organization: string,
    agoraQuestion: string
) => {

    if((await agoraDao.selectAgora(userId, challengeId, new Date(getKoreanDateISOString()))).length >= 3){

        throw new ApiError(httpStatus.EXPECTATION_FAILED, "오늘 아고라 개수를 초과했습니다.");
      }

    const userChallengeData = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);

    return await agoraDao.insertAgora(challengeId, userChallengeData.user_challenge_id, agoraQuestion);
}





const insertAgoraComment = async (
    userId: number,
    agoraId: number,
    organization: string,
    agoraComment: string
) => {

    const affiliation = await affiliationDao.selectAffiliation(userId, organization);

    return await agoraDao.insertAgoraComment(agoraId, affiliation.affiliation_id, agoraComment);
}


const selectAgora = async (
    userId:number,
    challengeId:number,
    date: Date
) => {

    const agoraData = (await agoraDao.selectAgora(userId,challengeId, date)).map(e => ({
        agoraId: e.agora_id,
        question: e.question,
        participateCount: Number(e.participate_count),
        nickname: e.nickname,
        createdTime: e.created_time,
        profile: e.profile,
        myAgoraSign:e.myAgoraSign,
        createdDate:e.created_date
    }));

    return agoraData;

}


const selectAgoraComment = async (
    userId:number,
    agoraId: number
) => {

    return await agoraDao.selectAgoraComment(userId, agoraId);

}

const  signAgoraAdd = async (
    userId:number,
    challengeId:number,
    date:Date
) => {

    if((await agoraDao.selectAgora(userId, challengeId, date)).length >= 3){

        return {
            status: false
        }
      }

    return {
        status: true
    }

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
    deleteComment,
    selectUniqueTemplate,
    insertAgora,
    insertAgoraComment,
    selectAgora,
    selectAgoraComment,
    signAgoraAdd

}


