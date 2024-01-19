import express from 'express';
import  { communityController, startController } from '../../controllers/index.js';
import { recordValidation, startValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.get('/:challengeId/participant-information', auth, validate(recordValidation.checkChallengeId), communityController.selectParticipantInformation);
router.get('/:challengeId/template', auth, validate(startValidation.checkOrganizationEnroll), communityController.selectDateTemplate);
router.get('/:challengeId/my-participant-information', auth, validate(startValidation.checkOrganizationEnroll), communityController.selectMyParticipantInformation);
router.post('/:challengeId/participant-information', auth, validate(startValidation.checkOrganizationEnroll), communityController.writeParticipantInformation);


export default router;
