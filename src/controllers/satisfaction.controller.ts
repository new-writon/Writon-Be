import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { satisfactionService } from '../services/index.js'



const selectSatisfactionQuestion  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await satisfactionService.selectSatisfactionQuestion(req.params.challengeId));

});


export default {
    selectSatisfactionQuestion
}
