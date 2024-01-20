import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { startService } from '../services/index.js'



const enrollOrganization = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await startService.enrollOrganization(
        req.decoded?.id,
        req.body.organization,
        req.body.nickname,
        req.body.job,
        req.body.jobIntroduce,
        req.body.hireDate,
        req.body.company,
        req.body.companyPublic

    ));

});



const enrollChallenge = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await startService.enrollChallenge(
        req.decoded?.id,
        req.body.organization,
        req.body.challengeId
    ));

});


export default {
    enrollOrganization,
    enrollChallenge
}