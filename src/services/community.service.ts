
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import challengeDao from '../dao/challenge.dao.js';
import { sortParticipantInformation } from '../utils/community.js';



const selectParticipantInformation = async (
    userId: number,
    challengeId: number
  ) => {

    const participantData = await challengeDao.selectParticipantInformation(userId, challengeId);
  
    return sortParticipantInformation(participantData)
  }

  
  const selectDateTemplate = async (
    challengeId: number
  ) => {
  
    return
  }

  const selectMyParticipantInformation = async (
  //  challengeId: number
  ) => {
  
    return
  }

  
  const writeParticipantInformation = async (
   // challengeId: number
  ) => {
  
    return 
  }
  


export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeParticipantInformation
 
}

