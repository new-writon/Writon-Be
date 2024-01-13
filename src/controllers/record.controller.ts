import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { recordService } from '../services/index.js'




const presentSituation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.presentSituation( Number(req.query.affiliationsId), req.decoded!.id));

});


const selectAffiliation = catchAsync(async (req, res) => {

    res.status(httpStatus.OK).send(await recordService.selectAffiliation(req.decoded?.id, req.query.organization as string));

});






export default {

    presentSituation,
    selectAffiliation
}
