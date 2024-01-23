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

    const { challengeId, date, organization } = req.params;

    res.status(httpStatus.OK).send(await communityService.selectDateTemplate(req.decoded?.id, challengeId, date, organization));
});



const selectMyParticipantInformation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectMyParticipantInformation(req.decoded?.id, req.params.challengeId));

});



const writeCheeringPhrase = catchAsync(async (req, res) => {

    const { organization, challengeId, content } = req.body;

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

const selectUserTemplateLikeCount = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await communityService.selectUserTemplateLikeCount(req.params.userTemplateId));

});



const addComment = catchAsync(async (req, res) => {

    const { organization, userTemplateId, content, commentGroup } = req.body;

    res.status(httpStatus.OK).send(await communityService.addComment(req.decoded?.id, organization, userTemplateId, content, commentGroup));

});


const updateComment = catchAsync(async (req, res) => {

    const { organization, content, commentId } = req.body;

    res.status(httpStatus.OK).send(await communityService.updateComment(req.decoded?.id, organization, content, commentId));

});



const deleteComment = catchAsync(async (req, res) => {

    const { organization, commentId } = req.body;

    res.status(httpStatus.OK).send(await communityService.deleteComment(req.decoded?.id, organization, commentId));

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
    selectUserTemplateLikeCount,
    addComment,
    updateComment,
    deleteComment

}














