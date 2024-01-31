import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService } from '../services/index.js'




const presentSituation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.presentSituation(req.decoded!.id, req.params.organization, req.params.challengeId));

});


// const selectChallenge = catchAsync(async (req, res) => {

//     res.status(httpStatus.OK).send(await recordService.selectChallenge(req.decoded?.id, req.query.organization as string));

// });



const signChallengeStatus = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signChallengeStatus(req.params.challengeId));

});


const signTodayTemplateStatus = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signTodayTemplateStatus(req.decoded?.id, req.params.organization, req.params.challengeId));

});


const selectCalendarSituation  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectCalendarSituation(req.decoded?.id, req.params.challengeId, req.params.organization));

});

const selectMyTemplate  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectMyTemplate(req.decoded?.id, req.params.challengeId, req.params.organization, req.params.month));

});

const signChallengeDay  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signChallengeDay(req.params.challengeId, req.params.date));

});


export default {

    presentSituation,
    //selectChallenge,
    signChallengeStatus,
    signTodayTemplateStatus,
    selectCalendarSituation,
    selectMyTemplate,
    signChallengeDay
}
