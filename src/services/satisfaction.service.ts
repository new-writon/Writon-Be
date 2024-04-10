
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import satisFactionDao from '../dao/satisFaction.dao.js';



const selectSatisfactionQuestion = async (
  challengeId: number
 ) => {
  console.log(await satisFactionDao.selectChallengeSatisFactionQuestion(challengeId));

  return await satisFactionDao.selectChallengeSatisFactionQuestion(challengeId);

}

export default {

  selectSatisfactionQuestion
  
  }