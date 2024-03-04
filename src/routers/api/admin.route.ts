import express from 'express';
import  {adminController, authController} from '../../controllers/index.js';
import { adminValidation, authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();

router.post('/invitation', validate(adminValidation.checkOrganizationAndChallengeAndEmail), adminController.sendInvitation);
router.get('/all-organization/all-challenge', adminController.selectAllOragnizationAndAllChallenge);





export default router;

