import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService } from '../services/index.js'




const presentSituation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.presentSituation(req.decoded!.id, Number(req.params.challengeId) ));

});


const selectChallenge = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectChallenge(req.decoded?.id, req.query.organization as string));

});



const signChallengeStatus = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.signChallengeStatus(req.params.challengeId));

});





export default {

    presentSituation,
    selectChallenge,
    signChallengeStatus
}
