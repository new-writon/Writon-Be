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



const updateReEngagement  = catchAsync(async (req, res) => {

    const { challengeId, organization, check} = req.body;

    res.status(httpStatus.OK).send(await satisfactionService.updateReEngagement(
        req.decoded?.id,
        challengeId,
        organization,
        check
    ));

});



const selectChallengeReEngagement  = catchAsync(async (req, res) => {

  

    res.status(httpStatus.OK).send(await satisfactionService.selectChallengeReEngagement(
        req.params.challengeId,
    ));

});


export default {
    selectSatisfactionQuestion,
    insertSubjectiveAnswer,
    insertObjectiveAnswer,
    updateReEngagement,
    selectChallengeReEngagement
}
