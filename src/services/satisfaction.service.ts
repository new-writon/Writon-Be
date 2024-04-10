
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import satisFactionDao from '../dao/satisFaction.dao.js';
import { ObjectiveAnswerRequest,  SubjectiveAnswerRequest } from '../interfaces/satisfaction.interface.js';
import userChallengeDao from '../dao/userChallenge.dao.js';



const selectSatisfactionQuestion = async (
  challengeId: number
 ) => {
  console.log(challengeId)

  return await satisFactionDao.selectChallengeSatisFactionQuestion(challengeId);

}


const insertObjectiveAnswer = async (
  userId: number,
  challengeId: number,
  organization: string,
  satisfationAnswer: Array<ObjectiveAnswerRequest>
 ) => {

  const userChallengeData = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);

  const changeType = changeObjectiveAnswerType(satisfationAnswer, userChallengeData.user_challenge_id)
  await satisFactionDao.insertManyObjectiveAnswer(changeType);

}


const insertSubjectiveAnswer = async (
  userId: number,
  challengeId: number,
  organization: string,
  satisfationAnswer: Array<SubjectiveAnswerRequest>
 ) => {

  const userChallengeData = await userChallengeDao.selectUserChallenge(userId, organization, challengeId);

  const changeType = changeSubjectiveAnswerType(satisfationAnswer, userChallengeData.user_challenge_id)

  await satisFactionDao.insertManySubjectiveAnswer(changeType);

}



const changeObjectiveAnswerType = 
(
  satisfationAnswer: Array<ObjectiveAnswerRequest>,
  userChallengeId: number
) => {

  return  satisfationAnswer.map( satisfationAnswer => ({
    satisfaction_id: satisfationAnswer.satisfactionId,
    score: satisfationAnswer.score,
    user_challenge_id: userChallengeId
}));
}



const changeSubjectiveAnswerType = 
(
  satisfationAnswer: Array<SubjectiveAnswerRequest>,
  userChallengeId: number
) => {

  return  satisfationAnswer.map( satisfationAnswer => ({
    satisfaction_id: satisfationAnswer.satisfactionId,
    answer: satisfationAnswer.answer,
    user_challenge_id: userChallengeId
}));
}

export default {

  selectSatisfactionQuestion,
  insertSubjectiveAnswer,
  insertObjectiveAnswer
  
  }