import { createRequire } from 'module'
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { adminService } from '../services/index.js';
const require = createRequire(import.meta.url)
require('dotenv').config();



const signReviewStatus = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send();
});


const editReviewStatus = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send();
});


const selectChallengeReivewData = catchAsync(async (req, res) => {

  
    res.status(httpStatus.OK).send();
});



export default {
    signReviewStatus, 
    editReviewStatus,
    selectChallengeReivewData
}














