import express from 'express';
import  { endController } from '../../controllers/index.js';
import {  endValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/:organization/:challengeId/review', auth, validate(endValidation.checkChallengeIdAndOrganization), endController.signReviewStatus);
router.put('/:organization/:challengeId/review', auth, validate(endValidation.checkChallengeIdAndOrganization), endController.editReviewStatus);
router.get('/:organization/:challengeId', auth, validate(endValidation.checkChallengeIdAndOrganization), endController.selectChallengeReivewData);



export default router;
