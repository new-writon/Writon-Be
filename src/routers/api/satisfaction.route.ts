import express from 'express';
import  { satisfactionController } from '../../controllers/index.js';
import {  satisfactionValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/:challengeId', satisfactionController.selectSatisfactionQuestion);
router.post('/objective-question', auth, validate(satisfactionValidation.checkObjectiveAnswer), satisfactionController.insertObjectiveAnswer);
router.post('/subjective-question', auth, validate(satisfactionValidation.checkObjectiveAnswer), satisfactionController.insertSubjectiveAnswer);


export default router;