
import prisma from '../client.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import questionDao from '../dao/question.dao.js';


const selectBasicQuestion = async (
    challengeId: number
) => {

    return await questionDao.selectBasicQuestion(challengeId);

}


const selectSpecialQuestion = async (
    challengeId: number
) => {

    return await questionDao.selectSpecialQuestion(challengeId);
    
}



export default {
    selectBasicQuestion,
    selectSpecialQuestion
}


