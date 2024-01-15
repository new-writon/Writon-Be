import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService } from '../services/index.js'




const presentSituation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.presentSituation(req.decoded!.id, req.params.challengeId));

});


const selectChallenge = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectChallenge(req.decoded?.id, req.query.organization as string));

});



const signChallengeStatus = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signChallengeStatus(req.params.challengeId));

});


const signTodayTemplateStatus = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signTodayTemplateStatus(req.decoded?.id, req.params.challengeId));

});


const selectCalendarSituation  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectCalendarSituation(req.decoded?.id, req.params.challengeId, req.params.month));

});



export default {

    presentSituation,
    selectChallenge,
    signChallengeStatus,
    signTodayTemplateStatus,
    selectCalendarSituation
}
