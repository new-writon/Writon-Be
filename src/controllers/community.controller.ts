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

    const {challengeId, date, organization} = req.params;

    res.status(httpStatus.OK).send(await communityService.selectDateTemplate(req.decoded?.id, challengeId, date, organization));
});



const selectMyParticipantInformation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectMyParticipantInformation(req.decoded?.id, req.params.challengeId));

});



const writeCheeringPhrase = catchAsync(async (req, res) => {

    const {  organization, challengeId, content } = req.body;

    res.status(httpStatus.OK).send(await communityService.writeCheeringPhrase(req.decoded?.id, organization, challengeId, content));

});


const selectChallengeDate = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectChallengeDate(req.params.challengeId));

});



const selectComment = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectComment(req.decoded?.id, req.params.userTemplateId));

});

const addLike = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.addLike(req.decoded?.id, req.body.userTemplateId, req.body.organization));

});

const cancelLike = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.cancelLike(req.decoded?.id, req.body.userTemplateId, req.body.organization));

});

const selectUserTemplateLike = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectUserTemplateLike(req.params.userTemplateId));

});



export default {

    selectParticipantInformation,
    selectDateTemplate,
    selectMyParticipantInformation,
    writeCheeringPhrase,
    selectChallengeDate,
    selectComment,
    addLike,
    cancelLike,
    selectUserTemplateLike

}














