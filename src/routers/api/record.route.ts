import express from 'express';
import  { recordController } from '../../controllers/index.js';
import { recordValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();

//router.get('/', auth, validate(recordValidation.checkOrganization), recordController.selectChallenge);
router.get('/present-situation/:organization/:challengeId', auth, validate(recordValidation.checkChallengeIdAndOrganization), recordController.presentSituation);
router.get('/calendar/:organization/:challengeId', auth, validate(recordValidation.checkChallengeIdAndOrganization), recordController.selectCalendarSituation);
router.get('/reminiscence/:organization/:challengeId', auth, validate(recordValidation.checkChallengeIdAndOrganization), recordController.selectMyTemplate);
router.get('/:challengeId/status',validate(recordValidation.checkChallengeId), recordController.signChallengeStatus);
router.get('/:organization/:challengeId/daily-reflection', auth, validate(recordValidation.checkChallengeIdAndOrganization), recordController.signTodayTemplateStatus);
router.get('/:challengeId/:date', auth, validate(recordValidation.checkChallengeIdAndDate), recordController.signChallengeDay);


export default router;