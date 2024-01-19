import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config();
import * as jwt from '../utils/jwtModules.js';
import { logger } from '../config/logger.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import communityService from '../services/community.service.js';


const selectParticipantInformation = catchAsync(async (req, res) => {

  

    res.status(httpStatus.OK).send(await communityService.selectParticipantInformation(req.decoded?.id, req.params.challengeId));
});


const selectDateTemplate = catchAsync(async (req, res) => {

   

 //   res.status(httpStatus.OK).send(await authService.localLogin(identifier, password, organization));
});



const selectMyParticipantInformation = catchAsync(async (req, res) => {

  

   // res.status(httpStatus.OK).send(await authService.localLogin(identifier, password, organization));
});



const writeParticipantInformation = catchAsync(async (req, res) => {



   // res.status(httpStatus.OK).send(await authService.localLogin(identifier, password, organization));
});




export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeParticipantInformation

}














