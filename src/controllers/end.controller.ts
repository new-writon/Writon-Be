import { createRequire } from 'module'
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { adminService, endService } from '../services/index.js';
const require = createRequire(import.meta.url)
require('dotenv').config();



const signReviewStatus = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send(await endService.signReviewStatus(req.decoded?.id, req.params.organization, req.params.challengeId));
});


const editReviewStatus = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send(await endService.editReviewStatus(req.decoded?.id, req.params.organization, req.params.challengeId));
});


const selectChallengeReivewData = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send(await endService.selectChallengeReivewData(req.decoded?.id, req.params.organization, req.params.challengeId));
});



export default {
    signReviewStatus, 
    editReviewStatus,
    selectChallengeReivewData
}














