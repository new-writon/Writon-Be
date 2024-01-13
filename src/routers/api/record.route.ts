import express from 'express';
import  { recordController } from '../../controllers/index.js';
import { recordValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/present-situation', auth, validate(recordValidation.checkaffiliationsId), recordController.presentSituation );
router.get('/calendar');
router.get('/reminiscence');
router.get('/', auth, validate(recordValidation.checkOrganization), recordController.selectAffiliation);


export default router;