import express from 'express';
import  { communityController, startController } from '../../controllers/index.js';
import { communityValidation, recordValidation, startValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.get('/:challengeId/participant-information', auth, validate(recordValidation.checkChallengeId), communityController.selectParticipantInformation);
router.get('/:challengeId/my-participant-information', auth, validate(recordValidation.checkChallengeId), communityController.selectMyParticipantInformation);
router.get('/:challengeId/template/:date/:organization', auth, validate(communityValidation.checkChallengeIdAndDateAndOrganization), communityController.selectDateTemplate);
router.post('/cheering-phrase', auth, validate(communityValidation.checkChallengeIdAndOrganizationAndContent), communityController.writeCheeringPhrase);
router.get('/:challengeId/date', auth, validate(recordValidation.checkChallengeId), communityController.selectChallengeDate);
router.get('/:userTemplateId', auth, validate(communityValidation.checkUserTemplateId), communityController.selectComment);

router.post('/like', auth, validate(communityValidation.checkUserTemplateIdAndOrganization), communityController.addLike);
router.delete('/like', auth, validate(communityValidation.checkUserTemplateIdAndOrganization), communityController.cancelLike);
router.get('/like/:userTemplateId', auth, validate(communityValidation.checkUserTemplateId), communityController.selectUserTemplateLikeCount);

export default router;
