import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService } from '../services/index.js'




const presentSituation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.presentSituation(Number(req.params.challengeId), req.decoded!.id));

});


const selectChallenge = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectChallenge(req.decoded?.id, req.query.organization as string));

});






export default {

    presentSituation,
    selectChallenge
}
