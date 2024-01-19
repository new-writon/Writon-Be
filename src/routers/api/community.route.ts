import express from 'express';
import  { communityController, startController } from '../../controllers/index.js';
import { communityValidation, recordValidation, startValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.get('/:challengeId/participant-information', auth, validate(recordValidation.checkChallengeId), communityController.selectParticipantInformation);
router.get('/:challengeId/my-participant-information', auth, validate(recordValidation.checkChallengeId), communityController.selectMyParticipantInformation);
router.get('/:challengeId/template', auth, validate(startValidation.checkOrganizationEnroll), communityController.selectDateTemplate);
router.post('/cheering-phrase', auth, validate(communityValidation.checkChallengeIdAndOrganizationAndContent), communityController.writeCheeringPhrase);


export default router;
