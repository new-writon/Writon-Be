import express from 'express';
import  {authController, writeController} from '../../controllers/index.js';
import { authValidation, writeValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();


router.get('/:challengeId/basic-question', auth, validate(writeValidation.checkChallengeId), writeController.selectBasicQuestion);
router.get('/:challengeId/special-question', auth, validate(writeValidation.checkChallengeId), writeController.selectSpecialQuestion);

export default router;

