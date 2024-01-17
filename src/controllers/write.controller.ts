import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { startService, writeService } from '../services/index.js'


const selectBasicQuestion  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await writeService.selectBasicQuestion(req.params.challengeId));

});

const selectSpecialQuestion  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await writeService.selectSpecialQuestion(req.params.challengeId));

});

export default {
  
    selectBasicQuestion,
    selectSpecialQuestion
}
