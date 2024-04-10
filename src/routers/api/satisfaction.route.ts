import express from 'express';
import  { satisfactionController } from '../../controllers/index.js';
import {  endValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/:challengeId', satisfactionController.selectSatisfactionQuestion);
router.post('/objective-question');
router.post('/subjective-question');


export default router;
