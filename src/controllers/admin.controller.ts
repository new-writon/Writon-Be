import { createRequire } from 'module'
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import { adminService } from '../services/index.js';
const require = createRequire(import.meta.url)
require('dotenv').config();



const sendInvitation = catchAsync(async (req, res) => {

    const { organization, challenge, email} = req.body;

    res.status(httpStatus.OK).send(await adminService.sendInvitation(organization, challenge, email));
});




export default {
    sendInvitation
}














