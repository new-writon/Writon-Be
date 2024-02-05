import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { startService, writeService } from '../services/index.js'


const selectBasicQuestion = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await writeService.selectBasicQuestion(req.params.challengeId));

});

const selectSpecialQuestion = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await writeService.selectSpecialQuestion(req.params.challengeId));

});


const insertTemplateContent = catchAsync(async (req, res) => {

    const { challengeId, organization, date, templateContent } = req.body;

    res.status(httpStatus.OK).send(await writeService.insertTemplateContent(req.decoded?.id, challengeId, organization, date, templateContent));

});

export default {

    selectBasicQuestion,
    selectSpecialQuestion,
    insertTemplateContent
}
