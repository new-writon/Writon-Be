import express from 'express';
import  { recordController } from '../../controllers/index.js';
import { recordValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.get('/', auth, validate(recordValidation.checkOrganization), recordController.selectChallenge);
router.get('/present-situation/:challengeId', auth, validate(recordValidation.checkChallengeId), recordController.presentSituation);
router.get('/calendar');
router.get('/reminiscence');
router.get('/:challengeId/status', validate(recordValidation.checkChallengeId), recordController.signChallengeStatus);
router.get('/:challengeId/daily-reflection', auth, validate(recordValidation.checkChallengeId), recordController.selectChallenge);


export default router;