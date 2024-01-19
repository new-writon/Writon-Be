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

    res.status(httpStatus.OK).send(await communityService.selectDateTemplate(req.params.challengeId, req.params.date));
});



const selectMyParticipantInformation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectMyParticipantInformation(req.decoded?.id, req.params.challengeId));

});



const writeCheeringPhrase = catchAsync(async (req, res) => {

    const {  organization, challengeId, content } = req.body;

    res.status(httpStatus.OK).send(await communityService.writeCheeringPhrase(req.decoded?.id, organization, challengeId, content));

});




export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeCheeringPhrase

}














