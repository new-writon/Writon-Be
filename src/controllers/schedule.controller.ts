import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService, scheduleService } from '../services/index.js'


const scheduleChallenge  = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await scheduleService.scheduleChallenge());

});


export default {

    scheduleChallenge
}
