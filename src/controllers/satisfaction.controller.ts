import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { satisfactionService } from '../services/index.js'



const selectSatisfactionQuestion  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await satisfactionService.selectSatisfactionQuestion(req.params.challengeId));

});


const insertObjectiveAnswer  = catchAsync(async (req, res) => {

    const { challengeId, organization, satisfationAnswer} = req.body;

    res.status(httpStatus.OK).send(await satisfactionService.insertObjectiveAnswer(
        req.decoded?.id,
        challengeId,
        organization,
        satisfationAnswer
    ));

});


const insertSubjectiveAnswer  = catchAsync(async (req, res) => {

    const { challengeId, organization, satisfationAnswer} = req.body;

    res.status(httpStatus.OK).send(await satisfactionService.insertSubjectiveAnswer(
        req.decoded?.id,
        challengeId,
        organization,
        satisfationAnswer
    ));

});


export default {
    selectSatisfactionQuestion,
    insertSubjectiveAnswer,
    insertObjectiveAnswer
}
