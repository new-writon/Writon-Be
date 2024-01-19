import express from 'express';
import  { startController } from '../../controllers/index.js';
import { startValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', auth, validate(startValidation.checkOrganizationAndChallengeId), startController.enrollChallenge);
router.post('/enroll', auth, validate(startValidation.checkOrganizationEnroll), startController.enrollOrganization);


export default router;
