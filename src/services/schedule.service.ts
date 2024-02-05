import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { challengeDepositCalculateScheduler } from '../modules/challengeScheduler.js';



const scheduleChallenge = async ( ) => {

  return await challengeDepositCalculateScheduler()
}



export default {

    scheduleChallenge

}

